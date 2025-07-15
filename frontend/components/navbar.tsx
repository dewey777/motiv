"use client";

import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { isAuthenticated, principal, login, logout, isLoading } = useAuth();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  const formatPrincipal = (principal: string) => {
    if (principal.length <= 10) return principal;
    return `${principal.slice(0, 5)}...${principal.slice(-5)}`;
  };

  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-4 shadow-sm">
      <h1 className="text-2xl font-bold text-vermillion-400 font-baloo-2">
        Motiv
      </h1>
      <div className="flex items-center space-x-6">
        <nav className="space-x-6 text-sm">
          <a href="#" className="hover:underline text-slate-600">
            Home
          </a>
          <a href="#" className="hover:underline text-slate-600">
            Features
          </a>
          <a href="#" className="hover:underline text-slate-600">
            Pricing
          </a>
        </nav>

        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-vermillion-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-slate-600">Loading...</span>
          </div>
        ) : isAuthenticated && principal ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-600 font-mono">
              {formatPrincipal(principal)}
            </span>
            <button
              onClick={handleAuthClick}
              className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleAuthClick}
            className="bg-vermillion-400 hover:bg-vermillion-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}
