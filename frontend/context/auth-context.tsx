// context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";
import { useRouter } from "next/navigation";

interface AuthState {
  isAuthenticated: boolean;
  identity: Identity | null;
  principal: string | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    identity: null,
    principal: null,
    isLoading: true,
  });
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const router = useRouter();

  useEffect(() => {
    initAuthClient();
  }, []);

  const initAuthClient = async () => {
    try {
      const client = await AuthClient.create();
      setAuthClient(client);

      const isAuthenticated = await client.isAuthenticated();

      if (isAuthenticated) {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal().toString();

        setAuthState({
          isAuthenticated: true,
          identity,
          principal,
          isLoading: false,
        });
      } else {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    } catch (err) {
      console.error("Init auth failed:", err);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const login = async () => {
    if (!authClient) return;

    try {
      await authClient.login({
        identityProvider:
          process.env.NEXT_PUBLIC_II_URL || "https://identity.ic0.app",
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days
        onSuccess: () => {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toString();

          setAuthState({
            isAuthenticated: true,
            identity,
            principal,
            isLoading: false,
          });
        },
        onError: (err) => {
          console.error("Login failed:", err);
        },
      });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const logout = async () => {
    if (!authClient) return;
    try {
      await authClient.logout();
      setAuthState({
        isAuthenticated: false,
        identity: null,
        principal: null,
        isLoading: false,
      });
      // Redirect to home page after logout
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
