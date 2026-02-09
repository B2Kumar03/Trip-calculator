import React, { useState, useEffect } from "react";

const TripView = ({
  onBack,
  onOpenChat,
  onAddExpense,
  onOpenProfile,
  onOpenDashboard,
  onOpenAdminControls,
  onNavigateToSection,
  tripName = "Manali 2024",
  tripDates = "Oct 12 - Oct 20, 2024",
  location = "Himachal Pradesh, India",
  travelersCount = 5,
  initialSection = "overview",
}) => {
  const [section, setSection] = useState(initialSection);

  useEffect(() => {
    setSection(initialSection);
  }, [initialSection]);

  const goToSection = (s) => {
    if (onNavigateToSection) onNavigateToSection(s);
    else setSection(s);
  };
  const [chartTab, setChartTab] = useState("daily");
  const [quickMessage, setQuickMessage] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [memberFilter, setMemberFilter] = useState("All Members");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedUPI, setSelectedUPI] = useState("googlepay");
  const [newUPIId, setNewUPIId] = useState("");

  const pendingSettlements = [
    { from: "You", to: "Priya", amount: "₹1,250", action: "pay", toInitials: "PR" },
    { from: "Amit", to: "You", amount: "₹500", action: "awaiting", toInitials: "A" },
    { from: "Rahul", to: "Amit", amount: "₹2,100", action: "notify", toInitials: "R" },
  ];
  const participants = [
    { name: "You (Admin)", spent: "₹6,710", balance: "-₹2,450", positive: false, settled: false },
    { name: "Priya", spent: "₹13,400", balance: "+₹4,240", positive: true, settled: false },
    { name: "Rahul", spent: "₹4,200", balance: "-₹4,960", positive: false, settled: false },
    { name: "Amit", spent: "₹12,800", balance: "+₹3,640", positive: true, settled: false },
    { name: "Sanya", spent: "₹8,690", balance: "₹0", positive: null, settled: true },
  ];

  const expenses = [
    { id: 1, title: "Dinner at Old Manali Cafe", categoryIcon: "fork", categoryColor: "bg-orange-400", date: "12 Oct 2024", time: "08:30 PM", paidBy: "Rahul", amount: "₹2,450", splitMethod: "Equally" },
    { id: 2, title: "Taxi to Solang Valley", categoryIcon: "car", categoryColor: "bg-blue-500", date: "13 Oct 2024", time: "09:15 AM", paidBy: "You", amount: "₹1,800", splitMethod: "Equally" },
    { id: 3, title: "Homestay - 2 nights", categoryIcon: "bed", categoryColor: "bg-violet-500", date: "12 Oct 2024", time: "02:00 PM", paidBy: "Priya", amount: "₹12,000", splitMethod: "Custom" },
    { id: 4, title: "Souvenirs at Mall Road", categoryIcon: "bag", categoryColor: "bg-emerald-500", date: "14 Oct 2024", time: "06:00 PM", paidBy: "Amit", amount: "₹3,200", splitMethod: "Equally" },
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
      <div className="p-4 border-b border-gray-100 shrink-0">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-600 mx-auto">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200" alt="" className="w-full h-full object-cover" />
        </div>
        <p className="font-semibold text-gray-800 mt-2 text-center">{tripName}</p>
        <p className="text-[10px] text-[#2ecc71] font-bold uppercase tracking-wider text-center">GROUP TRIP</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-auto min-h-0 bg-[#E8FBF4]/50">
        <button type="button" onClick={() => { goToSection("overview"); setMobileSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left ${section === "overview" ? "bg-[#E8FBF4] text-[#2ecc71] font-medium" : "text-gray-600 hover:bg-white"}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          Overview
        </button>
        <button type="button" onClick={() => { goToSection("expenses"); setMobileSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left ${section === "expenses" ? "bg-[#E8FBF4] text-[#2ecc71] font-medium" : "text-gray-600 hover:bg-white"}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" /></svg>
          Expenses
        </button>
        <button type="button" onClick={() => { goToSection("settlements"); setMobileSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left ${section === "settlements" ? "bg-[#E8FBF4] text-[#2ecc71] font-medium" : "text-gray-600 hover:bg-white"}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-5 6h6M5 17h14a2 2 0 002-2v-4l-2-4H9l-2 4v4a2 2 0 002 2z" /></svg>
          Settlements
        </button>
        <button type="button" onClick={() => { onOpenChat(); setMobileSidebarOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-white text-sm text-left">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Group Chat
        </button>
      </nav>
      <div className="p-3 border-t border-gray-100 bg-white shrink-0">
        <button
          type="button"
          onClick={() => { onOpenAdminControls?.(); setMobileSidebarOpen(false); }}
          className="w-full flex items-center gap-2 px-2 py-1.5 text-gray-600 text-sm hover:bg-gray-50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          Admin Panel
        </button>
      </div>
      <div className="p-3 bg-[#2ecc71] text-white rounded-lg mx-3 mb-3 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
        </div>
        <p className="text-xs leading-snug">Next settlement due in 2 days. All group members are active.</p>
      </div>
      <div className="p-3 border-t border-gray-100 shrink-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71]" /> Quick Chat
        </p>
        <p className="text-xs text-gray-600 mb-2">Rahul Just paid for the dinner! Uploaded the bill.</p>
        <div className="flex gap-2">
          <input type="text" value={quickMessage} onChange={(e) => setQuickMessage(e.target.value)} placeholder="Type a message..." className="flex-1 min-w-0 text-xs py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#2ecc71] focus:border-[#2ecc71]" />
          <button type="button" className="p-2 rounded-lg bg-[#2ecc71] text-white shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="h-screen min-h-[100dvh] flex overflow-hidden bg-[#F0F2F5] w-full max-w-full">
      {mobileSidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} aria-hidden />}
      {/* Mobile drawer - full height */}
      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-[280px] max-w-[85vw] bg-white flex flex-col h-full shadow-xl transition-transform duration-200 ease-out md:hidden ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`} style={{ paddingTop: "env(safe-area-inset-top, 0)", maxHeight: "100dvh" }}>
        <div className="flex items-center justify-between p-3 border-b border-gray-100 shrink-0">
          <span className="font-bold text-[#2ecc71]">Menu</span>
          <button type="button" onClick={() => setMobileSidebarOpen(false)} className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Close menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-auto min-h-0">{sidebarContent}</div>
      </aside>
      {/* Desktop sidebar - full height */}
      <aside className="w-56 lg:w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 h-full hidden md:flex">
        {sidebarContent}
      </aside>

      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
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
            <button type="button" onClick={() => goToSection("overview")} className={section === "overview" ? "text-[#2ecc71] font-medium border-b-2 border-[#2ecc71] pb-0.5" : "text-gray-500 hover:text-gray-800"}>Overview</button>
            <button type="button" onClick={() => goToSection("expenses")} className={section === "expenses" ? "text-[#2ecc71] font-medium border-b-2 border-[#2ecc71] pb-0.5" : "text-gray-500 hover:text-gray-800"}>Expenses</button>
            <button type="button" onClick={() => goToSection("settlements")} className={section === "settlements" ? "text-[#2ecc71] font-medium border-b-2 border-[#2ecc71] pb-0.5" : "text-gray-500 hover:text-gray-800"}>Settlements</button>
            <button type="button" onClick={onOpenChat} className="text-gray-500 hover:text-gray-800">Chat</button>
          </nav>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button type="button" className="hidden sm:flex min-h-[44px] px-4 py-2 rounded-lg bg-[#2ecc71] text-white text-sm font-semibold hover:bg-[#27ae60]">Share Trip</button>
            <button type="button" onClick={onOpenProfile} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 min-h-0 pb-[env(safe-area-inset-bottom,1rem)]">
          {section === "overview" && (
            <>
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
                      {[1,2,3,4,5,6,7,8].map((i) => <div key={i} className={`w-2 h-2 rounded-sm ${i <= 4 ? "bg-[#2ecc71]" : "bg-gray-200"}`} />)}
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
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Spending Trend</h2>
                <div className="flex gap-4 mb-4">
                  <button type="button" onClick={() => setChartTab("daily")} className={`text-sm font-medium pb-1 border-b-2 ${chartTab === "daily" ? "text-[#2ecc71] border-[#2ecc71]" : "text-gray-400 border-transparent"}`}>Daily</button>
                  <button type="button" onClick={() => setChartTab("cumulative")} className={`text-sm font-medium pb-1 border-b-2 ${chartTab === "cumulative" ? "text-[#2ecc71] border-[#2ecc71]" : "text-gray-400 border-transparent"}`}>Cumulative</button>
                </div>
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                  <div className="text-center text-gray-400">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                    <p className="text-sm">Chart placeholder</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2 px-1"><span>Oct 12</span><span>Oct 14</span><span>Oct 16</span><span>Oct 18</span><span>Today</span></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                    <button type="button" className="text-sm text-[#2ecc71] font-medium hover:underline">See all</button>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0"><svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                      <div className="min-w-0"><p className="text-sm font-medium text-gray-900">Rahul added ₹1,850 for Dinner</p><p className="text-xs text-gray-500">2 hours ago</p></div>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E8FBF4] flex items-center justify-center shrink-0"><svg className="w-5 h-5 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-5 6h6M5 17h14a2 2 0 002-2v-4l-2-4H9l-2 4v4a2 2 0 002 2z" /></svg></div>
                      <div className="min-w-0"><p className="text-sm font-medium text-gray-900">Priya settled ₹2,400 to Amit</p><p className="text-xs text-gray-500">5 hours ago</p></div>
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
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900">Pay Priya</p><p className="text-xs text-gray-600">Cabin Booking Share</p><button type="button" onClick={() => { setSelectedPayment({ from: "You", to: "Priya", amount: "₹4,500", toInitials: "PR" }); setPaymentModalOpen(true); }} className="text-sm text-[#2ecc71] font-medium mt-0.5 hover:underline">Pay Now</button></div>
                      <span className="text-lg font-bold text-orange-500 shrink-0">₹4,500</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0" />
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900">Pay Rahul</p><button type="button" onClick={() => { setSelectedPayment({ from: "You", to: "Rahul", amount: "₹850", toInitials: "R" }); setPaymentModalOpen(true); }} className="text-sm text-[#2ecc71] font-medium mt-0.5 hover:underline">Pay Now</button></div>
                      <span className="text-lg font-bold text-orange-500 shrink-0">₹850</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
          {section === "expenses" && (
            <>
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
                  <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2ecc71]"><option>All Categories</option></select>
                  <select value={memberFilter} onChange={(e) => setMemberFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-[#2ecc71]"><option>All Members</option></select>
                  <input type="text" placeholder="mm/dd/yyyy" className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm w-32 focus:outline-none focus:ring-1 focus:ring-[#2ecc71]" />
                </div>
              </div>
              <div className="space-y-3">
                {expenses.map((e) => (
                  <div key={e.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex gap-3 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${e.categoryColor} text-white`}><CategoryIcon icon={e.categoryIcon} className="w-6 h-6" /></div>
                      <div className="min-w-0"><p className="font-medium text-gray-900">{e.title}</p><p className="text-xs text-gray-500">{e.date} • {e.time}</p></div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PAID BY</p><p className="text-gray-800 font-medium">{e.paidBy}</p></div>
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SPLIT BETWEEN</p><div className="flex -space-x-2 mt-0.5">{[1,2,3].map((i) => <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px] font-medium text-gray-600">+</div>)}<span className="ml-1 text-xs text-gray-500">+2</span></div></div>
                    </div>
                    <div className="flex items-center justify-between lg:justify-end gap-3 lg:w-48">
                      <div className="text-right"><p className="text-lg font-bold text-gray-900">{e.amount}</p><p className={`text-xs font-medium ${e.splitMethod === "Equally" ? "text-[#2ecc71]" : "text-orange-500"}`}>{e.splitMethod}</p></div>
                      <div className="flex items-center gap-1">
                        <button type="button" className="p-2 rounded-lg text-blue-500 hover:bg-blue-50" aria-label="Edit"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                        <button type="button" className="p-2 rounded-lg text-red-500 hover:bg-red-50" aria-label="Delete"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">Showing 4 of 28 expenses.</p>
              <button type="button" className="mt-3 min-h-[44px] px-5 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50">Load More Expenses</button>
            </>
          )}
          {section === "settlements" && (
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Settlement & Balances</h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Clear your debts and finalize the trip expenses</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button type="button" onClick={onOpenDashboard} className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 w-full sm:w-auto">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    Dashboard
                  </button>
                  <button type="button" className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white text-sm font-semibold hover:bg-[#27ae60] w-full sm:w-auto">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Mark All Settled
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm min-w-0">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Trip Cost</p>
                  <p className="text-base sm:text-xl font-bold text-gray-800 truncate">₹45,800</p>
                  <p className="text-xs text-[#2ecc71] flex items-center gap-1 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
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
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
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
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 sm:gap-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-w-0">
                  <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between gap-2">
                    <h2 className="font-bold text-gray-800 text-sm sm:text-base">Pending Settlements</h2>
                    <button type="button" className="min-h-[44px] min-w-[44px] flex items-center justify-center sm:min-w-0 text-sm text-[#2ecc71] font-medium hover:underline py-2">View History</button>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {pendingSettlements.map((s, i) => (
                      <li key={i} className="p-3 sm:p-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="flex items-center -space-x-2 shrink-0">
                            <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">{s.from === "You" ? "A" : s.from[0]}</div>
                            <div className="w-6 h-6 rounded-full bg-[#2ecc71] flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">{s.to === "You" ? "A" : s.to[0]}</div>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-600 truncate">{s.from} owes {s.to}</p>
                            <p className="text-base sm:text-lg font-bold text-gray-800">{s.amount}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          {s.action === "pay" && <button type="button" onClick={() => { setSelectedPayment(s); setPaymentModalOpen(true); }} className="min-h-[44px] px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white text-sm font-semibold hover:bg-[#27ae60] w-full sm:w-auto">Pay Now</button>}
                          {s.action === "awaiting" && <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-500 text-xs font-medium inline-block">AWAITING CONFIRMATION</span>}
                          {s.action === "notify" && <button type="button" className="min-h-[44px] px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white text-sm font-semibold hover:bg-[#27ae60] w-full sm:w-auto">Notify Rahul</button>}
                          <button type="button" className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-400 hover:bg-gray-100 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-w-0">
                  <div className="p-3 sm:p-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-800 text-sm sm:text-base">Participant Balances</h2>
                  </div>
                  <ul className="divide-y divide-gray-100 p-3 sm:p-4 space-y-0">
                    {participants.map((p, i) => (
                      <li key={i} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 shrink-0">{p.name.startsWith("You") ? "A" : p.name.split(" ")[0][0]}</div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 text-sm truncate">{p.name}</p>
                            <p className="text-xs text-gray-500">Spent {p.spent}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          {p.settled ? (<><p className="font-semibold text-gray-800 text-sm">₹0</p><p className="text-[10px] text-gray-400 font-medium">SETTLED</p></>) : (<p className={`font-bold text-sm sm:text-base ${p.positive === true ? "text-[#2ecc71]" : p.positive === false ? "text-red-500" : "text-gray-800"}`}>{p.balance}</p>)}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 sm:p-4 border-t border-gray-100">
                    <button type="button" className="w-full min-h-[44px] py-2.5 rounded-lg border-2 border-dashed border-gray-200 text-gray-500 text-sm font-medium hover:border-[#2ecc71] hover:text-[#2ecc71] transition-colors">+ Add or Remove Participants</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Payment Confirmation Modal */}
      {paymentModalOpen && selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setPaymentModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">CONFIRM PAYMENT</h2>
              <button type="button" onClick={() => setPaymentModalOpen(false)} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">A</div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">{selectedPayment.toInitials}</div>
              </div>
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-1">Paying {selectedPayment.to}</p>
                <p className="text-3xl font-bold text-gray-900">{selectedPayment.amount}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">SELECT UPI APP</h3>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${selectedUPI === "googlepay" ? "border-[#2ecc71] bg-[#E8FBF4]" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="upi" value="googlepay" checked={selectedUPI === "googlepay"} onChange={(e) => setSelectedUPI(e.target.value)} className="w-5 h-5 text-[#2ecc71] focus:ring-[#2ecc71]" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Google Pay</p>
                      <p className="text-sm text-gray-500">priya@okaxis</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${selectedUPI === "phonepe" ? "border-[#2ecc71] bg-[#E8FBF4]" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="upi" value="phonepe" checked={selectedUPI === "phonepe"} onChange={(e) => setSelectedUPI(e.target.value)} className="w-5 h-5 text-[#2ecc71] focus:ring-[#2ecc71]" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">PhonePe</p>
                      <p className="text-sm text-gray-500">9876543210gbl</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${selectedUPI === "paytm" ? "border-[#2ecc71] bg-[#E8FBF4]" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="upi" value="paytm" checked={selectedUPI === "paytm"} onChange={(e) => setSelectedUPI(e.target.value)} className="w-5 h-5 text-[#2ecc71] focus:ring-[#2ecc71]" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Paytm</p>
                      <p className="text-sm text-gray-500">priya.trip@paytm</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${selectedUPI === "new" ? "border-[#2ecc71] bg-[#E8FBF4]" : "border-gray-200 hover:border-gray-300"}`}>
                    <input type="radio" name="upi" value="new" checked={selectedUPI === "new"} onChange={(e) => setSelectedUPI(e.target.value)} className="w-5 h-5 text-[#2ecc71] focus:ring-[#2ecc71]" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Add New UPI ID
                      </p>
                    </div>
                  </label>
                  {selectedUPI === "new" && (
                    <input type="text" value={newUPIId} onChange={(e) => setNewUPIId(e.target.value)} placeholder="Enter UPI ID" className="w-full mt-2 px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]" />
                  )}
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <button type="button" onClick={() => { setPaymentModalOpen(false); setScannerModalOpen(true); }} className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                  Scanner
                </button>
                <button type="button" onClick={() => { setPaymentModalOpen(false); alert(`Payment of ${selectedPayment.amount} to ${selectedPayment.to} confirmed!`); }} className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white font-semibold hover:bg-[#27ae60]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Confirm & Pay {selectedPayment.amount}
                </button>
              </div>
              <p className="text-xs text-center text-gray-500">SECURED BY NPCI UPI GATEWAY</p>
            </div>
          </div>
        </div>
      )}

      {/* Scanner Modal */}
      {scannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setScannerModalOpen(false)}>
          <div className="bg-black rounded-2xl shadow-2xl max-w-md w-full aspect-square relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setScannerModalOpen(false)} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-white rounded-lg relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#2ecc71] rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#2ecc71] rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#2ecc71] rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#2ecc71] rounded-br-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-[#2ecc71]/20 to-transparent rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-center text-sm mb-2">Position QR code within the frame</p>
              <button type="button" onClick={() => { setScannerModalOpen(false); setPaymentModalOpen(true); }} className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100">
                Cancel
              </button>
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-1/3 left-0 bottom-1/3 w-1/4 bg-gradient-to-r from-black/50 to-transparent"></div>
              <div className="absolute top-1/3 right-0 bottom-1/3 w-1/4 bg-gradient-to-l from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripView;
