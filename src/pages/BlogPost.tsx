import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ArticleBody, ArticleHero } from '../components/blog/ArticleBody';
import { findArticle } from '../content/compass-blog';
import { formatDate, TLDR_LABEL } from '../content/compass-blog-core.js';
import { BLOG_INDEX_PATH, blogPath, canonicalFor, SITE_URL } from '../routing';

// One approved Compass article. The prerendered HTML (scripts/prerender.js)
// carries the same H1, TL;DR, body, hero and release marker for crawlers and for
// the CRM's live verification; this is what a visitor's browser renders.
export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = findArticle(slug);
  if (!article) return <Navigate to={BLOG_INDEX_PATH} replace />;
  const canonical = canonicalFor(blogPath(article.slug));
  return (
    <article data-compass-release={article.compass.release_hash} className="bg-white">
      <SEO title={article.metaTitle} description={article.description} canonicalUrl={canonical} ogUrl={canonical}
        ogType="article" ogImage={article.heroImage ? `${SITE_URL}${article.heroImage.src}` : undefined}
        noindex={article.preview} />
      {article.preview && (
        <p role="note" className="fixed bottom-4 left-4 z-[70] max-w-xs rounded-lg bg-brand-gold px-4 py-2 text-xs font-bold text-brand-dark shadow-lg">
          Preview fixture: this article is in review and has not been approved or published.
        </p>
      )}
      <header className="bg-brand-dark pb-16 pt-36 text-white md:pb-24 md:pt-44">
        <div className="mx-auto max-w-4xl px-6">
          <Link to={BLOG_INDEX_PATH} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Solar insights
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{article.h1}</h1>
          <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /><time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time></span>
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{article.readMinutes} min read</span>
          </p>
          {article.tldr && (
            <aside aria-label={TLDR_LABEL} data-compass-tldr className="mt-8 rounded-xl border-l-4 border-brand-gold bg-white/10 px-5 py-4 md:px-6 md:py-5">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">{TLDR_LABEL}</p>
              <p className="mt-2 text-base leading-relaxed text-white md:text-lg">{article.tldr}</p>
            </aside>
          )}
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-6">
        {article.heroImage && <ArticleHero hero={article.heroImage} className="-mt-10 md:-mt-14" />}
        <div className="mx-auto max-w-3xl py-12 md:py-16">
          <ArticleBody blocks={article.blocks} />
          <div className="mt-12 rounded-2xl bg-brand-dark p-8 text-white md:p-10">
            <p className="text-xl font-bold">Ready to talk through your home?</p>
            {article.cta.url
              ? <a href={article.cta.url} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 font-bold text-brand-dark transition hover:bg-brand-gold-bright">{article.cta.text} <ArrowRight className="h-4 w-4" /></a>
              : <p className="mt-4 font-semibold text-brand-gold">{article.cta.text}</p>}
          </div>
        </div>
      </div>
    </article>
  );
};
