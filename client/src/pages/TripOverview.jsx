import React, { useState } from "react";

const TripOverview = ({
  onBack,
  onOpenExpenses,
  onOpenSettlements,
  onOpenChat,
  tripName = "Manali 2024",
  tripDates = "Oct 12 - Oct 20, 2024",
  location = "Himachal Pradesh, India",
  travelersCount = 5,
}) => {
  const [chartTab, setChartTab] = useState("daily");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-gray-100">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-600 mx-auto">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-semibold text-gray-800 mt-2 text-center">{tripName}</p>
        <p className="text-[10px] text-[#2ecc71] font-bold uppercase tracking-wider text-center">GROUP TRIP</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-auto bg-[#E8FBF4]/50">
        <button type="button" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#E8FBF4] text-[#2ecc71] text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Overview
        </button>
        <button type="button" onClick={onOpenExpenses} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white text-sm text-left">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
          </svg>
          Expenses
        </button>
        <button type="button" onClick={onOpenSettlements} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white text-sm text-left">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-5 6h6M5 17h14a2 2 0 002-2v-4l-2-4H9l-2 4v4a2 2 0 002 2z" />
          </svg>
          Settlements
        </button>
        <button type="button" onClick={onOpenChat} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white text-sm text-left">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Group Chat
        </button>
      </nav>
      <div className="p-3 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 text-sm">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Admin Panel
        </div>
      </div>
      <div className="p-3 bg-[#2ecc71] text-white rounded-lg mx-3 mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
        </div>
        <p className="text-xs leading-snug">Next settlement due in 2 days. All group members are active.</p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#F0F2F5] flex w-full max-w-full overflow-x-hidden">
      {/* Mobile sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} aria-hidden />
      )}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] max-w-[85vw] bg-white flex flex-col shadow-xl transition-transform duration-200 ease-out md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0)" }}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <span className="font-bold text-[#2ecc71]">Menu</span>
          <button type="button" onClick={() => setMobileSidebarOpen(false)} className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Close menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto">{sidebarContent}</div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="w-56 lg:w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 hidden md:flex">
        {sidebarContent}
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <header
          className="h-14 min-h-[3.5rem] bg-white border-b border-gray-100 px-3 sm:px-6 flex items-center justify-between shrink-0"
          style={{ paddingTop: "env(safe-area-inset-top, 0)" }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <button type="button" onClick={onBack} className="min-w-[44px] min-h-[44px] p-2 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center md:hidden" aria-label="Back">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button type="button" onClick={() => setMobileSidebarOpen(true)} className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center justify-center md:hidden" aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l-9 18h5l4-8 4 8h5L12 3z" />
              </svg>
              <span className="font-bold text-lg sm:text-xl text-[#2ecc71] truncate">TripSplit.in</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <span className="text-[#2ecc71] font-medium border-b-2 border-[#2ecc71] pb-0.5">Overview</span>
            <button type="button" onClick={onOpenExpenses} className="text-gray-500 hover:text-gray-800">Expenses</button>
            <button type="button" onClick={onOpenSettlements} className="text-gray-500 hover:text-gray-800">Settlements</button>
            <button type="button" onClick={onOpenChat} className="text-gray-500 hover:text-gray-800">Chat</button>
          </nav>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button type="button" className="hidden sm:flex min-h-[44px] px-4 py-2 rounded-lg bg-[#2ecc71] text-white text-sm font-semibold hover:bg-[#27ae60]">
              Share Trip
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Trip Overview</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {tripDates}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {travelersCount} Travelers
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {location}
            </span>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Budget Used</p>
                <p className="text-2xl font-bold text-gray-900">₹32,450</p>
                <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2ecc71] rounded-full" style={{ width: "65%" }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">65% of ₹50k · ₹17,550 left</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2v-6a2 2 0 00-2-2H9m-6 0a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2z" /></svg>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Days Remaining</p>
                <p className="text-2xl font-bold text-orange-500">4 out of 8 days</p>
                <p className="text-sm text-gray-600 mt-0.5">Halfway through the trip!</p>
                <div className="flex gap-0.5 mt-2">
                  {[1,2,3,4,5,6,7,8].map((i) => (
                    <div key={i} className={`w-2 h-2 rounded-sm ${i <= 4 ? "bg-[#2ecc71]" : "bg-gray-200"}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Top Category</p>
                <p className="text-lg font-bold text-gray-900">Food & Dining</p>
                <p className="text-sm text-gray-600">₹14,200 (43%)</p>
                <button type="button" className="text-sm text-[#2ecc71] font-medium mt-1 hover:underline">View Breakdown →</button>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
            </div>
          </div>

          {/* Spending Trend */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Spending Trend</h2>
            <div className="flex gap-4 mb-4">
              <button type="button" onClick={() => setChartTab("daily")} className={`text-sm font-medium pb-1 border-b-2 ${chartTab === "daily" ? "text-[#2ecc71] border-[#2ecc71]" : "text-gray-400 border-transparent"}`}>Daily</button>
              <button type="button" onClick={() => setChartTab("cumulative")} className={`text-sm font-medium pb-1 border-b-2 ${chartTab === "cumulative" ? "text-[#2ecc71] border-[#2ecc71]" : "text-gray-400 border-transparent"}`}>Cumulative</button>
            </div>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
              <div className="text-center text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <p className="text-sm">Chart placeholder</p>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
              <span>Oct 12</span><span>Oct 14</span><span>Oct 16</span><span>Oct 18</span><span>Today</span>
            </div>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                <button type="button" className="text-sm text-[#2ecc71] font-medium hover:underline">See all</button>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">Rahul added ₹1,850 for Dinner</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E8FBF4] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-5 6h6M5 17h14a2 2 0 002-2v-4l-2-4H9l-2 4v4a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">Priya settled ₹2,400 to Amit</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Upcoming Payments</h2>
                <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">2 PENDING</span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Pay Priya</p>
                    <p className="text-xs text-gray-600">Cabin Booking Share</p>
                    <button type="button" className="text-sm text-[#2ecc71] font-medium mt-0.5 hover:underline">Pay Now</button>
                  </div>
                  <span className="text-lg font-bold text-orange-500 shrink-0">₹4,500</span>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Pay Rahul</p>
                    <button type="button" className="text-sm text-[#2ecc71] font-medium mt-0.5 hover:underline">Pay Now</button>
                  </div>
                  <span className="text-lg font-bold text-orange-500 shrink-0">₹850</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TripOverview;
