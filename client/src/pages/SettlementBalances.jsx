import React, { useState } from "react";

const SettlementBalances = ({ onBack, tripName = "Manali 2024" }) => {
  const [quickMessage, setQuickMessage] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingSettlements = [
    { from: "You", to: "Priya", amount: "₹1,250", action: "pay", fromYou: true },
    { from: "Amit", to: "You", amount: "₹500", action: "awaiting", fromYou: false },
    { from: "Rahul", to: "Amit", amount: "₹2,100", action: "notify", fromYou: false },
  ];

  const participants = [
    { name: "You (Admin)", spent: "₹6,710", balance: "-₹2,450", positive: false, settled: false },
    { name: "Priya", spent: "₹13,400", balance: "+₹4,240", positive: true, settled: false },
    { name: "Rahul", spent: "₹4,200", balance: "-₹4,960", positive: false, settled: false },
    { name: "Amit", spent: "₹12,800", balance: "+₹3,640", positive: true, settled: false },
    { name: "Sanya", spent: "₹8,690", balance: "₹0", positive: null, settled: true },
  ];

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-gray-100">
        <div className="rounded-xl overflow-hidden h-20 bg-slate-600">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-semibold text-gray-800 mt-2">{tripName}</p>
        <p className="text-xs text-[#2ecc71] font-medium">ACTIVE TRIP</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-auto">
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Overview
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
          </svg>
          Expenses
        </a>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#E8FBF4] text-[#2ecc71] text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2v-6a2 2 0 00-2-2H9m-6 0a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2z" />
          </svg>
          Settlements
        </div>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Group Chat
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Admin Controls
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Trip Settings
        </a>
      </nav>
      <div className="p-3 border-t border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71]" />
          Quick Chat
        </p>
        <p className="text-xs text-gray-600 mb-2">Rahul Just paid for the dinner! Uploaded the bill.</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={quickMessage}
            onChange={(e) => setQuickMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 min-w-0 text-xs py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
          />
          <button type="button" className="p-2 rounded-lg bg-[#2ecc71] text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#F0F2F5] flex w-full max-w-full overflow-x-hidden">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden
        />
      )}
      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] max-w-[85vw] bg-white border-r border-gray-100 flex flex-col shadow-xl transform transition-transform duration-200 ease-out md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0)" }}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-100 shrink-0">
          <span className="font-bold text-[#2ecc71]">Menu</span>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center touch-manipulation"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto">{sidebarContent}</div>
      </aside>
      {/* Desktop left sidebar */}
      <aside className="w-56 lg:w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 hidden md:flex">
        {sidebarContent}
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Top nav - touch-friendly, safe area on mobile */}
        <header
          className="h-14 min-h-[3.5rem] bg-white border-b border-gray-100 px-3 sm:px-4 flex items-center justify-between shrink-0"
          style={{ paddingTop: "env(safe-area-inset-top, 0)" }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <button type="button" onClick={onBack} className="min-w-[44px] min-h-[44px] p-2 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center touch-manipulation" aria-label="Back">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center justify-center touch-manipulation md:hidden"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2 md:flex">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l-9 18h5l4-8 4 8h5L12 3z" />
              </svg>
              <span className="font-bold text-lg sm:text-xl text-[#2ecc71] truncate">TripSplit.in</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-800">Dashboard</a>
            <span className="text-[#2ecc71] font-medium border-b-2 border-[#2ecc71] pb-0.5">Settlements</span>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2 ml-auto shrink-0">
            <button type="button" className="min-h-[44px] px-3 sm:px-4 py-2 rounded-lg bg-[#2ecc71] text-white text-xs sm:text-sm font-semibold hover:bg-[#27ae60] touch-manipulation">
              Close Trip
            </button>
            <button type="button" className="relative min-w-[44px] min-h-[44px] w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 touch-manipulation">
              <span className="text-sm font-medium">A</span>
              <svg className="w-3 h-3 absolute -bottom-0.5 -right-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main content - safe area bottom on mobile */}
        <main
          className="flex-1 overflow-auto overflow-x-hidden p-3 sm:p-6 pb-[env(safe-area-inset-bottom,1rem)]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Settlement & Balances</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Clear your debts and finalize the trip expenses</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white text-sm font-semibold hover:bg-[#27ae60] touch-manipulation w-full sm:w-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Mark All Settled
                </button>
              </div>
            </div>

            {/* Summary cards - 2x2 on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm min-w-0">
                <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Trip Cost</p>
                <p className="text-base sm:text-xl font-bold text-gray-800 truncate">₹45,800</p>
                <p className="text-xs text-[#2ecc71] flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  12% vs budget
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm min-w-0">
                <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Per Person Share</p>
                <p className="text-base sm:text-xl font-bold text-gray-800 truncate">₹9,160</p>
                <p className="text-xs text-gray-500 mt-1">Split equally (5 people)</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm min-w-0">
                <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Your Standing</p>
                <p className="text-base sm:text-xl font-bold text-orange-500 truncate">Owing ₹2,450</p>
                <p className="text-xs text-orange-500 flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  2 pending payments
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm min-w-0">
                <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Settlement Progress</p>
                <p className="text-base sm:text-xl font-bold text-gray-800">60%</p>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden mt-2">
                  <div className="h-full w-[60%] rounded-full bg-[#2ecc71]" />
                </div>
                <p className="text-xs text-gray-500 mt-1">3/5 settled</p>
              </div>
            </div>

            {/* Two columns - stack on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 sm:gap-6">
              {/* Pending Settlements */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-w-0">
                <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between gap-2">
                  <h2 className="font-bold text-gray-800 text-sm sm:text-base">Pending Settlements</h2>
                  <button type="button" className="min-h-[44px] min-w-[44px] flex items-center justify-center sm:min-w-0 text-sm text-[#2ecc71] font-medium hover:underline touch-manipulation py-2">View History</button>
                </div>
                <ul className="divide-y divide-gray-100">
                  {pendingSettlements.map((s, i) => (
                    <li key={i} className="p-3 sm:p-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="flex items-center -space-x-2 shrink-0">
                          <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                            {s.from === "You" ? "A" : s.from[0]}
                          </div>
                          <div className="w-6 h-6 rounded-full bg-[#2ecc71] flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                            {s.to === "You" ? "A" : s.to[0]}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-gray-600 truncate">{s.from} owes {s.to}</p>
                          <p className="text-base sm:text-lg font-bold text-gray-800">{s.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        {s.action === "pay" && (
                          <button type="button" className="min-h-[44px] px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white text-sm font-semibold hover:bg-[#27ae60] touch-manipulation w-full sm:w-auto">
                            Pay Now
                          </button>
                        )}
                        {s.action === "awaiting" && (
                          <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 text-xs font-medium inline-block">AWAITING CONFIRMATION</span>
                        )}
                        {s.action === "notify" && (
                          <button type="button" className="min-h-[44px] px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white text-sm font-semibold hover:bg-[#27ae60] touch-manipulation w-full sm:w-auto">
                            Notify Rahul
                          </button>
                        )}
                        <button type="button" className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-400 hover:bg-gray-100 flex items-center justify-center touch-manipulation">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Participant Balances */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-w-0">
                <div className="p-3 sm:p-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-800 text-sm sm:text-base">Participant Balances</h2>
                </div>
                <ul className="divide-y divide-gray-100 p-3 sm:p-4 space-y-0">
                  {participants.map((p, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 shrink-0">
                          {p.name.startsWith("You") ? "A" : p.name.split(" ")[0][0]}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 text-sm truncate">{p.name}</p>
                          <p className="text-xs text-gray-500">Spent {p.spent}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {p.settled ? (
                          <>
                            <p className="font-semibold text-gray-800 text-sm">₹0</p>
                            <p className="text-[10px] text-gray-400 font-medium">SETTLED</p>
                          </>
                        ) : (
                          <p className={`font-bold text-sm sm:text-base ${p.positive === true ? "text-[#2ecc71]" : p.positive === false ? "text-red-500" : "text-gray-800"}`}>
                            {p.balance}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-3 sm:p-4 border-t border-gray-100">
                  <button type="button" className="w-full min-h-[44px] py-2.5 rounded-lg border-2 border-dashed border-gray-200 text-gray-500 text-sm font-medium hover:border-[#2ecc71] hover:text-[#2ecc71] transition-colors touch-manipulation">
                    + Add or Remove Participants
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettlementBalances;
