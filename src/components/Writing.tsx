'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, PenLine } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const config = getConfig();
const writing: any[] = (config as any).writing ?? [];

const TYPE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  'PM Teardown': { bg: 'rgba(124,58,237,0.08)', color: '#7c3aed', border: 'rgba(124,58,237,0.2)' },
  'AI Product': { bg: 'rgba(139,92,246,0.08)', color: '#8b5cf6', border: 'rgba(139,92,246,0.2)' },
  'Product Lessons': { bg: 'rgba(167,139,250,0.08)', color: '#6d28d9', border: 'rgba(167,139,250,0.2)' },
};

function typeStyle(type: string) {
  return TYPE_STYLES[type] ?? { bg: 'rgba(124,58,237,0.06)', color: '#7c3aed', border: 'rgba(124,58,237,0.15)' };
}

export default function Writing() {
  return (
    <div className="w-full py-2 font-sans flex flex-col gap-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
          Writing
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">PM essays, product teardowns, and lessons from the field.</p>
      </div>

      {writing.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-10 border flex flex-col items-center gap-4 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(139,92,246,0.03))', borderColor: 'rgba(124,58,237,0.12)' }}
        >
          <div className="flex items-center justify-center h-12 w-12 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }}>
            <PenLine className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Articles coming soon</p>
            <p className="text-xs text-muted-foreground max-w-xs">Follow on LinkedIn for PM thoughts in the meantime.</p>
          </div>
          <a
            href="https://www.linkedin.com/in/adamya-varshney15/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 2px 10px rgba(124,58,237,0.3)' }}
          >
            LinkedIn <ArrowUpRight className="h-3 w-3" />
          </a>
        </motion.div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {writing.map((post: any, i: number) => {
            const ts = typeStyle(post.type);
            return (
              <motion.a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group flex flex-col gap-3 rounded-xl border p-4 hover:border-violet-300/50 transition-all cursor-pointer"
                style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.04), rgba(139,92,246,0.02))', borderColor: 'rgba(124,58,237,0.12)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{ background: ts.bg, color: ts.color, borderColor: ts.border }}>
                    {post.type}
                  </span>
                  <span className="text-[11px] text-muted-foreground shrink-0">{post.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-violet-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{post.summary}</p>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#7c3aed' }}>
                  Read <ArrowUpRight className="h-3 w-3" />
                </div>
              </motion.a>
            );
          })}
        </div>
      )}
    </div>
  );
}
