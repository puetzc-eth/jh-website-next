"use client";

import { useEffect, useState } from "react";
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Image from "next/image";

const images = [
    "/about1.jpg",
    "/about2.jpg",
    "/about3.jpg"
];

export default function About() {
    const [current, setCurrent] = useState(0);

    // Automatisches Weiterblättern alle 4 Sekunden
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto p-6 mt-20 w-full">
                <h2 className="text-2xl font-bold mb-4">Über Uns</h2>
                <p className="mb-4 text-justify">
                    Seit über 30 Jahren stehen wir für Qualität, Zuverlässigkeit und kreative Lösungen im Schreinerhandwerk. Unser erfahrenes Team verbindet traditionelles Handwerk mit modernen Techniken, um Ihre Wünsche zu verwirklichen.
                </p>
                <div className="relative w-full h-96 md:h-[32rem] rounded-lg overflow-hidden shadow-lg mb-8">
                    <Image
                        src={images[current]}
                        alt={`Über Uns Bild ${current + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-all duration-700"
                        priority
                    />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                        {images.map((_, idx) => (
                            <span
                                key={idx}
                                className={`inline-block w-3 h-3 rounded-full ${idx === current ? 'bg-green-600' : 'bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Das Team */}
                <div className="w-full flex flex-col md:flex-row items-center mb-8 gap-8">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4">Das Team</h2>
                        <p className="mb-4 text-justify">
                            Unser engagiertes Team besteht aus erfahrenen Schreinern, kreativen Planern und zuverlässigen Monteuren. Gemeinsam setzen wir Ihre Wünsche mit Leidenschaft, Präzision und handwerklichem Können um.
                        </p>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src="/team.jpg"
                                alt="Das Team"
                                fill
                                style={{ objectFit: "cover" }}
                                className="transition-all duration-700"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}