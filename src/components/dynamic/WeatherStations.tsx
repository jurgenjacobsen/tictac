import React from 'react';

const tempRegex = /(M?\d{1,2})\/(M?\d{1,2})/;
const qnhRegex = /Q(\d{3,4})/;

const WeatherStations: React.FC = () => {
  const [weatherStations, updateWeatherStations] = React.useState<any>({
    LPVL: 'Not available',
    LPPR: {
      metar: 'Not available',
      taf: 'Not available',
    },
    LPOV: {
      metar: 'Not available',
      taf: 'Not available',
    },
  });

  React.useEffect(() => {
    async function fetchWeatherData() {
      let northWx = await (window as any).api.getNorthWx();
      let northTaf = await (window as any).api.getNorthTaf();
      let localWx = await (window as any).api.getLocalWx();

      const lpprTempMatch = northWx.lppr.match(tempRegex);
      const lpprQnhMatch = northWx.lppr.match(qnhRegex);

      const date = new Date();
      const obsTime = date.getUTCHours().toString().padStart(2, '0') + (Math.round(date.getUTCMinutes()/10)*10).toString().padStart(2, '0');

      let newData = {
        LPVL: localWx ? `
          LPVL ${date.getDate()}${obsTime}Z AUTO ${localWx[0]?.winddir}${String(localWx[0]?.windNM).padStart(2, "0")}${localWx[0]?.windGustNM > (localWx[0]?.windNM*1+10) ? 'G' + String(localWx[0]?.windGustNM).padStart(2, "0") : ''}KT ${lpprTempMatch[1]}/${lpprTempMatch[2]} Q${lpprQnhMatch[1]}`
        : 'Not available',

        LPPR: northWx ? {
          metar: northWx.lppr,
          taf: northTaf.lppr,
        } : {
          metar: 'Not available',
          taf: 'Not available',
        },
        LPOV: northWx ? {
          metar: northWx.lpov,
          taf: northTaf.lpov,
        } : {
          metar: 'Not available',
          taf: 'Not available',
        },
      };

      updateWeatherStations(newData);
    }

    fetchWeatherData().then(() => {
      console.log('Weather data fetched');
    }).catch((error) => {
      console.error('Error fetching weather data:', error)
    });

  }, []);

    return (
        <table className='w-full border-collapse rounded overflow-hidden bg-white col-span-2 shadow-md'>
            <thead>
              <tr className='font-semibold text-lg bg-brand text-white border-b border-gray-300'>
                <td className='px-4 py-2'>Weather Stations</td>
              </tr>
            </thead>

            <tbody >
              <tr>
                <td className='font-semibold px-4 pt-4'>LPVL - Vilar de Luz</td>
              </tr>
              <tr className='border-b border-gray-300'>
                <td className='px-4 pb-4'>
                  { weatherStations.LPVL ? `${weatherStations.LPVL}` : 'METAR Not available' }
                </td>
              </tr>

              <tr>
                <td className='font-semibold px-4 pt-4'>LPPR - Porto</td>
              </tr>
              <tr>
                <td className='px-4 pb-4'>
                  { weatherStations.LPPR ? `${weatherStations.LPPR.metar}` : 'METAR Not available' }
                </td>
              </tr>
              <tr className='border-b border-gray-300'>
                <td className='px-4 pb-4'>
                  { weatherStations.LPPR ? `${weatherStations.LPPR.taf}` : 'TAF Not available' }
                </td>
              </tr>

              <tr>
                <td className='font-semibold px-4 pt-4'>LPOV - Ovar AB</td>
              </tr>
              <tr>
                <td className='px-4 pb-4'>
                  { weatherStations.LPOV ? `${weatherStations.LPOV.metar}` : 'METAR Not available' }
                </td>
              </tr>
              <tr>
                <td className='px-4 pb-4'>
                  { weatherStations.LPOV ? `${weatherStations.LPOV.taf}` : 'TAF Not available' }
                </td>
              </tr>

            </tbody>
          </table>
        /*
        <table className='w-full border-collapse rounded overflow-hidden bg-white col-span-2 shadow-md'>
            <thead>
              <tr className='font-semibold text-lg bg-brand text-white border-b border-gray-300'>
                <td className='px-4 py-2'>Weather Stations</td>
              </tr>
            </thead>

            <tbody >
              <tr>
                <td className='font-semibold px-4 pt-4'>LPVL - Vilar de Luz</td>
              </tr>
              <tr className='border-b border-gray-300'>
                <td className='px-4 pb-4'>
                  { weatherStations.LPVL ? `${weatherStations.LPVL}` : 'METAR Not available' }
                </td>
              </tr>

              <tr>
                <td className='font-semibold px-4 pt-4'>LPPR - Porto</td>
              </tr>
              <tr>
                <td className='px-4 pb-4'>
                  { weatherStations.LPPR ? `${weatherStations.LPPR.metar}` : 'METAR Not available' }
                </td>
              </tr>
              <tr className='border-b border-gray-300'>
                <td className='px-4 pb-4'>
                  { weatherStations.LPPR ? `${weatherStations.LPPR.taf}` : 'TAF Not available' }
                </td>
              </tr>

              <tr>
                <td className='font-semibold px-4 pt-4'>LPOV - Ovar AB</td>
              </tr>
              <tr>
                <td className='px-4 pb-4'>
                  { weatherStations.LPOV ? `${weatherStations.LPOV.metar}` : 'METAR Not available' }
                </td>
              </tr>
              <tr>
                <td className='px-4 pb-4'>
                  { weatherStations.LPOV ? `${weatherStations.LPOV.taf}` : 'TAF Not available' }
                </td>
              </tr>

            </tbody>
          </table>
        */
    );
};

export default WeatherStations;
