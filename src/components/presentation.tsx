'use client';

import { motion } from 'framer-motion';
import { MapPin, Briefcase, TrendingUp, Users, Zap } from 'lucide-react';
import { profileInfo } from '@/lib/config-loader';
import Image from 'next/image';

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/adamya-varshney15/',
    bg: '#0a66c2',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Adamya-Varshney',
    bg: '#24292e',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: 'Kaggle',
    href: 'https://www.kaggle.com/adam23082july',
    bg: '#20beff',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.334" />
      </svg>
    ),
  },
];

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

        {/* Social links */}
        <div className="flex items-center gap-3">
          {socials.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              title={s.name}
              className="flex items-center justify-center h-9 w-9 rounded-xl transition-opacity hover:opacity-85"
              style={{ background: s.bg }}>
              {s.icon}
            </a>
          ))}
        </div>
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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-900">{t.role}</span>
                    {t.current && (
                      <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-900 text-white">current</span>
                    )}
                    <p className="text-xs text-gray-500 mt-0.5">{t.org}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-700 sm:shrink-0 tabular-nums">{t.period}</span>
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
