import React from 'react';
import { RefreshCcw } from 'lucide-react';

const TrainingAreas: React.FC = () => {
    const IS_IN_AREAS = location.hash.includes('#/areas');

    return (
        <div className='ring-1 ring-neutral-300 p-4 rounded-lg'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='font-semibold text-xl text-neutral-900'>
                    Training Areas
                </h1>
                <div className='flex space-x-4 items-center'>
                    <button className='p-1 text-sm font-medium bg-indigo-50 rounded-full'>
                        <RefreshCcw className='text-neutral-700 h-5 cursor-pointer'/>
                    </button>
                    {!IS_IN_AREAS && <button className='px-4 py-1 text-sm font-medium bg-indigo-50 rounded-lg'>
                        View More
                    </button>}
                </div>
            </div>
            <div className='space-y-4'>
                <div className='ring-1 ring-neutral-300 rounded-lg overflow-hidden'>
                    <h2 className='font-medium border-b px-4 py-2'>
                        Vila das Aves
                    </h2>
                    <div className='py-4 px-4 space-y-2'>
                        <span className='rounded-md block w-full bg-brand-secondary text-white px-2'>
                            Currently occupied until 14:00
                        </span>
                        <span className='rounded-md block w-full bg-neutral-300 px-2'>
                            Next session from 15:00 to 17:00
                        </span>
                        <span className='rounded-md block w-full ring-1 ring-neutral-300 px-2'>
                            Free at 18:00
                        </span>
                    </div>
                </div>
                <div className='ring-1 ring-neutral-300 rounded-lg overflow-hidden'>
                    <h2 className='font-medium border-b px-4 py-2'>
                        Barcelos
                    </h2>
                    <div className='py-4 px-4 space-y-2'>
                        <span className='rounded-md block w-full bg-green-500 px-2'>
                            Currently free
                        </span>
                        <span className='rounded-md block w-full bg-neutral-300 px-2'>
                            No reservations today
                        </span>
                    </div>
                </div>
                <div className='ring-1 ring-neutral-300 rounded-lg overflow-hidden'>
                    <h2 className='font-medium border-b px-4 py-2'>
                        Guimarães
                    </h2>
                    <div className='py-4 px-4 space-y-2'>
                        <span className='rounded-md block w-full bg-green-500 px-2'>
                            Currently free
                        </span>
                        <span className='rounded-md block w-full bg-neutral-300 px-2'>
                            Next session from 15:00 to 17:00
                        </span>
                        <span className='rounded-md block w-full ring-1 ring-neutral-300 px-2'>
                            Free at 17:00
                        </span>
                    </div>
                </div>
                <div className='ring-1 ring-neutral-300 rounded-lg overflow-hidden'>
                    <h2 className='font-medium border-b px-4 py-2'>
                        Paredes
                    </h2>
                    <div className='py-4 px-4 space-y-2'>
                        <span className='rounded-md block w-full bg-brand-secondary text-white px-2'>
                            Currently occupied until 13:00
                        </span>
                        <span className='rounded-md block w-full bg-neutral-300 px-2'>
                            Next session from 15:00 to 18:00
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingAreas;
