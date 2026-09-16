'use client';

import { useParams, useRouter } from 'next/navigation';
import { getConfig } from '@/lib/config-loader';
import { fromSlug } from '@/lib/project-slug';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowLeft, ExternalLink, Calendar, Tag,
  Layers, ChevronRight, FileText, Target, Lightbulb
} from 'lucide-react';

const config = getConfig();
const ALL_PROJECTS: any[] = config.projects as any[];

const SECTION_COLOR: Record<string, string> = {
  'Product & Tech Projects': '#2563eb',
  'Business Strategy & GTM Projects': '#dc2626',
  'Case Competitions': '#16a34a',
};

const SECTION_BG: Record<string, string> = {
  'Product & Tech Projects': '#eff6ff',
  'Business Strategy & GTM Projects': '#fef2f2',
  'Case Competitions': '#f0fdf4',
};

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const project = fromSlug(slug, ALL_PROJECTS);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-white">
        <p className="text-gray-400 text-sm">Project not found.</p>
        <button onClick={() => router.back()} className="text-xs text-gray-600 underline">Go back</button>
      </div>
    );
  }

  const accent = SECTION_COLOR[project.section ?? 'Product & Tech Projects'] ?? '#2563eb';
  const accentBg = SECTION_BG[project.section ?? 'Product & Tech Projects'] ?? '#eff6ff';
  const hasDeck = !!project.embedUrl;
  const links: { name: string; url: string }[] = project.links ?? [];

  return (
    <div className="min-h-screen w-full font-sans bg-gray-50">

      {/* Sticky nav */}
      <div className="sticky top-0 z-40 bg-white/95 border-b border-gray-200 backdrop-blur-sm">
        <div className="w-full px-6 sm:px-10 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
            <span className="font-medium">Projects</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-gray-700 font-semibold truncate">{project.sidebarTitle || project.title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {links.map((l: any) => (
              l.name === 'Deck' && hasDeck ? (
                <button key={l.name}
                  onClick={() => document.getElementById('project-deck')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 transition-colors"
                  style={{ background: accentBg, color: accent }}>
                  <FileText className="h-3.5 w-3.5" />
                  {l.name}
                </button>
              ) : (
                <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 transition-colors"
                  style={{ background: accentBg, color: accent }}>
                  <ExternalLink className="h-3.5 w-3.5" />
                  {l.name}
                </a>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Full-width hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full relative"
      >
        <div className={`w-full relative overflow-hidden ${project.imageFit === 'contain' ? 'aspect-[21/7] bg-white' : 'h-64 sm:h-80 md:h-96 bg-gray-900'}`}>
          {project.images?.[0]?.src ? (
            <Image
              src={project.images[0].src}
              alt={project.title}
              fill
              className={project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${accentBg} 0%, #f9fafb 100%)` }}>
              <span className="text-2xl font-bold text-center px-8"
                style={{ color: accent, opacity: 0.25 }}>{project.title}</span>
            </div>
          )}
          {project.imageFit !== 'contain' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          )}
          {project.isLive && (
            <span className="absolute top-4 left-4 flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold shadow-sm"
              style={{ background: 'rgba(209,250,229,0.95)', color: '#065f46', border: '1px solid rgba(167,243,208,0.8)' }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          )}
        </div>
      </motion.div>

      {/* Page body */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-10 py-10">

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full"
            style={{ background: accentBg, color: accent }}>
            {project.category ?? project.section}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
            {project.title}
          </h1>
          {project.date && (
            <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
              <Calendar className="h-4 w-4" />
              {project.date}
            </div>
          )}
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Main content — left */}
          <div className="flex-1 min-w-0 space-y-7">

            {/* Objective */}
            {project.objective && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.15 }}>
                <SectionCard title="Objective" icon={<Target className="h-5 w-5" />} accent={accent} accentBg={accentBg}>
                  <p className="text-base text-gray-800 leading-relaxed font-medium">{project.objective}</p>
                </SectionCard>
              </motion.div>
            )}

            {/* Key Insights */}
            {project.keyInsights?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.2 }}>
                <SectionCard title="Key Insights" icon={<Lightbulb className="h-5 w-5" />} accent={accent} accentBg={accentBg}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.keyInsights.map((insight: any, i: number) => (
                      <div key={i}
                        className="flex items-start gap-3.5 rounded-xl p-4 border transition-shadow hover:shadow-sm"
                        style={{ borderColor: `${accent}22`, background: `${accentBg}88` }}>
                        <span className="text-2xl shrink-0 mt-0.5">{insight.icon}</span>
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-1">{insight.label}</p>
                          <p className="text-sm text-gray-600 leading-relaxed">{insight.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </motion.div>
            )}

            {/* About */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.25 }}>
              <SectionCard title="About" icon={<Layers className="h-5 w-5" />} accent={accent} accentBg={accentBg}>
                <p className="text-base text-gray-700 leading-relaxed">{project.description}</p>
              </SectionCard>
            </motion.div>

          </div>

          {/* Sidebar — right */}
          <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-5">

            {/* Tech & Tools */}
            {project.techStack?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.3 }}>
                <SidebarCard title="Tech & Tools" icon={<Tag className="h-4.5 w-4.5" />} accent={accent} accentBg={accentBg}>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((t: string, i: number) => (
                      <span key={i}
                        className="text-xs rounded-lg px-3 py-1.5 font-semibold border"
                        style={{ background: accentBg, color: accent, borderColor: `${accent}33` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </SidebarCard>
              </motion.div>
            )}

            {/* Links */}
            {links.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.35 }}>
                <SidebarCard title="Links" icon={<ExternalLink className="h-4.5 w-4.5" />} accent={accent} accentBg={accentBg}>
                  <div className="flex flex-col gap-2">
                    {links.map((l: any) => (
                      l.name === 'Deck' && hasDeck ? (
                        <button key={l.name}
                          onClick={() => document.getElementById('project-deck')?.scrollIntoView({ behavior: 'smooth' })}
                          className="flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2.5 text-left w-full transition-all hover:brightness-95"
                          style={{ background: accent, color: '#fff' }}>
                          <FileText className="h-4 w-4 shrink-0" />
                          {l.name}
                        </button>
                      ) : (
                        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2.5 border transition-all hover:shadow-sm"
                          style={{ borderColor: `${accent}44`, color: accent, background: accentBg }}>
                          <ExternalLink className="h-4 w-4 shrink-0" />
                          {l.name}
                        </a>
                      )
                    ))}
                  </div>
                </SidebarCard>
              </motion.div>
            )}

          </div>
        </div>

        {/* Deck — full width below columns */}
        {hasDeck && (
          <motion.div id="project-deck" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.4 }} className="mt-8">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200"
                style={{ background: accentBg }}>
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4.5 w-4.5" style={{ color: accent }} />
                  <span className="text-sm font-bold" style={{ color: accent }}>Project Deck</span>
                </div>
                <a href={project.embedUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg text-white transition-colors hover:brightness-90"
                  style={{ background: accent }}>
                  <ExternalLink className="h-3.5 w-3.5" />
                  Full screen
                </a>
              </div>
              <iframe
                src={`${project.embedUrl}#toolbar=0&navpanes=0`}
                width="100%"
                className="border-0 bg-white"
                style={{ height: '72vh' }}
                title={`${project.title} deck`}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function SectionCard({ title, icon, accent, accentBg, children }: {
  title: string; icon: React.ReactNode; accent: string; accentBg: string; children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100"
        style={{ borderLeftWidth: 4, borderLeftColor: accent, borderLeftStyle: 'solid' }}>
        <span style={{ color: accent }}>{icon}</span>
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700">{title}</h2>
      </div>
      <div className="px-6 py-5">
        {children}
      </div>
    </div>
  );
}

function SidebarCard({ title, icon, accent, accentBg, children }: {
  title: string; icon: React.ReactNode; accent: string; accentBg: string; children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-100"
        style={{ borderLeftWidth: 4, borderLeftColor: accent, borderLeftStyle: 'solid' }}>
        <span style={{ color: accent }}>{icon}</span>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">{title}</h3>
      </div>
      <div className="px-5 py-4">
        {children}
      </div>
    </div>
  );
}
