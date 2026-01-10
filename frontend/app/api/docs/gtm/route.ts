import { NextRequest, NextResponse } from "next/server";
import { generateGTMWithAI } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productConcept, targetMarket, context } = body;

    if (!productConcept) {
      return NextResponse.json(
        { error: "Please provide a product concept." },
        { status: 400 }
      );
    }

    const gtm = await generateGTMWithAI(productConcept, targetMarket, context);

    return NextResponse.json({ gtm, generatedAt: new Date().toISOString() });
  } catch (error: any) {
    console.error("GTM generation error:", error);
    return NextResponse.json(
      {
        error: error.message || "An error occurred while generating the GTM plan.",
      },
      { status: 500 }
    );
  }
}
