'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaExternalLinkAlt, FaFilePdf, FaYoutube } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';

const DisasterPreparedness = () => {
  const [activeTab, setActiveTab] = useState('earthquake');

  // PDF guides data
  const disasterGuides = {
    earthquake: [
      { title: 'Earthquake Preparedness Guide', filename: 'earthquake_guide.pdf', size: '2.4 MB' },
      { title: 'Home Safety During Earthquakes', filename: 'home_safety_earthquake.pdf', size: '1.8 MB' },
      { title: 'Post-Earthquake Recovery Plan', filename: 'earthquake_recovery.pdf', size: '3.1 MB' },
    ],
    flood: [
      { title: 'Flood Prevention and Preparation', filename: 'flood_prevention.pdf', size: '2.7 MB' },
      { title: 'Flood Emergency Response', filename: 'flood_emergency.pdf', size: '1.9 MB' },
      { title: 'Flood Damage Restoration Guide', filename: 'flood_restoration.pdf', size: '2.2 MB' },
    ],
    hurricane: [
      { title: 'Hurricane Preparedness Plan', filename: 'hurricane_plan.pdf', size: '3.5 MB' },
      { title: 'Hurricane Evacuation Guide', filename: 'hurricane_evacuation.pdf', size: '2.1 MB' },
      { title: 'Post-Hurricane Safety Tips', filename: 'hurricane_safety.pdf', size: '1.7 MB' },
    ],
    wildfire: [
      { title: 'Wildfire Survival Guide', filename: 'wildfire_survival.pdf', size: '2.9 MB' },
      { title: 'Creating Defensible Space', filename: 'defensible_space.pdf', size: '1.6 MB' },
      { title: 'Wildfire Evacuation Checklist', filename: 'wildfire_evacuation.pdf', size: '1.3 MB' },
    ],
    tornado: [
      { title: 'Tornado Safety Procedures', filename: 'tornado_safety.pdf', size: '2.3 MB' },
      { title: 'Tornado Shelter Guidelines', filename: 'tornado_shelter.pdf', size: '1.5 MB' },
      { title: 'Tornado Recovery Resources', filename: 'tornado_recovery.pdf', size: '2.0 MB' },
    ],
  };

  // Instructional videos data
  const instructionalVideos = {
    earthquake: [
      { title: 'Drop, Cover, and Hold On: Earthquake Safety', youtubeId: 'GSDmqLQmMN0', duration: '3:45' },
      { title: 'How to Prepare Your Home for Earthquakes', youtubeId: 'yRDVfOEZh6g', duration: '5:21' },
      { title: 'What to Do After an Earthquake', youtubeId: 'zlF5FpHGRlc', duration: '4:12' },
    ],
    flood: [
      { title: 'Flood Safety: Before, During, and After', youtubeId: 'LztGGmz-RLI', duration: '6:17' },
      { title: 'DIY Flood Prevention Measures', youtubeId: '4KpwSYC2Km0', duration: '7:03' },
      { title: 'Flood Insurance and Recovery', youtubeId: 'JNfbL0Fj0CM', duration: '4:56' },
    ],
    hurricane: [
      { title: 'Hurricane Preparedness: Essential Steps', youtubeId: 'YDllW4Yvki4', duration: '5:32' },
      { title: 'Hurricane Evacuation: When and How', youtubeId: '_YtBakRlzXM', duration: '4:19' },
      { title: 'Hurricane-Proofing Your Home', youtubeId: 'f9LoKCCgnOg', duration: '6:45' },
    ],
    wildfire: [
      { title: 'Wildfire Prevention and Safety', youtubeId: 'KNq6TiZ-FTI', duration: '5:14' },
      { title: 'Creating a Wildfire Action Plan', youtubeId: 'xHuQM5z2jdM', duration: '3:58' },
      { title: 'Wildfire Evacuation Essentials', youtubeId: 'VZwbJYXiCGE', duration: '4:37' },
    ],
    tornado: [
      { title: 'Tornado Safety: Myths vs. Facts', youtubeId: 'nWpLxlI3q20', duration: '4:26' },
      { title: 'How to Identify a Tornado Warning', youtubeId: 'XO_jgr6Rp3s', duration: '3:19' },
      { title: 'Creating a Tornado-Safe Room', youtubeId: 'Xhh-Ys0WP-c', duration: '5:48' },
    ],
  };

  // Function to handle PDF download
  const handleDownload = (filename: string) => {
    // In a real app, this would be a proper download link to the actual file
    const link = document.createElement('a');
    link.href = `/res/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to open YouTube video
  const openYouTubeVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section id="disasterPreparedness" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Disaster Preparedness
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Learn how to prepare for various types of disasters with our comprehensive guides and resources.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['earthquake', 'flood', 'hurricane', 'wildfire', 'tornado'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-b-2 border-primary-500 text-primary-600'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Safety Guidelines
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-primary-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="ml-3 text-gray-700">
                        <strong>Before:</strong> Create an emergency kit with water, food, medications, and important documents.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-primary-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="ml-3 text-gray-700">
                        <strong>During:</strong> Stay informed through emergency alerts and follow official instructions.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 text-primary-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="ml-3 text-gray-700">
                        <strong>After:</strong> Check for injuries and damage. Document losses for insurance purposes.
                      </span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Downloadable Guides</h3>
                  <div className="space-y-3">
                    {disasterGuides[activeTab as keyof typeof disasterGuides].map((guide, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FaFilePdf className="text-red-500 text-xl mr-3" />
                          <div>
                            <p className="font-medium text-gray-800">{guide.title}</p>
                            <p className="text-sm text-gray-500">{guide.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(guide.filename)}
                          className="flex items-center text-primary-600 hover:text-primary-800"
                        >
                          <FaDownload className="mr-1" /> Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Instructional Videos</h3>
                  <div className="space-y-4">
                    {instructionalVideos[activeTab as keyof typeof instructionalVideos].map((video, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                              src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} 
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                              <button 
                                onClick={() => openYouTubeVideo(video.youtubeId)}
                                className="bg-red-600 text-white rounded-full p-3 flex items-center justify-center hover:bg-red-700 transition-colors"
                              >
                                <FaYoutube className="text-2xl" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-gray-900 mb-1">{video.title}</h4>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{video.duration}</span>
                            <button 
                              onClick={() => openYouTubeVideo(video.youtubeId)}
                              className="flex items-center text-primary-600 hover:text-primary-800"
                            >
                              Watch <FaExternalLinkAlt className="ml-1 text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
                    <h3 className="text-lg font-medium text-primary-800 flex items-center">
                      <CiLocationOn className="mr-2 text-xl" /> Location-Based Resources
                    </h3>
                    <p className="mt-2 text-gray-700">
                      Enter your location to find specific preparedness resources and local emergency services for your area.
                    </p>
                    <button className="mt-3 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors">
                      Find Local Resources
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisasterPreparedness; 