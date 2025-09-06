"use client";

import { useState } from "react";
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Image from "next/image";

const gallery = [
    { src: "/referenz1.jpg", text: "Küchenbau – Maßgefertigte Küchen aus Eiche" },
    { src: "/referenz2.jpg", text: "Treppenbau – Moderne Holztreppen" },
    { src: "/referenz3.jpg", text: "Wohnzimmermöbel – Individuelle Regalsysteme" },
    { src: "/referenz4.jpg", text: "Büroausbau – Funktionale Arbeitsplätze" },
    { src: "/referenz5.jpg", text: "Türen – Exklusive Innentüren" },
    { src: "/referenz6.jpg", text: "Fenster – Energiesparende Holzfenster" },
    { src: "/referenz7.jpg", text: "Badmöbel – Edle Waschtische" },
    { src: "/referenz8.jpg", text: "Garderoben – Praktische Lösungen" },
];

export default function References() {
    const [modalIdx, setModalIdx] = useState<number | null>(null);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto p-0 mt-20 w-full">
                <div className="max-w-3xl mx-auto p-6">
                    <h2 className="text-2xl font-bold mb-4">Referenzen</h2>
                    <p className="mb-4 text-justify">
                        Seit über 30 Jahren stehen wir für Qualität, Zuverlässigkeit und kreative Lösungen im Schreinerhandwerk. Unser erfahrenes Team verbindet traditionelles Handwerk mit modernen Techniken, um Ihre Wünsche zu verwirklichen.
                    </p>
                </div>
                {/* Galerie */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto px-4 pb-12">
                    {gallery.map((item, idx) => (
                        <button
                            key={idx}
                            className="relative group aspect-square overflow-hidden rounded-lg shadow-lg focus:outline-none"
                            onClick={() => setModalIdx(idx)}
                            aria-label={item.text}
                            type="button"
                        >
                            <Image
                                src={item.src}
                                alt={item.text}
                                fill
                                style={{ objectFit: "cover" }}
                                className="transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={idx === 0}
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white text-lg font-semibold text-center px-4">{item.text}</span>
                            </div>
                        </button>
                    ))}
                </div>
                {/* Modal für großes Bild */}
                {modalIdx !== null && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setModalIdx(null)}
                    >
                        <div
                            className="relative max-w-3xl w-[90vw] max-h-[90vh] flex flex-col items-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <Image
                                src={gallery[modalIdx].src}
                                alt={gallery[modalIdx].text}
                                width={900}
                                height={900}
                                style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "80vh" }}
                                className="rounded-lg shadow-lg"
                                priority
                            />
                            <span className="text-white text-lg font-semibold text-center px-4 mt-4">{gallery[modalIdx].text}</span>
                            <button
                                className="absolute top-2 right-2 text-white text-3xl font-bold bg-black/60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
                                onClick={() => setModalIdx(null)}
                                aria-label="Schließen"
                                type="button"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}