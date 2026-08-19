'use client';

import { useParams, useRouter } from 'next/navigation';
import { getConfig } from '@/lib/config-loader';
import { toSlug, fromSlug } from '@/lib/project-slug';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowLeft, ExternalLink, BookOpen, Calendar, Tag,
  CheckCircle2, Clock, Layers, ChevronRight
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
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground text-sm">Project not found.</p>
        <button onClick={() => router.back()} className="text-xs text-violet-600 underline">Go back</button>
      </div>
    );
  }

  const hasDeck = !!project.embedUrl;
  const links: { name: string; url: string }[] = project.links ?? [];

  return (
    <div className="min-h-screen w-full font-sans"
      style={{ background: 'linear-gradient(160deg, #f5f3ff 0%, #ede9fe 50%, #f5f3ff 100%)' }}>

      {/* Top nav bar */}
      <div className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{ background: 'rgba(248,246,255,0.85)', borderColor: 'rgba(124,58,237,0.12)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Projects
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground">
            <span>Projects</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium truncate max-w-[180px]">{project.sidebarTitle || project.title}</span>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-1.5">
            {links.map((l: any) => (
              <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-semibold rounded-md px-2.5 py-1 transition-opacity hover:opacity-80"
                style={{ background: 'rgba(124,58,237,0.08)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.2)' }}>
                <ExternalLink className="h-3 w-3" />
                {l.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">

        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(124,58,237,0.15)', boxShadow: '0 4px 24px rgba(124,58,237,0.08)' }}
        >
          {/* Cover image / gradient banner */}
          <div className="relative h-44 sm:h-52"
            style={{ background: 'linear-gradient(135deg, #1e1047 0%, #2d1b69 50%, #3b1f8c 100%)' }}>
            {project.images?.[0]?.src ? (
              <Image src={project.images[0].src} alt={project.title} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-violet-200 text-center px-6">{project.title}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Status + Live badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {project.isLive && (
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium backdrop-blur-sm"
                  style={{ background: 'rgba(209,250,229,0.9)', color: '#065f46', border: '1px solid rgba(167,243,208,0.8)' }}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              )}
              {project.status && (
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium backdrop-blur-sm"
                  style={{ background: 'rgba(124,58,237,0.15)', color: '#ddd6fe', border: '1px solid rgba(167,139,250,0.3)' }}>
                  {project.status}
                </span>
              )}
            </div>

            {/* Title at bottom of banner */}
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-300 mb-0.5">{project.category}</p>
              <h1 className="text-lg sm:text-xl font-bold text-white leading-tight">{project.title}</h1>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3"
            style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.04), rgba(139,92,246,0.02))', borderTop: '1px solid rgba(124,58,237,0.1)' }}>
            {project.date && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" style={{ color: '#7c3aed' }} />
                {project.date}
              </span>
            )}
            {project.techStack?.slice(0, 5).map((t: string, i: number) => (
              <span key={i} className="text-[11px] rounded-full px-2 py-0.5 font-medium"
                style={{ background: 'rgba(124,58,237,0.08)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.18)' }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tab switcher */}
        {hasDeck && (
          <div className="flex gap-1 rounded-xl p-1"
            style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.12)' }}>
            {(['overview', 'deck'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold capitalize transition-all duration-200"
                style={activeTab === tab ? {
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  color: '#fff',
                  boxShadow: '0 2px 10px rgba(124,58,237,0.3)',
                } : { color: 'var(--muted-foreground)' }}>
                {tab === 'deck' ? '📊 View Deck' : '📋 Overview'}
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
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <Section title="About this project" icon={<Layers className="h-4 w-4" />}>
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
            </Section>

            {project.techStack?.length > 0 && (
              <Section title="Tech stack" icon={<Tag className="h-4 w-4" />}>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t: string, i: number) => (
                    <span key={i} className="text-[11px] rounded-full px-2.5 py-0.5 font-medium"
                      style={{ background: 'rgba(124,58,237,0.08)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.18)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {(project.status || project.date) && (
              <Section title="Status" icon={<CheckCircle2 className="h-4 w-4" />}>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {project.status && (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-violet-500" />
                      {project.status}
                    </span>
                  )}
                  {project.date && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-violet-400" />
                      {project.date}
                    </span>
                  )}
                </div>
              </Section>
            )}

            {links.length > 0 && (
              <Section title="Resources" icon={<ExternalLink className="h-4 w-4" />}>
                <div className="flex flex-wrap gap-2">
                  {hasDeck && (
                    <button onClick={() => setActiveTab('deck')}
                      className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-2 text-white transition-opacity hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 2px 10px rgba(124,58,237,0.25)' }}>
                      <BookOpen className="h-3.5 w-3.5" />
                      View Deck
                    </button>
                  )}
                  {links.map((l: any) => (
                    <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-2 transition-colors hover:opacity-80"
                      style={{ background: 'rgba(124,58,237,0.08)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.2)' }}>
                      <ExternalLink className="h-3.5 w-3.5" />
                      {l.name}
                    </a>
                  ))}
                </div>
              </Section>
            )}
          </motion.div>
        )}

        {/* Deck tab */}
        {activeTab === 'deck' && hasDeck && (
          <motion.div
            key="deck"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(124,58,237,0.18)', boxShadow: '0 2px 16px rgba(124,58,237,0.08)' }}
          >
            <div className="flex items-center justify-between px-3 py-2"
              style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.08), rgba(139,92,246,0.06))', borderBottom: '1px solid rgba(124,58,237,0.12)' }}>
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" style={{ color: '#7c3aed' }} />
                <span className="text-xs font-medium text-foreground">{project.title} — Deck</span>
              </div>
              <a href={project.embedUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}>
                <ExternalLink className="h-3 w-3" />
                Full screen
              </a>
            </div>
            <iframe
              src={`${project.embedUrl}#toolbar=0&navpanes=0`}
              width="100%"
              className="border-0"
              style={{ height: '70vh', background: 'rgba(124,58,237,0.02)' }}
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
    <div className="rounded-xl p-4"
      style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.04), rgba(139,92,246,0.02))', border: '1px solid rgba(124,58,237,0.12)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: '#7c3aed' }}>{icon}</span>
        <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}
