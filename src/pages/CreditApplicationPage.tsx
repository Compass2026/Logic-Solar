import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';

export const CreditApplicationPage = () => {
  return (
    <InternalFormPageTemplate
      title="Credit Application"
      subtitle="Complete the form below to begin the credit application process."
      eyebrow="Financial Portal"
    >
      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-brand-teal/20 rounded-[32px] bg-brand-teal/5 p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center mb-6">
          <div className="w-8 h-8 text-brand-teal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-4">GHL Form Embed Goes Here</h3>
        <p className="text-brand-dark/40 max-w-sm mx-auto">
          The GoHighLevel form for Credit Applications will be rendered within this container.
        </p>
        
        {/* 
            GHL EMBED INSTRUCTIONS:
            Paste your GoHighLevel iframe or JS embed script below this comment.
        */}
        
        <div className="mt-8 p-4 bg-brand-dark/5 rounded-xl font-mono text-xs text-brand-dark/30">
          {`<!-- GHL Form Placeholder -->`}
        </div>
      </div>
    </InternalFormPageTemplate>
  );
};
