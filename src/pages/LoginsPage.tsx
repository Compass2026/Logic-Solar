import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';

export const LoginsPage = () => {
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
      title="Access Request"
      subtitle="Request access to Logic Solar's internal portals and business tools."
      eyebrow="Internal Access"
    >
      <div className="w-full overflow-hidden rounded-[40px] bg-white shadow-sm border border-gray-100">
        <iframe
          src="https://link.logic-solar.com/widget/form/M8G8ADBGYOassN85QQlB"
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '3px' }}
          id="inline-M8G8ADBGYOassN85QQlB" 
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Login Request"
          data-height="643"
          data-layout-iframe-id="inline-M8G8ADBGYOassN85QQlB"
          data-form-id="M8G8ADBGYOassN85QQlB"
          title="Login Request"
        />
      </div>
    </InternalFormPageTemplate>
  );
};
