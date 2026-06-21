export interface PersonalInfo {
  name: string;
  age: number;
  location: string;
  title: string;
  email: string;
  phone: string;
  handle: string;
  bio: string;
  avatar: string;
  fallbackAvatar: string;
}

export interface Education {
  current: {
    degree: string;
    institution: string;
    duration: string;
    cgpa: string;
    graduationDate: string;
  };
  previous?: {
    degree: string;
    institution: string;
    duration: string;
    percentage?: string;
    completionDate?: string;
  };
  achievements: string[];
}

export interface Experience {
  company: string;
  position: string;
  type: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Skills {
  product_tools: string[];
  data_ai: string[];
  analytics: string[];
  automation: string[];
  vibe_coding: string[];
  pm_skills: string[];
  soft_skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  highlights: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  status: string;
  category: string;
  featured: boolean;
}

export interface Social {
  linkedin: string;
  github: string;
  twitter: string;
  kaggle: string;
  leetcode: string;
  fiverr: string;
}

export interface Internship {
  seeking: boolean;
  duration: string;
  startDate: string;
  preferredLocation: string;
  focusAreas: string[];
  availability: string;
  workStyle: string;
  goals: string;
}

export interface Personality {
  traits: string[];
  interests: string[];
  funFacts: string[];
  workingStyle: string;
  motivation: string;
}

export interface Resume {
  title: string;
  description: string;
  fileType: string;
  lastUpdated: string;
  fileSize: string;
  downloadUrl: string;
}

export interface Chatbot {
  name: string;
  personality: string;
  tone: string;
  language: string;
  responseStyle: string;
  useEmojis: boolean;
  topics: string[];
}

export interface PresetQuestions {
  me: string[];
  professional: string[];
  projects: string[];
  contact: string[];
  fun: string[];
}

export interface Meta {
  configVersion: string;
  lastUpdated: string;
  generatedBy: string;
  description: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  education: Education;
  experience: Experience[];
  skills: Skills;
  projects: Project[];
  social: Social;
  internship: Internship;
  personality: Personality;
  resume: Resume;
  chatbot: Chatbot;
  presetQuestions: PresetQuestions;
  meta: Meta;
}
