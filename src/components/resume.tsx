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
    <div className="mx-auto w-full py-6 font-sans">
      {/* Resume Card */}
      <motion.div
        className="group relative overflow-hidden rounded-xl bg-accent p-0 transition-all duration-300 mb-4"
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

            <motion.button
              onClick={handleDownload}
              className="flex shrink-0 h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black text-white hover:bg-black/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Download PDF"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* PDF Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full rounded-xl overflow-hidden border bg-white shadow-lg"
      >
        <div className="bg-gray-100 px-3 sm:px-4 py-2 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Resume Preview</span>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Open Full
          </button>
        </div>

        <div className="w-full h-[420px] sm:h-[520px] md:h-[640px] bg-gray-50">
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
