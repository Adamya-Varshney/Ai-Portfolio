'use client';

import { motion } from 'framer-motion';
import { MapPin, Briefcase, TrendingUp, Users, Zap, ArrowUpRight } from 'lucide-react';
import { profileInfo } from '@/lib/config-loader';
import Image from 'next/image';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

const stats = [
  { value: '3.5+', label: 'Years PM experience' },
  { value: '₹100Cr+', label: 'Monthly revenue owned' },
  { value: '17%', label: 'Retention lift' },
  { value: '3000+', label: 'New sellers onboarded' },
];

const highlights = [
  {
    icon: <Zap className="h-4 w-4" />,
    title: 'AI & Agentic Products',
    desc: 'End-to-end RAG pipelines, multi-agent orchestration, and AI-driven CRMs.',
    color: '#6366f1',
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: '0-to-N Builder',
    desc: 'Full product lifecycles from MVP to market expansion for B2B & D2C.',
    color: '#0ea5e9',
  },
  {
    icon: <Users className="h-4 w-4" />,
    title: 'Cross-functional Lead',
    desc: 'Quantifiable impact with a customer-first, data-first mindset.',
    color: '#10b981',
  },
  {
    icon: <Briefcase className="h-4 w-4" />,
    title: 'GTM & Analytics',
    desc: 'GTM strategy and marketing analytics driving measurable growth.',
    color: '#f59e0b',
  },
];

const timeline = [
  { role: 'Assistant Product Manager', org: 'IndiaMART InterMESH', period: 'Jun 2025 – Present', current: true },
  { role: 'Product Management Intern — AIMERS Platform', org: 'Escafate', period: 'Nov 2023 – Feb 2024', current: false },
  { role: 'Product Content Development', org: 'CL Educate Ltd', period: 'Jun 2022 – Apr 2023', current: false },
  { role: 'Product & Content Strategy Associate', org: 'Unacademy', period: 'Feb 2021 – May 2022', current: false },
];

export function Presentation() {
  const profile = profileInfo;

  return (
    <div className="w-full font-sans flex flex-col gap-14">

      {/* Hero — centered */}
      <motion.div {...fade(0)} className="flex flex-col items-center text-center gap-5 pt-6">
        {/* Avatar */}
        <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-gray-200">
          <Image src="/profile.png" alt={profile.name} fill={false}
            width={112} height={112}
            className="object-cover object-[center_top_-5%] w-full h-full" />
        </div>

        {/* Name + badge */}
        <div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">{profile.name}</h1>
            <span className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full"
              style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              Open to work
            </span>
          </div>
          <p className="text-base font-medium text-gray-500">{(profile as any).title ?? 'Product Manager'}</p>
          <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-1">
            <MapPin className="h-3 w-3" />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
          3.5+ years shipping 0-to-N products across B2B & D2C — from seller growth at IndiaMART to AI-native CRMs, RAG pipelines, and agentic workflows. Open to senior PM roles in AI & digital products.
        </p>

        {/* CTA */}
        <a href="https://www.linkedin.com/in/adamya-varshney15/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-4 py-2.5 transition-opacity hover:opacity-90 text-white"
          style={{ background: '#0a66c2' }}>
          LinkedIn <ArrowUpRight className="h-3 w-3" />
        </a>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Stats */}
      <motion.div {...fade(0.05)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.value} className="rounded-xl p-5 border border-gray-100 bg-gray-50 text-center">
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Highlights */}
      <motion.div {...fade(0.1)}>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">What I do</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {highlights.map((h, i) => (
            <div key={i}
              className="rounded-xl p-4 border border-gray-100 bg-white flex items-start gap-3 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
            >
              <span className="flex items-center justify-center h-8 w-8 rounded-lg text-white shrink-0 mt-0.5"
                style={{ background: h.color }}>
                {h.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-0.5">{h.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Experience timeline */}
      <motion.div {...fade(0.15)}>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-5">Experience</h3>
        <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100 overflow-hidden">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-4">
              <div className="mt-1 shrink-0">
                <div className="h-2.5 w-2.5 rounded-full border-2"
                  style={{
                    borderColor: t.current ? '#111827' : '#d1d5db',
                    background: t.current ? '#111827' : 'white',
                  }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <span className="text-sm font-semibold text-gray-900">{t.role}</span>
                    {t.current && (
                      <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-900 text-white">current</span>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">{t.org}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-700 shrink-0 tabular-nums">{t.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Presentation;
