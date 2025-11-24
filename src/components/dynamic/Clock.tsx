import React from 'react';

const Clock: React.FC = () => {
  
  const [currentUTCTime, setCurrentUTCTime] = React.useState<string>('');
  const [localTime, setLocalTime] = React.useState<string>('');

  React.useEffect(() => {
    const now = new Date();
    // Only time, (hh:mm:ss UTC)
    const timeString = now.toISOString().split('T')[1].split('.')[0];
    setCurrentUTCTime(timeString);
    const localTimeString = now.toLocaleTimeString();
    setLocalTime(localTimeString);
    const intervalId = setInterval(() => {
        const now = new Date();
        const timeString = now.toISOString().split('T')[1].split('.')[0];
        setCurrentUTCTime(timeString);

        const localTimeString = now.toLocaleTimeString();
        setLocalTime(localTimeString);

    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='p-4 grid grid-cols-2 xl:grid-cols-1 gap-8 xl:gap-0'>
      <div>
        <div>
          UTC Time
        </div>
        <div className="text-2xl font-medium">
          {currentUTCTime}
        </div>
      </div>
      <div>
        <div>
          Local Time
        </div>
        <div className="text-2xl font-medium">
          {localTime}
        </div>
      </div>
    </div>
  );
};

export default Clock;