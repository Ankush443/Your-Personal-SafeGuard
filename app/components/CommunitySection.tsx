'use client';

import React, { useState } from 'react';

// Mock community posts
const communityPosts = [
  {
    id: 1,
    author: 'Sarah Johnson',
    avatar: 'avatar1.jpg',
    title: 'Preparing for Wildfire Season: My Checklist',
    content: "After experiencing a close call last year, I've put together a comprehensive checklist for wildfire preparation that I wanted to share with the community.",
    category: 'Preparation',
    likes: 24,
    comments: 8,
    timeAgo: '2 days ago'
  },
  {
    id: 2,
    author: 'Michael Chen',
    avatar: 'avatar2.jpg',
    title: 'Flash Flood Warning Signs Everyone Should Know',
    content: "Having worked as a first responder for 10 years, I've seen many people caught off guard by flash floods. Here are the early warning signs you should watch for.",
    category: 'Education',
    likes: 42,
    comments: 15,
    timeAgo: '4 days ago'
  },
  {
    id: 3,
    author: 'Emma Rodriguez',
    avatar: 'avatar3.jpg',
    title: 'Community-Led Earthquake Drill Results',
    content: "Our neighborhood just completed our quarterly earthquake drill. Here's what worked well and what we need to improve for next time.",
    category: 'Community Event',
    likes: 17,
    comments: 6,
    timeAgo: '1 week ago'
  },
];

// Mock reports
const communityReports = [
  {
    id: 1,
    type: 'Hazard',
    location: 'Main St & Oak Ave',
    description: "Large tree branch hanging over power lines after last night's storm",
    status: 'Under Review',
    reportedBy: 'Anonymous',
    timeAgo: '3 hours ago',
    severity: 'Medium'
  },
  {
    id: 2,
    type: 'Infrastructure',
    location: 'Cedar Bridge',
    description: 'Visible cracks in the bridge support structure, possibly from recent earthquake',
    status: 'Assigned',
    reportedBy: 'John D.',
    timeAgo: '1 day ago',
    severity: 'High'
  },
  {
    id: 3,
    type: 'Weather',
    location: 'North County',
    description: 'Flash flooding on Pine Valley Road, approximately 2 feet deep, impassable by regular vehicles',
    status: 'Verified',
    reportedBy: 'Emergency Services',
    timeAgo: '5 hours ago',
    severity: 'High'
  },
];

