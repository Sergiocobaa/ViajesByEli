using System.ComponentModel.DataAnnotations;
namespace ViajesByEli.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string PasswordHash { get; set; } = null!;
        public string? FullName { get; set; }
        public string Role { get; set; } = "admin";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
