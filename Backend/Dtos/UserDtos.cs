using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos
{
    public record RegisterDto
    (
        [Required] string UserName,
        [Required][EmailAddress] string Email,
        [Required][MinLength(8)] string Password,
        [Required] string FirstName,
        [Required] string LastName
    );

}
