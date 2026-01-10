import axios from "axios";

// Vercel 배포 시 같은 도메인 사용
const API_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Trends API
export const trendsApi = {
  getAll: (params?: { category?: string; impact?: string; limit?: number }) =>
    api.get("/trends", { params }),
  search: (query: string) => api.get("/trends/search", { params: { q: query } }),
  getById: (id: number) => api.get(`/trends/${id}`),
};

// Ideas API
export const ideasApi = {
  generate: (data: { trends: string[]; count?: number; context?: string }) =>
    api.post("/ideas/generate", data),
  getAll: () => api.get("/ideas"),
  getById: (id: number) => api.get(`/ideas/${id}`),
  score: (id: number, idea: any) => api.post(`/ideas/${id}/score`, { idea }),
};

// Docs API
export const docsApi = {
  generatePRD: (data: {
    productConcept: string;
    context?: string;
    requirements?: string[];
  }) => api.post("/docs/prd", data),
  generateGTM: (data: {
    productConcept: string;
    targetMarket?: string;
    context?: string;
  }) => api.post("/docs/gtm", data),
  generateRoadmap: (data: {
    productConcept: string;
    timeline?: string;
    milestones?: string[];
    context?: string;
  }) => api.post("/docs/roadmap", data),
  getAll: () => api.get("/docs"),
  getById: (id: number) => api.get(`/docs/${id}`),
};

// Chat API
export const chatApi = {
  sendMessage: (data: {
    message: string;
    conversationHistory?: any[];
    context?: any;
  }) => api.post("/chat", data),
};

// Hackathon API
export const hackathonApi = {
  research: (url: string) => api.post("/hackathon/research", { url }),
  generateIdeas: (hackathonInfo: any, count?: number) =>
    api.put("/hackathon/research", { hackathonInfo, count }),
};

export default api;
