"use client"

import { useState, useEffect } from "react"
import { X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Check if user has already closed the popup or subscribed
        const hasSeenPopup = localStorage.getItem("newsletter_popup_seen")

        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 3000) // Show after 3 seconds

            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem("newsletter_popup_seen", "true")
    }

    const handleSubscribeClick = () => {
        handleClose()
        router.push("/newsletter")
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-4 right-4 z-50 w-full max-w-sm md:bottom-8 md:right-8"
                >
                    <div className="bg-card border shadow-2xl rounded-xl p-6 relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Cerrar"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full shrink-0">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">¡No te pierdas nada!</h3>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    Suscríbete a nuestra newsletter y recibe las mejores ofertas de viaje antes que nadie.
                                </p>
                                <div className="flex gap-2">
                                    <Button onClick={handleSubscribeClick} className="w-full">
                                        Quiero suscribirme
                                    </Button>
                                    <Button variant="outline" onClick={handleClose}>
                                        Ahora no
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
