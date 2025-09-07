"use client";

import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import content from './content.json' assert { type: "json" };

export default function Impressum() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = content[lang];

    return (
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} setLang={setLang} />
            <main className="flex-1 max-w-3xl mx-auto p-6 mt-10">
                <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
                <div className="mb-4">
                    <strong>{t.company}</strong><br />
                    {t.address.map((line: string, i: number) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </div>
                <div className="mb-4">
                    <strong>{t.represented}</strong><br />
                    {t.representatives}
                </div>
                <div className="mb-4">
                    <strong>{t.contact}</strong><br />
                    {t.phone}<br />
                    {t.email}
                </div>
                <div className="mb-4">
                    <strong>{t.register}</strong><br />
                    {t.registerDetails.map((line: string, i: number) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </div>
                <div className="mb-4">
                    <strong>{t.vat}</strong><br />
                    {t.vatDetails.map((line: string, i: number) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </div>
                <div className="mb-4">
                    <strong>{t.disclaimer}</strong><br />
                    {t.disclaimerText}
                </div>
            </main>
            <Footer lang={lang} />
        </div>
    );
}