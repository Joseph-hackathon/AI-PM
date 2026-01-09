import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 실제로는 데이터베이스에서 가져옴
    const documents = [
      {
        id: 1,
        type: "PRD",
        title: "Agent-Driven Credit Platform PRD",
        createdAt: "2024-01-15",
        status: "completed",
      },
    ];

    return NextResponse.json({ documents, total: documents.length });
  } catch (error) {
    return NextResponse.json(
      { error: "문서를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
