import { NextRequest, NextResponse } from "next/server";
import { generateIdeasWithAI } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { trends, count = 10, context } = body;

    if (!trends || !Array.isArray(trends) || trends.length === 0) {
      return NextResponse.json(
        { error: "트렌드 배열을 제공해주세요." },
        { status: 400 }
      );
    }

    const ideas = await generateIdeasWithAI(trends, count, context);

    return NextResponse.json({ ideas, count: ideas.length });
  } catch (error) {
    console.error("아이디어 생성 오류:", error);
    return NextResponse.json(
      { error: "아이디어 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
