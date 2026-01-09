import OpenAI from "openai";

// OpenAI 클라이언트 초기화
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// 모의 응답 생성 함수들
const createMockResponse = (type: string, data: any) => {
  return {
    type,
    ...data,
    _mock: true,
    _note: "OpenAI API key is not set, returning mock response.",
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
        title: `Product Idea ${i + 1} based on ${trends.join(" + ")}`,
        description: `This is an innovative product concept combining ${trends.join(", ")} trends.`,
        trends,
        painPoints: ["User pain point 1", "User pain point 2"],
        features: ["Key feature 1", "Key feature 2"],
        revenueModel: "Subscription-based / Transaction fees",
        competitiveAlternatives: ["Existing solution 1", "Existing solution 2"],
      })
    );
  }

  try {
    const prompt = `Generate ${count} product ideas based on the following trends:
Trends: ${trends.join(", ")}
${context ? `Additional context: ${context}` : ""}

Return each idea as a JSON array in the following format:
[
  {
    "title": "Product name",
    "description": "One sentence description",
    "painPoints": ["User problem 1", "User problem 2"],
    "features": ["Key feature 1", "Key feature 2"],
    "revenueModel": "Revenue model",
    "competitiveAlternatives": ["Competing solution 1", "Competing solution 2"]
  }
]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in 2026 tech and crypto trends and a product manager. You generate innovative and actionable product ideas.",
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
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate ideas.");
  }
};

export const scoreIdeaWithAI = async (idea: any): Promise<number> => {
  if (!openai) {
    return Math.random() * 3 + 7;
  }

  try {
    const prompt = `Evaluate the following product idea and assign a score from 0-10:
Title: ${idea.title}
Description: ${idea.description}
Trends: ${idea.trends?.join(", ") || "N/A"}

Evaluation criteria:
- Market opportunity (30%)
- Feasibility (30%)
- Trend alignment (20%)
- Innovation (20%)

Return only the numeric score (e.g., 8.5)`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an experienced product manager. You evaluate product ideas objectively.",
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
    return 7.5;
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
      overview: "Product overview...",
      objectives: ["Objective 1", "Objective 2"],
      userStories: [
        { as: "User", want: "Feature 1", soThat: "Purpose 1" },
        { as: "User", want: "Feature 2", soThat: "Purpose 2" },
      ],
      features: ["Feature 1", "Feature 2", "Feature 3"],
      successMetrics: ["Metric 1", "Metric 2"],
    });
  }

  try {
    const prompt = `Write a detailed PRD (Product Requirements Document) for the following product concept:
Product Concept: ${productConcept}
${context ? `Context: ${context}` : ""}
${requirements ? `Requirements: ${requirements.join(", ")}` : ""}

The PRD should include the following sections:
1. Product Overview
2. Goals and Objectives
3. User Stories
4. Key Features
5. Success Metrics
6. Technical Requirements
7. Risks and Mitigation`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a professional product manager. You write high-quality PRDs that can be used by investors and development teams.",
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
    throw new Error("Failed to generate PRD.");
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
      targetMarket: targetMarket || "Overall market",
      positioning: "Product positioning...",
      channels: ["Channel 1", "Channel 2"],
      pricing: "Pricing strategy...",
      launchPlan: ["Phase 1", "Phase 2"],
    });
  }

  try {
    const prompt = `Write a Go-to-Market strategy for the following product:
Product: ${productConcept}
${targetMarket ? `Target Market: ${targetMarket}` : ""}
${context ? `Context: ${context}` : ""}

The GTM plan should include:
1. Target market analysis
2. Product positioning
3. Marketing channels
4. Pricing strategy
5. Launch plan
6. Success metrics`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a marketing strategy expert. You create actionable Go-to-Market plans.",
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
    throw new Error("Failed to generate GTM plan.");
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
        { quarter: "Q1", goals: ["Goal 1", "Goal 2"] },
        { quarter: "Q2", goals: ["Goal 3", "Goal 4"] },
      ],
    });
  }

  try {
    const prompt = `Create a product roadmap for the following product:
Product: ${productConcept}
${timeline ? `Timeline: ${timeline}` : ""}
${milestones ? `Milestones: ${milestones.join(", ")}` : ""}
${context ? `Context: ${context}` : ""}

The roadmap should include:
1. Quarterly goals
2. Key milestones
3. Feature priorities
4. Resource requirements
5. Risk factors`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a product roadmap expert. You create realistic and actionable roadmaps.",
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
    throw new Error("Failed to generate roadmap.");
  }
};

export const chatWithAIAssistant = async (
  message: string,
  conversationHistory: any[] = [],
  context?: any
): Promise<string> => {
  if (!openai) {
    return `Hello! I'm your AI Product Manager Assistant. I'm preparing a response to "${message}". (In the actual implementation, responses are generated via OpenAI API.)`;
  }

  try {
    const systemPrompt = `You are an expert in 2026 tech and crypto trends and an experienced product manager. 
You provide professional and actionable advice on users' product strategy questions.
Key areas of expertise: Product planning, trend analysis, Go-to-Market strategy, user experience, business models.`;

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

    return completion.choices[0]?.message?.content || "Unable to generate response.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Sorry, an error occurred while generating the response.";
  }
};
