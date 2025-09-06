"use client";

import Image from 'next/image';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './page.module.css';

export default function Home() {
    return(
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <section
                    id="start"
                    className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center mb-8"
                >
                    <Image
                        src="/visitenkarte.png" // Passe den Pfad ggf. an
                        alt="Schreinerei Hintergrund"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="z-0"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <h1 className="absolute z-20 w-full text-center text-green-300 text-4xl md:text-5xl font-bold drop-shadow-lg">
                        Schreinerei Jürgensen & Hillesheim GmbH
                    </h1>
                </section>

                <div className="max-w-4xl mx-auto p-6">
                    <section id="start" className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 -ml-6">
                            Schreinerei Jürgensen & Hillesheim GmbH
                        </h2>
                        <p className="mb-4 text-justify">
                            Willkommen bei der Schreinerei Jürgensen & Hillesheim GmbH – Ihrem Partner für individuelle Holzarbeiten, Möbel nach Maß und hochwertige Innenausbauten. Entdecken Sie unsere Leidenschaft für das Schreinerhandwerk!
                        </p>
                    </section>
                </div>
            </main>

            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}