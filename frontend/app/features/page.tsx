"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent mb-6 font-nunito"
          >
            Features
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 font-nunito">
              Key Message
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-nunito mb-4">
              When you have no one to talk to, simply having someone listen can
              help you overcome anything.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-nunito">
              <span className="font-bold text-rose-500">Motiv</span> becomes
              that &apos;someone&apos; who listens to your story, safely
              preserving your authentic voice on the blockchain.
            </p>
          </motion.div>
        </motion.section>

        {/* What is Motiv Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center font-nunito">
              What is Motiv?
            </h2>

            {/* Swarm AI Section */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-rose-500 mb-4 font-nunito">
                    Swarm AI-Based Mental Health Therapy
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-nunito">
                    Motiv introduces a collaborative Swarm architecture where
                    multiple specialized AI agents work together, rather than
                    relying on a single AI system.
                  </p>
                </div>

                <div className="flex-1">
                  {/* Swarm AI Diagram */}
                  <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl p-8 relative">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-700 font-nunito">
                        AI Agent Swarm
                      </h4>
                    </div>

                    {/* Central Hub */}
                    <div className="relative w-full h-64 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          🧠
                        </div>
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600">
                          Central AI
                        </div>
                      </div>

                      {/* Agent Nodes */}
                      <div className="absolute top-4 left-4 w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-2xl">🎭</span>
                      </div>
                      <div className="absolute top-4 right-4 w-16 h-16 bg-green-200 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-2xl">🔬</span>
                      </div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-2xl">💝</span>
                      </div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-2xl">🎨</span>
                      </div>

                      {/* Connection Lines */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        style={{ zIndex: -1 }}
                      >
                        <line
                          x1="50%"
                          y1="50%"
                          x2="20%"
                          y2="20%"
                          stroke="#e11d48"
                          strokeWidth="2"
                          opacity="0.6"
                        />
                        <line
                          x1="50%"
                          y1="50%"
                          x2="80%"
                          y2="20%"
                          stroke="#e11d48"
                          strokeWidth="2"
                          opacity="0.6"
                        />
                        <line
                          x1="50%"
                          y1="50%"
                          x2="20%"
                          y2="80%"
                          stroke="#e11d48"
                          strokeWidth="2"
                          opacity="0.6"
                        />
                        <line
                          x1="50%"
                          y1="50%"
                          x2="80%"
                          y2="80%"
                          stroke="#e11d48"
                          strokeWidth="2"
                          opacity="0.6"
                        />
                      </svg>
                    </div>

                    {/* Agent Labels */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-center text-gray-600 mt-4">
                      <div>🎭 Emotion Analysis</div>
                      <div>🔬 Context Analysis</div>
                      <div>💝 Empathetic Support</div>
                      <div>🎨 Solution Guidance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Protection Section */}
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl md:text-3xl font-bold text-blue-500 mb-6 font-nunito">
                On-Chain Records for Privacy Protection
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6">
                  <div className="text-3xl mb-4 text-center">🔐</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2 font-nunito">
                    Encryption & Hashing
                  </h4>
                  <p className="text-sm text-gray-600 font-nunito">
                    Session summaries are encrypted and hashed before being
                    securely recorded on the ICP blockchain
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6">
                  <div className="text-3xl mb-4 text-center">✅</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2 font-nunito">
                    Verification & Control
                  </h4>
                  <p className="text-sm text-gray-600 font-nunito">
                    Users can verify the existence and integrity of their
                    session history, with full control including deletion rights
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-6">
                  <div className="text-3xl mb-4 text-center">⚕️</div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2 font-nunito">
                    Medical Ethics
                  </h4>
                  <p className="text-sm text-gray-600 font-nunito">
                    Professional referrals follow strict medical ethics and
                    confidentiality standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Key Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 font-nunito">
            Core Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-center">🤗</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-nunito">
                Always Available
              </h3>
              <p className="text-gray-600 font-nunito">
                A compassionate AI companion ready to listen to your story 24/7,
                whenever you need support
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-center">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-nunito">
                Private & Secure
              </h3>
              <p className="text-gray-600 font-nunito">
                Complete privacy protection and data security powered by
                blockchain technology
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-center">⛵</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-nunito">
                Community Support
              </h3>
              <p className="text-gray-600 font-nunito">
                A warm community where you can anonymously share messages and
                support each other
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-center">🧠</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-nunito">
                Multi-Agent AI
              </h3>
              <p className="text-gray-600 font-nunito">
                Specialized AI agents with different roles collaborate to
                provide comprehensive mental health support
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-center">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-nunito">
                Progress Tracking
              </h3>
              <p className="text-gray-600 font-nunito">
                Securely monitor and track your emotional wellness journey and
                personal growth over time
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4 text-center">🌐</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 font-nunito">
                Decentralized
              </h3>
              <p className="text-gray-600 font-nunito">
                Secure, serverless operation powered by Internet Computer
                Protocol with no central authority
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl shadow-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-nunito">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 font-nunito">
              A safe space for your mind is waiting for you
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-rose-500 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-nunito"
              onClick={() => (window.location.href = "/chat")}
            >
              Start Chatting
            </motion.button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
