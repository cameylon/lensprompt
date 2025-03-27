# 🎬 LensPrompt

**AI-powered cinematic scene builder** — Create, edit, export, and organize film-style prompts using a beautiful slider-driven interface.

---

## 🚀 Features
- 🎛 **Live Scene Builder** — adjust tone, genre, camera with sliders
- ✨ **Real-Time Preview** — watch your prompt come to life
- 🧠 **Pre-Filled Examples** — load cinematic templates instantly
- 💾 **Save & Filter** — archive scenes with tag filters + search
- 🔗 **Shareable URLs** — auto-fill builder via query params
- 🖨 **Export to PDF** — one-click scene export
- 🧾 **Push to Notion** — send to your Notion database (via API key)
- 🎬 **Cinematic Splash Intro** — fullscreen animated entry + sound

---

## 📂 Folder Structure
```
/pages           → Routes for builder, saved, examples
/components      → Splash, UI controls, scene card
/utils           → Logic: prompt, Notion, PDF, URL
/public          → Splash video + orchestral audio
/styles          → Tailwind + animations
```

---

## 🛠 Setup (Local or Replit)

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/lensprompt.git
cd lensprompt
```

### 2. Install & Dev
```bash
npm install
npm run dev
```

### 3. Env
Create `.env.local` with:
```env
NOTION_API_KEY=your-secret-key
NOTION_DATABASE_ID=your-db-id
```

---

## 📦 Tech Stack
- Framework: **Next.js**
- Styling: **TailwindCSS** + Framer Motion
- Exports: **jsPDF**, **Notion API**
- Hosting: Replit / Vercel-ready

---

## 🧠 Inspiration
Inspired by tools like RunwayML, Notion, and screenwriting workflows.

---

## 📸 Screenshots
> Add screenshots of:
> - Builder UI
> - Saved scene filters
> - Splash animation

---

## 📜 License
MIT © 2025 LensPrompt Studio

