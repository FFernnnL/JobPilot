import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatWidget } from "@/components/layout/ChatWidget";

export const metadata: Metadata = {
  title: "JobPilot - AI 求职助手",
  description: "极简主义 AI 求职助手，让你的求职之路更轻松",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Sidebar />
        <main className="ml-64 min-h-screen bg-background p-8">
          {children}
        </main>
        <ChatWidget />
      </body>
    </html>
  );
}
