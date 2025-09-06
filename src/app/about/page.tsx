"use client";

import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from "next/image";

// Übersetzungen für die About-Seite
const translations = {
    de: {
        heroAlt: "Schreinerei Hintergrund",
        title: "Über Uns",
        text: "Wir sind ein erfahrenes Team aus Schreinermeistern und Gesellen, das seit Jahrzehnten für Qualität, Zuverlässigkeit und kreative Lösungen steht. Unser Anspruch ist es, Ihre Wünsche mit handwerklicher Präzision und moderner Technik zu verwirklichen.",
        langSwitch: "English",
    },
    en: {
        heroAlt: "Carpentry background",
        title: "About Us",
        text: "We are an experienced team of master carpenters and journeymen, standing for quality, reliability, and creative solutions for decades. Our aim is to realize your wishes with craftsmanship precision and modern technology.",
        langSwitch: "Deutsch",
    }
};

export default function About() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = translations[lang];

    return (
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} setLang={setLang} />
            <main className="flex-1 w-full mt-0">
                {/* Bild über die gesamte Breite */}
                <section
                    id="about-hero"
                    className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center mb-8"
                    style={{ maxWidth: "100vw" }}
                >
                    <Image
                        src="/start.jpg"
                        alt={t.heroAlt}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="z-0"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                </section>
                <div className="max-w-3xl mx-auto p-6">
                    <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
                    <p className="mb-4 text-justify">
                        {t.text}
                    </p>
                    {/* Weitere Inhalte zu "Über Uns" hier einfügen */}
                </div>
            </main>
            <Footer lang={lang} />
        </div>
    );
}