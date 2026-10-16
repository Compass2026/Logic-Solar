/// <reference types="vite/client" />
import React from 'react';
import type { Block, HeroImage, Inline } from '../../content/compass-blog';
import { heroVariants, HERO_SIZES, ILLUSTRATIVE_CAPTION, linkAttrs } from '../../content/compass-blog-core.js';

// Renders the approved Markdown blocks as React elements: text is always
// text (no raw HTML), and only https links become anchors.
const InlineNodes = ({ nodes }: { nodes: Inline[] }) => (
  <>
    {nodes.map((n, i) => {
      if (n.t === 'link') {
        const a = linkAttrs(n.href) as { target?: string; rel?: string };
        return <a key={i} href={n.href} target={a.target} rel={a.rel} className="font-semibold text-brand-teal underline decoration-brand-gold decoration-2 underline-offset-4 hover:text-brand-dark">{n.v}</a>;
      }
      if (n.t === 'strong') return <strong key={i} className="font-bold text-brand-dark">{n.v}</strong>;
      if (n.t === 'em') return <em key={i}>{n.v}</em>;
      return <React.Fragment key={i}>{n.v}</React.Fragment>;
    })}
  </>
);

// (tsconfig is not strict, so the Block union is narrowed by hand.)
const inlineOf = (b: Block): Inline[] => ('inline' in b ? b.inline : []);

export const ArticleBody = ({ blocks }: { blocks: Block[] }) => (
  <div className="space-y-6 text-[17px] leading-relaxed text-brand-dark/80">
    {blocks.map((b, i) => {
      if (b.t === 'ul' || b.t === 'ol') {
        const List = b.t;
        return (
          <List key={i} className={`space-y-2 pl-6 ${b.t === 'ul' ? 'list-disc marker:text-brand-gold' : 'list-decimal marker:font-bold marker:text-brand-teal'}`}>
            {b.items.map((item, j) => <li key={j} className="pl-1"><InlineNodes nodes={item} /></li>)}
          </List>
        );
      }
      if (b.t === 'h2') return <h2 key={i} className="pt-6 text-2xl font-bold tracking-tight text-brand-dark md:text-3xl"><InlineNodes nodes={inlineOf(b)} /></h2>;
      if (b.t === 'h3') return <h3 key={i} className="pt-2 text-xl font-bold text-brand-dark"><InlineNodes nodes={inlineOf(b)} /></h3>;
      return <p key={i}><InlineNodes nodes={inlineOf(b)} /></p>;
    })}
  </div>
);

// The hero: the original file plus build-time WebP variants (production
// builds only; the dev server serves the original).
export const ArticleHero = ({ hero, eager = true, className = '' }: { hero: HeroImage; eager?: boolean; className?: string }) => {
  const variants = import.meta.env.PROD ? heroVariants(hero) : [];
  return (
    <figure className={`compass-hero ${className}`}>
      <picture>
        {variants.length > 0 && (
          <source type="image/webp" srcSet={variants.map((v) => `${v.src} ${v.width}w`).join(', ')} sizes={HERO_SIZES} />
        )}
        <img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height}
          className="h-auto w-full rounded-2xl bg-brand-dark/5 object-cover shadow-xl"
          {...(eager ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })} decoding="async" />
      </picture>
      {hero.illustrative && <figcaption className="mt-2 text-xs uppercase tracking-widest text-brand-dark/50">{ILLUSTRATIVE_CAPTION}</figcaption>}
    </figure>
  );
};
