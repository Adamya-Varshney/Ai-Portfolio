'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { resumeDetails } from '@/lib/config-loader';

export function Resume() {
  const handleDownload = () => {
    window.open(resumeDetails.downloadUrl, '_blank');
  };

  return (
    <div className="mx-auto w-full py-2 font-sans">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold"
          style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Resume
        </h2>
      </div>

      {/* Resume info card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl p-4 mb-4 flex items-center justify-between gap-3"
        style={{
          background: 'linear-gradient(145deg, rgba(30,64,175,0.06), rgba(37,99,235,0.04))',
          border: '1px solid rgba(30,64,175,0.18)',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center justify-center h-9 w-9 rounded-xl shrink-0"
            style={{ background: 'linear-gradient(135deg, #1e40af, #1d4ed8)', boxShadow: '0 2px 10px rgba(30,64,175,0.35)' }}>
            <FileText className="h-4 w-4 text-white" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">{resumeDetails.title}</h3>
            <p className="text-xs text-muted-foreground">{resumeDetails.description}</p>
            <div className="mt-0.5 flex flex-wrap text-[11px] text-muted-foreground gap-x-2">
              <span>{resumeDetails.fileType}</span>
              <span>•</span>
              <span>Updated {resumeDetails.lastUpdated}</span>
              {resumeDetails.fileSize && (<><span>•</span><span>{resumeDetails.fileSize}</span></>)}
            </div>
          </div>
        </div>
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #1e40af, #1d4ed8)', boxShadow: '0 2px 10px rgba(30,64,175,0.3)' }}
          title="Download PDF"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </motion.button>
      </motion.div>

      {/* PDF Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(30,64,175,0.18)', boxShadow: '0 2px 16px rgba(30,64,175,0.08)' }}
      >
        {/* Preview bar */}
        <div className="px-3 py-2 flex items-center justify-between"
          style={{ background: 'linear-gradient(145deg, rgba(30,64,175,0.08), rgba(37,99,235,0.06))', borderBottom: '1px solid rgba(30,64,175,0.15)' }}>
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5" style={{ color: '#1e40af' }} />
            <span className="text-xs font-medium text-foreground">Resume Preview</span>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #1e40af, #1d4ed8)' }}
          >
            <ExternalLink className="h-3 w-3" />
            Open Full
          </button>
        </div>

        <div className="w-full h-[320px] sm:h-[400px] md:h-[480px]"
          style={{ background: 'rgba(30,64,175,0.02)' }}>
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
