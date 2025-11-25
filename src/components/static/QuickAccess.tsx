import React from 'react';
import { Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';

interface LINK {
    name: string;
    url: string;
    local?: boolean;
    credentials?: {
        user: string;
        password: string;
    };
}

const LINKS: LINK[] = [
    {
        name: 'eLearning',
        url: 'https://nortavia.com/elearning/login/index.php',
        local: false,
    },
    {
        name: 'FlightLogger',
        url: 'https://nor.flightlogger.net/',
        local: false,
    },
    {
        name: 'Aviatize',
        url: 'https://one.aviatize.com/home/dashboard',
        local: false,
    },
    {
        name: 'Jeppesen Charts',
        url: 'https://dispatch.foreflight.com/recent-airports',
        local: false,
        credentials: {
            user: 'foreflight_username',
            password: 'foreflight_password'
        }
    }
];

const QuickAccess: React.FC = () => {
    return (
        <table className='w-full border-collapse rounded overflow-hidden ring-1 ring-gray-300'>
            <thead>
              <tr className='font-semibold text-lg bg-brand text-white border-b border-gray-300'>
                <td className='px-4 py-2'>Quick Access</td>
              </tr>
            </thead>
            <tbody>
{LINKS.map((link, index) => (
    <tr key={index}>
        <td className={`px-4 ${index === 0 ? 'pt-4' : ''} ${index === LINKS.length - 1 ? 'pb-4 pt-1' : 'py-1'}`}>
            <div className="flex items-center justify-between">
                
                {/* MAIN BUTTON */}
                {!link.local ? (
                    <button
                        className='w-full block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-brand transition-colors text-left'
                        onClick={() => (window as any).api.openExternal(link.url)}
                    >
                        {link.name}
                    </button>
                ) : (
                    <Link
                        to={link.url}
                        className="w-full block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-brand transition-colors text-left"
                    >
                        {link.name}
                    </Link>
                )}

                {/* CREDENTIAL BUTTON */}
                {link.credentials && (
                    <button
                        className="ml-2 p-2 rounded-md bg-brand text-white hover:opacity-75 transition-opacity flex items-center justify-center"
                        onClick={() => {
                            alert(
                                `Username: ${link.credentials!.user}\nPassword: ${link.credentials!.password}`
                            );
                        }}
                        aria-label="Show credentials"
                        title='Show credentials'
                    >
                        <KeyRound size={16} />
                    </button>
                )}

            </div>
        </td>
    </tr>
))}
</tbody>

          </table>
    );
};

export default QuickAccess;
