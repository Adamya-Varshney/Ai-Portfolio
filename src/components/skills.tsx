'use client';

import { motion } from 'framer-motion';
import { BarChart3, Brain, Code, PenTool, Target, Users, Workflow } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const CATEGORIES = [
  { key: 'product_tools', label: 'Product Tools', icon: PenTool, color: '#6366f1' },
  { key: 'data_ai', label: 'Data & AI', icon: Brain, color: '#8b5cf6' },
  { key: 'analytics', label: 'Analytics', icon: BarChart3, color: '#10b981' },
  { key: 'automation', label: 'Automation', icon: Workflow, color: '#f59e0b' },
  { key: 'vibe_coding', label: 'Vibe Coding', icon: Code, color: '#0ea5e9' },
  { key: 'pm_skills', label: 'PM Skills', icon: Target, color: '#ef4444' },
  { key: 'soft_skills', label: 'Soft Skills', icon: Users, color: '#64748b' },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

export default function Skills() {
  const config = getConfig();

  const sections = CATEGORIES
    .map(c => ({ ...c, skills: (config.skills as any)[c.key] as string[] | undefined }))
    .filter(c => c.skills && c.skills.length > 0);

  return (
    <div className="w-full font-sans">
      <motion.div {...fade(0)} className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Skills & Expertise</h2>
        <p className="text-sm text-gray-500 mt-1">Tools, frameworks, and competencies I work with.</p>
      </motion.div>

      <div className="space-y-7">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div key={section.key} {...fade(0.04 * i)}>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center h-7 w-7 rounded-lg text-white shrink-0"
                  style={{ background: section.color }}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <h3 className="text-sm font-semibold text-gray-700">{section.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {section.skills!.map((skill, idx) => (
                  <span key={idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-gray-300 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
