import Link from "next/link";
import { TrendingUp, Lightbulb, FileText, MessageSquare, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AI Product Manager Assistant
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered Product Manager Assistant Platform tailored for 2026 tech and crypto trends
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Trend Intelligence"
            description="Stay updated with the latest tech trends through real-time trend intelligence dashboard"
            href="/trends"
          />
          <FeatureCard
            icon={<Lightbulb className="w-8 h-8" />}
            title="Idea Generator"
            description="Automatically generate and evaluate trend-based product ideas"
            href="/ideas"
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8" />}
            title="Docs Suite"
            description="Automatically generate professional documents like PRD, GTM, and roadmaps"
            href="/docs"
          />
          <FeatureCard
            icon={<MessageSquare className="w-8 h-8" />}
            title="PM Assistant"
            description="Chat with AI chatbot to develop product strategies and receive feedback"
            href="/chat"
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Execution Dashboard"
            description="Track product progress and analyze it in relation to trends"
            href="/dashboard"
          />
        </div>

        <div className="text-center">
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-blue-600 dark:text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Link>
  );
}
