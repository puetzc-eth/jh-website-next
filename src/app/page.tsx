"use client";

import Image from 'next/image';
import { useState } from 'react';
import styles from './page.module.css';

const slideshowImages = [
    '/slideshow1.jpg',
    '/slideshow2.jpg',
    '/slideshow3.jpg',
];

export default function Home() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slideshowImages.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);

    return(
        <>
            {/* Kopfzeile mit Navigation (fixiert) */}
            <header className="w-full bg-gray-100 border-b border-gray-200 fixed top-0 left-0 z-50">
                <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
                    <span className="text-xl font-bold text-gray-800">
                        Jürgensen & Hillesheim GmbH
                    </span>
                    <ul className="flex space-x-6">
                        <li>
                            <a href="#start" className="text-gray-700 hover:text-green-600 font-medium">Start</a>
                        </li>
                        <li>
                            <a href="#ueber-uns" className="text-gray-700 hover:text-green-600 font-medium">Über Uns</a>
                        </li>
                        <li>
                            <a href="#leistungen" className="text-gray-700 hover:text-green-600 font-medium">Leistungen</a>
                        </li>
                        <li>
                            <a href="#kontakt" className="text-gray-700 hover:text-green-600 font-medium">Kontakt</a>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Abstand für die fixe Kopfzeile */}
            <div className="h-[72px] md:h-[72px]" />

            {/* Hero-Bereich mit Hintergrundbild und zentrierter h1 */}
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
                    <h2 className="text-2xl font-bold mb-4">Start</h2>
                    <p className="mb-4 text-justify">
                        Willkommen bei der Schreinerei Jürgensen & Hillesheim GmbH – Ihrem Partner für individuelle Holzarbeiten, Möbel nach Maß und hochwertige Innenausbauten. Entdecken Sie unsere Leidenschaft für das Schreinerhandwerk!
                    </p>
                </section>
                <section id="ueber-uns" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Über Uns</h2>
                    <p className="mb-4 text-justify">
                        Seit über 30 Jahren stehen wir für Qualität, Zuverlässigkeit und kreative Lösungen im Schreinerhandwerk. Unser erfahrenes Team verbindet traditionelles Handwerk mit modernen Techniken, um Ihre Wünsche zu verwirklichen.
                    </p>
                </section>
                <section id="leistungen" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Leistungen</h2>
                    <p className="mb-4 text-justify">
                        Wir bieten Ihnen ein breites Spektrum an Leistungen: Möbelbau, Innenausbau, Fenster und Türen, Küchen nach Maß, Reparaturen und individuelle Sonderanfertigungen – alles aus einer Hand und mit höchster Präzision gefertigt.
                    </p>
                    {/* Slideshow */}
                    <div className="relative w-full max-w-xl mx-auto mt-6">
                        <div className="overflow-hidden rounded-lg shadow-lg h-64 bg-gray-200 flex items-center justify-center">
                            <Image
                                src={slideshowImages[current]}
                                alt={`Leistung ${current + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-all duration-500"
                                priority
                            />
                        </div>
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow z-10"
                            aria-label="Vorheriges Bild"
                        >
                            &#8592;
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow z-10"
                            aria-label="Nächstes Bild"
                        >
                            &#8594;
                        </button>
                        <div className="flex justify-center mt-2 space-x-2">
                            {slideshowImages.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`inline-block w-3 h-3 rounded-full ${idx === current ? 'bg-blue-600' : 'bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                <section id="kontakt" className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
                    <p className="mb-4 text-justify">
                        Haben Sie Fragen oder möchten Sie ein unverbindliches Angebot? Kontaktieren Sie uns telefonisch, per E-Mail oder besuchen Sie uns direkt in unserer Werkstatt. Wir freuen uns auf Ihr Projekt!
                    </p>
                </section>
            </div>

            {/* Fußzeile */}
            <footer className="w-full bg-gray-100 border-t border-gray-200 mt-12">
                <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-8 text-gray-700 text-sm">
                    <div>
                        <span className="font-bold block mb-1">Jürgensen & Hillesheim GmbH</span>
                        Musterstraße 1<br />
                        12345 Musterstadt<br />
                        Deutschland
                    </div>
                    <div>
                        <span className="font-bold block mb-1">Kontakt</span>
                        Tel: <a href="tel:+491234567890" className="hover:text-blue-600">01234 567890</a><br />
                        E-Mail: <a href="mailto:info@jh-schreinerei.de" className="hover:text-blue-600">info@jh-schreinerei.de</a>
                    </div>
                    <div>
                        <span className="font-bold block mb-1">Rechtliches</span>
                        <a href="#impressum" className="hover:text-blue-600">Impressum</a><br />
                        <a href="#kontakt" className="hover:text-blue-600">Kontakt</a>
                    </div>
                </div>
            </footer>
        </>
    );
}