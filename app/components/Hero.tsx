'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface UserProfile {
  location: string;
  bloodGroup: string;
  medicalInfo: string;
  emergencyContact: string;
}

const Hero = ({ onProfileSaved }: { onProfileSaved?: (profile: UserProfile) => void }) => {
  const [showProfileForm, setShowProfileForm] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    location: '',
    bloodGroup: '',
    medicalInfo: '',
    emergencyContact: ''
  });

  // Check if profile exists in localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('emergencyProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      setShowProfileForm(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    localStorage.setItem('emergencyProfile', JSON.stringify(profile));
    
    // Hide the form
    setShowProfileForm(false);
    
    // Notify parent component
    if (onProfileSaved) {
      onProfileSaved(profile);
    }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-r from-primary-700 to-primary-900">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-12 md:gap-12 items-center">
          {/* Hero Content */}
          <div className="md:col-span-7">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Personal SafeGuard
            </h1>
            <p className="mt-6 text-xl text-white max-w-3xl">
              Connect to emergency services instantly. Stay prepared with alerts, guides, and community resources for natural disasters and emergencies.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a 
                href="#emergency-services" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('emergency-services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-md bg-emergency-DEFAULT px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-emergency-dark focus:outline-none focus:ring-2 focus:ring-emergency-DEFAULT focus:ring-offset-2"
              >
                Emergency Services
              </a>
              <a 
                href="#safety-resources" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('safety-resources')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-md bg-white/20 backdrop-blur-sm px-5 py-3 text-base font-medium text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                Safety Resources
              </a>
            </div>
          </div>

          {/* Emergency Profile Form */}
          {showProfileForm ? (
            <div className="mt-12 md:mt-0 md:col-span-5">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="px-6 py-5 bg-primary-50">
                  <h2 className="text-xl font-semibold text-primary-800">
                    Set Up Your Emergency Profile
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be shared with emergency services when needed
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Your Location</label>
                    <input
                      required
                      type="text"
                      id="location"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter your address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
                    <select
                      required
                      id="bloodGroup"
                      name="bloodGroup"
                      value={profile.bloodGroup}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="medicalInfo" className="block text-sm font-medium text-gray-700">Medical Information</label>
                    <textarea
                      id="medicalInfo"
                      name="medicalInfo"
                      value={profile.medicalInfo}
                      onChange={handleChange}
                      rows={2}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Allergies, conditions, medications, etc."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                    <input
                      required
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={profile.emergencyContact}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Name and phone number"
                    />
                  </div>
                  
                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors font-medium"
                    >
                      Save Profile Information
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="mt-12 md:mt-0 md:col-span-5">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white border border-white/20">
                <h2 className="text-xl font-semibold">Emergency Profile Ready</h2>
                <p className="mt-2">Your emergency information is saved and will be shared with emergency services when needed.</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Location saved</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Blood group saved</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Medical info saved</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Emergency contact saved</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileForm(true)}
                  className="w-full mt-6 bg-white text-primary-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  Update Profile Information
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero; 