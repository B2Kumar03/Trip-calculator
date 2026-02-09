import React, { useState } from "react";

const TripExpenses = ({
  onBack,
  onOpenOverview,
  onOpenSettlements,
  onOpenChat,
  onAddExpense,
  tripName = "Manali 2024",
}) => {
  const [quickMessage, setQuickMessage] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [memberFilter, setMemberFilter] = useState("All Members");

  const expenses = [
    { id: 1, title: "Dinner at Old Manali Cafe", category: "Dinner", categoryIcon: "fork", categoryColor: "bg-orange-400", date: "12 Oct 2024", time: "08:30 PM", paidBy: "Rahul", paidByAvatar: "R", splitCount: 5, amount: "₹2,450", splitMethod: "Equally" },
    { id: 2, title: "Taxi to Solang Valley", category: "Taxi", categoryIcon: "car", categoryColor: "bg-blue-500", date: "13 Oct 2024", time: "09:15 AM", paidBy: "You", paidByAvatar: "Y", splitCount: 5, amount: "₹1,800", splitMethod: "Equally" },
    { id: 3, title: "Homestay - 2 nights", category: "Stay", categoryIcon: "bed", categoryColor: "bg-violet-500", date: "12 Oct 2024", time: "02:00 PM", paidBy: "Priya", paidByAvatar: "P", splitCount: 5, amount: "₹12,000", splitMethod: "Custom" },
    { id: 4, title: "Souvenirs at Mall Road", category: "Souvenirs", categoryIcon: "bag", categoryColor: "bg-emerald-500", date: "14 Oct 2024", time: "06:00 PM", paidBy: "Amit", paidByAvatar: "A", splitCount: 3, amount: "₹3,200", splitMethod: "Equally" },
  ];

  const CategoryIcon = ({ icon, className }) => {
    if (icon === "fork") return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    if (icon === "car") return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-5 6h6M5 17h14a2 2 0 002-2v-4l-2-4H9l-2 4v4a2 2 0 002 2z" /></svg>;
    if (icon === "bed") return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
    if (icon === "bag") return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
    return null;
  };

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-gray-100">
        <div className="rounded-xl overflow-hidden h-20 bg-slate-600">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" alt="" className="w-full h-full object-cover" />
        </div>
        <p className="font-semibold text-gray-800 mt-2">{tripName}</p>
        <p className="text-xs text-[#2ecc71] font-medium">ACTIVE TRIP</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-auto">
        <button type="button" onClick={onOpenOverview} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm text-left">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Overview
        </button>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#E8FBF4] text-[#2ecc71] text-sm font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          Expenses
        </div>
        <button type="button" onClick={onOpenSettlements} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm text-left">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2v-6a2 2 0 00-2-2H9m-6 0a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2z" /></svg>
          Settlements
        </button>
        <button type="button" onClick={onOpenChat} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 text-sm text-left">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Group Chat
        </button>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Admin Controls
        </div>
      </nav>
      <div className="p-3 border-t border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71]" /> Quick Chat
        </p>
        <p className="text-xs text-gray-600 mb-2">Rahul Just paid for the dinner! Uploaded the bill.</p>
        <div className="flex gap-2">
          <input type="text" value={quickMessage} onChange={(e) => setQuickMessage(e.target.value)} placeholder="Type a message..." className="flex-1 min-w-0 text-xs py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2ecc71] focus:border-[#2ecc71]" />
          <button type="button" className="p-2 rounded-lg bg-[#2ecc71] text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#F0F2F5] flex w-full max-w-full overflow-x-hidden">
      {mobileSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} aria-hidden />}
      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] max-w-[85vw] bg-white border-r border-gray-100 flex flex-col shadow-xl transition-transform duration-200 ease-out md:hidden ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`} style={{ paddingTop: "env(safe-area-inset-top, 0)" }}>
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <span className="font-bold text-[#2ecc71]">Menu</span>
          <button type="button" onClick={() => setMobileSidebarOpen(false)} className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Close menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto">{sidebarContent}</div>
      </aside>
      <aside className="w-56 lg:w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 hidden md:flex">{sidebarContent}</aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <header className="h-14 min-h-[3.5rem] bg-white border-b border-gray-100 px-3 sm:px-6 flex items-center justify-between shrink-0" style={{ paddingTop: "env(safe-area-inset-top, 0)" }}>
          <div className="flex items-center gap-2 min-w-0">
            <button type="button" onClick={onBack} className="min-w-[44px] min-h-[44px] p-2 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center md:hidden" aria-label="Back">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button type="button" onClick={() => setMobileSidebarOpen(true)} className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-600 hover:bg-gray-100 flex items-center justify-center md:hidden" aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l-9 18h5l4-8 4 8h5L12 3z" /></svg>
              <span className="font-bold text-lg sm:text-xl text-[#2ecc71] truncate">TripSplit.in</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button type="button" onClick={onOpenOverview} className="text-gray-500 hover:text-gray-800">Dashboard</button>
            <span className="text-[#2ecc71] font-medium border-b-2 border-[#2ecc71] pb-0.5">Expenses</span>
            <button type="button" onClick={onOpenSettlements} className="text-gray-500 hover:text-gray-800">Settlements</button>
            <button type="button" onClick={onOpenChat} className="text-gray-500 hover:text-gray-800">Chat</button>
          </nav>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Trip Expenses</h1>
              <p className="text-gray-600 mt-0.5">Manage and track every rupee spent on the road</p>
            </div>
            <button type="button" onClick={onAddExpense} className="flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#2ecc71] text-white font-semibold hover:bg-[#27ae60] shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Add Expense
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search expenses..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2ecc71] focus:border-[#2ecc71] text-sm" />
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2ecc71]">
                <option>All Categories</option>
              </select>
              <select value={memberFilter} onChange={(e) => setMemberFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2ecc71]">
                <option>All Members</option>
              </select>
              <input type="text" placeholder="mm/dd/yyyy" className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm w-32 focus:outline-none focus:ring-1 focus:ring-[#2ecc71]" />
            </div>
          </div>

          <div className="space-y-3">
            {expenses.map((e) => (
              <div key={e.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex gap-3 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${e.categoryColor} text-white`}>
                    <CategoryIcon icon={e.categoryIcon} className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900">{e.title}</p>
                    <p className="text-xs text-gray-500">{e.date} • {e.time}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PAID BY</p>
                    <p className="text-gray-800 font-medium">{e.paidBy}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SPLIT BETWEEN</p>
                    <div className="flex -space-x-2 mt-0.5">
                      {[1,2,3].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px] font-medium text-gray-600">+</div>
                      ))}
                      <span className="ml-1 text-xs text-gray-500">+2</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-3 lg:w-48">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{e.amount}</p>
                    <p className={`text-xs font-medium ${e.splitMethod === "Equally" ? "text-[#2ecc71]" : "text-orange-500"}`}>{e.splitMethod}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-2 rounded-lg text-blue-500 hover:bg-blue-50" aria-label="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button type="button" className="p-2 rounded-lg text-red-500 hover:bg-red-50" aria-label="Delete">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-4">Showing 4 of 28 expenses.</p>
          <button type="button" className="mt-3 min-h-[44px] px-5 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50">
            Load More Expenses
          </button>
        </main>
      </div>
    </div>
  );
};

export default TripExpenses;
