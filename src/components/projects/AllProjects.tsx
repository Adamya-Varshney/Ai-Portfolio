'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import { toSlug } from '@/lib/project-slug';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const config = getConfig();
const ALL_PROJECTS = config.projects as any[];

const TABS = [
  { id: 'product', label: 'AI Enabled Product Management', section: 'Product & Tech Projects' },
  { id: 'strategy', label: 'Business Strategy & GTM', section: 'Business Strategy & GTM Projects' },
  // { id: 'bi', label: 'Business Intelligence & Data Analytics', section: 'Business Intelligence & Data Analytics' },
  { id: 'case', label: 'CX & Product Management', section: 'Case Competitions' },
];

// Color classification for project sidebar tabs
const AI_APPS = new Set(['Growmatic', 'Xcurson', 'Pocket']);
const AGENTIC_WORKFLOWS = new Set(['SAM: AI Chatbot with RAG', 'Niyam (AI Fitness Coach)']);

function getTabStyle(title: string, isActive: boolean) {
  if (AI_APPS.has(title)) {
    return isActive
      ? 'bg-violet-700 text-white shadow-sm'
      : 'bg-violet-700/80 text-white hover:bg-violet-700';
  }
  if (AGENTIC_WORKFLOWS.has(title)) {
    return isActive
      ? 'bg-green-700 text-white shadow-sm'
      : 'bg-green-700/80 text-white hover:bg-green-700';
  }
  // Default: turquoise
  return isActive
    ? 'bg-teal-700 text-white shadow-sm'
    : 'bg-teal-700/80 text-white hover:bg-teal-700';
}

