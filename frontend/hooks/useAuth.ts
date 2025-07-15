"use client";

import { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";

export interface AuthState {
  isAuthenticated: boolean;
  identity: Identity | null;
  principal: string | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    identity: null,
    principal: null,
    isLoading: true,
  });

  const [authClient, setAuthClient] = useState<AuthClient | null>(null);

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
    } catch (error) {
      console.error("Failed to initialize auth client:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const login = async () => {
    if (!authClient) return;

    try {
      await authClient.login({
        identityProvider:
          process.env.NEXT_PUBLIC_II_URL || "https://identity.ic0.app",
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days in nanoseconds
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
        onError: (error) => {
          console.error("Login failed:", error);
        },
      });
    } catch (error) {
      console.error("Login error:", error);
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
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    ...authState,
    login,
    logout,
  };
};
