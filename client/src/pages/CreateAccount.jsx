import React, { useState } from "react";

const CreateAccount = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const getStrength = (pwd) => {
    if (!pwd) return { label: "None", width: "0%", color: "bg-gray-200" };
    if (pwd.length < 5) return { label: "Weak", width: "33%", color: "bg-red-400" };
    if (pwd.length < 8) return { label: "Medium", width: "66%", color: "bg-amber-400" };
    return { label: "Strong", width: "100%", color: "bg-green-500" };
  };
  const strength = getStrength(password);

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col font-sans">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#14D38E] flex items-center justify-center shrink-0">
              <span className="text-[#0D9668] font-black text-lg leading-none">E</span>
            </div>
            <span className="font-bold text-lg text-gray-800 tracking-tight">
              Trip Expense Calculator
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:inline">Already have an account?</span>
            <button
              type="button"
              onClick={onLogin}
              className="cursor-pointer px-4 py-2 rounded-xl bg-[#14D38E] text-white text-sm font-bold hover:bg-[#11B97C] transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main - Form Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border-t-4 border-[#E07C5C] overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Create Your Account
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Start managing group expenses with ease.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14D38E] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14D38E] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14D38E] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.558 5.376l-3.29-3.29" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">Strength:</span>
                    <span className="font-medium text-gray-600">{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex gap-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-[#14D38E] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#11B97C] transition-colors"
              >
                Sign Up
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onLogin}
                className="text-[#14D38E] font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-2">
          ©2024 TripExpense. Crafted for Indian Travelers.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <a href="#privacy" className="text-gray-500 hover:text-[#14D38E]">Privacy Policy</a>
          <a href="#terms" className="text-gray-500 hover:text-[#14D38E]">Terms of Service</a>
          <a href="#support" className="text-gray-500 hover:text-[#14D38E]">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default CreateAccount;
