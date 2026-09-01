import React from 'react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { FAQAccordion } from '../components/FAQAccordion';
import { QuoteForm } from '../components/QuoteForm';
import { SEO } from '../components/SEO';
import { HelpCircle, Search, Mail, Phone, MessageSquare } from 'lucide-react';
import { siteData } from '../data/siteData';
import { cn } from '../lib/utils';

export const FAQ = () => {
  // Schema must quote the Q&A the page actually renders (faqClusters),
  // matching the FAQPage schema in the prerendered HTML.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": siteData.faqClusters.flatMap(cluster => cluster.questions).map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <main className="bg-white">
      <SEO 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about solar installation, costs, incentives, and how Logic Solar can help you achieve energy independence."
        schema={faqSchema}
      />
      <PageHero 
        title={<>Clear Answers. <br /><span className="text-brand-gold">Zero Fluff.</span></>}
        subtitle="Everything you need to know about making the switch to clean, intelligent energy."
        eyebrow="FAQ"
        backgroundImage="https://images.unsplash.com/photo-1454165833772-d996d4ad5004?auto=format&fit=crop&q=80&w=2000"
      />

      {/* FAQ Search/Categories Placeholder (Simple & Lightweight) */}
      <section className="section-padding bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <SectionHeading 
                eyebrow="The Knowledge Base"
                title="Common Objections."
                description="We believe in radical transparency. If you have a question we haven't answered here, reach out directly."
                className="mb-0 max-w-xl"
              />
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/20 group-focus-within:text-brand-gold transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search questions..."
                  className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:border-brand-gold shadow-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-16 mb-24">
              {siteData.faqClusters.map((cluster) => (
                <div key={cluster.category}>
                   <h3 className="text-xl font-black uppercase tracking-widest text-brand-gold mb-8 italic flex items-center gap-3">
                     <span className="w-8 h-px bg-brand-gold/30" />
                     {cluster.category}
                   </h3>
                   <FAQAccordion items={cluster.questions} />
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Mail, label: "Email Us", val: siteData.contact.email },
                { icon: Phone, label: "Call Us", val: "(816) 300-5781" },
                { icon: MessageSquare, label: "Live Chat", val: "Available 9am-5pm" }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white border border-gray-100 flex flex-col items-center text-center group hover:border-brand-gold transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-brand-dark" />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-brand-dark/40 mb-2">{item.label}</h4>
                  <p className="text-lg font-bold text-brand-dark">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteForm />
    </main>
  );
};
