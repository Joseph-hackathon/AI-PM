import { NextRequest, NextResponse } from "next/server";
import { generatePRDWithAI } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productConcept, context, requirements } = body;

    if (!productConcept) {
      return NextResponse.json(
        { error: "제품 개념을 제공해주세요." },
        { status: 400 }
      );
    }

    const prd = await generatePRDWithAI(productConcept, context, requirements);

    return NextResponse.json({ prd, generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("PRD 생성 오류:", error);
    return NextResponse.json(
      { error: "PRD 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
