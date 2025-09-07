"use client";

import { useState, useRef, useEffect } from "react";
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Image from "next/image";
import content from './content.json' assert { type: "json" };

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

// Hook für animierte Linien neben Überschriften (wie bei About)
function useLineInView<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
    const ref = useRef<T | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new window.IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return [ref, visible] as const;
}

export default function References() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = content[lang];
    const slideshows = t.slideshows;

    const [modalIdx, setModalIdx] = useState<number | null>(null);
    const [slideIdx, setSlideIdx] = useState(0);

    // Linien-Animation für Überschrift
    const [lineRef, lineVisible] = useLineInView<HTMLDivElement>();

    // Beim Öffnen Modal immer auf Slide 0
    useEffect(() => {
        if (modalIdx !== null) setSlideIdx(0);
    }, [modalIdx]);

    // Galerie-Übersicht (erstes Bild jeder Slideshow)
    type Slide = { src: string; text: string; desc: string };
    const gallery: Slide[] = slideshows.map((group: Slide[]) => group[0]);

    // Refs und Sichtbarkeits-Array für Animation
    const galleryRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [galleryInView, setGalleryInView] = useState<boolean[]>(() => gallery.map(() => false));

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        galleryRefs.current.forEach((el, idx) => {
            if (!el) return;
            const observer = new window.IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setGalleryInView(prev => {
                            const next = [...prev];
                            next[idx] = true;
                            return next;
                        });
                        observer.disconnect();
                    }
                },
                { threshold: 0.15 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach(o => o.disconnect());
    }, [gallery.length]);

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
                </section>
                <div className="max-w-4xl mx-auto p-6">
                    {/* Überschrift mit animierter Linie */}
                    <div className="flex items-center mb-4" ref={lineRef}>
                        <h2 className="text-2xl font-bold">{t.title}</h2>
                        <div
                            className={`flex-1 h-px bg-gray-300 ml-4 transition-all duration-[1600ms] ease-out origin-left
                                ${lineVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
                            `}
                        />
                    </div>
                    <p className="mb-4 text-justify">
                        {t.text}
                    </p>
                </div>
                {/* Galerie mit Einfliegen */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto px-4 pb-12">
                    {gallery.map((item, idx) => (
                        <button
                            key={idx}
                            ref={el => { galleryRefs.current[idx] = el; }}
                            className={`relative group aspect-square overflow-hidden focus:outline-none
                                transition-all duration-700
                                ${galleryInView[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
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
                    ))}
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
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition z-10"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setSlideIdx((prev) => (prev + slideshows[modalIdx].length - 1) % slideshows[modalIdx].length);
                                    }}
                                    aria-label={t.prev}
                                    type="button"
                                >
                                    {/* Chevron Left */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                {/* Nächstes Bild */}
                                <button
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition z-10"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setSlideIdx((prev) => (prev + 1) % slideshows[modalIdx].length);
                                    }}
                                    aria-label={t.next}
                                    type="button"
                                >
                                    {/* Chevron Right */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
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