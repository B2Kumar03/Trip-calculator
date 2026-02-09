import React, { useState } from "react";

const Profile = ({ onBack, onSignOut }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#F0F2F5] pb-24">
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
        {/* Top Profile Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button type="button" className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#2ecc71] border-2 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Rahul Sharma</h1>
              <p className="text-sm text-gray-600 mb-2">Travel Enthusiast | rahul.sharma@travelmail.in</p>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#E8FBF4] text-[#2ecc71] text-xs font-bold">PREMIUM MEMBER</span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">TRAVELER ID: #IND-9021</span>
              </div>
            </div>
            <button type="button" onClick={() => setEditMode(!editMode)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2ecc71] text-white font-semibold hover:bg-[#27ae60] shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              Edit Profile
            </button>
          </div>
        </div>

        {/* ACCOUNT & SECURITY */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">ACCOUNT & SECURITY</h2>
          <div className="space-y-2">
            <button type="button" className="w-full bg-white rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-[#E8FBF4] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-gray-900 mb-0.5">Change Password</p>
                <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <button type="button" className="w-full bg-white rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-[#E8FBF4] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-gray-900 mb-0.5">Notification Preferences</p>
                <p className="text-sm text-gray-500">Manage WhatsApp, Email, and Push alerts for your trips</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <button type="button" className="w-full bg-white rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-[#E8FBF4] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-gray-900 mb-0.5">Admin Settings</p>
                <p className="text-sm text-gray-500">Access user management and system configuration</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* SUPPORT & INFORMATION */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">SUPPORT & INFORMATION</h2>
          <div className="space-y-2">
            <button type="button" className="w-full bg-white rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-[#E8FBF4] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-gray-900 mb-0.5">Help & Support</p>
                <p className="text-sm text-gray-500">FAQs, contact us, and chat with travel experts</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <button type="button" className="w-full bg-white rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-[#E8FBF4] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#2ecc71]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-gray-900 mb-0.5">Privacy Policy & Terms</p>
                <p className="text-sm text-gray-500">How we handle your data and app usage rules</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <button type="button" onClick={onSignOut} className="w-full bg-white rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-gray-900 mb-0.5">Logout</p>
                <p className="text-sm text-gray-500">Securely sign out of your account</p>
              </div>
              <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-4 mb-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <p className="text-xs text-gray-400 mb-1">TripSplit.in v3.4.2-IND</p>
          <p className="text-xs text-gray-500">Made for Indian Travelers with ❤️</p>
        </div>
      </main>

      {/* Floating Chat Button */}
      <button type="button" className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#2ecc71] shadow-lg flex items-center justify-center text-white hover:bg-[#27ae60] transition-colors z-40" style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))" }} aria-label="Chat Support">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      </button>
    </div>
  );
};

export default Profile;
