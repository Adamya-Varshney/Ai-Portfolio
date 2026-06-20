import { tool } from 'ai';
import { z } from 'zod';
import { getConfig } from '@/lib/config-loader';

export const getSkills = tool({
  description:
    'This tool provides a comprehensive overview of product, technical, and analytical skills, expertise, and professional qualifications.',
  parameters: z.object({}),
  execute: async () => {
    const config = getConfig();
    
    return {
      skills: {
        productTools: config.skills.product_tools,
        dataAndAI: config.skills.data_ai,
        analytics: config.skills.analytics,
        automation: config.skills.automation,
        vibeCoding: config.skills.vibe_coding,
        pmSkills: config.skills.pm_skills,
        softSkills: config.skills.soft_skills
      },
      education: {
        degree: config.education.current.degree,
        institution: config.education.current.institution,
        cgpa: config.education.current.cgpa,
        duration: config.education.current.duration
      },
      achievements: config.education.achievements || [],
      experience: config.experience.map(exp => ({
        position: exp.position,
        company: exp.company,
        duration: exp.duration,
        type: exp.type,
        technologies: exp.technologies,
        description: exp.description
      })),
      message: "I'd be happy to walk you through my skill set. As a Product Manager I pair customer-centric, design-thinking with quantitative rigor — owning the full product lifecycle from research and GTM to product analytics. I'm especially strong in AI and agentic products, where I've shipped things like conversion analytics dashboards and a RAG agent into real B2B workflows, and I back product decisions with data using Power BI, SQL, and Python. Which area would you like me to go deeper on?"
    };
  },
});
