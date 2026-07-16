import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';

export const SiteSurveyPage = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.cognitoforms.com/f/iframe.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <InternalFormPageTemplate
      title="Site Survey"
      subtitle="Complete the form below to provide details for your site survey."
      eyebrow="Operations"
    >
      <div className="w-full overflow-hidden">
        <iframe
          src="https://www.cognitoforms.com/f/wECQLg0f8E6eBi0lPLY__w/8"
          allow="payment"
          style={{ border: 0, width: '100%' }}
          height="4445"
          title="Cognito Form Site Survey"
        />
      </div>
    </InternalFormPageTemplate>
  );
};

