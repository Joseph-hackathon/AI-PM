import { NextRequest, NextResponse } from "next/server";
import { chatWithAIAssistant } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: "메시지를 제공해주세요." },
        { status: 400 }
      );
    }

    const response = await chatWithAIAssistant(
      message,
      conversationHistory || [],
      context
    );

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("채팅 오류:", error);
    return NextResponse.json(
      { error: "채팅 응답 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
