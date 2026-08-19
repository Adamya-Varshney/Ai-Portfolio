'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Code2, Globe, Target, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto mt-2 w-full font-sans"
    >
      {/* Header card */}
      <div className="rounded-2xl p-4 mb-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)' }}>
        <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-2xl overflow-hidden border-2 border-indigo-400/30 shrink-0">
              <Image src="/profile.png" alt="Adamya" fill className="object-cover object-[center_top_-5%]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Adamya Varshney</h2>
              <p className="text-xs text-indigo-200">Product Manager</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(134,239,172,0.15)', color: '#86efac', border: '1px solid rgba(134,239,172,0.3)' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400"></span>
              </span>
              Available Now
            </span>
            <p className="text-[10px] text-indigo-300/70">Open to full-time roles</p>
          </div>
        </div>
      </div>

      {/* Availability highlight */}
      <div className="rounded-xl p-4 mb-4"
        style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.06), rgba(168,85,247,0.04))', border: '1px solid rgba(99,102,241,0.18)' }}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center h-8 w-8 rounded-xl shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 2px 8px rgba(99,102,241,0.35)' }}>
              <Target className="h-4 w-4 text-white" />
            </span>
            <div>
              <p className="text-xs font-semibold text-foreground mb-0.5">Domain I'm Open to</p>
              <p className="text-xs font-semibold" style={{ color: '#6366f1' }}>
                Product Management (Digital / AI), Product Strategy
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center h-8 w-8 rounded-xl shrink-0"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #a855f7)', boxShadow: '0 2px 8px rgba(139,92,246,0.35)' }}>
              <Rocket className="h-4 w-4 text-white" />
            </span>
            <div>
              <p className="text-xs font-semibold text-foreground mb-0.5">Looking for</p>
              <p className="text-xs font-semibold" style={{ color: '#8b5cf6' }}>
                To build AI-enabled Digital Products and scale them to a billion users
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mb-4">
        <div className="flex items-start gap-3 rounded-xl p-3"
          style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.04), rgba(168,85,247,0.03))', border: '1px solid rgba(99,102,241,0.12)' }}>
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#6366f1' }} />
          <div>
            <p className="text-xs font-semibold text-foreground">Availability</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {data?.availability || "Open to senior PM roles — available to start with a standard notice period"}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl p-3"
          style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.04), rgba(168,85,247,0.03))', border: '1px solid rgba(99,102,241,0.12)' }}>
          <Globe className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#8b5cf6' }} />
          <div>
            <p className="text-xs font-semibold text-foreground">Location</p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {data?.preferences.location || "Based in India, open to relocation for the right opportunity 🇮🇳"}
            </p>
          </div>
        </div>
      </div>

      {/* Tech stack */}
      <div className="rounded-xl p-3 mb-4"
        style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.04), rgba(168,85,247,0.03))', border: '1px solid rgba(99,102,241,0.12)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="h-4 w-4 shrink-0" style={{ color: '#a855f7' }} />
          <p className="text-xs font-semibold text-foreground">Tech stack</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {['Python, SQL, R', 'Power BI, Tableau, GA', 'JIRA, Figma, A/B Testing', 'LangGraph, LangChain, RAG', 'Agentic AI, n8n, Make', 'Claude Code, FastAPI', 'Scikit-learn, NumPy, Pandas'].map((s, i) => (
            <span key={i} className="text-[11px] rounded-full px-2 py-0.5 font-medium"
              style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}>
              {s}
            </span>
          ))}
          <a href="/?query=What%20are%20your%20skills%3F%20Give%20me%20a%20list%20of%20your%20soft%20and%20hard%20skills."
            className="text-[11px] rounded-full px-2 py-0.5 font-semibold"
            style={{ color: '#6366f1' }}>
            See more →
          </a>
        </div>
      </div>

      {/* What I bring */}
      <div className="rounded-xl p-3 mb-4"
        style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.04), rgba(168,85,247,0.03))', border: '1px solid rgba(99,102,241,0.12)' }}>
        <p className="text-xs font-semibold text-foreground mb-1.5">What I bring</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {data?.experience.internshipCompleted || "An end-to-end PM toolkit — user and market research, roadmapping and prioritization, GTM strategy, A/B testing, and product analytics across SQL, Power BI, and Python."}{' '}
          {data?.achievements[0] || "Customer-first, data-first product sense: I pair design-thinking with quantitative rigor to turn ambiguous 0-to-N problems into outcomes you can measure on a dashboard."}{' '}
          {data?.experience.freelanceWork || "3.5+ years across B2B and D2C e-commerce shipping full product lifecycles end to end, with hands-on depth in AI & Agentic products."}
        </p>
      </div>

      {/* Goal */}
      <div className="rounded-xl p-3 mb-4"
        style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.04), rgba(168,85,247,0.03))', border: '1px solid rgba(99,102,241,0.12)' }}>
        <p className="text-xs font-semibold text-foreground mb-1.5">Goal</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          I want to own ambiguous 0-to-N product problems end to end — from customer research to GTM — and build AI-native products that move real metrics. I lead with the customer problem, validate with data, and ship in tight, measurable loops. 🚀
        </p>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <motion.button
          onClick={handleContactClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 2px 12px rgba(99,102,241,0.35)' }}
        >
          Contact me
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AvailabilityCard;
