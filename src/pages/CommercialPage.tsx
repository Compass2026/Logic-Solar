import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';

export const CommercialPage = () => {
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
      title="Commercial Intake"
      subtitle="Complete the form below to request a commercial solar proposal."
      eyebrow="Commercial"
    >
      <div className="w-full min-h-[600px] overflow-hidden">
        <iframe
          src="https://link.logic-solar.com/widget/form/YOikSX0RTyyNwSpQW5L5"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
          id="inline-YOikSX0RTyyNwSpQW5L5" 
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Commercial Proposal Request "
          data-height="1860"
          data-layout-iframe-id="inline-YOikSX0RTyyNwSpQW5L5"
          data-form-id="YOikSX0RTyyNwSpQW5L5"
          title="Commercial Proposal Request "
        />
      </div>
    </InternalFormPageTemplate>
  );
};
