"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageBottleProps {
  isOpen: boolean;
  onClose: () => void;
  onMessageSent?: () => void;
}

export const MessageBottle = ({
  isOpen,
  onClose,
  onMessageSent,
}: MessageBottleProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);

    // Simulate sending message to random user
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowSuccess(true);
    setMessage("");

    // Call the callback to increment message count
    onMessageSent?.();

    // Close after success animation
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    if (!isLoading && !showSuccess) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
              {!showSuccess ? (
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">⛵</div>
                        <div>
                          <h3 className="text-xl font-bold font-nunito">
                            Message in a Bottle
                          </h3>
                          <p className="text-white/80 text-sm font-nunito">
                            Send your heart to someone out there
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-4">💌</div>
                      <p className="text-gray-600 text-sm leading-relaxed font-nunito">
                        Sometimes sharing our feelings with a stranger can be
                        healing. Write your thoughts, and we&apos;ll send them
                        anonymously to someone who might need to hear them.
                      </p>
                    </div>

                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Dear stranger,&#10;&#10;I wanted to share something with you..."
                      className="w-full h-32 p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-sm font-nunito"
                      disabled={isLoading}
                    />

                    <div className="flex items-center justify-between mt-4 text-xs text-gray-500 font-nunito">
                      <span>{message.length}/500 characters</span>
                      <span>Anonymous & secure</span>
                    </div>

                    <motion.button
                      whileHover={!isLoading ? { scale: 1.02 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isLoading}
                      className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-nunito flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Sailing away...</span>
                        </>
                      ) : (
                        <>
                          <span>⛵</span>
                          <span>Send Message Bottle</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="text-8xl mb-6"
                  >
                    ⛵
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 font-nunito">
                      Message Sent! 🌊
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-nunito">
                      Your message is now sailing across the digital ocean to
                      reach someone who needs to hear your words. Thank you for
                      sharing your heart.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 text-sm text-gray-500 font-nunito"
                  >
                    This window will close automatically
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
