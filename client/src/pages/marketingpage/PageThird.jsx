import React from "react";

const OnboardingStepThree = ({ onGetStarted, onBack, onSignIn }) => {
  return (
    <div className="h-screen w-screen max-w-full max-h-full overflow-hidden bg-[#F6F8F7] flex flex-col font-sans">
      <header className="w-full bg-white py-2 sm:py-3 shrink-0">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-[#14D38E] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <span className="font-bold text-sm sm:text-lg text-[#1A1A1A] tracking-tight">TripSplit India</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" className="cursor-pointer px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg bg-[#E8FBF4] border border-[#C6F3E3] text-[#14D38E] text-[10px] sm:text-xs font-bold transition-transform hover:scale-95 active:scale-95">
              Help Center
            </button>
            <button type="button" onClick={onSignIn} className="cursor-pointer px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg bg-[#14D38E] text-white text-[10px] sm:text-xs font-bold transition-transform hover:scale-95 active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-hidden max-w-6xl mx-auto px-4 lg:px-6 py-4 lg:py-5 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
        <div className="flex flex-col min-h-0 gap-6 sm:gap-10 lg:gap-[85px] pt-0 sm:pt-4 lg:pt-8 mb-4 lg:mb-0">
          <div className="max-w-sm shrink-0">
            <div className="flex justify-between items-end mb-1.5">
              <div>
                <p className="text-[9px] font-bold tracking-[0.18em] text-gray-500 uppercase">STEP 3 OF 3</p>
                <p className="text-base font-medium text-[#5C7267] mt-0.5">Settle instantly with clarity</p>
              </div>
              <p className="text-[11px] font-bold text-gray-800">100%</p>
            </div>
            <div className="h-1.5 w-full bg-[#E2E8E4] rounded-full overflow-hidden">
              <div className="h-full w-full bg-[#14D38E] rounded-full" />
            </div>
          </div>

          <div className="relative -mt-1 sm:mt-0 min-h-[200px] sm:min-h-0 flex-1 max-h-[240px] sm:max-h-[280px] lg:max-h-[320px] bg-[#D9EAE2] rounded-xl lg:rounded-2xl p-2 lg:p-3 flex items-center justify-center overflow-hidden sm:overflow-visible shrink-0 lg:shrink">
            <div className="w-full h-full rounded-lg lg:rounded-xl border-2 border-white shadow-inner overflow-hidden bg-[#F2F2E2]">
              <img src="/assets/travelillusionimage.png" alt="Settle with UPI" className="w-full h-full object-cover object-center" />
            </div>
            <div className="absolute -top-2 -left-2 lg:-top-3 lg:-left-3 bg-white border border-[#C6F3E3] p-2 lg:p-2.5 rounded-xl shadow-lg flex items-center gap-2 min-w-[110px] lg:min-w-[130px]">
              <div className="bg-[#14D38E] p-1.5 rounded-lg shrink-0">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] lg:text-xs font-bold text-gray-900 leading-tight">UPI Ready</p>
                <p className="text-[9px] text-gray-500">Scan & Pay</p>
              </div>
            </div>
            <div className="absolute bottom-8 right-2 lg:bottom-10 lg:right-4 bg-white border border-[#C6F3E3] p-2 lg:p-2.5 rounded-xl shadow-lg flex items-center gap-2 min-w-[110px] lg:min-w-[130px]">
              <div className="bg-[#14D38E] p-1.5 rounded-full shrink-0 flex items-center justify-center">
                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] lg:text-xs font-bold text-gray-900 leading-tight">Settled!</p>
                <p className="text-[9px] text-gray-500">Balance: ₹0.00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col min-h-0 justify-center overflow-hidden">
          <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-extrabold text-[#1A1A1A] leading-tight mb-2 lg:mb-3">
            Settle. Pay. <span className="text-[#14D38E]">Smile.</span>
          </h1>
          <p className="text-[#8B9E94] text-sm lg:text-base leading-relaxed mb-3 lg:mb-4 max-w-md">
            Finalize balances with one click using integrated UPI shortcuts. Fair splitting for every friend, every time.
          </p>
          <div className="grid grid-cols-2 gap-2.5 lg:gap-3 mb-3 lg:mb-4">
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-gray-50 shadow-sm">
              <div className="text-[#14D38E] mb-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Instant UPI</h3>
              <p className="text-[10px] lg:text-xs text-gray-400 leading-snug">Direct links to your favorite payment apps for quick settlement.</p>
            </div>
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-gray-50 shadow-sm">
              <div className="text-[#14D38E] mb-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Clear History</h3>
              <p className="text-[10px] lg:text-xs text-gray-400 leading-snug">Keep a transparent record of all paid dues and trip debts.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" onClick={onGetStarted} className="cursor-pointer flex-1 lg:flex-none px-6 py-3 sm:px-10 sm:py-3.5 rounded-full bg-[#14D38E] text-[#1A1A1A] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:bg-[#11B97C] transition-all hover:scale-95 active:scale-95">
              Get Started
              <svg className="w-5 h-5 text-[#1A1A1A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button type="button" onClick={onBack} className="cursor-pointer flex-1 lg:flex-none px-4 py-2.5 sm:px-8 lg:px-10 sm:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl bg-[#EFF2F1] text-gray-700 font-bold text-xs sm:text-sm lg:text-base hover:bg-[#E5EAE8] transition-all hover:scale-95 active:scale-95">
              Back
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full py-1.5 shrink-0 text-center">
        <p className="text-[10px] text-[#8B9E94]">© 2024 TripSplit India. Built for travelers, by travelers.</p>
      </footer>
    </div>
  );
};

export default OnboardingStepThree;
