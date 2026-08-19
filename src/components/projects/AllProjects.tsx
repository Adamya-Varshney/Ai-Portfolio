'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getConfig } from '@/lib/config-loader';
import Image from 'next/image';

const config = getConfig();
const ALL_PROJECTS = config.projects as any[];

const TABS = [
  { id: 'product', label: 'AI Enabled Product Management', section: 'Product & Tech Projects' },
  { id: 'strategy', label: 'Business Strategy & GTM', section: 'Business Strategy & GTM Projects' },
  { id: 'case', label: 'CX & Product Management', section: 'Case Competitions' },
];

function ProjectCard({ project }: { project: any }) {
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
        {project.links?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.links.map((link: any, i: number) => (
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
        )}
      </div>
    </motion.div>
  );
}

export default function AllProjects() {
  const [activeTab, setActiveTab] = useState('product');
  const [activeProject, setActiveProject] = useState<string | null>(null);
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
      {/* Category tabs */}
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

      {/* Project name chips — horizontal scroll, above grid */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 shrink-0">
        {projects.map(project => (
          <button
            key={project.title}
            onClick={() => scrollToProject(project.title)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              activeProject === project.title
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-accent text-muted-foreground hover:text-foreground'
            }`}
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
              <ProjectCard project={project} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
