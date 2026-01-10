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
    console.error("OpenAI API key is not set. Please set OPENAI_API_KEY environment variable.");
    throw new Error("OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable in Vercel dashboard.");
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
    let hackathonInfo;
    try {
      hackathonInfo = JSON.parse(content);
    } catch (parseError) {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        hackathonInfo = JSON.parse(jsonMatch[0]);
      } else {
        console.error("Failed to parse hackathon info:", content);
        throw new Error("Failed to parse hackathon information from AI response.");
      }
    }

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
    console.error("OpenAI API key is not set. Please set OPENAI_API_KEY environment variable.");
    throw new Error("OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable in Vercel dashboard.");
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
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content || '{"ideas": []}';
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Content:", content);
      // Try to extract JSON object
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          result = JSON.parse(jsonMatch[0]);
        } catch (e) {
          throw new Error("Failed to parse ideas response from AI.");
        }
      } else {
        throw new Error("Failed to parse ideas response from AI.");
      }
    }
    const ideas = result.ideas || (Array.isArray(result) ? result : []);
    
    if (!Array.isArray(ideas) || ideas.length === 0) {
      throw new Error("No ideas were generated. Please try again.");
    }

    return ideas.map((idea: any, index: number) => ({
      id: index + 1,
      ...idea,
    }));
  } catch (error) {
    console.error("Idea generation error:", error);
    throw new Error("Failed to generate hackathon ideas.");
  }
};
