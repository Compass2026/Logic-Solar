import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';
import { Calculator, FileText, ArrowRight } from 'lucide-react';

export const DealSubmissionPage = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://link.logic-solar.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <InternalFormPageTemplate
      title="Deal Submission"
      subtitle="Submit project details and navigate to critical pricing and agreement tools."
      eyebrow="Sales Portal"
    >
      <div className="space-y-12">
        {/* Navigation Buttons */}
        <div className="flex flex-col items-center gap-6">
          <Link to="/adders" className="group cursor-pointer w-full max-w-xl">
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="p-8 rounded-[32px] bg-brand-teal text-white shadow-xl shadow-brand-teal/20 transition-all flex flex-col h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Adders Pricing</h3>
              <p className="text-white/70 mb-8 flex-grow leading-relaxed">
                Access the latest pricing for panel upgrades, battery installations, and other project add-ons.
              </p>
              <div className="flex items-center gap-2 font-bold group-hover:gap-3 transition-all mt-auto">
                View Pricing <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          </Link>

          <a 
            href="https://powerforms.docusign.net/7f0a0ef7-91de-4fdf-90cb-17b3064549c4?env=na4&acct=a5ca747b-f869-45ab-bdbe-194fd4d9dfeb&accountId=a5ca747b-f869-45ab-bdbe-194fd4d9dfeb"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer w-full max-w-xl"
          >
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="p-8 rounded-[32px] bg-white border-2 border-brand-dark/5 shadow-lg flex flex-col h-full hover:border-brand-gold/50 hover:shadow-brand-gold/10 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-3 tracking-tight">Home Improvement Agreement</h3>
              <p className="text-brand-dark/50 mb-8 flex-grow leading-relaxed">
                Generate project-specific legal agreements for customer signature via DocuSign.
              </p>
              <div className="flex items-center gap-2 font-bold text-brand-gold group-hover:gap-3 transition-all mt-auto">
                Open Agreement <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          </a>

          <a 
            href="https://powerforms.docusign.net/cc6ed60d-63a0-4de8-8cba-3ed158ca1a37?env=na4&acct=a5ca747b-f869-45ab-bdbe-194fd4d9dfeb&accountId=a5ca747b-f869-45ab-bdbe-194fd4d9dfeb"
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer w-full max-w-xl"
          >
            <motion.div
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="p-8 rounded-[32px] bg-white border-2 border-brand-dark/5 shadow-lg flex flex-col h-full hover:border-brand-gold/50 hover:shadow-brand-gold/10 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-3 tracking-tight">Illinois Home Improvement Agreement</h3>
              <p className="text-brand-dark/50 mb-8 flex-grow leading-relaxed">
                Generate project-specific legal agreements for Illinois customers via DocuSign.
              </p>
              <div className="flex items-center gap-2 font-bold text-brand-gold group-hover:gap-3 transition-all mt-auto">
                Open Agreement <ArrowRight className="w-5 h-5" />
              </div>
            </motion.div>
          </a>
        </div>

        {/* GHL Form Area */}
        <div className="pt-12 border-t border-gray-100">
          <div className="w-full overflow-hidden rounded-[40px] bg-white shadow-sm border border-gray-100">
            <iframe
              src="https://link.logic-solar.com/widget/form/wSCizIElPZV7bnbEINrU"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
              id="inline-wSCizIElPZV7bnbEINrU" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Deal Submission"
              data-height="2227"
              data-layout-iframe-id="inline-wSCizIElPZV7bnbEINrU"
              data-form-id="wSCizIElPZV7bnbEINrU"
              title="Deal Submission"
            />
          </div>
        </div>
      </div>

    </InternalFormPageTemplate>
  );
};
