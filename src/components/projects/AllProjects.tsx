'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, BookOpen, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import Image from 'next/image';

const config = getConfig();
const ALL_PROJECTS = config.projects as any[];

const TABS = [
  { id: 'product', label: 'AI Enabled Product Management', section: 'Product & Tech Projects' },
  { id: 'strategy', label: 'Business Strategy & GTM', section: 'Business Strategy & GTM Projects' },
  { id: 'case', label: 'CX & Product Management', section: 'Case Competitions' },
];

function DeckModal({ project, onClose }: { project: any; onClose: () => void }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(project.pageCount ?? null);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    fetch(project.embedUrl, { method: 'HEAD' })
      .then(r => setAvailable(r.ok))
      .catch(() => setAvailable(false));
  }, [project.embedUrl]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const isPdf = project.embedUrl?.toLowerCase().endsWith('.pdf');
  const iframeUrl = isPdf && totalPages
    ? `${project.embedUrl}#page=${page}&toolbar=0&navpanes=0`
    : `${project.embedUrl}#toolbar=0&navpanes=0`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-4xl bg-background rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: '90vh' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <BookOpen className="h-4 w-4 text-indigo-500 shrink-0" />
              <span className="text-sm font-semibold text-foreground truncate">{project.title}</span>
              {totalPages && (
                <span className="text-xs text-muted-foreground shrink-0">— Page {page} of {totalPages}</span>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <a
                href={project.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-accent transition-colors"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Full screen</span>
              </a>
              <button
                onClick={onClose}
                className="flex items-center justify-center h-7 w-7 rounded-full hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* PDF area */}
          <div className="flex-1 min-h-0 bg-muted/30">
            {available === null && (
              <div className="h-full flex items-center justify-center">
                <div className="h-5 w-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
              </div>
            )}
            {available === false && (
              <div className="h-full flex flex-col items-center justify-center gap-3 p-8 text-center">
                <span className="text-2xl">📄</span>
                <p className="text-sm text-muted-foreground">Deck not yet uploaded.</p>
                {project.links?.find((l: any) => l.name === 'Deck') && (
                  <a
                    href={project.links.find((l: any) => l.name === 'Deck').url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 border border-indigo-300 rounded-md px-3 py-1.5 hover:bg-indigo-50 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" /> Open in Drive
                  </a>
                )}
              </div>
            )}
            {available === true && (
              <iframe
                src={iframeUrl}
                className="w-full h-full"
                style={{ minHeight: '60vh' }}
                title={project.title}
              />
            )}
          </div>

          {/* Page controls */}
          {available === true && isPdf && totalPages && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 px-4 py-2.5 border-t shrink-0">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center justify-center h-7 w-7 rounded-full hover:bg-accent disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-muted-foreground w-20 text-center">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center justify-center h-7 w-7 rounded-full hover:bg-accent disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, onViewDeck }: { project: any; onViewDeck: (p: any) => void }) {
  const hasImage = !!project.images?.[0]?.src;
  const shortDesc = project.description?.length > 130
    ? project.description.slice(0, 130).trimEnd() + '…'
    : project.description;
  const tags = (project.techStack ?? []).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border bg-background overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
    >
      {/* Cover image */}
      <div className="relative h-44 sm:h-48 shrink-0 bg-gradient-to-br from-indigo-100 via-violet-50 to-purple-100 dark:from-indigo-950 dark:via-violet-950 dark:to-purple-950">
        {hasImage ? (
          <Image
            src={project.images[0].src}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <span className="text-sm font-semibold text-indigo-400/50 text-center leading-snug">{project.title}</span>
          </div>
        )}
        {/* Live badge */}
        {project.isLive && (
          <span className="absolute top-2 right-2 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-700 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </span>
            Live
          </span>
        )}
        {/* View Deck overlay button */}
        {project.embedUrl && (
          <button
            onClick={() => onViewDeck(project)}
            className="absolute inset-0 flex items-end justify-start p-3 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-t from-black/50 to-transparent"
          >
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg px-3 py-1.5 shadow-lg">
              <BookOpen className="h-3.5 w-3.5" />
              View Deck
            </span>
          </button>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <div>
          <span className="text-xs text-muted-foreground font-medium">{project.category}</span>
          <h3 className="text-sm font-semibold text-foreground mt-0.5 leading-snug">{project.title}</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{shortDesc}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto pt-1">
            {tags.map((t: string, i: number) => (
              <span key={i} className="text-xs bg-accent border rounded-full px-2 py-0.5 text-foreground">{t}</span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.embedUrl && (
            <button
              onClick={() => onViewDeck(project)}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-600 border border-indigo-300 rounded-md px-2.5 py-1 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
            >
              <BookOpen className="h-3 w-3" />
              View Deck
            </button>
          )}
          {project.links?.map((link: any, i: number) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-primary border border-primary/30 rounded-md px-2.5 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function AllProjects() {
  const [activeTab, setActiveTab] = useState('product');
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [deckProject, setDeckProject] = useState<any | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const gridRef = useRef<HTMLDivElement>(null);

  const activeSection = TABS.find(t => t.id === activeTab)!.section;
  const projects = ALL_PROJECTS.filter(p => (p.section ?? 'Product & Tech Projects') === activeSection);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setActiveProject(null);
  };

  const scrollToProject = (title: string) => {
    setActiveProject(title);
    const el = cardRefs.current[title];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="w-full py-2 flex flex-col gap-3 sm:gap-4">
      {/* Deck modal */}
      {deckProject && (
        <DeckModal project={deckProject} onClose={() => setDeckProject(null)} />
      )}

      {/* Category tabs */}
      <div className="flex gap-1 rounded-xl bg-accent/60 p-1 shrink-0 overflow-x-auto scrollbar-none">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative flex-1 min-w-max rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 leading-tight whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-white shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            style={activeTab === tab.id ? {
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
              boxShadow: '0 2px 12px rgba(139, 92, 246, 0.4)',
            } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project name chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 shrink-0 scrollbar-none">
        {projects.map(project => (
          <button
            key={project.title}
            onClick={() => scrollToProject(project.title)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              activeProject === project.title
                ? 'text-white shadow-md'
                : 'bg-accent/70 text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
            style={activeProject === project.title ? {
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 60%, #a855f7 100%)',
              boxShadow: '0 1px 8px rgba(139, 92, 246, 0.35)',
            } : {}}
          >
            {project.sidebarTitle || project.title}
          </button>
        ))}
      </div>

      {/* 2-column project grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          ref={gridRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {projects.map(project => (
            <div
              key={project.title}
              ref={el => { cardRefs.current[project.title] = el; }}
            >
              <ProjectCard project={project} onViewDeck={setDeckProject} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
