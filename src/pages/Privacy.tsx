import React from 'react';
import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { SEO } from '../components/SEO';
import { Shield, Lock, FileText, Eye, UserCheck, Bell, MessageCircle, HelpCircle } from 'lucide-react';

export const Privacy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: Eye,
      content: "We collect the following types of personal information when you submit a form or interact with our website: Contact Information such as your name, phone number, email address, and physical address. Project Information such as your energy needs, property details, or solar preferences. Device & Browsing Data such as IP address, browser type, referring URLs, and usage data through cookies and analytics tools."
    },
    {
      title: "2. How We Collect Information",
      icon: FileText,
      content: "We collect your information when you: Submit a contact or lead form on our Website. Communicate with us by phone, email, or other means. Use our Website or engage with our marketing campaigns (e.g., Facebook, Google Ads, etc.)."
    },
    {
      title: "3. Use of Your Information",
      icon: Shield,
      content: "We may use the information we collect for the following purposes: To contact you regarding your inquiry about solar products or services. To provide quotes, schedule consultations, and manage customer relationships. To improve our Website, services, and user experience. To send promotional emails or text messages only to users who have opted in. To comply with legal obligations or enforce our Terms of Service."
    },
    {
      title: "4. Sharing of Your Information",
      icon: Lock,
      content: "We do not sell or rent your personal information. We may share your data with: Authorized employees and agents of Logic Solar LLC. Third-party service providers who help operate our website, CRM systems, or marketing tools. Government or legal authorities, if required by law."
    },
    {
      title: "5. Opt-In and Communication",
      icon: MessageCircle,
      content: "By submitting your information through our forms, you expressly opt in to receive communications from Logic Solar LLC via phone, email, or SMS. You can opt out at any time by following the unsubscribe instructions in our messages or by contacting us directly."
    },
    {
      title: "6. Data Security",
      icon: Shield,
      content: "We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure."
    },
    {
      title: "7. Cookies and Tracking Technologies",
      icon: Bell,
      content: "We use cookies and similar tracking tools to enhance your browsing experience and analyze traffic. You can control cookie preferences through your browser settings."
    },
    {
      title: "8. Your Rights and Choices",
      icon: UserCheck,
      content: "You have the right to: Access the personal information we hold about you. Request corrections or deletions of your personal data. Withdraw your consent to communications at any time. To exercise these rights, please contact us at shane@logic-solar.com or call us at +1 (660) 216-9664"
    },
    {
      title: "9. Children’s Privacy",
      icon: Lock,
      content: "Our Website is not intended for children under 13 years of age. We do not knowingly collect personal information from children."
    },
    {
      title: "10. Changes to This Privacy Policy",
      icon: FileText,
      content: "We may update this Privacy Policy periodically. Any changes will be posted on this page with a revised “Last Updated” date."
    },
    {
      title: "11. Contact Us",
      icon: HelpCircle,
      content: "If you have any questions about this Privacy Policy, please contact us: Logic Solar LLC, 836 Elk Lane, Bonner Springs, KS 66012. Phone: +1 (660) 216-9664. Email: shane@logic-solar.com"
    }
  ];

  return (
    <main className="bg-white">
      <SEO 
        title="Privacy Policy" 
        description="Logic Solar's Privacy Policy describes how we collect, use, and protect your personal information."
      />
      <PageHero 
        title={<>Privacy <br /><span className="text-brand-gold">Policy.</span></>}
        subtitle="Last Updated: April 14, 2025"
        eyebrow="Trust & Security"
        backgroundImage="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
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
              Logic Solar LLC (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting it through this Privacy Policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website <span className="text-brand-gold font-bold">www.logic-solar.com</span> and our practices for collecting, using, maintaining, protecting, and disclosing that information.
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

      {/* Trust Banner */}
      <section className="section-padding pb-32">
        <div className="container-custom">
          <div className="relative rounded-[40px] overflow-hidden bg-brand-dark py-20 px-8 md:px-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <Shield className="w-16 h-16 text-brand-gold mx-auto mb-8" />
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Your data is safe with us.</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                We use industry-standard encryption and security protocols to ensure your personal information remains confidential and secure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
