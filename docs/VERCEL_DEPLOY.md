# Vercel Deployment Guide

## Deployment Preparation

The project is configured for Vercel deployment. The backend API is integrated as Next.js API Routes, allowing deployment without a separate server.

## Deployment Steps

### 1. Push Project to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Connect Project to Vercel

1. Log in to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Select your GitHub repository
4. Project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### 3. Set Environment Variables

Set environment variables in the Vercel dashboard:

1. Project Settings → Environment Variables
2. Add the following variable:

```
OPENAI_API_KEY=your_openai_api_key_here
```

**Important**: 
- Add to Production, Preview, and Development environments
- Do not commit sensitive information to Git

### 4. Deploy

Vercel will automatically start deployment. A URL will be provided when deployment completes.

## Local Development Environment Setup

When developing locally, create a `frontend/.env.local` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Then run from the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

The project structure has been changed for Vercel deployment:

- **Frontend**: `frontend/` directory
- **API Routes**: `frontend/app/api/` directory (Next.js API Routes)
- **AI Service**: `frontend/lib/aiService.ts` (usable on both server and client)

## API Endpoints

After deployment, the following endpoints are available:

- `GET /api/trends` - List trends
- `GET /api/trends/search?q=...` - Search trends
- `GET /api/trends/[id]` - Get specific trend
- `POST /api/ideas/generate` - Generate ideas
- `GET /api/ideas` - List ideas
- `POST /api/docs/prd` - Generate PRD
- `POST /api/docs/gtm` - Generate GTM
- `POST /api/docs/roadmap` - Generate roadmap
- `POST /api/chat` - AI chatbot
- `GET /api/health` - Health check

## Troubleshooting

### Build Errors

1. **Dependency errors**: Verify all required packages are in `frontend/package.json`
2. **TypeScript errors**: Check `frontend/tsconfig.json` configuration
3. **Environment variable errors**: Verify environment variables are set correctly in Vercel dashboard

### Runtime Errors

1. **OpenAI API errors**: Verify API key is correct
2. **CORS errors**: Next.js API Routes run on the same domain, so no CORS issues
3. **Timeout**: Vercel serverless function timeout is 10 seconds (Hobby plan) or 60 seconds (Pro plan)

## Additional Optimizations

### Performance Optimization

1. **Caching**: Add appropriate cache headers to API responses
2. **Image optimization**: Use Next.js Image component
3. **Code splitting**: Leverage Next.js automatic code splitting

### Security

1. **API key protection**: Manage only through environment variables, do not expose to client
2. **Rate limiting**: Available on Vercel Pro plan
3. **Authentication**: Add user authentication system in the future

## References

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [OpenAI API Documentation](https://platform.openai.com/docs)
