using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ViajesByEli.Api.Data;
using ViajesByEli.Api.Dtos;
using ViajesByEli.Api.Models;
namespace ViajesByEli.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;
        public AuthController(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest(new { error = "El email ya está en uso" });
            var user = new User
            {
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                FullName = dto.FullName
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Usuario creado" });
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null) return Unauthorized(new { error = "Credenciales inválidas" });
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(new { error = "Credenciales inválidas" });
            var token = GenerateJwt(user);
            return Ok(new { token });
        }
        private string GenerateJwt(User user)
        {
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? string.Empty);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddMinutes(double.Parse(_config["Jwt:ExpiryMinutes"] ?? "1440"));
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
