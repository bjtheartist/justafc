import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowRight, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'justafc-welcome-v1';
const SHOW_DELAY_MS = 1400;

/**
 * First-visit welcome card. Shows once per browser (localStorage), leads with
 * the two actions that matter — Schedule a Tour and Refer a Patient — using
 * the site's existing approved copy. Dismissible via X, backdrop, or Escape.
 */
export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    let timer;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
      }
    } catch {
      // Storage unavailable (private browsing) — skip the popup rather than nag every visit.
    }
    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    try { localStorage.setItem(STORAGE_KEY, 'seen'); } catch { /* non-fatal */ }
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, dismiss]);

  // Portaled to <body>: ancestors in the page use framer-motion transforms,
  // which create stacking contexts that would trap the modal's z-index.
  if (!open) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes jafc-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes jafc-rise { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
      {(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ animation: 'jafc-fade 0.3s ease-out both' }}
        >
          <div
            className="absolute inset-0 bg-forest/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-heading"
            className="relative w-full max-w-lg bg-cream border border-sage/30 shadow-2xl p-8 sm:p-10"
            style={{ animation: 'jafc-rise 0.35s ease-out 0.05s both' }}
          >
            <button
              ref={closeButtonRef}
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 text-sage hover:text-forest transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 bg-white border border-sage/30 px-3 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-widest text-forest">Spaces Available</span>
            </div>

            <h2 id="welcome-heading" className="font-serif text-3xl sm:text-4xl text-forest leading-tight mb-3">
              A place to truly <em className="italic">call home</em>.
            </h2>
            <p className="text-sage text-base sm:text-lg mb-8">
              Providing exceptional adult foster care in a warm, family-like environment. We would love to show you around.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={createPageUrl('Contact')} onClick={dismiss} className="flex-1">
                <Button className="bg-forest hover:bg-forest/90 text-white text-sm font-bold uppercase tracking-widest px-6 py-6 rounded-none w-full transition-all group">
                  Schedule a Tour
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl('Referrals')} onClick={dismiss} className="flex-1">
                <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-white text-sm font-bold uppercase tracking-widest px-6 py-6 rounded-none w-full transition-all">
                  Refer a Patient
                </Button>
              </Link>
            </div>

            <a
              href="tel:+15174021891"
              className="mt-6 flex items-center justify-center gap-2 text-sage hover:text-forest text-sm transition-colors"
            >
              <Phone className="w-4 h-4" /> (517) 402-1891
            </a>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
