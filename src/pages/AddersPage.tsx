import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';
import { FileText, ExternalLink } from 'lucide-react';

const adderStyles = `
  .ls-grid-card{
    background:#ffffff;
    border-radius:10px;
    padding:20px 26px;
    max-width:1100px;
    margin:0 auto;
    box-shadow:0 2px 18px rgba(0,0,0,.06);
  }

  .ls-grid-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:24px;
    padding:14px 10px;
    border-bottom:1px solid #ececec;
    font-size:15px;
    line-height:1.35;
    color:#6b6b6b;
    border-radius:6px;
  }

  .ls-grid-row:last-child{
    border-bottom:none;
  }

  .ls-grid-row:nth-child(even){
    background:rgba(0,0,0,.015);
  }

  .ls-left{
    flex:1;
  }

  .ls-right{
    flex:0 0 auto;
    font-weight:600;
    text-align:right;
    white-space:nowrap;
  }

  @media (max-width: 767px){
    .ls-grid-card{
      padding:14px 14px;
    }
    .ls-grid-row{
      flex-direction:column;
      align-items:flex-start;
      gap:6px;
      padding:12px 10px;
    }
    .ls-right{
      text-align:left;
      white-space:normal;
    }
  }
`;

export const AddersPage = () => {
  return (
    <InternalFormPageTemplate
      title="Adders Pricing"
      subtitle="Review Logic Solar adders and pricing details below."
      eyebrow="Internal Utility"
    >
      <style dangerouslySetInnerHTML={{ __html: adderStyles }} />

      <div className="space-y-12">
        {/* Enphase IQ8MC Datasheet Button */}
        <div className="flex justify-center relative z-[60]">
          <div className="w-full max-w-md">
            <a
              href="https://drive.google.com/drive/folders/1MojkRTOp4RYET6emBY12B3rurmHS3kvP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 rounded-3xl bg-white border-2 border-brand-teal/10 hover:border-brand-teal/30 shadow-lg hover:shadow-brand-teal/10 transition-all group cursor-pointer relative z-[70]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-colors duration-500">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30 mb-1">Datasheet</span>
                  <h4 className="text-xl font-bold text-brand-dark">Enphase IQ8MC</h4>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-brand-dark/20 group-hover:text-brand-teal transition-colors" />
            </a>
          </div>
        </div>

        {/* Adders Grid */}
        <div className="ls-grid-card">
          <div className="ls-grid-row"><div className="ls-left">Main Panel Upgrade</div><div className="ls-right">$3,500</div></div>
          <div className="ls-grid-row"><div className="ls-left">Full Service Upgrade</div><div className="ls-right">$5,000</div></div>
          <div className="ls-grid-row"><div className="ls-left">Manual Transfer Switch</div><div className="ls-right">$1,500</div></div>
          <div className="ls-grid-row"><div className="ls-left">Meter Combination</div><div className="ls-right">$3,000</div></div>
          <div className="ls-grid-row"><div className="ls-left">Meter Relocation</div><div className="ls-right">$1,500</div></div>
          <div className="ls-grid-row"><div className="ls-left">Multi-Meter Installation</div><div className="ls-right">$0.40/watt</div></div>
          <div className="ls-grid-row"><div className="ls-left">Meter Upgrade</div><div className="ls-right">$3,000</div></div>
          <div className="ls-grid-row"><div className="ls-left">Ground Mount Installation</div><div className="ls-right">$0.35/watt + Trenching</div></div>
          <div className="ls-grid-row"><div className="ls-left">Trenching</div><div className="ls-right">$20/ft</div></div>
          <div className="ls-grid-row"><div className="ls-left">Detach and Reset</div><div className="ls-right">$300/panel</div></div>
          <div className="ls-grid-row"><div className="ls-left">EV Charger</div><div className="ls-right">$1,500 + Cost of Charger</div></div>
          <div className="ls-grid-row"><div className="ls-left">Flat Roof / Ballast System</div><div className="ls-right">$0.25/watt</div></div>
          <div className="ls-grid-row"><div className="ls-left">Solar Panel Critter Guard</div><div className="ls-right">$20/ft</div></div>
          <div className="ls-grid-row"><div className="ls-left">Franklin aPower 2 Battery</div><div className="ls-right">$15,500</div></div>
          <div className="ls-grid-row"><div className="ls-left">24KW Generator Installation (excludes gas line and gas hookup)</div><div className="ls-right">$13,000</div></div>
          <div className="ls-grid-row"><div className="ls-left">Enphase Encharge IQ 10 Battery</div><div className="ls-right">$14,500</div></div>
          <div className="ls-grid-row"><div className="ls-left">Enphase IQ Battery 5P</div><div className="ls-right">$9,000</div></div>
          <div className="ls-grid-row"><div className="ls-left">Tesla Powerwall 3</div><div className="ls-right">$13,500</div></div>
          <div className="ls-grid-row"><div className="ls-left">Project Site Surveys / Trip Charges / Truck Rolls</div><div className="ls-right">$500</div></div>
          <div className="ls-grid-row"><div className="ls-left">Small System Adder (4KW to 6KW)</div><div className="ls-right">$1,500</div></div>
          <div className="ls-grid-row"><div className="ls-left">Small System Adder (4KW or less)</div><div className="ls-right">$2,500</div></div>
          <div className="ls-grid-row"><div className="ls-left">Company Generated Lead</div><div className="ls-right">$0.40/watt</div></div>
          <div className="ls-grid-row"><div className="ls-left">SREC Project Filing</div><div className="ls-right">$1,000</div></div>
          <div className="ls-grid-row"><div className="ls-left">REAP Grant Application</div><div className="ls-right">$750 (upfront payment is subtracted once approved)</div></div>
          <div className="ls-grid-row"><div className="ls-left">LightReach</div><div className="ls-right">+$0.10/watt</div></div>
          <div className="ls-grid-row"><div className="ls-left">Domestic Content Package</div><div className="ls-right">$0.30/watt</div></div>
          <div className="ls-grid-row"><div className="ls-left">Midas Wealth: Full Transfer</div><div className="ls-right">$3,000</div></div>
          <div className="ls-grid-row"><div className="ls-left">My Incentives</div><div className="ls-right">$4,000</div></div>
          <div className="ls-grid-row"><div className="ls-left">Credit Repair</div><div className="ls-right">$200</div></div>
        </div>
      </div>
    </InternalFormPageTemplate>
  );
};
