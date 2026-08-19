'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Send } from 'lucide-react';
import { contactInfo, getConfig } from '@/lib/config-loader';

export function Contact() {
  const bookACallUrl = (getConfig().personal as any).bookACall as string | undefined;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="mx-auto mt-8 w-full">
      <div className="w-full overflow-hidden rounded-3xl px-6 py-10 font-sans sm:px-10 md:px-16 md:py-14"
        style={{ background: 'linear-gradient(135deg, #0f0820 0%, #1e1047 40%, #2d1b69 100%)' }}>

        {/* Hero */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border border-background/20 px-3 py-1 text-xs font-medium text-background/60 mb-4">Contact</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-background leading-tight mb-3">
            Let's build something.
          </h2>
          <p className="text-sm sm:text-base text-background/60 max-w-sm mx-auto">
            Hiring for AI or 0→1 product? I'd love to hear from you. I reply to every thoughtful note.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3 mb-10">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="flex-1 rounded-xl border border-background/20 bg-background/10 px-4 py-3 text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-background/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 rounded-xl border border-background/20 bg-background/10 px-4 py-3 text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-background/50 transition-colors"
            />
          </div>
          <textarea
            placeholder="What are you building, or what would you like to ask?"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full rounded-xl border border-background/20 bg-background/10 px-4 py-3 text-sm text-background placeholder:text-background/40 focus:outline-none focus:border-background/50 transition-colors resize-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-xl bg-background text-foreground px-6 py-3 text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
          >
            {sent ? (
              <>Opening mail client…</>
            ) : (
              <><Send className="h-4 w-4" /> Send message</>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {contactInfo.socials.map((social) => (
                <button
                  key={social.name}
                  onClick={() => openLink(social.url)}
                  title={social.name}
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-background/20 text-background/70 hover:text-background hover:border-background/50 transition-colors"
                >
                  {social.name === 'LinkedIn' && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {social.name === 'GitHub' && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                  )}
                  {social.name === 'Kaggle' && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.334"/>
                    </svg>
                  )}
                  {social.url.startsWith('tel:') && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Book a call + email */}
            <div className="flex flex-col sm:items-end gap-2">
              <span className="text-xs text-background/50">{contactInfo.handle}</span>
              <span className="text-xs text-background/50">{contactInfo.email}</span>
              {bookACallUrl && (
                <button
                  onClick={() => openLink(bookACallUrl)}
                  className="flex items-center gap-1.5 rounded-lg border border-background/20 px-3 py-1.5 text-xs font-semibold text-background/80 hover:border-background/50 hover:text-background transition-colors"
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                  Book a call
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;
