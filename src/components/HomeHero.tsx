import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, ShieldCheck, Star, DollarSign } from 'lucide-react';
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

      {/* House image — right side, bleeds full height */}
      <div style={s.imgWrap} className="hero-img-wrap">
        <div className="hero-img" style={s.heroBg} />
        <div style={s.imgMask} className="hero-img-mask" />
      </div>

      {/* ── Content ── */}
      <div style={s.content} className="hero-content">

        {/* LEFT column */}
        <motion.div
          style={s.left}
          className="hero-left"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div style={s.badge} className="hero-badge">
            <span style={s.badgeDot}>+</span>
            <span style={s.badgeLabel}>PREMIUM</span>
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

        {/* RIGHT column */}
        <div style={s.right} className="hero-right">

          {/* Trust card — contained within right column, no overflow */}
          <motion.div
            className="trust-bubble"
            style={{ ...s.card, position: 'absolute', top: '40%', right: 40, transform: 'translateY(-50%)', zIndex: 20 }}
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

          {/* Savings card */}
          <motion.div
            className="savings-card"
            style={{ ...s.card, bottom: 80, left: '5%' }}
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
    </section>

    {/* ═══ PREFERRED PARTNERS — Infinite Ticker ═══════════ */}
    <section style={s.pp}>
      <p style={s.ppTitle}>PREFERRED PARTNERS</p>
      <PartnerTicker />
    </section>

    <style>{`
      @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes floatDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)}  }
      @media (max-width: 900px) { .trust-bubble { display: none !important; } }

      /* ── Desktop hero image — full bleed, centered vertically ── */
      .hero-img {
        position: absolute;
        inset: 0;
        background-image: url('/images/hero-chatgpt-may15.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: right 38%;
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
      .ticker-wrap:hover .ticker-track {
        animation-play-state: paused;
      }
      .ticker-logo {
        filter: grayscale(100%);
        opacity: 0.55;
        transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
        cursor: default;
        flex-shrink: 0;
      }
      .ticker-logo:hover {
        filter: grayscale(0%);
        opacity: 1;
      }
      .ticker-text-logo {
        filter: grayscale(100%);
        opacity: 0.45;
        transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
        cursor: default;
        flex-shrink: 0;
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
        /* Mobile: switch to full-cover crop, pinned to top to show panels */
        .hero-img {
          background-size: cover !important;
          background-position: center top !important;
        }
        .hero-img-mask {
          background:
            linear-gradient(to bottom,
              rgba(247,248,250,0.3) 0%,
              transparent 15%,
              transparent 78%,
              rgba(247,248,250,0.85) 92%,
              #f7f8fa 100%
            ),
            linear-gradient(to right,
              rgba(247,248,250,0.3) 0%,
              transparent 30%
            ) !important;
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
const PARTNERS: Array<{ type: 'img'; src: string; name: string; height: number } | { type: 'text'; name: string }> = [
  { type: 'img',  src: '/images/logos/tesla-word.png',   name: 'Tesla Powerwall',      height: 50 },
  { type: 'img',  src: '/images/logos/franklinwh.png',   name: 'FranklinWH',           height: 36 },
  { type: 'img',  src: '/images/logos/enphase.svg',      name: 'Enphase',              height: 52 },
  { type: 'img',  src: '/images/logos/opensolar.svg',    name: 'OpenSolar',            height: 48 },
  { type: 'img',  src: '/images/logos/sungage.png',      name: 'Sungage Financial',    height: 52 },
  { type: 'img',  src: '/images/logos/enfin.jpg',        name: 'EnFin',                height: 48 },
  { type: 'img',  src: '/images/logos/aurorasolar.svg',  name: 'Aurora',               height: 48 },
  { type: 'img',  src: '/images/logos/bbb.svg',          name: 'BBB Accredited',       height: 64 },
  { type: 'img',  src: '/images/logos/silfab.svg',       name: 'Silfab Solar',         height: 50 },
  { type: 'img',  src: '/images/logos/ironridge.svg',    name: 'IronRidge',            height: 46 },
  { type: 'img',  src: '/images/logos/sunmodo.jpg',      name: 'SunModo',              height: 52 },
  { type: 'img',  src: '/images/logos/qcells.svg',       name: 'Qcells',               height: 46 },
  { type: 'img',  src: '/images/logos/concert-finance.png', name: 'Concert Finance', height: 48 },
  { type: 'img',  src: '/images/logos/climatefirst.svg', name: 'Climate First',        height: 54 },
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
              <div key={i} style={s.tickerItem}>
                <img
                  src={p.src}
                  alt={p.name}
                  className="ticker-logo"
                  style={{ height: p.height, width: 'auto', maxWidth: 160, display: 'block' }}
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
              <div key={i} style={s.tickerItem}>
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
    background: '#f7f8fa',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    paddingBottom: 0,
  },
  imgWrap: {
    position: 'absolute',
    top: 0, right: 0,
    width: '100%',
    height: '100vh',
  },
  heroBg: {
    position: 'absolute' as const,
    inset: 0,
  },
  imgMask: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(247,248,250,0.75) 0%, rgba(247,248,250,0.2) 8%, transparent 16%), linear-gradient(to right, #f7f8fa 0%, rgba(247,248,250,0.95) 12%, rgba(247,248,250,0.3) 28%, transparent 46%)',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '5fr 4fr',
    alignItems: 'center',
    width: '100%',
    padding: '130px 48px 90px 28px',
    gap: 0,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: '#fff',
    border: '1.5px solid #e5e5e5',
    borderRadius: 999,
    padding: '7px 14px',
    marginBottom: 26,
    width: 'fit-content',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  badgeDot: { color: '#f9cd0d', fontWeight: 900, fontSize: 14 },
  badgeLabel: { color: '#1b2a33', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em' },
  badgePower: { color: '#1b2a33', fontSize: 13 },
  h1: {
    fontSize: 'clamp(2.4rem, 4vw, 4rem)',
    fontWeight: 900,
    lineHeight: 1.08,
    color: '#1b2a33',
    letterSpacing: '-0.025em',
    marginBottom: 20,
  },
  gold: { color: '#f9cd0d' },
  sub: {
    fontSize: '1rem',
    color: 'rgba(27,42,51,0.6)',
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
    boxShadow: '0 4px 20px rgba(27,42,51,0.25)',
    transition: 'all 0.25s',
  },
  btnLight: {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#fff',
    color: '#1b2a33',
    padding: '14px 24px',
    borderRadius: 999,
    fontSize: '0.875rem',
    fontWeight: 800,
    textDecoration: 'none',
    border: '1.5px solid #ddd',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
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
  trustIco: { width: 15, height: 15, color: '#34d399' },
  right: { position: 'relative', minHeight: 480, overflow: 'visible' },
  card: {
    position: 'absolute',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.8)',
    borderRadius: 18,
    padding: '14px 18px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  },
  avatarRow: { display: 'flex', marginBottom: 8 },
  avatar: { width: 36, height: 36, borderRadius: '50%', border: '2px solid #fff', objectFit: 'cover' },
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
  cardSub: { fontSize: 11, fontWeight: 600, color: 'rgba(27,42,51,0.5)', margin: 0 },
  savRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 },
  bolt: {
    width: 32, height: 32, borderRadius: 8,
    background: '#f9cd0d',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  pct: { fontSize: '2.2rem', fontWeight: 900, color: '#1b2a33', letterSpacing: '-0.03em', lineHeight: 1 },
  savLabel: { fontSize: 9, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(27,42,51,0.45)', lineHeight: 1.7, margin: 0 },

  /* PARTNERS TICKER */
  pp: {
    background: '#f7f8fa',
    padding: '60px 0 68px',
    overflow: 'hidden',
  },
  ppTitle: {
    textAlign: 'center' as const,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: '0.36em',
    color: '#aab4bb',
    marginBottom: 36,
    textTransform: 'uppercase' as const,
  },
  tickerWrap: {
    overflow: 'hidden',
    width: '100%',
  },
  tickerItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 56px',
    flexShrink: 0,
  },
};
