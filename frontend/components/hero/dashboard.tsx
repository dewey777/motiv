"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import Link from "next/link";

export const Dashboard = () => {
  const [userStats] = useState({
    myPosts: 3,
    heartTemperature: 42,
    totalLikes: 15,
    weeklyBestTalk: "스트레스 관리에 도움이 되는 방법들",
  });

  return (
    <main className="relative min-h-screen w-full text-gray-600 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-[#FFB6C1]/30 to-[#FFC0CB]/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-[#B5EAD7]/40 to-[#C7CEEA]/40 rounded-full blur-sm"
        />
      </div>

      <Navbar />

      <section className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-[#FF6F61]"
            style={{ fontFamily: "var(--font-baloo-2)" }}
          >
            Welcome Back! 👋
          </h1>
          <p
            className="text-lg text-[#374151]"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Here&apos;s your mental wellness dashboard
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Heart Temperature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🌡️</div>
              <h3
                className="text-lg font-bold text-gray-800 mb-2"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Heart Temperature
              </h3>
              <div className="text-3xl font-bold text-rose-500 mb-1">
                {userStats.heartTemperature}°C
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-rose-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(userStats.heartTemperature / 50) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">Based on received likes</p>
            </div>
          </motion.div>

          {/* My Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">📝</div>
              <h3
                className="text-lg font-bold text-gray-800 mb-2"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                My Posts
              </h3>
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {userStats.myPosts}
              </div>
              <p className="text-sm text-gray-600">Community posts</p>
            </div>
          </motion.div>

          {/* Total Likes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">❤️</div>
              <h3
                className="text-lg font-bold text-gray-800 mb-2"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Total Likes
              </h3>
              <div className="text-3xl font-bold text-green-500 mb-2">
                {userStats.totalLikes}
              </div>
              <p className="text-sm text-gray-600">From community</p>
            </div>
          </motion.div>

          {/* Weekly Best Talk */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h3
                className="text-lg font-bold text-gray-800 mb-2"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                This Week&apos;s Best
              </h3>
              <p className="text-sm text-purple-600 font-medium text-center px-2">
                &quot;{userStats.weeklyBestTalk}&quot;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8"
        >
          <h3
            className="text-2xl font-bold text-gray-800 mb-6 text-center"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Quick Actions
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-rose-400 to-pink-400 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                🤖 Start AI Chat
              </motion.button>
            </Link>
            <Link href="/community">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                👥 Visit Community
              </motion.button>
            </Link>
            <Link href="/features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-green-400 to-emerald-400 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                ✨ Explore Features
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8"
        >
          <h3
            className="text-2xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Recent Activity
          </h3>
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer"
            >
              <div className="text-2xl">💬</div>
              <div className="flex-1">
                <p
                  className="font-medium text-gray-800"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  You posted: &quot;새로운 시작을 위한 용기&quot;
                </p>
                <p className="text-sm text-gray-500">2 days ago • 5 likes</p>
              </div>
              <Link
                href="/community"
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                View →
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer"
            >
              <div className="text-2xl">🤖</div>
              <div className="flex-1">
                <p
                  className="font-medium text-gray-800"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  Completed AI counseling session
                </p>
                <p className="text-sm text-gray-500">
                  3 days ago • Couples counseling
                </p>
              </div>
              <Link
                href="/chat"
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                Continue →
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer"
            >
              <div className="text-2xl">❤️</div>
              <div className="flex-1">
                <p
                  className="font-medium text-gray-800"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  Received 3 new likes on your posts
                </p>
                <p className="text-sm text-gray-500">5 days ago</p>
              </div>
              <Link
                href="/community"
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                Check →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};
