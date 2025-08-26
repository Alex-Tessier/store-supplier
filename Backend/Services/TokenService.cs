using Backend.Interfaces;
using Backend.Models;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace Backend.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly SymmetricSecurityKey _key;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly int _expirationMinutes;


        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("Jwt:Secret") ?? throw new Exception("Jwt:Secret is missing in appsettings")));
            _issuer = _configuration.GetValue<string>("Jwt:Issuer") ?? throw new Exception("Jwt:Issuer is missing in appsettings");
            _audience = _configuration.GetValue<string>("Jwt:Audience") ?? throw new Exception("Jwt:Audience is missing in appsettings");
            _expirationMinutes = _configuration.GetValue<int>("Jwt:AccessTokenExpirationMinutes", 15) ;
        }

        public string GenetareJWTToken(User user)
        {
            var JWTHandler = new JsonWebTokenHandler();

            SecurityTokenDescriptor securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserGuid", user.UserGuid.ToString()),
                }),
                Issuer = _issuer,
                Audience = _audience,
                Expires = DateTime.UtcNow.AddMinutes(_expirationMinutes),
                SigningCredentials = new SigningCredentials(
                    _key,
                    SecurityAlgorithms.HmacSha256
                ),
            };

            return JWTHandler.CreateToken(securityTokenDescriptor);
        }

        public string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            using var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        public bool ValidateRefreshToken(User user, string refreshToken)
        {
            return user.RefreshToken == refreshToken && 
                   user.RefreshTokenExpiration > DateTime.UtcNow;
        }
    }
}
