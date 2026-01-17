import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { RefreshCcw } from 'lucide-react';
// Adjust this import path to match your project structure
import { Reservation } from '../../pages/AreasPage';

// --- MOCK SCHEDULE ---
import { SCHEDULE } from '../../pages/AreasPage';

// --- 1. CONFIGURATION ---
// We need to know which Areas exist to render the cards,
// even if they have no reservations today.
const DEFINED_AREAS = [
    { id: 'FAMAL', name: 'Famalicão' },
    { id: 'AVES', name: 'Vila das Aves' },
    { id: 'GUIMA', name: 'Guimarães' },
    { id: 'PARED', name: 'Paredes' }
];

// --- 2. HELPER FUNCTIONS ---

// Convert "HH:mm" string to minutes from midnight (e.g., "01:30" -> 90)
const parseTime = (timeStr: string): number => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
};

// Get current UTC time in minutes from midnight
const getCurrentUtcMinutes = (): number => {
    const now = new Date();
    return (now.getUTCHours() * 60) + now.getUTCMinutes();
};

// --- 3. COMPONENT ---

const TrainingAreas: React.FC<{ schedule?: Reservation[] }> = (props) => {
    const navigate = useNavigate();

    const { schedule = SCHEDULE } = props;

    const [currentUtc, setCurrentUtc] = useState<number>(getCurrentUtcMinutes());
    const IS_IN_AREAS = location.hash.includes('#/areas');

    // Update time every minute to keep statuses fresh
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentUtc(getCurrentUtcMinutes());
        }, 60000); // Check every minute
        return () => clearInterval(timer);
    }, []);

    const areaStatuses = useMemo(() => {
        return DEFINED_AREAS.map(area => {
            // 1. Get all reservations for this specific area
            const areaReservations = schedule.filter(r => r.areaId === area.id);

            // 2. Sort them by time to be safe
            areaReservations.sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));

            // 3. Find specific states

            // Is there a plane there RIGHT NOW?
            const currentReservation = areaReservations.find(r => {
                const start = parseTime(r.startTime);
                const end = parseTime(r.endTime);
                return currentUtc >= start && currentUtc < end;
            });

            // What is the NEXT flight starting after now?
            const nextReservation = areaReservations.find(r => {
                const start = parseTime(r.startTime);
                return start > currentUtc;
            });

            // *** FIX: CHECK FOR CONTINUOUS SCHEDULE ***
            // Check if Current End Time == Next Start Time
            const isBackToBack = currentReservation && nextReservation && currentReservation.endTime === nextReservation.startTime;

            return {
                ...area,
                currentReservation,
                nextReservation,
                isBackToBack,
                hasReservationsToday: areaReservations.length > 0
            };
        });
    }, [schedule, currentUtc]);

    return (
        <div className='ring-1 ring-neutral-300 p-4 rounded-lg cursor-default font-sans'>
            {/* Header */}
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-xl text-neutral-900'>
                    Training Areas
                </h1>
                <div className='flex space-x-4 items-center'>
                    <button
                        onClick={() => window.location.reload()}
                        className='p-1 text-sm font-medium bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors duration-150'
                    >
                        <RefreshCcw className='text-neutral-700 h-5 w-5 cursor-pointer'/>
                    </button>
                    {!IS_IN_AREAS && (
                        <button className='px-4 py-1 text-sm font-medium bg-indigo-50 rounded-lg transition-colors duration-150 hover:bg-indigo-100' onClick={() => {
                            navigate('/areas');
                        }}>
                            View More
                        </button>
                    )}
                </div>
            </div>

            {/* Dynamic List */}
            <div className='space-y-4'>
                {areaStatuses.map((area) => (
                    <div key={area.id} className='ring-1 ring-neutral-300 rounded-lg overflow-hidden'>
                        <h2 className='font-medium border-b px-4 py-2'>
                            {area.name}
                        </h2>

                        <div className='py-4 px-4 space-y-2'>
                            {/* STATUS: OCCUPIED */}
                            {area.currentReservation ? (
                                <>
                                    <span className='rounded-md block w-full bg-brand-secondary text-white px-2 ring-1 ring-brand-secondary'>
                                        Occupied by {area.currentReservation.callsign} until {area.currentReservation.endTime}
                                    </span>
                                    {
                                        !area.isBackToBack && (
                                            <span className='rounded-md block w-full ring-1 ring-neutral-300 px-2'>
                                                Free at {area.currentReservation.endTime}
                                            </span>
                                        )
                                    }
                                </>
                            ) : (
                                /* STATUS: FREE */
                                <span className='rounded-md block w-full bg-green-500 px-2'>
                                    Currently free
                                </span>
                            )}

                            {/* NEXT SESSION INFO */}
                            {area.nextReservation ? (
                                <span className='rounded-md block w-full bg-neutral-300 px-2 ring-1 ring-neutral-300' title={`Next session by ${area.nextReservation.callsign}`}>
                                    Next session {area.nextReservation.startTime} to {area.nextReservation.endTime}
                                    {/*<span className='opacity-75 ml-1'>
                                        ({area.nextReservation.callsign})
                                    </span>*/}
                                </span>
                            ) : (
                                /* NO MORE FLIGHTS */
                                !area.currentReservation && (
                                    <span className='rounded-md block w-full bg-neutral-300 px-2'>
                                        {area.hasReservationsToday
                                            ? "No more sessions today"
                                            : "No reservations today"}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingAreas;
