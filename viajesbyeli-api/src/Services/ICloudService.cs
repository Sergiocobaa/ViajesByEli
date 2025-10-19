using Microsoft.AspNetCore.Http;
namespace ViajesByEli.Api.Services
{
    public interface ICloudService
    {
        Task<string?> UploadImageAsync(IFormFile file);
    }
}
