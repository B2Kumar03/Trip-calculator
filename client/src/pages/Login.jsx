import React, { useState } from "react";
import LoadingButton from "../components/LoadingButton";
import { useApi } from "../hooks/useApi";
import { userAPI } from "../services/api";
import { validateEmail, validatePassword } from "../utils/validation";

const Login = ({ onSignUp, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { execute, loading } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    if (!emailValidation.valid || !passwordValidation.valid) {
      const newErrors = {};
      if (!emailValidation.valid) newErrors.email = emailValidation.message;
      if (!passwordValidation.valid) newErrors.password = passwordValidation.message;
      setErrors(newErrors);
      return;
    }

    await execute(
      () => userAPI.getByEmail(email.trim().toLowerCase()),
      {
        successMessage: "Login successful!",
        errorMessage: "Invalid email or password",
        onSuccess: (data) => {
          // Store user data
          localStorage.setItem("user", JSON.stringify(data.data));
          if (onLoginSuccess) onLoginSuccess();
        },
      }
    );
  };

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
            <span className="text-sm text-gray-500 hidden sm:inline">New user?</span>
            <button
              type="button"
              onClick={onSignUp}
              className="cursor-pointer px-4 py-2 rounded-xl bg-[#14D38E] text-white text-sm font-bold hover:bg-[#11B97C] transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main - Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border-t-4 border-[#E07C5C] overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Enter your credentials to manage your trip expenses.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                  User ID / Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 rounded-xl border text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14D38E] focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#forgot" className="text-sm text-[#14D38E] font-medium hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: null });
                    }}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 pr-12 rounded-xl border text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14D38E] focus:border-transparent ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    }`}
                    required
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
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
              </div>

              <LoadingButton
                type="submit"
                loading={loading}
                className="w-full mt-2 py-3.5"
                variant="primary"
              >
                Login
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </LoadingButton>
            </form>

            {/* Invited by Admin notice */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E07C5C] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Invited by Admin?</p>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                  Please check your email for the invitation link or contact your travel administrator to activate your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-2">
          © 2024 TripExpense. Crafted for Indian Travelers.
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

export default Login;
