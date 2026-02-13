import React, { useState, useMemo, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { tripAPI, expenseAPI } from "../services/api";
import { useApi } from "../hooks/useApi";
import { validateAmount, validateTripName } from "../utils/validation";
import LoadingButton from "../components/LoadingButton";
import toast from "react-hot-toast";

const CATEGORIES = [
  { id: "food", label: "Food", icon: "fork-knife" },
  { id: "transport", label: "Transport", icon: "bus" },
  { id: "stay", label: "Stay", icon: "bed" },
  { id: "tickets", label: "Tickets", icon: "ticket" },
  { id: "other", label: "Other", icon: "dots" },
];

const SPLIT_METHODS = [
  { id: "equally", label: "Equally" },
  { id: "custom", label: "Custom ₹" },
  { id: "percentage", label: "Percentage %" },
];

const AddNewExpense = ({ onBack, onSave, tripName }) => {
  const { tripId } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [paidBy, setPaidBy] = useState("");
  const [splitMethod, setSplitMethod] = useState("equally");
  const [everyoneSelected, setEveryoneSelected] = useState(true);
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [customAmounts, setCustomAmounts] = useState({});
  const [percentages, setPercentages] = useState({});
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const { execute, loading } = useApi();

  useEffect(() => {
    loadTripMembers();
  }, [tripId]);

  const loadTripMembers = async () => {
    const id = tripId || location.state?.trip?.tripId;
    if (!id) return;

    await execute(
      () => tripAPI.getById(id),
      {
        silent: true,
        onSuccess: (data) => {
          const trip = data.data;
          const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
          const userId = currentUser._id || currentUser.id;
          
          const membersList = (trip.members_id || []).map(member => ({
            id: member._id || member.id,
            name: member.user_full_name || "Unknown",
            isYou: (member._id || member.id) === userId,
          }));
          
          setMembers(membersList);
          if (membersList.length > 0) {
            setPaidBy(membersList.find(m => m.isYou)?.id || membersList[0].id);
            setSelectedMemberIds(membersList.map(m => m.id));
          }
        },
      }
    );
  };

  const amountNum = useMemo(() => {
    const n = parseFloat(String(amount).replace(/[^0-9.]/g, "")) || 0;
    return Math.round(n * 100) / 100;
  }, [amount]);

  const splitCount = everyoneSelected ? members.length : selectedMemberIds.length;
  const perPerson = splitCount > 0 && amountNum >= 0 ? Math.round((amountNum / splitCount) * 100) / 100 : 0;

  const splitMembersOrdered = useMemo(() => {
    const ids = everyoneSelected ? members.map((m) => m.id) : selectedMemberIds;
    const list = members.filter((m) => ids.includes(m.id));
    if (splitMethod === "custom") return [...list].sort((a, b) => (a.isYou ? 1 : 0) - (b.isYou ? 1 : 0));
    if (splitMethod === "percentage") return [...list].sort((a, b) => (b.isYou ? 1 : 0) - (a.isYou ? 1 : 0));
    return list;
  }, [everyoneSelected, selectedMemberIds, splitMethod]);

  const totalPercentage = useMemo(() => {
    return splitMembersOrdered.reduce((sum, m) => sum + (parseFloat(percentages[m.id]) || 0), 0);
  }, [splitMembersOrdered, percentages]);

  const percentageMissing = useMemo(() => Math.round((100 - totalPercentage) * 100) / 100, [totalPercentage]);

  const splitSummaryText = useMemo(() => {
    if (splitMethod === "equally" && splitCount > 0) {
      return `Splitting ₹${amountNum.toFixed(2)} equally between ${splitCount} people (₹${perPerson.toFixed(2)} each).`;
    }
    if (splitMethod === "custom") return "Enter custom amounts for each person.";
    if (splitMethod === "percentage") return "Enter percentage share for each person.";
    return "Select who to split between.";
  }, [splitMethod, splitCount, amountNum, perPerson]);

  const setCustomAmount = (id, value) => {
    setCustomAmounts((prev) => ({ ...prev, [id]: value.replace(/[^0-9.]/g, "") }));
  };

  const setPercentage = (id, value) => {
    const v = value.replace(/[^0-9.]/g, "");
    if (v === "" || (parseFloat(v) >= 0 && parseFloat(v) <= 100)) {
      setPercentages((prev) => ({ ...prev, [id]: v }));
    }
  };

  const toggleMember = (id) => {
    if (everyoneSelected) {
      setEveryoneSelected(false);
      setSelectedMemberIds(members.map((m) => m.id).filter((x) => x !== id));
    } else {
      setSelectedMemberIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const setEveryone = () => {
    setEveryoneSelected(true);
    setSelectedMemberIds(members.map((m) => m.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const titleValidation = validateTripName(title);
    const amountValidation = validateAmount(amount);
    
    if (!titleValidation.valid || !amountValidation.valid) {
      const newErrors = {};
      if (!titleValidation.valid) newErrors.title = titleValidation.message;
      if (!amountValidation.valid) newErrors.amount = amountValidation.message;
      setErrors(newErrors);
      return;
    }

    if (!paidBy) {
      setErrors({ ...errors, paidBy: "Please select who paid" });
      return;
    }

    const tripIdToUse = tripId || location.state?.trip?.tripId;
    if (!tripIdToUse) {
      toast.error("Trip ID not found");
      return;
    }

    // Build split_between array
    const splitBetween = [];
    const memberIdsToSplit = everyoneSelected ? members.map(m => m.id) : selectedMemberIds;
    
    if (splitMethod === "equally") {
      const perPerson = amountNum / memberIdsToSplit.length;
      memberIdsToSplit.forEach(memberId => {
        splitBetween.push({
          user_id: memberId,
          amount: perPerson,
        });
      });
    } else if (splitMethod === "custom") {
      memberIdsToSplit.forEach(memberId => {
        const customAmount = parseFloat(customAmounts[memberId] || 0);
        if (customAmount > 0) {
          splitBetween.push({
            user_id: memberId,
            amount: customAmount,
          });
        }
      });
    } else if (splitMethod === "percentage") {
      if (Math.abs(100 - totalPercentage) > 0.01) {
        toast.error(`Percentages must add up to 100% (currently ${totalPercentage}%)`);
        return;
      }
      memberIdsToSplit.forEach(memberId => {
        const percentage = parseFloat(percentages[memberId] || 0);
        const amountForMember = (amountNum * percentage) / 100;
        if (amountForMember > 0) {
          splitBetween.push({
            user_id: memberId,
            amount: amountForMember,
          });
        }
      });
    }

    if (splitBetween.length === 0) {
      toast.error("Please select at least one person to split with");
      return;
    }

    await execute(
      () => expenseAPI.create({
        trip_id: tripIdToUse,
        expense_title: title.trim(),
        amount: amountNum,
        category,
        paid_by_id: paidBy,
        split_between: splitBetween,
      }),
      {
        successMessage: "Expense added successfully!",
        errorMessage: "Failed to add expense",
        onSuccess: () => {
          onSave?.();
          onBack();
        },
      }
    );
  };

  const CategoryIcon = ({ type }) => {
    if (type === "fork-knife")
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 2v10m0 0l-1.5 1.5M9 12l1.5 1.5M15 2v10m0 0l-1.5 1.5M15 12l1.5 1.5" />
        </svg>
      );
    if (type === "bus")
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-5 6h6M5 17h14a2 2 0 002-2v-4l-2-4H9l-2 4v4a2 2 0 002 2z" />
        </svg>
      );
    if (type === "bed")
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    if (type === "ticket")
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      );
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col pb-8">
      <div className="flex-1 max-w-[640px] mx-auto w-full px-4 sm:px-8 pt-5 sm:pt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#374151] text-sm font-normal mb-3 touch-manipulation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Trip
        </button>
        <h1 className="text-2xl sm:text-[28px] font-bold text-[#1F2937] tracking-tight">Add New Expense</h1>
        <p className="text-[#6B7280] text-sm sm:text-base mt-1 mb-8">Split the bill effortlessly with your travel squad.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-5 sm:p-6 space-y-5">
            {/* Expense Title + Amount in one row */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
              <div className="flex-1 min-w-0 sm:flex-[0.6]">
                <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-2">Expense Title</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (errors.title) setErrors({ ...errors, title: null });
                    }}
                    placeholder="e.g. Dinner at Taj Mahal"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border bg-[#F9FAFB] focus:outline-none focus:ring-1 text-[#1F2937] placeholder-[#9CA3AF] ${
                      errors.title ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[#E5E7EB] focus:border-[#2ecc71] focus:ring-[#2ecc71]"
                    }`}
                    required
                  />
                </div>
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                )}
              </div>
              <div className="min-w-0 sm:w-[40%] sm:flex-[0.4]">
                <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-2">Amount (₹)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5563] font-medium">₹</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      if (errors.amount) setErrors({ ...errors, amount: null });
                    }}
                    placeholder="0.00"
                    className={`w-full pl-8 pr-4 py-3 rounded-lg border bg-[#F9FAFB] focus:outline-none focus:ring-1 text-[#1F2937] placeholder-[#9CA3AF] ${
                      errors.amount ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[#2ecc71]/40 focus:border-[#2ecc71] focus:ring-[#2ecc71]"
                    }`}
                    required
                  />
                </div>
                {errors.amount && (
                  <p className="mt-1 text-xs text-red-500">{errors.amount}</p>
                )}
              </div>
            </div>

            {/* Category - small square-ish buttons */}
            <div>
              <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`flex items-center justify-center gap-1.5 min-w-[72px] py-2.5 px-3 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
                      category === c.id
                        ? "bg-[#2ecc71] text-white shadow-sm"
                        : "bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] border border-[#E5E7EB]"
                    }`}
                  >
                    <CategoryIcon type={c.icon} />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Paid By */}
            <div>
              <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-2">Paid By</label>
              <select
                value={paidBy}
                onChange={(e) => {
                  setPaidBy(e.target.value);
                  if (errors.paidBy) setErrors({ ...errors, paidBy: null });
                }}
                className={`w-full px-4 py-3 rounded-lg border bg-[#F9FAFB] focus:outline-none focus:ring-1 text-[#1F2937] appearance-none bg-no-repeat bg-[length:12px] bg-[right_12px_center] pr-10 ${
                  errors.paidBy ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[#E5E7EB] focus:border-[#2ecc71] focus:ring-[#2ecc71]"
                }`}
                required
              >
                <option value="">Select who paid</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.isYou ? `You (${member.name})` : member.name}
                  </option>
                ))}
              </select>
              {errors.paidBy && (
                <p className="mt-1 text-xs text-red-500">{errors.paidBy}</p>
              )}
              <p className="flex items-center gap-1.5 text-[#9CA3AF] text-xs mt-2">
                <span className="w-1 h-1 rounded-full bg-[#9CA3AF]" />
                The person who initially paid the full amount.
              </p>
            </div>

            {/* Split Between */}
            <div>
              <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-2">Split Between</label>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {everyoneSelected ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2ecc71] bg-white text-[#0D9668] text-sm font-medium">
                    Everyone
                    <button type="button" onClick={() => { setEveryoneSelected(false); setSelectedMemberIds([]); }} className="hover:opacity-80 text-[#0D9668]" aria-label="Remove everyone">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={setEveryone}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] text-sm font-medium hover:bg-[#F9FAFB]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8v-8m-8 0v8" />
                  </svg>
                  Add Member
                </button>
              </div>
              <ul className="space-y-2">
                {members.map((m) => {
                  const selected = everyoneSelected || selectedMemberIds.includes(m.id);
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => toggleMember(m.id)}
                        className="w-full flex items-center justify-between gap-3 p-3 rounded-lg border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center text-[#4B5563] font-medium text-sm">
                            {m.name.startsWith("You") ? "A" : m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <span className="font-medium text-[#1F2937]">{m.name}</span>
                        </div>
                        {selected && (
                          <span className="text-[#2ecc71]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Split Method - tabs (active: green text on white + border; inactive: grey) */}
            <div>
              <label className="block text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider mb-2">Split Method</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {SPLIT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSplitMethod(m.id)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
                      splitMethod === m.id
                        ? "bg-white text-[#2ecc71] border border-[#2ecc71]/50 shadow-sm"
                        : "bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB] hover:bg-[#E5E7EB]"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {splitMethod === "equally" && (
                <div className="rounded-lg bg-[#E8FBF4] border border-[#2ecc71]/20 px-4 py-3">
                  <p className="text-sm font-medium text-[#1F2937]">{splitSummaryText}</p>
                </div>
              )}

              {splitMethod === "custom" && (
                <div className="space-y-3">
                  {splitMembersOrdered.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between gap-4 p-3 rounded-lg border border-[#E5E7EB] bg-white"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${m.isYou ? "ring-2 ring-[#2ecc71] bg-[#E8FBF4] text-[#2ecc71]" : "bg-[#E5E7EB] text-[#4B5563]"}`}>
                          {m.name.startsWith("You") ? "A" : m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1F2937]">{m.name}</p>
                          <p className="text-xs text-[#9CA3AF]">Manual share</p>
                        </div>
                      </div>
                      <div className="flex items-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 min-w-[100px]">
                        <span className="text-[#6B7280] font-medium">₹</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          value={customAmounts[m.id] ?? ""}
                          onChange={(e) => setCustomAmount(m.id, e.target.value)}
                          placeholder="0"
                          className="w-full min-w-0 bg-transparent pl-1 font-semibold text-[#1F2937] focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {splitMethod === "percentage" && (
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-semibold text-[#4B5563] uppercase tracking-wider px-1">
                    <span>Member</span>
                    <span>Percentage (%)</span>
                  </div>
                  {splitMembersOrdered.map((m) => {
                    const pct = parseFloat(percentages[m.id]) || 0;
                    const memberAmount = amountNum > 0 ? (amountNum * pct) / 100 : 0;
                    return (
                      <div
                        key={m.id}
                        className="flex items-center justify-between gap-4 p-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB]"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${m.isYou ? "bg-[#E8FBF4] text-[#2ecc71] ring-2 ring-[#2ecc71]/30" : "bg-[#E5E7EB] text-[#4B5563]"}`}>
                            {m.name.startsWith("You") ? "A" : m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1F2937]">{m.name}</p>
                            <p className="text-xs text-[#6B7280]">₹{memberAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
                          </div>
                        </div>
                        <div className="flex items-center rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 w-20">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={percentages[m.id] ?? ""}
                            onChange={(e) => setPercentage(m.id, e.target.value)}
                            className="w-full bg-transparent font-semibold text-[#1F2937] text-right focus:outline-none"
                          />
                          <span className="text-[#6B7280] font-medium ml-0.5">%</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-semibold text-[#1F2937]">Total Assigned</span>
                      <span className={`font-semibold ${totalPercentage === 100 ? "text-[#2ecc71]" : "text-red-600"}`}>
                        {totalPercentage}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${totalPercentage === 100 ? "bg-[#2ecc71]" : "bg-red-500"}`}
                        style={{ width: `${Math.min(100, totalPercentage)}%` }}
                      />
                    </div>
                  </div>
                  {totalPercentage !== 100 && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-500 text-white px-4 py-3">
                      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-xs font-bold uppercase tracking-wide">
                        Percentages must add up to exactly 100%. {percentageMissing > 0 ? `(Missing ${percentageMissing}%)` : `(Over by ${-percentageMissing}%)`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bill Photo */}
            <div>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#2ecc71] hover:text-[#2ecc71] transition-colors w-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
                Add bill photo
              </button>
              <p className="text-xs text-[#9CA3AF] mt-1.5">Optional Upload receipt for verification</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 py-3.5 rounded-lg border border-[#D1D5DB] bg-white text-[#374151] font-semibold hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
              <LoadingButton
                type="submit"
                loading={loading}
                className="flex-1 py-3.5 rounded-lg bg-[#2ecc71] text-white font-bold uppercase text-sm tracking-wide hover:bg-[#27ae60] flex items-center justify-center gap-2 shadow-sm"
                variant="primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                SAVE EXPENSE
              </LoadingButton>
            </div>
          </div>

          {/* Admin banner - light green, lock icon, "Admin Control Active" in green */}
          <div className="rounded-xl bg-[#E8FBF4] border border-[#2ecc71]/20 p-4 flex items-start gap-3">
            <span className="text-[#2ecc71] shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-[#2ecc71]">Admin Control Active</p>
              <p className="text-sm text-[#4B5563] mt-0.5">
                As the trip admin, you can edit or remove this expense later if needed. All group members will be notified instantly.
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Footer - very small, light grey */}
      <footer className="text-center text-[#9CA3AF] text-[11px] py-6">
        ©2024 TripSplit India. Made for adventurers.
      </footer>

      {/* FAB - vibrant green, chat bubble, red badge */}
      <div className="fixed right-5 sm:right-8 bottom-6 z-50">
        <button
          type="button"
          className="w-14 h-14 rounded-full bg-[#2ecc71] shadow-lg flex items-center justify-center text-white hover:bg-[#27ae60] relative"
          aria-label="Chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">1</span>
        </button>
      </div>
    </div>
  );
};

export default AddNewExpense;
