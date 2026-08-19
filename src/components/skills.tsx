'use client';

import { motion } from 'framer-motion';
import { BarChart3, Brain, Code, PenTool, Target, Users, Workflow } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const config = getConfig();

const ICON_GRADIENTS = [
  ['#6366f1', '#8b5cf6'],
  ['#8b5cf6', '#a855f7'],
  ['#a855f7', '#c026d3'],
  ['#6366f1', '#4f46e5'],
  ['#4f46e5', '#6366f1'],
  ['#8b5cf6', '#6366f1'],
  ['#a855f7', '#8b5cf6'],
];

const skillsData = [
  { category: 'Product Tools', icon: PenTool, skills: config.skills.product_tools },
  { category: 'Data & AI',     icon: Brain,   skills: config.skills.data_ai },
  { category: 'Analytics',     icon: BarChart3,skills: config.skills.analytics },
  { category: 'Automation',    icon: Workflow, skills: config.skills.automation },
  { category: 'Vibe Coding',   icon: Code,    skills: config.skills.vibe_coding },
  { category: 'PM Skills',     icon: Target,  skills: config.skills.pm_skills },
  { category: 'Soft Skills',   icon: Users,   skills: config.skills.soft_skills },
].filter(c => c.skills && c.skills.length > 0);

const Skills = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="w-full py-2"
  >
    {/* Header */}
    <div className="mb-4">
      <h2 className="text-lg font-bold"
        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Skills & Expertise
      </h2>
    </div>

    <div className="space-y-4">
      {skillsData.map((section, index) => {
        const Icon = section.icon;
        const [from, to] = ICON_GRADIENTS[index % ICON_GRADIENTS.length];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.35 }}
            className="rounded-xl p-3 border border-border/50"
            style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.04), rgba(168,85,247,0.03))' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="flex items-center justify-center h-6 w-6 rounded-lg text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 2px 8px ${from}40` }}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wide">{section.category}</h3>
            </div>
            <div className="flex flex-wrap gap-1">
              {section.skills.map((skill: string, idx: number) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="text-[11px] rounded-full px-2 py-0.5 font-medium cursor-default"
                  style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)' }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export default Skills;
