'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { MapPin, Briefcase, TrendingUp, Users, Zap, ArrowUpRight } from 'lucide-react';
import { profileInfo } from '@/lib/config-loader';
import Image from 'next/image';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

const stats = [
  { value: '3.5+ yrs', label: 'PM Experience', gradient: 'from-violet-700 to-violet-500' },
  { value: '100+ Cr', label: 'Monthly Revenue', gradient: 'from-violet-600 to-purple-500' },
  { value: '17%', label: 'Retention Lift', gradient: 'from-purple-500 to-fuchsia-400' },
  { value: '3000+', label: 'New Sellers', gradient: 'from-fuchsia-500 to-pink-400' },
];

const highlights = [
  {
    icon: <Zap className="h-3.5 w-3.5" />,
    title: 'AI & Agentic Products',
    desc: 'End-to-end RAG pipelines, multi-agent orchestration, and AI-driven CRMs.',
    from: '#7c3aed', to: '#6d28d9',
  },
  {
    icon: <TrendingUp className="h-3.5 w-3.5" />,
    title: '0-to-N Builder',
    desc: 'Full product lifecycles from MVP to market expansion for B2B & D2C.',
    from: '#6d28d9', to: '#8b5cf6',
  },
  {
    icon: <Users className="h-3.5 w-3.5" />,
    title: 'Cross-functional Lead',
    desc: 'Quantifiable impact with a customer-first, data-first mindset.',
    from: '#8b5cf6', to: '#a78bfa',
  },
  {
    icon: <Briefcase className="h-3.5 w-3.5" />,
    title: 'GTM & Analytics',
    desc: 'GTM strategy and marketing analytics driving measurable growth.',
    from: '#7c3aed', to: '#4c1d95',
  },
];

const tags = ['Product Manager', 'AI & Agentic Products', 'GTM Strategy', 'Product Analytics', '0-to-N'];

const timeline = [
  { role: 'Product Manager — AI & Agentic', org: 'IndiaMART InterMESH', period: '2022 – Present', current: true },
  { role: 'Product Management Intern', org: 'YourDOST', period: '2021', current: false },
  { role: 'MBA — Marketing & Finance', org: 'IIM Kashipur', period: '2020 – 2022', current: false },
];

export function Presentation() {
  const profile = profileInfo;

  return (
    <div className="w-full py-2 font-sans min-h-full flex flex-col gap-4">
      {/* Hero card */}
      <motion.div {...fade(0)} className="relative overflow-hidden rounded-2xl p-5"
        style={{ background: 'linear-gradient(135deg, #0f0820 0%, #1e1047 40%, #2d1b69 100%)' }}
      >
        <div className="absolute -top-8 -right-8 h-36 w-36 rounded-full opacity-20 blur-2xl"
          style={{ background: 'radial-gradient(circle, #ddd6fe, transparent)' }} />
        <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full opacity-15 blur-2xl"
          style={{ background: 'radial-gradient(circle, #c4b5fd, transparent)' }} />

        <div className="relative flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl p-0.5"
              style={{ background: 'linear-gradient(135deg, #c4b5fd, #ddd6fe)', borderRadius: '14px' }}>
              <div className="h-full w-full rounded-2xl bg-violet-950" />
            </div>
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-violet-400/30">
              <Image src="/profile.png" alt={profile.name} fill className="object-cover object-[center_top_-5%]" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <h1 className="text-base font-bold text-white leading-tight">{profile.name}</h1>
              <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0"
                style={{ background: 'rgba(134,239,172,0.15)', color: '#86efac', border: '1px solid rgba(134,239,172,0.3)' }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                </span>
                Open to work
              </span>
            </div>
            <p className="text-xs text-violet-200 font-medium">{(profile as any).title ?? 'Product Manager'}</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-violet-300/80">
              <MapPin className="h-3 w-3" />
              <span>{profile.location}</span>
            </div>
          </div>

          <a href="https://www.linkedin.com/in/adamya-varshney15/" target="_blank" rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 text-[11px] font-semibold rounded-lg px-2.5 py-1.5 text-white transition-opacity hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            LinkedIn <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <p className="relative mt-3 text-xs text-violet-200/80 leading-relaxed border-t border-white/10 pt-3">
          3.5+ years shipping 0-to-N products across B2B & D2C — from seller growth at IndiaMART to AI-native CRMs, RAG pipelines, and agentic workflows. Currently open to senior PM roles in AI & digital products.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div {...fade(0.08)} className="grid grid-cols-4 gap-2">
        {stats.map(s => (
          <div key={s.value}
            className="rounded-xl p-3 text-center border"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(139,92,246,0.06))', borderColor: 'rgba(124,58,237,0.15)' }}
          >
            <div className={`text-base font-bold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Highlights grid */}
      <motion.div {...fade(0.14)} className="grid grid-cols-2 gap-2">
        {highlights.map((h, i) => (
          <div key={i}
            className="rounded-xl p-3.5 flex flex-col gap-2 border hover:border-violet-300/40 transition-all duration-200 group"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(139,92,246,0.03))', borderColor: 'rgba(124,58,237,0.12)' }}
          >
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center h-7 w-7 rounded-lg text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${h.from}, ${h.to})`, boxShadow: `0 2px 8px ${h.from}40` }}>
                {h.icon}
              </span>
              <span className="text-xs font-semibold text-foreground leading-tight group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors">{h.title}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Timeline */}
      <motion.div {...fade(0.2)} className="rounded-xl p-4 border"
        style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.05), rgba(139,92,246,0.03))', borderColor: 'rgba(124,58,237,0.12)' }}>
        <h3 className="text-[11px] font-semibold uppercase tracking-wide mb-3"
          style={{ color: '#7c3aed' }}>Experience</h3>
        <div className="space-y-3">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1 shrink-0 flex flex-col items-center">
                <div className="h-2 w-2 rounded-full"
                  style={{ background: t.current ? 'linear-gradient(135deg, #7c3aed, #a78bfa)' : 'rgba(124,58,237,0.3)' }} />
                {i < timeline.length - 1 && <div className="w-px h-5 mt-1" style={{ background: 'rgba(124,58,237,0.15)' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-foreground">{t.role}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">{t.period}</span>
                </div>
                <span className="text-[11px] text-muted-foreground">{t.org}</span>
                {t.current && (
                  <span className="ml-2 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                    style={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed' }}>current</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div {...fade(0.26)} className="flex flex-wrap gap-1.5 pb-2">
        {tags.map(tag => (
          <span key={tag}
            className="rounded-full px-3 py-1 text-xs font-medium border"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(139,92,246,0.06))',
              borderColor: 'rgba(124,58,237,0.2)',
              color: '#7c3aed',
            }}>
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Presentation;
