"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Link as LinkIcon, Sparkles, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface HackathonInfo {
  title: string;
  description: string;
  tracks: string[];
  requirements: string[];
  background: string;
  themes: string[];
  prizes?: string[];
  timeline?: string;
}

export default function HackathonPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [hackathonInfo, setHackathonInfo] = useState<HackathonInfo | null>(null);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [generatingIdeas, setGeneratingIdeas] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(10);

  const handleResearch = async () => {
    if (!url.trim()) {
      setError("Please enter a hackathon URL.");
      return;
    }

    setLoading(true);
    setError(null);
    setHackathonInfo(null);
    setIdeas([]);

    try {
      const response = await fetch("/api/hackathon/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to research hackathon");
      }

      const data = await response.json();
      setHackathonInfo(data.hackathonInfo);
    } catch (err: any) {
      setError(err.message || "An error occurred while researching the hackathon.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateIdeas = async () => {
    if (!hackathonInfo) return;

    setGeneratingIdeas(true);
    setError(null);
    setIdeas([]);

    try {
      const response = await fetch("/api/hackathon/research", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hackathonInfo, count }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate ideas");
      }

      const data = await response.json();
      setIdeas(data.ideas || []);
    } catch (err: any) {
      setError(err.message || "An error occurred while generating ideas.");
    } finally {
      setGeneratingIdeas(false);
    }
  };

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

        <h1 className="text-3xl font-bold mb-8">Hackathon Research & Idea Generator</h1>

        {/* URL Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Enter Hackathon URL</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/hackathon"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && handleResearch()}
              />
            </div>
            <button
              onClick={handleResearch}
              disabled={loading || !url.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Researching...
                </>
              ) : (
                <>
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Research
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-red-800 dark:text-red-200">{error}</div>
          </div>
        )}

        {/* Hackathon Info Section */}
        {hackathonInfo && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{hackathonInfo.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{hackathonInfo.description}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Tracks</h3>
                <div className="flex flex-wrap gap-2">
                  {hackathonInfo.tracks.map((track, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                    >
                      {track}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {hackathonInfo.themes.map((theme, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {hackathonInfo.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {hackathonInfo.background && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Background</h3>
                <p className="text-gray-700 dark:text-gray-300">{hackathonInfo.background}</p>
              </div>
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex-1">
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
              <button
                onClick={handleGenerateIdeas}
                disabled={generatingIdeas}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {generatingIdeas ? (
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
          </div>
        )}

        {/* Generated Ideas Section */}
        {ideas.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Generated Ideas ({ideas.length})</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {ideas.map((idea, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2">{idea.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {idea.description}
                  </p>

                  {idea.tracks && idea.tracks.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Tracks:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {idea.tracks.map((track: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded"
                          >
                            {track}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {idea.features && idea.features.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Features:
                      </div>
                      <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                        {idea.features.map((feature: string, idx: number) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {idea.techStack && idea.techStack.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Tech Stack:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {idea.techStack.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {idea.alignment && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        Alignment:
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300">{idea.alignment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
