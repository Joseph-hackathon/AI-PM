import { NextRequest, NextResponse } from "next/server";
import { researchHackathon, generateHackathonIdeas } from "@/lib/hackathonService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Hackathon URL is required." },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is not set in environment variables");
      return NextResponse.json(
        {
          error: "OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable in Vercel dashboard.",
        },
        { status: 500 }
      );
    }

    console.log("Starting hackathon research for URL:", url);
    const hackathonInfo = await researchHackathon(url);
    console.log("Hackathon research completed successfully");

    return NextResponse.json({ hackathonInfo });
  } catch (error: any) {
    console.error("Hackathon research error:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      {
        error: error.message || "Failed to research hackathon information. Please check the URL and try again.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { hackathonInfo, count = 10 } = body;

    if (!hackathonInfo) {
      return NextResponse.json(
        { error: "Hackathon information is required." },
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

    const ideas = await generateHackathonIdeas(hackathonInfo, count);

    return NextResponse.json({ ideas, count: ideas.length });
  } catch (error: any) {
    console.error("Hackathon idea generation error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to generate hackathon ideas.",
      },
      { status: 500 }
    );
  }
}
