# JobPilot
vibe coding项目，面向求职者的 AI 工具。

## 项目展示
### 总览
<img width="2547" height="1389" alt="image" src="https://github.com/user-attachments/assets/3373cc8f-bb98-4548-901c-9fefdbd3afb8" />

<img width="2533" height="1387" alt="image" src="https://github.com/user-attachments/assets/3114fc2c-e2d6-4b85-b0fb-ff8966e9f7be" />

### 简历优化
<img width="2548" height="1385" alt="image" src="https://github.com/user-attachments/assets/0ad7f3c9-189e-4166-a5b3-1f7e2d20ce54" />

### 闪卡工坊
<img width="2547" height="1383" alt="image" src="https://github.com/user-attachments/assets/10b50f5f-3261-41a9-bd3d-5372438ab964" />

<img width="2543" height="1385" alt="image" src="https://github.com/user-attachments/assets/33267970-aff3-47e1-8716-f107b17ada63" />

### 模拟面试
<img width="2538" height="1374" alt="image" src="https://github.com/user-attachments/assets/9f829f88-92ef-41de-b5d4-028eeac311be" />

<img width="2537" height="1389" alt="image" src="https://github.com/user-attachments/assets/8f69e3b8-60a7-41e1-9746-9db81c5f8e98" />

# JobPilot 项目实施计划

## 项目概述

JobPilot 是一个极简主义风格的 AI 求职助手网页应用，采用 Next.js + Tailwind CSS + Shadcn UI 技术栈构建。

## 技术栈确认

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **组件库**: Shadcn UI
- **图标**: Lucide Icons
- **动画**: Framer Motion
- **数据存储**: LocalStorage

## 项目结构

```
d:\LJY\JobPilot/
├── app/
│   ├── layout.tsx              # 根布局（含侧边栏）
│   ├── page.tsx                # Dashboard 主页
│   ├── globals.css             # 全局样式
│   ├── resume/
│   │   └── page.tsx            # 简历优化中心
│   ├── flashcards/
│   │   └── page.tsx            # 面试闪卡工坊
│   └── mock-room/
│       └── page.tsx            # 模拟面试舱
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # 侧边栏导航
│   │   └── ChatWidget.tsx      # AI 悬浮球
│   ├── dashboard/
│   │   ├── QuoteCard.tsx       # 每日励志语录
│   │   └── StatsCharts.tsx     # 统计图表
│   ├── resume/
│   │   ├── ResumeEditor.tsx    # 简历编辑区
│   │   ├── JDInput.tsx         # JD 输入区
│   │   ├── MatchScore.tsx      # 匹配度环形图
│   │   └── StarSuggestions.tsx # STAR 建议表
│   ├── flashcards/
│   │   ├── FlashCard.tsx       # 翻转卡片组件
│   │   └── ProgressBar.tsx     # 学习进度条
│   └── mock-room/
│       ├── ChatInterface.tsx   # 对话界面
│       ├── StyleSelector.tsx   # 面试官风格选择
│       └── ReportModal.tsx     # 复盘报告弹窗
├── lib/
│   ├── utils.ts                # 工具函数
│   └── storage.ts              # LocalStorage 封装
├── hooks/
│   └── useLocalStorage.ts      # LocalStorage Hook
├── public/
│   └── ...
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 实施步骤

### Phase 1: 项目初始化

1. 使用 `npx create-next-app@latest` 初始化 Next.js 项目
2. 配置 Tailwind CSS 主题（颜色、圆角、阴影）
3. 安装并配置 Shadcn UI
4. 安装 Framer Motion 和 Lucide Icons

### Phase 2: 布局与导航 (P0)

1. 创建侧边栏组件 `Sidebar.tsx`
   - 导航项：总览、简历优化、闪卡工坊、模拟面试
   - 使用 Lucide Icons
   - 响应式设计（移动端可折叠）
2. 创建根布局 `layout.tsx`
   - 集成侧边栏
   - 设置全局字体和颜色
3. 创建 AI 悬浮球 `ChatWidget.tsx`
   - 右下角固定定位
   - 点击展开简单对话框

### Phase 3: 求职仪表盘 Dashboard (P0)

1. 创建每日励志语录组件
   - AI 生成的励志语（Mock 数据）
   - Framer Motion 淡入动画
2. 创建统计图表
   - 匹配度走势折线图
   - 闪卡掌握程度环形图
   - 使用 Recharts 或简单 CSS 实现

### Phase 4: 简历优化中心 (P0)

1. 双栏布局设计
   - 左侧：简历文本区（Textarea）
   - 右侧：目标 JD 输入区
2. "开始分析"按钮 + 加载动画
3. 分析结果展示
   - 匹配度环形图
   - 缺失关键词标签云
   - STAR 优化建议三栏表格

### Phase 5: 面试闪卡工坊 (P0)

1. 卡片翻转组件
   - Framer Motion 3D 翻转效果
   - 磨砂玻璃背景
2. 三按钮反馈系统
   - 认识 / 模糊 / 不认识
3. LocalStorage 存储
   - 学习进度
   - 今日复习次数

### Phase 6: 模拟面试舱 (P0)

1. 聊天界面
   - 消息气泡样式
   - 自动滚动
2. 面试官风格选择
   - 三个图标按钮（严肃/温和/压力）
3. 复盘报告弹窗
   - 评分和建议
   - 幽默求职状态标签

## 视觉规范

### 配色

```css
--background: #F9FAFB;
--primary: #2563EB;        /* 深邃蓝 */
--primary-light: #3B82F6;
--text-primary: #111827;
--text-secondary: #6B7280;
--border: #E5E7EB;
--card-bg: #FFFFFF;
```

### 圆角与阴影

```css
--radius-lg: 16px;         /* rounded-2xl */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
```

### 字体

- 标题: Inter/系统字体, font-semibold
- 正文: Inter/系统字体, font-normal
- 字间距适当增加，保持呼吸感

## 验证方案

1. 运行 `npm run dev` 启动开发服务器
2. 验证所有页面路由正常工作
3. 测试侧边栏导航切换
4. 验证 LocalStorage 数据持久化
5. 检查 Framer Motion 动画效果
6. 测试响应式布局（桌面/移动端）

## 关键文件清单

- `app/layout.tsx` - 根布局
- `app/page.tsx` - Dashboard
- `components/layout/Sidebar.tsx` - 侧边栏
- `components/layout/ChatWidget.tsx` - AI 悬浮球
- `tailwind.config.ts` - 主题配置
