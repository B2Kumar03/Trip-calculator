import React, { useState } from "react";

const TRIP_ICONS = [
  { id: "bike", label: "Bike" },
  { id: "beach", label: "Beach" },
  { id: "mountains", label: "Mountains" },
  { id: "city", label: "City" },
  { id: "forest", label: "Forest" },
];

const TripSettings = ({ onBack, onSave, tripData }) => {
  const [tripName, setTripName] = useState(tripData?.tripName || "Kerala Road Trip 2024");
  const [budget, setBudget] = useState(tripData?.budget || "75000");
  const [startDate, setStartDate] = useState(tripData?.startDate || "Dec 15, 2024");
  const [endDate, setEndDate] = useState(tripData?.endDate || "Dec 22, 2024");
  const [selectedIcon, setSelectedIcon] = useState(tripData?.icon || "beach");
  const [members, setMembers] = useState(tripData?.members || [
    { id: 1, name: "Aditya Sharma", initials: "AS", email: "aditya@example.com", role: "SUPER ADMIN", isYou: true },
    { id: 2, name: "Rahul Verma", initials: "RV", email: "rahul.w@gmail.com", role: "Member", isYou: false },
    { id: 3, name: "Priya Mishra", initials: "PM", email: "priya.m@company.in", role: "Member", isYou: false },
  ]);

  const handleRoleChange = (memberId, newRole) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)));
  };

  const handleRemoveMember = (memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId && m.isYou));
  };

  const handleSave = () => {
    onSave?.({
      tripName,
      budget,
      startDate,
      endDate,
      icon: selectedIcon,
      members,
    });
  };

  const TripIcon = ({ iconId, selected, onClick }) => {
    const iconClass = "w-8 h-8 sm:w-10 sm:h-10";
    let content = null;
    if (iconId === "beach") {
      content = <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M7 17v2m10-2v2M5 12h14" /></svg>;
    } else if (iconId === "bike") {
      content = <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7l-4-4M5 17h14" /></svg>;
    } else if (iconId === "mountains") {
      content = <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21l9-9m0 0l4-4m-4 4l4-4m-4 4l-4 4" /></svg>;
    } else if (iconId === "city") {
      content = <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
    } else if (iconId === "forest") {
      content = <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
    }
    return (
      <button
        type="button"
        onClick={() => setSelectedIcon(iconId)}
        className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-colors ${
          selected ? "border-[#2ecc71] bg-[#E8FBF4] text-[#2ecc71]" : "border-gray-200 text-gray-500 hover:border-gray-300"
        }`}
      >
        {content}
        <span className="text-xs font-medium">{iconId.charAt(0).toUpperCase() + iconId.slice(1)}</span>
      </button>
    );
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

      <main className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Trip Settings</h1>
          <p className="text-sm text-gray-600">Manage your trip details, members, and preferences.</p>
        </div>

        {/* General Information */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">General Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Trip Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {TRIP_ICONS.map((item) => (
                  <TripIcon key={item.id} iconId={item.id} selected={selectedIcon === item.id} onClick={() => setSelectedIcon(item.id)} />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trip Name</label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget (Est.)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Member Management */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Member Management</h2>
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2ecc71] text-white font-semibold hover:bg-[#27ae60]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Invite New
            </button>
          </div>
          <div className="space-y-3">
            {members.map((m) => (
              <div key={m.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  m.initials === "AS" ? "bg-gray-200 text-gray-600" :
                  m.initials === "RV" ? "bg-orange-100 text-orange-600" :
                  "bg-blue-100 text-blue-600"
                }`}>
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">{m.name}{m.isYou ? " (You)" : ""}</p>
                  <p className="text-sm text-gray-500">{m.email}</p>
                </div>
                {m.isYou ? (
                  <span className="px-3 py-1 rounded bg-[#E8FBF4] text-[#2ecc71] text-xs font-bold">SUPER ADMIN</span>
                ) : (
                  <select
                    value={m.role}
                    onChange={(e) => handleRoleChange(m.id, e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
                  >
                    <option>Member</option>
                    <option>Admin</option>
                  </select>
                )}
                <div className="flex items-center gap-2 shrink-0">
                  {!m.isYou && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(m.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                      aria-label="Remove member"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  )}
                  {m.isYou && (
                    <button type="button" className="p-2 rounded-lg text-gray-400 hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Advanced Settings</h2>
          <div className="flex items-center justify-between p-4 rounded-lg border border-red-100 bg-red-50">
            <div className="flex-1">
              <p className="font-semibold text-gray-800 mb-1">Delete Trip</p>
              <p className="text-sm text-gray-600">Once deleted, all expenses and data will be permanently removed.</p>
            </div>
            <button type="button" className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 shrink-0">
              Delete Trip
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3">
          <button type="button" onClick={onBack} className="flex-1 min-h-[44px] px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50">
            Cancel
          </button>
          <button type="button" onClick={handleSave} className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white font-semibold hover:bg-[#27ae60]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default TripSettings;
