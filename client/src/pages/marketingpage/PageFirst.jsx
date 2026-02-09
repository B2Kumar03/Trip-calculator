import React from "react";

const OnboardingStepOne = ({ onContinue, onSkip, onSignIn }) => {
  return (
    <div className="h-screen w-screen max-w-full max-h-full overflow-hidden bg-[#F6F8F7] flex flex-col font-sans">
      {/* ───────── HEADER ───────── */}
      <header className="w-full bg-white py-2 sm:py-3 shrink-0">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-[#14D38E] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <span className="font-bold text-sm sm:text-lg text-[#1A1A1A] tracking-tight">
              TripSplit India
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="cursor-pointer px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg bg-[#E8FBF4] border border-[#C6F3E3] text-[#14D38E] text-[10px] sm:text-xs font-bold transition-transform hover:scale-95 active:scale-95">
              Help Center
            </button>
            <button type="button" onClick={onSignIn} className="cursor-pointer px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg bg-[#14D38E] text-white text-[10px] sm:text-xs font-bold transition-transform hover:scale-95 active:scale-95">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* ───────── MAIN CONTENT ───────── */}
      <main className="flex-1 min-h-0 overflow-hidden max-w-6xl mx-auto px-4 lg:px-6 py-4 lg:py-5 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
        
        {/* LEFT: PROGRESS & ILLUSTRATION */}
        <div className="flex flex-col min-h-0 gap-6 sm:gap-10 lg:gap-[85px] pt-0 sm:pt-4 lg:pt-8 mb-4 lg:mb-0">
          {/* Step info */}
          <div className="max-w-sm shrink-0">
            <div className="flex justify-between items-end mb-1.5">
              <div>
                <p className="text-[9px] font-bold tracking-[0.18em] text-gray-500 uppercase">
                  STEP 1 OF 3
                </p>
                <p className="text-base font-medium text-[#5C7267] mt-0.5">
                  Create Your First Trip
                </p>
              </div>
              <p className="text-[11px] font-bold text-gray-800">33%</p>
            </div>
            <div className="h-1.5 w-full bg-[#E2E8E4] rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-[#14D38E] rounded-full"></div>
            </div>
          </div>

          {/* Illustration Container - overflow-hidden on mobile so it doesn't overlap heading below */}
          <div className="relative -mt-1 sm:mt-0 min-h-[200px] sm:min-h-0 flex-1 max-h-[240px] sm:max-h-[280px] lg:max-h-[320px] bg-[#D9EAE2] rounded-xl lg:rounded-2xl p-2 lg:p-3 flex items-center justify-center overflow-hidden sm:overflow-visible shrink-0 lg:shrink">
            <div className="w-full h-full rounded-lg lg:rounded-xl border-2 border-white shadow-inner overflow-hidden bg-[#F2F2E2]">
              <img
                src="/assets/travelillusionimage.png"
                alt="Travel illustration - plan, split, and travel with friends"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Floating Info Cards */}
            <div className="absolute -top-2 -right-2 lg:-top-3 lg:-right-3 bg-white p-2 lg:p-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-gray-100 min-w-[130px] lg:min-w-[150px]">
              <div className="bg-[#14D38E]/10 p-1.5 rounded-lg text-[#14D38E] shrink-0">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] lg:text-xs font-bold text-gray-900 leading-tight">Fair Splitting</p>
                <p className="text-[9px] text-gray-400">Auto-calculates INR</p>
              </div>
            </div>

            <div className="absolute bottom-6 -left-4 lg:bottom-8 lg:-left-5 bg-white p-2 lg:p-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-gray-100 min-w-[120px] lg:min-w-[135px]">
              <div className="bg-blue-50 p-1.5 rounded-lg text-blue-500 shrink-0">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] lg:text-xs font-bold text-gray-900 leading-tight">Group Chat</p>
                <p className="text-[9px] text-gray-400">Stay in sync</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: TEXT & ACTIONS - z-10 on mobile so heading stays above image card */}
        <div className="relative z-10 flex flex-col min-h-0 justify-center overflow-hidden">
          <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-extrabold text-[#1A1A1A] leading-tight mb-2 lg:mb-3">
            Plan. Split. <span className="text-[#14D38E]">Travel.</span>
          </h1>

          <p className="text-[#8B9E94] text-sm lg:text-base leading-relaxed mb-3 lg:mb-4 max-w-md">
            Start your journey by creating a trip and inviting your friends. 
            We'll handle the math for your Indian adventures while you handle the memories.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-2.5 lg:gap-3 mb-3 lg:mb-4">
            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-gray-50 shadow-sm">
              <div className="text-[#14D38E] mb-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Admin Control</h3>
              <p className="text-[10px] lg:text-xs text-gray-400 leading-snug">
                You decide who joins and how expenses are approved.
              </p>
            </div>

            <div className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-gray-50 shadow-sm">
              <div className="text-[#14D38E] mb-2">
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Smart Split</h3>
              <p className="text-[10px] lg:text-xs text-gray-400 leading-snug">
                Split by share, amount, or percentage effortlessly.
              </p>
            </div>
          </div>

          {/* Action Buttons - smaller on mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onContinue}
              className="cursor-pointer flex-1 lg:flex-none px-4 py-2.5 sm:px-8 lg:px-10 sm:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl bg-[#14D38E] text-[#1A1A1A] font-bold text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1 sm:gap-1.5 hover:bg-[#11B97C] transition-all hover:scale-95 active:scale-95"
            >
              Continue <span className="text-sm sm:text-base lg:text-lg">→</span>
            </button>

            <button
              type="button"
              onClick={onSkip}
              className="cursor-pointer flex-1 lg:flex-none px-4 py-2.5 sm:px-8 lg:px-10 sm:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl bg-[#EFF2F1] text-gray-700 font-bold text-xs sm:text-sm lg:text-base hover:bg-[#E5EAE8] transition-all hover:scale-95 active:scale-95"
            >
              Skip for now
            </button>
          </div>
        </div>
      </main>

      {/* ───────── FOOTER ───────── */}
      <footer className="w-full py-1.5 shrink-0 text-center">
        <p className="text-[10px] text-[#8B9E94]">
          © 2024 TripSplit India. Built for travelers, by travelers.
        </p>
      </footer>
    </div>
  );
};

export default OnboardingStepOne;