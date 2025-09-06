"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHome, FaInfoCircle, FaAddressBook, FaRegImages, FaMoon, FaSun } from "react-icons/fa";
import Image from "next/image";

// Theme Toggle Button
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
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors mt-8 mb-2"
            aria-label="Theme wechseln"
            type="button"
        >
            {dark ? <FaSun /> : <FaMoon />}
            {dark ? "Lightmode" : "Darkmode"}
        </button>
    );
}

export default function Header() {
    const [open, setOpen] = useState(false);

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
                        Start
                    </span>
                </Link>
                <Link
                    href="/about"
                    className="flex flex-col items-center text-black font-medium group transition-transform duration-300 hover:scale-110"
                >
                    <FaInfoCircle className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-125" />
                    <span
                        className={`transition-all duration-300 ${
                            open
                                ? "opacity-100 ml-0 translate-x-0"
                                : "opacity-0 -translate-x-6 pointer-events-none"
                        }`}
                    >
                        Über Uns
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
                        Referenzen
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
                        Kontakt
                    </span>
                </Link>
            </nav>
            <div className="flex flex-col items-center mt-auto mb-4">
                <ThemeToggle />
            </div>
        </aside>
    );
}