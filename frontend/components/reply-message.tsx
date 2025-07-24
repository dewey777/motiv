"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReplyMessageProps {
  isOpen: boolean;
  onClose: () => void;
  originalMessage: string;
  onReplySent?: () => void;
}

export const ReplyMessage = ({
  isOpen,
  onClose,
  originalMessage,
  onReplySent,
}: ReplyMessageProps) => {
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    setIsLoading(true);

    // Simulate sending reply
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setShowSuccess(true);
    setReplyText("");

    // Call the callback to increment message count
    onReplySent?.();

    // Close after success animation
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2500);
  };

  const handleClose = () => {
    if (!isLoading && !showSuccess) {
      setReplyText("");
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
                  <div className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">💬</div>
                        <div>
                          <h3 className="text-xl font-bold font-nunito">
                            Reply to Message
                          </h3>
                          <p className="text-white/80 text-sm font-nunito">
                            Send a supportive response
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
                    {/* Original Message */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2 font-nunito">
                        Replying to:
                      </p>
                      <div className="bg-gray-50 p-4 rounded-2xl border-l-4 border-blue-400">
                        <p className="text-sm text-gray-700 italic font-nunito">
                          &quot;{originalMessage}&quot;
                        </p>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-4xl mb-3">💙</div>
                      <p className="text-gray-600 text-sm leading-relaxed font-nunito">
                        Your reply will be sent anonymously to offer comfort and
                        support. Share your encouragement, wisdom, or simply let
                        them know they&apos;re not alone.
                      </p>
                    </div>

                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="I hear you, and I want you to know...&#10;&#10;Your feelings are valid, and you matter..."
                      className="w-full h-32 p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 text-sm font-nunito"
                      disabled={isLoading}
                      maxLength={300}
                    />

                    <div className="flex items-center justify-between mt-4 text-xs text-gray-500 font-nunito">
                      <span>{replyText.length}/300 characters</span>
                      <span>Anonymous & supportive</span>
                    </div>

                    <motion.button
                      whileHover={!isLoading ? { scale: 1.02 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      onClick={handleSendReply}
                      disabled={!replyText.trim() || isLoading}
                      className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 text-white rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-nunito flex items-center justify-center space-x-2"
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
                          <span>Sending support...</span>
                        </>
                      ) : (
                        <>
                          <span>💙</span>
                          <span>Send Reply</span>
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
                    💙
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 font-nunito">
                      Reply Sent! 🌟
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-nunito">
                      Your supportive message has been delivered anonymously.
                      Thank you for spreading kindness and showing someone
                      they&apos;re not alone.
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
