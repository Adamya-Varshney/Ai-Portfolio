import { tool } from 'ai';
import { z } from 'zod';
import { getConfig } from '@/lib/config-loader';

export const getInternship = tool({
  description: 'Provides comprehensive information about role opportunities, career preferences, and professional availability for recruiters and HR professionals.',
  parameters: z.object({}),
  execute: async () => {
    const config = getConfig();
    
    return {
      availability: config.internship.availability,
      preferences: {
        roleTypes: config.internship.focusAreas,
        workMode: config.internship.preferredLocation,
        location: config.personal.location,
        startDate: config.internship.startDate,
        duration: config.internship.duration
      },
      experience: {
        internshipCompleted: config.experience.find(exp => exp.type === "Internship")?.company 
          ? `${config.experience.find(exp => exp.type === "Internship")?.position} at ${config.experience.find(exp => exp.type === "Internship")?.company} (${config.experience.find(exp => exp.type === "Internship")?.duration})`
          : "No formal internship listed",
        freelanceWork: config.experience.find(exp => exp.type === "Freelance")?.description || "",
        projectExperience: "Led multiple end-to-end product initiatives spanning AI/agentic products, GTM, and product analytics"
      },
      skills: {
        technical: [
          ...config.skills.product_tools,
          ...config.skills.data_ai,
          ...config.skills.analytics,
          ...config.skills.automation,
          ...config.skills.vibe_coding,
          ...config.skills.pm_skills
        ],
        soft: config.skills.soft_skills
      },
      achievements: config.education.achievements || [],
      lookingFor: {
        goals: config.internship.goals,
        workStyle: config.internship.workStyle,
        motivation: config.personality.motivation,
        interests: config.personality.interests
      },
      contact: {
        email: config.personal.email,
        linkedin: config.social.linkedin,
        github: config.social.github,
        portfolio: "This AI-powered portfolio showcases my projects and skills"
      },
      personality: {
        traits: config.personality.traits,
        funFacts: config.personality.funFacts,
        workingStyle: config.personality.workingStyle
      },
      professionalMessage: "I'm actively exploring Product Manager opportunities where I can own ambiguous 0-to-N problems end to end — from customer research and GTM to product analytics — ideally on teams building AI-native products. I lead with the customer problem, validate with data, and ship in tight, measurable loops. I'd love to hear what your team is working on and where a customer-centric, data-driven PM could move the needle. What problems are top of mind for you right now?"
    };
  },
});
