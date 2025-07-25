import { motion } from "framer-motion";
import Image from "next/image";
import floatingHearts from "@/animations/floating-hearts.json";
import Lottie from "lottie-react";
import { Link } from "lucide-react";
import { Navbar } from "../navbar";

export const HeroSection = () => (
  <main className="relative min-h-screen w-full text-gray-600 overflow-hidden">
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Floating circles */}
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
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-[#FFD1DC]/35 to-[#FFEAA7]/35 rounded-full blur-sm"
      />
    </div>

    <svg
      className="absolute inset-0 w-full h-full z-0"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFDEE9" stopOpacity="1" />
          <stop offset="100%" stopColor="#B5FFFC" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        fill="url(#waveGradient)"
        d="M0,64L40,80C80,96,160,128,240,128C320,128,400,96,480,80C560,64,640,64,720,85.3C800,107,880,149,960,160C1040,171,1120,149,1200,154.7C1280,160,1360,192,1400,208L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
      />
    </svg>

    <Navbar />

    <section className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between px-6 py-16 gap-12 max-w-7xl mx-auto">
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl text-center lg:text-left"
      >
        <h2
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-[#FF6F61]"
          style={{ fontFamily: "var(--font-baloo-2)" }}
        >
          Your Journey to Inner Peace
        </h2>
        <p
          className="text-lg md:text-xl text-[#374151] mb-8"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          Talk to our AI companions who listen, care, and understand — anytime
          you need a gentle voice.
        </p>
        <div
          className="flex justify-center lg:justify-start gap-4"
          style={{ fontFamily: "var(--font-nunito)" }}
        >
          <Link href="/chat">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#FF5A4C" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF6F61] text-white px-8 py-4 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform"
            >
              Start Talking Now 💬
            </motion.button>
          </Link>
          <Link href="/features">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-[#FF6F61] text-[#FF6F61] px-8 py-4 rounded-3xl font-bold text-lg hover:bg-[#FF6F61] hover:text-white transition-all duration-300"
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Visual Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative max-w-lg w-full"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-3xl">
          <Image
            src="/assets/images/girl-with-phone-illust.png"
            alt="Girl with phone illustration"
            width={500}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 right-10 text-4xl"
          >
            💝
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-20 left-10 text-3xl"
          >
            ✨
          </motion.div>
        </div>

        {/* Floating heart animation */}
        <div className="absolute -top-10 -right-10 w-24 h-24 opacity-60">
          <Lottie animationData={floatingHearts} loop={true} />
        </div>
      </motion.div>
    </section>

    {/* Simple Features Section */}
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h3
          className="text-3xl font-bold text-[#FF6F61] mb-12"
          style={{ fontFamily: "var(--font-baloo-2)" }}
        >
          Why Choose Motiv?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              AI Companions
            </h4>
            <p className="text-gray-600">
              Always available to listen and support you
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              Private & Secure
            </h4>
            <p className="text-gray-600">
              Your conversations are completely confidential
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <div className="text-4xl mb-4">🌍</div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              Global Community
            </h4>
            <p className="text-gray-600">
              Connect with supportive people worldwide
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="relative z-10 bg-gradient-to-r from-[#FF9AA2] via-[#FFB7B2] to-[#FFDAC1] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-baloo-2)" }}
          >
            Ready to Begin Your Journey?
          </h3>
          <p
            className="text-lg text-white/80 mb-6"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Join thousands who&apos;ve found peace through our AI companions
          </p>
          <Link href="/chat">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-[#FF6F61] px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Get Started Today
            </motion.button>
          </Link>
        </div>
      </div>
    </footer>
  </main>
);
