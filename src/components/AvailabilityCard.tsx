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
    router.push('/?query=How can I reach you?');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full font-sans"
    >
      {/* Hero header card */}
      <div className="relative overflow-hidden rounded-2xl p-5 mb-4"
        style={{ background: 'linear-gradient(135deg, #0f0820 0%, #1e1047 40%, #2d1b69 100%)' }}>
        <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full opacity-20 blur-2xl"
          style={{ background: 'radial-gradient(circle, #ddd6fe, transparent)' }} />

        <div className="relative flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl overflow-hidden border border-violet-400/30 shrink-0">
              <img src="/profile.png" alt="Adamya" className="h-full w-full object-cover object-[center_top_-5%]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Adamya Varshney</h2>
              <p className="text-xs text-violet-300">Product Manager</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'rgba(134,239,172,0.15)', color: '#86efac', border: '1px solid rgba(134,239,172,0.3)' }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
            </span>
            Available Now
          </span>
        </div>

        <p className="relative mt-3 text-xs text-violet-200/80 leading-relaxed border-t border-white/10 pt-3">
          Open to senior PM roles in AI & digital products — available to start with a standard notice period.
        </p>
      </div>

      {/* Domain & Looking For */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl p-3.5 border flex flex-col gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(139,92,246,0.04))', borderColor: 'rgba(124,58,237,0.15)' }}>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center h-7 w-7 rounded-lg text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 2px 8px rgba(124,58,237,0.4)' }}>
              <Target className="h-3.5 w-3.5" />
            </span>
            <p className="text-xs font-semibold text-foreground">Domain</p>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">Product Management (Digital / AI), Product Strategy</p>
        </div>

        <div className="rounded-xl p-3.5 border flex flex-col gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.07), rgba(167,139,250,0.04))', borderColor: 'rgba(139,92,246,0.15)' }}>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center h-7 w-7 rounded-lg text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', boxShadow: '0 2px 8px rgba(139,92,246,0.4)' }}>
              <Rocket className="h-3.5 w-3.5" />
            </span>
            <p className="text-xs font-semibold text-foreground">Looking for</p>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">AI-enabled products that scale to a billion users</p>
        </div>
      </div>

      {/* Info cards */}
      <div className="space-y-3 mb-4">
        <div className="rounded-xl p-3.5 border flex items-start gap-3"
          style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.05), rgba(139,92,246,0.03))', borderColor: 'rgba(124,58,237,0.12)' }}>
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#7c3aed' }} />
          <div>
            <p className="text-xs font-semibold text-foreground mb-0.5">Availability</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {data?.availability || "Open to senior PM roles — available to start with a standard notice period"}
            </p>
          </div>
        </div>

        <div className="rounded-xl p-3.5 border flex items-start gap-3"
          style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.05), rgba(139,92,246,0.03))', borderColor: 'rgba(124,58,237,0.12)' }}>
          <Globe className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#7c3aed' }} />
          <div>
            <p className="text-xs font-semibold text-foreground mb-0.5">Location</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              {data?.preferences.location || "Based in India, open to relocation for the right opportunity 🇮🇳"}
            </p>
          </div>
        </div>

        <div className="rounded-xl p-3.5 border flex items-start gap-3"
          style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.05), rgba(139,92,246,0.03))', borderColor: 'rgba(124,58,237,0.12)' }}>
          <Code2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#7c3aed' }} />
          <div className="w-full">
            <p className="text-xs font-semibold text-foreground mb-1.5">Tech stack</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] text-muted-foreground">
              <span>Python, SQL, R</span>
              <span>Agentic AI, n8n, Make</span>
              <span>Power BI, Tableau, GA</span>
              <span>AI Workflow Automation</span>
              <span>JIRA, Figma, A/B Testing</span>
              <span>Claude Code, FastAPI</span>
              <span>LangGraph, LangChain, RAG</span>
              <a href="/?query=What%20are%20your%20skills%3F" className="text-violet-600 underline hover:text-violet-800">See more →</a>
            </div>
          </div>
        </div>
      </div>

      {/* What I bring */}
      <div className="rounded-xl p-4 border mb-3"
        style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.05), rgba(139,92,246,0.03))', borderColor: 'rgba(124,58,237,0.12)' }}>
        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#7c3aed' }}>What I bring</p>
        <p className="text-[12px] text-foreground leading-relaxed">
          An end-to-end PM toolkit — user research, roadmapping, GTM, A/B testing, and product analytics across SQL, Power BI, and Python. Customer-first, data-first product sense with 3.5+ years shipping full product lifecycles across B2B and D2C, with hands-on depth in AI & Agentic products.
        </p>
      </div>

      {/* CTA */}
      <div className="flex justify-center pb-2">
        <button
          onClick={handleContactClick}
          className="cursor-pointer rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 4px 16px rgba(124,58,237,0.35)' }}
        >
          Contact me
        </button>
      </div>
    </motion.div>
  );
};

export default AvailabilityCard;
