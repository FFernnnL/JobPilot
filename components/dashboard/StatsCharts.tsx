"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Brain } from "lucide-react";

// 模拟数据 - 匹配度走势
const matchTrendData = [
  { day: "周一", score: 65 },
  { day: "周二", score: 72 },
  { day: "周三", score: 68 },
  { day: "周四", score: 78 },
  { day: "周五", score: 82 },
  { day: "周六", score: 85 },
  { day: "周日", score: 88 },
];

// 模拟数据 - 闪卡掌握程度（使用新配色）
const flashcardData = [
  { name: "已掌握", value: 45, color: "#5B5FC7" },
  { name: "模糊", value: 30, color: "#9095A6" },
  { name: "未掌握", value: 25, color: "#E4E7EC" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export function StatsCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 匹配度走势图 */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="rounded-2xl bg-card p-6 border border-border-light shadow-subtle transition-shadow hover:shadow-card"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-lighter">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">匹配度走势</h3>
            <p className="text-sm text-text-tertiary">最近 7 天</p>
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={matchTrendData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5B5FC7" />
                  <stop offset="100%" stopColor="#7B7FD1" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9095A6", fontSize: 12 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9095A6", fontSize: 12 }}
                domain={[0, 100]}
                dx={-8}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E4E7EC",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(26, 29, 38, 0.08)",
                  padding: "12px 16px",
                }}
                labelStyle={{ color: "#1A1D26", fontWeight: 500 }}
                formatter={(value: number) => [`${value}%`, "匹配度"]}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ fill: "#5B5FC7", strokeWidth: 0, r: 5 }}
                activeDot={{
                  r: 7,
                  fill: "#5B5FC7",
                  stroke: "#E8E9F7",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 闪卡掌握程度 */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="rounded-2xl bg-card p-6 border border-border-light shadow-subtle transition-shadow hover:shadow-card"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-lighter">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">闪卡掌握程度</h3>
            <p className="text-sm text-text-tertiary">总计 100 张卡片</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="h-44 w-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={flashcardData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {flashcardData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-4">
            {flashcardData.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1 text-sm text-text-secondary">
                  {item.name}
                </span>
                <span className="text-lg font-semibold text-text-primary">
                  {item.value}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
