import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Copy, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { Message } from "@/store/chatStore";

interface ChatMessageProps {
  message: Message;
  onCopy?: (text: string) => void;
  onRegenerate?: () => void;
}

export default function ChatMessage({ message, onCopy, onRegenerate }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

  const isUser = message.role === "user";

  const handleCopy = () => {
    if (onCopy) {
      onCopy(message.content);
    } else {
      navigator.clipboard.writeText(message.content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`flex gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-primary-foreground text-sm font-bold">✨</span>
          </div>
        )}

        {/* Message Bubble */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-card border border-border text-foreground rounded-bl-none"
          }`}
        >
          {/* Message Content */}
          <div className="prose prose-invert max-w-none text-sm leading-relaxed">
            {isUser ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <ReactMarkdown
                components={{
                  code: ({ inline, className, children, ...props }) => (
                    <code
                      className={`${
                        inline
                          ? "bg-muted px-1.5 py-0.5 rounded text-xs font-mono"
                          : "block bg-muted p-3 rounded-lg my-2 overflow-x-auto text-xs font-mono"
                      }`}
                      {...props}
                    >
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-muted p-3 rounded-lg my-2 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Action Buttons (AI messages only) */}
          {!isUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-2 mt-3 pt-3 border-t border-border/30"
            >
              <button
                onClick={handleCopy}
                className="p-1.5 rounded hover:bg-muted/50 transition text-xs flex items-center gap-1"
                title="Copy message"
              >
                <Copy size={14} />
                {copied ? "Copied!" : "Copy"}
              </button>
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="p-1.5 rounded hover:bg-muted/50 transition text-xs flex items-center gap-1"
                  title="Regenerate response"
                >
                  <RotateCcw size={14} />
                  Regenerate
                </button>
              )}
              <button
                onClick={() => setFeedback(feedback === "like" ? null : "like")}
                className={`p-1.5 rounded transition text-xs flex items-center gap-1 ${
                  feedback === "like" ? "bg-primary/20 text-primary" : "hover:bg-muted/50"
                }`}
                title="Like this response"
              >
                <ThumbsUp size={14} />
              </button>
              <button
                onClick={() => setFeedback(feedback === "dislike" ? null : "dislike")}
                className={`p-1.5 rounded transition text-xs flex items-center gap-1 ${
                  feedback === "dislike" ? "bg-destructive/20 text-destructive" : "hover:bg-muted/50"
                }`}
                title="Dislike this response"
              >
                <ThumbsDown size={14} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
