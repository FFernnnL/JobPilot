"use client";

import { motion } from "framer-motion";
import { QuoteCard } from "@/components/dashboard/QuoteCard";
import { StatsCharts } from "@/components/dashboard/StatsCharts";
import { FileText, Layers, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    title: "简历优化",
    description: "AI 分析你的简历与 JD 匹配度",
    icon: FileText,
    href: "/resume",
    gradient: "gradient-primary",
    bgLight: "bg-primary-lighter",
  },
  {
    title: "闪卡复习",
    description: "高效记忆面试知识点",
    icon: Layers,
    href: "/flashcards",
    gradient: "gradient-success",
    bgLight: "bg-success-light",
  },
  {
    title: "模拟面试",
    description: "AI 面试官陪你练习",
    icon: MessageSquare,
    href: "/mock-room",
    gradient: "gradient-warning",
    bgLight: "bg-warning-light",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function Dashboard() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {/* 页面标题 */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-semibold text-text-primary">总览</h1>
        <p className="mt-1.5 text-text-secondary">欢迎回来，今天也要加油哦！</p>
      </motion.div>

      {/* 每日语录 */}
      <motion.div variants={itemVariants}>
        <QuoteCard />
      </motion.div>

      {/* 快捷入口 */}
      <motion.div variants={itemVariants} className="grid gap-5 md:grid-cols-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3 + index * 0.1,
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Link href={action.href}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl bg-card p-6 border border-border-light shadow-subtle transition-all duration-300 hover:border-border hover:shadow-card"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {/* 背景装饰 */}
                <div
                  className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${action.bgLight} opacity-60 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-80`}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${action.gradient} shadow-sm`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="font-semibold text-text-primary">
                    {action.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                    {action.description}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary"
                  >
                    <span>开始使用</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* 统计图表 */}
      <motion.div variants={itemVariants}>
        <StatsCharts />
      </motion.div>
    </motion.div>
  );
}
