# Installation and Setup Guide

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- OpenAI API Key (Optional - uses mock responses if not provided)
- PostgreSQL or MongoDB (Optional - currently memory-based)

## Installation Steps

### 1. Install Project Dependencies

```bash
npm run install:all
```

Or individually:

```bash
# Root dependencies
npm install

# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

### 2. Set Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# API Keys
OPENAI_API_KEY=your_openai_api_key_here

# Database (optional)
DATABASE_URL=postgresql://user:password@localhost:5432/ai_pm_platform

# Server
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run Development Server

#### Option 1: Run Simultaneously (Recommended)

```bash
npm run dev
```

This command runs both frontend (port 3000) and backend (port 3001) simultaneously.

#### Option 2: Run Individually

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 4. Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## Production Build

### Build

```bash
npm run build
```

### Run

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start
```

## Troubleshooting

### Port Conflict

If port 3000 or 3001 is already in use:

1. Change `PORT` in `.env` file
2. Check port settings in `frontend/next.config.js`

### OpenAI API Errors

If API key is missing or incorrect:
- Mock responses will be automatically returned
- Warning messages will be displayed in console

### Dependency Installation Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Database setup (optional)
2. Authentication system implementation
3. External trend data source integration
4. File export functionality
