import React, { useState } from 'react';
import { InternalFormPageTemplate } from '../components/InternalFormPageTemplate';
import { FileText, ExternalLink, Zap, Battery, Home, ClipboardList, Droplets, Layers, Sun, Cpu, X, Download, Award } from 'lucide-react';

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

  /* ── Equipment Stack Shell ── */
  .eq-stack-wrapper {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid #e8e8e8;
    box-shadow: 0 2px 14px rgba(27, 42, 51, 0.06);
    margin-bottom: 24px;
  }

  .eq-stack-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 16px;
  }

  .eq-card {
    background: #f8f9fa;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .eq-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 12px;
  }

  .eq-card-title {
    font-size: 13px;
    font-weight: 800;
    color: #1b2a33;
    letter-spacing: -0.01em;
  }

  .eq-badge {
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 999px;
    background: #e2e8f0;
    color: #334155;
  }

  .eq-badge.feoc {
    background: #dbeafe;
    color: #1e40af;
  }

  .eq-badge.domestic {
    background: #fef3c7;
    color: #92400e;
  }

  .eq-item {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 10px 12px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .eq-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 5px 10px;
    border-radius: 6px;
    background: #1b2a33;
    color: #ffffff;
    font-size: 10px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all 0.15s;
  }

  .eq-btn:hover {
    background: #f9cd0d;
    color: #1b2a33;
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

  /* ── Datasheet button row ── */
  .ps-datasheet-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }

  /* ── Responsive: collapse to 1 column on mobile ── */
  @media (max-width: 860px) {
    .ps-wrapper, .eq-stack-grid {
      grid-template-columns: 1fr;
    }
  }
