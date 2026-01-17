import React from 'react';
import { ExternalLink } from 'lucide-react';
import TrainingAreas from '../components/dynamic/TrainingAreas';

const links = [
    {
        title: 'New Flight',
        url: 'https://nortavia.com/flight/new',
        img: 'https://nortavia.com/assets/logo.png',
        notExternal: true,
    },
    {
        title: 'FlightLogger',
        url: 'https://flightlogger.net',
        img: 'https://api.flightlogger.net/images/logo.png'
    },
    {
        title: 'eLearning',
        url: 'https://elearning.nortavia.com',
        img: 'https://play-lh.googleusercontent.com/Q6-W3TnphbJ-plzP0Kp8QRsaefpmz6C5LXhab47gO9cEHGD6wbTyJ795TNt0GlhYPw=w3840-h2160-rw'
    },
    {
        title: 'ForeFlight',
        url: 'https://plan.foreflight.com/flights',
        img: 'https://myairops.com/wp-content/uploads/2023/10/logo-foreflight.png',
    },
    {
        title: 'Aviatize',
        url: 'https://aviatize.com',
        img: 'https://aerosouthafrica.za.messefrankfurt.com/content/dam/messefrankfurt-southafrica/aero-south-africa/2023/2023-exhibitors/AviatizeLogo.png'
    },
    {
        title: 'Charts',
        url: '/charts',
        img: 'https://aerosouthafrica.za.messefrankfurt.com/content/dam/messefrankfurt-southafrica/aero-south-africa/2023/2023-exhibitors/AviatizeLogo.png',
        notExternal: true,
    }
]

const NTACs = [
    {
        id: '02/2025',
        title: 'LEAS is closeded for school flights during weekdays until December 31st, 2025.'
    }
]

const Safety = [
    {
        header: 'Latest Safety Alert',
        id: 'SA 2025-9',
        title: 'Hard Landings'
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
                <div className='bg-white rounded-lg shadow-md p-4 col-span-2 h-full'>
                    <div className='p-4 ring-1 ring-neutral-300 rounded-lg min-h-full'>
                        <div className='flex justify-between items-center mb-2'>
                            <h1 className='font-semibold text-xl text-neutral-900'>
                                Notice to Air Crew
                            </h1>
                            <button className='px-4 py-1 text-sm font-medium bg-indigo-50 rounded-lg'>
                                View More
                            </button>
                        </div>
                        <div className='space-y-4'>
                            { NTACs.map((ntac) => (
                                <div key={ntac.id} className='ring-1 ring-neutral-300 rounded-lg overflow-hidden'>
                                    <h2 className='font-medium block w-full bg-brand-secondary text-white px-4 py-2'>
                                        NTAC {ntac.id}
                                    </h2>
                                    <div className='px-4 py-2'>
                                        {ntac.title}
                                    </div>
                                </div>
                            )) }

                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-md p-4 h-full relative'>
                    <div className='p-4 ring-1 ring-neutral-300 rounded-lg min-h-full flex flex-col justify-between'>
                        <div>
                            <div className='flex justify-between items-center mb-2'>
                                <h1 className='font-semibold text-xl text-neutral-900'>
                                    Safety Information
                                </h1>
                                <button className='px-4 py-1 text-sm font-medium bg-indigo-50 rounded-lg'>
                                    View More
                                </button>
                            </div>

                            { Safety.map((safety, index) => (
                                <div key={safety.id} className={'ring-1 ring-neutral-300 rounded-lg overflow-hidden' + (index > 0 ? ' mt-4' : '')}>
                                    <div className='w-full bg-brand-secondary px-4 py-2'>
                                        <h2 className='font-medium text-white'>
                                            {safety.header}
                                        </h2>
                                    </div>
                                    <div className='px-4 py-2'>
                                        {safety.id} - {safety.title}
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white rounded-lg shadow-md p-4'>
                <div className='grid grid-cols-3 gap-4 items-start'>
                    { links.map((link, index) => (
                        <div key={index} className='p-4 ring-1 ring-neutral-300 rounded-lg cursor-pointer flex items-center'>
                            <h1 className='font-semibold text-xl text-neutral-900'>
                                {link.title}
                            </h1>
                            {!link.notExternal && <ExternalLink className='text-neutral-500 ml-2 h-4'/>}
                        </div>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <div className='bg-white rounded-lg shadow-md p-4 col-span-2'>
                    <div className='ring-1 ring-neutral-300 p-4 rounded-lg min-h-full'>
                        <h1 className='font-semibold text-xl text-neutral-900 mb-4'>
                            Weather Stations
                        </h1>
                        <div className='space-y-4'>
                            <div className='rounded-lg ring-1 ring-neutral-300 p-4'>
                                <div className='font-semibold'>
                                    LPVL - Vilar de Luz
                                </div>
                                <div>
                                    LPVL 21950Z AUTO 32004KT 09/07 Q1016
                                </div>
                            </div>
                            <div className='rounded-lg ring-1 ring-neutral-300 p-4'>
                                <div className='font-semibold'>
                                    LPPR - Porto
                                </div>
                                <div>
                                    METAR LPPR 021930Z 01011KT 9999 -SHRA FEW014 FEW018CB BKN022 09/07 Q1016
                                </div>

                                <div className='mt-2'>
                                    TAF LPPR 021700Z 0218/0318 26012KT 9999 SCT020 TEMPO 0218/0222 8000 SHRA SCT008 FEW020CB BKN030 PROB30 0218/0220 VRB15G25KT 2000 +TSRAGS SCT016CB BECMG 0222/0224 08007KT PROB30 TEMPO 0302/0308 2000 BCFG BR SCT002 BECMG 0304/0306 14005KT BECMG 0315/0317 26010KT
                                </div>
                            </div>
                            <div className='rounded-lg ring-1 ring-neutral-300 p-4'>
                                <div className='font-semibold'>
                                    LPOV - Ovar AB
                                </div>
                                <div>
                                    METAR Not available
                                </div>
                                <div className='mt-2'>
                                    TAF LPOV 021706Z 0218/0318 28012KT 9999 SCT020 TEMPO 0218/0224 3000 SHRA BKN014 SCT020CB PROB30 TEMPO 0218/0221 30015G32KT 2000 +TSRAGS BKN009 BKN018CB BECMG 0300/0302 04005KT PROB30 0302/0309 0200 FG BECMG 0308/0310 17008KT TEMPO 0312/0318 6000 -SHRA BKN018 FEW022TCU BECMG 0313/0315 25010KT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow-md p-4'>
                    <TrainingAreas />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
