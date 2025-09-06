"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Impressum() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-3xl mx-auto p-6 mt-10">
                <h1 className="text-3xl font-bold mb-6">Impressum</h1>
                <div className="mb-4">
                    <strong>Jürgensen & Hillesheim GmbH</strong><br />
                    Bayreuther Straße 44<br />
                    40597 Düsseldorf<br />
                    Deutschland
                </div>
                <div className="mb-4">
                    <strong>Vertreten durch:</strong><br />
                    Martin Pütz und Tobias Hillesheim
                </div>
                <div className="mb-4">
                    <strong>Kontakt:</strong><br />
                    Telefon: +49 211 555905<br />
                    E-Mail: juergensen_hillesheim@t-online.de
                </div>
                <div className="mb-4">
                    <strong>Registereintrag:</strong><br />
                    Eintragung im Handelsregister.<br />
                    Registergericht: Düsseldorf<br />
                    Registernummer: HRB 25208<br />
                    Handwerkskammer: Düsseldorf<br />
                    Kreishandwerkerschaft: Düsseldorf
                </div>
                <div className="mb-4">
                    <strong>Umsatzsteuer-ID:</strong><br />
                    Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                    DE103/5738/0406
                </div>
                <div className="mb-4">
                    <strong>Haftungsausschluss:</strong><br />
                    Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                </div>
            </main>
            <Footer />
        </div>
    );
}