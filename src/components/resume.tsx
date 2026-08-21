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

      {/* Info card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-gray-200 bg-white p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex items-center justify-center h-9 w-9 rounded-lg bg-gray-100 shrink-0">
            <FileText className="h-4 w-4 text-gray-600" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{resumeDetails.title}</h3>
            <p className="text-xs text-gray-500">{resumeDetails.description}</p>
            <div className="mt-0.5 flex flex-wrap text-[11px] text-gray-400 gap-x-2">
              <span>{resumeDetails.fileType}</span>
              <span>•</span>
              <span>Updated {resumeDetails.lastUpdated}</span>
              {resumeDetails.fileSize && (<><span>•</span><span>{resumeDetails.fileSize}</span></>)}
            </div>
          </div>
        </div>
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-colors self-start sm:self-auto"
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
        className="w-full rounded-xl overflow-hidden border border-gray-200"
      >
        <div className="px-3 py-2 flex items-center justify-between bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-700">Resume Preview</span>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Open Full
          </button>
        </div>
        <div className="w-full h-[320px] sm:h-[480px] md:h-[600px] bg-gray-50">
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
