import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setVisible(false), 400); // Wait for fade out
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0D0D14] transition-opacity duration-400 ${
        loading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="font-orbitron text-[24px] text-[#FF6B2B] text-center mb-4 font-bold tracking-widest">
        LOADING...
      </div>
      <div className="w-64 h-[3px] bg-white/10 rounded-[2px] overflow-hidden">
        <div 
          className="h-full bg-[#FF6B2B] rounded-[2px] transition-all duration-[1200ms] ease-out"
          style={{ width: loading ? '0%' : '100%' }}
        />
      </div>
    </div>
  );
}
