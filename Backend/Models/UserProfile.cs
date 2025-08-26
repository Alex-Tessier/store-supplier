using Microsoft.AspNetCore.Identity;
using System;
using System.Xml;

namespace Backend.Models
{
    public class UserProfile
    {
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
