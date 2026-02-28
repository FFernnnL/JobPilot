"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Briefcase,
  Sparkles,
  Loader2,
  Tag,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 模拟分析结果
const mockAnalysisResult = {
  matchScore: 78,
  missingKeywords: [
    "React",
    "TypeScript",
    "微服务",
    "CI/CD",
    "Docker",
    "敏捷开发",
  ],
  suggestions: [
    {
      original: "负责前端开发工作",
      suggestion: "主导 React + TypeScript 技术栈的前端架构设计与开发，服务 10 万+ 日活用户",
      reason: "量化成果，突出技术栈匹配度",
    },
    {
      original: "参与项目管理",
      suggestion: "采用敏捷开发模式，带领 5 人团队完成 3 个核心业务模块的迭代交付",
      reason: "体现团队协作和项目管理能力",
    },
    {
      original: "优化系统性能",
      suggestion: "通过代码分割和懒加载策略，将首屏加载时间从 3.2s 优化至 1.1s，提升 65%",
      reason: "用数据说话，展示优化能力",
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function ResumePage() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<typeof mockAnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!resume.trim() || !jobDescription.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(mockAnalysisResult);
    }, 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* 页面标题 */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-semibold text-text-primary">简历优化中心</h1>
        <p className="mt-1.5 text-text-secondary">
          AI 智能分析你的简历与目标岗位的匹配度
        </p>
      </motion.div>

      {/* 双栏输入区 */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
        {/* 左侧：简历 */}
        <div className="rounded-2xl bg-card p-6 border border-border-light shadow-subtle transition-shadow hover:shadow-card">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-lighter">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">我的简历</h3>
              <p className="text-sm text-text-tertiary">粘贴你的简历内容</p>
            </div>
          </div>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="在此粘贴你的简历内容...&#10;&#10;例如：&#10;工作经历：&#10;- 2022-至今 某科技公司 前端工程师&#10;- 负责前端开发工作&#10;- 参与项目管理&#10;- 优化系统性能"
            className="h-64 w-full resize-none rounded-xl border border-border bg-background p-4 text-sm outline-none transition-all duration-200 input-focus placeholder:text-text-tertiary"
          />
        </div>

        {/* 右侧：JD */}
        <div className="rounded-2xl bg-card p-6 border border-border-light shadow-subtle transition-shadow hover:shadow-card">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success-light">
              <Briefcase className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">目标 JD</h3>
              <p className="text-sm text-text-tertiary">粘贴目标岗位描述</p>
            </div>
          </div>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="在此粘贴目标岗位的 JD...&#10;&#10;例如：&#10;岗位要求：&#10;- 3 年以上 React 开发经验&#10;- 熟悉 TypeScript&#10;- 了解微服务架构&#10;- 有 CI/CD 经验优先"
            className="h-64 w-full resize-none rounded-xl border border-border bg-background p-4 text-sm outline-none transition-all duration-200 input-focus placeholder:text-text-tertiary"
          />
        </div>
      </motion.div>

      {/* 分析按钮 */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <motion.button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !resume.trim() || !jobDescription.trim()}
          whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
          whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
          className={cn(
            "flex items-center gap-2.5 rounded-xl px-8 py-4 text-base font-medium transition-all duration-200",
            isAnalyzing || !resume.trim() || !jobDescription.trim()
              ? "cursor-not-allowed bg-border text-text-tertiary"
              : "gradient-primary text-white shadow-md glow-primary hover:shadow-lg"
          )}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>AI 分析中...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              <span>开始分析</span>
            </>
          )}
        </motion.button>
      </motion.div>

      {/* 分析结果 */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
          >
            {/* 匹配度 + 关键词 */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* 匹配度环形图 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="rounded-2xl bg-card p-6 border border-border-light shadow-subtle"
              >
                <h3 className="mb-5 font-semibold text-text-primary">匹配度分析</h3>
                <div className="flex items-center gap-8">
                  <div className="relative h-32 w-32">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#E4E7EC"
                        strokeWidth="10"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#scoreGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: result.matchScore / 100 }}
                        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                          strokeDasharray: "251.2",
                          strokeDashoffset: "0",
                        }}
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#5B5FC7" />
                          <stop offset="100%" stopColor="#7B7FD1" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="text-3xl font-bold text-text-primary"
                      >
                        {result.matchScore}%
                      </motion.span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {result.matchScore >= 80 ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-warning" />
                      )}
                      <span className="font-medium text-text-primary">
                        {result.matchScore >= 80 ? "匹配度良好" : "建议优化"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {result.matchScore >= 80
                        ? "你的简历与目标岗位匹配度较高，继续保持！"
                        : "建议根据下方建议优化简历，提升匹配度"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 缺失关键词 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="rounded-2xl bg-card p-6 border border-border-light shadow-subtle"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-text-primary">缺失关键词</h3>
                </div>
                <p className="mb-4 text-sm text-text-secondary">
                  建议在简历中添加以下关键词以提升匹配度
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((keyword, index) => (
                    <motion.span
                      key={keyword}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="rounded-lg bg-danger-light px-3 py-1.5 text-sm font-medium text-danger"
                    >
                      {keyword}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* STAR 优化建议表 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="rounded-2xl bg-card p-6 border border-border-light shadow-subtle"
            >
              <div className="mb-5 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-warning" />
                <h3 className="font-semibold text-text-primary">STAR 优化建议</h3>
              </div>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-background-secondary">
                      <th className="px-5 py-3.5 text-left text-sm font-medium text-text-secondary">
                        原内容
                      </th>
                      <th className="px-5 py-3.5 text-left text-sm font-medium text-text-secondary">
                        AI 建议
                      </th>
                      <th className="px-5 py-3.5 text-left text-sm font-medium text-text-secondary">
                        修改原因
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.suggestions.map((item, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="border-t border-border transition-colors hover:bg-background-secondary"
                      >
                        <td className="px-5 py-4 text-sm text-text-tertiary">
                          {item.original}
                        </td>
                        <td className="px-5 py-4 text-sm font-medium text-text-primary">
                          {item.suggestion}
                        </td>
                        <td className="px-5 py-4 text-sm text-primary">
                          {item.reason}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
