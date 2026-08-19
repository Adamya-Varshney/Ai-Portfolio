'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Calendar, BarChart2 } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

export default function Education() {
  const { education } = getConfig();

  return (
    <div className="w-full font-sans">
      <motion.div {...fade(0)} className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <p className="text-sm text-gray-500 mt-1">Academic background and achievements.</p>
      </motion.div>

      <div className="space-y-4">
        {/* Current degree */}
        <motion.div {...fade(0.05)}
          className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center h-9 w-9 rounded-lg shrink-0 mt-0.5"
              style={{ background: '#f5f3ff' }}>
              <GraduationCap className="h-4 w-4" style={{ color: '#7c3aed' }} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: '#f5f3ff', color: '#7c3aed' }}>Latest</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{education.current.degree}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{education.current.institution}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{education.current.duration}</span>
                <span className="flex items-center gap-1"><BarChart2 className="h-3 w-3" />CGPA: {education.current.cgpa}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Previous degree */}
        {education.previous && (
          <motion.div {...fade(0.08)}
            className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center h-9 w-9 rounded-lg shrink-0 mt-0.5 bg-gray-50">
                <GraduationCap className="h-4 w-4 text-gray-400" />
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">{education.previous.degree}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{education.previous.institution}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{education.previous.duration}</span>
                  {education.previous.percentage && (
                    <span className="flex items-center gap-1"><BarChart2 className="h-3 w-3" />Score: {education.previous.percentage}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievements */}
        {education.achievements && education.achievements.length > 0 && (
          <motion.div {...fade(0.11)}
            className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-gray-900">Academic Achievements</h3>
            </div>
            <ul className="space-y-2.5">
              {education.achievements.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
