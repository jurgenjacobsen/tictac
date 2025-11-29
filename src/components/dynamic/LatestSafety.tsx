import React from 'react';

const LatestSafety: React.FC = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    return (
        <table className='w-full border-collapse rounded overflow-hidden bg-white shadow-md'>
            <thead>
              <tr className='font-semibold text-lg bg-brand text-white '>
                <td className='px-4 py-2'>Latest Safety Alert</td>
              </tr>
            </thead>

            <tbody>
                {loading ? (
                  <tr>
                    <td className="p-4 text-gray-500">Loading...</td>
                  </tr>
                ) : (
                  <tr key={'no-data'}>
                      <td className="p-4">
                        <table className='w-full border-collapse rounded overflow-hidden ring-1 ring-gray-300'>
                          <thead>
                            <tr className='font-semibold bg-brand-secondary text-white'>
                              <td className='py-2 px-4'>SA 2025-9 Hard Landings REV0</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <p className='px-4 pt-4 pb-2'>aba</p>
                              </td>
                            </tr>
                            <tr>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                )}
                {/* add view more button */}
                <tr>
                  <td className='px-4 pb-4'>
                    <button className="block px-4 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-brand transition-colors w-full text-center">
                      View More
                    </button>
                  </td>
                </tr>
            </tbody>
        </table>
    );
};

export default LatestSafety;
