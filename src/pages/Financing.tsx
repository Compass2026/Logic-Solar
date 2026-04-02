import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, TrendingDown, DollarSign, Wallet, PieChart, CreditCard, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { QuoteForm } from '../components/QuoteForm';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export const Financing = () => {
  return (
    <main className="bg-white">
      <SEO 
        title="Solar Financing Options" 
        description="Make solar affordable with flexible financing. From low-interest loans to zero-down options, explore the paths to solar ownership and monthly savings."
      />
      <PageHero 
        title={<>Affordable <br /><span className="text-brand-gold">By Logic.</span></>}
        subtitle="Solar is an investment, not an expense. Explore flexible pathways to own your energy and start saving from day one."
        eyebrow="Financing"
        backgroundImage="https://images.unsplash.com/photo-1554224155-1696413575b8?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Why Financing Matters */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <SectionHeading 
            eyebrow="Financial Freedom"
            title={<>Swap a bill, <br />gain an <span className="text-brand-gold">asset.</span></>}
            description="The logic of solar financing is simple: replace your unpredictable, rising utility bill with a fixed monthly payment that eventually disappears once your system is paid off."
          />
          
          <div className="grid md:grid-cols-2 gap-12 mt-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[48px] bg-brand-dark text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingDown className="w-32 h-32 text-brand-gold" />
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">The Savings Math</h3>
              <ul className="space-y-6">
                {[
                  { label: "Utility Bill", val: "$250/mo", sign: "+" },
                  { label: "Solar Payment", val: "$180/mo", sign: "-" },
                  { label: "Immediate Cash Flow", val: "$70/mo", sign: "=" }
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/60 font-medium">{item.label}</span>
                    <span className="text-xl font-bold tracking-tight">
                      {item.sign} {item.val}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-white/40 leading-relaxed italic">
                *Example based on typical 8kW residential system. Actual savings depend on usage and current rates.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { icon: Wallet, title: "Zero Down Options", desc: "Start generating your own power with $0 upfront cost. Let your monthly savings pay for the system." },
                { icon: PieChart, title: "Flexible Terms", desc: "Choose between 5, 10, 15, or 20-year terms to match your long-term financial strategy." },
                { icon: CreditCard, title: "Quick Approval", desc: "Our integrated soft-credit check process provides instant pre-approval without affecting your score." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-8 rounded-[32px] bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-brand-gold/10">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-brand-dark" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-dark mb-1 tracking-tight">{item.title}</h4>
                    <p className="text-sm text-brand-dark/60 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financing Paths */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading 
            centered
            eyebrow="The Paths to Ownership"
            title="How do you want to start?"
            description="Every homeowner's financial situation is unique. We offer multiple pathways to meet your goals."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { path: "Solar Loan", highlight: "Popular", detail: "Low-interest loans designed specifically for solar and energy efficiency. You own the system and keep all 30% tax credits." },
              { path: "Cash Purchase", highlight: "Highest ROI", detail: "Pay upfront for the shortest payback period and maximum lifetime savings. You own the system from day one." },
              { path: "Lease / PPA", highlight: "Zero-Hassle", detail: "Pay for the power, not the panels. Zero maintenance costs and zero down payment, though tax credits go to the provider." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 relative flex flex-col justify-between">
                <div>
                  <div className="inline-flex px-3 py-1 bg-brand-gold text-brand-dark text-[10px] font-black uppercase tracking-widest rounded-full mb-6">
                    {item.highlight}
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark mb-6 tracking-tight">{item.path}</h3>
                  <p className="text-brand-dark/60 leading-relaxed text-sm mb-10">{item.detail}</p>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-xs font-bold text-brand-dark/80">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    Custom design included
                  </li>
                  <li className="flex items-center gap-3 text-xs font-bold text-brand-dark/80">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                    25-year warranty
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">
              Get your custom <br /><span className="text-brand-gold">savings report.</span>
            </h2>
            <p className="text-white/50 text-xl mb-12 leading-relaxed">
              Our consultants will break down the exact math for your home and help you choose the path that makes the most logic for you.
            </p>
            <Link 
              to="/contact"
              className="px-10 py-5 bg-brand-gold text-brand-dark font-black rounded-2xl hover:bg-brand-gold-bright transition-all shadow-xl shadow-brand-gold/20 uppercase tracking-widest text-sm inline-block"
            >
              Get Your Free Analysis
            </Link>
          </div>
        </div>
      </section>

      <QuoteForm />
    </main>
  );
};
