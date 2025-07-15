"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import floatingHearts from "@/animations/floating-hearts.json";
import { Navbar } from "@/components/navbar";
import { Feature } from "@/components/hero/feature";
import { Review } from "@/components/hero/review";

export default function HeroPage() {
  return (
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
        <motion.div
          animate={{
            y: [0, 25, 0],
            rotate: [0, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-1/3 w-12 h-12 bg-gradient-to-r from-[#FF9AA2]/30 to-[#FFDEE9]/30 rounded-full blur-sm"
        />

        {/* Floating heart shapes */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/2 text-2xl opacity-20"
        >
          💖
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/3 left-1/6 text-xl opacity-15"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-2/3 right-1/4 text-lg opacity-20"
        >
          🌸
        </motion.div>
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
              <button className="bg-[#FF9AA2] hover:bg-[#ffb2b7] text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-200">
                Start Talking
              </button>
            </Link>
            <button className="bg-[#B5EAD7] hover:bg-[#c7f1e3] text-[#1F1F1F] font-semibold py-3 px-6 rounded-full shadow-inner transition-all duration-200">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Illustration + Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md flex flex-col items-center relative"
        >
          {/* AI Chat Animation */}
          <div className="relative">
            <Image
              src="/assets/images/girl-with-phone-illust.png"
              alt="girl with phone illustration"
              width={300}
              height={300}
              className="rounded-lg"
            />
            {/* <div className="w-64 h-64 bg-gradient-to-r from-[#FF9AA2] to-[#B5EAD7] rounded-full flex items-center justify-center">
              <Lottie
                animationData={aiChatAnimation}
                loop={true}
                className="w-32 h-32"
              />
            </div> */}
            {/* Floating Hearts Animation */}
            <div className="absolute -top-4 -right-4">
              <Lottie
                animationData={floatingHearts}
                loop={true}
                className="w-16 h-16"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-5xl font-bold font-baloo-2 text-[#FF6F61] mb-6">
              Why Choose Motiv? ✨
            </h3>
            <p className="text-lg text-slate-600 font-nunito max-w-2xl mx-auto">
              Our AI companions are designed to provide you with the most
              personalized and caring support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              className="from-red-100 to-pink-100"
              title="AI Swarm Intelligence"
              delay={0.1}
              icon="🧠"
              description="Multiple AI minds working together to understand you better and
                provide more thoughtful responses"
            />
            <Feature
              title="Complete Privacy"
              icon="🔒"
              delay={0.2}
              className="from-green-100 to-purple-100"
              description=" Your conversations are completely private. Your data belongs to
                you, always and forever"
            />
            <Feature
              title="Always Caring"
              icon="💖"
              delay={0.3}
              className="from-vermillion-200 to-orange-100 "
              description="Available whenever you need support, with empathy and
                understanding that never judges"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-baloo-2 font-bold text-[#FF6F61] mb-4">
              Trusted by Many 🌟
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-baloo-2 font-bold text-[#FF6F61] mb-2">
                10x
              </div>
              <p className="text-slate-600 font-nunito font-medium">
                More Affordable
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-baloo-2 font-bold text-[#FF6F61] mb-2">
                100%
              </div>
              <p className="text-slate-600 font-nunito font-medium">
                Privacy Protected
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-baloo-2 font-bold text-[#FF6F61] mb-2">
                AI+
              </div>
              <p className="text-slate-600 font-nunito font-medium">
                Collaborative Care
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-[#FFDEE9]/20 to-[#B5FFFC]/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-5xl font-baloo-2 font-bold text-[#FF6F61] mb-6">
              Stories of Hope 💝
            </h3>
            <p className="text-lg text-slate-600 font-nunito max-w-2xl mx-auto">
              Real experiences from people who found their way to better mental
              wellness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Review
              avatar="👩"
              delay={0.1}
              className="from-rose-300 to-rose-100"
              name="Sarah M."
              description="&ldquo;Motiv helped me through my anxiety during finals week.
                The AI really understood what I was going through and gave me
                practical coping strategies.&rdquo;"
              job="Housewife"
            />
            <Review
              avatar="👨"
              delay={0.2}
              className="from-green-100 to-purple-100"
              name="Alex K."
              description="&ldquo;I was skeptical at first, but the AI companions feel so
                genuine. It&rsquo;s like having a caring friend who&rsquo;s
                always there to listen.&rdquo;"
              job="College Student"
            />

            <Review
              avatar="👵"
              delay={0.3}
              className="from-red-100 to-yellow-100"
              name="Maria R."
              description="&ldquo;At my age, I thought technology would be too complicated.
                But Motiv is so easy to use and the support feels so warm and
                personal.&rdquo;"
              job="Retired Teacher"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3
              className="text-3xl md:text-5xl font-bold text-[#FF6F61] mb-6"
              style={{ fontFamily: "var(--font-baloo-2)" }}
            >
              Frequently Asked Questions 🤔
            </h3>
            <p
              className="text-lg text-[#374151] max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-nunito)" }}
            >
              Everything you need to know about your mental wellness journey
              with Motiv
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg"
            >
              <h4
                className="text-xl font-bold text-[#FF6F61] mb-3"
                style={{ fontFamily: "var(--font-baloo-2)" }}
              >
                How does AI therapy work? 🤖
              </h4>
              <p
                className="text-[#374151]"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Our AI companions use advanced natural language processing to
                understand your emotions and provide personalized support. They
                learn from thousands of therapeutic conversations to offer
                helpful insights and coping strategies.
              </p>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg"
            >
              <h4
                className="text-xl font-bold text-[#FF6F61] mb-3"
                style={{ fontFamily: "var(--font-baloo-2)" }}
              >
                Is my data secure and private? 🔐
              </h4>
              <p
                className="text-[#374151]"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Absolutely! Your conversations are encrypted and never shared
                with third parties. We believe your mental health journey is
                personal and should remain completely private.
              </p>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg"
            >
              <h4
                className="text-xl font-bold text-[#FF6F61] mb-3"
                style={{ fontFamily: "var(--font-baloo-2)" }}
              >
                Can AI replace human therapists? 👥
              </h4>
              <p
                className="text-[#374151]"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Motiv is designed to complement, not replace, human therapy.
                We&rsquo;re here for daily support, check-ins, and when you need
                someone to talk to immediately. For serious mental health
                concerns, we always recommend professional help.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-[#FF9AA2]/20 to-[#B5EAD7]/20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3
            className="text-3xl md:text-5xl font-bold text-[#FF6F61] mb-6"
            style={{ fontFamily: "var(--font-baloo-2)" }}
          >
            Ready to Start Your Journey? 🚀
          </h3>
          <p
            className="text-lg text-[#374151] mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Join thousands of people who have found comfort and support with
            Motiv. Your mental wellness journey starts here.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            <Link href="/chat">
              <button className="bg-[#FF9AA2] hover:bg-[#ffb2b7] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Start Free Trial 💫
              </button>
            </Link>
            <button className="bg-white/80 hover:bg-white text-[#FF6F61] font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#FF9AA2]">
              Watch Demo 🎥
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white/90 backdrop-blur-sm py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <h4
                className="text-2xl font-bold text-[#FF6F61] mb-4"
                style={{ fontFamily: "var(--font-baloo-2)" }}
              >
                Motiv ✨
              </h4>
              <p
                className="text-[#374151] mb-6 max-w-md"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Your AI companion for mental wellness. Always here, always
                caring, always private.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF9AA2] to-[#FFDEE9] rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white text-sm">📱</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-[#B5EAD7] to-[#C7CEEA] rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white text-sm">💬</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-[#FFD1DC] to-[#FFEAA7] rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-white text-sm">📧</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5
                className="text-lg font-bold text-[#FF6F61] mb-4"
                style={{ fontFamily: "var(--font-baloo-2)" }}
              >
                Quick Links
              </h5>
              <ul
                className="space-y-2 text-[#374151]"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FF6F61] transition-colors"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5
                className="text-lg font-bold text-[#FF6F61] mb-4"
                style={{ fontFamily: "var(--font-baloo-2)" }}
              >
                Support
              </h5>
              <ul
                className="space-y-2 text-[#374151]"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FF6F61] transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="border-t border-[#FF9AA2]/20 mt-12 pt-8 text-center text-[#374151]"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            <p>&copy; 2024 Motiv. Made with 💖 for mental wellness.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
