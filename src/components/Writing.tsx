'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, PenLine } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const config = getConfig();
const writing: any[] = (config as any).writing ?? [];

const TYPE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  'PM Teardown':     { bg: 'rgba(99,102,241,0.10)',  color: '#6366f1', border: 'rgba(99,102,241,0.25)' },
  'AI Product':      { bg: 'rgba(168,85,247,0.10)',  color: '#a855f7', border: 'rgba(168,85,247,0.25)' },
  'Product Lessons': { bg: 'rgba(139,92,246,0.10)',  color: '#8b5cf6', border: 'rgba(139,92,246,0.25)' },
};

function typeStyle(type: string) {
  return TYPE_STYLES[type] ?? { bg: 'rgba(99,102,241,0.08)', color: '#6366f1', border: 'rgba(99,102,241,0.2)' };
}

export default function Writing() {
  const empty = writing.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mt-2"
    >
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold"
          style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Writing
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">PM essays, product teardowns, and lessons from the field.</p>
      </div>

      {empty ? (
        <div
          className="flex flex-col items-center justify-center py-12 gap-3 text-center rounded-2xl border"
          style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.04), rgba(168,85,247,0.03))', borderColor: 'rgba(99,102,241,0.15)' }}
        >
          <span className="flex items-center justify-center h-12 w-12 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}>
            <PenLine className="h-5 w-5 text-white" />
          </span>
          <p className="text-sm text-muted-foreground max-w-xs">Articles coming soon. Follow on LinkedIn for PM thoughts in the meantime.</p>
          <a
            href="https://www.linkedin.com/in/adamya-varshney15/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 2px 10px rgba(99,102,241,0.3)' }}
          >
            LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {writing.map((post: any, i: number) => {
            const s = typeStyle(post.type);
            return (
              <motion.a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group flex flex-col gap-2.5 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(145deg, rgba(99,102,241,0.04), rgba(168,85,247,0.03))',
                  border: '1px solid rgba(99,102,241,0.15)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
                whileHover={{ boxShadow: '0 6px 20px rgba(99,102,241,0.13)' } as any}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                    {post.type}
                  </span>
                  <span className="text-[11px] text-muted-foreground shrink-0">{post.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{post.summary}</p>
                <div className="flex items-center gap-1 text-xs font-semibold"
                  style={{ color: '#6366f1' }}>
                  Read <ArrowUpRight className="h-3 w-3" />
                </div>
              </motion.a>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
