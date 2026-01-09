import Link from "next/link";
import { ArrowLeft, FileText, Download, Plus } from "lucide-react";

export default function DocsPage() {
  const documents = [
    {
      id: 1,
      type: "PRD",
      title: "Agent-Driven Credit Platform PRD",
      createdAt: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "GTM",
      title: "Cross-Chain Settlement GTM Plan",
      createdAt: "2024-01-14",
      status: "draft",
    },
    {
      id: 3,
      type: "Roadmap",
      title: "Q1 2024 Product Roadmap",
      createdAt: "2024-01-10",
      status: "completed",
    },
  ];

  const templates = [
    { type: "PRD", name: "Product Requirements Document" },
    { type: "GTM", name: "Go-to-Market Playbook" },
    { type: "Roadmap", name: "Product Roadmap" },
    { type: "Pitch", name: "Investor Pitch Deck" },
    { type: "OKR", name: "Objectives & Key Results" },
    { type: "Business Model", name: "Business Model Canvas" },
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
            href="/docs/generate"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Document
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Docs & Templates</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">My Documents</h2>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="font-semibold">{doc.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.type} • {doc.createdAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                      {doc.status === "completed" ? "Completed" : "Draft"}
                    </span>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Templates</h2>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => (
                <button
                  key={template.type}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-left hover:shadow-lg transition-shadow"
                >
                  <div className="font-semibold mb-1">{template.type}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {template.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
