"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { docsApi } from "@/lib/api";

export default function GenerateDocsPage() {
  const [docType, setDocType] = useState<"PRD" | "GTM" | "Roadmap">("PRD");
  const [productConcept, setProductConcept] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<any>(null);

  const handleGenerate = async () => {
    if (!productConcept.trim()) {
      alert("Please enter a product concept.");
      return;
    }

    setLoading(true);
    try {
      let response;
      switch (docType) {
        case "PRD":
          response = await docsApi.generatePRD({
            productConcept,
            context: context || undefined,
          });
          break;
        case "GTM":
          response = await docsApi.generateGTM({
            productConcept,
            context: context || undefined,
          });
          break;
        case "Roadmap":
          response = await docsApi.generateRoadmap({
            productConcept,
            context: context || undefined,
          });
          break;
      }
      setGeneratedDoc(response.data);
    } catch (error) {
      console.error("문서 생성 오류:", error);
      alert("An error occurred while generating the document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/docs"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documents
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Generate Document</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Document Type
              </label>
              <select
                value={docType}
                onChange={(e) =>
                  setDocType(e.target.value as "PRD" | "GTM" | "Roadmap")
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700"
              >
                <option value="PRD">Product Requirements Document (PRD)</option>
                <option value="GTM">Go-to-Market Plan (GTM)</option>
                <option value="Roadmap">Product Roadmap</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Product Concept *
              </label>
              <input
                type="text"
                value={productConcept}
                onChange={(e) => setProductConcept(e.target.value)}
                placeholder="e.g., Agent-Driven Onchain Credit Platform"
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
                placeholder="Additional information about the product, target users, market conditions, etc..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !productConcept.trim()}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Generate Document
                </>
              )}
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Document</h2>
            {!generatedDoc ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                Enter a product concept and generate a document.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {generatedDoc.title || generatedDoc.prd?.title || generatedDoc.gtm?.title || generatedDoc.roadmap?.title}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Generated: {new Date(generatedDoc.generatedAt || Date.now()).toLocaleDateString("en-US")}
                  </div>
                </div>
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-[600px]">
                    {generatedDoc.content || generatedDoc.prd?.content || generatedDoc.gtm?.content || generatedDoc.roadmap?.content || "No document content available."}
                  </pre>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Download
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
