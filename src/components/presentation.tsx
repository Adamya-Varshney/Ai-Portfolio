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
  { value: '3.5+ yrs', label: 'PM Experience' },
  { value: '100+ Cr', label: 'Monthly Revenue' },
  { value: '17%', label: 'Retention Lift' },
  { value: '3000+', label: 'New Sellers' },
];

const highlights = [
  {
    icon: <Zap className="h-4 w-4" />,
    title: 'AI & Agentic Products',
    desc: 'Built end-to-end Agentic AI solutions — RAG pipelines, multi-agent orchestration, and AI-driven CRMs.',
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: '0-to-N Builder',
    desc: 'Shipped full product lifecycles from MVP to market expansion for B2B and D2C e-commerce.',
  },
  {
    icon: <Users className="h-4 w-4" />,
    title: 'Cross-functional Lead',
    desc: 'Led diverse teams toward quantifiable impact with a customer-first, data-first mindset.',
  },
  {
    icon: <Briefcase className="h-4 w-4" />,
    title: 'GTM & Analytics',
    desc: 'Owned GTM strategy and marketing analytics, driving measurable growth across digital journeys.',
  },
];

const tags = ['Product Manager', 'AI & Agentic Products', 'GTM Strategy', 'Product Analytics', '0-to-N'];

export function Presentation() {
  const profile = profileInfo;

  return (
    <div className="w-full py-2 font-sans">
      {/* Top: avatar + name */}
      <motion.div {...fade(0)} className="flex items-center gap-4 mb-5">
        <div className="relative h-14 w-14 shrink-0 rounded-2xl overflow-hidden border border-border shadow-sm">
          <Image
            src="/profile.png"
            alt={profile.name}
            fill
            className="object-cover object-[center_top_-5%]"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground leading-tight">{profile.name}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{(profile as any).title ?? 'Product Manager'}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{profile.location}</span>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div {...fade(0.08)} className="grid grid-cols-4 gap-2 mb-5">
        {stats.map(s => (
          <div key={s.value} className="rounded-xl border bg-accent px-2 py-2.5 text-center">
            <div className="text-sm font-semibold text-foreground">{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Highlights grid */}
      <motion.div {...fade(0.16)} className="grid grid-cols-2 gap-2 mb-5">
        {highlights.map((h, i) => (
          <div key={i} className="rounded-xl border bg-background p-3 flex flex-col gap-1.5 hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-2">
              <span
                className="flex items-center justify-center h-6 w-6 rounded-lg text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
              >
                {h.icon}
              </span>
              <span className="text-xs font-semibold text-foreground leading-tight">{h.title}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Tags */}
      <motion.div {...fade(0.24)} className="flex flex-wrap gap-1.5">
        {tags.map(tag => (
          <span key={tag} className="rounded-full border bg-accent px-2.5 py-1 text-xs text-foreground">
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Presentation;
