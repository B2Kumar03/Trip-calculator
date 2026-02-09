import React, { useState } from "react";

const TRIP_ICONS = [
  { id: "bike", label: "Bike", icon: "bike" },
  { id: "beach", label: "Beach", icon: "beach" },
  { id: "mountains", label: "Mountains", icon: "mountains" },
  { id: "city", label: "City", icon: "city" },
  { id: "forest", label: "Forest", icon: "forest" },
];

const CreateTrip = ({ onBack, onCreateTrip }) => {
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("bike");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [members, setMembers] = useState([
    { id: 1, name: "Rahul Sharma", initials: "RS", contact: "+919988776655", isYou: true, isAdmin: true },
    { id: 2, name: "Vijay Pratap", initials: "VP", contact: "+919122334455", isYou: false, isAdmin: false },
  ]);

  const TripIcon = ({ iconId, selected, onClick }) => {
    const iconClass = "w-8 h-8 sm:w-10 sm:h-10";
    let content = null;
    if (iconId === "bike") {
      content = <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7l-4-4M5 17h14" /></svg>;
    } else if (iconId === "beach") {
      content = <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2M7 17v2m10-2v2M5 12h14" /></svg>;
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

  const handleAddMember = () => {
    if (!fullName.trim()) return;
    const words = fullName.trim().split(/\s+/);
    const initials = words.length >= 2 ? (words[0][0] + words[1][0]).toUpperCase() : fullName.slice(0, 2).toUpperCase();
    setMembers((prev) => [
      ...prev,
      { id: Date.now(), name: fullName.trim(), initials, contact: "+91" + phone.replace(/\D/g, ""), isYou: false, isAdmin: false },
    ]);
    setFullName("");
    setPhone("");
  };

  const handleRemoveMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSubmit = () => {
    onCreateTrip?.({
      tripName: tripName || "New Trip",
      tripDates: startDate && endDate ? `${startDate} - ${endDate}` : "TBD",
      location: "",
      travelersCount: members.length,
    });
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

      <main className="max-w-2xl mx-auto p-4 sm:p-6">
        {/* 1 Trip Identity */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#E8FBF4] text-[#2ecc71] flex items-center justify-center font-bold text-sm">1</div>
            <h2 className="text-lg font-bold text-gray-800">Trip Identity</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trip Name</label>
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="e.g. Ladakh Bike Expedition 2024"
                className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Trip Icon</label>
              <div className="grid grid-cols-5 gap-2">
                {TRIP_ICONS.map((item) => (
                  <TripIcon key={item.id} iconId={item.id} selected={selectedIcon === item.id} onClick={() => setSelectedIcon(item.id)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2 Travel Group */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-[#E8FBF4] text-[#2ecc71] flex items-center justify-center font-bold text-sm">2</div>
            <h2 className="text-lg font-bold text-gray-800">Travel Group</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6 ml-11">Add travel buddies who will share expenses.</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Amit Kumar"
                className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
              <div className="flex gap-2">
                <div className="px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-600 font-medium shrink-0">+91</div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  maxLength={10}
                  className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71]"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddMember}
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#E8FBF4] text-[#2ecc71] font-semibold hover:bg-[#D4F5E9] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              Add
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-[10px] font-bold text-gray-500 uppercase tracking-wider py-3 pr-4">Member</th>
                  <th className="text-[10px] font-bold text-gray-500 uppercase tracking-wider py-3 pr-4">Contact</th>
                  <th className="text-[10px] font-bold text-gray-500 uppercase tracking-wider py-3 pr-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-b border-gray-100">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${m.isYou ? "bg-[#E8FBF4] text-[#2ecc71]" : "bg-blue-100 text-blue-600"}`}>
                          {m.initials}
                        </div>
                        <span className="font-medium text-gray-800">{m.name}{m.isYou ? " (You)" : ""}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-gray-600 text-sm">{m.contact}</td>
                    <td className="py-3 pr-4 text-right">
                      {m.isAdmin ? (
                        <span className="inline-block px-2 py-1 rounded bg-[#E8FBF4] text-[#2ecc71] text-xs font-semibold">Admin</span>
                      ) : (
                        <button type="button" onClick={() => handleRemoveMember(m.id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50" aria-label="Remove member">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="button" onClick={onBack} className="flex-1 min-h-[44px] px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50">
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} className="flex-1 min-h-[44px] px-4 py-2.5 rounded-lg bg-[#2ecc71] text-white font-semibold hover:bg-[#27ae60]">
              Create Trip
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTrip;
