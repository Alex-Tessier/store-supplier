using Microsoft.AspNetCore.Identity;
using System;
using System.Xml;

namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public Guid UserGuid { get; set; } = Guid.NewGuid();
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
