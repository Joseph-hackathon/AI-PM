import { NextRequest, NextResponse } from "next/server";
import { generateRoadmapWithAI } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productConcept, timeline, milestones, context } = body;

    if (!productConcept) {
      return NextResponse.json(
        { error: "제품 개념을 제공해주세요." },
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
  } catch (error) {
    console.error("로드맵 생성 오류:", error);
    return NextResponse.json(
      { error: "로드맵 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
