'use client';

import React, { useState, useEffect } from 'react';

// Mock disaster data - in a real app, this would come from an API
const disasterTypes = [
  { id: 1, name: 'Flood', icon: '🌊', description: 'Rising water levels that pose a threat to life and property.' },
  { id: 2, name: 'Earthquake', icon: '🏚️', description: 'Sudden shaking of the ground that can cause destruction.' },
  { id: 3, name: 'Wildfire', icon: '🔥', description: 'Uncontrolled fire that spreads quickly to natural areas.' },
  { id: 4, name: 'Hurricane', icon: '🌀', description: 'Severe tropical storm with heavy rain and strong winds.' },
  { id: 5, name: 'Tornado', icon: '🌪️', description: 'Violent rotating column of air that can cause devastation.' },
  { id: 6, name: 'Tsunami', icon: '🌊', description: 'Series of water waves caused by displacement of large volume of water.' },
];

const mockAlerts = [
  { id: 1, type: 'Flood', level: 'Warning', location: 'Riverside County', time: '2 hours ago', details: 'Heavy rainfall has led to rising water levels. Residents in low-lying areas should prepare for possible evacuation.' },
  { id: 2, type: 'Weather', level: 'Advisory', location: 'Metro Area', time: '5 hours ago', details: 'Strong winds expected tonight with gusts up to 45mph. Secure loose outdoor items and be cautious while driving.' },
  { id: 3, type: 'Earthquake', level: 'Information', location: 'Coastal Region', time: '1 day ago', details: 'A magnitude 3.5 earthquake was recorded offshore. No tsunami threat or damage reported.' },
];

// Mock global disaster news
const globalDisasterNews = [
  { id: 1, title: 'Major Flooding Affects Southeast Asia', location: 'Thailand', time: '1 day ago', type: 'Flood', details: 'Monsoon rains have caused severe flooding across multiple provinces, displacing thousands.' },
  { id: 2, title: 'Wildfire Emergency Declared in Southern Europe', location: 'Greece', time: '3 days ago', type: 'Wildfire', details: 'Hundreds evacuated as firefighters battle blazes across multiple islands.' },
  { id: 3, title: 'Tropical Storm Forms in Atlantic', location: 'Caribbean Sea', time: '5 hours ago', type: 'Hurricane', details: 'Weather services tracking development, could strengthen to hurricane within 48 hours.' },
  { id: 4, title: 'Earthquake Strikes Pacific Region', location: 'Japan', time: '2 days ago', type: 'Earthquake', details: 'Magnitude 6.1 earthquake recorded offshore, tsunami warning issued but later canceled.' },
];

const GEMINI_API_KEY = "AIzaSyAKev8_0duTbd3SDGdOxZdLpC5kwUm5HsE";

