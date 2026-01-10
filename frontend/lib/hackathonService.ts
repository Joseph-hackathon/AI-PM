import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export interface HackathonInfo {
  title: string;
  description: string;
  tracks: string[];
  requirements: string[];
  background: string;
  themes: string[];
  prizes?: string[];
  timeline?: string;
}

export const researchHackathon = async (
  hackathonUrl: string
): Promise<HackathonInfo> => {
  if (!openai) {
    // Mock response for testing
    return {
      title: "Sample Hackathon",
      description: "A hackathon focused on innovation",
      tracks: ["AI/ML", "Web3", "FinTech"],
      requirements: ["Build a working prototype", "Submit a demo video"],
      background: "This hackathon aims to foster innovation...",
      themes: ["Innovation", "Technology", "Social Impact"],
    };
  }

  try {
    const prompt = `You are a hackathon research assistant. Analyze the following hackathon URL and extract key information:
URL: ${hackathonUrl}

Please provide a JSON object with the following structure:
{
  "title": "Hackathon name",
  "description": "Brief description of the hackathon",
  "tracks": ["Track 1", "Track 2", ...],
  "requirements": ["Requirement 1", "Requirement 2", ...],
  "background": "Background and context of the hackathon",
  "themes": ["Theme 1", "Theme 2", ...],
  "prizes": ["Prize 1", "Prize 2", ...] (optional),
  "timeline": "Timeline information" (optional)
}

If you cannot access the URL directly, use your knowledge to infer likely hackathon information based on the URL pattern or domain. Return only valid JSON.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert at analyzing hackathon information. Extract key details from hackathon pages including tracks, requirements, themes, and background.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content || "{}";
    const hackathonInfo = JSON.parse(content);

    return hackathonInfo as HackathonInfo;
  } catch (error) {
    console.error("Hackathon research error:", error);
    throw new Error("Failed to research hackathon information.");
  }
};

export const generateHackathonIdeas = async (
  hackathonInfo: HackathonInfo,
  count: number = 10
): Promise<any[]> => {
  if (!openai) {
    return Array.from({ length: Math.min(count, 5) }, (_, i) => ({
      id: i + 1,
      title: `Hackathon Idea ${i + 1}`,
      description: `An innovative solution for ${hackathonInfo.title}`,
      tracks: hackathonInfo.tracks,
      alignment: "High alignment with hackathon themes",
      features: ["Feature 1", "Feature 2"],
      techStack: ["Tech 1", "Tech 2"],
    }));
  }

  try {
    const prompt = `Generate ${count} innovative product ideas for this hackathon:

Hackathon: ${hackathonInfo.title}
Description: ${hackathonInfo.description}
Tracks: ${hackathonInfo.tracks.join(", ")}
Requirements: ${hackathonInfo.requirements.join(", ")}
Background: ${hackathonInfo.background}
Themes: ${hackathonInfo.themes.join(", ")}

Return a JSON array of ideas in this format:
{
  "ideas": [
    {
      "title": "Idea name",
      "description": "One sentence description",
      "tracks": ["Relevant track"],
      "alignment": "How well it aligns with hackathon themes",
      "features": ["Key feature 1", "Key feature 2"],
      "techStack": ["Technology 1", "Technology 2"],
      "painPoints": ["Problem it solves 1", "Problem it solves 2"],
      "implementation": "Brief implementation approach"
    }
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an expert at generating hackathon project ideas. Create innovative, feasible ideas that align with hackathon themes and requirements.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content || '{"ideas": []}';
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      // Try to extract JSON array
      const arrayMatch = content.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        result = { ideas: JSON.parse(arrayMatch[0]) };
      } else {
        throw new Error("Failed to parse ideas response");
      }
    }
    const ideas = result.ideas || (Array.isArray(result) ? result : []);

    return ideas.map((idea: any, index: number) => ({
      id: index + 1,
      ...idea,
    }));
  } catch (error) {
    console.error("Idea generation error:", error);
    throw new Error("Failed to generate hackathon ideas.");
  }
};
