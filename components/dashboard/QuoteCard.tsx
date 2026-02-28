"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";

const quotes = [
  "每一次面试都是成长的机会，即使失败也是通往成功的必经之路。",
  "你的简历不只是一张纸，它是你故事的开始。让它闪耀吧！",
  "机会总是留给有准备的人，今天的努力是明天的底气。",
  "不要等待完美的时机，现在就是最好的开始。",
  "每个大牛都曾是萌新，坚持下去，你就是下一个大牛。",
  "面试官也是普通人，放轻松，展示真实的自己。",
  "拒绝只是暂时的，但放弃才是永久的。继续前进！",
];

export function QuoteCard() {
  const [quote, setQuote] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl gradient-primary p-6 text-white"
    >
      {/* 背景装饰 */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-white/5" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-4 flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Quote className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-white/80">每日一句</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg font-medium leading-relaxed tracking-wide"
        >
          {quote}
        </motion.p>
      </div>
    </motion.div>
  );
}
