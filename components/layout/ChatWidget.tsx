"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content: "你好！我是 JobPilot AI 助手，有什么可以帮你的吗？",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");

    // 模拟 AI 回复
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "收到你的消息！这是一个演示回复。在实际应用中，这里会连接到真正的 AI 服务。",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* 悬浮按钮 */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-elevated glow-primary"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-96 overflow-hidden rounded-2xl bg-card shadow-float border border-border-light"
          >
            {/* Header */}
            <div className="flex items-center justify-between gradient-primary px-5 py-4">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <span className="font-semibold text-white">AI 助手</span>
                  <p className="text-xs text-white/70">随时为你解答</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5 text-white" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="h-80 space-y-4 overflow-y-auto bg-background-secondary p-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className={cn(
                    "max-w-[85%]",
                    msg.role === "user" ? "ml-auto" : ""
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "gradient-primary text-white rounded-br-md"
                        : "bg-card text-text-primary border border-border-light rounded-bl-md shadow-subtle"
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border-light bg-card p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="输入消息..."
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-all duration-200 input-focus placeholder:text-text-tertiary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
