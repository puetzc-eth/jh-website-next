"use client";

import { useState, useRef, useEffect } from "react";
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Image from "next/image";

// Übersetzungen für die References-Seite
const translations = {
    de: {
        heroAlt: "Schreinerei Hintergrund",
        title: "Expertise",
        text: "Seit über 30 Jahren stehen wir für Qualität, Zuverlässigkeit und kreative Lösungen im Schreinerhandwerk. Unser erfahrenes Team verbindet traditionelles Handwerk mit modernen Techniken, um Ihre Wünsche zu verwirklichen.",
        langSwitch: "English",
        prev: "Vorheriges Bild",
        next: "Nächstes Bild",
        close: "Schließen",
    },
    en: {
        heroAlt: "Carpentry background",
        title: "Expertise",
        text: "For over 30 years, we have stood for quality, reliability, and creative solutions in carpentry. Our experienced team combines traditional craftsmanship with modern techniques to realize your wishes.",
        langSwitch: "Deutsch",
        prev: "Previous image",
        next: "Next image",
        close: "Close",
    }
};

// Slideshows für beide Sprachen
const slideshowsData = {
    de: [
        [
            { src: "/about1.jpg", text: "Innenausbau und Möbeldesign", desc: "Maßgefertigte Möbel und Innenausbau für ein modernes Wohnambiente." },
            { src: "/about2.jpg", text: "Detailansicht Möbel", desc: "Feine Details und hochwertige Verarbeitung unserer Möbelstücke." },
            { src: "/team.jpg", text: "Wohnbereich mit Einbaumöbeln", desc: "Individuelle Einbaumöbel, die sich perfekt in den Wohnraum einfügen." }, 
        ],
        [
            { src: "/referenz2.jpg", text: "Treppenbau", desc: "Stilvolle und stabile Holztreppen für jedes Zuhause." },
            { src: "/referenz2b.jpg", text: "Treppenstufen Detail", desc: "Detailaufnahme der präzise gearbeiteten Treppenstufen." },
            { src: "/referenz2c.jpg", text: "Treppengeländer", desc: "Sicheres und elegantes Geländer aus Massivholz." },
        ],
        [
            { src: "/referenz3.jpg", text: "Fenster und Türen", desc: "Individuelle Fenster und Türen aus eigener Fertigung." },
            { src: "/referenz3b.jpg", text: "Fenster Detail", desc: "Detailansicht eines modernen Holzfensters." },
            { src: "/referenz3c.jpg", text: "Türblatt", desc: "Massive Türblätter mit edler Oberfläche." },
        ],
        [
            { src: "/referenz4.jpg", text: "Messebau", desc: "Individuelle Messestände für einen starken Auftritt." },
            { src: "/referenz4b.jpg", text: "Messestand Aufbau", desc: "Aufbauphase eines Messestands mit unserem Team." },
            { src: "/referenz4c.jpg", text: "Messestand Detail", desc: "Detailaufnahme eines Messestands mit hochwertigen Materialien." },
        ],
        [
            { src: "/referenz5.jpg", text: "Reparaturen und Restaurationen", desc: "Fachgerechte Reparaturen und liebevolle Restaurationen." },
            { src: "/referenz5b.jpg", text: "Restauriertes Möbelstück", desc: "Ein altes Möbelstück in neuem Glanz." },
            { src: "/referenz5c.jpg", text: "Vorher-Nachher Vergleich", desc: "Vergleich vor und nach der Restauration." },
        ],
        [
            { src: "/referenz6.jpg", text: "Fussböden", desc: "Hochwertige Holzfußböden für ein warmes Wohngefühl." },
            { src: "/referenz6b.jpg", text: "Parkettverlegung", desc: "Präzise Verlegung von Parkettböden." },
            { src: "/referenz6c.jpg", text: "Boden Detail", desc: "Detailansicht eines edlen Holzfußbodens." },
        ],
        [
            { src: "/referenz7.jpg", text: "Badmöbel", desc: "Individuelle Badmöbel für Ihr Traumbad." },
            { src: "/referenz7b.jpg", text: "Waschtisch", desc: "Moderner Waschtisch aus Massivholz." },
            { src: "/referenz7c.jpg", text: "Spiegelschrank", desc: "Praktischer Spiegelschrank mit viel Stauraum." },
        ],
        [
            { src: "/referenz8.jpg", text: "Schränke", desc: "Maßgefertigte Schränke für jeden Raum." },
            { src: "/referenz8b.jpg", text: "Einbauschrank", desc: "Einbauschrank mit optimaler Raumnutzung." },
            { src: "/referenz8c.jpg", text: "Schrank Innenleben", desc: "Durchdachtes Innenleben für beste Ordnung." },
        ],
    ],
    en: [
        [
            { src: "/about1.jpg", text: "Interior Construction and Furniture Design", desc: "Custom-made furniture and interior construction for a modern living atmosphere." },
            { src: "/about2.jpg", text: "Furniture Detail View", desc: "Fine details and high-quality workmanship of our furniture pieces." },
            { src: "/team.jpg", text: "Living Area with Built-in Furniture", desc: "Custom built-in furniture that fits perfectly into the living space." }, 
        ],
        [
            { src: "/referenz2.jpg", text: "Staircase Construction", desc: "Stylish and sturdy wooden staircases for every home." },
            { src: "/referenz2b.jpg", text: "Stair Tread Detail", desc: "Close-up of precisely crafted stair treads." },
            { src: "/referenz2c.jpg", text: "Stair Railing", desc: "Safe and elegant railing made of solid wood." },
        ],
        [
            { src: "/referenz3.jpg", text: "Windows and Doors", desc: "Custom windows and doors from our own production." },
            { src: "/referenz3b.jpg", text: "Window Detail", desc: "Detail view of a modern wooden window." },
            { src: "/referenz3c.jpg", text: "Door Leaf", desc: "Solid door leaves with a noble surface." },
        ],
        [
            { src: "/referenz4.jpg", text: "Exhibition Stand Construction", desc: "Custom exhibition stands for a strong appearance." },
            { src: "/referenz4b.jpg", text: "Exhibition Stand Setup", desc: "Setup phase of an exhibition stand with our team." },
            { src: "/referenz4c.jpg", text: "Exhibition Stand Detail", desc: "Detail view of an exhibition stand with high-quality materials." },
        ],
        [
            { src: "/referenz5.jpg", text: "Repairs and Restorations", desc: "Professional repairs and loving restorations." },
            { src: "/referenz5b.jpg", text: "Restored Piece of Furniture", desc: "An old piece of furniture in new splendor." },
            { src: "/referenz5c.jpg", text: "Before-After Comparison", desc: "Comparison before and after restoration." },
        ],
        [
            { src: "/referenz6.jpg", text: "Flooring", desc: "High-quality wooden floors for a warm living feeling." },
            { src: "/referenz6b.jpg", text: "Parquet Installation", desc: "Precise installation of parquet floors." },
            { src: "/referenz6c.jpg", text: "Floor Detail", desc: "Detail view of a noble wooden floor." },
        ],
        [
            { src: "/referenz7.jpg", text: "Bathroom Furniture", desc: "Custom bathroom furniture for your dream bathroom." },
            { src: "/referenz7b.jpg", text: "Washstand", desc: "Modern washstand made of solid wood." },
            { src: "/referenz7c.jpg", text: "Mirror Cabinet", desc: "Practical mirror cabinet with plenty of storage space." },
        ],
        [
            { src: "/referenz8.jpg", text: "Cabinets", desc: "Custom-made cabinets for every room." },
            { src: "/referenz8b.jpg", text: "Built-in Cabinet", desc: "Built-in cabinet with optimal use of space." },
            { src: "/referenz8c.jpg", text: "Cabinet Interior", desc: "Well-thought-out interior for best organization." },
        ],
    ]
};

