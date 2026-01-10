import { NextRequest, NextResponse } from "next/server";

const mockTrends = [
  {
    id: 1,
    title: "Stablecoins as Settlement Rails",
    category: "DeFi",
    impact: "high",
    description: "Stablecoins evolving as payment infrastructure for traditional financial systems",
    opportunities: ["Cross-chain payments", "Enterprise remittance solutions", "Global limit order books"],
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
  } catch (error: any) {
    console.error("Trend API error:", error);
    return NextResponse.json(
      {
        error: error.message || "An error occurred while fetching the trend.",
      },
      { status: 500 }
    );
  }
}
