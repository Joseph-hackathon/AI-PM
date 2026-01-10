import { NextRequest, NextResponse } from "next/server";
import { chatWithAIAssistant } from "@/lib/aiService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Please provide a message." },
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
  } catch (error: any) {
    console.error("Chat error:", error);
    return NextResponse.json(
      {
        error: error.message || "An error occurred while generating the chat response.",
      },
      { status: 500 }
    );
  }
}
