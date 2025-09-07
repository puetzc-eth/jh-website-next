"use client";

import { useState, useRef, useEffect } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from "next/image";
import aboutContent from './content.json' assert { type: "json" };

// Hilfs-Hook für Intersection Observer
function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
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
    }, []);
    return [ref, inView] as const;
}

// Hook für animierte Linien neben Überschriften
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

export default function About() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = aboutContent[lang];
    const [modalIdx, setModalIdx] = useState<number | null>(null);

    // Linien-Animationen für Überschriften
    const [aboutLineRef, aboutLineVisible] = useLineInView<HTMLDivElement>();
    const [galleryLineRef, galleryLineVisible] = useLineInView<HTMLDivElement>();
    const [partnersLineRef, partnersLineVisible] = useLineInView<HTMLDivElement>();

    // Haupt-Slideshow
    const slideshowImages = t.slideshow;
    const [slide, setSlide] = useState(0);

    // Touch/Swipe für Slideshow
    const touchStartX = useRef<number | null>(null);
    function handleTouchStart(e: React.TouchEvent) {
        touchStartX.current = e.touches[0].clientX;
    }
    function handleTouchEnd(e: React.TouchEvent, setFn: (n: number) => void, images: any[], idx: number) {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (deltaX > 50) {
            setFn((idx - 1 + images.length) % images.length);
        } else if (deltaX < -50) {
            setFn((idx + 1) % images.length);
        }
        touchStartX.current = null;
    }

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
                <div className="max-w-4xl mx-auto p-6">
                    {/* Überschrift mit animierter Linie */}
                    <div className="flex items-center mb-4" ref={aboutLineRef}>
                        <h2 className="text-2xl font-bold">{t.title}</h2>
                        <div
                            className={`flex-1 h-px bg-gray-300 ml-4 transition-all duration-[1600ms] ease-out origin-left
                                ${aboutLineVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
                            `}
                        />
                    </div>
                    <p className="mb-4 text-justify">
                        {t.text}
                    </p>
                    {/* Haupt-Slideshow */}
                    <div className="w-full max-w-4xl mx-auto mb-10">
                        <div
                            className="relative aspect-[4/3] overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={e => handleTouchEnd(e, setSlide, slideshowImages, slide)}
                        >
                            <div
                                className="w-full h-full transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${slide * 100}%)`,
                                    display: "flex"
                                }}
                            >
                                {slideshowImages.map((img, i) => (
                                    <div
                                        key={i}
                                        className="w-full h-full flex-shrink-0 relative"
                                        style={{ minWidth: "100%" }}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            priority={i === 0}
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Vorheriges Bild */}
                            <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
                                onClick={() => setSlide((slide - 1 + slideshowImages.length) % slideshowImages.length)}
                                aria-label="Vorheriges Bild"
                                type="button"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            {/* Nächstes Bild */}
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white text-2xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
                                onClick={() => setSlide((slide + 1) % slideshowImages.length)}
                                aria-label="Nächstes Bild"
                                type="button"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            {/* Leiste */}
                            <div className="absolute bottom-3 left-0 w-full flex justify-center">
                                <div className="w-1/4 h-1 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div
                                        className="h-1 bg-green-700 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${100 / slideshowImages.length}%`,
                                            left: `calc(${(100 / slideshowImages.length) * slide}% )`,
                                            position: "absolute",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Galerie mit sieben Bildern */}
                    <div className="mt-10">
                        <div className="flex items-center mb-4" ref={galleryLineRef}>
                            <h3 className="text-xl font-semibold">{t.galleryTitle}</h3>
                            <div
                                className={`flex-1 h-px bg-gray-300 ml-4 transition-all duration-[1600ms] ease-out origin-left
                                    ${galleryLineVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
                                `}
                            />
                        </div>
                        <p className="mb-6 text-justify">
                            {t.galleryIntro}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {t.images.map((img, idx) => {
                                const [ref, inView] = useInView<HTMLButtonElement>(0.15);
                                return (
                                    <button
                                        key={idx}
                                        ref={ref}
                                        type="button"
                                        className={`flex flex-col items-center group focus:outline-none transition-all duration-700
                                            ${idx === 6 ? "md:col-start-2" : ""}
                                            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                                        `}
                                        style={{ transitionDelay: `${idx * 80}ms` }}
                                        onClick={() => setModalIdx(idx)}
                                        aria-label={img.title}
                                    >
                                        <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden shadow group-hover:scale-105 transition-transform">
                                            <Image
                                                src={img.src}
                                                alt={img.title}
                                                fill
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                        <span className="mt-2 text-center font-medium">
                                            {img.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* Modal für Bildbeschreibung (wie bei references) */}
                {modalIdx !== null && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setModalIdx(null)}
                    >
                        <div
                            className="relative max-w-5xl w-[95vw] max-h-[90vh] flex flex-col md:flex-row items-center bg-transparent animate-fade-in-scale"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Bild links */}
                            <div className="flex-1 flex items-center justify-center max-w-[600px] w-full relative">
                                <Image
                                    src={t.images[modalIdx].src}
                                    alt={t.images[modalIdx].title}
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
                                        setModalIdx((prev) => prev !== null ? (prev + t.images.length - 1) % t.images.length : 0);
                                    }}
                                    aria-label={t.close}
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
                                        setModalIdx((prev) => prev !== null ? (prev + 1) % t.images.length : 0);
                                    }}
                                    aria-label={t.close}
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
                                <h4 className="text-lg font-semibold mb-2 text-white">{t.images[modalIdx].title}</h4>
                                <p className="text-white">{t.images[modalIdx].desc}</p>
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
            {/* Unsere Partner ganz unten */}
            <section className="w-full mt-16 py-12">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center mb-4" ref={partnersLineRef}>
                        <h3 className="text-xl font-semibold">
                            {t.partnersTitle}
                        </h3>
                        <div
                            className={`flex-1 h-px bg-gray-300 ml-4 transition-all duration-[1600ms] ease-out origin-left
                                ${partnersLineVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
                            `}
                        />
                    </div>
                    <p className="mb-8 text-justify">
                        {t.partnersText}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
                        {t.partners.map((partner, idx) => {
                            const [ref, inView] = useInView<HTMLDivElement>(0.15);
                            return (
                                <div
                                    className={`flex flex-col items-center group transition-all duration-700
                                        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                                    `}
                                    ref={ref}
                                    key={idx}
                                    style={{ transitionDelay: `${idx * 80}ms` }}
                                >
                                    <a
                                        href={partner.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full h-40 block relative"
                                        tabIndex={0}
                                    >
                                        <Image
                                            src={partner.src}
                                            alt={partner.alt}
                                            fill
                                            className="object-contain"
                                            style={{ objectFit: "contain" }}
                                            sizes="(max-width: 640px) 100vw, 33vw"
                                        />
                                        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium bg-black/60 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 rounded-lg">
                                            {partner.name}
                                        </span>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <Footer lang={lang} />
        </div>
    );
}

