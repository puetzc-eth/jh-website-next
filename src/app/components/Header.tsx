"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHome, FaInfoCircle, FaAddressBook, FaRegImages } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <aside
            className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-gray-100 border-r border-gray-200 transition-all duration-700 ${
                open ? "w-48" : "w-20"
            } group`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="p-4 border-b border-gray-200 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-full">
                    <div className="w-16 h-16 mb-2 relative">
                        <Image
                            src="/logo.svg"
                            alt="Firmenlogo"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </div>
                </div>
            </div>
            <nav className="flex-1 flex flex-col justify-start items-center py-8 space-y-10">
                <Link
                    href="/"
                    className="flex flex-col items-center text-black font-medium group transition-transform duration-300 hover:scale-110"
                >
                    <FaHome className="text-3xl mb-2 transition-transform duration-300 group-hover:scale-125" />
                    <span
                        className={`transition-all duration-300 ${
                            open ? "opacity-100 ml-0" : "opacity-0 ml-[-100px]"
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
                            open ? "opacity-100 ml-0" : "opacity-0 ml-[-100px]"
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
                            open ? "opacity-100 ml-0" : "opacity-0 ml-[-100px]"
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
                            open ? "opacity-100 ml-0" : "opacity-0 ml-[-100px]"
                        }`}
                    >
                        Kontakt
                    </span>
                </Link>
            </nav>
        </aside>
    );
}