"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { usePoints } from "@/hooks/usePoints";
import { Navbar } from "@/components/navbar";
import { MessageBottle } from "@/components/message-bottle";
import { ReplyMessage } from "@/components/reply-message";
import { PointsDisplay } from "@/components/points-display";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

export default function ChatPage() {
  const { isAuthenticated, principal } = useAuth();
  const { userPoints, simulateLikeReceived, incrementMessageCount } =
    usePoints();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm here to listen and support you. How are you feeling today? 💙",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMessageBottle, setShowMessageBottle] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showReplyMessage, setShowReplyMessage] = useState(false);
  const [replyToMessage, setReplyToMessage] = useState("");
  const [likedMessages, setLikedMessages] = useState<Set<number>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Request notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  const generateAIResponse = async (): Promise<string> => {
    // Simulate AI response - in a real app, this would call your IC canister
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    const responses = [
      "I hear you, and I want you to know that your feelings are completely valid. Can you tell me more about what's been on your mind?",
      "Thank you for sharing that with me. It takes courage to open up. How long have you been feeling this way?",
      "That sounds really challenging. You're not alone in this, and I'm here to support you through it. What helps you feel better when you're going through tough times?",
      "I can sense that this is important to you. Your emotions matter, and it's okay to feel however you're feeling right now.",
      "It's wonderful that you're taking the time to check in with yourself. Self-awareness is such an important step in taking care of your mental health.",
      "I understand this might be difficult to talk about. Remember, there's no judgment here - this is a safe space for you to express yourself.",
      "That's a really insightful observation about yourself. How do you think recognizing this pattern might help you moving forward?",
      "Your strength in sharing this with me is remarkable. What small step could you take today to care for yourself?",
      "Sometimes when emotions feel overwhelming, it can help to share them with others. Have you considered writing your thoughts in a message bottle to send to someone who might understand?",
      "I notice you're processing some deep feelings. Would you like to try releasing some of these thoughts by sending an anonymous message to someone out there who might need to hear it?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setIsTyping(true);

    // Generate AI response
    try {
      const aiResponse = await generateAIResponse();

      setIsTyping(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setIsTyping(false);
      console.error("Error generating AI response:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReplyToMessage = (message: string) => {
    setReplyToMessage(message);
    setShowReplyMessage(true);
  };

  const handleLikeMessage = (messageIndex: number) => {
    if (likedMessages.has(messageIndex)) return; // Already liked

    setLikedMessages((prev) => new Set([...prev, messageIndex]));

    // Simulate giving the message sender a point (in real app, this would be handled by backend)
    setTimeout(() => {
      simulateLikeReceived();
    }, 500);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
        <Navbar />
        <div
          className="flex items-center justify-center px-4 py-8"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <div className="text-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl max-w-sm sm:max-w-md mx-auto w-full">
            <div className="text-4xl sm:text-6xl mb-4">🔒</div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 font-nunito">
              Authentication Required
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed font-nunito">
              Please connect your wallet with Internet Identity to start
              chatting with our AI companion.
            </p>
            <div className="text-xs sm:text-sm text-gray-500 font-nunito">
              Your conversations are completely private and secure.
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-7xl">
        <div className="flex gap-4 h-[calc(100vh-120px)] min-h-[500px]">
          {/* Main Chat Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${showSidePanel ? "lg:w-2/3" : "w-full"} transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col`}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-rose-400 to-pink-400 p-3 sm:p-6 text-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg sm:text-2xl">🤖</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold truncate font-nunito">
                      AI Companion
                    </h2>
                    <p className="text-xs sm:text-sm opacity-90 truncate font-nunito">
                      Always here to listen and support you
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-nunito">
                      Online
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSidePanel(!showSidePanel)}
                    className="ml-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    title="Community Features"
                  >
                    <span className="text-lg">⛵</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 min-h-0">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-end space-x-1 sm:space-x-2 max-w-[85%] sm:max-w-md ${
                        message.isUser ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      {!message.isUser && (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs sm:text-sm flex-shrink-0">
                          🤖
                        </div>
                      )}
                      <div
                        className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${
                          message.isUser
                            ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-br-md"
                            : "bg-gray-100 text-gray-800 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words font-nunito">
                          {message.text}
                        </p>
                        <p
                          className={`text-xs mt-1 font-nunito ${
                            message.isUser ? "text-white/70" : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.isUser && (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xs sm:text-sm flex-shrink-0">
                          👤
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end space-x-1 sm:space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs sm:text-sm">
                      🤖
                    </div>
                    <div className="bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 sm:p-6 border-t border-gray-200 bg-white/50 flex-shrink-0">
              <div className="flex space-x-2 sm:space-x-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm sm:text-base font-nunito"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full hover:from-rose-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg text-sm sm:text-base flex-shrink-0 font-nunito"
                >
                  <span className="hidden sm:inline">Send</span>
                  <span className="sm:hidden">📤</span>
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center px-2 font-nunito">
                <span className="hidden sm:inline">
                  Press Enter to send • Your conversations are private and
                  secure • Connected as: {principal?.slice(0, 8)}...
                </span>
                <span className="sm:hidden">
                  Private & secure • {principal?.slice(0, 6)}...
                </span>
              </p>
            </div>
          </motion.div>

          {/* Side Panel */}
          <AnimatePresence>
            {showSidePanel && (
              <motion.div
                initial={{ opacity: 0, x: 20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "33.333333%" }}
                exit={{ opacity: 0, x: 20, width: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden"
              >
                {/* Side Panel Header */}
                <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">🌊</span>
                      <div>
                        <h3 className="font-bold font-nunito">Community</h3>
                        <p className="text-xs opacity-90 font-nunito">
                          Share & Connect
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowSidePanel(false)}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Side Panel Content */}
                <div className="p-4 space-y-4 h-full overflow-y-auto">
                  {/* Points Display */}
                  <PointsDisplay
                    points={userPoints.points}
                    totalLikesReceived={userPoints.totalLikesReceived}
                    totalMessagesSent={userPoints.totalMessagesSent}
                  />

                  {/* Message Bottle Feature */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-100 cursor-pointer"
                    onClick={() => setShowMessageBottle(true)}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">⛵</div>
                      <h4 className="font-semibold text-gray-800 mb-1 font-nunito">
                        Message in a Bottle
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-nunito">
                        Send your feelings anonymously to someone who needs to
                        hear them
                      </p>
                    </div>
                  </motion.div>

                  {/* Recent Community Messages */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-700 font-nunito">
                      Recent Messages from the Ocean 🌊
                    </h4>

                    <div className="space-y-2">
                      {[
                        "You are stronger than you think. Tomorrow is a new day. 💙",
                        "Someone out there believes in you, even when you don&apos;t believe in yourself.",
                        "Your feelings are valid. Take it one breath at a time.",
                        "You matter. Your story matters. Keep going. ✨",
                      ].map((msg, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/80 p-3 rounded-xl border border-gray-100"
                        >
                          <p className="text-xs text-gray-700 leading-relaxed font-nunito">
                            &quot;{msg}&quot;
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500 font-nunito">
                              From: Anonymous
                            </span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleLikeMessage(index)}
                                disabled={likedMessages.has(index)}
                                className={`text-xs transition-colors ${
                                  likedMessages.has(index)
                                    ? "text-red-500 cursor-not-allowed"
                                    : "text-blue-500 hover:text-blue-600"
                                }`}
                                title={
                                  likedMessages.has(index)
                                    ? "Already liked"
                                    : "Like this message"
                                }
                              >
                                {likedMessages.has(index) ? "❤️" : "💙"}
                              </button>
                              <button
                                onClick={() => handleReplyToMessage(msg)}
                                className="text-xs text-purple-500 hover:text-purple-600 transition-colors"
                                title="Reply to this message"
                              >
                                💬
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Message Bottle Modal */}
        <MessageBottle
          isOpen={showMessageBottle}
          onClose={() => setShowMessageBottle(false)}
          onMessageSent={incrementMessageCount}
        />

        {/* Reply Message Modal */}
        <ReplyMessage
          isOpen={showReplyMessage}
          onClose={() => setShowReplyMessage(false)}
          originalMessage={replyToMessage}
          onReplySent={incrementMessageCount}
        />
      </div>
    </main>
  );
}
