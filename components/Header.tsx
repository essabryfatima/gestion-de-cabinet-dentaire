
import React, { useState } from 'react';
import type { Page } from '../types';
import { NAV_LINKS, ToothIcon } from '../constants';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('accueil')}>
          <ToothIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-blue-800">SmileBright</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-slate-600 font-medium hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-blue-600 after:transition-transform after:transform ${activePage === link.id ? 'after:scale-x-100 text-blue-600' : 'after:scale-x-0'} hover:after:scale-x-100`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-slate-200">
          <div className="flex flex-col items-center py-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full py-3 text-center font-medium ${activePage === link.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
