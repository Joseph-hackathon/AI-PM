import { Request, Response } from "express";
import { generateIdeasWithAI, scoreIdeaWithAI } from "../services/aiService";

export const generateIdeas = async (req: Request, res: Response) => {
  try {
    const { trends, count = 10, context } = req.body;

    if (!trends || !Array.isArray(trends) || trends.length === 0) {
      return res.status(400).json({ error: "트렌드 배열을 제공해주세요." });
    }

    // AI 서비스를 통해 아이디어 생성
    const ideas = await generateIdeasWithAI(trends, count, context);

    res.json({ ideas, count: ideas.length });
  } catch (error) {
    console.error("아이디어 생성 오류:", error);
    res.status(500).json({ error: "아이디어 생성 중 오류가 발생했습니다." });
  }
};

export const getIdeas = async (req: Request, res: Response) => {
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

    res.json({ ideas, total: ideas.length });
  } catch (error) {
    res.status(500).json({ error: "아이디어를 가져오는 중 오류가 발생했습니다." });
  }
};

export const getIdeaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
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

    res.json(idea);
  } catch (error) {
    res.status(500).json({ error: "아이디어를 가져오는 중 오류가 발생했습니다." });
  }
};

export const scoreIdea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { idea } = req.body;

    if (!idea) {
      return res.status(400).json({ error: "아이디어 정보를 제공해주세요." });
    }

    // AI 서비스를 통해 아이디어 점수화
    const score = await scoreIdeaWithAI(idea);

    res.json({ id: Number(id), score, evaluatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("아이디어 점수화 오류:", error);
    res.status(500).json({ error: "아이디어 점수화 중 오류가 발생했습니다." });
  }
};
