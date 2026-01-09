import OpenAI from "openai";

// OpenAI 클라이언트 초기화 (API 키가 없으면 모의 응답 반환)
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// 모의 응답 생성 함수들
const createMockResponse = (type: string, data: any) => {
  return {
    type,
    ...data,
    _mock: true,
    _note: "OpenAI API 키가 설정되지 않아 모의 응답을 반환합니다.",
  };
};

export const generateIdeasWithAI = async (
  trends: string[],
  count: number = 10,
  context?: string
): Promise<any[]> => {
  if (!openai) {
    // 모의 응답
    return Array.from({ length: Math.min(count, 5) }, (_, i) =>
      createMockResponse("idea", {
        id: i + 1,
        title: `${trends.join(" + ")} 기반 제품 아이디어 ${i + 1}`,
        description: `이 아이디어는 ${trends.join(", ")} 트렌드를 결합한 혁신적인 제품 개념입니다.`,
        trends,
        painPoints: ["사용자 불편함 1", "사용자 불편함 2"],
        features: ["주요 기능 1", "주요 기능 2"],
        revenueModel: "구독 기반 / 거래 수수료",
        competitiveAlternatives: ["기존 솔루션 1", "기존 솔루션 2"],
      })
    );
  }

  try {
    const prompt = `다음 트렌드를 기반으로 ${count}개의 제품 아이디어를 생성해주세요:
트렌드: ${trends.join(", ")}
${context ? `추가 컨텍스트: ${context}` : ""}

각 아이디어는 다음 형식의 JSON 배열로 반환해주세요:
[
  {
    "title": "제품 이름",
    "description": "한 문장 설명",
    "painPoints": ["사용자 문제 1", "사용자 문제 2"],
    "features": ["주요 기능 1", "주요 기능 2"],
    "revenueModel": "수익 모델",
    "competitiveAlternatives": ["경쟁 솔루션 1", "경쟁 솔루션 2"]
  }
]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "당신은 2026년 기술 및 암호화폐 트렌드 전문가이자 제품 관리자입니다. 혁신적이고 실행 가능한 제품 아이디어를 생성합니다.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content || "[]";
    const ideas = JSON.parse(content);

    return ideas.map((idea: any, index: number) => ({
      id: index + 1,
      ...idea,
      trends,
    }));
  } catch (error) {
    console.error("OpenAI API 오류:", error);
    throw new Error("아이디어 생성에 실패했습니다.");
  }
};

export const scoreIdeaWithAI = async (idea: any): Promise<number> => {
  if (!openai) {
    // 모의 점수
    return Math.random() * 3 + 7; // 7-10 사이 랜덤 점수
  }

  try {
    const prompt = `다음 제품 아이디어를 평가하고 0-10 점수를 매겨주세요:
제목: ${idea.title}
설명: ${idea.description}
트렌드: ${idea.trends?.join(", ") || "N/A"}

평가 기준:
- 시장 기회 (30%)
- 실행 가능성 (30%)
- 트렌드 정렬 (20%)
- 혁신성 (20%)

점수만 숫자로 반환해주세요 (예: 8.5)`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "당신은 경험 많은 제품 관리자입니다. 제품 아이디어를 객관적으로 평가합니다.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const scoreText = completion.choices[0]?.message?.content || "7.5";
    const score = parseFloat(scoreText.trim());

    return isNaN(score) ? 7.5 : Math.max(0, Math.min(10, score));
  } catch (error) {
    console.error("OpenAI API 오류:", error);
    return 7.5; // 기본값
  }
};

export const generatePRDWithAI = async (
  productConcept: string,
  context?: string,
  requirements?: string[]
): Promise<any> => {
  if (!openai) {
    return createMockResponse("PRD", {
      title: `${productConcept} - Product Requirements Document`,
      overview: "제품 개요...",
      objectives: ["목표 1", "목표 2"],
      userStories: [
        { as: "사용자", want: "기능 1", soThat: "목적 1" },
        { as: "사용자", want: "기능 2", soThat: "목적 2" },
      ],
      features: ["기능 1", "기능 2", "기능 3"],
      successMetrics: ["메트릭 1", "메트릭 2"],
    });
  }

  try {
    const prompt = `다음 제품 개념에 대한 상세한 PRD(Product Requirements Document)를 작성해주세요:
제품 개념: ${productConcept}
${context ? `컨텍스트: ${context}` : ""}
${requirements ? `요구사항: ${requirements.join(", ")}` : ""}

PRD는 다음 섹션을 포함해야 합니다:
1. 제품 개요
2. 목표 및 목적
3. 사용자 스토리
4. 주요 기능
5. 성공 지표
6. 기술 요구사항
7. 위험 및 완화 방안`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "당신은 전문 제품 관리자입니다. 투자자와 개발팀이 사용할 수 있는 고품질 PRD를 작성합니다.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    return {
      title: `${productConcept} - PRD`,
      content: completion.choices[0]?.message?.content || "",
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("OpenAI API 오류:", error);
    throw new Error("PRD 생성에 실패했습니다.");
  }
};

export const generateGTMWithAI = async (
  productConcept: string,
  targetMarket?: string,
  context?: string
): Promise<any> => {
  if (!openai) {
    return createMockResponse("GTM", {
      title: `${productConcept} - Go-to-Market Plan`,
      targetMarket: targetMarket || "전체 시장",
      positioning: "제품 포지셔닝...",
      channels: ["채널 1", "채널 2"],
      pricing: "가격 전략...",
      launchPlan: ["단계 1", "단계 2"],
    });
  }

  try {
    const prompt = `다음 제품에 대한 Go-to-Market 전략을 작성해주세요:
제품: ${productConcept}
${targetMarket ? `타겟 시장: ${targetMarket}` : ""}
${context ? `컨텍스트: ${context}` : ""}

GTM 계획은 다음을 포함해야 합니다:
1. 타겟 시장 분석
2. 제품 포지셔닝
3. 마케팅 채널
4. 가격 전략
5. 런칭 계획
6. 성공 지표`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "당신은 마케팅 전략 전문가입니다. 실행 가능한 Go-to-Market 계획을 수립합니다.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    return {
      title: `${productConcept} - GTM Plan`,
      content: completion.choices[0]?.message?.content || "",
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("OpenAI API 오류:", error);
    throw new Error("GTM 계획 생성에 실패했습니다.");
  }
};

export const generateRoadmapWithAI = async (
  productConcept: string,
  timeline?: string,
  milestones?: string[],
  context?: string
): Promise<any> => {
  if (!openai) {
    return createMockResponse("Roadmap", {
      title: `${productConcept} - Product Roadmap`,
      timeline: timeline || "Q1-Q4 2024",
      milestones: milestones || [
        { quarter: "Q1", goals: ["목표 1", "목표 2"] },
        { quarter: "Q2", goals: ["목표 3", "목표 4"] },
      ],
    });
  }

  try {
    const prompt = `다음 제품에 대한 제품 로드맵을 작성해주세요:
제품: ${productConcept}
${timeline ? `타임라인: ${timeline}` : ""}
${milestones ? `마일스톤: ${milestones.join(", ")}` : ""}
${context ? `컨텍스트: ${context}` : ""}

로드맵은 다음을 포함해야 합니다:
1. 분기별 목표
2. 주요 마일스톤
3. 기능 우선순위
4. 리소스 요구사항
5. 위험 요소`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "당신은 제품 로드맵 전문가입니다. 현실적이고 실행 가능한 로드맵을 작성합니다.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    return {
      title: `${productConcept} - Roadmap`,
      content: completion.choices[0]?.message?.content || "",
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("OpenAI API 오류:", error);
    throw new Error("로드맵 생성에 실패했습니다.");
  }
};

export const chatWithAIAssistant = async (
  message: string,
  conversationHistory: any[] = [],
  context?: any
): Promise<string> => {
  if (!openai) {
    return `안녕하세요! AI Product Manager Assistant입니다. "${message}"에 대한 답변을 준비 중입니다. (실제 구현에서는 OpenAI API를 통해 응답을 생성합니다.)`;
  }

  try {
    const systemPrompt = `당신은 2026년 기술 및 암호화폐 트렌드 전문가이자 경험 많은 제품 관리자입니다. 
사용자의 제품 전략 질문에 대해 전문적이고 실행 가능한 조언을 제공합니다.
주요 전문 분야: 제품 기획, 트렌드 분석, Go-to-Market 전략, 사용자 경험, 비즈니스 모델.`;

    const messages: any[] = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "응답을 생성할 수 없습니다.";
  } catch (error) {
    console.error("OpenAI API 오류:", error);
    return "죄송합니다. 응답 생성 중 오류가 발생했습니다.";
  }
};
