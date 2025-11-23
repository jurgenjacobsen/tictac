import React, { useState } from 'react';

const BuilderPage: React.FC = () => {

  const [distance, setDistance] = useState("");
  const [altitude, setAltitude] = useState("");
  const [gradient, setGradient] = useState<number | null>(null);
  const [ftPerNm, setFtPerNm] = useState<number | null>(null);

  const calculate = () => {
    const distNum = parseFloat(distance);
    const altNum = parseFloat(altitude);

    if (isNaN(distNum) || isNaN(altNum) || distNum <= 0) {
      setGradient(null);
      setFtPerNm(null);
      return;
    }

    // Same formulas as your BAT script + PowerShell
    const grad = (100 * altNum) / (distNum * 6076);
    const gradMargin = Math.round(grad * 1.15 * 10) / 10;

    const climb = altNum / distNum;
    const climbMargin = Math.round(climb * 1.15 * 10) / 10;

    setGradient(gradMargin);
    setFtPerNm(climbMargin);
  };

  return (
    <div className="px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Climb Gradient Calculator
        </h1>

        <div className="prose max-w-none mb-8">
          <p className="text-lg text-gray-700">
            Enter the horizontal distance and altitude difference.
            The calculator applies the same formulas as the original script,
            including the 15% safety margin.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <label className="block text-gray-800 mb-2 font-semibold">
              Horizontal Distance (NM)
            </label>
            <input
              type="number"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g., 3.2"
            />
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <label className="block text-gray-800 mb-2 font-semibold">
              Altitude Difference (ft)
            </label>
            <input
              type="number"
              step="1"
              value={altitude}
              onChange={(e) => setAltitude(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g., 450"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={calculate}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Calculate
        </button>

        {/* Results */}
        {gradient !== null && ftPerNm !== null && (
          <div className="mt-8 border border-gray-300 rounded-lg p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>

            <p className="text-gray-800 mb-3">
              <span className="font-semibold">Gradient:</span>{" "}
              {gradient}% (incl. 15% margin)
            </p>

            <p className="text-gray-800">
              <span className="font-semibold">Required climb:</span>{" "}
              {ftPerNm} ft/NM (incl. 15% margin)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderPage;
