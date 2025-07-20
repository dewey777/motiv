"use client";

import { motion } from "framer-motion";

interface PointsDisplayProps {
  points: number;
  totalLikesReceived: number;
  totalMessagesSent: number;
}

export const PointsDisplay = ({
  points,
  totalLikesReceived,
  totalMessagesSent,
}: PointsDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-4 rounded-2xl border border-orange-100 text-gray-600"
    >
      <div className="text-center">
        <div className="text-2xl mb-2">✨</div>
        <h4 className="font-bold text-sm mb-2 font-nunito">Your Impact</h4>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-nunito">Points:</span>
            <div className="flex items-center space-x-1">
              <span className="font-bold">{points}</span>
              <span>🏆</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-nunito">Likes received:</span>
            <div className="flex items-center space-x-1">
              <span>{totalLikesReceived}</span>
              <span>💙</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-nunito">Messages sent:</span>
            <div className="flex items-center space-x-1">
              <span>{totalMessagesSent}</span>
              <span>⛵</span>
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs opacity-90 font-nunito">
          Spread kindness, earn points! 💫
        </div>
      </div>
    </motion.div>
  );
};
