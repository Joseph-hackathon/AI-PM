# Quick Start Guide

## Vercel Deployment (5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Connect to Vercel
1. Visit [vercel.com](https://vercel.com) and log in
2. Click "Add New Project"
3. Select your GitHub repository
4. Project settings:
   - **Root Directory**: Select `frontend`
   - Framework is automatically detected as Next.js

### Step 3: Set Environment Variables
Vercel Dashboard → Project Settings → Environment Variables:

```
OPENAI_API_KEY = your_openai_api_key_here
```

**Important**: Add to Production, Preview, and Development environments

### Step 4: Deploy
- Click "Deploy" button
- Access the provided URL after deployment completes

## Local Development

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Set environment variables
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local

# Run development server
npm run dev
```

Access http://localhost:3000

## Key Changes

✅ Backend integrated into Next.js API Routes
✅ Ready to deploy on Vercel
✅ Environment variables managed in Vercel dashboard
✅ Single project includes both frontend and backend

## API Endpoints

After deployment, the following endpoints are available:
- `/api/trends` - View trends
- `/api/ideas/generate` - Generate ideas
- `/api/docs/prd` - Generate PRD
- `/api/docs/gtm` - Generate GTM
- `/api/docs/roadmap` - Generate roadmap
- `/api/chat` - AI chatbot

## Troubleshooting

**Build failed?**
- Check `frontend/package.json`
- Node.js 18+ required

**API errors?**
- Check Vercel environment variables
- Verify API key is correct

**Timeout?**
- Vercel Hobby: 10 second limit
- Vercel Pro: 60 second limit
