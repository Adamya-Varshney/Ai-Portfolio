'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, PenLine } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';

const config = getConfig();
const writing: any[] = (config as any).writing ?? [];

const TYPE_COLORS: Record<string, string> = {
  'PM Teardown': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400',
  'AI Product': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400',
  'Product Lessons': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
};

function typeColor(type: string) {
  return TYPE_COLORS[type] ?? 'bg-muted text-muted-foreground';
}

export default function Writing() {
  if (writing.length === 0) {
    return (
      <div className="mx-auto mt-8 w-full">
        <div className="bg-accent w-full overflow-hidden rounded-3xl px-6 py-8 sm:px-10 md:px-16 md:py-12">
          <h2 className="text-foreground text-3xl font-semibold md:text-4xl mb-2">Writing</h2>
          <p className="text-muted-foreground text-sm mb-8">PM essays, product teardowns, and lessons from the field.</p>
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <PenLine className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm max-w-xs">Articles coming soon. Follow on LinkedIn for PM thoughts in the meantime.</p>
            <a
              href="https://www.linkedin.com/in/adamya-varshney15/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-background px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-full">
      <div className="bg-accent w-full overflow-hidden rounded-3xl px-6 py-8 sm:px-10 md:px-16 md:py-12">
        <h2 className="text-foreground text-3xl font-semibold md:text-4xl mb-2">Writing</h2>
        <p className="text-muted-foreground text-sm mb-8">PM essays, product teardowns, and lessons from the field.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {writing.map((post: any, i: number) => (
            <motion.a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group flex flex-col gap-3 rounded-2xl border bg-background p-5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColor(post.type)}`}>
                  {post.type}
                </span>
                <span className="text-xs text-muted-foreground shrink-0">{post.date}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">{post.summary}</p>
              <div className="flex items-center gap-1 text-xs font-medium text-primary">
                Read <ArrowUpRight className="h-3 w-3" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
