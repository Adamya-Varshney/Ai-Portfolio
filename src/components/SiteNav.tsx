'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const NAV_ITEMS = [
  { id: 'me', label: 'Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function SiteNav() {
  const [active, setActive] = useState('me');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,1)',
        borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="w-full px-6 sm:px-12 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => scrollTo('me')}
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
            <Image src="/profile.png" alt="Adamya" width={32} height={32} className="object-cover object-[center_top_-5%]" />
          </div>
          <span className="text-sm font-semibold text-gray-900 hidden sm:block">Adamya Varshney</span>
        </button>

        {/* Nav links */}
<<<<<<< HEAD
        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
=======
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
>>>>>>> e6c50da (Make nav tabs larger and more prominent)
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
<<<<<<< HEAD
              className="shrink-0 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150"
=======
              className="shrink-0 px-4 py-2 text-sm rounded-lg transition-all duration-150"
>>>>>>> e6c50da (Make nav tabs larger and more prominent)
              style={{
                color: active === item.id ? '#111827' : '#9ca3af',
                background: active === item.id ? '#f3f4f6' : 'transparent',
                fontWeight: active === item.id ? 600 : 500,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Open to work */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full shrink-0"
          style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
          </span>
          Open to work
        </div>
      </div>
    </nav>
  );
}
