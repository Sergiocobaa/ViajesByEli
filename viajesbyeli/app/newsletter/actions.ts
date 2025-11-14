"use server";

import { Resend } from 'resend';

// Asegúrate de tener estas variables en tu .env.local y en Vercel
const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
const FROM_EMAIL = process.env.FROM_EMAIL; // Ej: 'web@viajesbyeli.es'

// Definimos un tipo para la respuesta
interface FormState {
  success: boolean;
  message: string;
}

export async function subscribeToNewsletter(
  prevState: FormState | null, // Estado anterior (para useFormState)
  formData: FormData
): Promise<FormState> {
  
  const email = formData.get('email') as string;
  const firstName = formData.get('firstName') as string | null;

  // Validación simple
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: "Por favor, introduce un email válido." };
  }
  if (!AUDIENCE_ID || !FROM_EMAIL) {
     console.error("Faltan variables de entorno de Resend");
     return { success: false, message: "Error de configuración del servidor." };
  }

  try {
    // 1. Añadir el contacto a tu audiencia en Resend
    await resend.contacts.create({
      email: email,
      firstName: firstName || undefined,
      unsubscribed: false,
      audienceId: AUDIENCE_ID,
    });

    // 2. Opcional: Enviar un email de bienvenida
    await resend.emails.send({
      from: `Viajes By Eli <${FROM_EMAIL}>`,
      to: email,
      subject: '¡Gracias por suscribirte! ✈️',
      html: `
        <div>
          <h2>¡Bienvenido/a a la comunidad de Viajes by Eli!</h2>
          <p>Te has suscrito correctamente. Pronto recibirás en tu correo las mejores ofertas y chollos de viajes.</p>
          <p>¡Prepara las maletas!</p>
        </div>
      `
    });

    return { success: true, message: "¡Suscripción confirmada! Revisa tu email." };

  } catch (error: any) {
    console.error("Error al suscribir a Resend:", error);
    // Manejar error si el email ya existe
    if (error.message.includes('already exists')) {
      return { success: false, message: "Este email ya está suscrito." };
    }
    return { success: false, message: "Hubo un error en el servidor. Inténtalo más tarde." };
  }
}