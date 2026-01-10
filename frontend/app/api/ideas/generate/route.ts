import { NextRequest, NextResponse } from "next/server";
import { generateIdeasWithAI } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trends, count = 10, context } = body;

    if (!trends || !Array.isArray(trends) || trends.length === 0) {
      return NextResponse.json(
        { error: "Please provide an array of trends." },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set in environment variables");
      return NextResponse.json(
        {
          error: "OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable in Vercel dashboard.",
        },
        { status: 500 }
      );
    }

    console.log("Starting idea generation for trends:", trends);
    const ideas = await generateIdeasWithAI(trends, count, context);
    console.log("Idea generation completed successfully, generated", ideas.length, "ideas");

    return NextResponse.json({ ideas, count: ideas.length });
  } catch (error: any) {
    console.error("Idea generation error:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      {
        error: error.message || "An error occurred while generating ideas. Please try again.",
      },
      { status: 500 }
    );
  }
}
