import { NextRequest, NextResponse } from "next/server";

const mockTrends = [
  {
    id: 1,
    title: "Stablecoins as Settlement Rails",
    category: "DeFi",
    impact: "high",
    description: "스테이블코인이 전통 금융 시스템의 결제 인프라로 진화",
    opportunities: ["크로스체인 결제", "기업 송금 솔루션", "글로벌 리밋 오더북"],
    sources: ["Coinbase Ventures 2026"],
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Onchain Credit Markets",
    category: "DeFi",
    impact: "high",
      description: "Fusion of onchain credit markets and offchain signals",
      opportunities: ["AI agent-based credit scoring", "Unsecured lending pools", "Reputation oracles"],
    sources: ["Coinbase Ventures 2026"],
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Privacy Infrastructure",
    category: "Infrastructure",
    impact: "medium",
      description: "Infrastructure for privacy protection",
      opportunities: ["Zero-knowledge proofs", "Anonymous transactions", "Data protection solutions"],
    sources: ["a16z Crypto 2026"],
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "AI Agents",
    category: "AI",
    impact: "high",
      description: "AI agents interacting with blockchain and operating autonomously",
      opportunities: ["Automated DeFi strategies", "Smart contract management", "Cross-chain bridging"],
    sources: ["a16z Crypto 2026", "Coinbase Ventures 2026"],
    createdAt: new Date().toISOString(),
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const trend = mockTrends.find((t) => t.id === Number(id));

    if (!trend) {
      return NextResponse.json(
        { error: "Trend not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(trend);
  } catch (error) {
      return NextResponse.json(
        {
          error: error.message || "An error occurred while fetching the trend.",
        },
        { status: 500 }
      );
  }
}
