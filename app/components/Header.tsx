'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = ({ showProfileUpdate = false, onProfileUpdateClick }: { 
  showProfileUpdate?: boolean;
  onProfileUpdateClick?: () => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white ${isScrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#" onClick={() => scrollToSection('hero')} className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">SafeGuard</span>
            </a>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <a 
              href="#emergency-services" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('emergency-services');
              }}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Emergency Services
            </a>
            <a 
              href="#disaster-alerts" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('disaster-alerts');
              }}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Disaster Alerts
            </a>
            <a 
              href="#safety-resources" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('safety-resources');
              }}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Safety Resources
            </a>
            <a 
              href="#community" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('community');
              }}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Community
            </a>
            
            {showProfileUpdate && (
              <button
                onClick={onProfileUpdateClick}
                className="inline-flex items-center px-3 py-1 border border-primary-600 rounded-md text-sm font-medium text-primary-600 hover:bg-primary-50"
              >
                Update Profile
              </button>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#emergency-services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('emergency-services');
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Emergency Services
            </a>
            <a
              href="#disaster-alerts"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('disaster-alerts');
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Disaster Alerts
            </a>
            <a
              href="#safety-resources"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('safety-resources');
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Safety Resources
            </a>
            <a
              href="#community"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('community');
              }}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Community
            </a>
            
            {showProfileUpdate && (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onProfileUpdateClick && onProfileUpdateClick();
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-primary-300 bg-primary-50 text-base font-medium text-primary-700"
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 