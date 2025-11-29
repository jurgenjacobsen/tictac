import React from 'react';
import NTAC from '../components/dynamic/NTAC';
import LatestSafety from '../components/dynamic/LatestSafety';
import WeatherStations from '../components/dynamic/WeatherStations';
import TrainingAreas from '../components/dynamic/TrainingAreas';

const links = [
    {
        title: 'Flight Logger',
        url: 'https://flightlogger.net',
        img: 'https://api.flightlogger.net/images/logo.png'
    },
    {
        title: 'Aviatize',
        url: 'https://aviatize.com',
        img: 'https://aerosouthafrica.za.messefrankfurt.com/content/dam/messefrankfurt-southafrica/aero-south-africa/2023/2023-exhibitors/AviatizeLogo.png'
    },
    {
        title: 'eLearning',
        url: 'https://elearning.nortavia.com',
        img: 'https://play-lh.googleusercontent.com/Q6-W3TnphbJ-plzP0Kp8QRsaefpmz6C5LXhab47gO9cEHGD6wbTyJ795TNt0GlhYPw=w3840-h2160-rw'
    },
    {
        title: 'ForeFlight',
        url: 'https://plan.foreflight.com/flights',
        img: 'https://myairops.com/wp-content/uploads/2023/10/logo-foreflight.png'
    }
]

const HomePage: React.FC = () => {

  return (
    <div className="py-8 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8 select-none flex justify-center">
        <div className='my-8'>
            <h1 className='font-bold text-6xl text-brand'>
                Nortávia
            </h1>
            <span className='text-brand-secondary font-semibold'>
                Fly Higher
            </span>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-4 items-start'>
        <NTAC />
        <LatestSafety />
      </div>

      <div className='grid grid-cols-3 gap-4'>
        {
            links.map((link) => (
                <div key={link.title} className='bg-white rounded-lg shadow-md cursor-pointer p-8 flex justify-center items-center'>
                    <img src={link.img} alt={link.title} className='max-h-16 object-cover'/>
                </div>
            ))
        }
      </div>

      <div className='grid grid-cols-3 gap-4 items-start'>
        <WeatherStations />
        <TrainingAreas />
      </div>
    </div>
  );
};

export default HomePage;
