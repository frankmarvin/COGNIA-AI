import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Image,
  Code,
  BarChart3,
  Eye,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Github,
  Twitter,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(0, 191, 255, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border/20 backdrop-blur-sm"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
            <Sparkles size={20} className="text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Cognia AI
          </span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition">
            Features
          </a>
          <a href="#about" className="text-muted-foreground hover:text-foreground transition">
            About
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition">
            Contact
          </a>
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/chat")}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold hover:shadow-lg hover:shadow-primary/50 transition"
        >
          Start Free
        </motion.button>
      </motion.header>

      {/* Hero Section */}
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6"
        >
          <Zap size={14} />
          Next-generation AI platform
        </motion.div>

        {/* Main Headline */}
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight">
          Your Intelligent{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
            Coding Assistant
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Write code faster, debug smarter, and build better with AI-powered assistance. Real-time code generation,
          intelligent debugging, and instant explanations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 191, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/chat")}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition"
          >
            Start Chatting Free
            <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition"
          >
            View Demo
          </motion.button>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          id="features"
          variants={item}
          className="flex flex-wrap gap-4 justify-center mb-20 max-w-4xl"
        >
          {[
            { icon: <Code size={20} />, label: "Code Generation" },
            { icon: <Image size={20} />, label: "Image Analysis" },
            { icon: <BarChart3 size={20} />, label: "Data Analysis" },
            { icon: <Eye size={20} />, label: "Smart Debugging" },
          ].map((feature, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 191, 255, 0.2)" }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border hover:border-primary/50 transition group"
            >
              <span className="text-primary group-hover:scale-110 transition">{feature.icon}</span>
              <span className="text-sm font-medium">{feature.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
        >
          {[
            {
              icon: <Sparkles size={28} className="text-primary" />,
              title: "AI-Powered",
              description: "State-of-the-art language models for intelligent, context-aware responses.",
            },
            {
              icon: <Zap size={28} className="text-primary" />,
              title: "Lightning Fast",
              description: "Get instant answers, code completions, and insights without any delay.",
            },
            {
              icon: <Shield size={28} className="text-primary" />,
              title: "Secure & Private",
              description: "Your conversations are protected with enterprise-grade security.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 191, 255, 0.15)" }}
              className="bg-card border border-border rounded-2xl p-6 text-left hover:border-primary/50 transition group"
            >
              <div className="mb-4 group-hover:scale-110 transition">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="about"
        className="relative z-10 px-6 py-16 border-t border-border/20 text-center bg-card/30 backdrop-blur-sm"
      >
        <h2 className="text-3xl font-bold mb-4">About Cognia AI</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
          Cognia AI builds intelligent digital platforms powered by advanced automation and machine learning.
        </p>
        <p className="text-muted-foreground">
          Founded by <span className="text-foreground font-semibold">Frank Marvin</span> 🚀 — Kenya
        </p>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="contact"
        className="relative z-10 px-6 py-16 border-t border-border/20 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">
          Have questions? We'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:contact@cognia-ai.com"
            className="text-primary hover:underline font-medium flex items-center gap-2"
          >
            📧 contact@cognia-ai.com
          </a>
          <span className="text-muted-foreground hidden sm:block">•</span>
          <p className="text-muted-foreground">📍 Kenya</p>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative z-10 px-6 py-6 border-t border-border/20 text-center text-sm text-muted-foreground bg-card/30 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <a href="#" className="hover:text-foreground transition">
            <Github size={18} />
          </a>
          <a href="#" className="hover:text-foreground transition">
            <Twitter size={18} />
          </a>
        </div>
        © {new Date().getFullYear()} Cognia AI. All rights reserved.
      </motion.footer>
    </div>
  );
}
