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
];

function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-xl border bg-accent overflow-hidden"
    >
      {project.images?.[0]?.src && (
        <div className="relative w-full h-44 bg-muted">
          <Image
            src={project.images[0].src}
            alt={project.images[0].alt || project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs text-muted-foreground font-medium">{project.category}</span>
            <h3 className="text-base font-semibold text-foreground leading-snug">{project.title}</h3>
          </div>
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full ${
            project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
          }`}>{project.status}</span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((t: string, i: number) => (
              <span key={i} className="text-xs bg-background border rounded-full px-2.5 py-0.5 text-foreground">{t}</span>
            ))}
          </div>
        )}

        {project.links?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
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

  return (
    <div className="w-full py-6 space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 rounded-xl bg-accent p-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-4"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
