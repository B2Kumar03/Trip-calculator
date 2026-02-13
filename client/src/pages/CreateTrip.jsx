import React, { useState, useEffect } from "react";
import LoadingButton from "../components/LoadingButton";
import { useApi } from "../hooks/useApi";
import { tripAPI, userAPI } from "../services/api";
import { validateTripName, validateDateRange, validateEmail, validateName } from "../utils/validation";
import toast from "react-hot-toast";

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
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load current user and add as first member
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user._id || user.id) {
      setCurrentUser(user);
      const userName = user.user_full_name || "You";
      const initials = userName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";
      setMembers([{
        id: user._id || user.id,
        name: userName,
        email: user.email || "",
        initials,
        isYou: true,
        isAdmin: true,
      }]);
    }
  }, []);

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
    setErrors({});
    
    const nameValidation = validateName(memberName);
    const emailValidation = validateEmail(memberEmail);
    
    if (!nameValidation.valid || !emailValidation.valid) {
      const newErrors = {};
      if (!nameValidation.valid) newErrors.memberName = nameValidation.message;
      if (!emailValidation.valid) newErrors.memberEmail = emailValidation.message;
      setErrors(newErrors);
      return;
    }

    // Check if email already exists in members
    if (members.some(m => m.email?.toLowerCase() === memberEmail.trim().toLowerCase())) {
      toast.error("This email is already added to the trip");
      return;
    }

    const words = memberName.trim().split(/\s+/);
    const initials = words.length >= 2 ? (words[0][0] + words[1][0]).toUpperCase() : memberName.slice(0, 2).toUpperCase();
    setMembers((prev) => [
      ...prev,
      { 
        id: `temp_${Date.now()}`, 
        name: memberName.trim(), 
        email: memberEmail.trim().toLowerCase(),
        initials, 
        isYou: false, 
        isAdmin: false 
      },
    ]);
    setMemberName("");
    setMemberEmail("");
    setErrors({});
  };

  const handleRemoveMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const { execute, loading } = useApi();

  const handleSubmit = async () => {
    setErrors({});
    
    // Validate form
    const tripNameValidation = validateTripName(tripName);
    const dateValidation = validateDateRange(startDate, endDate);
    
    if (!tripNameValidation.valid || !dateValidation.valid) {
      const newErrors = {};
      if (!tripNameValidation.valid) newErrors.tripName = tripNameValidation.message;
      if (!dateValidation.valid) {
        if (!startDate) newErrors.startDate = "Start date is required";
        else if (!endDate) newErrors.endDate = "End date is required";
        else newErrors.dateRange = dateValidation.message;
      }
      setErrors(newErrors);
      return;
    }

    if (members.length === 0) {
      toast.error("Please add at least one member to the trip");
      return;
    }

    // Get current user
    const user = currentUser || JSON.parse(localStorage.getItem("user") || "{}");
    if (!user._id && !user.id) {
      toast.error("Please login first");
      return;
    }
    
    // Create or find users for members
    const memberIds = [];
    for (const member of members) {
      if (member.isYou) {
        memberIds.push(user._id || user.id);
      } else {
        try {
          let userResult;
          try {
            // Try to find user by email
            userResult = await userAPI.getByEmail(member.email);
          } catch {
            // User doesn't exist, create one
            userResult = await userAPI.create({
              user_full_name: member.name,
              email: member.email,
              allowedNotification: ["email"],
            });
          }
          memberIds.push(userResult.data._id || userResult.data.id);
        } catch (error) {
          console.error("Error creating/finding user:", error);
          toast.error(`Failed to add member ${member.name}`);
        }
      }
    }

    await execute(
      () => tripAPI.create({
        trip_name: tripName.trim(),
        trip_start_date: new Date(startDate),
        trip_end_date: new Date(endDate),
        category: selectedIcon,
        members_id: memberIds,
      }),
      {
        successMessage: "Trip created successfully! Invitations sent to members.",
        errorMessage: "Failed to create trip",
        onSuccess: (data) => {
          const trip = data.data;
          onCreateTrip?.({
            tripId: trip._id,
            tripName: trip.trip_name,
            tripDates: `${new Date(trip.trip_start_date).toLocaleDateString()} - ${new Date(trip.trip_end_date).toLocaleDateString()}`,
            location: trip.category || "",
            travelersCount: trip.members_id?.length || members.length,
          });
        },
      }
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
                onChange={(e) => {
                  setTripName(e.target.value);
                  if (errors.tripName) setErrors({ ...errors, tripName: null });
                }}
                placeholder="e.g. Ladakh Bike Expedition 2024"
                className={`w-full px-4 py-2.5 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71] ${
                  errors.tripName ? "border-red-500" : "border-gray-200"
                }`}
                required
              />
              {errors.tripName && (
                <p className="mt-1 text-sm text-red-500">{errors.tripName}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      if (errors.startDate || errors.dateRange) setErrors({ ...errors, startDate: null, dateRange: null });
                    }}
                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71] ${
                      errors.startDate ? "border-red-500" : "border-gray-200"
                    }`}
                    required
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      if (errors.endDate || errors.dateRange) setErrors({ ...errors, endDate: null, dateRange: null });
                    }}
                    className={`w-full px-4 py-2.5 pr-10 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71] ${
                      errors.endDate ? "border-red-500" : "border-gray-200"
                    }`}
                    required
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
                )}
                {errors.dateRange && (
                  <p className="mt-1 text-sm text-red-500">{errors.dateRange}</p>
                )}
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
                value={memberName}
                onChange={(e) => {
                  setMemberName(e.target.value);
                  if (errors.memberName) setErrors({ ...errors, memberName: null });
                }}
                placeholder="e.g. Amit Kumar"
                className={`w-full px-4 py-2.5 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71] ${
                  errors.memberName ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.memberName && (
                <p className="mt-1 text-xs text-red-500">{errors.memberName}</p>
              )}
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
              <input
                type="email"
                value={memberEmail}
                onChange={(e) => {
                  setMemberEmail(e.target.value);
                  if (errors.memberEmail) setErrors({ ...errors, memberEmail: null });
                }}
                placeholder="amit@example.com"
                className={`w-full px-4 py-2.5 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] focus:border-[#2ecc71] ${
                  errors.memberEmail ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.memberEmail && (
                <p className="mt-1 text-xs text-red-500">{errors.memberEmail}</p>
              )}
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
                  <th className="text-[10px] font-bold text-gray-500 uppercase tracking-wider py-3 pr-4">Email</th>
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
                    <td className="py-3 pr-4 text-gray-600 text-sm">{m.email || "N/A"}</td>
                    <td className="py-3 pr-4 text-right">
                      {m.isAdmin ? (
                        <span className="inline-block px-2 py-1 rounded bg-[#E8FBF4] text-[#2ecc71] text-xs font-semibold">Admin</span>
                      ) : (
                        <button type="button" onClick={() => handleRemoveMember(m.id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer" aria-label="Remove member">
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
            <LoadingButton
              type="button"
              onClick={handleSubmit}
              loading={loading}
              className="flex-1 min-h-[44px]"
              variant="primary"
            >
              Create Trip
            </LoadingButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTrip;
