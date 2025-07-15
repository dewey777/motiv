"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/navbar";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

export default function ChatPage() {
  const { isAuthenticated, principal } = useAuth();
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col"
          style={{
            height: "calc(100vh - 120px)",
            minHeight: "500px",
          }}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-rose-400 to-pink-400 p-3 sm:p-6 text-white flex-shrink-0">
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
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-nunito">Online</span>
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
                Press Enter to send • Your conversations are private and secure
                • Connected as: {principal?.slice(0, 8)}...
              </span>
              <span className="sm:hidden">
                Private & secure • {principal?.slice(0, 6)}...
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
