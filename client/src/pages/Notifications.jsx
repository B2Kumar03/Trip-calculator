import React, { useState } from "react";

const Notifications = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("all");

  const notifications = {
    all: [
      {
        id: 1,
        type: "invite",
        icon: "people",
        title: "Rahul Sharma (Admin) invited you to join the trip",
        tripName: "Goa Getaway 2024.",
        time: "2 minutes ago",
        section: "recent",
        actions: ["accept", "decline"],
      },
      {
        id: 2,
        type: "expense",
        icon: "document",
        title: "Ananya Patel added a new expense",
        expenseName: "Seafood Lunch at Britto's",
        tripName: "in Goa Getaway.",
        amount: "₹1,850",
        userShare: "₹462.50",
        time: "45 minutes ago",
        section: "recent",
      },
      {
        id: 3,
        type: "settlement",
        icon: "camera",
        title: "You have a pending settlement of",
        amount: "₹3,420",
        to: "Amit Kumar",
        tripName: "for the Manali Winter Trip.",
        time: "2 hours ago",
        urgent: true,
        section: "recent",
        action: "settle",
      },
      {
        id: 4,
        type: "trip-ended",
        icon: "calendar",
        title: "The trip",
        tripName: "Leh-Ladakh Road Trip",
        description: "has officially ended. Please ensure all expenses are added for the final balance.",
        time: "Yesterday, 6:30 PM",
        section: "earlier",
      },
      {
        id: 5,
        type: "expense",
        icon: "document",
        title: "Vikram Singh added an expense",
        expenseName: "Fuel Refill-Leh",
        tripName: "in Leh-Ladakh.",
        amount: "₹4,500",
        time: "Aug 24, 11:20 AM",
        section: "earlier",
      },
    ],
    invites: [
      {
        id: 1,
        type: "invite",
        icon: "people",
        title: "Rahul Sharma (Admin) invited you to join the trip",
        tripName: "Goa Getaway 2024.",
        time: "2 minutes ago",
        section: "recent",
        actions: ["accept", "decline"],
      },
    ],
    expenses: [
      {
        id: 2,
        type: "expense",
        icon: "document",
        title: "Ananya Patel added a new expense",
        expenseName: "Seafood Lunch at Britto's",
        tripName: "in Goa Getaway.",
        amount: "₹1,850",
        userShare: "₹462.50",
        time: "45 minutes ago",
        section: "recent",
      },
      {
        id: 5,
        type: "expense",
        icon: "document",
        title: "Vikram Singh added an expense",
        expenseName: "Fuel Refill-Leh",
        tripName: "in Leh-Ladakh.",
        amount: "₹4,500",
        time: "Aug 24, 11:20 AM",
        section: "earlier",
      },
    ],
    settlements: [
      {
        id: 3,
        type: "settlement",
        icon: "camera",
        title: "You have a pending settlement of",
        amount: "₹3,420",
        to: "Amit Kumar",
        tripName: "for the Manali Winter Trip.",
        time: "2 hours ago",
        urgent: true,
        section: "recent",
        action: "settle",
      },
    ],
  };

  const getFilteredNotifications = () => {
    return notifications[activeTab] || [];
  };

  const getIcon = (iconType) => {
    if (iconType === "people") {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    }
    if (iconType === "document") {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
    if (iconType === "camera") {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    }
    if (iconType === "calendar") {
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return null;
  };

  const filteredNotifications = getFilteredNotifications();
  const recentNotifications = filteredNotifications.filter((n) => n.section === "recent");
  const earlierNotifications = filteredNotifications.filter((n) => n.section === "earlier");

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#F0F2F5]">
      <header className="h-14 min-h-[3.5rem] bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0" style={{ paddingTop: "env(safe-area-inset-top, 0)" }}>
        <div className="flex items-center gap-2 min-w-0">
          <button type="button" onClick={onBack} className="min-w-[44px] min-h-[44px] p-2 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 flex items-center justify-center" aria-label="Back">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ecc71] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l-9 18h5l4-8 4 8h5L12 3z" /></svg>
            <span className="font-bold text-lg sm:text-xl text-[#2ecc71] truncate">TripSplit.in</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 sm:p-6 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Notifications</h1>
            <p className="text-sm text-gray-600">Manage your trip alerts and settlement updates</p>
          </div>
          <button type="button" className="flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white font-semibold hover:bg-[#27ae60] shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            Mark all as read
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "invites", "expenses", "settlements"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#2ecc71] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Recent Section */}
        {recentNotifications.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-bold text-gray-700">Recent</h2>
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            </div>
            <div className="space-y-3">
              {recentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border ${
                    notif.urgent ? "border-l-4 border-l-orange-500 border-r border-t border-b border-gray-100" : "border-gray-100"
                  }`}
                >
                  {notif.urgent && (
                    <span className="inline-block px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold mb-2">URGENT</span>
                  )}
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      notif.urgent ? "bg-orange-100 text-orange-600" : "bg-[#E8FBF4] text-[#2ecc71]"
                    }`}>
                      {getIcon(notif.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 mb-1">
                        {notif.title}{" "}
                        {notif.tripName && <span className="font-semibold">{notif.tripName}</span>}
                        {notif.expenseName && <span className="font-semibold">"{notif.expenseName}"</span>}
                        {notif.tripName && notif.expenseName && <span> {notif.tripName}</span>}
                        {notif.amount && (
                          <>
                            {" "}
                            <span className="font-bold">{notif.amount}</span>
                            {notif.userShare && <span className="text-gray-500"> (Your share: {notif.userShare})</span>}
                          </>
                        )}
                        {notif.to && (
                          <>
                            {" "}
                            <span className="font-bold">{notif.amount}</span> due to {notif.to}
                          </>
                        )}
                        {notif.description && <span> {notif.description}</span>}
                      </p>
                      <p className="text-xs text-gray-500">{notif.time}</p>
                      {notif.actions && (
                        <div className="flex gap-2 mt-3">
                          <button type="button" className="px-4 py-1.5 rounded-lg bg-[#2ecc71] text-white text-sm font-medium hover:bg-[#27ae60]">
                            Accept
                          </button>
                          <button type="button" className="px-4 py-1.5 rounded-lg border-2 border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50">
                            Decline
                          </button>
                        </div>
                      )}
                      {notif.action === "settle" && (
                        <button type="button" className="mt-2 text-sm font-medium text-orange-600 hover:text-orange-700">
                          Settle Now →
                        </button>
                      )}
                    </div>
                    {!notif.actions && notif.action !== "settle" && (
                      <button type="button" className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earlier Section */}
        {earlierNotifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-700 mb-3">Earlier</h2>
            <div className="space-y-3">
              {earlierNotifications.map((notif) => (
                <div key={notif.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8FBF4] text-[#2ecc71] flex items-center justify-center shrink-0">
                      {getIcon(notif.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 mb-1">
                        {notif.title}{" "}
                        {notif.tripName && <span className="font-semibold">{notif.tripName}</span>}
                        {notif.expenseName && <span className="font-semibold">"{notif.expenseName}"</span>}
                        {notif.tripName && notif.expenseName && <span> {notif.tripName}</span>}
                        {notif.amount && (
                          <>
                            {" "}
                            <span className="font-bold">{notif.amount}</span>
                          </>
                        )}
                        {notif.description && <span> {notif.description}</span>}
                      </p>
                      <p className="text-xs text-gray-500">{notif.time}</p>
                    </div>
                    {!notif.actions && (
                      <button type="button" className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <p className="text-sm text-gray-700 mb-2">Have a question about an expense? Our 24/7 support is here to help with split calculations.</p>
          <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
            Contact Support
          </button>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
