import { Request, Response } from "express";
import {
  generatePRDWithAI,
  generateGTMWithAI,
  generateRoadmapWithAI,
} from "../services/aiService";

export const generatePRD = async (req: Request, res: Response) => {
  try {
    const { productConcept, context, requirements } = req.body;

    if (!productConcept) {
      return res.status(400).json({ error: "제품 개념을 제공해주세요." });
    }

    const prd = await generatePRDWithAI(productConcept, context, requirements);

    res.json({ prd, generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("PRD 생성 오류:", error);
    res.status(500).json({ error: "PRD 생성 중 오류가 발생했습니다." });
  }
};

export const generateGTM = async (req: Request, res: Response) => {
  try {
    const { productConcept, targetMarket, context } = req.body;

    if (!productConcept) {
      return res.status(400).json({ error: "제품 개념을 제공해주세요." });
    }

    const gtm = await generateGTMWithAI(productConcept, targetMarket, context);

    res.json({ gtm, generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("GTM 생성 오류:", error);
    res.status(500).json({ error: "GTM 생성 중 오류가 발생했습니다." });
  }
};

export const generateRoadmap = async (req: Request, res: Response) => {
  try {
    const { productConcept, timeline, milestones, context } = req.body;

    if (!productConcept) {
      return res.status(400).json({ error: "제품 개념을 제공해주세요." });
    }

    const roadmap = await generateRoadmapWithAI(
      productConcept,
      timeline,
      milestones,
      context
    );

    res.json({ roadmap, generatedAt: new Date().toISOString() });
  } catch (error) {
    console.error("로드맵 생성 오류:", error);
    res.status(500).json({ error: "로드맵 생성 중 오류가 발생했습니다." });
  }
};

export const getDocuments = async (req: Request, res: Response) => {
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

    res.json({ documents, total: documents.length });
  } catch (error) {
    res.status(500).json({ error: "문서를 가져오는 중 오류가 발생했습니다." });
  }
};

export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // 실제로는 데이터베이스에서 가져옴
    const document = {
      id: Number(id),
      type: "PRD",
      title: "Agent-Driven Credit Platform PRD",
      content: "PRD 내용...",
      createdAt: "2024-01-15",
      status: "completed",
    };

    res.json(document);
  } catch (error) {
    res.status(500).json({ error: "문서를 가져오는 중 오류가 발생했습니다." });
  }
};
