import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';

export const ServiceRequestPage = () => {
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
      title="Service Request"
      subtitle="Complete the form below to request service from our team."
      eyebrow="Support"
    >
      <div className="w-full min-h-[800px] overflow-hidden">
        <iframe
          src="https://link.logic-solar.com/widget/form/ylkZjQ7s4xO2cv655vEX"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
          id="inline-ylkZjQ7s4xO2cv655vEX" 
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Service Form"
          data-height="1351"
          data-layout-iframe-id="inline-ylkZjQ7s4xO2cv655vEX"
          data-form-id="ylkZjQ7s4xO2cv655vEX"
          title="Service Form"
        />
      </div>
    </InternalFormPageTemplate>
  );
};
