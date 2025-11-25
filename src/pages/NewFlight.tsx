import React from 'react';


const NewFlight: React.FC = () => {
    const flightType = [
        {
            name: 'Local',
        },
        {
            name: 'Visual Navigation',
        },
        {
            name: 'Instrument Local',
        },
        {
            name: 'Instrument Navigation',
        },
        {
            name: 'Progress Test',
        },
        {
            name: 'Skill Test',
            mandatoryAircraftType: ['SR20', 'P2006T', 'F33A']
        }
    ];

    const aircrafts = [
        {
            type: 'Cessna 152',
            id: 'C152',
            fleet: [
                {
                    reg: 'CS-ECY',
                    callsign: 'RTV1C'
                }
            ]
        },
        {
            type: 'Cessna 172',
            id: 'C172',
            fleet: [
                {
                    reg: 'CS-EDS',
                    callsign: 'RTV2Q'
                }
            ]
        },
        {
            type: 'Cirrus SR20 G7',
            id: 'SR20',
            fleet: [
                {
                    reg: 'D-EXOV',
                    callsign: 'RTV3S'
                }
            ]
        },
        {
            type: 'Tecnam P2006T',
            id: 'P2006T',
            fleet: [
                {
                    reg: 'CS-ECX',
                    image: 'https://cdn.jetphotos.com/400/5/36305_1651957666.jpg',
                    callsign: 'RTV4T'
                }
            ]
        },
        {
            type: 'Beechcraft Bonanza',
            id: 'F33A',
            fleet: [
                {
                    reg: 'CS-AUM',
                    callsign: 'RTV3R'
                }
            ]
        }
    ];

    const [selectedFlightType, setSelectedFlightType] = React.useState<string>('');
    const [selectedAircraftType, setSelectedAircraftType] = React.useState<string>('');
    const [selectedAircraft, setSelectedAircraft] = React.useState<string>('');
    
    return (
        <div className="py-8 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-900">
                        New Flight
                    </h1>
                </div>
                <div className='space-y-4'>
                    <div id="1" className='rounded ring-1 ring-gray-300'>
                        <div className='py-4 px-8 '>
                            <div className='flex items-center space-x-8'>
                                <span className='text-6xl font-semibold opacity-50'>
                                    1.
                                </span>
                                <h1 className='text-lg font-medium'>
                                    Select Type of Flight & Aircraft
                                </h1>
                            </div>
                            <div className='grid grid-cols-3 gap-4 mt-4'>
                                <div className='col-span-2'>
                                    <select className="w-full border border-gray-300 rounded-md p-2" onChange={(e) => {
                                        setSelectedFlightType(e.target.value);
                                        setSelectedAircraftType('');
                                        setSelectedAircraft('');
                                    }} value={selectedFlightType}>
                                        <option value="">Select Flight Type</option>
                                        {flightType.map((type) => (
                                            <option key={type.name} value={type.name}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>

                                    <select className="mt-4 w-full border border-gray-300 rounded-md p-2" onChange={(e) => setSelectedAircraftType(e.target.value)} value={selectedAircraftType} disabled={!selectedFlightType}>
                                        <option value="">Select Aircraft Type</option>
                                        {aircrafts.filter(ac => {
                                            const selectedType = flightType.find(ft => ft.name === selectedFlightType);
                                            if (selectedType && selectedType.mandatoryAircraftType) {
                                                return selectedType.mandatoryAircraftType.includes(ac.id);
                                            }
                                            return true;
                                        }).map((aircraft) => (
                                            <option key={aircraft.id} value={aircraft.id}>
                                                {aircraft.type}
                                            </option>
                                        ))}
                                    </select>

                                    <select className="mt-4 w-full border border-gray-300 rounded-md p-2" onChange={(e) => setSelectedAircraft(e.target.value)} value={selectedAircraft} disabled={!selectedAircraftType}>
                                        <option value="">Select Aircraft</option>
                                        {aircrafts.find(ac => ac.id === selectedAircraftType)?.fleet.map((aircraft) => (
                                            <option key={aircraft.reg} value={aircraft.reg}>
                                                {aircraft.reg}
                                            </option>
                                        ))}
                                    </select>

                                    <button 
                                        className='mt-4 w-full bg-brand text-white py-2 rounded-md hover:bg-brand/90 disabled:bg-gray-400' 
                                        disabled={!selectedAircraft}
                                        onClick={() => {
                                            document.getElementById("2")?.scrollIntoView({ behavior: "smooth" });
                                        }}>
                                        Continue
                                    </button>
                                </div>
                                <div className='rounded ring-1 ring-gray-300 p-4'>
                                    <img src={'https://cdn.jetphotos.com/400/5/36305_1651957666.jpg'} alt="Aircraft Image" className='rounded-t w-full h-auto max-h-36 object-cover' />
                                    <div className='pt-2 px-2'>
                                        <div className='grid grid-cols-2'>
                                            <div>
                                                <h1 className='text-2xl font-semibold'>
                                                    {selectedAircraft ? selectedAircraft : '...'}
                                                </h1>
                                                <span className='text-sm'>
                                                    Register
                                                </span>
                                            </div>
                                            <div className='text-right'>
                                                <h1 className='text-2xl font-semibold'>
                                                    {selectedAircraft 
                                                    ? 
                                                        <>
                                                            <span>
                                                                RTV
                                                            </span>
                                                            <span className='text-brand'>
                                                                {selectedAircraft ? aircrafts.find(ac => ac.id === selectedAircraftType)?.fleet.find(f => f.reg === selectedAircraft)?.callsign.replace(/RTV/, '') : '...'}
                                                            </span>
                                                        </>
                                                        : 
                                                    '...'}
                                                </h1>
                                                <span className='text-sm'>
                                                    Callsign
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="2" className='rounded ring-1 ring-gray-300'>
                        <div className='py-4 px-8'>
                            <div className='flex items-center space-x-8'>
                                <span className='text-6xl font-semibold opacity-50'>
                                    2.
                                </span>
                                <h1 className='text-lg font-medium'>
                                    NOTAMs
                                </h1>
                            </div>

                            <div>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    className="mt-4"
                                />

                            </div>
                        </div>
                    </div>
                    <div id="3" className='rounded ring-1 ring-gray-300'>
                        <div className='py-4 px-8 '>
                            <div className='flex items-center space-x-8'>
                                <span className='text-6xl font-semibold opacity-50'>
                                    3.
                                </span>
                                <h1 className='text-lg font-medium'>
                                    Weather Briefing
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div id="3" className='rounded ring-1 ring-gray-300'>
                        <div className='py-4 px-8 '>
                            <div className='flex items-center space-x-8'>
                                <span className='text-6xl font-semibold opacity-50'>
                                    4.
                                </span>
                                <h1 className='text-lg font-medium'>
                                    Mass & Balance
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFlight;