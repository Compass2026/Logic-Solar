import React from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';
import { FileText, ExternalLink, Zap, Battery, Home, ClipboardList } from 'lucide-react';

/* ─────────────────────────────────────────────
   SCOPED CSS — Logic Solar brand palette only
   Gold: #f9cd0d  |  Dark: #1b2a33  |  Steel: #254350
───────────────────────────────────────────── */
const adderStyles = `
  /* ── Layout shell ── */
  .ps-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    width: 100%;
  }

  /* ── Category card ── */
  .ps-card {
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #e8e8e8;
    box-shadow: 0 2px 14px rgba(27, 42, 51, 0.06);
  }

  /* ── Category header ── */
  .ps-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    background: #1b2a33;
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .ps-header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: #f9cd0d;
    color: #1b2a33;
    flex-shrink: 0;
  }

  /* ── Row ── */
  .ps-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    padding: 9px 18px;
    border-bottom: 1px solid #efefef;
    font-size: 13.5px;
    line-height: 1.4;
    color: #3a4a54;
    transition: background 0.12s;
  }

  .ps-row:last-child {
    border-bottom: none;
  }

  /* Zebra stripe — alternating very-light-gray */
  .ps-row:nth-child(even) {
    background: #f8f9fa;
  }

  .ps-row:nth-child(odd) {
    background: #ffffff;
  }

  .ps-name {
    flex: 1;
    min-width: 0;
  }

  .ps-note {
    display: block;
    font-size: 11px;
    color: #8a98a0;
    font-weight: 400;
    margin-top: 1px;
  }

  .ps-price {
    flex-shrink: 0;
    font-weight: 700;
    font-size: 13px;
    color: #1b2a33;
    text-align: right;
    white-space: nowrap;
  }

  /* Accent bar at bottom of price for standout items */
  .ps-price.gold {
    color: #b89100;
  }

  /* ── Datasheet button row ── */
  .ps-datasheet-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  /* ── Responsive: collapse to 1 column on mobile ── */
  @media (max-width: 860px) {
    .ps-wrapper {
      grid-template-columns: 1fr;
    }
  }
`;

/* ─────────────────────────────────────────────
   DATA — four categorized sections
───────────────────────────────────────────── */
const categories = [
  {
    id: 'electrical',
    icon: <Zap size={14} strokeWidth={2.5} />,
    label: 'Electrical & Upgrades',
    items: [
      { name: 'Main Panel Upgrade', price: '$3,500' },
      { name: 'Full Service Upgrade', price: '$5,000' },
      { name: 'Manual Transfer Switch', price: '$1,500' },
      { name: 'Meter Combination', price: '$3,000' },
      { name: 'Meter Relocation', price: '$1,500' },
      { name: 'Meter Upgrade', price: '$3,000' },
      { name: 'Multi-Meter Installation', price: '$0.40/watt' },
      { name: 'EV Charger', price: '$1,500', note: '+ Cost of Charger' },
      { name: 'LightReach', price: '+$0.10/watt' },
      { name: 'Domestic Content Package', price: '$0.30/watt' },
    ],
  },
  {
    id: 'battery',
    icon: <Battery size={14} strokeWidth={2.5} />,
    label: 'Battery & Storage Options',
    items: [
      { name: 'Tesla Powerwall 3', price: '$13,500', note: '+$1,500 if battery only' },
      { name: 'Enphase Encharge IQ 10', price: '$13,500', note: '+$1,500 if battery only' },
      { name: 'Enphase Encharge IQ 5', price: '$9,000', note: '+$1,500 if battery only' },
      { name: 'Franklin aPower 2 Battery', price: '$14,500', note: '+$1,500 if battery only' },
      { name: 'Generac 24KW Generator', price: '$14,500', note: 'Excludes gas line & hookup' },
    ],
  },
  {
    id: 'structural',
    icon: <Home size={14} strokeWidth={2.5} />,
    label: 'Structural & Site Adders',
    items: [
      { name: 'Ground Mount Installation', price: '$0.35/watt', note: '+ Trenching' },
      { name: 'Trenching', price: '$20/ft' },
      { name: 'Detach & Reset of Panels', price: '$400/panel' },
      { name: 'Tile / Flat Roof / Ballast System', price: '$0.25/watt' },
      { name: 'Solar Panel Critter Guard', price: '$20/ft' },
    ],
  },
  {
    id: 'admin',
    icon: <ClipboardList size={14} strokeWidth={2.5} />,
    label: 'Admin, Fees & Misc.',
    items: [
      { name: 'Project Site Surveys / Trip Charges / Truck Rolls', price: '$500' },
      { name: 'Small System Adder (4KW–6KW)', price: '$1,500', note: 'Must be within 100 mi of metro areas' },
      { name: 'Small System Adder (4KW or less)', price: '$2,500', note: 'Must be within 100 mi of metro areas' },
      { name: 'Company Generated Lead', price: '$0.40/watt' },
      { name: 'SREC Project Filing', price: '$1,000' },
      { name: 'REAP Grant Application', price: '$750', note: 'Upfront — subtracted once approved' },
      { name: 'Midas Wealth: Full Transfer', price: '$3,000' },
      { name: 'My Incentives', price: '$4,000' },
      { name: 'Credit Repair', price: '$200' },
    ],
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export const AddersPage = () => {
  return (
    <InternalFormPageTemplate
      title="Solar Deal Adders & Pricing Schedule"
      subtitle="Categorized pricing reference for Logic Solar sales representatives."
      eyebrow="Internal Pricing Reference"
      maxWidth="max-w-7xl"
    >
      <style dangerouslySetInnerHTML={{ __html: adderStyles }} />

      {/* ── Enphase Datasheet CTA ── */}
      <div className="ps-datasheet-row">
        <a
          href="https://drive.google.com/drive/folders/1MojkRTOp4RYET6emBY12B3rurmHS3kvP"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border-2 border-brand-gold/40 hover:border-brand-gold shadow-sm hover:shadow-md transition-all group cursor-pointer text-brand-dark"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="flex items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-brand-gold"
            style={{ width: 36, height: 36, background: 'rgba(249,205,13,0.15)' }}
          >
            <FileText size={16} />
          </div>
          <div className="text-left">
            <span style={{ display: 'block', fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(27,42,51,0.4)', marginBottom: 1 }}>
              Datasheet
            </span>
            <span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>Enphase IQ8MC</span>
          </div>
          <ExternalLink size={14} style={{ color: 'rgba(27,42,51,0.25)', marginLeft: 4 }} className="group-hover:text-brand-gold transition-colors" />
        </a>
      </div>

      {/* ── Two-column pricing grid ── */}
      <div className="ps-wrapper">
        {categories.map((cat) => (
          <div key={cat.id} className="ps-card">
            {/* Header */}
            <div className="ps-header">
              <span className="ps-header-icon">{cat.icon}</span>
              {cat.label}
            </div>

            {/* Rows */}
            {cat.items.map((item, idx) => (
              <div key={idx} className="ps-row">
                <span className="ps-name">
                  {item.name}
                  {item.note && <span className="ps-note">{item.note}</span>}
                </span>
                <span className="ps-price">{item.price}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </InternalFormPageTemplate>
  );
};
