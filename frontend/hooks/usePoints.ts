"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

interface UserPoints {
  points: number;
  totalLikesReceived: number;
  totalMessagesSent: number;
}

export const usePoints = () => {
  const { principal } = useAuth();
  const [userPoints, setUserPoints] = useState<UserPoints>({
    points: 0,
    totalLikesReceived: 0,
    totalMessagesSent: 0,
  });

  // Load points from localStorage on mount
  useEffect(() => {
    if (principal) {
      const savedPoints = localStorage.getItem(`userPoints_${principal}`);
      if (savedPoints) {
        setUserPoints(JSON.parse(savedPoints));
      }
    }
  }, [principal]);

  // Save points to localStorage whenever points change
  useEffect(() => {
    if (principal) {
      localStorage.setItem(
        `userPoints_${principal}`,
        JSON.stringify(userPoints)
      );
    }
  }, [userPoints, principal]);

  const addLikePoint = () => {
    setUserPoints((prev) => ({
      ...prev,
      points: prev.points + 1,
      totalLikesReceived: prev.totalLikesReceived + 1,
    }));
  };

  const incrementMessageCount = () => {
    setUserPoints((prev) => ({
      ...prev,
      totalMessagesSent: prev.totalMessagesSent + 1,
    }));
  };

  const simulateLikeReceived = () => {
    // Simulate receiving a like on a message you sent
    addLikePoint();

    // Show notification
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("Someone liked your message! 💙", {
          body: "You earned 1 point for spreading positivity!",
          icon: "/motiv.ico",
        });
      }
    }
  };

  return {
    userPoints,
    addLikePoint,
    incrementMessageCount,
    simulateLikeReceived,
  };
};
