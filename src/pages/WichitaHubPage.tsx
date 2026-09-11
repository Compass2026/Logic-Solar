import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Sun,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { TrustStrip } from '../components/TrustStrip';
// Copy comes from ../data/wichitaHub.js — the same module the prerender
// script uses — so meta, body text, and FAQPage schema match the raw HTML.
import { WICHITA_HUB, WICHITA_HUB_PHONE } from '../data/wichitaHub';

const HUB_BASE = '/locations/kansas/wichita';

export const WichitaHubPage: React.FC = () => {
  const { sub } = useParams<{ sub: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const page = sub ? WICHITA_HUB[sub as keyof typeof WICHITA_HUB] : undefined;
  if (!page) return <Navigate to={HUB_BASE} replace />;

  const canonicalUrl = `https://www.logic-solar.com${HUB_BASE}/${sub}`;
  const siblings = Object.entries(WICHITA_HUB).filter(([slug]) => slug !== sub);

  const schema: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.logic-solar.com/' },
        { '@type': 'ListItem', position: 2, name: 'Kansas', item: 'https://www.logic-solar.com/locations/kansas' },
        { '@type': 'ListItem', position: 3, name: 'Wichita', item: `https://www.logic-solar.com${HUB_BASE}` },
        { '@type': 'ListItem', position: 4, name: page.crumb },
      ],
    },
  ];
  if (page.faqs.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });
  }

  return (
    <>
      <SEO
        title={page.title}
        description={page.description}
        canonicalUrl={canonicalUrl}
        ogImage="https://www.logic-solar.com/images/kansas-hero.jpg"
        schema={schema}
      />

      {/* Breadcrumbs */}
      <nav className="bg-brand-dark border-b border-white/10 py-3 text-sm text-white/70 relative z-10" aria-label="Breadcrumb">
        <div className="container-custom flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
          <Link to="/locations/kansas" className="hover:text-brand-gold transition-colors">Kansas</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
          <Link to={HUB_BASE} className="hover:text-brand-gold transition-colors">Wichita</Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
          <span className="text-brand-gold font-medium" aria-current="page">{page.crumb}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-brand-dark pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/kansas-hero.jpg"
            alt={`${page.crumb} by Logic Solar in Wichita, Kansas`}
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/70" />
        </div>
        <div className="container-custom relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-extrabold uppercase tracking-wider mb-6">
            <MapPin className="w-3.5 h-3.5" />
            <span>Wichita & South-Central Kansas</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">
            {page.h1}
          </h1>
          {page.intro.map((paragraph, i) => (
            <p key={i} className="text-lg text-white/80 leading-relaxed mb-5 max-w-3xl">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
            <Link
              to="/contact"
              className="btn-gold text-center py-4 px-8 text-base font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>Get My Free Solar Estimate</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:3166697219"
              className="bg-white/10 hover:bg-white/20 text-white text-center py-4 px-8 text-base font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-brand-gold" />
              <span>Call {WICHITA_HUB_PHONE}</span>
            </a>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Features */}
      {page.features.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8">
              {page.features.map((feature, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6">
                    <Sun className="w-6 h-6 text-brand-gold" />
                  </div>
                  <h2 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h2>
                  <p className="text-slate-600 leading-relaxed text-sm">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects (projects page only) */}
      {'projects' in page && page.projects && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8">
              {page.projects.map((project) => (
                <div key={project.id} className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img
                      src={project.image}
                      alt={`${project.type} project in ${project.city}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-brand-dark/90 text-brand-gold text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {project.city}
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h2 className="text-xl font-bold text-brand-dark mb-2">{project.type}</h2>
                    <p className="text-xs text-slate-500 font-medium mb-4">{project.summary}</p>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500">System Size:</span>
                        <span className="font-bold text-brand-dark">{project.systemSize}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500">Panels:</span>
                        <span className="font-semibold">{project.panels}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-1">
                        <span className="text-slate-500">Battery:</span>
                        <span className="font-semibold">{project.battery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Utility:</span>
                        <span className="font-semibold">{project.utility}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs.length > 0 && (
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight mb-10 text-center">
              {page.crumb} Questions, Answered
            </h2>
            <div className="space-y-4">
              {page.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-brand-dark text-base sm:text-lg leading-snug">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-brand-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-200/60 mt-2">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Wichita pages */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-extrabold text-brand-dark tracking-tight mb-8 text-center">
            More Wichita Solar Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              to={HUB_BASE}
              className="flex items-center gap-3 p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-brand-gold/50 hover:bg-white transition-all font-bold text-brand-dark text-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
              Wichita Solar Company — Overview
            </Link>
            {siblings.map(([slug, sibling]) => (
              <Link
                key={slug}
                to={`${HUB_BASE}/${slug}`}
                className="flex items-center gap-3 p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-brand-gold/50 hover:bg-white transition-all font-bold text-brand-dark text-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                {sibling.h1}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
