import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChartsPage from './pages/ChartsPage';
import BuilderPage from './pages/BuilderPage';
import AreasPage from './pages/AreasPage';

// @ts-ignore
import Icon from './assets/iconColor.png';
import NewFlight from './pages/NewFlight';

const App: React.FC = () => {
  return (
    <Router>
  <div className="bg-gray-100 min-h-screen">

    {/* Sidebar */}
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white shadow-lg flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <img src={Icon} alt="a" className="h-16 w-16 mr-2" draggable="false"/>
        <span className="text-2xl font-bold text-brand">TicTac</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-brand transition-colors">
          Home
        </Link>
        <Link to="/new-flight" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-brand transition-colors">
          New Flight
        </Link>
        <Link to="/charts" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-brand transition-colors">
          Charts
        </Link>
        <Link to="/areas" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-brand transition-colors">
          Training Areas
        </Link>
        <Link to="/" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-brand transition-colors">
          Safety Information
        </Link>
        <Link to="/builder" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-brand transition-colors">
          Builder
        </Link>
      </nav>

      <footer className="p-4 border-t text-sm text-gray-500 text-center">
        © 2025 TicTac
      </footer>
    </aside>

    {/* Main Content */}
    <main className="ml-64 h-screen overflow-y-auto p-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/areas" element={<AreasPage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/new-flight" element={<NewFlight />} />
      </Routes>
    </main>

  </div>
</Router>

  );
};

export default App;
