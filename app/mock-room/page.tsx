"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Bot,
  Frown,
  Smile,
  Zap,
  Trophy,
  X,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InterviewStyle = "strict" | "friendly" | "pressure";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const styleConfig = {
  strict: {
    name: "严肃型",
    icon: Frown,
    gradient: "gradient-neutral",
    bgLight: "bg-background-tertiary",
    description: "专业严谨，注重细节",
    greeting: "你好，我是今天的面试官。请先做一个简短的自我介绍。",
  },
  friendly: {
    name: "温和型",
    icon: Smile,
    gradient: "gradient-success",
    bgLight: "bg-success-light",
    description: "亲切友好，循循善诱",
    greeting:
      "嗨！欢迎来到面试，别紧张～先跟我聊聊你自己吧，什么都可以说！",
  },
  pressure: {
    name: "压力型",
    icon: Zap,
    gradient: "gradient-danger",
    bgLight: "bg-danger-light",
    description: "高压提问，考验抗压",
    greeting:
      "时间有限，我们直接开始。告诉我，为什么我们要录用你而不是其他候选人？",
  },
};

const mockResponses = [
  "很好，继续说说你在这个项目中具体负责什么？",
  "那遇到技术难点时你是怎么解决的？",
  "如果让你重新做这个项目，你会有什么不同的做法？",
  "说说你对我们公司的了解？",
  "你期望的薪资是多少？为什么？",
  "最后，你有什么问题想问我的吗？",
];

const statusLabels = [
  { score: 90, label: "Offer 收割机", emoji: "🏅" },
  { score: 80, label: "面霸预备役", emoji: "💪" },
  { score: 70, label: "潜力股", emoji: "📈" },
  { score: 60, label: "稳扎稳打型", emoji: "🎯" },
  { score: 0, label: "还需努力", emoji: "💼" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function MockRoomPage() {
  const [selectedStyle, setSelectedStyle] = useState<InterviewStyle | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startInterview = (style: InterviewStyle) => {
    setSelectedStyle(style);
    setMessages([{ role: "assistant", content: styleConfig[style].greeting }]);
    setQuestionCount(1);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (questionCount >= 5) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "好的，今天的面试就到这里。感谢你的时间，我们会尽快给你反馈。再见！",
          },
        ]);
        setTimeout(() => setShowReport(true), 1000);
      } else {
        const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
        setQuestionCount((prev) => prev + 1);
      }
    }, 1500);
  };

  const resetInterview = () => {
    setSelectedStyle(null);
    setMessages([]);
    setShowReport(false);
    setQuestionCount(0);
  };

  const mockScore = 75 + Math.floor(Math.random() * 20);
  const statusLabel = statusLabels.find((s) => mockScore >= s.score) || statusLabels[4];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* 页面标题 */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-semibold text-text-primary">模拟面试舱</h1>
        <p className="mt-1.5 text-text-secondary">AI 面试官陪你练习，提升面试技巧</p>
      </motion.div>

      {/* 风格选择 */}
      {!selectedStyle && (
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-card p-8 border border-border-light shadow-subtle"
        >
          <h2 className="mb-6 text-center text-lg font-semibold text-text-primary">
            选择面试官风格
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {(Object.keys(styleConfig) as InterviewStyle[]).map((style, index) => {
              const config = styleConfig[style];
              return (
                <motion.button
                  key={style}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  onClick={() => startInterview(style)}
                  className="group relative overflow-hidden rounded-xl bg-card p-6 text-left border border-border-light shadow-subtle transition-all duration-300 hover:border-border hover:shadow-card"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={cn(
                      "absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-40 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-60",
                      config.bgLight
                    )}
                  />
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "mb-4 flex h-14 w-14 items-center justify-center rounded-xl shadow-sm",
                      config.gradient
                    )}
                  >
                    <config.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-text-primary">{config.name}</h3>
                  <p className="mt-1.5 text-sm text-text-secondary">{config.description}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 聊天界面 */}
      {selectedStyle && !showReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card border border-border-light shadow-subtle overflow-hidden"
        >
          {/* 聊天头部 */}
          <div className="flex items-center justify-between border-b border-border-light px-6 py-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br",
                  styleConfig[selectedStyle].gradient
                )}
              >
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-text-primary">
                  AI 面试官 · {styleConfig[selectedStyle].name}
                </p>
                <p className="text-xs text-text-tertiary">问题 {questionCount}/5</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={resetInterview}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:bg-background-secondary hover:text-text-secondary"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>

          {/* 消息列表 */}
          <div className="h-96 space-y-4 overflow-y-auto bg-background-secondary p-6">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    msg.role === "user"
                      ? "gradient-primary"
                      : `bg-gradient-to-br ${styleConfig[selectedStyle].gradient}`
                  )}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "gradient-primary text-white rounded-br-md"
                      : "bg-card text-text-primary border border-border-light rounded-bl-md shadow-subtle"
                  )}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br",
                    styleConfig[selectedStyle].gradient
                  )}
                >
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl bg-card px-4 py-3 border border-border-light rounded-bl-md">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-text-tertiary"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入框 */}
          <div className="border-t border-border-light p-4 bg-card">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="输入你的回答..."
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 outline-none transition-all duration-200 input-focus placeholder:text-text-tertiary"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-white shadow-md transition-shadow hover:shadow-lg"
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 复盘报告 */}
      <AnimatePresence>
        {showReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 24 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full max-w-md rounded-2xl bg-card p-8 shadow-float"
            >
              <div className="mb-6 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-lg glow-primary"
                >
                  <Trophy className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-text-primary">面试复盘</h2>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-3 flex items-center justify-center gap-2"
                >
                  <span className="text-4xl">{statusLabel.emoji}</span>
                  <span className="text-lg font-semibold text-primary">{statusLabel.label}</span>
                </motion.div>
              </div>

              {/* 评分 */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-warning" />
                    <span className="text-text-secondary">综合表现</span>
                  </div>
                  <span className="text-lg font-bold text-text-primary">{mockScore}/100</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-background-tertiary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mockScore}%` }}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                    className="h-full rounded-full gradient-primary"
                  />
                </div>
              </div>

              {/* 建议 */}
              <div className="mb-6 space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3 rounded-xl bg-success-light p-4"
                >
                  <Target className="mt-0.5 h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium text-success-dark">做得好</p>
                    <p className="mt-0.5 text-sm text-success">回答条理清晰，表达自信</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-3 rounded-xl bg-warning-light p-4"
                >
                  <TrendingUp className="mt-0.5 h-5 w-5 text-warning" />
                  <div>
                    <p className="font-medium text-warning-dark">可以改进</p>
                    <p className="mt-0.5 text-sm text-warning">建议多用 STAR 法则组织答案</p>
                  </div>
                </motion.div>
              </div>

              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetInterview}
                className="w-full rounded-xl gradient-primary py-3.5 font-medium text-white shadow-md transition-shadow hover:shadow-lg"
              >
                再来一次
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
