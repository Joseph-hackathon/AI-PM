import { NextRequest, NextResponse } from "next/server";

// Mock trend data
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const impact = searchParams.get("impact");
    const limit = parseInt(searchParams.get("limit") || "50");
    const q = searchParams.get("q");

    // Search endpoint
    if (q) {
      const query = q.toLowerCase();
      const results = mockTrends.filter(
        (trend) =>
          trend.title.toLowerCase().includes(query) ||
          trend.description.toLowerCase().includes(query) ||
          trend.opportunities.some((opp) => opp.toLowerCase().includes(query))
      );
      return NextResponse.json({ trends: results, query: q });
    }

    // Filter trends
    let filteredTrends = [...mockTrends];

    if (category) {
      filteredTrends = filteredTrends.filter(
        (t) => t.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (impact) {
      filteredTrends = filteredTrends.filter((t) => t.impact === impact);
    }

    return NextResponse.json({
      trends: filteredTrends.slice(0, limit),
      total: filteredTrends.length,
    });
  } catch (error: any) {
    console.error("Trends API error:", error);
    return NextResponse.json(
      {
        error: error.message || "An error occurred while fetching trends.",
      },
      { status: 500 }
    );
  }
}
