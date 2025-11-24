import React from 'react';
import NTAC from '../components/dynamic/NTAC';
import Clock from '../components/dynamic/Clock';
import FlightConditions from '../components/dynamic/FlightConditions';
import WeatherStations from '../components/dynamic/WeatherStations';
import QuickAccess from '../components/static/QuickAccess';

const HomePage: React.FC = () => {

  return (
    <div className="py-8 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-y-4 xl:gap-4'>
          <div className='rounded ring-1 ring-gray-300 flex justify-center items-center col-span-2 xl:col-span-1'>
            <Clock />
          </div>
          <div className='col-span-3'>
            <FlightConditions />
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md p-8  grid grid-cols-4 2xl:grid-cols-5 gap-4'>
        <div className='col-span-2'>
          <NTAC />
        </div>
        <div className='col-span-2'>
          <WeatherStations />
        </div>
        <div className='col-span-2 2xl:col-span-1'>
          <QuickAccess />
        </div>
      </div>

    </div>
  );
};

export default HomePage;
