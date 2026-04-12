import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from './PageHero';
import { cn } from '../lib/utils';
import { SEO } from './SEO';
import { SectionHeading } from './SectionHeading';
import { QuoteForm } from './QuoteForm';
import { TrustStrip } from './TrustStrip';

interface ServiceTemplateProps {
  service: {
    title: string;
    fullDescription: string;
    features: string[];
    benefits: string[];
    backgroundImage: string;
    imagePosition?: string;
  };
}

export const ServiceTemplate = ({ service }: ServiceTemplateProps) => {
  return (
    <>
      <SEO 
        title={service.title} 
        description={service.fullDescription.substring(0, 160)} 
      />
      
      <PageHero 
        title={service.title}
        subtitle={service.fullDescription}
        backgroundImage={service.backgroundImage}
        imagePosition={service.imagePosition}
        eyebrow="Premium Service"
      />

      <TrustStrip />

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading 
                eyebrow="Features"
                title="Engineering Excellence"
                description="We don't just install panels; we engineer energy systems for the long haul."
                centered={false}
              />
              
              <div className="grid sm:grid-cols-1 gap-4 mt-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-brand-light border border-black/5 hover:border-brand-gold/20 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold mt-1" />
                    <span className="font-bold text-brand-dark">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden aspect-square lg:aspect-auto lg:h-[600px] shadow-2xl"
            >
              <img 
                src={service.backgroundImage} 
                alt={service.title}
                className={cn("w-full h-full object-cover", service.imagePosition)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-gold rounded-full blur-[150px]" />
        </div>

        <div className="container-custom relative z-10">
          <SectionHeading 
            eyebrow="ROI & Benefits"
            title="The Logic Advantage"
            description="Our clients see immediate value that compounds over decades."
            centered={true}
            dark
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center mb-6 text-brand-gold font-black group-hover:scale-110 transition-transform">
                  0{index + 1}
                </div>
                <p className="text-lg font-bold leading-snug">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <QuoteForm />
    </>
  );
};
