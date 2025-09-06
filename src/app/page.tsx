"use client";

import Image from 'next/image';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './page.module.css';

// Übersetzungen für die Startseite
const translations = {
    de: {
        title: "Schreinerei Jürgensen & Hillesheim GmbH",
        welcome: "Willkommen bei der Schreinerei Jürgensen & Hillesheim GmbH – Ihrem Partner für individuelle Holzarbeiten, Möbel nach Maß und hochwertige Innenausbauten. Entdecken Sie unsere Leidenschaft für das Schreinerhandwerk!",
        langSwitch: "English",
    },
    en: {
        title: "Jürgensen & Hillesheim Carpentry Ltd.",
        welcome: "Welcome to Jürgensen & Hillesheim Carpentry Ltd. – your partner for custom woodwork, bespoke furniture, and high-quality interior fittings. Discover our passion for craftsmanship!",
        langSwitch: "Deutsch",
    }
};

export default function Home() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = translations[lang];

    return(
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} setLang={setLang} />

            <main className="flex-1">
                <section
                    id="start"
                    className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center mb-8"
                >
                    <Image
                        src="/start2.jpg"
                        alt={lang === "de" ? "Schreinerei Hintergrund" : "Carpentry background"}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="z-0"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                </section>

                <div className="max-w-4xl mx-auto p-6">
                    <section id="start" className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
                            {t.title}
                        </h2>
                        <p className="mb-4 text-justify">
                            {t.welcome}
                        </p>
                    </section>
                </div>
            </main>

            <div className="w-full">
                <Footer lang={lang} />
            </div>
        </div>
    );
}