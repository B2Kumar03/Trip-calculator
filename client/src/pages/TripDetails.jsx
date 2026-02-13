import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { tripAPI, expenseAPI, settlementAPI } from "../services/api";
import { useApi } from "../hooks/useApi";

const TripDetails = ({ onBack, onOpenChat, onAddExpense, onOpenSettlements, onOpenProfile, onOpenNotifications, onOpenAdminControls }) => {
  const { tripId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("expenses");
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const { execute, loading } = useApi();

  useEffect(() => {
    loadTripData();
  }, [tripId]);

  const loadTripData = async () => {
    if (!tripId) {
      // Try to get tripId from location state
      const tripFromState = location.state?.trip;
      if (tripFromState?.tripId) {
        await loadTrip(tripFromState.tripId);
        return;
      }
      return;
    }
    await loadTrip(tripId);
  };

  const loadTrip = async (id) => {
    await execute(
      () => tripAPI.getById(id),
      {
        silent: true,
        onSuccess: async (data) => {
          const tripData = data.data;
          setTrip(tripData);
          
          // Load members first
          if (tripData.members_id) {
            const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = currentUser._id || currentUser.id;
            
            const membersList = tripData.members_id.map(member => ({
              id: member._id || member.id,
              name: member.user_full_name || "Unknown",
              email: member.email || "",
              initials: (member.user_full_name || "U").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
              isAdmin: tripData.members_id[0]?._id === (member._id || member.id),
              isYou: (member._id || member.id) === userId,
            }));
            
            // Load expenses
            try {
              const expensesRes = await expenseAPI.getByTrip(id);
              const expensesList = expensesRes.data || [];
              const formattedExpenses = expensesList.map(exp => ({
                id: exp._id,
                title: exp.expense_title,
                iconBg: getCategoryColor(exp.category || "other"),
                icon: getCategoryIcon(exp.category || "other"),
                paidBy: exp.paid_by_id?.user_full_name || "Unknown",
                paidById: exp.paid_by_id?._id || exp.paid_by_id?.id,
                when: formatDate(exp.createdAt || exp.expense_date),
                amount: `₹${(exp.amount || 0).toLocaleString("en-IN")}`,
                split: formatSplit(exp.split_between || []),
                amountNum: exp.amount || 0,
                split_between: exp.split_between || [],
              }));
              setExpenses(formattedExpenses);

              // Calculate balances for members
              const balances = calculateBalances(formattedExpenses, membersList, userId);
              setMembers(membersList.map(m => ({
                ...m,
                balance: balances[m.id] || "₹0",
                positive: balances[m.id]?.startsWith("+"),
              })));
            } catch (error) {
              console.error("Error loading expenses:", error);
              setMembers(membersList);
            }

            // Load settlements
            try {
              const settlementRes = await settlementAPI.getByTrip(id);
              const settlementData = settlementRes.data || [];
              setSettlements(settlementData);
            } catch (error) {
              console.error("Error loading settlements:", error);
            }
          }
        },
      }
    );
  };

  const calculateBalances = (expensesList, membersList, currentUserId) => {
    const balances = {};
    membersList.forEach(m => balances[m.id] = 0);

    expensesList.forEach(exp => {
      const paidById = exp.paidById;
      const splitBetween = exp.split_between || [];
      const totalAmount = exp.amountNum || 0;
      
      // Subtract what each person owes
      splitBetween.forEach(split => {
        const splitUserId = split.user_id?._id || split.user_id?.id;
        const amount = split.amount || 0;
        
        if (splitUserId && balances[splitUserId] !== undefined) {
          balances[splitUserId] -= amount;
        }
      });
      
      // Add what the payer paid
      if (paidById && balances[paidById] !== undefined) {
        balances[paidById] += totalAmount;
      }
    });

    return Object.fromEntries(
      Object.entries(balances).map(([id, balance]) => [
        id,
        balance >= 0 ? `+₹${Math.abs(balance).toLocaleString("en-IN")}` : `-₹${Math.abs(balance).toLocaleString("en-IN")}`
      ])
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown date";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  const formatSplit = (splitBetween) => {
    if (!splitBetween || splitBetween.length === 0) return "Not split";
    if (splitBetween.length === 1) return "Paid by one person";
    const equalAmounts = splitBetween.every(s => s.amount === splitBetween[0].amount);
    if (equalAmounts) return `Split equally (${splitBetween.length})`;
    return `Custom split (${splitBetween.length})`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: "bg-orange-400",
      transport: "bg-sky-400",
      stay: "bg-violet-500",
      tickets: "bg-purple-500",
      other: "bg-emerald-500",
    };
    return colors[category] || colors.other;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: "fork-knife",
      transport: "car",
      stay: "bed",
      tickets: "ticket",
      other: "bag",
    };
    return icons[category] || icons.other;
  };

  const tripName = trip?.trip_name || location.state?.trip?.tripName || "Loading...";
  const tripDates = trip 
    ? `${new Date(trip.trip_start_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} - ${new Date(trip.trip_end_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
    : location.state?.trip?.tripDates || "";
  const locationName = trip?.category || location.state?.trip?.location || "";

  const ExpenseIcon = ({ type, className }) => {
    if (type === "fork-knife")
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 2v10m0 0l-1.5 1.5M9 12l1.5 1.5M15 2v10m0 0l-1.5 1.5M15 12l1.5 1.5" />
        </svg>
      );
    if (type === "car")
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-5 6h6M5 17h14a2 2 0 002-2v-4l-2-4H9l-2 4v4a2 2 0 002 2z" />
        </svg>
      );
    if (type === "boat")
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    if (type === "bag")
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    return null;
  };

  return (
    <div className="min-h-screen bg-[#F6F8F7] font-sans">
      {/* ───────── TOP HEADER: logo left, bell + avatar right ───────── */}
      <header className="h-14 sm:h-16 bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} className="p-1 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden" aria-label="Back to dashboard">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-[#0D9668] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3l-9 18h5l4-8 4 8h5L12 3z" />
            </svg>
            <span className="font-bold text-xl text-[#0D9668]">TripSplit.in</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onOpenNotifications} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative" aria-label="Notifications">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
          </button>
          <button type="button" onClick={onOpenProfile} className="w-9 h-9 rounded-full bg-[#14D38E] flex items-center justify-center text-white font-bold text-sm shrink-0 hover:bg-[#11B97C] transition-colors">AM</button>
        </div>
      </header>

      {/* ───────── BANNER (mountain hero): ACTIVE, dates, trip name, location | Admin Controls ───────── */}
      <div className="relative h-44 sm:h-52 md:h-60 bg-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button
          type="button"
          onClick={onOpenAdminControls}
          className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gray-600/90 hover:bg-gray-500 text-white text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Admin Controls
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
          <span className="inline-block px-2.5 py-1 rounded bg-[#14D38E] text-white text-xs font-bold mb-2">ACTIVE</span>
          <p className="text-sm text-white/95 mb-0.5">{tripDates}</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{tripName}</h1>
          <p className="flex items-center gap-1.5 text-sm text-white/90 mt-1">
            <svg className="w-4 h-4 text-[#14D38E]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {locationName}
          </p>
        </div>
      </div>

      {/* ───────── MAIN CONTENT: tabs + left column | Trip Members + sidebar same row ───────── */}
      <main className="p-4 sm:p-6 max-w-7xl mx-auto pb-24 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Left column – Tabs, then Summary cards + Recent Expenses */}
          <div className="min-w-0 space-y-6">
            {/* Tabs: same row as Trip Members heading */}
            <div className="bg-white rounded-xl border border-gray-100 px-4 py-2 shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("expenses")}
                  className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "expenses" ? "bg-[#2ecc71] text-white" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Expenses
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("members")}
                  className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "members" ? "bg-[#2ecc71] text-white" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Members
                </button>
                <button
                  type="button"
                  onClick={() => (onOpenSettlements ? onOpenSettlements() : setActiveTab("settlements"))}
                  className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "settlements" ? "bg-[#2ecc71] text-white" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2v-6a2 2 0 00-2-2H9m-6 0a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2z" />
                  </svg>
                  Settlements
                </button>
                <button
                  type="button"
                  onClick={() => (onOpenChat ? onOpenChat() : setActiveTab("chat"))}
                  className={`relative shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "chat" ? "bg-[#2ecc71] text-white" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat
                  <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("summary")}
                  className={`shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "summary" ? "bg-[#2ecc71] text-white" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Summary
                </button>
              </div>
            </div>

            {/* Summary cards – show for all tabs (Expenses, Members, Summary) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Total Trip Spent</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">
                  ₹{expenses.reduce((sum, exp) => sum + (exp.amountNum || 0), 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">Your Share</p>
                <p className="text-lg sm:text-xl font-bold text-gray-800">
                  ₹{expenses.reduce((sum, exp) => {
                    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
                    const userId = currentUser._id || currentUser.id;
                    const userSplit = exp.split_between?.find(s => 
                      (s.user_id?._id === userId || s.user_id?.id === userId)
                    );
                    return sum + (userSplit?.amount || 0);
                  }, 0).toLocaleString("en-IN")}
                </p>
              </div>
              <div className={`rounded-xl p-4 border shadow-sm ${
                members.find(m => m.isYou)?.positive 
                  ? "bg-[#E8FBF4] border-[#14D38E]/20" 
                  : "bg-white border-gray-100"
              }`}>
                <p className={`text-xs sm:text-sm font-medium mb-1 ${
                  members.find(m => m.isYou)?.positive ? "text-[#0D9668]" : "text-gray-500"
                }`}>
                  {members.find(m => m.isYou)?.positive ? "You are Owed" : "You Owe"}
                </p>
                <p className={`text-lg sm:text-xl font-bold ${
                  members.find(m => m.isYou)?.positive ? "text-[#0D9668]" : "text-gray-800"
                }`}>
                  {members.find(m => m.isYou)?.balance || "₹0"}
                </p>
              </div>
            </div>

            {/* Tab content: Expenses = recent expenses; Members = members card; Summary = summary card */}
            {activeTab === "expenses" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-gray-800">Recent Expenses</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <button type="button" className="flex items-center gap-1.5 text-[#14D38E] font-medium hover:underline">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Filter
                    </button>
                    <button type="button" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Date
                    </button>
                  </div>
                </div>
                <ul className="divide-y divide-gray-100">
                  {expenses.length === 0 ? (
                    <li className="p-8 text-center text-gray-500">
                      <p className="mb-2">No expenses yet</p>
                      <button
                        type="button"
                        onClick={onAddExpense}
                        className="text-[#14D38E] font-medium hover:underline cursor-pointer"
                      >
                        Add your first expense
                      </button>
                    </li>
                  ) : (
                    expenses.map((exp) => (
                      <li key={exp.id} className="p-4 hover:bg-gray-50/50 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${exp.iconBg} text-white`}>
                            <ExpenseIcon type={exp.icon} className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800">{exp.title}</p>
                            <p className="text-xs sm:text-sm text-gray-500">Paid by {exp.paidBy} • {exp.when}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold text-gray-800">{exp.amount}</p>
                            <p className="text-xs text-gray-500">{exp.split}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}

            {activeTab === "members" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#E8FBF4] text-[#2ecc71] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    Trip Members
                  </h3>
                  <button type="button" className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8v-8m-8 0v8" />
                    </svg>
                  </button>
                </div>
                <ul className="p-4 space-y-4">
                  {members.length === 0 ? (
                    <li className="text-center text-gray-500 py-4">No members found</li>
                  ) : (
                    members.map((m) => (
                      <li key={m.id} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm shrink-0 overflow-hidden ${
                            m.isYou ? "bg-[#E8FBF4] text-[#2ecc71]" : "bg-gray-200"
                          }`}>
                            {m.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 truncate">{m.name}</p>
                            {m.isAdmin && <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mt-0.5">ADMIN</p>}
                          </div>
                        </div>
                        <span className={`text-sm font-semibold shrink-0 ${m.positive === true ? "text-[#2ecc71]" : m.positive === false ? "text-red-600" : "text-gray-500"}`}>
                          {m.balance || "₹0"}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
                {members.length > 0 && (
                  <div className="p-4 border-t border-gray-100">
                    <button type="button" className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                      View All {members.length} Member{members.length !== 1 ? "s" : ""}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "chat" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#E8FBF4] text-[#2ecc71] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </span>
                    Trip Chat
                  </h3>
                </div>
                <div className="p-8 text-center text-gray-500 text-sm">
                  Chat with trip members — coming soon.
                </div>
              </div>
            )}

            {activeTab === "summary" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#E8FBF4] text-[#2ecc71] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </span>
                    Trip Summary
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-gray-600 text-sm">Total trip spend is ₹42,500 across 5 members. Your share is ₹8,500. You are owed ₹2,400.</p>
                  <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-800 mb-2">Settlement overview</p>
                    <ul className="space-y-1">
                      <li>Priya Singh owes you ₹1,200</li>
                      <li>Neha Kapoor owes you ₹800</li>
                      <li>Rahul Sharma — settled</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar – Trip Members, Quick Settle Up, Map */}
          <div className="lg:w-[320px] xl:w-[360px] lg:shrink-0 space-y-4">
            {/* Trip Members – light card, green icon, gray View All button */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#E8FBF4] text-[#2ecc71] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  Trip Members
                </h3>
                <button type="button" className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8v-8m-8 0v8" />
                  </svg>
                </button>
              </div>
              <ul className="p-4 space-y-4">
                {members.map((m, i) => (
                  <li key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm shrink-0 overflow-hidden">
                        {m.name.startsWith("You") ? "AM" : m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 truncate">{m.name}</p>
                        {m.role && <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mt-0.5">{m.role}</p>}
                      </div>
                    </div>
                    <span className={`text-sm font-semibold shrink-0 ${m.positive === true ? "text-[#2ecc71]" : m.positive === false ? "text-red-600" : "text-gray-500"}`}>
                      {m.balance}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="p-4 border-t border-gray-100">
                <button type="button" onClick={() => setActiveTab("members")} className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors">
                  View All 5 Members
                </button>
              </div>
            </div>

            {/* Quick Settle Up */}
            <div className="relative rounded-xl bg-[#1a2d3d] p-4 shadow-lg overflow-hidden">
              {/* Subtle QR-style pattern on the right */}
              <div className="absolute right-0 top-0 bottom-0 w-24 opacity-15 pointer-events-none flex items-center">
                <svg viewBox="0 0 24 24" className="w-16 h-16 text-white" fill="currentColor">
                  <rect x="0" y="0" width="4" height="4" /><rect x="5" y="0" width="4" height="4" /><rect x="10" y="0" width="4" height="4" /><rect x="15" y="0" width="4" height="4" /><rect x="20" y="0" width="4" height="4" />
                  <rect x="0" y="5" width="4" height="4" /><rect x="10" y="5" width="4" height="4" /><rect x="20" y="5" width="4" height="4" />
                  <rect x="0" y="10" width="4" height="4" /><rect x="5" y="10" width="4" height="4" /><rect x="10" y="10" width="4" height="4" /><rect x="15" y="10" width="4" height="4" /><rect x="20" y="10" width="4" height="4" />
                  <rect x="0" y="15" width="4" height="4" /><rect x="10" y="15" width="4" height="4" /><rect x="20" y="15" width="4" height="4" />
                  <rect x="0" y="20" width="4" height="4" /><rect x="5" y="20" width="4" height="4" /><rect x="10" y="20" width="4" height="4" /><rect x="15" y="20" width="4" height="4" /><rect x="20" y="20" width="4" height="4" />
                </svg>
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#14D38E]/20 text-[#14D38E] flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <h3 className="font-bold text-lg text-white">Quick Settle Up</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">Pending dues from others: <span className="text-[#14D38E] font-semibold">₹2,400</span></p>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#14D38E] text-white font-bold hover:bg-[#11B97C] transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Request All via UPI
                </button>
                <p className="text-gray-400 text-xs mt-2 text-center">Supports PhonePe, GPay, Paytm & others.</p>
              </div>
            </div>

            {/* Route Map */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="relative h-40 sm:h-48 bg-gray-200">
                <span className="absolute top-2 right-2 px-2 py-1 rounded bg-white/90 text-xs font-medium text-gray-500 shadow-sm">Route Map</span>
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">Map</div>
              </div>
              <div className="p-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 18h16" />
                  </svg>
                  142km traveled
                </span>
                <span className="font-medium text-[#0D9668]">Next Stop: Solang Valley</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAB – Add Expenses (opens Add New Expense screen) */}
      <div className="fixed right-4 sm:right-6 bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:bottom-6 z-50">
        <button
          type="button"
          onClick={onAddExpense}
          className="rounded-full bg-[#14D38E] shadow-lg flex items-center gap-2 pl-4 pr-5 sm:pl-5 sm:pr-6 h-14 sm:h-16 text-white hover:bg-[#11B97C] transition-colors touch-manipulation font-semibold text-sm sm:text-base"
          aria-label="Add Expenses"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Expenses
        </button>
      </div>
    </div>
  );
};

export default TripDetails;
