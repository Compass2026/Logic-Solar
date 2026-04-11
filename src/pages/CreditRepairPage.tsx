import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';

export const CreditRepairPage = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://link.logic-solar.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <InternalFormPageTemplate
      title="Credit Repair"
      subtitle="Start your journey toward solar ownership by addressing credit requirements."
      eyebrow="Financial Wellness"
    >
      <div className="w-full min-h-[600px] overflow-hidden">
        <iframe
          src="https://link.logic-solar.com/widget/form/drxp7g0pyw3o2kFQ2d0T"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
          id="inline-drxp7g0pyw3o2kFQ2d0T"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Credit Repair Form"
          data-height="1520"
          data-layout-iframe-id="inline-drxp7g0pyw3o2kFQ2d0T"
          data-form-id="drxp7g0pyw3o2kFQ2d0T"
          title="Credit Repair Form"
        />
      </div>
    </InternalFormPageTemplate>
  );
};
