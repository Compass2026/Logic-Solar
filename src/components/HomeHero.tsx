import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, ShieldCheck, Star, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const AVATARS = [
  'https://i.pravatar.cc/100?img=21',
  'https://i.pravatar.cc/100?img=32',
  'https://i.pravatar.cc/100?img=44',
];

export const HomeHero = () => (
  <>
    {/* ═══ HERO ═══════════════════════════════════════════ */}
    <section style={s.hero}>

      {/* House image — right side, bleeds full height */}
      <div style={s.imgWrap}>
        <img src="/images/hero-chatgpt-may15.png" alt="Logic Solar home" style={s.img} />
        {/* White gradient mask bleeding from left */}
        <div style={s.imgMask} />
      </div>

      {/* ── Content ── */}
      <div style={s.content}>

        {/* LEFT column */}
        <motion.div
          style={s.left}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div style={s.badge}>
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
        <div style={s.right}>

          {/* Trust card — contained within right column, no overflow */}
          <motion.div
            className="trust-bubble"
            style={{ ...s.card, position: 'absolute', top: '40%', right: 16, transform: 'translateY(-50%)', zIndex: 20 }}
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

    {/* ═══ PREFERRED PARTNERS ═════════════════════════════ */}
    <section style={s.pp}>
      <div style={s.ppInner}>
        <motion.p
          style={s.ppTitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          PREFERRED PARTNERS
        </motion.p>

        {/* Row 1 */}
        <div style={s.logoRow}>
          <ImgLogo src="/images/logos/tesla-word.svg" name="Tesla Powerwall" style={{ height: 100, width: 'auto' }} />
          <ImgLogo src="/images/logos/franklinwh.png" name="Franklin WH" />
          <ImgLogo src="/images/logos/enphase.svg" name="Enphase" />
          <ImgLogo src="/images/logos/opensolar.svg" name="OpenSolar" style={{ height: 44 }} />
          <ImgLogo src="/images/logos/sungage.png" name="Sungage Financial" />
          <ImgLogo src="/images/logos/enfin.jpg" name="Enfin Solar" style={{ height: 40 }} />
          <ImgLogo src="/images/logos/aurorasolar.svg" name="Aurora Solar" style={{ height: 44 }} />
          <ImgLogo src="/images/logos/bbb.svg" name="BBB" style={{ height: 56 }} />
          <ImgLogo src="/images/logos/silfab.svg" name="Silfab Solar" />
        </div>

        {/* Row 2 */}
        <div style={{ ...s.logoRow, justifyContent: 'center' }}>
          <ImgLogo src="/images/logos/ironridge.svg" name="IronRidge" style={{ height: 40 }} />
          <ImgLogo src="/images/logos/sunmodo.jpg" name="Sunmodo" />
          <ImgLogo src="/images/logos/qcells.svg" name="Qcells" style={{ height: 38 }} />
          <TextLogo name="Concert Technologies" color="#0066cc" />
          <ImgLogo src="/images/logos/climatefirst.svg" name="Climate First Bank" style={{ height: 48 }} />
        </div>
      </div>
    </section>

    <style>{`
      @keyframes floatUp   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes floatDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)}  }
      .logo-pill:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important; }
      @media (max-width: 900px) { .trust-bubble { display: none !important; } }
    `}</style>
  </>
);

/* ── Helpers ── */
const ImgLogo = ({ src, name, style }: { src: string; name: string; style?: React.CSSProperties }) => (
  <div style={s.logoPill} className="logo-pill">
    <img
      src={src}
      alt={name}
      style={{ ...s.logoImg, ...(style?.height ? { height: style.height, width: 'auto', maxWidth: 180 } : style) }}
      onError={(e) => {
        const target = e.currentTarget;
        target.style.display = 'none';
        const fallback = target.nextElementSibling as HTMLElement | null;
        if (fallback) fallback.style.display = 'block';
      }}
    />
    <span style={s.logoFallback}>{name}</span>
  </div>
);
const TextLogo = ({ name, color, italic }: { name: string; color: string; italic?: boolean }) => (
  <div style={s.logoPill} className="logo-pill">
    <span style={{ fontSize: 16, fontWeight: 700, color, fontStyle: italic ? 'italic' : 'normal', letterSpacing: '0.02em' }}>{name}</span>
  </div>
);

/* ── Inline styles ── */
const s: Record<string, React.CSSProperties> = {
  /* HERO */
  hero: {
    position: 'relative',
    minHeight: '100vh',
    background: '#f7f8fa',
    display: 'flex',
    flexDirection: 'column',
  },
  imgWrap: {
    position: 'absolute',
    top: 0, right: 0,
    width: '82%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
  },
  imgMask: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(247,248,250,0.75) 0%, rgba(247,248,250,0.2) 8%, transparent 16%), linear-gradient(to right, #f7f8fa 0%, rgba(247,248,250,0.9) 8%, rgba(247,248,250,0.2) 22%, transparent 38%)',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '5fr 4fr',
    alignItems: 'center',
    width: '100%',
    padding: '130px 40px 90px 56px',
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
  right: { position: 'relative', minHeight: 480 },
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

  /* PARTNERS */
  pp: {
    background: '#fff',
    borderTop: '1px solid #efefef',
    padding: '72px 48px 80px',
  },
  ppInner: { maxWidth: 1320, margin: '0 auto' },
  ppTitle: {
    textAlign: 'center' as const,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: '0.36em',
    color: '#aab4bb',
    marginBottom: 48,
    textTransform: 'uppercase' as const,
  },
  logoRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 16,
  },
  logoPill: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '18px 32px',
    borderRadius: 16,
    border: '1.5px solid #e8e8e8',
    background: '#fff',
    minWidth: 140,
    minHeight: 110,
    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
    transition: 'box-shadow 0.22s ease, transform 0.22s ease',
    cursor: 'default' as const,
  },
  logoImg: {
    height: 52,
    width: 'auto',
    maxWidth: 180,
    objectFit: 'contain' as const,
    filter: 'grayscale(10%)',
    display: 'block',
  },
  logoFallback: {
    display: 'none',
    fontSize: 15,
    fontWeight: 700,
    color: '#444',
    letterSpacing: '0.03em',
  },
};
