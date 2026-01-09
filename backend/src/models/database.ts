// 데이터베이스 스키마 정의 (TypeScript 인터페이스)
// 실제 구현에서는 Prisma, TypeORM, 또는 Mongoose를 사용할 수 있습니다.

export interface TrendModel {
  id: number;
  title: string;
  category: string;
  impact: "high" | "medium" | "low";
  description: string;
  opportunities: string[];
  sources: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IdeaModel {
  id: number;
  title: string;
  description: string;
  trends: string[];
  painPoints: string[];
  features: string[];
  revenueModel: string;
  competitiveAlternatives: string[];
  score: number | null;
  status: "draft" | "review" | "approved";
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentModel {
  id: number;
  type: "PRD" | "GTM" | "Roadmap" | "Pitch" | "OKR" | "Business Model";
  title: string;
  content: string;
  status: "draft" | "completed";
  ideaId: number | null;
  userId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
  tier: "free" | "pro" | "enterprise";
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatSessionModel {
  id: number;
  userId: number | null;
  messages: any[];
  context: any;
  createdAt: Date;
  updatedAt: Date;
}

// SQL 스키마 예시 (PostgreSQL)
export const SQL_SCHEMA = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  tier VARCHAR(20) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trends table
CREATE TABLE IF NOT EXISTS trends (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  impact VARCHAR(20) NOT NULL,
  description TEXT,
  opportunities JSONB,
  sources JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  trends JSONB,
  pain_points JSONB,
  features JSONB,
  revenue_model VARCHAR(255),
  competitive_alternatives JSONB,
  score DECIMAL(3,1),
  status VARCHAR(20) DEFAULT 'draft',
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  status VARCHAR(20) DEFAULT 'draft',
  idea_id INTEGER REFERENCES ideas(id),
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  messages JSONB,
  context JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ideas_user_id ON ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_trends_category ON trends(category);
CREATE INDEX IF NOT EXISTS idx_trends_impact ON trends(impact);
`;

// MongoDB 스키마 예시 (Mongoose)
export const MONGOOSE_SCHEMAS = `
// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  tier: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
}, { timestamps: true });

// Trend Schema
const trendSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  impact: { type: String, enum: ['high', 'medium', 'low'], required: true },
  description: String,
  opportunities: [String],
  sources: [String],
}, { timestamps: true });

// Idea Schema
const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  trends: [String],
  painPoints: [String],
  features: [String],
  revenueModel: String,
  competitiveAlternatives: [String],
  score: Number,
  status: { type: String, enum: ['draft', 'review', 'approved'], default: 'draft' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Document Schema
const documentSchema = new mongoose.Schema({
  type: { type: String, enum: ['PRD', 'GTM', 'Roadmap', 'Pitch', 'OKR', 'Business Model'], required: true },
  title: { type: String, required: true },
  content: String,
  status: { type: String, enum: ['draft', 'completed'], default: 'draft' },
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Chat Session Schema
const chatSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'] },
    content: String,
    timestamp: Date,
  }],
  context: mongoose.Schema.Types.Mixed,
}, { timestamps: true });
`;
