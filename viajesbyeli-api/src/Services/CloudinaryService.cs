using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
namespace ViajesByEli.Api.Services
{
    public class CloudinaryService : ICloudService
    {
        private readonly Cloudinary _cloudinary;
        public CloudinaryService(IConfiguration config)
        {
            var cloudName = config["Cloudinary:CloudName"];
            var apiKey = config["Cloudinary:ApiKey"];
            var apiSecret = config["Cloudinary:ApiSecret"];
            var acc = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(acc);
        }
        public async Task<string?> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0) return null;
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "viajesbyeli/offers"
            };
            var result = await _cloudinary.UploadAsync(uploadParams);
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
                return result.SecureUrl?.ToString();
            return null;
        }
    }
}
