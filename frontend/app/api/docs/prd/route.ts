import { NextRequest, NextResponse } from "next/server";
import { generatePRDWithAI } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productConcept, context, requirements } = body;

    if (!productConcept) {
      return NextResponse.json(
        { error: "Please provide a product concept." },
        { status: 400 }
      );
    }

    const prd = await generatePRDWithAI(productConcept, context, requirements);

    return NextResponse.json({ prd, generatedAt: new Date().toISOString() });
  } catch (error: any) {
    console.error("PRD generation error:", error);
    return NextResponse.json(
      {
        error: error.message || "An error occurred while generating the PRD.",
      },
      { status: 500 }
    );
  }
}
