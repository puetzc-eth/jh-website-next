"use client";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 border-t border-gray-200 mt-12">
            <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-8 text-gray-700 text-sm">
                <div>
                    <span className="font-bold block mb-1">Jürgensen & Hillesheim GmbH</span>
                    Bayreuther Straße 44<br />
                    40597 Düsseldorf<br />
                    Deutschland
                </div>
                <div>
                    <span className="font-bold block mb-1">Kontakt</span>
                    Tel: <a href="tel:+49211555905" className="hover:text-green-600">+49 211 555905</a><br />
                    Mobil: <a href="tel:+491723856689" className="hover:text-green-600">+49 172 3856689</a><br />
                    E-Mail: <a href="mailto:juergensen_hillesheim@t-online.de" className="hover:text-green-600">juergensen_hillesheim@t-online.de</a>
                </div>
                <div>
                    <span className="font-bold block mb-1">Rechtliches</span>
                    <a href="/impressum" className="hover:text-green-600">Impressum</a><br />
                    <a href="/contact" className="hover:text-green-600">Kontakt</a>
                </div>
            </div>
        </footer>
    );
}
