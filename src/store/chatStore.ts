import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatStore {
  // Chat sessions
  sessions: ChatSession[];
  currentSessionId: string | null;
  
  // Current messages
  messages: Message[];
  isLoading: boolean;
  
  // Dark mode
  isDarkMode: boolean;
  
  // Actions
  createSession: (title: string) => void;
  switchSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setLoading: (loading: boolean) => void;
  toggleDarkMode: () => void;
  getCurrentSession: () => ChatSession | null;
  clearCurrentChat: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,
      messages: [],
      isLoading: false,
      isDarkMode: true,

      createSession: (title: string) => {
        const newSession: ChatSession = {
          id: crypto.randomUUID(),
          title,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id,
          messages: [],
        }));
      },

      switchSession: (sessionId: string) => {
        const session = get().sessions.find((s) => s.id === sessionId);
        if (session) {
          set({
            currentSessionId: sessionId,
            messages: session.messages,
          });
        }
      },

      deleteSession: (sessionId: string) => {
        set((state) => {
          const updatedSessions = state.sessions.filter((s) => s.id !== sessionId);
          const isCurrentSession = state.currentSessionId === sessionId;
          return {
            sessions: updatedSessions,
            currentSessionId: isCurrentSession ? updatedSessions[0]?.id || null : state.currentSessionId,
            messages: isCurrentSession ? (updatedSessions[0]?.messages || []) : state.messages,
          };
        });
      },

      addMessage: (message: Message) => {
        set((state) => {
          const updatedMessages = [...state.messages, message];
          
          // Update current session
          if (state.currentSessionId) {
            const updatedSessions = state.sessions.map((s) =>
              s.id === state.currentSessionId
                ? { ...s, messages: updatedMessages, updatedAt: new Date() }
                : s
            );
            return { messages: updatedMessages, sessions: updatedSessions };
          }
          
          return { messages: updatedMessages };
        });
      },

      setMessages: (messages: Message[]) => set({ messages }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      getCurrentSession: () => {
        const state = get();
        return state.sessions.find((s) => s.id === state.currentSessionId) || null;
      },

      clearCurrentChat: () => set({ messages: [], currentSessionId: null }),
    }),
    {
      name: "cognia-chat-store",
      partialize: (state) => ({
        sessions: state.sessions,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
