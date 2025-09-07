"use client";

import { useState, useRef } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from "next/image";
import aboutContent from './content.json' assert { type: "json" };

export default function About() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = aboutContent[lang];
    const [modalIdx, setModalIdx] = useState<number | null>(null);

    // Slideshow Bilder und Beschreibungen aus JSON
    const slideshowImages = t.slideshow;
    const [slide, setSlide] = useState(0);

    // Touch/Swipe für Slideshow
    const touchStartX = useRef<number | null>(null);

    function handleTouchStart(e: React.TouchEvent) {
        touchStartX.current = e.touches[0].clientX;
    }
    function handleTouchEnd(e: React.TouchEvent) {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (deltaX > 50) {
            setSlide((slide - 1 + slideshowImages.length) % slideshowImages.length);
        } else if (deltaX < -50) {
            setSlide((slide + 1) % slideshowImages.length);
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
                    <h2 className="text-2xl font-bold mb-4">{t.title}</h2>
                    <p className="mb-4 text-justify">
                        {t.text}
                    </p>
                    {/* Slideshow mit Swipe */}
                    <div className="w-full max-w-4xl mx-auto mb-10">
                        <div
                            className="relative aspect-[4/3] overflow-hidden"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
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
                                        {/* Bildbeschreibung am oberen Bildrand */}
                                        {/*
                                        <div className="absolute top-0 left-0 w-full bg-black/50 text-white text-center py-2 text-sm">
                                            {img.desc}
                                        </div>
                                        */}
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
                            {/* Leiste statt Punkte */}
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
                        <h3 className="text-xl font-semibold mb-4">
                            {t.galleryTitle}
                        </h3>
                        <p className="mb-6 text-justify">
                            {t.galleryIntro}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {t.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`flex flex-col items-center group focus:outline-none
                                        ${idx === 6 ? "md:col-start-2" : ""}
                                    `}
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
                            ))}
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
            <Footer lang={lang} />
        </div>
    );
}

