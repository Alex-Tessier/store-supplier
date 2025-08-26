using Backend.Data;
using Backend.Dtos;
using Backend.Dtos.Auth;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, ITokenService tokenService, IConfiguration configuration)
        {
            _context = context;
            _tokenService = tokenService;
            _configuration = configuration;
        }

        public async Task<(bool success, string message, LoginResponseDTO? loginResponse)> Login(LoginDTO loginDTO)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == loginDTO.UserNameOrEmail || u.Email == loginDTO.UserNameOrEmail);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.PasswordHash))
            {
                return (false, "Invalid username or password.", null);
            }

            var accessToken = _tokenService.GenetareJWTToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();
            
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(_configuration.GetValue<int>("Jwt:RefreshTokenExpirationDays", 7));
            
            await _context.SaveChangesAsync();

            var loginResponse = new LoginResponseDTO
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("Jwt:AccessTokenExpirationMinutes", 15))
            };

            return (true, "Login successful", loginResponse);
        }

        public async Task<(bool success, string message)> Logout(string refreshToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null)
            {
                return (false, "Invalid refresh token.");
            }

            user.RefreshToken = null;
            user.RefreshTokenExpiration = DateTime.UtcNow - TimeSpan.FromDays(1);

            await _context.SaveChangesAsync();

            return (true, "Logout successful.");
        }

        public async Task<(bool success, string message, LoginResponseDTO? loginResponse)> RefreshToken(string refreshToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshToken != refreshToken || !_tokenService.ValidateRefreshToken(user, refreshToken))
            {
                return (false, "Invalid or expired refresh token.", null);
            }

            var newAccessToken = _tokenService.GenetareJWTToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(_configuration.GetValue<int>("Jwt:RefreshTokenExpirationDays", 7));
            
            await _context.SaveChangesAsync();

            var loginResponse = new LoginResponseDTO
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("Jwt:AccessTokenExpirationMinutes", 15))
            };

            return (true, "Token refreshed successfully", loginResponse);
        }
    }
}
