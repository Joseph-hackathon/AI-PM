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

    const hackathonInfo = await researchHackathon(url);

    return NextResponse.json({ hackathonInfo });
  } catch (error: any) {
    console.error("Hackathon research error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to research hackathon information.",
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
