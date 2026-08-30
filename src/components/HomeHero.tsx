import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const AVATARS = [
  'https://i.pravatar.cc/100?img=21',
  'https://i.pravatar.cc/100?img=32',
  'https://i.pravatar.cc/100?img=44',
];

export const HomeHero = () => {
  return (
  <>
    {/* ═══ HERO ═══════════════════════════════════════════ */}
    <section style={s.hero} className="hero-section">

      {/* Full-bleed aerial background */}
      <div style={s.imgWrap} className="hero-img-wrap">
        {/* Hero image — full quality, no zoom, no distortion */}
        <img
          src="/images/modern_suburban_home_with_solar_panels.jpg"
          alt="Modern suburban home with rooftop solar panels"
          style={s.heroImg}
          className="hero-img"
          width={1916}
          height={821}
          fetchPriority="high"
        />
        {/* Dark overlay — separate from image, never on the img element */}
        <div style={s.imgMask} className="hero-img-mask" />
        {/* Top fade for navbar readability */}
        <div style={s.imgTopFade} />
      </div>

      {/* ── Content grid ── */}
      <div style={s.content} className="hero-content">

        {/* LEFT column — text overlaid on light sky area */}
        <motion.div
          style={s.left}
          className="hero-left"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Premium Engineering badge */}
          <div style={s.badge} className="hero-badge">
            <span style={s.badgeDot}>+</span>
            <span style={s.badgeLabel}>PREMIUM</span>
            <span style={s.badgeSep}>|</span>
            <span style={s.badgePower}>⏻</span>
            <span style={s.badgeLabel}>ENGINEERING</span>
          </div>

          {/* Headline */}
          <h1 style={s.h1}>
            The <span style={s.gold}>Logical</span>{' '}
            Choice<br />for Energy<br />Independence.
          </h1>

          <p style={s.sub}>
            Logic Solar combines high-performance engineering with elegant design to deliver the most efficient energy systems in the industry.
          </p>

          {/* CTAs */}
          <div style={s.ctas}>
            <Link to="/contact" style={s.btnDark}>
              Get My Free Solar Quote <ArrowRight style={{ width: 16, height: 16, marginLeft: 6 }} />
            </Link>
            <Link to="/services/how-it-works" style={s.btnLight}>
              See How It Works
            </Link>
          </div>

          {/* Trust strip */}
          <div style={s.trust}>
            <span style={s.trustItem}><ShieldCheck style={s.trustIco} /> 25-YEAR WARRANTY</span>
            <span style={s.trustItem}><Zap style={{ ...s.trustIco, color: '#f9cd0d' }} /> $0 DOWN OPTIONS</span>
            <span style={s.trustItem}><Star style={{ ...s.trustIco, color: '#f9cd0d', fill: '#f9cd0d' }} /> 4.9/5 RATING</span>
          </div>
        </motion.div>

        {/* RIGHT column — floating data cards only */}
        <div style={s.right} className="hero-right">

          {/* Trusted by 1,000+ — upper right quadrant */}
          <motion.div
            className="trust-bubble"
            style={{ ...s.card, top: '22%', right: 32 }}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
          >
            <div style={s.avatarRow}>
              {AVATARS.map((u, i) => (
                <img key={i} src={u} referrerPolicy="no-referrer" style={{ ...s.avatar, marginLeft: i ? -8 : 0 }} alt="" />
              ))}
              <div style={s.avatarPlus}>+1k</div>
            </div>
            <p style={s.cardTitle}>Trusted by 1,000+</p>
            <p style={s.cardSub}>Modern Homeowners</p>
          </motion.div>

          {/* 40% Savings — lower right quadrant */}
          <motion.div
            className="savings-card"
            style={{ ...s.card, bottom: '18%', right: 64 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45 }}
          >
            <div style={s.savRow}>
              <div style={s.bolt}><Zap style={{ width: 14, height: 14, color: '#1b2a33' }} /></div>
              <span style={s.pct}>40%</span>
            </div>
            <p style={s.savLabel}>AVERAGE MONTHLY<br />ENERGY SAVINGS</p>
          </motion.div>

        </div>
      </div>

      {/* ═══ PREFERRED PARTNERS — pinned inside hero, above the fold ════════ */}
      <div style={s.ppBar}>
        <p style={s.ppTitleHero}>PREFERRED PARTNERS</p>
        <div className="hero-ticker-wrap">
          <PartnerTicker />
        </div>
      </div>
    </section>

    <style>{`
      @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes floatDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)}  }
      @media (max-width: 900px) { .trust-bubble { display: none !important; } }

      /* ── Desktop hero image — object-cover, no zoom, no distortion ── */
      .hero-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        display: block;
      }

      /* ── Ticker animation ─────────────────────────────── */
      @keyframes ticker-scroll {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .ticker-track {
        display: flex;
        align-items: center;
        width: max-content;
        animation: ticker-scroll 60s linear infinite;
        will-change: transform;
      }
      .ticker-item {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 250px;
        padding: 0 24px;
        flex-shrink: 0;
        /* Scales every logo's height together per breakpoint */
        --logo-scale: 1;
      }
      @media (max-width: 768px) {
        .ticker-item {
          width: 190px;
          padding: 0 18px;
          --logo-scale: 0.86;
        }
      }
      @media (max-width: 380px) {
        .ticker-item {
          width: 164px;
          padding: 0 15px;
          --logo-scale: 0.78;
        }
      }
      .ticker-wrap:hover .ticker-track {
        animation-play-state: paused;
      }
      .ticker-logo {
        filter: grayscale(100%) brightness(0.25);
        opacity: 0.85;
        transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
        cursor: default;
        /* The slot is the hard boundary: a logo may never exceed it, so the
           per-logo caps below only ever shrink it, never let it overlap a
           neighbour. Aspect ratios here span 1.6:1 to 14:1. */
        width: auto;
        height: auto;
        min-width: 0;
        max-width: min(var(--logo-max-w, 160px), 100%);
        max-height: calc(var(--logo-h, 58px) * var(--logo-scale, 1));
        object-fit: contain;
        display: block;
      }
      .ticker-logo:hover {
        filter: grayscale(0%) brightness(1);
        opacity: 1;
      }
      .ticker-text-logo {
        filter: grayscale(100%);
        opacity: 0.75;
        transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
        cursor: default;
        min-width: 0;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        font-weight: 800;
        letter-spacing: 0.04em;
        color: #0055aa;
        white-space: nowrap;
      }
      .ticker-text-logo:hover {
        filter: grayscale(0%);
        opacity: 1;
      }

      /* ── Edge fade masks ──────────────────────────────── */
      .ticker-outer {
        position: relative;
      }
      .ticker-outer::before,
      .ticker-outer::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 120px;
        z-index: 2;
        pointer-events: none;
      }
      .ticker-outer::before {
        left: 0;
        background: linear-gradient(to right, #f7f8fa 0%, transparent 100%);
      }
      .ticker-outer::after {
        right: 0;
        background: linear-gradient(to left, #f7f8fa 0%, transparent 100%);
      }
      @media (max-width: 480px) {
        .ticker-outer::before,
        .ticker-outer::after { width: 48px; }
      }

      /* ── Hero ticker overrides — logos float directly on hero image ── */
      .hero-ticker-wrap .ticker-logo {
        filter: brightness(0) invert(1);
        opacity: 0.82;
      }
      .hero-ticker-wrap .ticker-logo:hover {
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
        opacity: 1;
      }
      .hero-ticker-wrap .ticker-text-logo {
        filter: none;
        color: rgba(255,255,255,0.8);
        opacity: 1;
      }
      .hero-ticker-wrap .ticker-text-logo:hover {
        color: #fff;
        opacity: 1;
      }
      /* Edge fades — transparent to match the see-through bar */
      .hero-ticker-wrap .ticker-outer::before {
        background: linear-gradient(to right, rgba(27,42,51,0.6) 0%, transparent 100%);
      }
      .hero-ticker-wrap .ticker-outer::after {
        background: linear-gradient(to left, rgba(27,42,51,0.6) 0%, transparent 100%);
      }

      /* ── Mobile Hero Overrides ─────────────────────────── */
      @media (max-width: 768px) {
        .hero-section {
          min-height: unset !important;
          flex-direction: column !important;
          overflow: visible !important;
        }
        .hero-img-wrap {
          position: relative !important;
          width: 100% !important;
          height: 74vw !important;
          min-height: 280px !important;
          max-height: 460px !important;
          flex-shrink: 0;
        }
        .hero-img {
          object-fit: cover !important;
          object-position: 68% 55% !important;
        }
        .hero-img-mask {
          background: linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.85) 80%, #fff 100%) !important;
        }
        .hero-content {
          position: relative !important;
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          max-width: 100% !important;
          padding: 28px 24px 48px !important;
          background: #f7f8fa !important;
          z-index: 10 !important;
          margin: 0 !important;
        }
        .hero-left   { width: 100% !important; max-width: 100% !important; }
        .hero-badge  { margin-bottom: 18px !important; }
        .hero-right  { display: none !important; }
        .trust-bubble { display: none !important; }
        .savings-card { display: none !important; }
        .ticker-track { animation-duration: 45s; }
      }
    `}</style>
  </>
  );
};

