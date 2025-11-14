"use client";

import React from 'react';
// Importamos useFormState y useFormStatus para manejar el estado del formulario
import { useFormState, useFormStatus } from 'react-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Send, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { subscribeToNewsletter } from '@/app/newsletter/actions'; // Importamos la Server Action
import { Card, CardContent } from '@/components/ui/card';

// Estado inicial para useFormState
const initialState = {
  success: false,
  message: "",
};

// Componente interno para el botón, para que muestre el estado de carga
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
      size="lg"
    >
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          Suscribirme
          <Send className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  );
}

export function NewsletterPageForm() {
  // Conectamos la Server Action con el estado del formulario
  const [state, formAction] = useFormState(subscribeToNewsletter, initialState);

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="relative z-10 border-0 shadow-2xl bg-card/95 backdrop-blur-sm text-card-foreground p-4">
        <CardContent className="pt-6">
          <form action={formAction} className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-base">Tu Nombre (Opcional)</Label>
              <Input
                id="firstName"
                name="firstName" // El 'name' es crucial para que formData lo lea
                type="text"
                placeholder="Viajero/a"
                className="h-12 text-base bg-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">Tu Email</Label>
              <Input
                id="email"
                name="email" // El 'name' es crucial
                type="email"
                placeholder="tu@email.com"
                required
                className="h-12 text-base bg-input"
              />
            </div>
            
            {/* Mensaje de Éxito o Error */}
            {state?.message && (
              <div 
                className={`flex items-center gap-3 p-3 rounded-md ${
                  state.success 
                    ? 'bg-green-500/10 text-green-600' 
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {state.success ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                <span className="text-sm font-medium">{state.message}</span>
              </div>
            )}

            <SubmitButton />

            <p className="text-xs text-center text-muted-foreground pt-2">
              Al suscribirte, aceptas nuestra <a href="/politica-de-privacidad" className="underline hover:text-primary">Política de Privacidad</a>.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}