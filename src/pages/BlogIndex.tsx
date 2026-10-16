import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ArticleHero } from '../components/blog/ArticleBody';
import { BLOG_POSTS } from '../content/compass-blog';
import { formatDate } from '../content/compass-blog-core.js';
import { BLOG_INDEX_PATH, blogPath, canonicalFor } from '../routing';

export const BLOG_TITLE = 'Solar Insights | Logic Solar';
export const BLOG_DESCRIPTION = 'Practical guidance from Logic Solar on planning a solar installation, battery backup and getting the most from a design consultation.';

export const BlogIndex = () => (
  <div className="bg-white">
    <SEO title={BLOG_TITLE} description={BLOG_DESCRIPTION} canonicalUrl={canonicalFor(BLOG_INDEX_PATH)} noindex={BLOG_POSTS.some((p) => p.preview)} />
    <header className="bg-brand-dark pb-16 pt-36 text-white md:pt-44">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Logic Solar</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Solar insights</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">{BLOG_DESCRIPTION}</p>
      </div>
    </header>
    <div className="mx-auto max-w-6xl px-6 py-16">
      {BLOG_POSTS.length === 0 ? (
        <p className="text-brand-dark/60">New articles are on the way.</p>
      ) : (
        <ul className="grid gap-10 md:grid-cols-2">
          {BLOG_POSTS.map((p) => (
            <li key={p.slug} className="group">
              <Link to={blogPath(p.slug)} className="block">
                {p.heroImage && <ArticleHero hero={p.heroImage} eager={false} />}
                <p className="mt-5 text-sm text-brand-dark/50"><time dateTime={p.datePublished}>{formatDate(p.datePublished)}</time> · {p.readMinutes} min read</p>
                <h2 className="mt-2 text-2xl font-bold text-brand-dark group-hover:text-brand-teal">{p.title}</h2>
                <p className="mt-3 text-brand-dark/70">{p.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-teal">Read the article <ArrowRight className="h-4 w-4" /></span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
