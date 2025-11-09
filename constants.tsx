
import React from 'react';
import type { NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'services', label: 'Nos Services' },
    { id: 'rendezvous', label: 'Rendez-vous' },
    { id: 'diagnostic', label: 'Diagnostic IA' },
    { id: 'contact', label: 'Contact' },
];

export const ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.5 8C16.5 8.82843 15.8284 9.5 15 9.5C14.1716 9.5 13.5 8.82843 13.5 8C13.5 7.17157 14.1716 6.5 15 6.5C15.8284 6.5 16.5 7.17157 16.5 8Z" />
        <path d="M9 9.5C9.82843 9.5 10.5 8.82843 10.5 8C10.5 7.17157 9.82843 6.5 9 6.5C8.17157 6.5 7.5 7.17157 7.5 8C7.5 8.82843 8.17157 9.5 9 9.5Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 11.2361 5.92345 13.2536 7.41019 14.6545L7.97893 15.2155C8.61118 15.8388 9 16.6976 9 17.589V20.5C9 21.3284 9.67157 22 10.5 22H13.5C14.3284 22 15 21.3284 15 20.5V17.589C15 16.6976 15.3888 15.8388 16.0211 15.2155L16.5898 14.6545C18.0765 13.2536 19 11.2361 19 9C19 5.13401 15.866 2 12 2ZM7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 10.7051 16.2891 12.2359 15.1402 13.3683L14.5714 13.9293C13.5413 14.9451 13 16.3249 13 17.7698V20H11V17.7698C11 16.3249 10.4587 14.9451 9.42856 13.9293L8.85981 13.3683C7.71092 12.2359 7 10.7051 7 9Z" />
    </svg>
);

const ServiceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const SERVICES = [
    {
        icon: <ServiceIcon className="h-10 w-10 text-blue-500" />,
        title: "Contrôle de Routine",
        description: "Examens complets, nettoyages et radiographies pour maintenir votre santé bucco-dentaire."
    },
    {
        icon: <ServiceIcon className="h-10 w-10 text-blue-500" />,
        title: "Blanchiment des Dents",
        description: "Éclaircissez votre sourire de plusieurs teintes avec nos traitements de blanchiment professionnels."
    },
    {
        icon: <ServiceIcon className="h-10 w-10 text-blue-500" />,
        title: "Implants Dentaires",
        description: "Solutions permanentes et d'apparence naturelle pour remplacer les dents manquantes."
    },
    {
        icon: <ServiceIcon className="h-10 w-10 text-blue-500" />,
        title: "Orthodontie",
        description: "Alignez vos dents et corrigez votre occlusion avec des appareils orthodontiques modernes."
    },
    {
        icon: <ServiceIcon className="h-10 w-10 text-blue-500" />,
        title: "Soins des Gencives",
        description: "Traitement des maladies des gencives pour protéger les fondations de votre sourire."
    },
    {
        icon: <ServiceIcon className="h-10 w-10 text-blue-500" />,
        title: "Urgences Dentaires",
        description: "Nous sommes là pour vous aider rapidement en cas de douleur ou d'accident dentaire."
    }
];
