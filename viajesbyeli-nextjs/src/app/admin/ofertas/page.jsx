// src/app/admin/ofertas/page.jsx
"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

function AdminOfferForm() {
    const { isAuthenticated, createOffer, loading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        titulo: '', descripcion: '', precio: 0, destino: '', duration: '', imagen: ''
    });
    const [submissionStatus, setSubmissionStatus] = useState('');

    // Si aún está cargando la sesión o no está autenticado, redirigir
    if (loading) return <div className="text-center mt-20">Cargando sesión...</div>;
    if (!isAuthenticated) {
        router.push('/login'); // Redirige a login si no está autenticado
        return null;
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('Enviando...');
        try {
            // Llama a la función de creación de ofertas del contexto
            await createOffer(formData); 
            setSubmissionStatus('Oferta creada con éxito!');
            setFormData({ titulo: '', descripcion: '', precio: 0, destino: '', duration: '', imagen: '' }); // Limpiar formulario
        } catch (error) {
            setSubmissionStatus(`Error: ${error.message}.`);
        }
    };

    return (
        <div className="flex justify-center py-16 px-4">
            <Card className="w-full max-w-2xl rounded-2xl shadow-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Subir Nueva Oferta</CardTitle>
                    <CardDescription>Completa todos los campos para añadir un viaje al catálogo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        {/* Título y Descripción */}
                        <div className="col-span-2 space-y-4">
                            <Label htmlFor="titulo">Título</Label>
                            <Input id="titulo" type="text" value={formData.titulo} onChange={handleChange} required />
                        </div>
                        <div className="col-span-2 space-y-4">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Input id="descripcion" type="text" value={formData.descripcion} onChange={handleChange} required />
                        </div>
                        {/* Precio y Destino */}
                        <div className="space-y-4">
                            <Label htmlFor="precio">Precio (€)</Label>
                            <Input id="precio" type="number" value={formData.precio} onChange={handleChange} required />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="destino">Destino</Label>
                            <Input id="destino" type="text" value={formData.destino} onChange={handleChange} required />
                        </div>
                        {/* Duración e Imagen (simplificados) */}
                        <div className="space-y-4">
                            <Label htmlFor="duration">Duración</Label>
                            <Input id="duration" type="text" value={formData.duration} onChange={handleChange} required />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="imagen">Imagen (Base64/URL)</Label>
                            <Input id="imagen" type="text" value={formData.imagen} onChange={handleChange} placeholder="Ruta de imagen o Base64" required />
                        </div>
                        
                        <div className="col-span-2 mt-4">
                            <Button type="submit" className="w-full h-12">
                                Subir Oferta
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-center w-full text-primary">{submissionStatus}</p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default AdminOfferForm;