
import React from 'react';
import { ToothIcon } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-800 text-white">
      <div className="container mx-auto px-4 py-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
            <ToothIcon className="h-6 w-6"/>
            <span className="font-bold text-lg">Cabinet Dentaire SmileBright</span>
        </div>
        <p className="text-sm text-blue-200">
          &copy; {new Date().getFullYear()} Cabinet Dentaire SmileBright. Tous droits réservés.
        </p>
        <p className="text-xs text-blue-300 mt-1">
          Ce site est à but démonstratif et ne constitue pas un avis médical.
        </p>
      </div>
    </footer>
  );
};
