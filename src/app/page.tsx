'use client';

import { Suspense } from 'react';
import SiteNav from '@/components/SiteNav';
import Presentation from '@/components/presentation';
import AllProjects from '@/components/projects/AllProjects';
import Skills from '@/components/skills';
import Education from '@/components/Education';
import { Resume } from '@/components/resume';
import { Contact } from '@/components/contact';
import ChatFloat from '@/components/chat/chat-float';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SiteNav />

      {/* Me */}
      <section id="me" className="w-full px-6 sm:px-12 py-14 sm:py-20">
        <Presentation />
      </section>

      {/* Projects */}
      <section id="projects" style={{ background: '#f8fafc' }} className="py-14 sm:py-20">
        <div className="w-full px-6 sm:px-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <p className="text-sm text-gray-500 mt-1">A selection of things I've built and shipped.</p>
          </div>
          <AllProjects />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="w-full px-6 sm:px-12 py-14 sm:py-20">
        <Skills />
      </section>

      {/* Education */}
      <section id="education" style={{ background: '#f8fafc' }} className="py-14 sm:py-20">
        <div className="w-full px-6 sm:px-12">
          <Education />
        </div>
      </section>

      {/* Resume */}
      <section id="resume" className="w-full px-6 sm:px-12 py-14 sm:py-20">
        <Resume />
      </section>

      {/* Contact */}
      <section id="contact" style={{ background: '#0f172a' }} className="py-14 sm:py-20">
        <div className="w-full px-6 sm:px-12">
          <Contact />
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        className="py-6 text-center">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          © 2025 Adamya Varshney · Built with Next.js
        </p>
      </footer>

      {/* Floating AI chat */}
      <ChatFloat />
    </div>
  );
}
