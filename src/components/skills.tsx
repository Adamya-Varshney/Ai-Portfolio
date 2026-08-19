'use client';

import { motion } from 'framer-motion';
import { BarChart3, Brain, Code, PenTool, Target, Users, Workflow } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const Skills = () => {
  const config = getConfig();

  const skillsData = [
    {
      category: 'Product Tools',
      icon: <PenTool className="h-4 w-4" />,
      skills: config.skills.product_tools,
      from: '#7c3aed', to: '#6d28d9',
    },
    {
      category: 'Data & AI',
      icon: <Brain className="h-4 w-4" />,
      skills: config.skills.data_ai,
      from: '#8b5cf6', to: '#7c3aed',
    },
    {
      category: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      skills: config.skills.analytics,
      from: '#a78bfa', to: '#8b5cf6',
    },
    {
      category: 'Automation',
      icon: <Workflow className="h-4 w-4" />,
      skills: config.skills.automation,
      from: '#6d28d9', to: '#4c1d95',
    },
    {
      category: 'Vibe Coding',
      icon: <Code className="h-4 w-4" />,
      skills: config.skills.vibe_coding,
      from: '#7c3aed', to: '#a78bfa',
    },
    {
      category: 'PM Skills',
      icon: <Target className="h-4 w-4" />,
      skills: config.skills.pm_skills,
      from: '#8b5cf6', to: '#6d28d9',
    },
    {
      category: 'Soft Skills',
      icon: <Users className="h-4 w-4" />,
      skills: config.skills.soft_skills,
      from: '#a78bfa', to: '#7c3aed',
    },
  ].filter(c => c.skills && c.skills.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full py-2 font-sans flex flex-col gap-4"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
          Skills & Expertise
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">Tools, frameworks & capabilities</p>
      </div>

      {/* Skill categories */}
      <div className="space-y-3">
        {skillsData.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-xl p-3.5 border"
            style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.05), rgba(139,92,246,0.03))', borderColor: 'rgba(124,58,237,0.12)' }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="flex items-center justify-center h-6 w-6 rounded-lg text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${section.from}, ${section.to})`, boxShadow: `0 2px 6px ${section.from}40` }}>
                {section.icon}
              </span>
              <h3 className="text-xs font-semibold text-foreground">{section.category}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {section.skills.map((skill: string, idx: number) => (
                <span key={idx}
                  className="text-[11px] rounded-full px-2.5 py-0.5 font-medium border"
                  style={{ background: 'rgba(124,58,237,0.07)', color: '#7c3aed', borderColor: 'rgba(124,58,237,0.2)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
