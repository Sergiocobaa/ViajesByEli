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
        titulo: '', descripcion: '', precio: 0, destino: '', duration: '',
        imagen: '' 
    });
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [fileName, setFileName] = useState('Ningún archivo seleccionado');

    if (loading) return <div className="text-center mt-20">Cargando sesión...</div>;
    if (!isAuthenticated) {
        router.push('/login');
        return null;
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (readerEvent) => {
            const base64String = readerEvent.target.result;
            
            setFormData(prev => ({ ...prev, imagen: base64String }));
        };
        reader.readAsDataURL(file);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('Enviando...');
        
        if (!formData.imagen || formData.imagen.length < 100) {
            setSubmissionStatus('Error: Debe seleccionar una imagen para subir.');
            return;
        }

        try {
            await createOffer(formData); 
            setSubmissionStatus('Oferta creada con éxito!');
            setFormData({ titulo: '', descripcion: '', precio: 0, destino: '', duration: '', imagen: '' }); 
            setFileName('Ningún archivo seleccionado');
        } catch (error) {
            console.error("Error al subir oferta:", error);
            setSubmissionStatus(`Error: No se pudo crear la oferta. ${error.message || ''}`);
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
                        
                        <div className="col-span-2 space-y-4">
                            <Label htmlFor="titulo">Título</Label>
                            <Input id="titulo" type="text" value={formData.titulo} onChange={handleChange} required />
                        </div>
                        <div className="col-span-2 space-y-4">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Input id="descripcion" type="text" value={formData.descripcion} onChange={handleChange} required />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="precio">Precio (€)</Label>
                            <Input id="precio" type="number" value={formData.precio} onChange={handleChange} required />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="destino">Destino</Label>
                            <Input id="destino" type="text" value={formData.destino} onChange={handleChange} required />
                        </div>
                        <div className="space-y-4 col-span-2">
                            <Label htmlFor="duration">Duración</Label>
                            <Input id="duration" type="text" value={formData.duration} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="imagen-file">Seleccionar Imagen</Label>
                            <Input 
                                id="imagen-file" 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                                className="col-span-2 h-auto cursor-pointer"
                            />
         
                            <p className="text-xs text-muted-foreground pt-1">
                                Archivo: {fileName}
                            </p>
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