/* ── Partner Ticker Data ── */
const PARTNERS: Array<{ type: 'img'; src: string; name: string; height: number; maxWidth?: number } | { type: 'text'; name: string }> = [
  { type: 'img',  src: '/images/logos/tesla-energy-certified.png', name: 'Tesla Energy Certified Installer', height: 58 },
  { type: 'img',  src: '/images/logos/franklinwh.png',   name: 'FranklinWH',           height: 48, maxWidth: 280 },
  { type: 'img',  src: '/images/logos/enphase.svg',      name: 'Enphase',              height: 58, maxWidth: 180 },
  { type: 'img',  src: '/images/logos/opensolar.svg',    name: 'OpenSolar',            height: 58 },
  { type: 'img',  src: '/images/logos/sungage.png',      name: 'Sungage Financial',    height: 58 },
  { type: 'img',  src: '/images/logos/enfin.png',        name: 'EnFin',                height: 58 },
  { type: 'img',  src: '/images/logos/aurorasolar.svg',  name: 'Aurora',               height: 58, maxWidth: 180 },
  { type: 'img',  src: '/images/logos/bbb.svg',          name: 'BBB Accredited',       height: 70 },
  { type: 'img',  src: '/images/logos/silfab.svg',       name: 'Silfab Solar',         height: 58 },
  { type: 'img',  src: '/images/logos/ironridge.svg',    name: 'IronRidge',            height: 58, maxWidth: 240 },
  { type: 'img',  src: '/images/logos/sunmodo.png',      name: 'SunModo',              height: 58 },
  { type: 'img',  src: '/images/logos/qcells.svg',       name: 'Qcells',               height: 58 },
  // Concert Finance temporarily removed — awaiting clean transparent logo
  // { type: 'img',  src: '/images/logos/concert-finance.png', name: 'Concert Finance',   height: 58 },
  { type: 'img',  src: '/images/logos/climatefirst.svg', name: 'Climate First',        height: 58, maxWidth: 180 },
];

