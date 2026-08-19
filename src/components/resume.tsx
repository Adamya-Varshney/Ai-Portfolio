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
    <div className="mx-auto w-full font-sans">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Resume</h2>
        <p className="text-sm text-gray-500 mt-1">Download or preview my latest resume.</p>
      </div>
      {/* Resume Card */}
      <motion.div
        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-0 transition-all duration-300 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.0, ease: 'easeOut' }}
      >
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-medium text-foreground truncate">
                {resumeDetails.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {resumeDetails.description}
              </p>
              <div className="mt-1 flex flex-wrap text-xs text-muted-foreground gap-x-2">
                <span>{resumeDetails.fileType}</span>
                <span className="hidden sm:inline">•</span>
                <span>Updated {resumeDetails.lastUpdated}</span>
                {resumeDetails.fileSize && (
                  <><span className="hidden sm:inline">•</span><span>{resumeDetails.fileSize}</span></>
                )}
              </div>
            </div>

      {/* Resume info card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl p-4 mb-4 flex items-center justify-between gap-3"
        style={{
          background: 'linear-gradient(145deg, rgba(2,132,199,0.06), rgba(14,165,233,0.04))',
          border: '1px solid rgba(2,132,199,0.18)',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center justify-center h-9 w-9 rounded-xl shrink-0"
            style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', boxShadow: '0 2px 10px rgba(2,132,199,0.35)' }}>
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
          style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', boxShadow: '0 2px 10px rgba(2,132,199,0.3)' }}
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
        style={{ border: '1px solid rgba(2,132,199,0.18)', boxShadow: '0 2px 16px rgba(2,132,199,0.08)' }}
      >
        {/* Preview bar */}
        <div className="px-3 py-2 flex items-center justify-between"
          style={{ background: 'linear-gradient(145deg, rgba(2,132,199,0.08), rgba(14,165,233,0.06))', borderBottom: '1px solid rgba(2,132,199,0.15)' }}>
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5" style={{ color: '#0284c7' }} />
            <span className="text-xs font-medium text-foreground">Resume Preview</span>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Open Full
          </button>
        </div>

        <div className="w-full h-[320px] sm:h-[400px] md:h-[480px]"
          style={{ background: 'rgba(2,132,199,0.02)' }}>
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
