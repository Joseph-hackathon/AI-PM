import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // 실제로는 데이터베이스에서 가져옴
    const document = {
      id: Number(id),
      type: "PRD",
      title: "Agent-Driven Credit Platform PRD",
      content: "PRD 내용...",
      createdAt: "2024-01-15",
      status: "completed",
    };

    return NextResponse.json(document);
  } catch (error) {
      return NextResponse.json(
        {
          error: error.message || "An error occurred while fetching the document.",
        },
        { status: 500 }
      );
  }
}
