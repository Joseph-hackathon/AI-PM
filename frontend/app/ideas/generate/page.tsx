"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { ideasApi } from "@/lib/api";

export default function GenerateIdeasPage() {
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [count, setCount] = useState(10);
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<any[]>([]);

  const availableTrends = [
    "Stablecoins as Settlement Rails",
    "Onchain Credit Markets",
    "Privacy Infrastructure",
    "AI Agents",
    "RWA Perpetuals",
    "Cross-Chain Infrastructure",
  ];

  const toggleTrend = (trend: string) => {
    if (selectedTrends.includes(trend)) {
      setSelectedTrends(selectedTrends.filter((t) => t !== trend));
    } else {
      setSelectedTrends([...selectedTrends, trend]);
    }
  };

  const handleGenerate = async () => {
    if (selectedTrends.length === 0) {
      alert("Please select at least one trend.");
      return;
    }

    setLoading(true);
    setGeneratedIdeas([]);
    try {
      const response = await ideasApi.generate({
        trends: selectedTrends,
        count,
        context: context || undefined,
      });
      if (response.data && response.data.ideas) {
        setGeneratedIdeas(response.data.ideas);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Idea generation error:", error);
      const errorMessage = error.response?.data?.error || error.message || "An error occurred while generating ideas.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/ideas"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Ideas
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Generate Ideas</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Select Trends (at least 1)
              </label>
              <div className="space-y-2">
                {availableTrends.map((trend) => (
                  <label
                    key={trend}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTrends.includes(trend)}
                      onChange={() => toggleTrend(trend)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm">{trend}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Number of Ideas to Generate
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Additional Context (Optional)
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Enter additional information that will help generate product ideas..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || selectedTrends.length === 0}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Ideas
                </>
              )}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Ideas</h2>
            {generatedIdeas.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                Select trends and generate ideas.
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {generatedIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <h3 className="font-semibold mb-2">{idea.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {idea.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {idea.trends?.map((trend: string) => (
                        <span
                          key={trend}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
                        >
                          {trend}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