/* ── Partner Ticker Component ── */
const PartnerTicker = () => {
  // Duplicate list to create seamless infinite loop
  const all = [...PARTNERS, ...PARTNERS];
  return (
    <div className="ticker-outer">
      <div className="ticker-wrap" style={s.tickerWrap}>
        <div className="ticker-track">
          {all.map((p, i) =>
            p.type === 'img' ? (
              <div key={i} className="ticker-item">
                <img
                  src={p.src}
                  alt={p.name}
                  className="ticker-logo"
                  loading="lazy"
                  decoding="async"
                  style={{
                    '--logo-h': `${p.height}px`,
                    '--logo-max-w': `${p.maxWidth || 160}px`,
                  } as React.CSSProperties}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fb = target.nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = 'inline';
                  }}
                />
                <span style={{ display: 'none', fontSize: 14, fontWeight: 700, color: '#666' }}>{p.name}</span>
              </div>
            ) : (
              <div key={i} className="ticker-item">
                <span className="ticker-text-logo">{p.name}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Inline styles ── */
const s: Record<string, React.CSSProperties> = {
  /* HERO */
  hero: {
    position: 'relative',
    minHeight: '100vh',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    paddingBottom: 0,
  },
  imgWrap: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0,
    width: '100%',
    height: '100%',
  },
  /* Hero image — object-cover, object-center, full quality, no zoom */
  heroImg: {
    position: 'absolute' as const,
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    objectPosition: 'center center',
    display: 'block',
  },
  /* White-left gradient overlay — photo shows fully on right, white fade on left for text readability */
  imgMask: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 22%, rgba(255,255,255,0.6) 42%, rgba(255,255,255,0.0) 62%)',
  },
  imgTopFade: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 80,
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 100%)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '5fr 4fr',
    alignItems: 'center',
    width: '100%',
    padding: '130px 48px 80px 48px',
    gap: 0,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 520,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(12px)',
    border: '1.5px solid rgba(229,229,229,0.8)',
    borderRadius: 999,
    padding: '7px 14px',
    marginBottom: 26,
    width: 'fit-content',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  badgeDot:   { color: '#f9cd0d', fontWeight: 900, fontSize: 14 },
  badgeLabel: { color: '#1b2a33', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em' },
  badgeSep:   { color: '#ccc', fontSize: 12, margin: '0 2px' },
  badgePower: { color: '#1b2a33', fontSize: 13 },
  h1: {
    /* `4vw` only clears the 2.4rem floor above ~960px, so every phone width
       rendered at a flat 38.4px and "Independence." (308px) overflowed the
       272px content box on a 320px screen. The inner min()/calc() adds a
       fluid floor that reaches 2.4rem at ~361px and only shrinks below that;
       max(4vw, …) keeps the original desktop scaling untouched. */
    fontSize: 'clamp(2rem, max(4vw, min(2.4rem, calc(12vw - 5px))), 4rem)',
    fontWeight: 900,
    lineHeight: 1.08,
    color: '#1b2a33',
    letterSpacing: '-0.025em',
    marginBottom: 20,
    overflowWrap: 'break-word',
  },
  gold: { color: '#e6b800' },
  sub: {
    fontSize: '1rem',
    color: 'rgba(27,42,51,0.7)',
    lineHeight: 1.75,
    marginBottom: 32,
    maxWidth: 420,
    fontWeight: 500,
  },
  ctas: { display: 'flex', gap: 14, marginBottom: 32, flexWrap: 'wrap' },
  btnDark: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#1b2a33',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: 999,
    fontSize: '0.875rem',
    fontWeight: 800,
    textDecoration: 'none',
    boxShadow: '0 4px 20px rgba(27,42,51,0.28)',
    transition: 'all 0.25s',
  },
  btnLight: {
    display: 'inline-flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(8px)',
    color: '#1b2a33',
    padding: '14px 24px',
    borderRadius: 999,
    fontSize: '0.875rem',
    fontWeight: 800,
    textDecoration: 'none',
    border: '1.5px solid rgba(220,220,220,0.9)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    transition: 'all 0.25s',
  },
  trust: { display: 'flex', flexWrap: 'wrap', gap: 20 },
  trustItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: '10px',
    fontWeight: 800,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: 'rgba(27,42,51,0.55)',
  },
  trustIco: { width: 15, height: 15, color: '#16a34a' },

  /* RIGHT column — floating cards */
  right: { position: 'relative', minHeight: 480, overflow: 'visible' },
  card: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.90)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.75)',
    borderRadius: 18,
    padding: '14px 18px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06)',
  },
  avatarRow: { display: 'flex', marginBottom: 8 },
  avatar: { width: 36, height: 36, borderRadius: '50%', border: '2px solid #fff', objectFit: 'cover' as const },
  avatarPlus: {
    width: 36, height: 36,
    borderRadius: '50%',
    background: '#f9cd0d',
    border: '2px solid #fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 9, fontWeight: 900, color: '#1b2a33',
    marginLeft: -8,
  },
  cardTitle: { fontSize: 13, fontWeight: 800, color: '#1b2a33', margin: '0 0 2px' },
  cardSub:   { fontSize: 11, fontWeight: 600, color: 'rgba(27,42,51,0.5)', margin: 0 },
  savRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 },
  bolt: {
    width: 32, height: 32, borderRadius: 8,
    background: '#f9cd0d',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  pct:      { fontSize: '2.2rem', fontWeight: 900, color: '#1b2a33', letterSpacing: '-0.03em', lineHeight: 1 },
  savLabel: { fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(27,42,51,0.45)', lineHeight: 1.7, margin: 0 },

  /* PARTNERS TICKER BAR — transparent, floats over the hero image */
  ppBar: {
    position: 'relative' as const,
    zIndex: 10,
    width: '100%',
    background: 'linear-gradient(to bottom, transparent 0%, rgba(27,42,51,0.45) 100%)',
    padding: '20px 0 28px',
    overflow: 'hidden',
  },
  ppTitleHero: {
    textAlign: 'center' as const,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: '0.36em',
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 18,
    textTransform: 'uppercase' as const,
  },
  tickerWrap: {
    overflow: 'hidden',
    width: '100%',
  },
};
