'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, File, ExternalLink } from 'lucide-react';
import { resumeDetails } from '@/lib/config-loader';

export function Resume() {
  const handleDownload = () => {
    window.open(resumeDetails.downloadUrl, '_blank');
  };

  return (
    <div className="w-full py-2 font-sans flex flex-col gap-4">
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl p-5"
        style={{ background: 'linear-gradient(135deg, #0f0820 0%, #1e1047 40%, #2d1b69 100%)' }}
      >
        <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full opacity-15 blur-2xl"
          style={{ background: 'radial-gradient(circle, #ddd6fe, transparent)' }} />
        <div className="relative flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-300 mb-0.5">Resume</p>
            <h3 className="text-sm font-bold text-white">{resumeDetails.title}</h3>
            <p className="text-xs text-violet-200/70 mt-0.5">{resumeDetails.description}</p>
            <div className="flex flex-wrap gap-x-2 text-[11px] text-violet-300/60 mt-1">
              <span>{resumeDetails.fileType}</span>
              <span>•</span>
              <span>Updated {resumeDetails.lastUpdated}</span>
            </div>
          </div>
          <motion.button
            onClick={handleDownload}
            className="shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </motion.button>
        </div>
      </motion.div>

      {/* PDF Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full rounded-xl overflow-hidden border"
        style={{ borderColor: 'rgba(124,58,237,0.18)', boxShadow: '0 2px 16px rgba(124,58,237,0.08)' }}
      >
        <div className="flex items-center justify-between px-3 py-2"
          style={{ background: 'linear-gradient(145deg, rgba(124,58,237,0.08), rgba(139,92,246,0.06))', borderBottom: '1px solid rgba(124,58,237,0.12)' }}>
          <div className="flex items-center gap-2">
            <File className="h-3.5 w-3.5" style={{ color: '#7c3aed' }} />
            <span className="text-xs font-medium text-foreground">Resume Preview</span>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md text-white"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
          >
            <ExternalLink className="h-3 w-3" />
            Open Full
          </button>
        </div>

        <div className="w-full h-[420px] sm:h-[520px] md:h-[640px]"
          style={{ background: 'rgba(124,58,237,0.02)' }}>
          <iframe
            src={resumeDetails.downloadUrl}
            width="100%"
            height="100%"
            className="border-0"
            title="Resume Preview"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Resume;
