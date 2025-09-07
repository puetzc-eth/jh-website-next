"use client";
import { FaInstagram, FaGithub } from "react-icons/fa";
import footerTranslations from "./footer-content.json" assert { type: "json" };

export default function Footer({ lang = "de" }: { lang?: "de" | "en" }) {
    const t = footerTranslations[lang];

    return (
        <footer className="w-full border-t mt-12">
            <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-8 text-sm">
                <div>
                    <span className="font-bold block mb-1">{t.company}</span>
                    {t.address.map((line: string, i: number) => (
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
                <div className="flex flex-col items-start gap-4 md:justify-end">
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram className="text-3xl hover:text-green-600" />
                    </a>
                    <a href="https://github.com/puetzc-eth/jh-website-next" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub className="text-3xl hover:text-green-600" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
