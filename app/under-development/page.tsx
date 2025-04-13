'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UnderDevelopment = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="text-6xl text-primary-600 mb-4">🚧</div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">Page Under Development</h1>
        <p className="text-xl text-gray-600 mb-8">We're working hard to bring this feature to you soon!</p>
        <div className="space-y-4">
          <button 
            onClick={() => router.back()}
            className="block w-full sm:w-auto sm:inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            Go Back
          </button>
          <Link 
            href="/"
            className="block w-full sm:w-auto sm:inline-block bg-white text-primary-600 border border-primary-600 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors sm:ml-4"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment; 