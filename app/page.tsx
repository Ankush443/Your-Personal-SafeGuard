'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EmergencyServices from './components/EmergencyServices';
import DisasterAlerts from './components/DisasterAlerts';
import SafetyTips from './components/SafetyTips';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';

// Define the type for our user profile
interface UserProfile {
  location: string;
  bloodGroup: string;
  medicalInfo: string;
  emergencyContact: string;
}

export default function Home() {
  const [profileSaved, setProfileSaved] = useState(false);
  const [showEmergencyProfile, setShowEmergencyProfile] = useState(false);

  // Check if profile exists in localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('emergencyProfile');
    if (savedProfile) {
      setProfileSaved(true);
    }
  }, []);

  const handleProfileSaved = (profile: UserProfile) => {
    setProfileSaved(true);
  };

  const handleProfileUpdateClick = () => {
    setShowEmergencyProfile(true);
    
    // Scroll to hero section where the profile form is shown
    setTimeout(() => {
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="min-h-screen">
      <Header 
        showProfileUpdate={profileSaved} 
        onProfileUpdateClick={handleProfileUpdateClick}
      />
      <Hero onProfileSaved={handleProfileSaved} />
      
      {profileSaved && (
        <>
          <EmergencyServices hideProfileForm={true} />
          <DisasterAlerts />
          <SafetyTips />
          <CommunitySection />
        </>
      )}
      
      <Footer />
    </main>
  );
} 