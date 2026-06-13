import { invokeLLM } from "./_core/llm";

/**
 * Parsed CV data structure
 */
export interface ParsedCV {
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    summary?: string;
  };
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
    yearsOfExperience?: number;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    field: string;
    year?: number;
  }>;
  certifications: string[];
}

/**
 * Scoring breakdown
 */
export interface ScoringBreakdown {
  skillsScore: number; // 30% weight
  experienceScore: number; // 25% weight
  educationScore: number; // 15% weight
  certificationsScore: number; // 15% weight
  completenessScore: number; // 15% weight
  overallScore: number; // Weighted average
}

/**
 * Recommendation item
 */
export interface Recommendation {
  type: "skill" | "certification" | "experience" | "education";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedTimeToComplete?: string;
}

/**
 * Parse CV text using LLM
 */
export async function parseCV(cvText: string): Promise<ParsedCV> {
  const prompt = `You are a professional CV parser. Extract the following information from the CV text and return it as a JSON object:
- personalInfo: { name, email, phone, location, summary }
- skills: array of technical and soft skills
- experience: array of { title, company, duration, description, yearsOfExperience }
- education: array of { degree, institution, field, year }
- certifications: array of certification names

CV Text:
${cvText}

Return ONLY valid JSON, no markdown formatting or code blocks.`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are a professional CV parser that extracts structured data from resumes. Always return valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ] as any,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "parsed_cv",
          strict: true,
          schema: {
            type: "object",
            properties: {
              personalInfo: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  phone: { type: "string" },
                  location: { type: "string" },
                  summary: { type: "string" },
                },
              },
              skills: {
                type: "array",
                items: { type: "string" },
              },
              experience: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    company: { type: "string" },
                    duration: { type: "string" },
                    description: { type: "string" },
                    yearsOfExperience: { type: "number" },
                  },
                  required: ["title", "company"],
                },
              },
              education: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    degree: { type: "string" },
                    institution: { type: "string" },
                    field: { type: "string" },
                    year: { type: "number" },
                  },
                  required: ["degree", "institution"],
                },
              },
              certifications: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["personalInfo", "skills", "experience", "education", "certifications"],
          },
        },
      },
    });

    const content = response.choices[0]?.message.content;
    if (!content) throw new Error("No response from LLM");

    const contentStr = typeof content === "string" ? content : JSON.stringify(content);
    const parsed = JSON.parse(contentStr) as ParsedCV;
    return parsed;
  } catch (error) {
    console.error("CV parsing error:", error);
    throw new Error(`Failed to parse CV: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * Calculate profile score based on parsed CV and role requirements
 */
export function calculateScore(
  parsedCV: ParsedCV,
  requiredSkills: string[],
  preferredSkills: string[],
  roleExperienceYearsRequired: number
): ScoringBreakdown {
  // Normalize skills for comparison (lowercase, trim)
  const cvSkillsLower = parsedCV.skills.map((s) => s.toLowerCase().trim());
  const requiredSkillsLower = requiredSkills.map((s) => s.toLowerCase().trim());
  const preferredSkillsLower = preferredSkills.map((s) => s.toLowerCase().trim());

  // Skills Score (30% weight)
  const matchedRequired = requiredSkillsLower.filter((skill) => cvSkillsLower.some((cvSkill) => cvSkill.includes(skill) || skill.includes(cvSkill))).length;
  const skillsScore = Math.min(100, (matchedRequired / Math.max(requiredSkillsLower.length, 1)) * 100);

  // Experience Score (25% weight)
  const totalYearsOfExperience = parsedCV.experience.reduce((sum, exp) => sum + (exp.yearsOfExperience || 0), 0);
  const experienceScore = Math.min(100, (totalYearsOfExperience / Math.max(roleExperienceYearsRequired, 1)) * 100);

  // Education Score (15% weight)
  const hasRelevantEducation = parsedCV.education.length > 0 ? 100 : 0;
  const educationScore = hasRelevantEducation;

  // Certifications Score (15% weight)
  const certificationsScore = Math.min(100, parsedCV.certifications.length * 20);

  // Completeness Score (15% weight)
  const completenessChecks = [
    parsedCV.personalInfo.name ? 1 : 0,
    parsedCV.personalInfo.email ? 1 : 0,
    parsedCV.personalInfo.summary ? 1 : 0,
    parsedCV.skills.length > 0 ? 1 : 0,
    parsedCV.experience.length > 0 ? 1 : 0,
    parsedCV.education.length > 0 ? 1 : 0,
  ];
  const completenessScore = (completenessChecks.reduce((a, b) => a + b, 0) / completenessChecks.length) * 100;

  // Calculate weighted overall score
  const overallScore = Math.round(
    skillsScore * 0.3 + experienceScore * 0.25 + educationScore * 0.15 + certificationsScore * 0.15 + completenessScore * 0.15
  );

  return {
    skillsScore: Math.round(skillsScore),
    experienceScore: Math.round(experienceScore),
    educationScore: Math.round(educationScore),
    certificationsScore: Math.round(certificationsScore),
    completenessScore: Math.round(completenessScore),
    overallScore,
  };
}

/**
 * Identify skill gaps between CV and role requirements
 */
export function identifySkillGaps(
  parsedCV: ParsedCV,
  requiredSkills: string[],
  preferredSkills: string[]
): { matched: string[]; missing: string[]; gapPercentage: number } {
  const cvSkillsLower = parsedCV.skills.map((s) => s.toLowerCase().trim());
  const requiredSkillsLower = requiredSkills.map((s) => s.toLowerCase().trim());
  const preferredSkillsLower = preferredSkills.map((s) => s.toLowerCase().trim());

  const allRequiredSkills = [...requiredSkillsLower, ...preferredSkillsLower];

  const matched = allRequiredSkills.filter((skill) => cvSkillsLower.some((cvSkill) => cvSkill.includes(skill) || skill.includes(cvSkill)));

  const missing = allRequiredSkills.filter((skill) => !matched.includes(skill));

  const gapPercentage = Math.round((missing.length / Math.max(allRequiredSkills.length, 1)) * 100);

  return {
    matched,
    missing,
    gapPercentage,
  };
}

/**
 * Generate personalized recommendations based on CV and gaps
 */
export async function generateRecommendations(
  parsedCV: ParsedCV,
  skillGaps: { matched: string[]; missing: string[] },
  targetRole: string
): Promise<Recommendation[]> {
  const recommendations: Recommendation[] = [];

  // Skill recommendations
  if (skillGaps.missing.length > 0) {
    const topMissingSkills = skillGaps.missing.slice(0, 3);
    for (const skill of topMissingSkills) {
      recommendations.push({
        type: "skill",
        title: `Learn ${skill}`,
        description: `${skill} is a critical skill for ${targetRole} roles. Consider taking online courses or practicing on real projects.`,
        priority: "high",
        estimatedTimeToComplete: "3-6 months",
      });
    }
  }

  // Certification recommendations
  if (parsedCV.certifications.length < 2) {
    recommendations.push({
      type: "certification",
      title: "Pursue Industry Certifications",
      description: `Industry certifications strengthen your profile for ${targetRole} positions. Look for role-specific certifications.`,
      priority: "medium",
      estimatedTimeToComplete: "2-4 months",
    });
  }

  // Experience recommendations
  if (parsedCV.experience.length < 2) {
    recommendations.push({
      type: "experience",
      title: "Build Practical Experience",
      description: `Consider contributing to open-source projects or taking on freelance work to build relevant experience.`,
      priority: "high",
      estimatedTimeToComplete: "Ongoing",
    });
  }

  // Profile completeness recommendations
  if (!parsedCV.personalInfo.summary) {
    recommendations.push({
      type: "experience",
      title: "Add Professional Summary",
      description: `A compelling professional summary helps recruiters quickly understand your value proposition.`,
      priority: "medium",
      estimatedTimeToComplete: "1 day",
    });
  }

  return recommendations;
}
