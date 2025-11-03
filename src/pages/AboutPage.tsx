import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About TicTac</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            TicTac is a modern desktop application built using cutting-edge web technologies,
            demonstrating the power of Electron for creating cross-platform applications.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies Used</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">Electron Forge</h3>
              <p className="text-gray-600">
                A complete tool for creating, publishing, and installing modern Electron applications.
                It provides a robust build pipeline and simplifies the development workflow.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">React</h3>
              <p className="text-gray-600">
                A JavaScript library for building user interfaces. React makes it painless to create
                interactive UIs with reusable components.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">TypeScript</h3>
              <p className="text-gray-600">
                TypeScript adds static type definitions to JavaScript, enabling better tooling,
                error detection, and code maintainability.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-cyan-600 mb-3">TailwindCSS</h3>
              <p className="text-gray-600">
                A utility-first CSS framework for rapidly building custom user interfaces
                without writing custom CSS.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-orange-600 mb-3">React Router</h3>
              <p className="text-gray-600">
                Declarative routing for React applications. Enables multi-page navigation
                in single-page applications.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Webpack</h3>
              <p className="text-gray-600">
                A static module bundler for modern JavaScript applications, configured
                via Electron Forge for optimal builds.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span className="text-gray-700">Multi-page navigation with React Router</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span className="text-gray-700">Type-safe code with TypeScript</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span className="text-gray-700">Beautiful UI with TailwindCSS</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span className="text-gray-700">Cross-platform desktop application</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span className="text-gray-700">Hot reload development experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✓</span>
              <span className="text-gray-700">All local - no server required</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
