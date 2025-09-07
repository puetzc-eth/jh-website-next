"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHome, FaAddressBook, FaRegImages, FaMoon, FaSun } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import Image from "next/image";
import navTranslations from "./header-content.json" assert { type: "json" };

// Sprachumschalter als Switch (ohne Beschriftung an der Seite, Schrift immer dunkel)
function LanguageSwitch({
    lang,
    setLang,
    open,
}: {
    lang: "de" | "en";
    setLang: (l: "de" | "en") => void;
    open: boolean;
}) {
    const isEnglish = lang === "en";
    return (
        <div className="flex items-center justify-center w-full px-4 py-2 mt-4 mb-2">
            <button
                onClick={() => setLang(isEnglish ? "de" : "en")}
                aria-label="Sprache wechseln"
                type="button"
                className="relative w-12 h-6 rounded-full transition-colors duration-300 bg-gray-300 focus:outline-none"
            >
                <span
                    className={`absolute top-0 left-0 w-6 h-6 rounded-full bg-white border border-gray-400 shadow transition-transform duration-300 flex items-center justify-center ${
                        isEnglish ? "translate-x-6" : "translate-x-0"
                    }`}
                >
                    <span className="text-xs font-bold text-black">{isEnglish ? "EN" : "DE"}</span>
                </span>
            </button>
        </div>
    );
}

// Theme Toggle Button als Switch
function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            setDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDark(false);
        }
    }, []);

    const toggleTheme = () => {
        if (dark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDark(true);
        }
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            aria-label="Theme wechseln"
            type="button"
            className="flex items-center justify-center px-4 py-2 mt-2 mb-2 w-full"
        >
            <span className="relative flex items-center">
                <span
                    className={`block w-12 h-6 rounded-full transition-colors duration-300 ${
                        dark ? "bg-gray-700" : "bg-gray-300"
                    }`}
                ></span>
                <span
                    className={`absolute left-0 top-0 w-6 h-6 rounded-full bg-white border border-gray-400 shadow transition-transform duration-300 flex items-center justify-center ${
                        dark ? "translate-x-6" : "translate-x-0"
                    }`}
                >
                    {dark ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-400" />}
                </span>
            </span>
        </button>
    );
}

export default function Header({
    lang = "de",
    setLang,
}: {
    lang?: "de" | "en";
    setLang?: (l: "de" | "en") => void;
}) {
    const [open, setOpen] = useState(false);
    const t = navTranslations[lang];

    return (
        <aside
            className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-gray-100 border-r border-gray-200 transition-all duration-700 ${
                open ? "w-64" : "w-20"
            } group`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className={`p-4 border-b border-gray-200 flex flex-col items-center justify-center w-full`}>
                <Link href="/" className="relative flex flex-col items-center w-full focus:outline-none" aria-label="Zur Startseite">
                    <div className="w-16 h-16 mb-2 relative">
                        <Image
                            src="/logo_png.png"
                            alt="Firmenlogo"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>
                    <span
                        className={`mt-2 text-base font-semibold text-gray-800 text-center leading-tight transition-all duration-300 ${
                            open ? "opacity-100 ml-0" : "opacity-0 ml-[-100px]"
                        }`}
                        style={{ whiteSpace: "pre-line" }}
                    >
                        Jürgensen &amp;
                        {"\n"}
                        Hillesheim
                    </span>
                </Link>
            </div>
            <nav className="flex-1 flex flex-col justify-start items-center pt-16 pb-8 gap-10">
                <Link
                    href="/"
                    className="flex flex-col items-center text-black font-medium group transition-transform duration-300 hover:scale-110"
                >
                    <FaHome className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-125" />
                    <span
                        className={`transition-all duration-300 ${
                            open
                                ? "opacity-100 ml-0 translate-x-0"
                                : "opacity-0 -translate-x-6 pointer-events-none"
                        }`}
                    >
                        {t.start}
                    </span>
                </Link>
                <Link
                    href="/about"
                    className="flex flex-col items-center text-black font-medium group transition-transform duration-300 hover:scale-110"
                >
                    <HiUserGroup className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-125" />
                    <span
                        className={`transition-all duration-300 ${
                            open
                                ? "opacity-100 ml-0 translate-x-0"
                                : "opacity-0 -translate-x-6 pointer-events-none"
                        }`}
                    >
                        {t.about}
                    </span>
                </Link>
                <Link
                    href="/references"
                    className="flex flex-col items-center text-black font-medium group transition-transform duration-300 hover:scale-110"
                >
                    <FaRegImages className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-125" />
                    <span
                        className={`transition-all duration-300 ${
                            open
                                ? "opacity-100 ml-0 translate-x-0"
                                : "opacity-0 -translate-x-6 pointer-events-none"
                        }`}
                    >
                        {t.references}
                    </span>
                </Link>
                <Link
                    href="/contact"
                    className="flex flex-col items-center text-black font-medium group transition-transform duration-300 hover:scale-110"
                >
                    <FaAddressBook className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-125" />
                    <span
                        className={`transition-all duration-300 ${
                            open
                                ? "opacity-100 ml-0 translate-x-0"
                                : "opacity-0 -translate-x-6 pointer-events-none"
                        }`}
                    >
                        {t.contact}
                    </span>
                </Link>
            </nav>
            <div className="flex flex-col items-center w-full mb-2 gap-1">
                {setLang && <LanguageSwitch lang={lang} setLang={setLang} open={open} />}
                <ThemeToggle />
            </div>
        </aside>
    );
}