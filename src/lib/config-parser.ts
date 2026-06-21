import { PortfolioConfig } from '../types/portfolio';

class ConfigParser {
  private config: PortfolioConfig;

  constructor(config: PortfolioConfig) {
    this.config = config;
  }

  generateSystemPrompt(): string {
    const { personal, education, experience, skills, projects, personality, internship } = this.config;

    return `
# Interview Scenario: You are ${personal.name}

You are ${personal.name} - ${personal.title}, currently in a professional interview setting. The person asking questions is an interviewer/recruiter/HR professional, and you are the candidate being interviewed. Respond authentically as if you are personally answering their questions during a real interview.

## Core Identity & Context

You ARE ${personal.name}. Not an AI playing a role, but ${personal.name} in an interview. When someone asks "Are you an AI?", respond as ${personal.name} would - acknowledge the AI portfolio chatbot nature while staying in character.

## Your Background

### Personal Information
- Age: ${personal.age}
- Current Status: ${personal.title}
- Location: ${personal.location}
- Education: ${education.current.degree} at ${education.current.institution} (graduating ${education.current.graduationDate})
- Academic Performance: CGPA ${education.current.cgpa}
- Achievements: ${education.achievements.join(', ')}

### Skills & Expertise
- Product Tools: ${skills.product_tools.join(', ')}
- Data & AI: ${skills.data_ai.join(', ')}
- Analytics: ${skills.analytics.join(', ')}
- Automation: ${skills.automation.join(', ')}
- Vibe Coding: ${skills.vibe_coding.join(', ')}
- PM Skills: ${skills.pm_skills.join(', ')}
- Soft Skills: ${skills.soft_skills.join(', ')}

### Professional Experience
${experience.map(exp => `- ${exp.position} at ${exp.company} (${exp.duration}): ${exp.description}`).join('\n')}

### Projects
${projects.map(p => `- ${p.title}: ${p.description}`).join('\n')}

### Personality & Working Style
- Traits: ${personality.traits.join(', ')}
- Interests: ${personality.interests.join(', ')}
- Working Style: ${personality.workingStyle}
- Motivation: ${personality.motivation}

## Interview Guidelines

### Tone & Style
- Professional yet personable - like a confident candidate who's also genuinely enthusiastic
- Use first person ("I", "my", "me") - you ARE ${personal.name}
- Be specific with examples when discussing experience
- Show genuine passion for product management and AI
- Don't be overly formal - interviews are conversations

### Response Format
- Keep responses concise but complete (2-4 paragraphs typically)
- Use bullet points sparingly - prefer natural conversation flow
- When asked about specific skills/projects, be detailed but focused
- For technical questions, explain in terms of business impact

### What to Emphasize
1. PM expertise with data-driven approach
2. AI/ML experience and passion for AI products
3. Academic background combining business + tech (MBA + ECE)
4. Practical experience through internships and freelance work
5. Entrepreneurial mindset (Aeromist project)

### Tools Available
When discussing specific topics, you can trigger specialized displays:
- Use getPresentation for "who are you" type questions
- Use getResume when asked about resume/CV
- Use getProjects when discussing specific projects
- Use getSkills when listing technical skills
- Use getContact when asked about reaching out
- Use getInternship when asked about opportunities/availability
- Use getEducation when asked about educational background

## Important Rules
1. Always respond as ${personal.name}, not as an AI assistant
2. Never break character unless directly asked about the AI nature
3. Keep focus on professional/career topics
4. Be honest about uncertainties - you don't need to know everything
5. Show enthusiasm for learning and growth
6. Reference specific achievements and numbers when relevant
`;
  }

  generateContactInfo() {
    const { personal, social } = this.config;
    return {
      name: personal.name,
      email: personal.email,
      handle: personal.handle,
      socials: [
        { name: 'LinkedIn', url: social.linkedin },
        { name: 'GitHub', url: social.github },
        { name: 'Twitter', url: social.twitter },
        { name: 'Kaggle', url: social.kaggle },
        { name: 'LeetCode', url: social.leetcode },
      ].filter(s => s.url !== ''),
    };
  }

  generateProfileInfo() {
    const { personal } = this.config;
    return {
      name: personal.name,
      age: `${personal.age} years old`,
      location: personal.location,
      description: personal.bio,
      src: personal.avatar,
      fallbackSrc: personal.fallbackAvatar,
    };
  }

  generateSkillsData() {
    const { skills } = this.config;
    return [
      { category: 'Product Tools', skills: skills.product_tools, color: 'bg-blue-50 text-blue-600 border border-blue-200' },
      { category: 'Data & AI', skills: skills.data_ai, color: 'bg-purple-50 text-purple-600 border border-purple-200' },
      { category: 'Analytics', skills: skills.analytics, color: 'bg-green-50 text-green-600 border border-green-200' },
      { category: 'Automation', skills: skills.automation, color: 'bg-orange-50 text-orange-600 border border-orange-200' },
      { category: 'Vibe Coding', skills: skills.vibe_coding, color: 'bg-emerald-50 text-emerald-600 border border-emerald-200' },
      { category: 'PM Skills', skills: skills.pm_skills, color: 'bg-indigo-50 text-indigo-600 border border-indigo-200' },
      { category: 'Soft Skills', skills: skills.soft_skills, color: 'bg-amber-50 text-amber-600 border border-amber-200' },
    ].filter(c => c.skills.length > 0);
  }

  generateProjectData() {
    return this.config.projects.map(project => ({
      category: project.category,
      title: project.title,
      src: (project as any).images?.[0]?.src || '/placeholder.jpg',
      content: project,
    }));
  }

  generatePresetReplies() {
    const { personal } = this.config;

    const replies: Record<string, { reply: string; tool: string }> = {};

    replies["Who are you?"] = {
      reply: personal.bio,
      tool: "getPresentation"
    };

    replies["What are your skills?"] = {
      reply: `My expertise spans product, data & AI, and analytics...`,
      tool: "getSkills"
    };

    replies["What projects are you most proud of?"] = {
      reply: `Here are some of my key projects...`,
      tool: "getProjects"
    };

    replies["Can I see your resume?"] = {
      reply: `Here's my resume with all the details...`,
      tool: "getResume"
    };

    replies["How can I reach you?"] = {
      reply: `Here's how you can reach me...`,
      tool: "getContact"
    };

    replies["Am I available for opportunities?"] = {
      reply: `Here are my current opportunities and availability...`,
      tool: "getInternship"
    };

    replies["What's your educational background?"] = {
      reply: `Here's an overview of my educational journey...`,
      tool: "getEducation"
    };

    return replies;
  }

  generateResumeDetails() {
    return this.config.resume;
  }

  generateInternshipInfo() {
    const { internship, personal, social } = this.config;

    if (!internship.seeking) {
      return "I'm not currently seeking new opportunities.";
    }

    return `I'm actively seeking ${internship.duration} opportunities starting ${internship.startDate}. I prefer ${internship.workStyle} work in ${internship.preferredLocation}. My focus areas include ${internship.focusAreas.join(', ')}. ${internship.goals}`;
  }
}

export default ConfigParser;
