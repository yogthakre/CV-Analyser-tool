import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { storagePut } from "../storage";
import { createCVAnalysis, getCVAnalysisById, getUserCVAnalyses, deleteCVAnalysis, getJobRoleByName, seedJobRoles } from "../db";
import { parseCV, calculateScore, identifySkillGaps, generateRecommendations } from "../cvAnalysis";

/**
 * CV Router - handles CV upload, parsing, analysis, and history
 */
export const cvRouter = router({
  /**
   * Upload and parse CV
   */
  upload: protectedProcedure
    .input(
      z.object({
        fileContent: z.string(), // Base64 encoded or plain text
        fileName: z.string(),
        targetRole: z.string(),
        isPdf: z.boolean().default(false),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Extract text from file
        let cvText = input.fileContent;

        if (input.isPdf) {
          // For PDF files, the content should already be extracted as text on the client
          // or we treat the base64 as already-extracted text
          cvText = input.fileContent;
        }

        // Parse CV using LLM
        const parsedCV = await parseCV(cvText);

        // Get job role requirements
        await seedJobRoles();
        const jobRole = await getJobRoleByName(input.targetRole);
        if (!jobRole) {
          throw new Error(`Job role "${input.targetRole}" not found`);
        }

        const requiredSkills = JSON.parse(jobRole.requiredSkills || "[]");
        const preferredSkills = JSON.parse(jobRole.preferredSkills || "[]");

        // Calculate scores
        const scoring = calculateScore(parsedCV, requiredSkills, preferredSkills, jobRole.experienceYearsRequired || 0);

        // Identify skill gaps
        const skillGaps = identifySkillGaps(parsedCV, requiredSkills, preferredSkills);

        // Generate recommendations
        const recommendations = await generateRecommendations(parsedCV, skillGaps, input.targetRole);

        // Store file in S3
        const fileBuffer = Buffer.from(input.fileContent, input.isPdf ? "base64" : "utf8");
        const { key: fileKey, url: fileUrl } = await storagePut(
          `cv-uploads/${ctx.user.id}/${Date.now()}-${input.fileName}`,
          fileBuffer,
          input.isPdf ? "application/pdf" : "text/plain"
        );

        // Save analysis to database
        const analysis = await createCVAnalysis({
          userId: ctx.user.id,
          fileName: input.fileName,
          fileKey,
          fileUrl,
          targetRole: input.targetRole,
          personalInfo: JSON.stringify(parsedCV.personalInfo),
          skills: JSON.stringify(parsedCV.skills),
          experience: JSON.stringify(parsedCV.experience),
          education: JSON.stringify(parsedCV.education),
          certifications: JSON.stringify(parsedCV.certifications),
          overallScore: scoring.overallScore,
          skillsScore: scoring.skillsScore,
          experienceScore: scoring.experienceScore,
          educationScore: scoring.educationScore,
          certificationsScore: scoring.certificationsScore,
          completenessScore: scoring.completenessScore,
          matchedSkills: JSON.stringify(skillGaps.matched),
          missingSkills: JSON.stringify(skillGaps.missing),
          skillGapPercentage: skillGaps.gapPercentage,
          recommendations: JSON.stringify(recommendations),
        });

        return {
          success: true,
          analysisId: (analysis as any).insertId || 0,
          scoring,
          skillGaps,
          recommendations,
          parsedCV,
        };
      } catch (error) {
        console.error("CV upload error:", error);
        throw new Error(`Failed to upload and analyze CV: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }),

  /**
   * Get analysis history for current user
   */
  getHistory: protectedProcedure.query(async ({ ctx }) => {
    try {
      const analyses = await getUserCVAnalyses(ctx.user.id);
      return analyses.map((analysis) => ({
        id: analysis.id,
        fileName: analysis.fileName,
        targetRole: analysis.targetRole,
        overallScore: analysis.overallScore,
        createdAt: analysis.createdAt,
      }));
    } catch (error) {
      console.error("Get history error:", error);
      throw new Error("Failed to retrieve analysis history");
    }
  }),

  /**
   * Get specific analysis by ID
   */
  getAnalysis: protectedProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    try {
      const analysis = await getCVAnalysisById(input.id);
      if (!analysis || analysis.userId !== ctx.user.id) {
        throw new Error("Analysis not found or unauthorized");
      }

      return {
        id: analysis.id,
        fileName: analysis.fileName,
        targetRole: analysis.targetRole,
        personalInfo: JSON.parse(analysis.personalInfo || "{}"),
        skills: JSON.parse(analysis.skills || "[]"),
        experience: JSON.parse(analysis.experience || "[]"),
        education: JSON.parse(analysis.education || "[]"),
        certifications: JSON.parse(analysis.certifications || "[]"),
        scoring: {
          overallScore: analysis.overallScore,
          skillsScore: analysis.skillsScore,
          experienceScore: analysis.experienceScore,
          educationScore: analysis.educationScore,
          certificationsScore: analysis.certificationsScore,
          completenessScore: analysis.completenessScore,
        },
        skillGaps: {
          matched: JSON.parse(analysis.matchedSkills || "[]"),
          missing: JSON.parse(analysis.missingSkills || "[]"),
          gapPercentage: analysis.skillGapPercentage,
        },
        recommendations: JSON.parse(analysis.recommendations || "[]"),
        createdAt: analysis.createdAt,
      };
    } catch (error) {
      console.error("Get analysis error:", error);
      throw new Error("Failed to retrieve analysis");
    }
  }),

  /**
   * Delete analysis
   */
  deleteAnalysis: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
    try {
      const analysis = await getCVAnalysisById(input.id);
      if (!analysis || analysis.userId !== ctx.user.id) {
        throw new Error("Analysis not found or unauthorized");
      }

      await deleteCVAnalysis(input.id);
      return { success: true };
    } catch (error) {
      console.error("Delete analysis error:", error);
      throw new Error("Failed to delete analysis");
    }
  }),
});
