import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Menu, X, Moon, Sun } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { sessions, currentSessionId, createSession, switchSession, deleteSession, isDarkMode, toggleDarkMode } =
    useChatStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleNewChat = () => {
    createSession("New Chat");
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    deleteSession(sessionId);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        exit={{ x: -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-40 flex flex-col md:relative md:translate-x-0 md:animate-none"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h1 className="font-bold text-lg">Cognia AI</h1>
          <button onClick={onClose} className="md:hidden p-2 hover:bg-muted rounded-lg">
            <X size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewChat}
          className="m-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition w-full justify-center"
        >
          <Plus size={18} />
          New Chat
        </motion.button>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground px-2 py-2">Chat History</p>
          <AnimatePresence>
            {sessions.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">No chats yet</p>
            ) : (
              sessions.map((session, index) => (
                <motion.button
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => switchSession(session.id)}
                  onMouseEnter={() => setHoveredId(session.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition group ${
                    currentSessionId === session.id
                      ? "bg-primary/20 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm truncate flex-1">{session.title}</p>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === session.id ? 1 : 0 }}
                      onClick={(e) => handleDeleteSession(e, session.id)}
                      className="p-1 hover:bg-destructive/20 rounded text-destructive"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(session.updatedAt).toLocaleDateString()}
                  </p>
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Dark Mode Toggle */}
        <div className="p-4 border-t border-border">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-muted hover:bg-muted/80 transition"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu Button (shown when sidebar is closed) */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => !isOpen && onClose?.()}
          className="md:hidden fixed bottom-20 left-4 p-3 rounded-full bg-primary text-primary-foreground shadow-lg z-30"
        >
          <Menu size={20} />
        </motion.button>
      )}
    </>
  );
}
