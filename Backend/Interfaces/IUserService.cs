using Backend.Dtos;
using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IUserService
    {
        Task<User?> RegisterUser(RegisterDto registeData);
        Task<(bool success, string message, UserProfile? user)> GetUserProfile(Guid userGuid);
    }
}
