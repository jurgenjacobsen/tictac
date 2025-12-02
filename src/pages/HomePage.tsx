import React from 'react';
import NTAC from '../components/dynamic/NTAC';
import LatestSafety from '../components/dynamic/LatestSafety';
import WeatherStations from '../components/dynamic/WeatherStations';
import TrainingAreas from '../components/dynamic/TrainingAreas';
import { ExternalLink } from 'lucide-react';

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
                <div className='bg-white rounded-lg shadow-md p-4 col-span-2'>
                    <div className='p-4 ring-1 ring-neutral-300 rounded-lg'>
                        <h1 className='font-semibold text-xl text-neutral-900 mb-4'>
                            Notice to Air Crew
                        </h1>
                        <table className='rounded-lg overflow-hidden w-full ring-1 ring-neutral-300'>
                            <thead>
                                <tr>
                                    <td className='bg-brand-secondary py-2 px-4 font-semibold text-white'>
                                        NTAC 01/2025
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='py-4 px-2'>
                                        New weather station installed at Cape Town International Airport (FACT) providing real-time data.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-md p-4'>
                    <div className='p-4 ring-1 ring-neutral-300 rounded-lg'>
                        <h1 className='font-semibold text-xl text-neutral-900 mb-4'>
                            Safety Information
                        </h1>
                        <table className='rounded-lg overflow-hidden w-full ring-1 ring-neutral-300'>
                            <thead>
                                <tr>
                                    <td className='bg-brand-secondary py-2 px-4 font-semibold text-white'>
                                        Latest Safety Alert
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='py-4 px-2'>
                                        SA 2025-9 Hard Landings
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='bg-white rounded-lg shadow-md p-4'>
                <div className='grid grid-cols-4 gap-4 items-start'>
                    <div className='p-4 ring-1 ring-neutral-300 rounded-lg cursor-pointer flex items-center'>
                        <h1 className='font-semibold text-xl text-neutral-900'>
                            FlightLogger
                        </h1>
                        <ExternalLink className='text-neutral-500 ml-2 h-4'/>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <div className='bg-white rounded-lg shadow-md p-4 col-span-2'>
                    <div className='ring-1 ring-neutral-300 p-4 rounded-lg'>
                         <h1 className='font-semibold text-xl text-neutral-900 mb-4'>
                            Weather Stations
                        </h1>
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-md p-4'>
                    <div className='ring-1 ring-neutral-300 p-4 rounded-lg'>
                        <h1 className='font-semibold text-xl text-neutral-900 mb-4'>
                            Training Areas
                        </h1>
                        <div className='ring-1 ring-neutral-300 p-4 rounded-lg'>
                            <div className=''>
                                <h2 className='font-medium text-netral-900'>
                                    Vila das Aves
                                </h2>
                                <div>
                                    <span className='rounded block w-full bg-green-500'>
                                        Current session until 14:00
                                    </span>
                                    <span className='rounded block w-full bg-neutral-300'>
                                        Next session from 15:00 to 17:00
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*<div className='grid grid-cols-3 gap-4 items-start'>
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
            </div>*/}
        </div>
    );
};

export default HomePage;