const CommunitySection = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'report' | 'refugee'>('forum');
  const [reportType, setReportType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  
  // Refugee registration form state
  const [refugeeFormData, setRefugeeFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    currentLocation: '',
    disasterType: '',
    familySize: '',
    medicalNeeds: '',
    contactNumber: '',
    emergencyContact: '',
    specialAssistance: ''
  });

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the report to a database
    alert('Your report has been submitted. Emergency services have been notified.');
    setReportType('');
    setLocation('');
    setDescription('');
    setSeverity('');
  };
  
  const handleRefugeeFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRefugeeFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRefugeeFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would register the refugee in a database and notify authorities
    alert('Your refugee registration has been submitted. Relief services have been notified of your situation and location.');
    
    // Reset form after submission
    setRefugeeFormData({
      fullName: '',
      age: '',
      gender: '',
      currentLocation: '',
      disasterType: '',
      familySize: '',
      medicalNeeds: '',
      contactNumber: '',
      emergencyContact: '',
      specialAssistance: ''
    });
  };

  return (
    <section className="py-12 bg-gray-50" id="community">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Community</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Learn and Share with Others
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Join our community to share experiences, report hazards, and help each other stay safe.
          </p>
        </div>

        <div className="mt-10 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('forum')}
              className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                activeTab === 'forum'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Community Forum
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                activeTab === 'report'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Report Emergency or Hazard
            </button>
            <button
              onClick={() => setActiveTab('refugee')}
              className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
                activeTab === 'refugee'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Refugee Registration
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'forum' ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Recent Discussions</h3>
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none">
                    New Post
                  </button>
                </div>

                <div className="space-y-6">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="px-4 py-5 sm:px-6 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{post.title}</h4>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {post.category}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <div className="flex-shrink-0">
                            <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                          </div>
                          <div className="ml-2">
                            <p className="text-xs text-gray-500">
                              <span className="font-medium text-gray-900">{post.author}</span> posted {post.timeAgo}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-5 sm:p-6">
                        <p className="text-sm text-gray-600">{post.content}</p>
                      </div>
                      <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between">
                        <div className="flex space-x-4">
                          <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                            <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
                            </svg>
                            {post.likes} Likes
                          </button>
                          <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                            <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                            </svg>
                            {post.comments} Comments
                          </button>
                        </div>
                        <button className="text-sm text-primary-600 hover:text-primary-800">
                          Read More →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <a href="/community-posts" className="text-sm font-medium text-primary-600 hover:text-primary-800">
                    View All Community Posts →
                  </a>
                </div>
              </div>
            ) : activeTab === 'report' ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Report an Emergency or Hazard</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Submit information about hazards, emergencies, or unsafe conditions to alert authorities and the community.
                  </p>
                </div>

                <form onSubmit={handleSubmitReport} className="space-y-5">
                  <div>
                    <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">Type of Report</label>
                    <select
                      id="reportType"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Emergency">Emergency (Life Threatening)</option>
                      <option value="Hazard">Hazard or Unsafe Condition</option>
                      <option value="Infrastructure">Infrastructure Issue</option>
                      <option value="Weather">Weather-Related Problem</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Address or description of location"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severity</label>
                    <select
                      id="severity"
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    >
                      <option value="">Select Severity</option>
                      <option value="Low">Low - Non-urgent, awareness needed</option>
                      <option value="Medium">Medium - Attention required soon</option>
                      <option value="High">High - Urgent situation</option>
                      <option value="Critical">Critical - Immediate action required</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Describe the situation in detail"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emergency-DEFAULT hover:bg-emergency-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emergency-DEFAULT"
                    >
                      Submit Report
                    </button>
                  </div>
                </form>

                <div className="mt-8">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Community Reports</h4>
                  <div className="space-y-3">
                    {communityReports.map((report) => (
                      <div key={report.id} className="border rounded-md p-3 text-xs">
                        <div className="flex justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            report.severity === 'High' ? 'bg-red-100 text-red-800' : 
                            report.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {report.type}
                          </span>
                          <span className="text-gray-500">{report.timeAgo}</span>
                        </div>
                        <p className="font-medium mt-1">{report.location}</p>
                        <p className="text-gray-600 mt-1">{report.description}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-gray-500">Status: {report.status}</span>
                          <button className="text-primary-600 hover:text-primary-800">
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Refugee Registration Form
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Disaster Refugee Registration</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Register yourself or your family as refugees of a disaster to receive assistance and connect with relief services.
                  </p>
                </div>

                <form onSubmit={handleRefugeeFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={refugeeFormData.fullName}
                        onChange={handleRefugeeFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={refugeeFormData.age}
                        onChange={handleRefugeeFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        min="0"
                        max="120"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={refugeeFormData.gender}
                        onChange={handleRefugeeFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="currentLocation" className="block text-sm font-medium text-gray-700">Current Location</label>
                      <input
                        type="text"
                        id="currentLocation"
                        name="currentLocation"
                        value={refugeeFormData.currentLocation}
                        onChange={handleRefugeeFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your current location or shelter"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="disasterType" className="block text-sm font-medium text-gray-700">Disaster Type</label>
                      <select
                        id="disasterType"
                        name="disasterType"
                        value={refugeeFormData.disasterType}
                        onChange={handleRefugeeFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                      >
                        <option value="">Select Disaster Type</option>
                        <option value="Flood">Flood</option>
                        <option value="Earthquake">Earthquake</option>
                        <option value="Wildfire">Wildfire</option>
                        <option value="Hurricane">Hurricane</option>
                        <option value="Tornado">Tornado</option>
                        <option value="Tsunami">Tsunami</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="familySize" className="block text-sm font-medium text-gray-700">Family Size</label>
                      <input
                        type="number"
                        id="familySize"
                        name="familySize"
                        value={refugeeFormData.familySize}
                        onChange={handleRefugeeFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        min="1"
                        placeholder="Number of family members with you"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="medicalNeeds" className="block text-sm font-medium text-gray-700">Medical Needs</label>
                      <textarea
                        id="medicalNeeds"
                        name="medicalNeeds"
                        value={refugeeFormData.medicalNeeds}
                        onChange={handleRefugeeFormChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="List any medical conditions, medications, or special needs"
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={refugeeFormData.contactNumber}
                        onChange={handleRefugeeFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Phone number where you can be reached"
                      />
                    </div>

                    <div>
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={refugeeFormData.emergencyContact}
                        onChange={handleRefugeeFormChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Name and number of someone we can contact"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="specialAssistance" className="block text-sm font-medium text-gray-700">Special Assistance Needed</label>
                      <textarea
                        id="specialAssistance"
                        name="specialAssistance"
                        value={refugeeFormData.specialAssistance}
                        onChange={handleRefugeeFormChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Describe any special assistance you or your family need (shelter, food, clothing, etc.)"
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="p-4 bg-yellow-50 rounded-md mb-5">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Important Information</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>
                              Your information will be shared with disaster relief authorities and emergency services. By submitting this form, you consent to being contacted regarding assistance and relief efforts.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emergency-DEFAULT hover:bg-emergency-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emergency-DEFAULT"
                    >
                      Register as Disaster Refugee
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

export default CommunitySection; 