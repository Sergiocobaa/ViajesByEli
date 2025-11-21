"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Mail } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    email: z.string().email({
        message: "Por favor, introduce un email válido.",
    }),
})

export function NewsletterForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Algo salió mal. Por favor, inténtalo de nuevo.")
            }

            toast.success("¡Gracias por suscribirte! Te hemos enviado un email de confirmación.")
            form.reset()
        } catch (error) {
            console.error(error)
            toast.error(error instanceof Error ? error.message : "Error al suscribirse")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-sm space-y-2">
            <h3 className="font-semibold text-foreground">Suscríbete a nuestra newsletter</h3>
            <p className="text-sm text-muted-foreground">
                Recibe las mejores ofertas y novedades directamente en tu email.
            </p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="tu@email.com"
                        type="email"
                        className="pl-9"
                        {...form.register("email")}
                        disabled={isLoading}
                    />
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Suscribirse"}
                </Button>
            </form>
            {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
            )}
        </div>
    )
}