`;

interface EquipmentSpec {
  id: string;
  type: 'Modules' | 'Inverters';
  model: string;
  fullTitle: string;
  manufacturer: string;
  specSheetName: string;
  specSheetUrl: string;
  badge?: string;
  specsSummary: {
    powerOutput: string;
    efficiency: string;
    warranty: string;
    technology: string;
    dimensions?: string;
    voltage?: string;
    certifications?: string;
  };
}

interface EquipmentStackCategory {
  id: string;
  name: string;
  badge: string;
  badgeClass: string;
  description: string;
  items: EquipmentSpec[];
}

const EQUIPMENT_STACKS: EquipmentStackCategory[] = [
  {
    id: 'standard',
    name: 'Standard Equipment',
    badge: 'STANDARD TIER',
    badgeClass: 'eq-badge',
    description: 'High-efficiency Tier 1 baseline equipment stack',
    items: [
      {
        id: 'ja455',
        type: 'Modules',
        model: 'JA 455',
        fullTitle: 'JA Solar JAM54D40 455/LB',
        manufacturer: 'JA Solar',
        specSheetName: 'JAM54D40 LB n-type Double Glass Bifacial Datasheet',
        specSheetUrl: 'https://www.jasolar.com',
        badge: 'Bifacial n-Type',
        specsSummary: {
          powerOutput: '455 Watt (STC)',
          efficiency: '22.3% Module Efficiency',
          warranty: '12-Yr Product / 30-Yr Linear (0.4% annual)',
          technology: 'n-type Double Glass Bifacial MBB Half-Cell',
          dimensions: '1762 × 1134 × 30 mm (22 kg)',
          certifications: 'IEC 61215, IEC 61730, UL 61215, ISO 9001',
        },
      },
      {
        id: 'iq8mc_std',
        type: 'Inverters',
        model: 'IQ8MC',
        fullTitle: 'Enphase IQ8MC Microinverter',
        manufacturer: 'Enphase Energy',
        specSheetName: 'IQ8MC-72-M-US North America Datasheet',
        specSheetUrl: 'https://enphase.com',
        badge: '330 VA Peak',
        specsSummary: {
          powerOutput: '330 VA Peak AC Output',
          efficiency: '97.0% CEC Weighted Efficiency',
          warranty: '25-Year Industry-Leading Warranty',
          technology: 'Grid-Agile Microgrid-Forming Microinverter',
          voltage: '240 VAC Split-Phase / 208 VAC Single-Phase',
          certifications: 'UL 1741-SA / SB (IEEE 1547-2018), CA Rule 21',
        },
      },
    ],
  },
  {
    id: 'feoc',
    name: 'FEOC Equipment',
    badge: 'FEOC COMPLIANT',
    badgeClass: 'eq-badge feoc',
    description: 'Foreign Entity of Concern compliant supply chain stack',
    items: [
      {
        id: 'hyundai435',
        type: 'Modules',
        model: 'Mission / Hyundai 435',
        fullTitle: 'HD Hyundai HiN-T435NF(BK)',
        manufacturer: 'HD Hyundai Energy Solutions',
        specSheetName: 'HD Hyundai NF(BK) Series TOPCon Datasheet',
        specSheetUrl: 'https://eng.hd-hyundaies.co.kr',
        badge: 'FEOC TOPCon',
        specsSummary: {
          powerOutput: '435 Watt (BNPI 482W Rear Gain)',
          efficiency: '22.28% High Efficiency',
          warranty: '25-Yr Product / 30-Yr Performance (87.4%)',
          technology: 'N-Type TOPCon 108 Half-Cut Bifacial (Full Black)',
          dimensions: '1722 × 1134 × 30 mm (24.5 kg)',
          certifications: 'UL 61730, IEC 61701, IEC 62716, ISO 9001',
        },
      },
      {
        id: 'iq8mc_feoc',
        type: 'Inverters',
        model: 'IQ8MC',
        fullTitle: 'Enphase IQ8MC Microinverter',
        manufacturer: 'Enphase Energy',
        specSheetName: 'IQ8MC-72-M-US North America Datasheet',
        specSheetUrl: 'https://enphase.com',
        badge: '330 VA Peak',
        specsSummary: {
          powerOutput: '330 VA Peak AC Output',
          efficiency: '97.0% CEC Weighted Efficiency',
          warranty: '25-Year Industry-Leading Warranty',
          technology: 'Grid-Agile Microgrid-Forming Microinverter',
          voltage: '240 VAC Split-Phase / 208 VAC Single-Phase',
          certifications: 'UL 1741-SA / SB (IEEE 1547-2018), CA Rule 21',
        },
      },
    ],
  },
  {
    id: 'domestic',
    name: 'Domestic Equipment',
    badge: '100% DOMESTIC CONTENT',
    badgeClass: 'eq-badge domestic',
    description: 'US-manufactured stack eligible for IRA Domestic Content Adder',
    items: [
      {
        id: 'sirius450',
        type: 'Modules',
        model: 'Sirius 450',
        fullTitle: 'Sirius PV ELNSM54M-HC-N 450W',
        manufacturer: 'Sirius PV / ELIN',
        specSheetName: 'Sirius 182mm N-Type Series Module Datasheet',
        specSheetUrl: 'https://www.siriuspv.com',
        badge: 'Domestic PV',
        specsSummary: {
          powerOutput: '450 Watt (STC)',
          efficiency: '23.05% Module Efficiency',
          warranty: '25-Yr Product Guarantee / 25-Yr Linear Power',
          technology: '182mm N-Type MBB Monocrystalline PV',
          dimensions: '1722 × 1134 × 35 mm (21.5 kg)',
          certifications: 'UL 61730-1/2, IEC 61215, ISO 9001/14001',
        },
      },
      {
        id: 'iq8hc_dom',
        type: 'Inverters',
        model: 'IQ8HC',
        fullTitle: 'Enphase IQ8HC-72-M-DOM-US',
        manufacturer: 'Enphase Energy',
        specSheetName: 'IQ8HC Domestic Content Bonus SKU Datasheet',
        specSheetUrl: 'https://enphase.com',
        badge: 'Domestic ITC Adder',
        specsSummary: {
          powerOutput: '384 VA Peak AC Output',
          efficiency: '97.0% CEC Weighted Efficiency',
          warranty: '25-Year Industry-Leading Warranty',
          technology: 'US-Assembled PCBA & Enclosure Microinverter',
          voltage: '240 VAC Split-Phase / 208 VAC Single-Phase',
          certifications: 'IRA Domestic Content Eligible, UL 1741-SB',
        },
      },
    ],
  },
];

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
      { name: 'Meter Riser Upgrade', price: '$1,500' },
      { name: 'Multi-Meter Installation', price: '$0.40/watt' },
      { name: 'EV Charger', price: '$1,500', note: '+ Cost of Charger' },
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
      { name: 'FEOC Content Package', price: '$0.10/watt' },
      { name: 'Domestic Content Package', price: '$0.30/watt' },
    ],
  },
  {
    id: 'home-services',
    icon: <Droplets size={14} strokeWidth={2.5} />,
    label: 'Home Services',
    items: [
      { name: 'Water Softener', price: '$3,500' },
    ],
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export const AddersPage = () => {
  const [activeSpecSheet, setActiveSpecSheet] = useState<EquipmentSpec | null>(null);

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
              Google Drive Folder
            </span>
            <span style={{ display: 'block', fontSize: 14, fontWeight: 700 }}>All Equipment Datasheets</span>
          </div>
          <ExternalLink size={14} style={{ color: 'rgba(27,42,51,0.25)', marginLeft: 4 }} className="group-hover:text-brand-gold transition-colors" />
        </a>
      </div>

      {/* ── EQUIPMENT STACK SECTION ── */}
      <div className="eq-stack-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1b2a33', color: '#f9cd0d', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 800 }}>
            <Layers size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', color: '#1b2a33', margin: 0, letterSpacing: '-0.01em' }}>
              Equipment Stack
            </h3>
            <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>
              Approved module and inverter tier configurations with spec sheets
            </p>
          </div>
        </div>

        {/* 3 Subcategory Cards Grid */}
        <div className="eq-stack-grid">
          {EQUIPMENT_STACKS.map((stack) => (
            <div key={stack.id} className="eq-card">
              <div>
                {/* Header */}
                <div className="eq-card-header">
                  <span className="eq-card-title">{stack.name}</span>
                  <span className={stack.badgeClass}>{stack.badge}</span>
                </div>

                {/* Items */}
                {stack.items.map((spec) => (
                  <div key={spec.id} className="eq-item">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                        {spec.type === 'Modules' ? (
                          <Sun size={12} style={{ color: '#d97706' }} />
                        ) : (
                          <Cpu size={12} style={{ color: '#2563eb' }} />
                        )}
                        <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
                          {spec.type}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#1b2a33', fontFamily: 'monospace' }}>
                        {spec.model}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveSpecSheet(spec)}
                      className="eq-btn"
                    >
                      <FileText size={11} />
                      <span>Spec Sheet</span>
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: 10, borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', fontSize: 10, color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Award size={12} style={{ color: '#eab308' }} /> Approved Tier
                </span>
              </div>
            </div>
          ))}
        </div>
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

      {/* ── SPEC SHEET MODAL ── */}
      {activeSpecSheet && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
          <div style={{ width: '100%', maxWidth: 540, background: '#1b2a33', border: '1px solid #254350', borderRadius: 20, padding: 24, color: '#ffffff', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setActiveSpecSheet(null)}
              style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: '#254350', color: '#ffffff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}
            >
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f9cd0d', color: '#1b2a33', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 900 }}>
                <FileText size={22} />
              </div>
              <div>
                <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#f9cd0d' }}>
                  Official Datasheet • {activeSpecSheet.manufacturer}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', color: '#ffffff', margin: 0, lineHeight: 1.2 }}>
                  {activeSpecSheet.fullTitle}
                </h3>
              </div>
            </div>

            <div style={{ background: '#254350', padding: 12, borderRadius: 10, fontSize: 12, color: '#e2e8f0', marginBottom: 20, display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
              <span>📄 {activeSpecSheet.specSheetName}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {Object.entries(activeSpecSheet.specsSummary).map(([key, val]) => (
                <div key={key} style={{ background: '#121e24', padding: 12, borderRadius: 10, border: '1px solid #254350' }}>
                  <span style={{ display: 'block', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 2 }}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#ffffff' }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href={activeSpecSheet.specSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, padding: '12px 16px', background: '#f9cd0d', color: '#1b2a33', borderRadius: 10, fontWeight: 800, fontSize: 12, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyCenter: 'center', gap: 6 }}
              >
                <Download size={14} /> Open Datasheet PDF
              </a>
              <button
                type="button"
                onClick={() => setActiveSpecSheet(null)}
                style={{ padding: '12px 20px', background: '#254350', color: '#ffffff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </InternalFormPageTemplate>
  );
};
