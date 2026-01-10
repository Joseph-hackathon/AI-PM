import { NextRequest, NextResponse } from "next/server";
import { generateRoadmapWithAI } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productConcept, timeline, milestones, context } = body;

    if (!productConcept) {
      return NextResponse.json(
        { error: "Please provide a product concept." },
        { status: 400 }
      );
    }

    const roadmap = await generateRoadmapWithAI(
      productConcept,
      timeline,
      milestones,
      context
    );

    return NextResponse.json({
      roadmap,
      generatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Roadmap generation error:", error);
    return NextResponse.json(
      {
        error: error.message || "An error occurred while generating the roadmap.",
      },
      { status: 500 }
    );
  }
}
