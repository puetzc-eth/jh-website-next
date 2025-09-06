"use client";

import { useState } from "react";
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Image from "next/image";

// Übersetzungen für die Kontakt-Seite
const translations = {
    de: {
        heroAlt: "Schreinerei Hintergrund",
        title: "Kontakt",
        text: "Seit über 30 Jahren stehen wir für Qualität, Zuverlässigkeit und kreative Lösungen im Schreinerhandwerk. Unser erfahrenes Team verbindet traditionelles Handwerk mit modernen Techniken, um Ihre Wünsche zu verwirklichen.",
        langSwitch: "English",
        mapTitle: "Standort",
    },
    en: {
        heroAlt: "Carpentry background",
        title: "Contact",
        text: "For over 30 years, we have stood for quality, reliability, and creative solutions in carpentry. Our experienced team combines traditional craftsmanship with modern techniques to realize your wishes.",
        langSwitch: "Deutsch",
        mapTitle: "Location",
    }
};

export default function Contact() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = translations[lang];

    return (
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} setLang={setLang} />
            <main className="flex-1 w-full mt-0">
                {/* Bild über die gesamte Breite */}
                <section
                    id="contact-hero"
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
                    {/* Sprachumschalter oben rechts */}
                    <button
                        className="absolute top-4 right-4 z-50 bg-white/80 dark:bg-gray-900/80 px-4 py-2 rounded shadow text-sm font-semibold"
                        onClick={() => setLang(lang === "de" ? "en" : "de")}
                        aria-label="Sprache wechseln"
                        type="button"
                    >
                        {t.langSwitch}
                    </button>
                </section>
                <div className="max-w-3xl mx-auto p-6">
                    <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
                    <p className="mb-4 text-justify">
                        {t.text}
                    </p>
                    <div className="mb-8">
                        <iframe
                            title={t.mapTitle}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.010692587635!2d6.799211!3d51.230495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8c97e7b2e2b1b%3A0x8e2e8e8e8e8e8e8e!2sBayreuther%20Str.%2044%2C%2040527%20D%C3%BCsseldorf!5e0!3m2!1sde!2sde!4v1690000000000!5m2!1sde!2sde"
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg shadow"
                        ></iframe>
                    </div>                    
                    {/* Weitere Kontaktinformationen oder ein Kontaktformular hier einfügen */}
                </div>
            </main>
            <Footer lang={lang} />
        </div>
    );
}