'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, File, ExternalLink, AlertCircle } from 'lucide-react';
import { resumeDetails } from '@/lib/config-loader';

function getPreviewUrl(url: string): string {
  const idMatch = url.match(/[?&]id=([^&]+)/) || url.match(/\/d\/([^/?]+)/);
  if (idMatch) {
    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
  }
  return url;
}

function getViewUrl(url: string): string {
  const idMatch = url.match(/[?&]id=([^&]+)/) || url.match(/\/d\/([^/?]+)/);
  if (idMatch) {
    return `https://drive.google.com/file/d/${idMatch[1]}/view`;
  }
  return url;
}

export function Resume() {
  const [iframeError, setIframeError] = useState(false);

  const downloadUrl = resumeDetails.downloadUrl;
  const previewUrl = downloadUrl ? getPreviewUrl(downloadUrl) : '';
  const viewUrl = downloadUrl ? getViewUrl(downloadUrl) : '';

  const handleDownload = () => {
    window.open(downloadUrl, '_blank');
  };

  const handleOpenFull = () => {
    window.open(viewUrl, '_blank');
  };

  return (
    <div className="mx-auto w-full py-8 font-sans">
      {/* Resume Card */}
      <motion.div
        className="group relative overflow-hidden rounded-xl bg-accent p-0 transition-all duration-300 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.0, ease: 'easeOut' }}
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-foreground">
                {resumeDetails.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {resumeDetails.description}
              </p>
              <div className="mt-1 flex text-xs text-muted-foreground">
                <span>{resumeDetails.fileType}</span>
                {resumeDetails.lastUpdated && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Updated {resumeDetails.lastUpdated}</span>
                  </>
                )}
              </div>
            </div>

            <motion.button
              onClick={handleDownload}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-black/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
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
        <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Resume Preview</span>
          </div>
          <button
            onClick={handleOpenFull}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Open Full
          </button>
        </div>

        {iframeError || !previewUrl ? (
          <div className="w-full h-64 flex flex-col items-center justify-center gap-4 bg-gray-50 p-8 text-center">
            <AlertCircle className="h-10 w-10 text-gray-400" />
            <p className="text-sm text-gray-600">
              Inline preview unavailable. Click below to view your resume.
            </p>
            <button
              onClick={handleOpenFull}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              View Resume on Google Drive
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        ) : (
          <div className="w-full h-[600px] bg-gray-50">
            <iframe
              src={previewUrl}
              width="100%"
              height="100%"
              className="border-0"
              title="Resume Preview"
              allow="autoplay"
              onError={() => setIframeError(true)}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Resume;
