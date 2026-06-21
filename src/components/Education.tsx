'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Calendar, BarChart2 } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const Education = () => {
  const config = getConfig();
  const { education } = config;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-accent mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
    >
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
          <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-foreground text-2xl font-semibold">Education</h2>
      </div>

      {/* Degrees */}
      <div className="space-y-6">
        {/* Current degree */}
        <div className="rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6 dark:border-purple-800 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              Latest
            </span>
          </div>
          <h3 className="text-foreground mt-2 text-lg font-semibold">
            {education.current.degree}
          </h3>
          <p className="text-muted-foreground text-sm">
            {education.current.institution}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {education.current.duration}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <BarChart2 className="h-4 w-4" />
              CGPA: {education.current.cgpa}
            </span>
          </div>
        </div>

        {/* Previous degree */}
        {education.previous && (
          <div className="rounded-2xl border border-border bg-muted/30 p-6">
            <h3 className="text-foreground text-lg font-semibold">
              {education.previous.degree}
            </h3>
            <p className="text-muted-foreground text-sm">
              {education.previous.institution}
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {education.previous.duration}
              </span>
              {education.previous.percentage && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <BarChart2 className="h-4 w-4" />
                  Score: {education.previous.percentage}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Achievements */}
      {education.achievements && education.achievements.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <h3 className="text-foreground text-lg font-semibold">
              Academic Achievements
            </h3>
          </div>
          <ul className="space-y-3">
            {education.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-yellow-400" />
                <span className="text-foreground text-sm">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default Education;
