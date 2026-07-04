'use client';
import { useState } from 'react';
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

function ProjectDetail({ project }: { project: any }) {
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-xl border bg-accent overflow-hidden"
    >
      {project.images?.[0]?.src && (
        <div className="relative w-full bg-muted">
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt || project.title}
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
      )}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-xs text-muted-foreground font-medium">{project.category}</span>
            <h3 className="text-sm sm:text-base font-semibold text-foreground leading-snug mt-0.5">{project.title}</h3>
          </div>
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${
            project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
          }`}>{project.status}</span>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{project.description}</p>

        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {project.techStack.map((t: string, i: number) => (
              <span key={i} className="text-xs bg-background border rounded-full px-2 sm:px-2.5 py-0.5 text-foreground">{t}</span>
            ))}
          </div>
        )}

        {project.links?.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
            {project.links.map((link: any, i: number) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
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

  const activeSection = TABS.find(t => t.id === activeTab)!.section;
  const projects = ALL_PROJECTS.filter(p => (p.section ?? 'Product & Tech Projects') === activeSection);

  const [activeProject, setActiveProject] = useState<string>(projects[0]?.title ?? '');

  // Reset active project when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const section = TABS.find(t => t.id === tabId)!.section;
    const tabProjects = ALL_PROJECTS.filter(p => (p.section ?? 'Product & Tech Projects') === section);
    setActiveProject(tabProjects[0]?.title ?? '');
  };

  const currentProject = projects.find(p => p.title === activeProject) ?? projects[0];

  return (
    <div className="w-full py-4 sm:py-6 space-y-3 sm:space-y-4">
      {/* Section tabs */}
      <div className="flex gap-1.5 rounded-xl bg-accent p-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 rounded-lg px-2 sm:px-3 py-2 text-xs font-medium transition-all duration-200 leading-tight ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Two-column layout: project list sidebar + detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex gap-3"
        >
          {/* Left sidebar — project name tabs */}
          <div className="w-36 sm:w-44 shrink-0 flex flex-col gap-1 rounded-xl bg-accent p-1.5">
            {projects.map(project => (
              <button
                key={project.title}
                onClick={() => setActiveProject(project.title)}
                className={`w-full text-left rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-200 leading-snug ${
                  activeProject === project.title
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>

          {/* Right panel — selected project detail */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {currentProject && <ProjectDetail key={currentProject.title} project={currentProject} />}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
