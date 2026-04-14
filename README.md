# Cognia-AI — Your Intelligent Coding Assistant build by Frank Marvin

A modern, free and premium AI platform built with React, TypeScript, and Tailwind CSS. Cognia AI provides real-time code generation, intelligent debugging, data analysis, and instant explanations powered by OpenAI.

## 🚀 Features

### ✨ Modern AI Chat Interface
- **Beautiful Chat Bubbles** — User vs AI messages with distinct styling
- **Markdown Support** — Code blocks, lists, and formatted text rendering
- **Typing Animation** — "AI is thinking..." indicator with smooth animations
- **Auto-scroll** — Messages automatically scroll to the latest message
- **Message Actions** — Copy, Regenerate, Like/Dislike responses

### 🎨 Premium UI/UX
- **Framer Motion Animations** — Smooth fade-ins, slides, and transitions
- **Dark Mode** — Beautiful dark theme optimized for AI applications
- **Responsive Design** — Works perfectly on mobile, tablet, and desktop
- **Gradient Backgrounds** — Modern, eye-catching visual design
- **Soft Shadows** — Professional depth and elevation

### 💬 Style Sidebar
- **Chat History** — Persistent conversation history with timestamps
- **New Chat** — Create unlimited new conversations
- **Quick Navigation** — Switch between chats instantly
- **Delete Chats** — Remove conversations you no longer need

### 🧠 Smart AI Features
- **Suggested Prompts** — Quick-start suggestions like "Fix my code", "Explain this error"
- **Code Generation** — Generate functions, fix bugs, optimize code
- **Data Analysis** — Analyze data and generate insights
- **Image Understanding** — Analyze and describe images
- **Error Explanations** — Get detailed explanations of error messages

### 🎯 Developer-Friendly
- **Real-time Code Formatting** — Syntax highlighting for code blocks
- **Copy to Clipboard** — One-click code copying
- **Regenerate Responses** — Get alternative answers
- **Error Handling** — Graceful error messages and recovery

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui
- **Animations:** Framer Motion
- **State Management:** Zustand (with persistence)
- **Markdown:** react-markdown
- **Backend:** Express.js, OpenAI API
- **Database:** Chat history stored in browser (localStorage)

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/frankmarvin/Cognia-AI.git
cd Cognia-AI

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the server (requires OPENAI_API_KEY environment variable)
OPENAI_API_KEY=your_key_here npm start

# Server runs on http://localhost:3000
```

## 🌐 Environment Variables

### Frontend
No environment variables required for development.

### Backend
```bash
OPENAI_API_KEY=sk-... # Your OpenAI API key
PORT=3000              # Optional: server port (default: 3000)
```

## 📱 Usage

1. **Visit the Landing Page** — Navigate to `http://localhost:8080`
2. **Click "Start Chatting Free"** — Enter the chat interface
3. **Use Suggested Prompts** — Click any suggested prompt to get started
4. **Type Your Message** — Ask anything related to code, data, or explanations
5. **View Chat History** — Access previous conversations in the sidebar
6. **Copy Code** — Click the copy button on code responses
7. **Toggle Dark Mode** — Click the moon/sun icon in the sidebar

## 🏗️ Project Structure

```
Cognia-AI/
├── src/
│   ├── pages/
│   │   ├── Index.tsx          # Landing page
│   │   ├── ChatPage.tsx       # Main chat interface
│   │   ├── NotFound.tsx       # 404 page
│   │   └── Chat.tsx           # Legacy chat page (deprecated)
│   ├── components/
│   │   ├── ChatMessage.tsx    # Message bubble component
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── ui/                # shadcn/ui components
│   │   └── ...
│   ├── store/
│   │   └── chatStore.ts       # Zustand chat state management
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── server/
│   ├── server.js              # Express backend
│   └── package.json
├── index.html                 # Vite entry point
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind configuration
└── package.json
```

## 🎨 Customization

### Change Colors
Edit `src/index.css` to modify the design system colors (HSL format):
```css
:root {
  --primary: 195 100% 50%;        /* Cyan */
  --background: 220 25% 10%;      /* Dark blue */
  /* ... more colors ... */
}
```

### Add New Suggested Prompts
Edit `src/pages/ChatPage.tsx`:
```typescript
const SUGGESTED_PROMPTS = [
  { icon: "⚡", text: "Your custom prompt" },
  // ...
];
```

### Modify AI System Prompt
Edit `server/server.js`:
```javascript
role: "system",
content: "Your custom system prompt here..."
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy the `dist` folder to Vercel
```

### Backend (Heroku/Railway)
```bash
cd server
# Deploy with OPENAI_API_KEY environment variable
```

## 📊 Performance

- **Bundle Size:** ~580KB (gzipped: ~184KB)
- **First Load:** <1s on 4G
- **Chat Response:** <2s average (depends on OpenAI API)
- **Animations:** 60fps on modern devices

## 🔒 Security

- ✅ API key never exposed to frontend
- ✅ CORS enabled for development
- ✅ Input validation on backend
- ✅ Error handling prevents information leakage
- ✅ Chat history stored locally (not sent to server)

## 🐛 Troubleshooting

### "Unable to reach the Cognia AI server"
- Make sure the backend is running: `npm start` in the `server` directory
- Check that port 3000 is not blocked
- Verify `OPENAI_API_KEY` is set correctly

### Chat history not persisting
- Check browser localStorage is enabled
- Clear browser cache and reload
- Check browser console for errors

### Animations not smooth
- Update to latest Chrome/Firefox
- Disable browser extensions that might interfere
- Check system performance

## 📝 License

MIT License — See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

- **Email:** howardfrankmev@gmail.com
- **Location:** Kenya
- **GitHub:** https://github.com/frankmarvin/Cognia-AI

## 🙏 Credits

Built with ❤️ by Frank Marvin
