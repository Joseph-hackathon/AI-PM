import Link from "next/link";
import { ArrowLeft, TrendingUp, Lightbulb, FileText, MessageSquare } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Trends"
            value="24"
            icon={<TrendingUp className="w-5 h-5" />}
            change="+12%"
          />
          <StatCard
            title="Generated Ideas"
            value="156"
            icon={<Lightbulb className="w-5 h-5" />}
            change="+8"
          />
          <StatCard
            title="Generated Documents"
            value="42"
            icon={<FileText className="w-5 h-5" />}
            change="+5"
          />
          <StatCard
            title="AI Conversations"
            value="89"
            icon={<MessageSquare className="w-5 h-5" />}
            change="+23"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <ActivityItem
                title="New trend analysis completed"
                time="2 hours ago"
                type="trend"
              />
              <ActivityItem
                title="Product idea generated"
                time="5 hours ago"
                type="idea"
              />
              <ActivityItem
                title="PRD document generated"
                time="1 day ago"
                type="doc"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/trends"
                className="block p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                Explore Trends
              </Link>
              <Link
                href="/ideas/generate"
                className="block p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                Generate Ideas
              </Link>
              <Link
                href="/chat"
                className="block p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                Chat with AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  change,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-600 dark:text-gray-400 text-sm">{title}</div>
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-green-600 dark:text-green-400 text-sm">{change}</div>
    </div>
  );
}

function ActivityItem({
  title,
  time,
  type,
}: {
  title: string;
  time: string;
  type: "trend" | "idea" | "doc";
}) {
  const colors = {
    trend: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    idea: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    doc: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`w-2 h-2 rounded-full ${colors[type]}`} />
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{time}</div>
      </div>
    </div>
  );
}
