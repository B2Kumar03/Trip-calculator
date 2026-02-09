import React, { useState } from "react";

const Dashboard = ({ onSignOut, onViewTripDetails, onViewProfile, onOpenNotifications, onOpenCreateTrip, onOpenTripSettings, onOpenAdminControls }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen min-h-screen bg-[#F6F8F7] flex font-sans overflow-hidden">
      {/* Mobile overlay – tap to close sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          aria-hidden
        />
      )}
      {/* ───────── LEFT SIDEBAR (drawer on mobile, fixed on lg) ───────── */}
      <aside
        className={`
          w-64 shrink-0 h-full min-h-screen bg-white border-r border-gray-100 flex flex-col
          fixed lg:relative inset-y-0 left-0 z-50
          transform transition-transform duration-200 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <button
          type="button"
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button type="button" onClick={onViewProfile} className="w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#14D38E] flex items-center justify-center text-white font-bold text-lg shrink-0">
              AM
            </div>
            <div>
              <p className="font-bold text-gray-800">Arjun Mehta</p>
              <p className="text-xs text-[#14D38E] font-medium">Premium Member</p>
            </div>
          </div>
        </button>

        <nav className="flex-1 py-4 px-3" onClick={() => setSidebarOpen(false)}>
          <a
            href="#dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#E8FBF4] text-[#0D9668] font-semibold mb-1"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1-1h-2a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6z" />
            </svg>
            Dashboard
          </a>
          <button type="button" onClick={() => onOpenAdminControls?.({ tripName: "Rajasthan Expedition", tripDates: "12 Oct – 20 Oct 2024", location: "Rajasthan, India" })} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium mb-1 text-left">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Admin Controls
          </button>
          <a href="#chat" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat
          </a>
          <button type="button" onClick={onViewProfile} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium mb-1 text-left">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </button>
          <a href="#settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
        </nav>

        <div className="p-3 border-t border-gray-100" onClick={() => setSidebarOpen(false)}>
          <button type="button" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#14D38E] text-white font-bold hover:bg-[#11B97C] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v14M5 12h14" />
            </svg>
            Create New Trip
          </button>
        </div>
      </aside>

      {/* ───────── MAIN AREA ───────── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Top Header */}
        <header className="h-14 sm:h-16 shrink-0 bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            className="lg:hidden p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#14D38E] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-[#0D9668]">TripExpense</span>
          </div>

          <div className="flex-1 min-w-0 max-w-xl hidden sm:block">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search trips, members, or expenses..."
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14D38E] focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <button type="button" onClick={onOpenNotifications} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative" aria-label="Notifications">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <button type="button" className="px-3 sm:px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium text-xs sm:text-sm hover:bg-gray-50">
              IND (₹)
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto overflow-x-hidden p-4 sm:p-6 pb-24 sm:pb-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm relative">
              <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-xs font-semibold text-green-500 flex items-center gap-0.5">
                +12% <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500 flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Total Paid</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">₹45,000</p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">You Owe</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">₹2,500</p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#14D38E] flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">You Will Get</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">₹8,700</p>
            </div>
          </div>

          {/* Active Trips */}
          <div className="mb-6">
            <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-bold text-gray-800">Active Trips</h2>
              <a href="#all" className="text-sm font-semibold text-[#14D38E] hover:underline shrink-0">See All</a>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Trip Card 1 - Rajasthan Expedition */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-32 sm:h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                  Map placeholder – Rajasthan
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1">Rajasthan Expedition</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">Oct 12–Oct 20, 2024 • 4 Participants</p>
                  <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                        <div className="h-full w-[65%] bg-[#14D38E] rounded-full" />
                      </div>
                      <p className="text-xs text-gray-500">
                        Spent: <span className="font-semibold text-gray-700">₹32,400</span>
                        <span className="ml-2">Budget: ₹50,000</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                      <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white" />
                      <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white" />
                      <span className="text-xs font-medium text-gray-500 ml-1">+1</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#0D9668] bg-[#E8FBF4] px-2 py-1 rounded">ADMIN</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenTripSettings?.({ tripName: "Rajasthan Expedition", tripDates: "12 Oct – 20 Oct 2024", location: "Rajasthan, India", startDate: "Oct 12, 2024", endDate: "Oct 20, 2024", budget: "50000" })}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                        aria-label="Edit trip"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button
                        type="button"
                        className="px-5 py-2.5 rounded-full bg-[#E8FBF4] text-[#0D9668] text-sm font-semibold shadow-sm hover:bg-[#D4F5E9] transition-colors"
                        onClick={() => onViewTripDetails?.({ tripName: "Rajasthan Expedition", tripDates: "12 Oct – 20 Oct 2024", location: "Rajasthan, India" })}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Card 2 - Kerala (partial) */}
              <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-32 sm:h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  Map placeholder – Kerala / Munnar
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1">Kerala Getaway</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">Nov 1–Nov 8, 2024 • 3 Participants</p>
                  <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                        <div className="h-full w-[40%] bg-[#14D38E] rounded-full" />
                      </div>
                      <p className="text-xs text-gray-500">
                        Spent: <span className="font-semibold text-gray-700">₹20,000</span>
                        <span className="ml-2">Budget: ₹50,000</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                      <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-[#0D9668] bg-[#E8FBF4] px-2 py-1 rounded">ADMIN</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenTripSettings?.({ tripName: "Kerala Getaway", tripDates: "1 Nov – 8 Nov 2024", location: "Kerala, India", startDate: "Nov 1, 2024", endDate: "Nov 8, 2024", budget: "50000" })}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                        aria-label="Edit trip"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button
                        type="button"
                        className="px-5 py-2.5 rounded-full bg-[#E8FBF4] text-[#0D9668] text-sm font-semibold shadow-sm hover:bg-[#D4F5E9] transition-colors"
                        onClick={() => onViewTripDetails?.({ tripName: "Kerala Getaway", tripDates: "1 Nov – 8 Nov 2024", location: "Kerala, India" })}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ───────── FLOATING ACTION BUTTONS (bottom-right, safe on mobile) ───────── */}
      <div className="fixed flex flex-col items-center gap-2 sm:gap-3 z-50 right-4 sm:right-6 bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:bottom-6">
        {/* Chat FAB */}
        <button
          type="button"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#14D38E] hover:bg-gray-50 transition-colors touch-manipulation"
          aria-label="Chat"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] sm:min-w-[22px] sm:h-[22px] rounded-full bg-orange-500 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center px-1 sm:px-1.5">
            3
          </span>
        </button>
        {/* Create Trip FAB – light green circle, white + */}
        <button
          type="button"
          onClick={onOpenCreateTrip}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#14D38E] shadow-lg flex items-center justify-center text-white hover:bg-[#11B97C] transition-colors touch-manipulation"
          aria-label="Create New Trip"
        >
          <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
