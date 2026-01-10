import { NextRequest, NextResponse } from "next/server";
import { scoreIdeaWithAI } from "@/lib/aiService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // 실제로는 데이터베이스에서 가져옴
    const idea = {
      id: Number(id),
      title: "Agent-Driven Onchain Credit Origination Platform",
      description:
        "AI 에이전트가 오프체인 신용 신호와 온체인 평판 오라클과 상호작용하여 무담보 대출 풀을 관리",
      trends: ["AI Agents", "Onchain Credit"],
      score: 8.5,
      status: "draft",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(idea);
  } catch (error) {
      return NextResponse.json(
        {
          error: error.message || "An error occurred while fetching the idea.",
        },
        { status: 500 }
      );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { idea } = body;

    if (!idea) {
      return NextResponse.json(
        { error: "Please provide idea information." },
        { status: 400 }
      );
    }

    const score = await scoreIdeaWithAI(idea);

    return NextResponse.json({
      id: Number(id),
      score,
      evaluatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("아이디어 점수화 오류:", error);
      return NextResponse.json(
        {
          error: error.message || "An error occurred while scoring the idea.",
        },
        { status: 500 }
      );
  }
}
