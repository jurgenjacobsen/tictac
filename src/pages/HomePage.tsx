import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to TicTac
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          A modern Electron application built with React, TypeScript, and TailwindCSS.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-indigo-50 rounded-lg p-6">
            <div className="text-indigo-600 mb-3">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast</h3>
            <p className="text-gray-600">
              Built with modern technologies for optimal performance.
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <div className="text-purple-600 mb-3">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customizable</h3>
            <p className="text-gray-600">
              Easily customize and extend to fit your needs.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-green-600 mb-3">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure</h3>
            <p className="text-gray-600">
              Built with security best practices in mind.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-2">
              This is a multi-page Electron application. Navigate using the menu above to explore different sections:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li><strong>Home:</strong> This page - overview of the application</li>
              <li><strong>About:</strong> Learn more about the technologies used</li>
              <li><strong>Contact:</strong> Get in touch with us</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
