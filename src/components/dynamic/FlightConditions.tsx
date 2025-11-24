import React from 'react';

const FlightConditions: React.FC = () => {

  const [localWx, setLocalWx] = React.useState<any>(null);

  const [components, setComponents] = React.useState<any>({
    xwind16: 0,
    xwind34: 0,
    hwind16: 0,
    hwind34: 0,
  });

  const [checks, setChecks] = React.useState<any>({
    c152SoloLocal16: false,
    c152SoloNav16: false,
    c152SoloLocal34: false,
    c152SoloNav34: false,
    c152Dual34: false,
    c152Dual16: false,
    c172Dual16: false,
    c172Dual34: false,
    p06tDual16: false,
    p06tDual34: false,
  });

  React.useEffect(() => {
    (window as any).api.getLocalWx().then((data: any) => {
      const wx = data[0];
      setLocalWx(wx);

      const windDir = wx.winddir;
      const windSpeed = wx.windNM;

      const rwy16 = 160;
      const rwy34 = 340;

      const toRad = (deg: number) => deg * (Math.PI / 180);

      const hwind16 = Math.round(windSpeed * Math.cos(toRad(windDir - rwy16)));
      const xwind16 = Math.round(windSpeed * Math.abs(Math.sin(toRad(windDir - rwy16))));
      const hwind34 = Math.round(windSpeed * Math.cos(toRad(windDir - rwy34)));
      const xwind34 = Math.round(windSpeed * Math.abs(Math.sin(toRad(windDir - rwy34))));

      setComponents({ hwind16, xwind16, hwind34, xwind34 });

      // Now compute true/false checks
      setChecks({
        c152SoloLocal16: xwind16 <= 8 && hwind16 <= 15 && hwind16 >= -5,
        c152SoloLocal34: xwind34 <= 8 && hwind34 <= 15 && hwind34 >= -5,
        c152SoloNav16: xwind16 <= 12 && hwind16 <= 25 && hwind16 >= -5,
        c152SoloNav34: xwind34 <= 12 && hwind34 <= 25 && hwind34 >= -5,
        c152Dual16: xwind16 <= 12 && hwind16 <= 25 && hwind16 >= -5,
        c152Dual34: xwind34 <= 12 && hwind34 <= 25 && hwind34 >= -5,
        c172Dual16: xwind16 <= 15 && hwind16 <= 30 && hwind16 >= -5,
        c172Dual34: xwind34 <= 15 && hwind34 <= 30 && hwind34 >= -5,
        p06tDual16: xwind16 <= 17 && hwind16 <= 25 && hwind16 >= -5,
        p06tDual34: xwind34 <= 17 && hwind34 <= 25 && hwind34 >= -5,
      });
    });
  }, []);


  return (
    <table className="w-full border-collapse rounded overflow-hidden ring-1 ring-gray-300">
      <thead>
        {/* Top title bar */}
        <tr className="font-semibold text-lg bg-brand-secondary text-white border-b border-gray-300">
          <td colSpan={9} className="text-center py-2">Vilar de Luz Conditions</td>
        </tr>

        {/* First header row */}
        <tr className="font-medium bg-brand text-white border-b border-gray-300">
          <td rowSpan={2} className="px-2 py-2 text-center border-r">Runway</td>
          <td rowSpan={2} className="px-2 py-2 text-center border-r">Headwind</td>
          <td rowSpan={2} className="px-2 py-2 text-center border-r">Crosswind</td>

          {/* C152 group */}
          <td colSpan={3} className="px-2 py-2 text-center border-r">C152</td>

          {/* C172 + P06T */}
          <td className="px-2 py-2 text-center border-r">C172</td>
          <td className="px-2 py-2 text-center">P06T</td>
        </tr>

        {/* Subheader row */}
        <tr className="font-medium bg-brand text-white border-b border-gray-300 divide-x divide-gray-400">
          <td className="px-2 py-2 text-center border-r">Solo Local</td>
          <td className="px-2 py-2 text-center border-r">Solo Nav</td>
          <td className="px-2 py-2 text-center border-r">Dual</td>
          <td className="px-2 py-2 text-center border-r">Dual</td>
          <td className="px-2 py-2 text-center">Dual</td>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-300">
        <tr className="divide-x divide-gray-300">
          <td className="px-2 py-2 text-center">16</td>
          <td className="px-2 py-2 text-center">{components.hwind16} kt</td>
          <td className="px-2 py-2 text-center">{components.xwind16} kt</td>
          <td className="px-2 py-2 text-center">{checks.c152SoloLocal16 ? "✔️" : "❌"}</td>
          <td className="px-2 py-2 text-center">{checks.c152SoloNav16 ? "✔️" : "❌"}</td>
          <td className="px-2 py-2 text-center">{checks.c152Dual16 ? "✔️" : "❌"}</td>
          <td className="px-2 py-2 text-center">{checks.c172Dual16 ? "✔️" : "❌"}</td>
          <td className="px-2 py-2 text-center">{checks.p06tDual16 ? "✔️" : "❌"}</td>
        </tr>

        <tr className="divide-x divide-gray-300">
          <td className="px-2 py-2 text-center">34</td>
          <td className="px-2 py-2 text-center">{components.hwind34} kt</td>
          <td className="px-2 py-2 text-center">{components.xwind34} kt</td>
          <td className="px-2 py-2 text-center">{checks.c152SoloLocal34 ? "✔️" : "❌"}</td>
          <td className="px-2 py-2 text-center">{checks.c152SoloNav34 ? "✔️" : "❌"}</td>
          <td className="px-2 py-2 text-center">{checks.c152Dual34 ? "✔️" : "❌"}</td>
          <td className="px-2 py-2 text-center">{checks.c172Dual34 ? "✔️" : "❌"}</td>
          <td className="px-2 py-2 text-center">{checks.p06tDual34 ? "✔️" : "❌"}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default FlightConditions;
