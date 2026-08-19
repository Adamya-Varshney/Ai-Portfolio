'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Code2, Globe, Target, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AvailabilityData {
  availability: string;
  preferences: {
    roleTypes: string[];
    industries: string[];
    workMode: string;
    location: string;
  };
  experience: {
    internshipCompleted: string;
    freelanceWork: string;
    projectExperience: string;
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  achievements: string[];
  lookingFor: {
    growthOpportunities: string;
    mentorship: string;
    impactfulWork: string;
    technicalChallenges: string;
    collaboration: string;
  };
  contact: {
    email: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
}

interface AvailabilityCardProps {
  data?: AvailabilityData;
}

const AvailabilityCard = ({ data }: AvailabilityCardProps) => {
  const router = useRouter();

  const handleContactClick = () => {
    // Navigate to home page with the contact preset question
    router.push('/?query=How can I reach you?');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-accent mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="bg-muted h-16 w-16 overflow-hidden rounded-full shadow-md">
            <img
              src="/profile.png"
              alt="Adamya's avatar"
              className="h-full w-full object-cover object-[center_top_-5%] scale-95"
            />
          </div>
          <div>
            <h2 className="text-foreground text-2xl font-semibold">
              Adamya Varshney
            </h2>
            <p className="text-muted-foreground text-sm">
              Product Manager
            </p>
          </div>
        </div>

        {/* Enhanced Live badge with availability status */}
        <div className="mt-4 flex flex-col items-center gap-2 sm:mt-0 sm:items-end">
          <span className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-0.5 text-sm font-medium text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Available Now
          </span>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            Open to full-time roles
          </p>
        </div>
      </div>

      {/* Availability Highlight Section */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 border border-green-200 dark:border-green-800">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Domain I'm Open to */}
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-green-500 flex items-center justify-center">
              <Target className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Domain I'm Open to</p>
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                Product Management (Digital / AI), Product Strategy
              </p>
            </div>
          </div>

          {/* Looking for */}
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-blue-500 flex items-center justify-center">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Looking for</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                To build AI-enabled Digital Products and scale them to a billion users
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Internship Info */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-1 h-5 w-5 text-blue-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Availability</p>
            <p className="text-muted-foreground text-sm">
              {data?.availability || "Open to senior PM roles — available to start with a standard notice period"}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Globe className="mt-1 h-5 w-5 text-green-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Location</p>
            <p className="text-muted-foreground text-sm">
              {data?.preferences.location || "Based in India, open to relocation for the right opportunity 🇮🇳"}
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex items-start gap-3 sm:col-span-2">
          <Code2 className="mt-1 h-5 w-5 text-purple-500" />
          <div className="w-full">
            <p className="text-foreground text-sm font-medium">Tech stack</p>
            <div className="text-muted-foreground grid grid-cols-1 gap-y-1 text-sm sm:grid-cols-2">
              <ul className="decoration-none list-disc pl-4">
                {data?.skills.technical.slice(0, 4).map((skill, index) => (
                  <li key={index}>{skill}</li>
                )) || (
                  <>
                    <li>Python, SQL, R</li>
                    <li>Power BI, Tableau, Google Analytics</li>
                    <li>JIRA, Figma, A/B Testing</li>
                    <li>LangGraph, LangChain, RAG Systems</li>
                  </>
                )}
              </ul>
              <ul className="list-disc pl-4">
                {data?.skills.technical.slice(4, 8).map((skill, index) => (
                  <li key={index}>{skill}</li>
                )) || (
                  <>
                    <li>Agentic AI, n8n, Make</li>
                    <li>AI Workflow Automation</li>
                    <li>Claude Code, Lovable, FastAPI</li>
                    <li>Scikit-learn, NumPy, Pandas, Seaborn</li>
                  </>
                )}
                <li>
                  <a
                    href="/?query=What%20are%20your%20skills%3F%20Give%20me%20a%20list%20of%20your%20soft%20and%20hard%20skills."
                    className="cursor-pointer items-center text-blue-500 underline"
                  >
                    See more
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What I bring */}
      <div className="mt-10">
        <p className="text-foreground mb-2 text-lg font-semibold">
          What I bring
        </p>
        <p className="text-foreground text-sm">
          {data?.experience.internshipCompleted || "An end-to-end PM toolkit — user and market research, roadmapping and prioritization, GTM strategy, A/B testing, and product analytics across SQL, Power BI, and Python."} <br />
          {data?.achievements[0] || "Customer-first, data-first product sense: I pair design-thinking with quantitative rigor to turn ambiguous 0-to-N problems into outcomes you can measure on a dashboard."} <br />
          {data?.experience.freelanceWork || "3.5+ years across B2B and D2C e-commerce shipping full product lifecycles end to end, with hands-on depth in AI & Agentic products — and the vibe-coding skills to prototype ideas, not just spec them."}
        </p>
      </div>

      {/* Goal */}
      <div className="mt-8">
        <p className="text-foreground mb-2 text-lg font-semibold">Goal</p>
        <p className="text-foreground text-sm">
          I want to own ambiguous 0-to-N product problems end to end — from customer research to GTM — and build AI-native products that move real metrics. I lead with the customer problem, validate with data, and ship in tight, measurable loops, on teams that value user empathy as much as measurable impact. 🚀
        </p>
      </div>

      {/* Contact button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={handleContactClick}
          className="cursor-pointer rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          Contact me
        </button>
      </div>
    </motion.div>
  );
};

export default AvailabilityCard;