const DisasterAlerts = () => {
  const [location, setLocation] = useState('');
  const [selectedDisasters, setSelectedDisasters] = useState<number[]>([]);
  const [disasterForecast, setDisasterForecast] = useState<any[]>([]);
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);

  const toggleDisasterSelection = (id: number) => {
    if (selectedDisasters.includes(id)) {
      setSelectedDisasters(selectedDisasters.filter(disasterId => disasterId !== id));
    } else {
      setSelectedDisasters([...selectedDisasters, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the user's preferences
    alert(`Alert preferences saved for ${location}!`);
  };

  // Generate disaster forecast based on location using Gemini API
  const updateDisasterForecast = async () => {
    if (!location.trim()) return;
    
    setIsLoadingForecast(true);
    
    try {
      // Create a prompt for Gemini to analyze disaster risks for the location
      const prompt = `You are a disaster risk assessment AI. Based on historical data, geography, and climate patterns, analyze the following location for potential natural disaster risks: "${location}". Return results in this JSON format:
      [
        {"disasterType": "Flood", "riskLevel": "high/medium/low", "riskPercentage": 75, "reason": "brief explanation"},
        {"disasterType": "Earthquake", "riskLevel": "high/medium/low", "riskPercentage": 30, "reason": "brief explanation"},
        etc.
      ]
      Only include the most relevant 2-3 disaster types for this location. Risk percentage should be between 0-100.`;
      
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: prompt }] 
          }]
        })
      });
      
      const data = await response.json();
      let forecastData = [];
      
      if (data.candidates && data.candidates[0]?.content?.parts) {
        try {
          const textResponse = data.candidates[0].content.parts[0].text;
          // Extract JSON array from response
          const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            forecastData = JSON.parse(jsonMatch[0]);
          } else {
            // Fallback to mock data if we can't parse JSON
            forecastData = getMockDisasterForecast(location);
          }
        } catch (error) {
          console.error('Error parsing Gemini response:', error);
          forecastData = getMockDisasterForecast(location);
        }
      } else {
        forecastData = getMockDisasterForecast(location);
      }
      
      setDisasterForecast(forecastData);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Fallback to mock data
      setDisasterForecast(getMockDisasterForecast(location));
    } finally {
      setIsLoadingForecast(false);
    }
  };

  // Generate mock disaster forecast based on location name
  const getMockDisasterForecast = (locationName: string) => {
    const lowerLocation = locationName.toLowerCase();
    let forecast = [];
    
    // Coastal areas
    if (lowerLocation.includes('coast') || lowerLocation.includes('beach') || lowerLocation.includes('shore') || 
        lowerLocation.includes('ocean') || lowerLocation.includes('sea') || lowerLocation.includes('bay')) {
      forecast.push({
        disasterType: 'Hurricane',
        riskLevel: 'high',
        riskPercentage: 75,
        reason: 'Coastal location with exposure to tropical storms and hurricanes.'
      });
      forecast.push({
        disasterType: 'Tsunami',
        riskLevel: 'medium',
        riskPercentage: 45,
        reason: 'Coastal area that could be impacted by tsunami waves from offshore earthquakes.'
      });
    }
    
    // River areas
    if (lowerLocation.includes('river') || lowerLocation.includes('creek') || lowerLocation.includes('lake') || 
        lowerLocation.includes('valley') || lowerLocation.includes('delta')) {
      forecast.push({
        disasterType: 'Flood',
        riskLevel: 'high',
        riskPercentage: 80,
        reason: 'Proximity to water bodies increases likelihood of flooding during heavy rainfall.'
      });
    }
    
    // Mountain/hill areas
    if (lowerLocation.includes('mountain') || lowerLocation.includes('hill') || lowerLocation.includes('peak') || 
        lowerLocation.includes('ridge')) {
      forecast.push({
        disasterType: 'Landslide',
        riskLevel: 'medium',
        riskPercentage: 60,
        reason: 'Sloped terrain susceptible to landslides during heavy rainfall or seismic activity.'
      });
      forecast.push({
        disasterType: 'Wildfire',
        riskLevel: 'high',
        riskPercentage: 70,
        reason: 'Elevated areas with vegetation are at high risk during dry seasons.'
      });
    }
    
    // Forest/woodland areas
    if (lowerLocation.includes('forest') || lowerLocation.includes('wood') || lowerLocation.includes('national park') || 
        lowerLocation.includes('wilderness')) {
      forecast.push({
        disasterType: 'Wildfire',
        riskLevel: 'high',
        riskPercentage: 85,
        reason: 'Heavily vegetated area with increased fire risk during dry conditions.'
      });
    }
    
    // Known earthquake zones
    if (lowerLocation.includes('california') || lowerLocation.includes('japan') || lowerLocation.includes('alaska') || 
        lowerLocation.includes('pacific') || lowerLocation.includes('ring of fire') || lowerLocation.includes('turkey') || 
        lowerLocation.includes('nepal')) {
      forecast.push({
        disasterType: 'Earthquake',
        riskLevel: 'high',
        riskPercentage: 75,
        reason: 'Located in a seismically active region with history of significant earthquakes.'
      });
    }
    
    // If we couldn't determine anything specific, provide generic forecasts
    if (forecast.length === 0) {
      forecast = [
        {
          disasterType: 'Flood',
          riskLevel: 'medium',
          riskPercentage: 40,
          reason: 'Most locations have some flood risk during heavy precipitation events.'
        },
        {
          disasterType: 'Severe Weather',
          riskLevel: 'medium',
          riskPercentage: 35,
          reason: 'Thunderstorms, high winds, and other severe weather can affect most regions.'
        }
      ];
    }
    
    // Only return up to 3 disaster types
    return forecast.slice(0, 3);
  };

  // Call the forecast update when location changes
  useEffect(() => {
    if (location.trim()) {
      const timer = setTimeout(() => {
        updateDisasterForecast();
      }, 1000); // Debounce location input
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <section className="py-12 bg-gray-50" id="disaster-alerts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Disaster Alerts</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Stay Informed, Stay Safe
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Get real-time alerts about potential disasters and safety information for your area.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {/* Alert Settings */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium text-gray-900">Your Alert Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Customize alerts based on your location and concerns</p>
              
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Your Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="Enter your address or city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Disasters You Want Alerts For</label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {disasterTypes.map((disaster) => (
                      <div
                        key={disaster.id}
                        className={`border rounded-md p-3 flex items-center space-x-2 cursor-pointer ${
                          selectedDisasters.includes(disaster.id) ? 'bg-primary-50 border-primary-300' : 'border-gray-200'
                        }`}
                        onClick={() => toggleDisasterSelection(disaster.id)}
                      >
                        <span className="text-xl">{disaster.icon}</span>
                        <span className="text-sm font-medium">{disaster.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="government-alerts"
                    name="government-alerts"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  />
                  <label htmlFor="government-alerts" className="ml-2 block text-sm text-gray-700">
                    Receive Government Notifications
                  </label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Save Alert Preferences
                  </button>
                </div>
              </form>
            </div>

            {/* Current Alerts */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium text-gray-900">Current Alerts</h3>
              <p className="mt-1 text-sm text-gray-500">Latest notifications and alerts for your area</p>
              
              <div className="mt-6 space-y-4">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-md p-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        {alert.type} {alert.level}
                      </span>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{alert.location}</p>
                    <p className="text-sm mt-2">{alert.details}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <a href="/all-alerts" className="text-primary-600 text-sm font-medium">
                  View All Alerts →
                </a>
              </div>
            </div>
          </div>

          {/* AI Disaster Forecast */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">AI-Powered Disaster Forecast</h3>
            <p className="mt-1 text-sm text-gray-500">
              {location.trim() 
                ? `Based on your location "${location}", these are potential risks to be aware of`
                : "Enter your location above to get a personalized disaster risk assessment"}
            </p>
            
            <div className="mt-6">
              {isLoadingForecast ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                </div>
              ) : location.trim() ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {disasterForecast.map((disaster, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">
                          {disaster.disasterType === 'Flood' ? '🌊' :
                           disaster.disasterType === 'Earthquake' ? '🏚️' :
                           disaster.disasterType === 'Wildfire' ? '🔥' :
                           disaster.disasterType === 'Hurricane' ? '🌀' :
                           disaster.disasterType === 'Tornado' ? '🌪️' :
                           disaster.disasterType === 'Tsunami' ? '🌊' :
                           disaster.disasterType === 'Landslide' ? '⛰️' :
                           '⚠️'}
                        </span>
                        <span className="text-lg font-medium">{disaster.disasterType}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{disaster.reason}</p>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs">
                          <span>Risk Level</span>
                          <span className={`font-medium ${
                            disaster.riskLevel === 'high' ? 'text-red-600' :
                            disaster.riskLevel === 'medium' ? 'text-amber-600' :
                            'text-green-600'
                          }`}>
                            {disaster.riskLevel.charAt(0).toUpperCase() + disaster.riskLevel.slice(1)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`h-2 rounded-full ${
                            disaster.riskLevel === 'high' ? 'bg-red-500' :
                            disaster.riskLevel === 'medium' ? 'bg-amber-500' :
                            'bg-green-500'
                          }`} style={{ width: `${disaster.riskPercentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  Enter your location above to get a personalized risk assessment
                </div>
              )}
            </div>
          </div>

          {/* Global Disaster News */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">Global Disaster News</h3>
            <p className="mt-1 text-sm text-gray-500">Latest updates on disasters and emergencies around the world</p>
            
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {globalDisasterNews.map((news) => (
                <div key={news.id} className="border rounded-md p-4 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      news.type === 'Flood' ? 'bg-blue-100 text-blue-800' :
                      news.type === 'Wildfire' ? 'bg-red-100 text-red-800' :
                      news.type === 'Hurricane' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {news.type}
                    </span>
                    <span className="text-xs text-gray-500">{news.time}</span>
                  </div>
                  <h4 className="mt-2 text-sm font-medium text-gray-900">{news.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{news.location}</p>
                  <p className="text-sm mt-2 text-gray-600">{news.details}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a href="/global-disaster-news" className="text-primary-600 text-sm font-medium">
                View All Global Disaster News →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisasterAlerts; 