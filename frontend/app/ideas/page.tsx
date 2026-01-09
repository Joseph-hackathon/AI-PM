import Link from "next/link";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";

export default function IdeasPage() {
  const ideas = [
    {
      id: 1,
      title: "Agent-Driven Onchain Credit Origination Platform",
      description: "AI agents interact with offchain credit signals and onchain reputation oracles to manage unsecured lending pools",
      trends: ["AI Agents", "Onchain Credit"],
      score: 8.5,
      status: "draft",
    },
    {
      id: 2,
      title: "Cross-Chain Stablecoin Settlement Network",
      description: "Stablecoin-based payment network for cross-chain payments between enterprises",
      trends: ["Stablecoins", "Infrastructure"],
      score: 7.8,
      status: "review",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <Link
            href="/ideas/generate"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Idea
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Idea Lab</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </div>
  );
}

function IdeaCard({ idea }: { idea: any }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Score: {idea.score}/10
          </span>
        </div>
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
          {idea.status === "draft" ? "Draft" : "Review"}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{idea.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {idea.trends.map((trend: string) => (
          <span
            key={trend}
            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
          >
            {trend}
          </span>
        ))}
      </div>
      <div className="flex space-x-2">
        <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
          View Details
        </button>
        <button className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm">
          Generate Doc
        </button>
      </div>
    </div>
  );
}
