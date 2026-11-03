import React from 'react';
import { motion } from 'motion/react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';
import { ClipboardList, Phone } from 'lucide-react';

// GoHighLevel form for roof deals, same setup as the solar /deal page.
// Paste the form ID from GHL (Sites → Forms → the roof deal form → Integrate:
// the ID at the end of ".../widget/form/<ID>"). While it is empty the page
// shows a "form is being set up" card instead of a broken embed.
const ROOF_DEAL_FORM_ID = '';
const ROOF_DEAL_FORM_HEIGHT = 2227;

export const RoofDealSubmissionPage = () => {
  React.useEffect(() => {
    if (!ROOF_DEAL_FORM_ID) return;
    const script = document.createElement('script');
    script.src = 'https://link.logic-solar.com/js/form_embed.js';
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
      title="Roof Deal Submission"
      subtitle="Submit roofing project details for review and scheduling."
      eyebrow="Roofing Sales Portal"
    >
      {ROOF_DEAL_FORM_ID ? (
        <div className="w-full overflow-hidden rounded-[40px] bg-white shadow-sm border border-gray-100">
          <iframe
            src={`https://link.logic-solar.com/widget/form/${ROOF_DEAL_FORM_ID}`}
            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
            id={`inline-${ROOF_DEAL_FORM_ID}`}
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Roof Deal Submission"
            data-height={String(ROOF_DEAL_FORM_HEIGHT)}
            data-layout-iframe-id={`inline-${ROOF_DEAL_FORM_ID}`}
            data-form-id={ROOF_DEAL_FORM_ID}
            title="Roof Deal Submission"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-xl p-6 sm:p-8 rounded-[32px] bg-white border-2 border-brand-dark/5 shadow-lg text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 mx-auto">
              <ClipboardList className="w-6 h-6 text-brand-gold" />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-3 tracking-tight">
              Roof deal form is being set up
            </h3>
            <p className="text-brand-dark/50 mb-8 leading-relaxed">
              The submission form for roofing deals goes live here shortly. Until then, call
              the office to submit a roof deal.
            </p>
            <a
              href="tel:+18163005781"
              className="inline-flex items-center gap-2 whitespace-nowrap px-6 sm:px-8 py-4 rounded-full bg-brand-teal text-white font-bold shadow-xl shadow-brand-teal/20 hover:-translate-y-0.5 transition-all"
            >
              <Phone className="w-5 h-5" /> (816) 300-5781
            </a>
          </motion.div>
        </div>
      )}
    </InternalFormPageTemplate>
  );
};
