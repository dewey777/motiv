"use client";
import { useAuth } from "@/context/auth-context";
import { Dashboard } from "@/components/hero/dashboard";
import { HeroSection } from "@/components/hero/hero";

export default function HeroPage() {
  const { isAuthenticated, principal, isLoading } = useAuth();
  console.log({ isAuthenticated, principal, isLoading });
  return principal ? <Dashboard /> : <HeroSection />;
}
