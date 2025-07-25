"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";
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

interface CounselingType {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface Question {
  id: string;
  text: string;
  type: "scale" | "multiple" | "text";
  options?: string[];
  required?: boolean;
}

interface Questionnaire {
  counselingType: string;
  title: string;
  description: string;
  questions: Question[];
}

const counselingTypes: CounselingType[] = [
  {
    id: "couples",
    title: "Couples Counseling",
    description: "Relationship guidance and communication support for couples",
    icon: "💕",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
  },
  {
    id: "trauma",
    title: "Trauma Recovery",
    description: "Professional support for processing traumatic experiences",
    icon: "🌱",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "workplace",
    title: "Workplace Issues",
    description: "Support for dealing with workplace harassment and stress",
    icon: "🏢",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "general",
    title: "General Support",
    description: "General mental health support and emotional guidance",
    icon: "🤗",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

const questionnaires: { [key: string]: Questionnaire } = {
  couples: {
    counselingType: "couples",
    title: "Relationship Assessment",
    description:
      "Help us understand your relationship dynamics to provide better support",
    questions: [
      {
        id: "relationship_length",
        text: "How long have you been in this relationship?",
        type: "multiple",
        options: [
          "Less than 1 year",
          "1-3 years",
          "3-5 years",
          "5-10 years",
          "Over 10 years",
        ],
        required: true,
      },
      {
        id: "main_concern",
        text: "What is your primary concern in the relationship?",
        type: "multiple",
        options: [
          "Communication issues",
          "Trust and intimacy",
          "Conflict resolution",
          "Financial disagreements",
          "Family and parenting",
          "Different life goals",
          "Other",
        ],
        required: true,
      },
      {
        id: "communication_frequency",
        text: "How often do you and your partner have meaningful conversations?",
        type: "scale",
        required: true,
      },
      {
        id: "relationship_satisfaction",
        text: "How satisfied are you with your relationship overall? (1-10)",
        type: "scale",
        required: true,
      },
      {
        id: "additional_info",
        text: "Is there anything specific you&apos;d like to work on together?",
        type: "text",
        required: false,
      },
    ],
  },
  trauma: {
    counselingType: "trauma",
    title: "Trauma Support Assessment",
    description:
      "This helps us understand how to best support your healing journey",
    questions: [
      {
        id: "trauma_type",
        text: "What type of support are you seeking? (You don&apos;t need to share details)",
        type: "multiple",
        options: [
          "Recent traumatic event",
          "Childhood experiences",
          "Relationship trauma",
          "Work-related trauma",
          "Loss and grief",
          "Anxiety and PTSD symptoms",
          "I&apos;m not sure",
        ],
        required: true,
      },
      {
        id: "symptoms_impact",
        text: "How much do these experiences impact your daily life? (1-10)",
        type: "scale",
        required: true,
      },
      {
        id: "support_system",
        text: "Do you currently have professional support?",
        type: "multiple",
        options: [
          "Yes, therapist/counselor",
          "Yes, psychiatrist",
          "Yes, support group",
          "No professional support",
          "Not sure",
        ],
        required: true,
      },
      {
        id: "coping_methods",
        text: "What helps you feel safer or more calm?",
        type: "multiple",
        options: [
          "Talking to trusted people",
          "Physical exercise",
          "Meditation/breathing",
          "Creative activities",
          "Spending time in nature",
          "Nothing seems to help",
          "Other",
        ],
        required: false,
      },
      {
        id: "goals",
        text: "What would you most like to achieve through this support?",
        type: "text",
        required: false,
      },
    ],
  },
  workplace: {
    counselingType: "workplace",
    title: "Workplace Wellness Check",
    description:
      "Help us understand your workplace situation to provide targeted support",
    questions: [
      {
        id: "issue_type",
        text: "What workplace issue are you experiencing?",
        type: "multiple",
        options: [
          "Harassment or discrimination",
          "Bullying by colleagues",
          "Toxic management",
          "Excessive workload/burnout",
          "Lack of recognition",
          "Career stagnation",
          "Workplace anxiety",
          "Other",
        ],
        required: true,
      },
      {
        id: "duration",
        text: "How long has this been happening?",
        type: "multiple",
        options: [
          "Less than 1 month",
          "1-3 months",
          "3-6 months",
          "6-12 months",
          "Over a year",
        ],
        required: true,
      },
      {
        id: "impact_level",
        text: "How much is this affecting your well-being? (1-10)",
        type: "scale",
        required: true,
      },
      {
        id: "support_available",
        text: "What support systems are available to you?",
        type: "multiple",
        options: [
          "HR department",
          "Union representative",
          "Trusted colleagues",
          "Employee assistance program",
          "External legal counsel",
          "None of the above",
        ],
        required: false,
      },
      {
        id: "goals",
        text: "What would be most helpful for your situation?",
        type: "multiple",
        options: [
          "Stress management techniques",
          "Communication strategies",
          "Documentation guidance",
          "Career transition planning",
          "Building confidence",
          "Understanding my rights",
          "Just someone to listen",
        ],
        required: true,
      },
    ],
  },
  general: {
    counselingType: "general",
    title: "Mental Wellness Check-in",
    description:
      "A brief assessment to help us understand how you&apos;re feeling and what support you need",
    questions: [
      {
        id: "current_mood",
        text: "How are you feeling today?",
        type: "multiple",
        options: [
          "Overwhelmed and stressed",
          "Sad or down",
          "Anxious or worried",
          "Lonely or isolated",
          "Frustrated or angry",
          "Neutral/okay",
          "Generally positive",
        ],
        required: true,
      },
      {
        id: "stress_level",
        text: "What&apos;s your stress level lately? (1-10)",
        type: "scale",
        required: true,
      },
      {
        id: "main_concerns",
        text: "What areas of life are challenging you right now?",
        type: "multiple",
        options: [
          "Work/career stress",
          "Relationship difficulties",
          "Family issues",
          "Financial worries",
          "Health concerns",
          "Self-esteem/confidence",
          "Life transitions",
          "Daily motivation",
          "Social connections",
        ],
        required: false,
      },
      {
        id: "coping_strategies",
        text: "What usually helps you feel better?",
        type: "multiple",
        options: [
          "Talking to friends/family",
          "Exercise or physical activity",
          "Hobbies and creative activities",
          "Rest and self-care",
          "Professional help",
          "Nothing seems to help much",
          "I&apos;m still figuring it out",
        ],
        required: false,
      },
      {
        id: "support_goal",
        text: "What kind of support are you looking for today?",
        type: "text",
        required: false,
      },
    ],
  },
};

export default function ChatPage() {
  const { isAuthenticated, principal } = useAuth();
  const { userPoints, simulateLikeReceived, incrementMessageCount } =
    usePoints();

  // Counseling selection state
  const [selectedCounselingType, setSelectedCounselingType] =
    useState<string>("");
  const [hasSelectedCounseling, setHasSelectedCounseling] = useState(false);

  // Questionnaire state
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<{
    [key: string]: any;
  }>({});
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] =
    useState(false);

  // Welcome screen state
  const [hasStartedChat, setHasStartedChat] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
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

  const getWelcomeMessage = (counselingType: string): string => {
    const welcomeMessages = {
      couples:
        "Hello! I'm here to help you navigate your relationship journey. Whether you're working through communication challenges, rebuilding trust, or strengthening your connection, I'm here to listen and guide you. How can I support you and your partner today?",
      trauma:
        "Hello! I'm here to provide a safe space for your healing journey. I understand that processing traumatic experiences takes courage and patience. You're in a judgment-free environment where you can share at your own pace. How are you feeling right now?",
      workplace:
        "Hello! I'm here to support you through workplace challenges. Dealing with harassment, stress, or difficult situations at work can be overwhelming, and you don't have to face it alone. I'm here to listen and help you find healthy ways to cope. What's been weighing on your mind?",
      general:
        "Hello! I'm here to listen and support you with whatever is on your mind. Whether you're dealing with daily stress, emotional challenges, or just need someone to talk to, this is your safe space. How are you feeling today?",
    };

    return (
      welcomeMessages[counselingType as keyof typeof welcomeMessages] ||
      welcomeMessages.general
    );
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // If this is the first message, start the chat
    if (!hasStartedChat) {
      setHasStartedChat(true);

      // Add personalized welcome message based on counseling type
      const welcomeMessage: Message = {
        id: "welcome",
        text: getWelcomeMessage(selectedCounselingType),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages([welcomeMessage]);
    }

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

  // Counseling type selection screen
  if (!hasSelectedCounseling) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
        <Navbar />
        <div
          className="flex items-center justify-center px-4 py-8"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-6xl mb-4"
              >
                🧠
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent mb-4 font-nunito"
              >
                Choose Your Counseling Focus
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 font-nunito"
              >
                Select the area where you&apos;d like specialized support
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-2 gap-4 mb-8"
            >
              {counselingTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCounselingType(type.id);
                    setHasSelectedCounseling(true);
                    setShowQuestionnaire(true);
                  }}
                  className={`cursor-pointer p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-rose-200 ${
                    selectedCounselingType === type.id
                      ? "border-rose-400 bg-rose-50"
                      : ""
                  }`}
                >
                  <div
                    className={`w-16 h-16 ${type.bgColor} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}
                  >
                    {type.icon}
                  </div>

                  <h3
                    className={`text-xl font-bold ${type.color} mb-2 font-nunito text-center`}
                  >
                    {type.title}
                  </h3>

                  <p className="text-gray-600 font-nunito text-center text-sm">
                    {type.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <p className="text-sm text-gray-500 font-nunito mb-4">
                💡 You can change your focus area at any time during the
                conversation
              </p>
              <p className="text-xs text-gray-400 font-nunito">
                All conversations are private, secure, and handled with
                professional care
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    );
  }

  // Questionnaire screen
  if (
    showQuestionnaire &&
    !hasCompletedQuestionnaire &&
    selectedCounselingType
  ) {
    const currentQuestionnaire = questionnaires[selectedCounselingType];

    const handleAnswerChange = (
      questionId: string,
      answer: string | number
    ) => {
      setQuestionnaireAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
      }));
    };

    const handleSubmitQuestionnaire = () => {
      setHasCompletedQuestionnaire(true);
      setShowQuestionnaire(false);
    };

    const renderQuestion = (question: Question, index: number) => {
      const currentAnswer = questionnaireAnswers[question.id];

      return (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 font-nunito pr-4">
              {question.text}
            </h3>
            {question.required && (
              <span className="text-rose-500 text-sm">*</span>
            )}
          </div>

          {question.type === "multiple" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={currentAnswer === option}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    className="w-4 h-4 text-rose-500 focus:ring-rose-500"
                  />
                  <span className="text-gray-700 font-nunito">{option}</span>
                </label>
              ))}
            </div>
          )}

          {question.type === "scale" && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-500 font-nunito">
                <span>1 (Low)</span>
                <span>10 (High)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={currentAnswer || 5}
                onChange={(e) =>
                  handleAnswerChange(question.id, parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold">
                  {currentAnswer || 5}
                </span>
              </div>
            </div>
          )}

          {question.type === "text" && (
            <textarea
              value={currentAnswer || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Share your thoughts here..."
              className="w-full p-4 border border-gray-200 rounded-xl focus:border-rose-300 focus:outline-none font-nunito resize-none"
              rows={3}
            />
          )}
        </motion.div>
      );
    };

    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-5xl mb-4"
              >
                {
                  counselingTypes.find(
                    (type) => type.id === selectedCounselingType
                  )?.icon
                }
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent mb-2 font-nunito"
              >
                {currentQuestionnaire.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 font-nunito"
              >
                {currentQuestionnaire.description}
              </motion.p>
            </div>

            <div className="space-y-6 mb-8">
              {currentQuestionnaire.questions.map((question, index) =>
                renderQuestion(question, index)
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center space-y-4"
            >
              <button
                onClick={handleSubmitQuestionnaire}
                className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-nunito hover:from-rose-500 hover:to-pink-500"
              >
                Continue to Chat
              </button>

              <p className="text-xs text-gray-500 font-nunito">
                Your responses help us provide more personalized support
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    );
  }

  // Welcome screen - show after questionnaire completion but before first message
  if (!hasStartedChat && hasCompletedQuestionnaire) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50">
        <Navbar />
        <div
          className="flex items-center justify-center px-4 py-8"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl max-w-2xl mx-auto w-full"
          >
            {/* Logo/Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl sm:text-8xl mb-6"
            >
              💙
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent mb-4 font-nunito"
            >
              Welcome to Motiv
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed font-nunito"
            >
              Your compassionate AI companion for mental wellness and emotional
              support
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-gradient-to-br from-rose-100 to-pink-100 p-4 rounded-xl">
                <div className="text-2xl mb-2">🤗</div>
                <div className="text-sm font-semibold text-gray-700 font-nunito">
                  Always Listening
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-xl">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm font-semibold text-gray-700 font-nunito">
                  Private & Secure
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl">
                <div className="text-2xl mb-2">⛵</div>
                <div className="text-sm font-semibold text-gray-700 font-nunito">
                  Community Support
                </div>
              </div>
            </motion.div>

            {/* Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How are you feeling today? Share what's on your mind..."
                className="w-full px-4 py-4 pr-12 rounded-2xl border-2 border-gray-200 focus:border-rose-300 focus:outline-none text-gray-700 placeholder-gray-400 font-nunito text-base"
                maxLength={500}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-xl hover:from-rose-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-xs sm:text-sm text-gray-500 font-nunito"
            >
              <p className="mb-2">
                💡 <strong>Tips:</strong>
              </p>
              <p>
                • Share your feelings openly - I&apos;m here to listen without
                judgment
              </p>
              <p>
                • Try sending messages in a bottle to connect with the community
              </p>
              <p>• Your conversations are completely private and secure</p>
            </motion.div>
          </motion.div>
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
                    <span className="text-lg sm:text-2xl">
                      {counselingTypes.find(
                        (type) => type.id === selectedCounselingType
                      )?.icon || "🤖"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold truncate font-nunito">
                      {counselingTypes.find(
                        (type) => type.id === selectedCounselingType
                      )?.title || "AI Companion"}
                    </h2>
                    <p className="text-xs sm:text-sm opacity-90 truncate font-nunito">
                      Specialized support for your needs
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
