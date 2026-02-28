"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  CheckCircle,
  HelpCircle,
  XCircle,
  Upload,
  BookOpen,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

// 模拟闪卡数据
const defaultFlashcards = [
  {
    id: 1,
    question: "什么是 React 的虚拟 DOM？它有什么优势？",
    answer:
      "虚拟 DOM 是 React 在内存中维护的一个轻量级 JavaScript 对象树，它是对真实 DOM 的抽象。优势包括：1) 通过 diff 算法最小化 DOM 操作；2) 跨平台能力；3) 提升开发效率和性能。",
    category: "React",
  },
  {
    id: 2,
    question: "解释一下 JavaScript 的事件循环（Event Loop）机制",
    answer:
      "事件循环是 JavaScript 处理异步操作的机制。它包含调用栈、任务队列和微任务队列。同步代码在调用栈执行，异步回调进入队列。每次调用栈清空后，先执行所有微任务，再执行一个宏任务。",
    category: "JavaScript",
  },
  {
    id: 3,
    question: "HTTP 和 HTTPS 有什么区别？",
    answer:
      "HTTPS 是 HTTP 的安全版本，主要区别：1) HTTPS 使用 SSL/TLS 加密传输；2) HTTPS 默认端口 443，HTTP 是 80；3) HTTPS 需要 CA 证书；4) HTTPS 能防止中间人攻击和数据窃听。",
    category: "网络",
  },
  {
    id: 4,
    question: "什么是 TypeScript 的泛型？举个例子",
    answer:
      "泛型是一种参数化类型的方式，允许在定义函数、接口或类时使用类型变量。例如：function identity<T>(arg: T): T { return arg; } 这样可以保持类型安全的同时实现代码复用。",
    category: "TypeScript",
  },
  {
    id: 5,
    question: "请解释 CSS 的 BFC（块级格式化上下文）",
    answer:
      "BFC 是一个独立的渲染区域，内部元素的布局不会影响外部。触发条件：float 不为 none、position 为 absolute/fixed、display 为 inline-block/flex、overflow 不为 visible。常用于清除浮动和防止 margin 重叠。",
    category: "CSS",
  },
];

interface FlashcardProgress {
  [id: number]: "known" | "fuzzy" | "unknown";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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

export default function FlashcardsPage() {
  const [flashcards] = useState(defaultFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useLocalStorage<FlashcardProgress>(
    "flashcard-progress",
    {}
  );
  const [todayReviews, setTodayReviews] = useLocalStorage<number>(
    `reviews-${new Date().toDateString()}`,
    0
  );

  const currentCard = flashcards[currentIndex];

  const handleFeedback = (status: "known" | "fuzzy" | "unknown") => {
    setProgress((prev) => ({
      ...prev,
      [currentCard.id]: status,
    }));
    setTodayReviews((prev) => prev + 1);
    setIsFlipped(false);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 300);
  };

  const stats = {
    known: Object.values(progress).filter((s) => s === "known").length,
    fuzzy: Object.values(progress).filter((s) => s === "fuzzy").length,
    unknown: Object.values(progress).filter((s) => s === "unknown").length,
  };

  const statItems = [
    { label: "已掌握", value: stats.known, icon: CheckCircle, color: "text-success", bg: "bg-success-light" },
    { label: "有点模糊", value: stats.fuzzy, icon: HelpCircle, color: "text-warning", bg: "bg-warning-light" },
    { label: "需加强", value: stats.unknown, icon: XCircle, color: "text-danger", bg: "bg-danger-light" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* 页面标题 */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">闪卡工坊</h1>
          <p className="mt-1.5 text-text-secondary">高效复习面试知识点</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2.5 rounded-xl bg-card px-4 py-2.5 border border-border-light shadow-subtle"
        >
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-sm text-text-secondary">今日已复习</span>
          <span className="text-lg font-semibold text-primary">{todayReviews}</span>
          <span className="text-sm text-text-secondary">次</span>
        </motion.div>
      </motion.div>

      {/* 进度统计 */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08 }}
            className="flex items-center gap-3 rounded-xl bg-card p-4 border border-border-light shadow-subtle transition-shadow hover:shadow-card"
          >
            <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", item.bg)}>
              <item.icon className={cn("h-5 w-5", item.color)} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">{item.label}</p>
              <p className="text-xl font-semibold text-text-primary">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 闪卡区域 */}
      <motion.div variants={itemVariants} className="flex flex-col items-center">
        {/* 卡片 */}
        <div className="relative h-80 w-full max-w-2xl" style={{ perspective: "1000px" }}>
          <motion.div
            className="relative h-full w-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* 正面 - 问题 */}
            <div
              className="absolute inset-0 rounded-2xl bg-card p-8 border border-border-light shadow-card"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-lg bg-primary-lighter px-3 py-1.5 text-sm font-medium text-primary">
                    {currentCard.category}
                  </span>
                  <span className="text-sm text-text-tertiary">
                    {currentIndex + 1} / {flashcards.length}
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-center text-xl font-medium text-text-primary leading-relaxed">
                    {currentCard.question}
                  </p>
                </div>
                <p className="text-center text-sm text-text-tertiary">
                  点击卡片查看答案
                </p>
              </div>
            </div>

            {/* 背面 - 答案 */}
            <div
              className="absolute inset-0 rounded-2xl gradient-primary p-8 shadow-card"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="flex h-full flex-col text-white">
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-lg bg-white/20 backdrop-blur-sm px-3 py-1.5 text-sm font-medium">
                    答案
                  </span>
                  <RotateCcw className="h-5 w-5 opacity-70" />
                </div>
                <div className="flex flex-1 items-center">
                  <p className="text-base leading-relaxed">{currentCard.answer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 反馈按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 flex gap-4"
        >
          {[
            { status: "known" as const, label: "认识", icon: CheckCircle, gradient: "gradient-success" },
            { status: "fuzzy" as const, label: "模糊", icon: HelpCircle, gradient: "gradient-warning" },
            { status: "unknown" as const, label: "不认识", icon: XCircle, gradient: "gradient-danger" },
          ].map((btn) => (
            <motion.button
              key={btn.status}
              onClick={() => handleFeedback(btn.status)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white shadow-md transition-shadow hover:shadow-lg",
                btn.gradient
              )}
            >
              <btn.icon className="h-5 w-5" />
              <span>{btn.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* 上传区域 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 w-full max-w-2xl"
        >
          <motion.div
            whileHover={{ borderColor: "var(--primary)", backgroundColor: "var(--primary-lighter)" }}
            className="rounded-xl border-2 border-dashed border-border p-6 text-center transition-all duration-300 cursor-pointer"
          >
            <Upload className="mx-auto h-8 w-8 text-text-tertiary" />
            <p className="mt-3 text-sm text-text-secondary">
              上传文件解析生成更多闪卡
            </p>
            <p className="mt-1 text-xs text-text-tertiary">支持 PDF、Word、TXT 格式</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
