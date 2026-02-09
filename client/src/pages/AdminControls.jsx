import React, { useState } from "react";

const TRIPS_TO_END = [
  { id: "rajasthan", name: "Rajasthan Exp.", started: "12 Oct", members: 8 },
  { id: "himachal", name: "Himachal Backpacking", started: "20 Oct", members: 5 },
  { id: "office", name: "Office Retreat", started: "25 Oct", members: 12 },
];

const AdminControls = ({ onBack, tripName = "Rajasthan Expedition" }) => {
  const [tripLocked, setTripLocked] = useState(true);
  const [endTripModalOpen, setEndTripModalOpen] = useState(false);
  const [selectedTripToEnd, setSelectedTripToEnd] = useState(TRIPS_TO_END[0].id);
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, title: "Fuel for Mahindra Thar", payer: "Rohit K.", amount: "₹3,200", categoryIcon: "fuel", categoryColor: "bg-orange-500" },
    { id: 2, title: "Dinner at Chokhi Dhani", payer: "Priya S.", amount: "₹8,450", categoryIcon: "dinner", categoryColor: "bg-blue-500" },
  ]);

  const handleApprove = (id) => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReject = (id) => {
    setPendingApprovals((prev) => prev.filter((item) => item.id !== id));
  };

  const CategoryIcon = ({ icon, className }) => {
    if (icon === "fuel") {
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    }
    if (icon === "dinner") {
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#F0F2F5] pb-8">
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

      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Admin Controls</h1>
          <p className="text-sm text-gray-600">Manage trip settings, approvals, and member roles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Pending Approvals */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-bold text-gray-800">Pending Approvals</h2>
                <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
                  {pendingApprovals.length}
                </span>
              </div>
              <div className="space-y-3">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50">
                    <div className={`w-12 h-12 ${item.categoryColor} rounded-lg flex items-center justify-center shrink-0`}>
                      <CategoryIcon icon={item.categoryIcon} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 mb-1">{item.title}</p>
                      <p className="text-sm text-gray-500">By {item.payer} • {item.amount}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleApprove(item.id)}
                        className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
                        aria-label="Approve"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(item.id)}
                        className="w-10 h-10 rounded-full bg-pink-100 text-red-600 flex items-center justify-center hover:bg-pink-200 transition-colors"
                        aria-label="Reject"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
                {pendingApprovals.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No pending approvals</p>
                )}
              </div>
            </div>

            {/* Trip Management */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Trip Management</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status:</p>
                  <p className="text-base font-semibold text-[#2ecc71]">Active</p>
                </div>
                <p className="text-sm text-gray-500">Only admins can add or edit high-value expenses when locked.</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setTripLocked(!tripLocked)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {tripLocked ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                        Unlock Trip
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        Lock Trip
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEndTripModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                    End Trip
                  </button>
                </div>
              </div>
            </div>

            {/* User Role Management */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">User Role Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">MEMBER</th>
                      <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">CURRENT ROLE</th>
                      <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 uppercase tracking-wider">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                            RK
                          </div>
                          <span className="font-medium text-gray-800">Rohit Kapoor</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">MEMBER</span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <button type="button" className="text-sm text-[#2ecc71] font-medium hover:underline">
                            Promote to Admin
                          </button>
                          <button type="button" className="text-red-500 hover:text-red-600" aria-label="Remove member">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12h-6m-2-5l-5 5 5 5" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
                            PS
                          </div>
                          <span className="font-medium text-gray-800">Priya Sharma</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#E8FBF4] text-[#2ecc71] text-xs font-bold">ADMIN</span>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-sm text-gray-500">Owner Access</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Group Statistics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Group Statistics</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Spending Efficiency</p>
                    <span className="text-sm font-bold text-[#2ecc71]">84%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-[84%] bg-[#2ecc71] rounded-full" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Total Group Cashflow</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">₹1,42,800</p>
                  <p className="text-sm text-[#2ecc71] font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    +14.2% VS LAST TRIP
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Admin Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Admin Actions</h2>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <p className="text-sm text-gray-700 flex-1">Arjun locked the 'Munnar' trip 2 hours ago.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#2ecc71] mt-2 shrink-0" />
                  <p className="text-sm text-gray-700 flex-1">System automatically approved 4 minor expenses.</p>
                </div>
              </div>
              <button
                type="button"
                className="w-full px-4 py-2.5 rounded-lg border-2 border-[#2ecc71] text-[#2ecc71] font-semibold hover:bg-[#E8FBF4] transition-colors"
              >
                Export Full Audit Log
              </button>
            </div>

            {/* Priority Admin Support */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#E8FBF4] rounded-full -translate-x-8 -translate-y-8" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#E8FBF4] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Priority Admin Support</h2>
                <p className="text-sm text-gray-600 mb-4">Dedicated helpline for trip organizers.</p>
                <button
                  type="button"
                  className="text-[#2ecc71] font-semibold hover:underline flex items-center gap-1"
                >
                  Connect Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Select Trip to End modal */}
      {endTripModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEndTripModalOpen(false)} aria-hidden />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-gray-900">Select Trip to End</h2>
                <button
                  type="button"
                  onClick={() => setEndTripModalOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl border border-orange-200 bg-orange-50 mb-5">
                <svg className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-gray-800">
                  Ending a trip will lock all expenses for all members. This action cannot be undone.
                </p>
              </div>
              <div className="space-y-2 mb-6">
                {TRIPS_TO_END.map((trip) => (
                  <button
                    key={trip.id}
                    type="button"
                    onClick={() => setSelectedTripToEnd(trip.id)}
                    className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl border-2 text-left transition-colors ${
                      selectedTripToEnd === trip.id
                        ? "border-[#2ecc71] bg-[#E8FBF4]"
                        : "border-gray-100 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{trip.name}</p>
                      <p className="text-sm text-gray-500">Started: {trip.started} • {trip.members} Members</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedTripToEnd === trip.id ? "border-[#2ecc71] bg-[#2ecc71]" : "border-gray-300 bg-white"
                    }`}>
                      {selectedTripToEnd === trip.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setEndTripModalOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                Confirm End Trip
              </button>
              <button
                type="button"
                onClick={() => setEndTripModalOpen(false)}
                className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControls;
