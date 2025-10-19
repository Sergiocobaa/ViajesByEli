using Microsoft.AspNetCore.Mvc;
using ViajesByEli.Api.Data;
using ViajesByEli.Api.Models;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace ViajesByEli.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeedController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SeedController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("create-admin")]
        public IActionResult CreateAdmin()
        {
            if (_context.Users.Any(u => u.Email == "eliarquillo.nadidu@gmail.com"))
                return BadRequest("El usuario admin ya existe.");

            using var sha = SHA256.Create();
            var passwordHash = Convert.ToBase64String(sha.ComputeHash(Encoding.UTF8.GetBytes("Nanone30?")));

            var user = new User
            {
                Email = "eliarquillo.nadidu@gmail.com",
                PasswordHash = passwordHash,
                FullName = "Eli",
                Role = "admin"
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Usuario admin creado correctamente con contraseña: Nanone30?");
        }
    }
}
