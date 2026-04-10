import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 flex items-center justify-between px-6 text-white text-[11px] font-bold tracking-wider z-50 bg-black/10 backdrop-blur-sm">
      <div className="flex items-center gap-1">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="flex items-center gap-3">
        <Signal size={12} />
        <Wifi size={12} />
        <div className="flex items-center gap-1">
          <span>85%</span>
          <Battery size={12} />
        </div>
      </div>
    </div>
  );
}
