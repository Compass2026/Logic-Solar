import React from 'react';
import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { SEO } from '../components/SEO';
import { 
  CheckCircle, 
  Zap, 
  Globe, 
  ShieldCheck, 
  MessageSquare, 
  CreditCard, 
  Copyright, 
  AlertTriangle, 
  ShieldAlert, 
  Scale, 
  XCircle, 
  Gavel, 
  RefreshCw, 
  HelpCircle,
  Shield
} from 'lucide-react';

export const Terms = () => {
  const sections = [
    {
      title: "1. Agreement to Terms",
      icon: CheckCircle,
      content: "These Terms govern your access to and use of the Website https://www.logic-solar.com, and any services provided by Logic Solar LLC, including but not limited to solar sales, installations, consultations, and related services. By submitting information or contacting us through our Website, you agree to these Terms."
    },
    {
      title: "2. Services Provided",
      icon: Zap,
      content: "Logic Solar LLC provides solar energy solutions, including but not limited to: Sales of solar panel systems and related products. Installation and maintenance services for residential and commercial properties. Consultation and energy analysis for solar power systems. Additional solar services as may be offered from time to time."
    },
    {
      title: "3. Use of Our Website",
      icon: Globe,
      content: "You may use our Website for lawful purposes and in accordance with these Terms. You agree not to: Use the Website to violate any applicable laws or regulations. Upload or transmit harmful code (viruses, malware, etc.). Interfere with or disrupt the Website’s functionality or security."
    },
    {
      title: "4. Privacy and Data Collection",
      icon: ShieldCheck,
      content: "By using our Website, you acknowledge that we collect personal information through forms and communications, as described in our Privacy Policy. You agree to provide accurate and complete information when interacting with our services and forms."
    },
    {
      title: "5. Opt-In Communications",
      icon: MessageSquare,
      content: "By submitting a form or providing contact information, you consent to receiving communications from Logic Solar LLC regarding solar products, services, and promotions. You can opt out of these communications at any time by following the opt-out instructions in our emails or by contacting us directly."
    },
    {
      title: "6. Pricing and Payments",
      icon: CreditCard,
      content: "Prices for services and products will be provided as part of a quote or consultation. Any payment terms, including deposit requirements and payment schedules, will be outlined in a separate agreement or contract specific to the service provided. All payments are due in accordance with the agreed-upon terms. Late payments may be subject to additional charges or fees as specified in the agreement."
    },
    {
      title: "7. Intellectual Property",
      icon: Copyright,
      content: "All content on our Website, including text, graphics, logos, and images, is the property of Logic Solar LLC and is protected by intellectual property laws. You may not use, reproduce, or distribute any content from the Website without our express written permission."
    },
    {
      title: "8. Limitation of Liability",
      icon: AlertTriangle,
      content: "To the fullest extent permitted by law, Logic Solar LLC is not liable for any damages arising from your use of the Website or our services, including, but not limited to, any loss of data, revenue, or profits, or any indirect, incidental, or consequential damages. Our total liability will be limited to the amount paid by you for the specific service in question."
    },
    {
      title: "9. Warranty Disclaimer",
      icon: ShieldAlert,
      content: "Logic Solar LLC does not warrant that the services provided will meet your specific requirements or be uninterrupted or error-free. We make no representations or warranties of any kind, express or implied, regarding the operation of our services or the information, content, or materials included on the Website."
    },
    {
      title: "10. Indemnification",
      icon: Scale,
      content: "You agree to indemnify and hold harmless Logic Solar LLC, its officers, employees, and agents from any claims, damages, or liabilities arising out of your use of the Website or services, including any violation of these Terms."
    },
    {
      title: "11. Termination of Services",
      icon: XCircle,
      content: "We may suspend or terminate your access to the Website and services at any time for any reason, including if you violate these Terms. You may also terminate your relationship with us by contacting us and discontinuing the use of our Website and services."
    },
    {
      title: "12. Governing Law and Dispute Resolution",
      icon: Gavel,
      content: "These Terms will be governed by and construed in accordance with the laws of the state of Kansas, without regard to its conflict of law principles. Any disputes arising under or in connection with these Terms shall be resolved in the courts located in Bonner Springs, Kansas."
    },
    {
      title: "13. Changes to These Terms",
      icon: RefreshCw,
      content: "We reserve the right to modify or update these Terms at any time. Any changes will be posted on this page with a revised “Last Updated” date. By continuing to use our Website or services, you agree to be bound by the updated Terms."
    },
    {
      title: "14. Contact Us",
      icon: HelpCircle,
      content: "If you have any questions or concerns about these Terms of Service, please contact us: Logic Solar LLC, 836 Elk Lane, Bonner Springs, KS 66012. Phone: +1 (660) 216-9664. Email: shane@logic-solar.com"
    }
  ];

  return (
    <main className="bg-white">
      <SEO 
        title="Terms of Service" 
        description="Read Logic Solar's Terms of Service to understand our commitment to quality, professional solar solutions, and your rights as a user."
      />
      <PageHero 
        title={<>Terms of <br /><span className="text-brand-gold">Service.</span></>}
        subtitle="Last Updated: April 14, 2025"
        eyebrow="Our Commitment"
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none text-brand-dark/70"
          >
            <p className="text-xl font-medium text-brand-dark mb-12 leading-relaxed">
              Welcome to Logic Solar LLC. By accessing or using our services, you agree to comply with and be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree with these Terms, please do not use our Website or services.
            </p>

            <div className="space-y-16">
              {sections.map((section, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative pl-12 md:pl-20 group"
                >
                  <div className="absolute left-0 top-0 w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-500">
                    <section.icon className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-brand-dark mb-6 tracking-tight">
                    {section.title}
                  </h3>
                  <p className="text-brand-dark/60 leading-relaxed font-medium">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professionalism Banner */}
      <section className="section-padding pb-32">
        <div className="container-custom">
          <div className="relative rounded-[40px] overflow-hidden bg-brand-dark py-20 px-8 md:px-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <Shield className="w-16 h-16 text-brand-gold mx-auto mb-8" />
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Built on Trust.</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Logic Solar is committed to transparency and excellence in every installation. Our terms are designed to protect both our customers and our commitment to quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
