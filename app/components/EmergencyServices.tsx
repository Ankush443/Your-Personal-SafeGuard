'use client';

import React, { useState, useEffect } from 'react';

const services = [
  { id: 1, name: 'Police', icon: '🚓', color: 'bg-blue-100' },
  { id: 2, name: 'Fire Department', icon: '🚒', color: 'bg-red-100' },
  { id: 3, name: 'Ambulance', icon: '🚑', color: 'bg-green-100' },
  { id: 4, name: 'Disaster Management', icon: '🌊', color: 'bg-yellow-100' },
  { id: 5, name: 'Coast Guard', icon: '⛵', color: 'bg-indigo-100' },
  { id: 6, name: 'Poison Control', icon: '☠️', color: 'bg-purple-100' },
];

interface EmergencyServicesProps {
  hideProfileForm?: boolean;
}

const EmergencyServices = ({ hideProfileForm = false }: EmergencyServicesProps) => {
  const [location, setLocation] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Load saved profile data if available
  useEffect(() => {
    const savedProfile = localStorage.getItem('emergencyProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setLocation(profile.location || '');
      setBloodGroup(profile.bloodGroup || '');
      setMedicalInfo(profile.medicalInfo || '');
      setEmergencyContact(profile.emergencyContact || '');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile data
    const profileData = { location, bloodGroup, medicalInfo, emergencyContact };
    localStorage.setItem('emergencyProfile', JSON.stringify(profileData));
    alert('Profile information saved successfully!');
  };

  const handleEmergencyCall = (service: string) => {
    // Get saved profile data
    const savedProfile = localStorage.getItem('emergencyProfile');
    
    if (!savedProfile) {
      alert('Please set up your emergency profile first to enable quick emergency contact.');
      return;
    }
    
    // In a real app, this would trigger the emergency call or notification
    // While sending the user's profile information
    alert(`Emergency ${service} service contacted! Your profile information has been shared.`);
  };

  return (
    <section className="py-12 bg-white" id="emergency-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Emergency Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            One-Touch Emergency Access
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Connect to any emergency service with a single touch when needed.
          </p>
        </div>

        <div className="mt-10">
          <div className={`space-y-10 md:space-y-0 md:grid ${hideProfileForm ? 'md:grid-cols-1' : 'md:grid-cols-2'} md:gap-x-8 md:gap-y-10`}>
            {/* Emergency Services */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium text-gray-900">Emergency Services</h3>
              <p className="mt-1 text-sm text-gray-500">Connect instantly with any emergency service</p>
              
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleEmergencyCall(service.name)}
                    className={`${service.color} p-4 rounded-lg flex flex-col items-center text-center hover:shadow-md transition-all`}
                  >
                    <span className="text-3xl">{service.icon}</span>
                    <span className="mt-2 text-sm font-medium">{service.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => handleEmergencyCall("SOS")}
                  className="w-full bg-emergency-DEFAULT text-white py-3 px-4 rounded-md hover:bg-emergency-dark transition-colors flex items-center justify-center space-x-2 animate-pulse-emergency"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-bold text-lg">SOS - Emergency Alert</span>
                </button>
              </div>
            </div>

            {/* Profile Information - Only show if not hidden */}
            {!hideProfileForm && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-medium text-gray-900">Your Emergency Profile</h3>
                <p className="mt-1 text-sm text-gray-500">This information will be shared during emergencies</p>
                
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Your Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Enter your address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group</label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                      value={medicalInfo}
                      onChange={(e) => setMedicalInfo(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Allergies, conditions, medications, etc."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                    <input
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Name and phone number"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Save Profile Information
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyServices; 