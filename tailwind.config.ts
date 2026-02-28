import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 更柔和的背景色
        background: {
          DEFAULT: "#FAFBFC",
          secondary: "#F4F6F8",
          tertiary: "#EBEEF2",
        },
        // 统一的主色调 - 深邃靛蓝
        primary: {
          DEFAULT: "#5B5FC7",
          light: "#7B7FD1",
          lighter: "#E8E9F7",
          dark: "#4B4FB7",
          foreground: "#FFFFFF",
        },
        // 辅助色 - 柔和的绿色（成功）
        success: {
          DEFAULT: "#34A77F",
          light: "#E6F5EF",
          dark: "#2A8A69",
        },
        // 辅助色 - 柔和的黄色（警告）
        warning: {
          DEFAULT: "#E5A324",
          light: "#FDF6E6",
          dark: "#C78D1F",
        },
        // 辅助色 - 柔和的红色（错误）
        danger: {
          DEFAULT: "#D64D4D",
          light: "#FCEAEA",
          dark: "#B83E3E",
        },
        // 文字颜色
        text: {
          primary: "#1A1D26",
          secondary: "#5E6278",
          tertiary: "#9095A6",
          inverse: "#FFFFFF",
        },
        // 边框颜色
        border: {
          DEFAULT: "#E4E7EC",
          light: "#F0F2F5",
          dark: "#D0D5DD",
        },
        // 卡片背景
        card: {
          DEFAULT: "#FFFFFF",
          hover: "#FAFBFC",
        },
      },
      borderRadius: {
        "xl": "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      boxShadow: {
        "subtle": "0 1px 2px rgba(26, 29, 38, 0.04)",
        "card": "0 2px 8px rgba(26, 29, 38, 0.06)",
        "elevated": "0 8px 24px rgba(26, 29, 38, 0.08)",
        "float": "0 12px 32px rgba(26, 29, 38, 0.12)",
        "glow": "0 0 24px rgba(91, 95, 199, 0.25)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "float": "float 3s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};

export default config;
