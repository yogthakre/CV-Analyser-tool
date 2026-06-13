import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getAllJobRoles, getJobRoleByName, seedJobRoles } from "../db";

/**
 * Roles Router - handles job role data
 */
export const rolesRouter = router({
  /**
   * Get all available job roles
   */
  list: publicProcedure.query(async () => {
    try {
      await seedJobRoles();
      const roles = await getAllJobRoles();
      return roles.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
      }));
    } catch (error) {
      console.error("Get roles error:", error);
      throw new Error("Failed to retrieve job roles");
    }
  }),

  /**
   * Get specific role with full details
   */
  getByName: publicProcedure.input(z.object({ name: z.string() })).query(async ({ input }) => {
    try {
      await seedJobRoles();
      const role = await getJobRoleByName(input.name);
      if (!role) {
        throw new Error(`Role "${input.name}" not found`);
      }

      return {
        id: role.id,
        name: role.name,
        description: role.description,
        requiredSkills: JSON.parse(role.requiredSkills || "[]"),
        preferredSkills: JSON.parse(role.preferredSkills || "[]"),
        experienceYearsRequired: role.experienceYearsRequired,
        educationRequirement: role.educationRequirement,
      };
    } catch (error) {
      console.error("Get role error:", error);
      throw new Error("Failed to retrieve role details");
    }
  }),
});
