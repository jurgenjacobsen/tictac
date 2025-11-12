import React, { useEffect, useState } from 'react';


interface NTAC {
  NTACref: string;
  NTACtext: string;
  NTACvalidfrom: string;
  NTACvalidto: string;
}


const HomePage: React.FC = () => {
  const [ntac, setNtac] = useState<NTAC[]>([]);

  useEffect(() => {
    fetch("https://api.flownrecords.live/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-brand">Welcome to TicTac</h1>
      </div>
    </div>
  );
};

export default HomePage;
