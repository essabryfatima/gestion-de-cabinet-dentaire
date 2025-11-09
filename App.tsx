
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import AppointmentForm from './components/AppointmentForm';
import AIDiagnosis from './components/AIDiagnosis';
import { SERVICES, ToothIcon } from './constants';
import type { Page } from './types';
import ServiceCard from './components/ServiceCard';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('accueil');

  const renderContent = () => {
    switch (activePage) {
      case 'accueil':
        return <HomeSection setActivePage={setActivePage} />;
      case 'services':
        return <ServicesSection />;
      case 'rendezvous':
        return <AppointmentForm />;
      case 'diagnostic':
        return <AIDiagnosis />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

interface HomeSectionProps {
  setActivePage: (page: Page) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ setActivePage }) => (
  <section id="accueil" className="text-center">
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden p-8 md:p-12 lg:flex lg:items-center lg:gap-8">
        <div className="lg:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
                Votre Sourire, Notre Priorité
            </h1>
            <p className="text-lg text-slate-600 mb-8">
                Bienvenue au Cabinet Dentaire SmileBright. Nous offrons des soins dentaires de haute qualité avec les technologies les plus récentes pour garantir votre confort et votre santé bucco-dentaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <button
                    onClick={() => setActivePage('rendezvous')}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
                >
                    Prendre Rendez-vous
                </button>
                <button
                    onClick={() => setActivePage('diagnostic')}
                    className="bg-sky-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-600 transition-transform transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                >
                    <ToothIcon className="w-5 h-5" />
                    Pré-diagnostic IA
                </button>
            </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img src="https://picsum.photos/seed/dentist/800/600" alt="Cabinet dentaire moderne" className="rounded-xl shadow-2xl w-full h-auto object-cover"/>
        </div>
    </div>
  </section>
);


const ServicesSection: React.FC = () => (
  <section id="services">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-10">Nos Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {SERVICES.map((service, index) => (
        <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} />
      ))}
    </div>
  </section>
);

const ContactSection: React.FC = () => (
    <section id="contact" className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">Nous Contacter</h2>
        <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-blue-700 mb-4">Nos Coordonnées</h3>
                <p className="text-slate-600 mb-2"><strong>Adresse :</strong> 123 Rue du Sourire, 75001 Paris, France</p>
                <p className="text-slate-600 mb-2"><strong>Téléphone :</strong> <a href="tel:+33123456789" className="text-blue-600 hover:underline">01 23 45 67 89</a></p>
                <p className="text-slate-600 mb-2"><strong>Email :</strong> <a href="mailto:contact@smilebright.fr" className="text-blue-600 hover:underline">contact@smilebright.fr</a></p>
                <h4 className="text-xl font-semibold text-blue-700 mt-6 mb-2">Horaires d'ouverture</h4>
                <ul className="list-disc list-inside text-slate-600">
                    <li>Lundi - Vendredi : 9h00 - 18h00</li>
                    <li>Samedi : 9h00 - 13h00</li>
                    <li>Dimanche : Fermé</li>
                </ul>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto rounded-lg overflow-hidden shadow-md">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991625227915!2d2.352221915674332!3d48.85837007928751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1620835340015!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Carte de localisation">
                </iframe>
            </div>
        </div>
    </section>
);


export default App;
