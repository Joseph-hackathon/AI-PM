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

    const ideas = await generateIdeasWithAI(trends, count, context);

    return NextResponse.json({ ideas, count: ideas.length });
  } catch (error: any) {
    console.error("Idea generation error:", error);
    return NextResponse.json(
      {
        error: error.message || "An error occurred while generating ideas.",
      },
      { status: 500 }
    );
  }
}
