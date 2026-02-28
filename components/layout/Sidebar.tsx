"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Layers,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "总览",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "简历优化",
    href: "/resume",
    icon: FileText,
  },
  {
    name: "闪卡工坊",
    href: "/flashcards",
    icon: Layers,
  },
  {
    name: "模拟面试",
    href: "/mock-room",
    icon: MessageSquare,
  },
];

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border-light bg-card"
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border-light px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-sm"
          >
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-xl font-semibold text-text-primary"
          >
            JobPilot
          </motion.span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 p-4">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link href={item.href}>
                  <motion.div
                    className={cn(
                      "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-background-secondary"
                    )}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl bg-primary-lighter border border-primary/20"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    <item.icon className="relative z-10 h-5 w-5" />
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="border-t border-border-light p-4"
        >
          <div className="rounded-xl bg-gradient-to-br from-primary-lighter to-background-secondary p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary">AI 求职助手</p>
                <p className="text-sm font-medium text-text-primary">
                  让求职更轻松
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
