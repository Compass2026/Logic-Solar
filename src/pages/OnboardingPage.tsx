import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';

export const OnboardingPage = () => {
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
      title="Partner Onboarding"
      subtitle="Complete your onboarding to join the Logic Solar ecosystem."
      eyebrow="Onboarding"
    >
      <div className="w-full min-h-[600px] overflow-hidden">
        <iframe
          src="https://link.logic-solar.com/widget/form/Y5L7ZLNXNoh3ckHaDYqE"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
          id="inline-Y5L7ZLNXNoh3ckHaDYqE" 
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Onboarding"
          data-height="934"
          data-layout-iframe-id="inline-Y5L7ZLNXNoh3ckHaDYqE"
          data-form-id="Y5L7ZLNXNoh3ckHaDYqE"
          title="Onboarding"
        />
      </div>
    </InternalFormPageTemplate>
  );
};
