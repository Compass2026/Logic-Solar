import React from 'react';
import { motion } from 'motion/react';
import { Shield, Zap, TrendingDown, DollarSign, Calculator, FileText, CheckCircle2, Info } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { FAQAccordion } from '../components/FAQAccordion';
import { QuoteForm } from '../components/QuoteForm';
import { SEO } from '../components/SEO';

export const SolarIncentives = () => {
  const faqItems = [
    { question: "What is the Federal Solar Tax Credit (ITC)?", answer: "The Investment Tax Credit (ITC) currently allows you to deduct 30% of the cost of installing a solar energy system from your federal taxes. There is no cap on the value of the credit." },
    { question: "How do I claim solar incentives?", answer: "Most federal incentives are claimed when you file your annual tax return. Logic Solar provides all the necessary documentation and equipment certifications to make this process seamless for your tax professional." },
    { question: "Do incentives apply to battery storage?", answer: "Yes! Under current legislation, battery storage systems (whether standalone or paired with solar) are eligible for the 30% federal tax credit." },
    { question: "Are there state-specific incentives?", answer: "Many states and local utility companies offer additional rebates or performance-based incentives. These vary significantly by location and program availability." }
  ];

  return (
    <main className="bg-white">
      <SEO 
        title="Solar Incentives & Tax Credits" 
        description="Maximize your solar savings with federal and local incentives. Learn how the 30% tax credit and other programs make solar more affordable than ever."
      />
      <PageHero 
        title={<>Ownership <br /><span className="text-brand-gold">Accelerated.</span></>}
        subtitle="Unlocking the financial logic of solar with federal tax credits, local rebates, and performance incentives."
        eyebrow="Solar Incentives"
        backgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000"
      />

      {/* Incentives Overview */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <SectionHeading 
            eyebrow="Financial Intelligence"
            title={<>The 30% <br /><span className="text-brand-gold">Advantage.</span></>}
            description="The federal government and local utilities want you to go solar. These programs are designed to significantly reduce your initial investment and accelerate your return on assets."
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              { 
                icon: DollarSign, 
                title: "Federal Tax Credit", 
                desc: "Deduct 30% of your total system cost directly from your federal tax liability. A dollar-for-dollar reduction." 
              },
              { 
                icon: Calculator, 
                title: "MACRS Depreciation", 
                desc: "For businesses, accelerated depreciation allows you to recover the cost of your solar investment even faster." 
              },
              { 
                icon: FileText, 
                title: "Local Rebates", 
                desc: "Many utility companies offer cash rebates or performance-based incentives to encourage grid stability." 
              }
            ].map((incentive, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="p-12 rounded-[40px] bg-gray-50 border border-transparent hover:border-brand-gold/20 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-dark text-brand-gold flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <incentive.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">{incentive.title}</h3>
                <p className="text-brand-dark/60 leading-relaxed text-sm font-medium">{incentive.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Legal Disclaimer Box */}
          <div className="mt-16 p-8 rounded-3xl bg-brand-dark/5 border border-brand-dark/10 flex gap-6 items-start">
            <div className="shrink-0 w-10 h-10 rounded-full bg-brand-dark/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-brand-dark" />
            </div>
            <p className="text-sm text-brand-dark/50 leading-relaxed">
              <strong>Important Note:</strong> Incentive eligibility depends on your specific financial situation and current program availability. Logic Solar does not provide legal or tax advice. We recommend consulting with a qualified tax professional to confirm your eligibility for specific credits and incentives.
            </p>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="section-padding bg-brand-dark text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading 
                dark
                eyebrow="The Logic Support"
                title={<>We simplify the <br /><span className="text-brand-gold">paperwork.</span></>}
                description="Navigating incentives can be complex. Our team handles the documentation so you can focus on the savings."
              />
              <div className="space-y-6 mt-12">
                {[
                  "Full verification of local utility rebate eligibility",
                  "Consolidated documentation for tax filing",
                  "Guidance on SREC (Solar Renewable Energy Credit) markets",
                  "Continuous monitoring of new legislative incentives"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center font-bold text-white/80">
                    <CheckCircle2 className="w-6 h-6 text-brand-gold" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[48px] overflow-hidden shadow-2xl skew-y-3">
                <img 
                  src="https://images.unsplash.com/photo-1454165833772-d996d4ad5004?auto=format&fit=crop&q=80&w=1200" 
                  alt="Financial Planning" 
                  className="w-full h-full object-cover aspect-video"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            <SectionHeading 
              eyebrow="Financial Clarity"
              title="Common Questions."
              description="Understand the details of solar incentives and how they impact your investment."
            />
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <QuoteForm />
    </main>
  );
};