// Hilfs-Hook für Intersection Observer
function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.2) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new window.IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, inView] as const;
}

export default function References() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = translations[lang];
    const slideshows = slideshowsData[lang];

    const [modalIdx, setModalIdx] = useState<number | null>(null);
    const [slideIdx, setSlideIdx] = useState(0);

    // Beim Öffnen Modal immer auf Slide 0
    useEffect(() => {
        if (modalIdx !== null) setSlideIdx(0);
    }, [modalIdx]);

    // Galerie-Übersicht (erstes Bild jeder Slideshow)
    const gallery = slideshows.map((group) => group[0]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} setLang={setLang} />
            <main className="flex-1 w-full mt-0">
                {/* Bild über die gesamte Breite */}
                <section
                    id="references-hero"
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
                </div>
                {/* Galerie mit Einfliegen */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto px-4 pb-12">
                    {gallery.map((item, idx) => {
                        const [ref, inView] = useInView<HTMLButtonElement>(0.15);
                        return (
                            <button
                                key={idx}
                                ref={ref}
                                className={`relative group aspect-square overflow-hidden focus:outline-none
                                    transition-all duration-700
                                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                                `}
                                style={{ transitionDelay: `${idx * 80}ms` }}
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
                        );
                    })}
                </div>
                {/* Modal für Slideshow */}
                {modalIdx !== null && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setModalIdx(null)}
                    >
                        <div
                            className="relative max-w-5xl w-[95vw] max-h-[90vh] flex flex-col md:flex-row items-center bg-transparent"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Bild links */}
                            <div className="flex-1 flex items-center justify-center max-w-[600px] w-full relative">
                                <Image
                                    src={slideshows[modalIdx][slideIdx].src}
                                    alt={slideshows[modalIdx][slideIdx].text}
                                    width={900}
                                    height={900}
                                    style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "80vh" }}
                                    className=""
                                    priority
                                />
                                {/* Vorheriges Bild */}
                                <button
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition z-10"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setSlideIdx((prev) => (prev + slideshows[modalIdx].length - 1) % slideshows[modalIdx].length);
                                    }}
                                    aria-label={t.prev}
                                    type="button"
                                >
                                    <span className="inline-block w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white" />
                                </button>
                                {/* Nächstes Bild */}
                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition z-10"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setSlideIdx((prev) => (prev + 1) % slideshows[modalIdx].length);
                                    }}
                                    aria-label={t.next}
                                    type="button"
                                >
                                    <span className="inline-block w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white" />
                                </button>
                            </div>
                            {/* Text rechts */}
                            <div className="flex-1 flex flex-col justify-center items-start p-8 max-w-md w-full">
                                <span className="text-white text-lg font-semibold mb-4">{slideshows[modalIdx][slideIdx].text}</span>
                                <p className="text-gray-200">
                                    {slideshows[modalIdx][slideIdx].desc}
                                </p>
                            </div>
                            {/* Schließen Button */}
                            <button
                                className="absolute top-2 right-2 text-white text-3xl font-bold bg-black/60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
                                onClick={() => setModalIdx(null)}
                                aria-label={t.close}
                                type="button"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <Footer lang={lang} />
        </div>
    );
}