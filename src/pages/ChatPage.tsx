import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Plus, Menu, Sparkles, ArrowLeft, Zap } from "lucide-react";
import { useChatStore, Message } from "@/store/chatStore";
import Sidebar from "@/components/Sidebar";
import ChatMessage from "@/components/ChatMessage";

const SUGGESTED_PROMPTS = [
  { icon: "⚡", text: "Fix my code" },
  { icon: "🐛", text: "Explain this error" },
  { icon: "✨", text: "Generate a function" },
  { icon: "📚", text: "Explain a concept" },
];

export default function ChatPage() {
  const navigate = useNavigate();
  const {
    messages,
    isLoading,
    currentSessionId,
    addMessage,
    setLoading,
    createSession,
    isDarkMode,
  } = useChatStore();

  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize first chat if none exists
  useEffect(() => {
    if (!currentSessionId) {
      createSession("New Chat");
    }
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };
    addMessage(userMessage);
    setInput("");
    setLoading(true);
    inputRef.current?.focus();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply || "Sorry, I could not generate a response.",
        timestamp: new Date(),
      };
      addMessage(aiMessage);
    } catch (err) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "⚠️ Unable to reach the Cognia AI server. Please make sure the backend is running on port 3000.",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className={`flex h-screen bg-background text-foreground ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <Sparkles size={16} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-sm">Cognia AI</h1>
                <p className="text-xs text-muted-foreground">Your Intelligent Assistant</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-muted rounded-lg transition hidden md:block"
          >
            <ArrowLeft size={18} />
          </button>
        </motion.header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full gap-6"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center"
                >
                  <Sparkles size={32} className="text-primary-foreground" />
                </motion.div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">What can I help with?</h2>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    Ask me anything — code, data, explanations, or creative tasks.
                  </p>
                </div>

                {/* Suggested Prompts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSuggestedPrompt(prompt.text)}
                      className="p-4 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition group"
                    >
                      <p className="text-2xl mb-2">{prompt.icon}</p>
                      <p className="text-sm font-medium group-hover:text-primary transition">{prompt.text}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="max-w-3xl mx-auto w-full">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mb-4"
                  >
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Sparkles size={14} className="text-primary-foreground" />
                      </div>
                      <div className="bg-card border border-border rounded-2xl rounded-bl-none px-4 py-3">
                        <div className="flex gap-1.5 items-center h-5">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                              className="w-2 h-2 rounded-full bg-muted-foreground"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-t border-border bg-card/50 backdrop-blur-sm p-4"
        >
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center gap-2 bg-background border border-border rounded-2xl px-3 py-2 shadow-sm hover:border-primary/50 transition group">
              <button
                className="p-2 text-muted-foreground hover:text-foreground transition"
                aria-label="Attach file"
              >
                <Plus size={18} />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Cognia AI..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <button
                className="p-2 text-muted-foreground hover:text-foreground transition"
                aria-label="Voice input"
              >
                <Mic size={18} />
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </motion.button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Cognia AI can make mistakes. Always verify important information.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
