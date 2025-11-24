import React from 'react';

const WeatherStations: React.FC = () => {
    return (
        <table className='w-full border-collapse rounded overflow-hidden ring-1 ring-gray-300'>
            <thead>
              <tr className='font-semibold text-lg bg-brand-secondary text-white border-b border-gray-300'>
                <td className='px-4 py-2'>Weather Stations</td>
              </tr>
            </thead>

            <tbody >
              <tr>
                <td className='font-semibold px-4 pt-4'>LPVL - Vilar de Luz</td>
              </tr>
              <tr className='border-b border-gray-300'>
                <td className='px-4 pb-4'>241600Z AUTO 29002KT 16/13 Q1013 (for reference only)</td>
              </tr>

              <tr>
                <td className='font-semibold px-4 pt-4'>LPPR - Porto</td>
              </tr>
              <tr>
                <td className='px-4 pb-4'>METAR 241530Z 33011KT 300V360 9999 SCT012 16/13 Q1013</td>
              </tr>
              <tr className='border-b border-gray-300'>
                <td className='px-4 pb-4'>TAF 241100Z 2412/2512 24012KT 8000 SCT008 BKN015 TEMPO 2412/2415 3000 -RADZ BR SCT004 BKN008 BECMG 2412/2414 32012KT PROB40 TEMPO 2412/2415 1500 DZRA BR BKN002 BECMG 2415/2417 9999 SCT025 BECMG 2419/2421 36007KT FEW030 BECMG 2503/2505 VRB02KT</td>
              </tr>

              <tr>
                <td className='font-semibold px-4 pt-4'>LPOV - Ovar AB</td>
              </tr>
              <tr>
                <td className='px-4 pb-4'>METAR 241600Z 35009KT 9999 SCT012 SCT020 16/15 Q1014</td>
              </tr>
              <tr>
                <td className='px-4 pb-4'>TAF 241106Z 2412/2512 22010KT 6000 -RA SCT008 BKN015 TEMPO 2412/2415 24015G25KT 3000 -RADZ BR SCT008 BKN012 PROB40 TEMPO 2412/2414 1500 DZRA BR BKN003 BECMG 2414/2417 34015KT 9999 NSW FEW025 SCT040 TEMPO 2417/2421 35020G32KT BECMG 2423/2501 36008KT</td>
              </tr>
        
            </tbody>
          </table>
    );
};

export default WeatherStations;
