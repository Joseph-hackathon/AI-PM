import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 실제로는 데이터베이스에서 가져옴
    const ideas = [
      {
        id: 1,
        title: "Agent-Driven Onchain Credit Origination Platform",
        description:
          "AI 에이전트가 오프체인 신용 신호와 온체인 평판 오라클과 상호작용하여 무담보 대출 풀을 관리",
        trends: ["AI Agents", "Onchain Credit"],
        score: 8.5,
        status: "draft",
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({ ideas, total: ideas.length });
  } catch (error) {
    return NextResponse.json(
      { error: "아이디어를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
