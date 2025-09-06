"use client";

const footerTranslations = {
    de: {
        company: "Jürgensen & Hillesheim GmbH",
        address: ["Bayreuther Straße 44", "40597 Düsseldorf", "Deutschland"],
        contact: "Kontakt",
        tel: "Tel",
        mobile: "Mobil",
        email: "E-Mail",
        legal: "Rechtliches",
        imprint: "Impressum",
        copyright: "Alle Rechte vorbehalten.",
    },
    en: {
        company: "Jürgensen & Hillesheim Ltd.",
        address: ["Bayreuther Straße 44", "40597 Düsseldorf", "Germany"],
        contact: "Contact",
        tel: "Phone",
        mobile: "Mobile",
        email: "Email",
        legal: "Legal",
        imprint: "Imprint",
        copyright: "All rights reserved.",
    }
};

export default function Footer({ lang = "de" }: { lang?: "de" | "en" }) {
    const t = footerTranslations[lang];

    return (
        <footer className="w-full border-t mt-12 ">
            <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-8 text-sm ">
                <div>
                    <span className="font-bold block mb-1">{t.company}</span>
                    {t.address.map((line, i) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </div>
                <div>
                    <span className="font-bold block mb-1">{t.contact}</span>
                    {t.tel}: <a href="tel:+49211555905" className="hover:text-green-600">+49 211 555905</a><br />
                    {t.mobile}: <a href="tel:+491723856689" className="hover:text-green-600">+49 172 3856689</a><br />
                    {t.email}: <a href="mailto:juergensen_hillesheim@t-online.de" className="hover:text-green-600">juergensen_hillesheim@t-online.de</a>
                </div>
                <div>
                    <span className="font-bold block mb-1">{t.legal}</span>
                    <a href="/impressum" className="hover:text-green-600">{t.imprint}</a><br />
                    <a href="/contact" className="hover:text-green-600">{t.contact}</a>
                </div>
            </div>
        </footer>
    );
}
