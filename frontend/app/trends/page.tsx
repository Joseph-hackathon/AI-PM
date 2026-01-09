import Link from "next/link";
import { ArrowLeft, Search, TrendingUp } from "lucide-react";

export default function TrendsPage() {
  const trends = [
    {
      id: 1,
      title: "Stablecoins as Settlement Rails",
      category: "DeFi",
      impact: "high",
      description: "Stablecoins evolving as payment infrastructure for traditional financial systems",
      opportunities: ["Cross-chain payments", "Enterprise remittance solutions", "Global limit order books"],
    },
    {
      id: 2,
      title: "Onchain Credit Markets",
      category: "DeFi",
      impact: "high",
      description: "Fusion of onchain credit markets and offchain signals",
      opportunities: ["AI agent-based credit scoring", "Unsecured lending pools", "Reputation oracles"],
    },
    {
      id: 3,
      title: "Privacy Infrastructure",
      category: "Infrastructure",
      impact: "medium",
      description: "Infrastructure for privacy protection",
      opportunities: ["Zero-knowledge proofs", "Anonymous transactions", "Data protection solutions"],
    },
    {
      id: 4,
      title: "AI Agents",
      category: "AI",
      impact: "high",
      description: "AI agents interacting with blockchain and operating autonomously",
      opportunities: ["Automated DeFi strategies", "Smart contract management", "Cross-chain bridging"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Trend Intelligence</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search trends (e.g., RWA perpetuals, privacy infrastructure)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend) => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TrendCard({ trend }: { trend: any }) {
  const impactColors = {
    high: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    medium: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    low: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded">
          {trend.category}
        </span>
        <span
          className={`px-2 py-1 text-xs rounded ${
            impactColors[trend.impact as keyof typeof impactColors]
          }`}
        >
          {trend.impact === "high" ? "High Impact" : trend.impact === "medium" ? "Medium Impact" : "Low Impact"}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{trend.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{trend.description}</p>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
          Opportunities:
        </div>
        <ul className="space-y-1">
          {trend.opportunities.map((opp: string, idx: number) => (
            <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
              • {opp}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          Generate Ideas
        </button>
      </div>
    </div>
  );
}
