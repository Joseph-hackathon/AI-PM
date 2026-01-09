import { NextRequest, NextResponse } from "next/server";
import { generateGTMWithAI } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productConcept, targetMarket, context } = body;

    if (!productConcept) {
      return NextResponse.json(
        { error: "제품 개념을 제공해주세요." },
        { status: 400 }
      );
    }

    const gtm = await generateGTMWithAI(productConcept, targetMarket, context);

    return NextResponse.json({ gtm, generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("GTM 생성 오류:", error);
    return NextResponse.json(
      { error: "GTM 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
