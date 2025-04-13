'use client';

import React, { useState } from 'react';
import ChatBot from './ChatBot';

// Mock safety tips and resources
const resources = [
  {
    id: 1,
    category: 'Flood',
    icon: '🌊',
    tips: [
      "Move to higher ground immediately if flooding occurs",
      "Never walk or drive through flood waters",
      "Keep emergency supplies in waterproof containers",
      "Have an evacuation plan ready",
      "Know your home's flood risk and insurance options"
    ],
    video: 'flood-safety-101.mp4',
    guide: 'flood-preparedness-guide.pdf'
  },
  {
    id: 2,
    category: 'Earthquake',
    icon: '🏚️',
    tips: [
      "Drop, cover, and hold on during shaking",
      "Stay away from windows and exterior walls",
      "If outdoors, move to a clear area away from buildings",
      "Have emergency supplies accessible",
      "Know how to shut off utilities"
    ],
    video: 'earthquake-response.mp4',
    guide: 'earthquake-safety.pdf'
  },
  {
    id: 3,
    category: 'Wildfire',
    icon: '🔥',
    tips: [
      "Create a defensible space around your home",
      "Have an evacuation plan with multiple routes",
      "Keep emergency supplies in your vehicle",
      "Monitor air quality and stay indoors when needed",
      "Follow evacuation orders immediately"
    ],
    video: 'wildfire-preparedness.mp4',
    guide: 'wildfire-safety.pdf'
  },
  {
    id: 4,
    category: 'Hurricane',
    icon: '🌀',
    tips: [
      "Board up windows and secure outdoor items",
      "Have at least a week's supply of food and water",
      "Know your evacuation zone and route",
      "Keep important documents in waterproof containers",
      "Have a battery-powered radio for updates"
    ],
    video: 'hurricane-prep.mp4',
    guide: 'hurricane-checklist.pdf'
  }
];

const GEMINI_API_KEY = "AIzaSyAKev8_0duTbd3SDGdOxZdLpC5kwUm5HsE";

const SafetyTips = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [selectedForDrill, setSelectedForDrill] = useState<number | null>(null);

  const activeResource = resources.find(resource => resource.id === activeCategory);

  const handleStartDrill = (id: number) => {
    setSelectedForDrill(id);
    // In a real app, this would launch an AI-guided drill
    setTimeout(() => {
      alert('AI-guided mock drill starting for ' + resources.find(r => r.id === id)?.category);
    }, 500);
  };

  return (
    <section className="py-12 bg-white" id="safety-resources">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Safety Resources</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Prepare Before Disasters Strike
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Learn how to prepare for and respond to different emergency situations with our guides and resources.
          </p>
        </div>

        <div className="mt-10">
          {/* Resource Tabs */}
          <div className="flex flex-wrap justify-center space-x-2 border-b border-gray-200">
            {resources.map((resource) => (
              <button
                key={resource.id}
                onClick={() => setActiveCategory(resource.id)}
                className={`px-3 py-2 text-sm font-medium rounded-t-lg ${
                  activeCategory === resource.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{resource.icon}</span>
                {resource.category}
              </button>
            ))}
          </div>

          {/* Resource Content */}
          {activeResource && (
            <div className="mt-6 md:grid md:grid-cols-2 md:gap-8">
              {/* Left Column: Resource Info */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="sm:flex sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      <span className="mr-2">{activeResource.icon}</span>
                      {activeResource.category} Safety
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Essential tips and guidance for staying safe</p>
                  </div>
                </div>

                <div className="mt-6">
                  {/* Tips Section */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Safety Tips</h4>
                    <ul className="mt-4 space-y-3">
                      {activeResource.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 h-5 w-5 text-primary-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="ml-2 text-sm text-gray-600">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources Section */}
                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-gray-900">Additional Resources</h4>
                    <ul className="mt-4 space-y-4">
                      <li className="border rounded-md p-4 hover:bg-gray-50">
                        <div className="flex">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h5 className="text-sm font-medium text-gray-900">Instructional Video</h5>
                            <p className="mt-1 text-xs text-gray-500">Learn through our step-by-step visual guide</p>
                            <a href="#" className="mt-1 inline-block text-xs text-primary-600 font-medium">
                              Watch Video →
                            </a>
                          </div>
                        </div>
                      </li>
                      <li className="border rounded-md p-4 hover:bg-gray-50">
                        <div className="flex">
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h5 className="text-sm font-medium text-gray-900">Comprehensive Guide</h5>
                            <p className="mt-1 text-xs text-gray-500">Downloadable guide with checklists and procedures</p>
                            <a href="#" className="mt-1 inline-block text-xs text-primary-600 font-medium">
                              Download PDF →
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Right Column: ChatBot */}
              <div className="mt-8 md:mt-0">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">AI Assistant & Mock Drills</h3>
                  <ChatBot 
                    category={activeResource.category} 
                    apiKey={GEMINI_API_KEY}
                  />
                  <p className="mt-4 text-sm text-gray-500">
                    Ask questions about {activeResource.category.toLowerCase()} safety, or start a guided mock drill to practice your emergency response.
                  </p>
                  <div className="mt-4">
                    <div className="inline-block py-1 px-2 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Example: "What should I pack in my {activeResource.category.toLowerCase()} emergency kit?"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SafetyTips; 