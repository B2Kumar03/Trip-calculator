import React, { useState } from "react";

const TripChat = ({
  onBack,
  tripName = "Goa Trip 2024",
  tripDates,
  location,
  yourShare = "₹8,400",
  groupBalance = "₹45,200",
}) => {
  const [message, setMessage] = useState("");

  const members = [
    { name: "Rahul", role: "Admin", balance: "Owes ₹1,200", owes: true },
    { name: "Priya", balance: "Owed ₹3,400", owed: true },
    { name: "Amit", balance: "Owes ₹800", owes: true },
  ];

  const chatMessages = [
    { type: "date", label: "YESTERDAY" },
    { type: "message", author: "Rahul", color: "text-blue-600", isYou: false, text: "Hey guys, I've booked the villa for the first 3 days. It's right by Baga beach!" },
    { type: "expense", author: "Rahul", amount: "₹12,400", description: "Villa Booking" },
    { type: "message", author: "Priya", color: "text-pink-600", isYou: false, text: "Awesome! I'll handle the car rental and fuel for the whole trip." },
    { type: "date", label: "TODAY" },
    { type: "message", author: "You", isYou: true, text: "Sounds good! I'm just about to add the dinner expenses from last night. We went a bit over budget haha 😂", read: true },
    { type: "expense", author: "You", amount: "₹3,200", description: "Dinner at Thalassa", isYou: true },
    { type: "message", author: "Amit", color: "text-amber-700", isYou: false, text: "Has anyone checked the weather? Looks like it might rain on Sunday. Maybe we should swap the beach day for the fort trek?" },
  ];

  const budgetItems = [
    { label: "Food & Drinks", percent: 75, color: "bg-orange-500" },
    { label: "Stay", percent: 100, color: "bg-[#2ecc71]" },
    { label: "Transport", percent: 40, color: "bg-blue-500" },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    "https://images.unsplash.com/photo-1544148103-0773bf10c330?w=1200",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200",
  ];

  const participants = "Rahul, Priya, Amit, and 2 others";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const openGallery = (index) => {
    setGalleryIndex(Math.min(Math.max(0, index), galleryImages.length - 1));
    setGalleryOpen(true);
  };
  const closeGallery = () => setGalleryOpen(false);
  const goPrev = () => setGalleryIndex((i) => (i <= 0 ? galleryImages.length - 1 : i - 1));
  const goNext = () => setGalleryIndex((i) => (i >= galleryImages.length - 1 ? 0 : i + 1));

  const handleGalleryTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleGalleryTouchEnd = (e) => {
    if (touchStartX == null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goPrev();
      else goNext();
    }
    setTouchStartX(null);
  };

  return (
    <div className="fixed inset-0 w-full h-full max-w-full bg-[#F6F8F7] flex flex-col overflow-hidden safe-area-padding">
      {/* Safe area / viewport fit for mobile */}
      <style>{`
        .safe-area-padding {
          padding-top: env(safe-area-inset-top, 0);
          padding-bottom: env(safe-area-inset-bottom, 0);
          padding-left: env(safe-area-inset-left, 0);
          padding-right: env(safe-area-inset-right, 0);
        }
      `}</style>
      {/* Top header - touch-friendly on mobile */}
      <header className="h-14 min-h-[3.5rem] bg-white border-b border-gray-100 px-3 sm:px-4 flex items-center justify-between shrink-0">
        <button type="button" onClick={onBack} className="min-w-[44px] min-h-[44px] p-2 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center touch-manipulation" aria-label="Back">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 flex flex-col items-center justify-center min-w-0 mx-2">
          <h1 className="font-semibold text-gray-800 truncate max-w-full text-sm sm:text-base">{tripName}</h1>
          <p className="text-xs text-gray-500 truncate max-w-full">{participants}</p>
        </div>
        <div className="flex items-center gap-0 sm:gap-1">
          <span className="text-sm font-semibold text-gray-700 hidden sm:inline">Your Share {yourShare}</span>
          <button type="button" className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center touch-manipulation" aria-label="Search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center touch-manipulation" aria-label="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        {/* Left sidebar */}
        <aside className="w-64 shrink-0 bg-white border-r border-gray-100 flex flex-col hidden md:flex">
          <div className="p-4 space-y-3">
            <div className="rounded-xl bg-gray-100 p-4">
              <p className="text-xs font-medium text-gray-500 mb-1">Group Balance</p>
              <p className="text-xl font-bold text-gray-800">{groupBalance}</p>
            </div>
            <button type="button" className="w-full py-3 rounded-xl bg-[#2ecc71] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#27ae60] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Settle Up
            </button>
          </div>
          <div className="flex-1 overflow-auto border-t border-gray-100">
            <div className="p-3 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Trip Members (5)</span>
              <button type="button" className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8v-8m-8 0v8" />
                </svg>
              </button>
            </div>
            <div className="px-3 pb-2">
              <div className="rounded-xl bg-[#E8FBF4] border border-[#2ecc71]/30 p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2ecc71] text-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{tripName} Group Chat</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
              </div>
            </div>
            <ul className="px-3 space-y-2 pb-4">
              {members.map((m, i) => (
                <li key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm shrink-0">
                    {m.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {m.name}
                      {m.role && <span className="text-gray-400 font-normal ml-1">({m.role})</span>}
                    </p>
                    <p className={`text-xs ${m.owes ? "text-red-600" : "text-[#2ecc71]"}`}>{m.balance}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Central chat */}
        <main className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-100 shrink-0">
            <h2 className="font-semibold text-gray-800 text-sm sm:text-base">{tripName}</h2>
            <p className="text-xs sm:text-sm text-gray-500">{participants}</p>
          </div>
          <div className="flex-1 overflow-auto overflow-x-hidden p-3 sm:p-4 space-y-4 overscroll-contain">
            {chatMessages.map((item, i) => {
              if (item.type === "date") {
                return (
                  <div key={i} className="flex justify-center">
                    <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      {item.label}
                    </span>
                  </div>
                );
              }
              if (item.type === "expense") {
                return (
                  <div key={i} className={`flex ${item.isYou ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl bg-[#E8FBF4] border border-[#2ecc71]/30 px-3 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2ecc71] text-white flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-800">
                          {item.author} added {item.amount} for {item.description}.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={i} className={`flex ${item.isYou ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[90%] sm:max-w-[85%] ${item.isYou ? "order-2" : ""}`}>
                    {!item.isYou && (
                      <p className={`text-xs font-semibold mb-1 ml-1 ${item.color}`}>{item.author}</p>
                    )}
                    <div
                      className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${
                        item.isYou
                          ? "bg-[#2ecc71] text-white rounded-br-md"
                          : "bg-gray-100 text-gray-800 rounded-bl-md"
                      }`}
                    >
                      <p className="text-xs sm:text-sm">{item.text}</p>
                      {item.isYou && item.read && (
                        <div className="flex justify-end mt-1">
                          <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-2 sm:p-3 border-t border-gray-100 flex items-center gap-1.5 sm:gap-2 bg-white shrink-0 pb-[env(safe-area-inset-bottom,0)]">
            <button type="button" className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] p-2 rounded-xl text-gray-500 hover:bg-gray-100 flex items-center justify-center touch-manipulation" aria-label="Emoji">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button type="button" className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] p-2 rounded-xl text-gray-500 hover:bg-gray-100 flex items-center justify-center touch-manipulation hidden sm:flex" aria-label="Attach">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 min-w-0 py-2.5 px-3 sm:px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]/30 focus:border-[#2ecc71] text-sm min-h-[40px] sm:min-h-[44px]"
            />
            <button
              type="button"
              className="min-h-[40px] sm:min-h-[44px] py-2.5 px-3 sm:px-4 rounded-xl bg-[#2ecc71] text-white font-medium text-sm flex items-center gap-1 sm:gap-1.5 hover:bg-[#27ae60] touch-manipulation shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8v-8m-8 0v8" />
              </svg>
              <span className="hidden sm:inline">Add Expense</span>
            </button>
            <button
              type="button"
              className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] p-2.5 rounded-xl bg-[#2ecc71] text-white hover:bg-[#27ae60] flex items-center justify-center touch-manipulation"
              aria-label="Send"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </main>

        {/* Right sidebar */}
        <aside className="w-72 shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-auto hidden lg:flex">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3">Trip Gallery</h3>
            <div className="grid grid-cols-2 gap-2">
              {galleryImages.slice(0, 3).map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => openGallery(i)}
                  className="aspect-square rounded-xl bg-gray-200 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:ring-offset-1"
                >
                  <img src={`${src.split("?")[0]}?w=400`} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => openGallery(0)}
                className="aspect-square rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 font-semibold text-lg border-2 border-dashed border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
              >
                +12
              </button>
            </div>
          </div>
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3">Budget Progress</h3>
            <div className="space-y-3">
              {budgetItems.map((b, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{b.label}</span>
                    <span className="font-medium text-gray-800">{b.percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${b.color}`}
                      style={{ width: `${b.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="rounded-xl bg-[#E8FBF4] border border-[#2ecc71]/30 p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2ecc71] text-white flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800">Upcoming Settlement</p>
                <p className="text-xs text-gray-600">Rahul requested ₹450.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom nav - mobile only, with safe area */}
      <nav className="h-14 min-h-[3.5rem] bg-white border-t border-gray-100 flex items-center justify-around px-4 md:hidden shrink-0 pb-[env(safe-area-inset-bottom,0)]">
        <button type="button" className="min-w-[44px] min-h-[44px] p-2 text-gray-500 flex items-center justify-center touch-manipulation" aria-label="Settings">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <button type="button" onClick={() => setMobileMenuOpen(true)} className="min-w-[44px] min-h-[44px] p-2 text-gray-500 flex items-center justify-center touch-manipulation" aria-label="Trip info">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
        <button type="button" className="min-w-[44px] min-h-[44px] p-2 text-gray-500 flex items-center justify-center touch-manipulation" aria-label="Charts">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
        <button type="button" onClick={onBack} className="min-w-[44px] min-h-[44px] p-2 text-gray-500 flex items-center justify-center touch-manipulation" aria-label="Exit">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu sheet - Members, Balance, Budget, Gallery */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden />
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-xl max-h-[85vh] overflow-auto pb-[env(safe-area-inset-bottom,0)] md:hidden">
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Trip info</h3>
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="min-w-[44px] min-h-[44px] p-2 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center touch-manipulation" aria-label="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-xs font-medium text-gray-500 mb-1">Group Balance</p>
                <p className="text-xl font-bold text-gray-800">{groupBalance}</p>
              </div>
              <button type="button" className="w-full py-3 rounded-xl bg-[#2ecc71] text-white font-semibold flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Settle Up
              </button>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Trip Members (5)</h4>
                <ul className="space-y-2">
                  {members.map((m, i) => (
                    <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {m.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">
                          {m.name}
                          {m.role && <span className="text-gray-400 font-normal"> ({m.role})</span>}
                        </p>
                        <p className={`text-xs ${m.owes ? "text-red-600" : "text-[#2ecc71]"}`}>{m.balance}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Budget Progress</h4>
                <div className="space-y-3">
                  {budgetItems.map((b, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{b.label}</span>
                        <span className="font-medium text-gray-800">{b.percent}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Trip Gallery</h4>
                <div className="grid grid-cols-3 gap-2">
                  {galleryImages.slice(0, 3).map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { openGallery(i); setMobileMenuOpen(false); }}
                      className="aspect-square rounded-xl bg-gray-200 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
                    >
                      <img src={`${src.split("?")[0]}?w=400`} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => { openGallery(0); setMobileMenuOpen(false); }} className="text-xs text-[#2ecc71] font-medium mt-2 hover:underline">
                  +12 more photos — view all
                </button>
              </div>
              <div className="rounded-xl bg-[#E8FBF4] border border-[#2ecc71]/30 p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2ecc71] text-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800">Upcoming Settlement</p>
                  <p className="text-xs text-gray-600">Rahul requested ₹450.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Fullscreen gallery view - mobile & web */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black flex flex-col"
          style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)", paddingLeft: "env(safe-area-inset-left)", paddingRight: "env(safe-area-inset-right)" }}
        >
          <div className="absolute top-0 right-0 z-10 p-3 sm:p-4">
            <button
              type="button"
              onClick={closeGallery}
              className="min-w-[44px] min-h-[44px] rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center touch-manipulation transition-colors"
              aria-label="Close gallery"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center min-h-0 relative">
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center touch-manipulation transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div
              className="flex-1 flex items-center justify-center w-full h-full overflow-hidden select-none"
              onTouchStart={handleGalleryTouchStart}
              onTouchEnd={handleGalleryTouchEnd}
            >
              <img
                src={galleryImages[galleryIndex]}
                alt=""
                className="max-w-full max-h-full w-auto h-auto object-contain"
                draggable={false}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center touch-manipulation transition-colors"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="py-3 text-center text-white/90 text-sm">
            {galleryIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripChat;
