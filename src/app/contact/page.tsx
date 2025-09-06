"use client";

import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto p-6 mt-20">
                <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
                <p className="mb-4 text-justify">
                    Seit über 30 Jahren stehen wir für Qualität, Zuverlässigkeit und kreative Lösungen im Schreinerhandwerk. Unser erfahrenes Team verbindet traditionelles Handwerk mit modernen Techniken, um Ihre Wünsche zu verwirklichen.
                </p>
                <div className="mb-8">
                    <iframe
                        title="Standort"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.504355274091!2d13.404954!3d52.520006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e3b0b0b0b0%3A0x0!2sMusterstraße%201%2C%2012345%20Musterstadt!5e0!3m2!1sde!2sde!4v1690000000000!5m2!1sde!2sde"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg shadow"
                    ></iframe>
                </div>
            </main>
            <Footer />
        </div>
    );
}