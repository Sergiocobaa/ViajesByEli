using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System.Net.Mail;

namespace ViajesByEli.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ContactController(IConfiguration config)
        {
            _config = config;
        }

        public class ContactDto
        {
            public string Nombre { get; set; }
            public string Email { get; set; }
            public string Asunto { get; set; }
            public string Mensaje { get; set; }
        }

        [HttpPost("enviar")]
        public IActionResult EnviarCorreo([FromBody] ContactDto dto)
        {
            try
            {
                var smtpConfig = _config.GetSection("SMTP");
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Web Contacto", smtpConfig["User"]));
                message.To.Add(MailboxAddress.Parse(smtpConfig["Destinatario"]));
                message.Subject = $"[Web Contacto] {dto.Asunto}";
                message.Body = new TextPart("plain")
                {
                    Text = $"Nombre: {dto.Nombre}\nEmail: {dto.Email}\n\nMensaje:\n{dto.Mensaje}"
                };

                using var client = new MailKit.Net.Smtp.SmtpClient();
                client.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                client.Authenticate("sergiocobaa@gmail.com", "cobi9000");
                client.Send(message);
                client.Disconnect(true);

                return Ok(new { mensaje = "Correo enviado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "No se pudo enviar el correo", detalle = ex.Message });
            }
        }
    }
}
