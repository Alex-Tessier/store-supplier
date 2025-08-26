using System.Net;
using System.Threading.Tasks;
using Backend.Dtos;
using Backend.Dtos.Auth;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDTO loginData)
        {
            var result = await _authService.Login(loginData);

            if (!result.success)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, result.message);
            }

            Response.Cookies.Append(
                "refreshToken",
                result.loginResponse.RefreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(7)
                }
            );

            return Ok(new { accessToken = result.loginResponse.AccessToken, expiresAt = result.loginResponse.ExpiresAt });
        }

        [HttpPost("refreshtoken")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized("No refresh token.");

            var result = await _authService.RefreshToken(refreshToken);

            if (!result.success)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized, result.message);
            }

            Response.Cookies.Append(
                "refreshToken",
                result.loginResponse.RefreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(7)
                }
            );

            return Ok(new { accessToken = result.loginResponse.AccessToken, expiresAt = result.loginResponse.ExpiresAt });
        }

        [HttpPost("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout(RefreshTokenDTO refreshTokenData)
        {
            var result = await _authService.Logout(refreshTokenData.RefreshToken);

            if (!result.success)
            {
                return BadRequest(result.message);
            }
            return Ok("User Logout successfully.");
        }
    }
}
