# AI Product Manager Assistant Platform

An AI-powered Product Manager Assistant Platform tailored for 2026 tech and crypto trends.

## 🎯 Product Vision

Empower builders, founders, researchers, and teams to rapidly ideate, validate, and plan products aligned with 2026 macro trends, especially in crypto, AI, DeFi, and cross-domain innovation.

## ✨ Core Features

1. **AI Trend Intelligence Hub** - Real-time trend intelligence dashboard
2. **AI Product Ideation Generator** - Trend-based product idea generator
3. **Product Strategy & Docs Suite** - Automated PRD, GTM, and roadmap generation
4. **Conversational PM Assistant** - AI chatbot-based product strategy assistant
5. **Insight Execution Dashboard** - Product progress tracking and analysis

## 🚀 Tech Stack

### Frontend
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query

### Backend
- Node.js / Express or Python FastAPI
- OpenAI API / Anthropic Claude
- PostgreSQL / MongoDB
- Redis (Caching)

### AI & Integration
- OpenAI GPT-4 / Claude 3
- Vector Database (Trend Search)
- External Trend Data Feeds

## 📁 Project Structure

```
├── frontend/          # Next.js Frontend
├── backend/           # API Server
├── shared/            # Shared Types & Utilities
├── docs/              # Documentation
└── scripts/           # Utility Scripts
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API Key (Optional - uses mock responses if not provided)

### Local Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables (optional)
# Create frontend/.env.local file
echo "OPENAI_API_KEY=your_api_key_here" > .env.local

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser

### Vercel Deployment

See [docs/VERCEL_DEPLOY.md](docs/VERCEL_DEPLOY.md) for detailed deployment guide.

**Quick Deploy:**
1. Push project to GitHub
2. Login to [Vercel](https://vercel.com) and connect project
3. **Important**: Set Root Directory to `frontend` in Vercel dashboard:
   - Settings → General → Root Directory → Override → Enter `frontend` → Save
4. Add environment variable `OPENAI_API_KEY`:
   - Settings → Environment Variables → Add `OPENAI_API_KEY`
5. Deploy!

**Troubleshooting**: If you see `cd frontend: No such file or directory` error, see [docs/VERCEL_FIX.md](docs/VERCEL_FIX.md)

## 📄 License

MIT
