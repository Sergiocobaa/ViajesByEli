using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ViajesByEli.Api.Data;
using ViajesByEli.Api.Dtos;
using ViajesByEli.Api.Models;
using ViajesByEli.Api.Services;
using System.Security.Claims;
namespace ViajesByEli.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OffersController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly ICloudService _cloud;
        public OffersController(AppDbContext db, ICloudService cloud)
        {
            _db = db;
            _cloud = cloud;
        }
        [HttpGet]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? destination, [FromQuery] decimal? maxPrice)
        {
            try
            {
                var q = _db.Offers.AsQueryable();

                if (!string.IsNullOrEmpty(destination))
                    q = q.Where(o => o.Destination == destination);
                if (maxPrice.HasValue)
                    q = q.Where(o => o.Price <= maxPrice.Value);

                var list = await q
                    .AsNoTracking() // evita problemas de tracking
                    .Select(o => new
                    {
                        o.Id,
                        o.Title,
                        o.Description,
                        o.Price,
                        o.Destination,
                        o.Duration,
                        o.ImageUrl
                    })
                    .OrderByDescending(o => o.Id)
                    .ToListAsync();

                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var offer = await _db.Offers.FindAsync(id);
            if (offer == null) return NotFound();
            return Ok(offer);
        }
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OfferCreateDto dto)
        {
            try
            {
                var userIdClaim = User.Claims
                    .Where(c => c.Type == ClaimTypes.NameIdentifier && int.TryParse(c.Value, out _))
                    .Select(c => c.Value)
                    .FirstOrDefault();

                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
                    return Unauthorized("No se pudo identificar al usuario.");

                var offer = new Offer
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    Price = dto.Price,
                    Destination = dto.Destination,
                    Duration = dto.Duration,
                    ImageUrl = dto.ImageBase64,
                    CreatedBy = userId
                };

                _db.Offers.Add(offer);
                await _db.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { id = offer.Id }, offer);
            }
            catch (Exception ex)
            {
                // 🔹 Mostrar el error exacto para depuración
                return StatusCode(500, ex.Message);
            }
        }


        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OfferUpdateDto dto)
        {
            var offer = await _db.Offers.FindAsync(id);
            if (offer == null) return NotFound();
            if (!string.IsNullOrEmpty(dto.Title)) offer.Title = dto.Title;
            if (!string.IsNullOrEmpty(dto.Description)) offer.Description = dto.Description;
            if (dto.Price.HasValue) offer.Price = dto.Price.Value;
            if (!string.IsNullOrEmpty(dto.Destination)) offer.Destination = dto.Destination;
            if (!string.IsNullOrEmpty(dto.Duration)) offer.Duration = dto.Duration;
            await _db.SaveChangesAsync();
            return Ok(offer);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var offer = await _db.Offers.FindAsync(id);
            if (offer == null) return NotFound();
            _db.Offers.Remove(offer);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
