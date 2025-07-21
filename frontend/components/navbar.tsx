"use client";

import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export function Navbar() {
  const { isAuthenticated, principal, login, logout, isLoading } = useAuth();
  console.log({ isAuthenticated, principal });
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
      <Link href="/">
        <h1 className="text-2xl font-bold text-vermillion-400 font-baloo-2">
          Motiv
        </h1>
      </Link>
      <div className="flex items-center space-x-6">
        <nav className="font-nunito space-x-6 text-sm">
          <Link href="/" className="hover:underline text-slate-600">
            Home
          </Link>
          <Link href="/features" className="hover:underline text-slate-600">
            Features
          </Link>
          <Link href="/community" className="hover:underline text-slate-600">
            Community
          </Link>
          {isAuthenticated && (
            <Link href="/chat" className="hover:underline text-slate-600">
              Chat
            </Link>
          )}
        </nav>

        {isLoading ? (
          <div className="flex items-center space-x-2 font-nunito">
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
