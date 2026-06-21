# 🚀 AI-Powered Portfolio – Effortless, Customizable, Professional

**Create a powerful, modern developer portfolio in minutes — fully customizable through a single JSON file and enhanced by AI.**  
No coding knowledge required. Just configure, deploy, and showcase your best self.

<p align="center">
  <a href="docs/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-100%25-blue" alt="TypeScript"></a>
  <a href="docs/CONTRIBUTING.md"><img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg" alt="Contributions Welcome"></a>
  <a href="https://github.com/anujjainbatu/portfolio/issues"><img src="https://img.shields.io/github/issues/anujjainbatu/portfolio" alt="GitHub Issues"></a>
  <a href="https://github.com/anujjainbatu/portfolio/stargazers"><img src="https://img.shields.io/github/stars/anujjainbatu/portfolio" alt="GitHub Stars"></a>
</p>

---

## 🚦 Quick Start (5 Minutes)

<details>
<summary><strong>Step-by-step Setup</strong></summary>

1. **Fork & Clone**
    ```bash
    git clone https://github.com/your-username/portfolio.git
    cd portfolio
    ```

2. **Install Dependencies**
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3. **Get a Google Gemini API Key**
    - Visit [Google AI Studio](https://aistudio.google.com/)
    - Sign in, create an API key, and copy it.

4. **Configure Environment**
    - Copy `.env.example` to `.env.local`
    - Add your API key:
      ```
      GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
      ```

5. **Edit Your Info**
    - Fill `portfolio-config.json` with your information (see below).

6. **Add Images**
    - Replace images in `/public/` as needed (profile, projects, etc).

7. **Run Locally**
    ```bash
    npm run dev
    ```
    - Visit [http://localhost:3000](http://localhost:3000)

8. **Deploy**
    ```bash
    npm run build
    ```
    - Deploy to Vercel, Netlify, or any platform.

</details>

---

## 🤖 AI-Driven Configuration

**Let AI build your portfolio configuration for you!**

- Upload your resume (PDF/DOC) and the sample `portfolio-config.json` to ChatGPT or Claude.
- Use this prompt:
    ```
    Please generate a portfolio-config.json using my resume and this template. Include my experience, skills, projects, and suggested images.
    ```
- Alternatively, manually edit `portfolio-config.json` to customize your info, skills, and projects.

---

## 🗂️ Project Structure

<details>
<summary><strong>View File Structure</strong></summary>

```
portfolio/
├── portfolio-config.json   # Main configuration
├── public/                # Images & assets
├── src/                   # Source code
│   ├── app/               # Next.js app structure
│   ├── components/        # UI Components
│   ├── lib/               # Config loaders & utilities
│   ├── types/             # TypeScript types
│   └── hooks/             # React hooks
├── docs/                  # Documentation
├── assets/                # Documentation assets
├── package.json           # Project metadata
└── ...
```
</details>

---

## 🖼️ Image & Asset Guidelines

- **Profile Picture**: `public/profile.jpeg` (400x400px+)
- **Project Screenshots**: `public/project-1.jpg` (1200x800px recommended)
- **Favicon**: `public/favicon.ico` (32x32px)
- **Use compressed images** for faster load times (e.g., [TinyPNG](https://tinypng.com/))
- **External URLs** supported

---

## 🧠 AI Chatbot Configuration

- Fully customizable AI chat, driven by your JSON config.
- Features:
  - Preset questions & responses
  - Dynamic AI replies (Google Gemini API)
  - Mobile optimized
  - Quota management & graceful fallback

Example config:
```json
{
  "chatbot": {
    "name": "Your Digital Twin",
    "personality": "Professional yet friendly",
    "tone": "Conversational and helpful"
  }
}
```

---

## ⚙️ Environment & Validation

- **Environment Variables**:  
  - `GOOGLE_GENERATIVE_AI_API_KEY=your_key`
  - `NEXT_PUBLIC_SITE_URL=https://your-site.com` (optional)
- **Validation**:
    ```bash
    node -e "console.log('Valid JSON:', !!JSON.parse(require('fs').readFileSync('portfolio-config.json')))"
    npm run type-check
    npm run build
    ```

---

## 🌎 Deployment

**Vercel (Recommended):**  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fanujjainbatu%2Fportfolio)

**Manual:**
- Push to GitHub
- Import to Vercel/Netlify/Railway
- Set environment variables
- Deploy!

---

## 🎨 Customization & Advanced Usage

- **Themes:** Edit `tailwind.config.ts`
- **New Sections:** Update JSON, add components/tools/types as needed
- **Analytics:** Integrate via `layout.tsx`
- **Image Hosting:** Local, GitHub, CDN

---

## 🆘 Troubleshooting & Support

- **AI Chat not working?** Check your API key and quota.
- **Images missing?** Ensure correct paths and filenames.
- **Build failing?** Validate JSON and run type checks.
- **Need help?**
  - [Open an Issue](https://github.com/anujjainbatu/portfolio/issues)
  - [Discussions](https://github.com/anujjainbatu/portfolio/discussions)
  - Email: anujjainbatu@gmail.com

---

## 📚 Documentation

Full guides in [`docs/`](docs/):

- [Contributing](docs/CONTRIBUTING.md)
- [License](docs/LICENSE)
- [Setup](#-quick-start-5-minutes)
- [Troubleshooting](#-troubleshooting--support)

