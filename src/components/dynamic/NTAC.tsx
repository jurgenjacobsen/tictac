import React from 'react';

const NTAC: React.FC = () => {

    const [ntacData, setNtacData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    
    async function fetchNTAC() {
        const data = await (window as any).api.getNTAC();
        if(data.length === 0    ) {
            setNtacData([
            {
                NTACref: "001/25",
                NTACtext: "LEAS Closed for school flights during november.",
                NTACvalidfrom: "2025-11-01T12:00:00Z",
                NTACvalidto: "2025-11-30T18:00:00Z"
            }
        ]);
            setLoading(false);
            return;
        }
        setNtacData(data);
        setLoading(false);
        return data;
    }

    React.useEffect(() => {
        fetchNTAC();
    }, []);

    return (
        <table className='w-full border-collapse rounded overflow-hidden col-span-2 bg-white shadow-md'>
            <thead>
              <tr className='font-semibold text-lg bg-brand text-white'>
                <td className='px-4 py-2'>Notice to Air Crew</td>
              </tr>
            </thead>

            <tbody>
                {loading ? (
                  <tr>
                    <td className="p-4 text-gray-500">Loading...</td>
                  </tr>
                ) : (
                  ntacData.length > 0 ? ntacData.map((ntac, index) => (
                    <tr key={index}>
                      <td className="p-4">
                        <table className='w-full border-collapse rounded overflow-hidden ring-1 ring-gray-300'>
                          <thead>
                            <tr className='font-semibold bg-brand-secondary text-white'>
                              <td className='py-2 px-4'>NTAC {ntac.NTACref}</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <p className='px-4 pt-4 pb-2'>{ntac.NTACtext}</p>
                              </td>
                            </tr>
                            <tr>
                              <td className='grid grid-cols-2'>
                                <p className='px-4 pb-4 text-sm text-gray-500'>
                                  Valid From: {new Date(ntac.NTACvalidfrom).toUTCString().split(', ')[1].trim().replace(/ GMT/g, 'Z')}
                                </p>
                                <p className='px-4 pb-4 text-sm text-gray-500'>
                                  Valid To: {new Date(ntac.NTACvalidto).toUTCString().split(', ')[1].trim().replace(/ GMT/g, 'Z')}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td className='px-4 pb-4 text-gray-500'>No NTAC data available.</td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
    );
};

export default NTAC;
