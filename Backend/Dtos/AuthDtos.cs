using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public record LoginDTO
    (
        [Required] string UserNameOrEmail,
        [Required] string Password
    );
}
