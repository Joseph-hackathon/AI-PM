# Deployment Guide

## Vercel Deployment (Recommended)

This project is optimized for Vercel. See [docs/VERCEL_DEPLOY.md](docs/VERCEL_DEPLOY.md) for detailed information.

### Quick Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Select your GitHub repository
   - Settings:
     - **Root Directory**: `frontend`
     - **Framework**: Next.js (auto-detected)

3. **Set Environment Variables**
   - Project Settings → Environment Variables
   - Add the following variable:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```
   - Add to Production, Preview, and Development

4. **Deploy Complete!**
   - Vercel will automatically start deployment
   - Access the provided URL after deployment

## Local Development

```bash
cd frontend
npm install

# Set environment variables
echo "OPENAI_API_KEY=your_api_key" > .env.local

npm run dev
```

## Environment Variables

### Required (Vercel)
- `OPENAI_API_KEY`: OpenAI API key

### Optional
- `NEXT_PUBLIC_API_URL`: API URL (default: current domain)

## Troubleshooting

### Build Failure
- Check dependencies in `frontend/package.json`
- Verify Node.js version (18+)

### API Errors
- Verify environment variables are set correctly
- Check environment variables in Vercel dashboard

### Timeout
- Vercel Hobby plan: 10 seconds
- Vercel Pro plan: 60 seconds
- Pro plan recommended for longer responses
