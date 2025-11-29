import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion as Motion } from 'framer-motion';

export default function BuildingModal({ config, onClose, onEnter }) {
  if (!config) return null;
  const titleId = `building-modal-title-${config.id || 'default'}`;
  const descId = `building-modal-desc-${config.id || 'default'}`;

  // 🔹 UPDATED: overlay visual (deeper, nicer glow)
  const overlayStyle = {
    backgroundImage: `
      radial-gradient(900px circle at 50% 10%, rgba(255,255,255,0.08), transparent 45%),
      radial-gradient(700px circle at 12% 80%, rgba(79,70,229,0.12), transparent 50%),
      radial-gradient(700px circle at 85% 72%, rgba(56,189,248,0.10), transparent 52%),
      linear-gradient(135deg, rgba(15,23,42,0.90), rgba(15,23,42,0.88))
    `
  };

  // 🔹 UPDATED: card glassmorphism + softer shadow
  const cardStyle = {
    background: 'linear-gradient(180deg, rgba(255,255,255,0.88), rgba(248,250,252,0.92))',
    boxShadow:
      '0 26px 80px rgba(15,23,42,0.45), 0 3px 12px rgba(15,23,42,0.25)',
    borderRadius: '30px',
    backdropFilter: 'blur(26px)',
    WebkitBackdropFilter: 'blur(26px)',
    border: '1px solid rgba(255,255,255,0.55)',
    fontFamily: 'Inter, "Segoe UI", system-ui, sans-serif'
  };

  // 🔹 UPDATED: primary button gradient + glow
  const primaryButtonStyle = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #0ea5e9 100%)',
    boxShadow: '0 18px 40px rgba(37,99,235,0.55)'
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const modal = (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="building-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-transparent backdrop-blur-sm"
      style={overlayStyle}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <Motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="building-modal-card relative w-[92vw] max-w-[640px] overflow-hidden rounded-[30px] border border-slate-200/70 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.25)] sm:w-full"
        style={cardStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600" />

        <div className="relative px-6 pt-14 pb-6 text-center sm:px-16 sm:pt-16 building-modal-body">
          <Motion.div
            initial={{ scale: 0.9, opacity: 0, y: -6 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut", delay: 0.03 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-4xl shadow-xl ring-8 ring-white sm:h-24 sm:w-24"
          >
            <span className="drop-shadow-sm">{config.icon || "🏢"}</span>
          </Motion.div>

          <h2 id={titleId} className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:mt-7 sm:text-[36px]">
            {config.name}
          </h2>
          <p id={descId} className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base building-modal-desc">
            {config.description}
          </p>
        </div>

        {/* Close button */}
        <Motion.button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm hover:bg-white focus:outline-none building-modal-close"
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </Motion.button>

        <div className="relative border-t border-slate-100 bg-white px-6 py-6 sm:px-12 sm:py-8 building-modal-actions">
          <div className="grid gap-3 sm:gap-4">
            {config.canEnter ? (
              <Motion.button
                onClick={onEnter}
                className="building-modal-primary flex items-center justify-center gap-3 w-full rounded-full px-8 py-6 text-lg font-semibold text-white transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                style={primaryButtonStyle}
                whileTap={{ scale: 0.985 }}
                whileHover={{ scale: 1.01, transition: { duration: 0.12 } }}
              >
                Enter {config.name || "Building"}
              </Motion.button>
            ) : (
              <div className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-6 py-4 text-base font-semibold text-slate-400 shadow-inner">
                Locked
              </div>
            )}

            <Motion.button
              onClick={onClose}
              className="building-modal-secondary flex w-full items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-6 py-4 text-base font-semibold text-slate-700 transition duration-150 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.12, ease: "easeOut", delay: 0.02 }}
            >
              Cancel
            </Motion.button>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );

  if (typeof document !== 'undefined') return createPortal(modal, document.body);

  return modal;
}
