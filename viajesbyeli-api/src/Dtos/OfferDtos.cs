using Microsoft.AspNetCore.Http;
namespace ViajesByEli.Api.Dtos
{
    public class OfferCreateDto
    {
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? Destination { get; set; }
        public string? Duration { get; set; }
        public string? ImageBase64 { get; set; }
    }

    public class OfferUpdateDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? Destination { get; set; }
        public string? Duration { get; set; }
    }
}
