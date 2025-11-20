import React, { useState, useEffect } from 'react';
import SpinWheel from './components/SpinWheel';
import { fireConfetti } from './utils/confetti';
import { Segment, STORAGE_KEY, WA_NUMBER } from './constants';
import { Gift, CheckCircle, Ban } from 'lucide-react';

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinTrigger, setSpinTrigger] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [result, setResult] = useState<Segment | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Strict check: If stored, they are done.
    const savedStatus = localStorage.getItem(STORAGE_KEY);
    if (savedStatus) {
      setHasSpun(true);
    }
  }, []);

  const handleSpinClick = () => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    setSpinTrigger((prev) => prev + 1);
  };

  const handleSpinFinished = (winner: Segment) => {
    setIsSpinning(false);
    setResult(winner);
    setHasSpun(true);
    localStorage.setItem(STORAGE_KEY, "true");
    
    if (!winner.isZonk) {
        fireConfetti();
    }
    
    setTimeout(() => {
        setShowModal(true);
    }, 600);
  };

  const handleClaimPrize = () => {
    if (!result) return;
    
    // WA Redirect Logic
    const message = `Halo Admin, saya pemenang Gucci Lucky Spin!\n\nHadiah saya: *${result.value}*\n\nMohon bantuannya untuk klaim hadiah ini. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodedMessage}`;
    
    window.location.href = waUrl;
  };

  return (
    <div className="min-h-screen w-full bg-[#022c22] flex flex-col items-center justify-start pt-6 pb-12 overflow-hidden relative">
      
      {/* Luxury Background Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#000000] to-transparent opacity-80"></div>
      
      {/* Stripe Decor (Gucci Style) */}
      <div className="absolute top-0 left-0 w-full h-2 bg-[#db1f26]"></div>
      <div className="absolute top-2 left-0 w-full h-2 bg-[#115740]"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8 px-4 mt-4">
        <div className="inline-block border-b-2 border-[#c5a059] pb-2 mb-2">
            <h2 className="text-[#c5a059] tracking-[0.3em] text-xs md:text-sm font-bold uppercase">Exclusive Event</h2>
        </div>
        <h1 className="text-5xl md:text-7xl font-luxury text-gold-gradient drop-shadow-2xl">
          GUCCI SPIN
        </h1>
        <p className="text-gray-300 mt-3 text-sm md:text-base font-light tracking-wide max-w-md mx-auto">
          Kesempatan langka! Putar roda keberuntungan dan menangkan hadiah eksklusif hari ini.
        </p>
      </div>

      {/* Main Wheel Section */}
      <div className="relative z-10 flex flex-col items-center scale-90 md:scale-100">
        <SpinWheel 
            onFinished={handleSpinFinished} 
            isSpinning={isSpinning}
            spinTrigger={spinTrigger}
        />

        {/* Luxury Stand Base */}
        <div className="perspective-stand -mt-10 z-0">
            <div className="trapezoid w-48 h-28 md:w-64 md:h-36 bg-gradient-to-b from-[#b45309] to-[#451a03] rounded-b-3xl shadow-2xl border-b-4 border-[#fbbf24] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-full bg-black/20 blur-md"></div>
            </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 z-20">
        {!hasSpun ? (
             <button
                onClick={handleSpinClick}
                disabled={isSpinning}
                className={`
                  relative overflow-hidden group px-16 py-4 rounded-full text-xl md:text-2xl font-bold tracking-wider shadow-[0_0_20px_rgba(217,119,6,0.5)] transition-all duration-300
                  ${isSpinning 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#b45309] via-[#fcd34d] to-[#b45309] text-[#3f1d08] hover:scale-105'
                  }
                `}
              >
                <span className="relative z-10">{isSpinning ? 'SEDANG MEMUTAR...' : 'PUTAR SEKARANG'}</span>
                {/* Button Shine Animation */}
                {!isSpinning && <div className="absolute inset-0 shine-effect opacity-50 group-hover:opacity-100"></div>}
              </button>
        ) : (
            <div className="bg-black/40 backdrop-blur-md border border-red-500/50 p-4 rounded-xl text-red-200 flex items-center gap-3 max-w-sm mx-4">
                <Ban className="w-6 h-6 shrink-0" />
                <p className="text-sm text-left">Kesempatan anda sudah habis. Terima kasih telah berpartisipasi.</p>
            </div>
        )}
       
        <p className="text-[#c5a059] text-xs text-center mt-6 opacity-60">
            *Satu perangkat hanya memiliki 1x kesempatan.
        </p>
      </div>

      {/* Winner Modal */}
      {showModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-500">
          <div className="bg-[#0f172a] rounded-2xl p-1 max-w-sm w-full shadow-2xl transform scale-100 animate-in zoom-in duration-300 border border-[#c5a059]">
             <div className="bg-[#022c22] rounded-xl p-8 text-center relative overflow-hidden">
                 
                 {/* Background Glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#c5a059] blur-[100px] opacity-20"></div>

                 {result.isZonk ? (
                     <>
                        <div className="flex justify-center mb-4">
                            <Ban className="w-20 h-20 text-gray-400" />
                        </div>
                        <h2 className="text-3xl font-luxury text-white mb-2">OOPS!</h2>
                        <p className="text-gray-400 mb-6">Sayang sekali, anda belum beruntung kali ini.</p>
                        <button 
                            onClick={() => setShowModal(false)}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
                        >
                            Tutup
                        </button>
                     </>
                 ) : (
                     <>
                         <div className="flex justify-center mb-6">
                            <div className="p-3 bg-[#c5a059] rounded-full shadow-lg animate-bounce">
                                <Gift className="w-10 h-10 text-[#3f1d08]" />
                            </div>
                         </div>
                         
                         <h2 className="text-2xl md:text-3xl font-luxury text-[#c5a059] mb-2">SELAMAT!</h2>
                         <p className="text-gray-300 text-sm mb-4">Anda memenangkan hadiah eksklusif:</p>
                         
                         <div className="bg-black/30 border border-[#c5a059]/30 py-4 px-2 rounded-lg mb-8">
                            <p className="text-2xl md:text-3xl font-bold text-white font-luxury leading-tight">
                                {result.value}
                            </p>
                         </div>
            
                         <button 
                            onClick={handleClaimPrize}
                            className="w-full group relative overflow-hidden bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                         >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1s_infinite]"></div>
                            
                            <span className="text-lg tracking-wide">AMBIL HADIAH</span>
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="inline-block">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                         </button>
                         <p className="text-[10px] text-gray-500 mt-4">Klik tombol di atas untuk validasi manual ke WhatsApp Admin.</p>
                     </>
                 )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
