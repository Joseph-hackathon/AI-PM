// 공유 타입 정의

export interface Trend {
  id: number;
  title: string;
  category: string;
  impact: "high" | "medium" | "low";
  description: string;
  opportunities: string[];
  sources?: string[];
  createdAt: string;
}

export interface Idea {
  id: number;
  title: string;
  description: string;
  trends: string[];
  painPoints?: string[];
  features?: string[];
  revenueModel?: string;
  competitiveAlternatives?: string[];
  score?: number;
  status: "draft" | "review" | "approved";
  createdAt: string;
}

export interface Document {
  id: number;
  type: "PRD" | "GTM" | "Roadmap" | "Pitch" | "OKR" | "Business Model";
  title: string;
  content?: string;
  status: "draft" | "completed";
  createdAt: string;
}

export interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface GenerateIdeasRequest {
  trends: string[];
  count?: number;
  context?: string;
}

export interface GeneratePRDRequest {
  productConcept: string;
  context?: string;
  requirements?: string[];
}

export interface GenerateGTMRequest {
  productConcept: string;
  targetMarket?: string;
  context?: string;
}

export interface GenerateRoadmapRequest {
  productConcept: string;
  timeline?: string;
  milestones?: string[];
  context?: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
  context?: any;
}
