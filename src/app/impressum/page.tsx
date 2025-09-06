"use client";

import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

// Übersetzungen für die Impressum-Seite
const translations = {
    de: {
        title: "Impressum",
        company: "Jürgensen & Hillesheim GmbH",
        address: ["Bayreuther Straße 44", "40597 Düsseldorf", "Deutschland"],
        represented: "Vertreten durch:",
        representatives: "Martin Pütz und Tobias Hillesheim",
        contact: "Kontakt:",
        phone: "Telefon: +49 211 555905",
        email: "E-Mail: juergensen_hillesheim@t-online.de",
        register: "Registereintrag:",
        registerDetails: [
            "Eintragung im Handelsregister.",
            "Registergericht: Düsseldorf",
            "Registernummer: HRB 25208",
            "Handwerkskammer: Düsseldorf",
            "Kreishandwerkerschaft: Düsseldorf"
        ],
        vat: "Umsatzsteuer-ID:",
        vatDetails: [
            "Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:",
            "DE103/5738/0406"
        ],
        disclaimer: "Haftungsausschluss:",
        disclaimerText: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
        langSwitch: "English"
    },
    en: {
        title: "Imprint",
        company: "Jürgensen & Hillesheim Ltd.",
        address: ["Bayreuther Straße 44", "40597 Düsseldorf", "Germany"],
        represented: "Represented by:",
        representatives: "Martin Pütz and Tobias Hillesheim",
        contact: "Contact:",
        phone: "Phone: +49 211 555905",
        email: "Email: juergensen_hillesheim@t-online.de",
        register: "Commercial Register:",
        registerDetails: [
            "Entry in the commercial register.",
            "Register court: Düsseldorf",
            "Register number: HRB 25208",
            "Chamber of Crafts: Düsseldorf",
            "District Crafts Association: Düsseldorf"
        ],
        vat: "VAT ID:",
        vatDetails: [
            "VAT identification number according to §27 a Value Added Tax Act:",
            "DE103/5738/0406"
        ],
        disclaimer: "Disclaimer:",
        disclaimerText: "Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.",
        langSwitch: "Deutsch"
    }
};

export default function Impressum() {
    const [lang, setLang] = useState<"de" | "en">("de");
    const t = translations[lang];

    return (
        <div className="min-h-screen flex flex-col">
            <Header lang={lang} setLang={setLang} />
            <main className="flex-1 max-w-3xl mx-auto p-6 mt-10">
                <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
                <div className="mb-4">
                    <strong>{t.company}</strong><br />
                    {t.address.map((line, i) => (
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
                    {t.registerDetails.map((line, i) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </div>
                <div className="mb-4">
                    <strong>{t.vat}</strong><br />
                    {t.vatDetails.map((line, i) => (
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