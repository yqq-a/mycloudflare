# 🤖 MyCloudflare - 简单 AI 问答系统

> 学习 Cloudflare Pages + Workers 的最简单项目

## 🎯 项目目标

这是一个专为**初学者**设计的 Cloudflare 学习项目，帮助你快速上手：
- **Cloudflare Pages** (前端托管)
- **Cloudflare Workers** (后端 API)
- **OpenAI API** (AI 能力)

## 📁 项目结构

```
mycloudflare/
├── workers/           # 后端服务 (非常简单!)
│   ├── src/index.js   # 纯 JS，无复杂配置
│   ├── wrangler.toml  # Workers 配置
│   └── package.json   # 最少依赖
└── pages/             # 前端页面 (超级简单!)
    └── index.html     # 一个 HTML 文件搞定!
```

## ⚡ 特点

- **极简设计** - 没有复杂的 React/TypeScript 配置
- **一个文件** - 前端就是一个 HTML 文件
- **零学习成本** - 基础 HTML/CSS/JS 即可理解
- **完全免费** - Cloudflare 免费服务
- **5分钟部署** - 从零到线上服务

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/yqq-a/mycloudflare.git
cd mycloudflare
```

### 2. 部署后端 (Workers)
```bash
cd workers
npm install

# 登录 Cloudflare
npx wrangler login

# 设置 OpenAI API Key
npx wrangler secret put OPENAI_API_KEY
# 粘贴你的 OpenAI API Key

# 部署!
npm run deploy
```

部署成功后会显示: `https://my-ai-chat.your-username.workers.dev`

### 3. 部署前端 (Pages)

**方法1: GitHub 自动部署 (推荐)**
1. 在 [Cloudflare Dashboard](https://dash.cloudflare.com/) 进入 Pages
2. 点击 "创建项目" → "连接到 Git"
3. 选择 `mycloudflare` 仓库
4. 构建设置保持默认，点击 "保存并部署"

**方法2: 直接上传**
1. 下载 `pages/index.html` 文件
2. 在 Cloudflare Pages 创建项目
3. 拖拽上传 HTML 文件

### 4. 配置连接
在前端页面中输入你的 Workers 地址，开始聊天！

## 🔑 获取 OpenAI API Key

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 注册并登录
3. 创建 API Key
4. 复制保存 (只显示一次!)

## 💡 工作原理

```
用户在页面输入问题
    ↓
Pages 发送到 Workers API
    ↓  
Workers 调用 OpenAI API
    ↓
OpenAI 返回 AI 回答
    ↓
Workers 返回给 Pages
    ↓
页面显示 AI 回答
```

## 📝 代码说明

### Workers 后端 (`workers/src/index.js`)
- 只有 60 行代码!
- 处理 `/api/chat` 接口
- 转发请求到 OpenAI
- 处理跨域和错误

### Pages 前端 (`pages/index.html`)
- 一个完整的 HTML 文件
- 包含 CSS 样式和 JavaScript
- 无需构建工具，直接运行

## 🎨 界面特点

- 📱 **响应式设计** - 手机电脑都好看
- 🎯 **聊天界面** - 类似微信的对话框
- ⚡ **实时反馈** - 发送状态和加载动画
- 🌟 **示例问题** - 点击即可快速体验

## 💰 成本

- **Cloudflare Workers**: 免费版每天 100,000 次请求
- **Cloudflare Pages**: 完全免费托管
- **OpenAI API**: GPT-3.5 约 ¥0.01 每 1000 字

## 🔧 自定义

### 修改 AI 行为
编辑 `workers/src/index.js` 中的系统提示:
```javascript
content: '你是一个友善的AI助手，请简洁地回答用户问题。'
```

### 修改界面样式
编辑 `pages/index.html` 中的 CSS 部分

### 更换 AI 模型
修改 `model: 'gpt-3.5-turbo'` 为 `'gpt-4'` 等

## 📚 学习资源

- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [OpenAI API 文档](https://platform.openai.com/docs/api-reference)

## 🎉 完成!

部署完成后，你就有了自己的 AI 问答网站! 

**想要更多功能?** 可以基于这个简单版本继续学习和扩展。

---

⭐ 觉得有用就给个 Star 吧! 

📧 有问题欢迎提 Issue!