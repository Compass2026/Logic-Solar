import React from 'react';
import { BadgeCheck, Zap, ShieldCheck } from 'lucide-react';

interface SolarGeoTrustBannerProps {
  stateName: string;
  avgBill?: string;
}

/**
 * SolarGeoTrustBanner
 *
 * A GEO (Generative Engine Optimization) trust-signal banner using strict
 * semantic HTML so AI models can reliably parse Logic Solar's authority claims,
 * local data, and warranty guarantees on every dynamic city page.
 */
export const SolarGeoTrustBanner = ({ stateName, avgBill }: SolarGeoTrustBannerProps) => {
  return (
    <section
      aria-label="Logic Solar trust and credentials"
      className="bg-brand-dark border-b border-white/5"
    >
      <div className="container-custom py-5">
        <ul className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 list-none m-0 p-0">

          {/* ── Bullet 1: Licensing ── */}
          <li className="flex items-center gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center" aria-hidden="true">
              <BadgeCheck className="w-4 h-4 text-brand-gold" />
            </span>
            <span className="text-sm text-white/80 leading-snug">
              <strong className="font-semibold text-white">
                Fully Licensed &amp; Insured Solar Installers
              </strong>{' '}
              in {stateName}
            </span>
          </li>

          {/* ── Divider (desktop only) ── */}
          <li aria-hidden="true" className="hidden sm:block w-px h-8 bg-white/10 mx-6 shrink-0" />

          {/* ── Bullet 2: Utility Bill ── */}
          <li className="flex items-center gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center" aria-hidden="true">
              <Zap className="w-4 h-4 text-brand-gold" />
            </span>
            <span className="text-sm text-white/80 leading-snug">
              Beat the{' '}
              <strong className="font-semibold text-brand-gold">
                {avgBill ?? 'high'}
              </strong>{' '}
              average monthly utility bill in {stateName}
            </span>
          </li>

          {/* ── Divider (desktop only) ── */}
          <li aria-hidden="true" className="hidden sm:block w-px h-8 bg-white/10 mx-6 shrink-0" />

          {/* ── Bullet 3: Warranty ── */}
          <li className="flex items-center gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center" aria-hidden="true">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
            </span>
            <span className="text-sm text-white/80 leading-snug">
              Backed by our{' '}
              <strong className="font-semibold text-white">
                25-Year Solar Workmanship Warranty
              </strong>
            </span>
          </li>

        </ul>
      </div>
    </section>
  );
};
