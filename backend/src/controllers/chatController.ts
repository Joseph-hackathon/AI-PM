import { Request, Response } from "express";
import { chatWithAIAssistant } from "../services/aiService";

export const chatWithAssistant = async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "메시지를 제공해주세요." });
    }

    const response = await chatWithAIAssistant(
      message,
      conversationHistory || [],
      context
    );

    res.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("채팅 오류:", error);
    res.status(500).json({ error: "채팅 응답 생성 중 오류가 발생했습니다." });
  }
};
