using Microsoft.AspNetCore.Mvc;
using ViajesByEli.Api.Data;
using ViajesByEli.Api.Models;
using System.Linq;
using BCrypt.Net; // <--- 🛑 NUEVA LIBRERÍA NECESARIA (Asegúrate de que está instalada: dotnet add package BCrypt.Net)
using System.Security.Claims; // Se mantiene por si se usa en otros métodos


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
            if (_context.Users.Any(u => u.Email == "scoba2005@gmail.com"))
                return BadRequest("El usuario admin ya existe.");

            // 🛑 CORRECCIÓN CLAVE 🛑
            // 1. Eliminamos el uso de SHA256 (System.Security.Cryptography).
            // 2. Usamos BCrypt.HashPassword para crear un hash compatible con la verificación.
            var passwordHash = BCrypt.Net.BCrypt.HashPassword("1234");

            var user = new User
            {
                Email = "scoba2005@gmail.com",
                PasswordHash = passwordHash, // Ahora guarda el hash correcto de BCrypt
                FullName = "Sergio",
                Role = "admin"
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Usuario admin creado correctamente con contraseña: Nanone30?. POR FAVOR, REINICIA LA API Y ACCEDE AL ENDPOINT.");
        }
    }
}