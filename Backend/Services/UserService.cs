using Backend.Data;
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> RegisterUser(RegisterDto registeData)
        {
            if (await _context.Users.AnyAsync(u => u.UserName == registeData.UserName || u.Email == registeData.Email))
            {
                return null;
            }

            var newUser = new User
            {
                UserName = registeData.UserName,
                Email = registeData.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registeData.Password) ,
                FirstName = registeData.FirstName,
                LastName = registeData.LastName
            };

            _context.Users.Add(newUser);

            await _context.SaveChangesAsync();

            return newUser;
        }

        public async Task<(bool success, string message, UserProfile? user)> GetUserProfile(Guid userGuid)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserGuid == userGuid);

                if (user == null)
                {
                    return (false, "User not found.", null);
                }

                var userProfile = new UserProfile
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName
                };

                return (true, "User profile retrieved successfully.", userProfile);
            }
            catch (Exception ex)
            {
                return (false, $"Error retrieving user profile: {ex.Message}", null);
            }
        }
    }
}
