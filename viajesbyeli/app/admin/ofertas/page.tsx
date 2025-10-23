"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AdminOffersList } from '@/app/admin/ofertas/offers-list';
// Usamos el color de tu botón de Login
const LINK_COLOR = "rgb(47, 174, 183)"; 

interface OfferFormData {
    titulo: string;
    descripcion: string;
    precio: number | string; 
    destination: string;
    duration: string;
    imagen: string; 
}

export default function AdminOfferForm() {
    const { isAuthenticated, createOffer, loading } = useAuth();
    const router = useRouter();
    
    const [formData, setFormData] = useState<OfferFormData>({
        titulo: '', descripcion: '', precio: 0, destination: '', duration: '',
        imagen: '' 
    });
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [fileName, setFileName] = useState('Ningún archivo seleccionado');

    // --- Redirección y Carga ---
    // Si la sesión está cargando o no está autenticada, redirigimos
    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-background">
            <p className="text-foreground">Cargando sesión...</p>
        </div>
    );
    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    // --- Manejo de Inputs ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type } = e.target;
        
        const newValue = type === 'number' ? parseFloat(value) : value;

        // @ts-ignore
        setFormData(prev => ({ ...prev, [id]: newValue }));
    };

    // --- Lectura de Archivo a Base64 ---
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (readerEvent) => {
            const base64String = readerEvent.target?.result as string;
            setFormData(prev => ({ ...prev, imagen: base64String }));
        };
        reader.readAsDataURL(file);
    };
    
    // --- Lógica de Envío ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('Enviando...');
        
        if (!formData.imagen || (formData.imagen as string).length < 100) {
            setSubmissionStatus('Error: Debe seleccionar una imagen para subir.');
            return;
        }

        try {
            await createOffer(formData); 
            setSubmissionStatus('Oferta creada con éxito!');
            setFormData({ titulo: '', descripcion: '', precio: 0, destination: '', duration: '', imagen: '' }); 
            setFileName('Ningún archivo seleccionado');
        } catch (error) {
            console.error("Error al subir oferta:", error);
            setSubmissionStatus(`Error: No se pudo crear la oferta. ${error || 'Verifica el servidor.'}`);
        }
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center p-6 pt-24 bg-background">
            {/* 🛑 FONDO ESTILO LOGIN 🛑 */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/fondo.jpg"
                    alt="Fondo de Administración"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
            </div>

            {/* Opcional: Logo para que se vea bien centrado */}
            <Link href="/" className="absolute top-6 left-6 md:left-12 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg hover:shadow-xl transition-shadow">
                    <img src="/logo.png" alt="Viajes by Eli" className="h-10 w-auto object-contain" />
                </div>
            </Link>


            {/* 🛑 TARJETA ESTILO LOGIN (LIQUID GLASS) 🛑 */}
            <Card className="relative z-10 w-full max-w-3xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm text-foreground">
                <CardHeader className="space-y-3 text-center pb-6">
                    <CardTitle className="text-3xl font-bold">Subir Nueva Oferta</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                        Completa todos los campos para añadir un viaje al catálogo de ofertas.
                    </CardDescription>
                </CardHeader>
                
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
                        
                        {/* Título y Descripción (Full Width) */}
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="titulo">Título del Viaje</Label>
                            <Input id="titulo" type="text" value={formData.titulo} onChange={handleChange} required className="h-11 bg-input" />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Input id="descripcion" type="text" value={formData.descripcion} onChange={handleChange} required className="h-11 bg-input" />
                        </div>
                        
                        {/* Precio y Destino (Half Width) */}
                        <div className="space-y-2">
                            <Label htmlFor="precio">Precio (€)</Label>
                            <Input id="precio" type="number" value={formData.precio} onChange={handleChange} required className="h-11 bg-input" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="destination">Destino</Label>
                            <Input id="destination" type="text" value={formData.destination} onChange={handleChange} required className="h-11 bg-input" />
                        </div>
                        
                        {/* Duración (Half Width, centrado) */}
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="duration">Duración (ej: 7 días)</Label>
                            <Input id="duration" type="text" value={formData.duration} onChange={handleChange} required className="h-11 bg-input" />
                        </div>

                        {/* 🛑 CAMPO DE IMAGEN (FILE) 🛑 */}
                        <div className="space-y-2 col-span-2 pt-2">
                            <Label htmlFor="imagen-file">Seleccionar Imagen</Label>
                            <Input 
                                id="imagen-file" 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange}
                                className="col-span-2 h-12 text-base cursor-pointer bg-input"
                            />
                            <p className="text-xs text-muted-foreground pt-1">
                                Archivo cargado: **{fileName}**
                            </p>
                        </div>
                        
                        <div className="col-span-2 mt-6">
                            <Button 
                                type="submit" 
                                className="w-full h-12 text-base font-semibold"
                                style={{ backgroundColor: LINK_COLOR }}
                            >
                                Subir Oferta
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-center w-full text-primary font-medium">{submissionStatus}</p>
                </CardFooter>
            </Card>
            <div className="w-full max-w-7xl mt-16 relative z-10">
                <AdminOffersList /> 
            </div>
        </main>
    );
}