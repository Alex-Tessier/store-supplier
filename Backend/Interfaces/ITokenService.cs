using Backend.Models;

namespace Backend.Interfaces
{
    public interface ITokenService
    {
        string GenetareJWTToken(User user);
        string GenerateRefreshToken();
        bool ValidateRefreshToken(User user, string refreshToken);
    }
}
