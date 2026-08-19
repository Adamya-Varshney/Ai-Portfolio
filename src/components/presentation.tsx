'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { MapPin, Briefcase, TrendingUp, Users, Zap } from 'lucide-react';
import { profileInfo } from '@/lib/config-loader';
import Image from 'next/image';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

const stats = [
  { value: '3.5+ yrs', label: 'PM Experience', gradient: 'from-indigo-500 to-violet-500' },
  { value: '100+ Cr', label: 'Monthly Revenue', gradient: 'from-violet-500 to-purple-500' },
  { value: '17%', label: 'Retention Lift', gradient: 'from-purple-500 to-fuchsia-500' },
  { value: '3000+', label: 'New Sellers', gradient: 'from-fuchsia-500 to-pink-500' },
];

const highlights = [
  {
    icon: <Zap className="h-3.5 w-3.5" />,
    title: 'AI & Agentic Products',
    desc: 'End-to-end RAG pipelines, multi-agent orchestration, and AI-driven CRMs.',
    from: '#6366f1', to: '#8b5cf6',
  },
  {
    icon: <TrendingUp className="h-3.5 w-3.5" />,
    title: '0-to-N Builder',
    desc: 'Full product lifecycles from MVP to market expansion for B2B & D2C.',
    from: '#8b5cf6', to: '#a855f7',
  },
  {
    icon: <Users className="h-3.5 w-3.5" />,
    title: 'Cross-functional Lead',
    desc: 'Quantifiable impact with a customer-first, data-first mindset.',
    from: '#a855f7', to: '#c026d3',
  },
  {
    icon: <Briefcase className="h-3.5 w-3.5" />,
    title: 'GTM & Analytics',
    desc: 'GTM strategy and marketing analytics driving measurable growth.',
    from: '#6366f1', to: '#4f46e5',
  },
];

const tags = ['Product Manager', 'AI & Agentic Products', 'GTM Strategy', 'Product Analytics', '0-to-N'];

export function Presentation() {
  const profile = profileInfo;

  return (
    <div className="w-full py-2 font-sans">
      {/* Hero card: avatar + name + gradient bg */}
      <motion.div {...fade(0)} className="relative overflow-hidden rounded-2xl mb-4 p-4"
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)' }}
      >
        {/* Subtle radial glow */}
        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full opacity-15 blur-2xl"
          style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />

        <div className="relative flex items-center gap-4">
          {/* Avatar with gradient ring */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl p-0.5"
              style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', borderRadius: '14px' }}>
              <div className="h-full w-full rounded-2xl bg-indigo-950" />
            </div>
            <div className="relative h-14 w-14 rounded-2xl overflow-hidden border-2 border-indigo-400/30">
              <Image src="/profile.png" alt={profile.name} fill className="object-cover object-[center_top_-5%]" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-base font-bold text-white leading-tight">{profile.name}</h1>
              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(134,239,172,0.15)', color: '#86efac', border: '1px solid rgba(134,239,172,0.3)' }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400"></span>
                </span>
                Open to work
              </span>
            </div>
            <p className="text-xs text-indigo-200 font-medium">{(profile as any).title ?? 'Product Manager'}</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-indigo-300/80">
              <MapPin className="h-3 w-3" />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div {...fade(0.08)} className="grid grid-cols-4 gap-2 mb-4">
        {stats.map(s => (
          <div key={s.value}
            className="rounded-xl p-2.5 text-center relative overflow-hidden border border-white/10"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.12))' }}
          >
            <div className={`text-sm font-bold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Highlights grid */}
      <motion.div {...fade(0.16)} className="grid grid-cols-2 gap-2 mb-4">
        {highlights.map((h, i) => (
          <div key={i}
            className="rounded-xl p-3 flex flex-col gap-1.5 border border-border/60 hover:border-indigo-300/40 transition-all duration-200 group"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.04), rgba(168,85,247,0.04))' }}
          >
            <div className="flex items-center gap-2">
              <span
                className="flex items-center justify-center h-6 w-6 rounded-lg text-white shrink-0 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${h.from}, ${h.to})`, boxShadow: `0 2px 8px ${h.from}40` }}
              >
                {h.icon}
              </span>
              <span className="text-xs font-semibold text-foreground leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{h.title}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Tags */}
      <motion.div {...fade(0.24)} className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span key={tag}
            className="rounded-full px-2.5 py-1 text-xs font-medium border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))' }}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Presentation;
