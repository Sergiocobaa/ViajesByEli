using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace ViajesByEli.Api.Models
{
    public class Offer
    {
        public int Id { get; set; }
        [Required] public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? Destination { get; set; }
        public string? Duration { get; set; }
        public string? ImageUrl { get; set; }
        [ForeignKey("User")]
        public int? CreatedBy { get; set; }
        public User? Creator { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