function PdfViewer({ url, pageCount, title, links }: { url: string; pageCount?: number; title: string; links?: any[] }) {
  const [page, setPage] = useState(1);
  const [available, setAvailable] = useState<boolean | null>(null);
  const total = pageCount ?? 0;
  const src = total > 0 ? `${url}#page=${page}` : url;

  useEffect(() => {
    setAvailable(null);
    setPage(1);
    fetch(url, { method: 'HEAD' })
      .then(r => setAvailable(r.ok))
      .catch(() => setAvailable(false));
  }, [url]);

  const toolbar = (
    <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/60 shrink-0">
      <div className="flex flex-wrap gap-1.5">
        {links?.map((link: any, i: number) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md border border-primary/30 bg-background px-2.5 py-1 text-xs font-semibold text-primary shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            {link.name}
          </a>
        ))}
      </div>
      {available && (
        <div className="flex items-center gap-1 ml-auto">
          {total > 0 && (
            <>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded p-1 hover:bg-background disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs text-muted-foreground min-w-[44px] text-center tabular-nums">{page} / {total}</span>
              <button
                onClick={() => setPage(p => Math.min(total, p + 1))}
                disabled={page === total}
                className="rounded p-1 hover:bg-background disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open full screen"
            className="rounded p-1 hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </div>
  );

  // Still checking
  if (available === null) {
    return (
      <div className="flex flex-col w-full sm:w-3/5 sm:shrink-0 bg-muted min-h-[260px] sm:min-h-0">
        {toolbar}
        <div className="flex flex-1 items-center justify-center">
          <span className="text-xs text-muted-foreground animate-pulse">Loading…</span>
        </div>
      </div>
    );
  }

  // File doesn't exist
  if (!available) {
    return (
      <div className="flex flex-col w-full sm:w-3/5 sm:shrink-0 bg-muted min-h-[260px] sm:min-h-0">
        {toolbar}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="text-3xl">📄</span>
          <p className="text-sm font-medium text-foreground">Deck not yet uploaded</p>
          <p className="text-xs text-muted-foreground max-w-[200px]">Use the link above to view the full presentation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full sm:w-3/5 sm:shrink-0 bg-muted min-h-[260px] sm:min-h-0">
      {toolbar}
      <div className="relative flex-1 min-h-0">
        <iframe
          key={src}
          src={src}
          className="w-full h-full border-0"
          title={title}
          allowFullScreen
        />
      </div>
    </div>
  );
}

function ProjectDetail({ project, navigable }: { project: any; navigable?: boolean }) {
  const router = useRouter();
  const hasEmbed = !!project.embedUrl;
  const hasImage = !hasEmbed && !!project.images?.[0]?.src;
  const hasMedia = hasEmbed || hasImage;
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-xl border bg-accent overflow-hidden h-auto sm:h-full"
    >
      <div className={`flex h-auto sm:h-full ${hasMedia ? 'flex-col sm:flex-row' : 'flex-col'} gap-0`}>
        {hasEmbed && (
          <PdfViewer
            url={project.embedUrl}
            pageCount={project.pageCount}
            title={project.title}
            links={project.links}
          />
        )}
        {hasImage && (
          <div className="flex flex-col w-full sm:w-3/5 sm:shrink-0 bg-muted min-h-[200px] sm:min-h-0">
            {/* Links bar above image */}
            {project.links?.length > 0 && (
              <div className="flex flex-wrap gap-2 px-3 py-2.5 border-b bg-muted/60">
                {project.links.map((link: any, i: number) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-primary/30 bg-background px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {link.name}
                  </a>
                ))}
              </div>
            )}
            <div className="relative flex-1 min-h-0 min-h-[160px]">
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt || project.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
        <div className={`${hasMedia ? 'w-full sm:w-2/5 sm:shrink-0' : 'w-full'} p-4 sm:p-5 space-y-3 sm:overflow-y-auto`}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs text-muted-foreground font-medium">{project.category}</span>
              <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug mt-0.5">{project.title}</h3>
            </div>
            {project.isLive ? (
              <span className="shrink-0 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </span>
                Live
              </span>
            ) : (
              <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${
                project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-violet-100 text-violet-700'
              }`}>{project.status}</span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{project.description}</p>

          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {project.techStack.map((t: string, i: number) => (
                <span key={i} className="text-xs bg-background border rounded-full px-2 sm:px-2.5 py-0.5 text-foreground">{t}</span>
              ))}
            </div>
          )}

          {project.workflowImages?.length > 0 && (
            <div className="space-y-3 pt-1">
              {project.workflowImages.map((wf: any, i: number) => (
                <div key={i} className="space-y-1">
                  <span className="text-xs font-semibold text-foreground">{wf.label}</span>
                  <div className="rounded-lg overflow-hidden border bg-muted">
                    <Image
                      src={wf.src}
                      alt={wf.label}
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigate to full project page */}
          {navigable && (
            <button
              onClick={() => router.push(`/projects/${toSlug(project.title)}`)}
              className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-2 text-white w-full justify-center transition-opacity hover:opacity-90 mt-1"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 2px 8px rgba(124,58,237,0.25)' }}
            >
              View Full Project →
            </button>
          )}

          {/* Links for projects without a preview image or embed */}
          {!hasMedia && project.links?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {project.links.map((link: any, i: number) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md border border-primary/30 bg-background px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AllProjects() {
  const [activeTab, setActiveTab] = useState('product');

  const activeSection = TABS.find(t => t.id === activeTab)!.section;
  const projects = ALL_PROJECTS.filter(p => (p.section ?? 'Product & Tech Projects') === activeSection);

  const [activeProject, setActiveProject] = useState<string>(projects[0]?.title ?? '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const section = TABS.find(t => t.id === tabId)!.section;
    const tabProjects = ALL_PROJECTS.filter(p => (p.section ?? 'Product & Tech Projects') === section);
    setActiveProject(tabProjects[0]?.title ?? '');
  };

  const currentProject = projects.find(p => p.title === activeProject) ?? projects[0];

  return (
    <div className="w-full py-2 flex flex-col gap-3 sm:gap-4 lg:h-[calc(100vh-150px)]">
      {/* Section tabs — horizontally scrollable on small screens */}
      <div className="flex gap-1.5 rounded-xl bg-accent p-1 shrink-0 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 min-w-max rounded-lg px-2 sm:px-3 py-2 text-xs font-medium transition-all duration-200 leading-tight whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content area: stacked on mobile, side-by-side on sm+ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 flex-1 min-h-0"
        >
          {/* Project list — horizontal scroll row on mobile, vertical sidebar on sm+ */}
          <div className="flex sm:flex-col gap-1.5 overflow-x-auto sm:overflow-y-auto sm:overflow-x-hidden shrink-0 sm:w-36 lg:w-44 pb-1 sm:pb-0">
            {projects.map(project => (
              <button
                key={project.title}
                onClick={() => setActiveProject(project.title)}
                className={`shrink-0 sm:w-full text-left rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-200 leading-snug ${getTabStyle(project.title, activeProject === project.title)}`}
              >
                {project.sidebarTitle || project.title}
              </button>
            ))}
          </div>

          {/* Right panel — selected project detail */}
          <div className="flex-1 min-w-0 min-h-0">
            <AnimatePresence mode="wait">
              {currentProject && <ProjectDetail key={currentProject.title} project={currentProject} navigable={activeTab === 'product'} />}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
