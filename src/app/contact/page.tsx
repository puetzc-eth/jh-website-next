"use client";

import { useState, useRef, useEffect } from "react";
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import content from './content.json' assert { type: "json" };

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

export default function Contact() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = content[lang];
    const formTexts = t.form;

    // Formular State
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    // Linien-Animation für Überschrift
    const [lineRef, lineVisible] = useLineInView<HTMLDivElement>();

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
    }

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
                    <p className="mb-8 text-justify">
                        {t.text}
                    </p>
                    {/* Kontaktinfos mit Icons nebeneinander */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8 items-stretch justify-between">
                        <div className="flex-1 flex items-center gap-3 rounded-lg shadow p-4">
                            <FaPhoneAlt className="text-green-700 text-xl shrink-0" />
                            <div>
                                <div className="font-semibold">+49 211 555905</div>
                                <div className="text-xs">{formTexts.phone}</div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center gap-3 rounded-lg shadow p-4">
                            <FaEnvelope className="text-green-700 text-xl shrink-0" />
                            <div>
                                <a
                                    href="mailto:juergensen_hillesheim@t-online.de"
                                    className="font-semibold hover:underline text-xs break-all"
                                >
                                    juergensen_hillesheim@t-online.de
                                </a>
                                <div className="text-xs">{formTexts.mail}</div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center gap-3 rounded-lg shadow p-4">
                            <FaMapMarkerAlt className="text-green-700 text-xl shrink-0" />
                            <div>
                                <div className="font-semibold">{formTexts.street}</div>
                                <div className="text-xs">{formTexts.city}</div>
                                <div className="text-xs">{formTexts.country}</div>
                            </div>
                        </div>
                    </div>
                    {/* Kontaktformular und Karte nebeneinander */}
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <form
                            className="rounded-lg shadow p-6 flex flex-col gap-4 flex-1 min-w-0"
                            onSubmit={handleSubmit}
                        >
                            <label className="font-semibold">
                                {formTexts.name}
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="block w-full mt-1 p-2 rounded border "
                                />
                            </label>
                            <label className="font-semibold">
                                {formTexts.email}
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full mt-1 p-2 rounded border "
                                />
                            </label>
                            <label className="font-semibold">
                                {formTexts.message}
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="block w-full mt-1 p-2 rounded border "
                                />
                            </label>
                            <button
                                type="submit"
                                className="mt-2 px-6 py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded shadow"
                                disabled={submitted}
                            >
                                {formTexts.send}
                            </button>
                            {submitted && (
                                <div className="text-green-700 font-semibold mt-2">
                                    {formTexts.success}
                                </div>
                            )}
                        </form>
                        <div className="flex-1 min-w-0 flex">
                            <iframe
                                title={t.mapTitle}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.010692587635!2d6.799211!3d51.230495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8c97e7b2e2b1b%3A0x8e2e8e8e8e8e8e8e!2sBayreuther%20Str.%2044%2C%2040527%20D%C3%BCsseldorf!5e0!3m2!1sde!2sde!4v1690000000000!5m2!1sde!2sde"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-lg shadow w-full h-full min-h-[350px]"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </main>
            <Footer lang={lang} />
        </div>
    );
}