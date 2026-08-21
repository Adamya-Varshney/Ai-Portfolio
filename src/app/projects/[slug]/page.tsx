'use client';

import { useParams, useRouter } from 'next/navigation';
import { getConfig } from '@/lib/config-loader';
import { toSlug, fromSlug } from '@/lib/project-slug';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowLeft, ExternalLink, BookOpen, Calendar, Tag,
  Layers, ChevronRight, FileText
} from 'lucide-react';
import { useState } from 'react';

const config = getConfig();
const ALL_PROJECTS: any[] = config.projects as any[];

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const project = fromSlug(slug, ALL_PROJECTS);
  const [activeTab, setActiveTab] = useState<'overview' | 'deck'>('overview');

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-white">
        <p className="text-gray-400 text-sm">Project not found.</p>
        <button onClick={() => router.back()} className="text-xs text-gray-600 underline">Go back</button>
      </div>
    );
  }

  const hasDeck = !!project.embedUrl;
  const links: { name: string; url: string }[] = project.links ?? [];

  return (
    <div className="min-h-screen w-full font-sans bg-white">

      {/* Top nav bar */}
      <div className="sticky top-0 z-40 bg-white/95 border-b border-gray-200 backdrop-blur-sm">
        <div className="w-full px-6 sm:px-12 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-gray-400 min-w-0">
            <span>Projects</span>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-gray-700 font-medium truncate">{project.sidebarTitle || project.title}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {links.map((l: any) => (
              <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-semibold rounded-md px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                <ExternalLink className="h-3 w-3" />
                {l.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full px-6 sm:px-12 py-10 max-w-4xl mx-auto space-y-8">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Cover image */}
          <div className="relative h-52 sm:h-64 rounded-xl overflow-hidden mb-6 bg-gray-100">
            {project.images?.[0]?.src ? (
              <Image src={project.images[0].src} alt={project.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-semibold text-gray-300 text-center px-8">{project.title}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {project.isLive && (
              <span className="absolute top-3 left-3 flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'rgba(209,250,229,0.92)', color: '#065f46', border: '1px solid rgba(167,243,208,0.8)' }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Live
              </span>
            )}
          </div>

          {/* Title block */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{project.category}</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 leading-tight">{project.title}</h1>
            {project.date && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                {project.date}
              </div>
            )}
          </div>
        </motion.div>

        {/* Tab switcher — only shown when deck exists */}
        {hasDeck && (
          <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
            {(['overview', 'deck'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold capitalize transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}>
                {tab === 'deck' ? 'View Deck' : 'Overview'}
              </button>
            ))}
          </div>
        )}

        {/* Overview */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description */}
            <Section title="About" icon={<Layers className="h-4 w-4" />}>
              <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
            </Section>

            {/* Tech stack */}
            {project.techStack?.length > 0 && (
              <Section title="Tech & Tools" icon={<Tag className="h-4 w-4" />}>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t: string, i: number) => (
                    <span key={i} className="text-[11px] rounded-lg px-2.5 py-1 font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      {t}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Links / Resources */}
            {(hasDeck || links.length > 0) && (
              <Section title="Resources" icon={<ExternalLink className="h-4 w-4" />}>
                <div className="flex flex-wrap gap-2">
                  {hasDeck && (
                    <button onClick={() => setActiveTab('deck')}
                      className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-2 bg-gray-900 text-white hover:bg-gray-700 transition-colors">
                      <FileText className="h-3.5 w-3.5" />
                      View Deck
                    </button>
                  )}
                  {links.map((l: any) => (
                    <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-2 bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {l.name}
                    </a>
                  ))}
                </div>
              </Section>
            )}
          </motion.div>
        )}

        {/* Deck viewer */}
        {activeTab === 'deck' && hasDeck && (
          <motion.div
            key="deck"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl overflow-hidden border border-gray-200"
          >
            <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-xs font-medium text-gray-700">{project.sidebarTitle || project.title}</span>
              </div>
              <a href={project.embedUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-900 text-white hover:bg-gray-700 transition-colors">
                <ExternalLink className="h-3 w-3" />
                Full screen
              </a>
            </div>
            <iframe
              src={`${project.embedUrl}#toolbar=0&navpanes=0`}
              width="100%"
              className="border-0"
              style={{ height: '72vh' }}
              title={`${project.title} deck`}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-gray-400">{icon}</span>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</h2>
      </div>
      {children}
    </div>
  );
}
