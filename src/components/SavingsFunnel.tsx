import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, MapPin, ShieldCheck, Sun, Zap, Home as HomeIcon } from 'lucide-react';

/*
 * Homepage lead funnel: an electric-bill slider with a live utility-cost
 * projection, three short qualifying steps, then Logic's existing
 * GoHighLevel quote form ("Google ads 1 Form") prefilled from the answers,
 * so every lead still lands in GoHighLevel exactly as it does today.
 *
 * GoHighLevel prefills a form field from the iframe URL's query string,
 * keyed by the field's query key (the form's `data-q` attributes).
 */

const GHL_FORM_ID = 'jXEWmVgfutwbzVW9JGIu';
const GHL_FORM_URL = `https://link.logic-solar.com/widget/form/${GHL_FORM_ID}`;

const BILL_MIN = 50;
const BILL_MAX = 600;
const BILL_STEP = 10;
const BILL_DEFAULT = 200;

// Projection assumptions, stated in the fine print under the calculator.
const RATE_INCREASE = 0.03; // yearly utility rate increase
const PRICE_PER_KWH = 0.14; // $ per kWh
const KWH_PER_KW_YEAR = 1400; // yearly production per installed kW
const YEARS = 25;

const SHADE_OPTIONS = ['No shade', 'A little shade', 'A lot of shade', 'Not sure'];

const STEP_LABELS = ['Your Bill', 'Location', 'Homeowner', 'Roof', 'Your Quote'];

const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function projectUtilityCost(monthlyBill: number) {
  const yearly = monthlyBill * 12;
  let total = 0;
  for (let y = 0; y < YEARS; y++) total += yearly * Math.pow(1 + RATE_INCREASE, y);
  const systemKw = (yearly / PRICE_PER_KWH) / KWH_PER_KW_YEAR;
  return { yearly, total, systemKw };
}

const track = (event: string, params: Record<string, unknown> = {}) => {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.('event', event, params);
};

export const SavingsFunnel = () => {
  const [step, setStep] = useState(0);
  const [bill, setBill] = useState(BILL_DEFAULT);
  const [zip, setZip] = useState('');
  const [zipError, setZipError] = useState(false);
  const [homeowner, setHomeowner] = useState('');
  const [shade, setShade] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const { yearly, total, systemKw } = useMemo(() => projectUtilityCost(bill), [bill]);
  const billLabel = bill >= BILL_MAX ? `${usd(BILL_MAX)}+` : usd(bill);
  const fill = ((bill - BILL_MIN) / (BILL_MAX - BILL_MIN)) * 100;

  const formSrc = useMemo(() => {
    const params = new URLSearchParams({
      average_monthly_utility_bill: String(bill),
      postal_code: zip,
      'please_add_any_other_information_that_you_think_we_should_know?':
        `Homepage savings calculator. Monthly bill: ${billLabel}. Homeowner: ${homeowner}. Roof shade: ${shade}.`,
    });
    return `${GHL_FORM_URL}?${params.toString()}`;
  }, [bill, billLabel, zip, homeowner, shade]);

  // GoHighLevel's embed script sizes the iframe; load it once the form shows.
  useEffect(() => {
    if (step !== 4) return;
    const script = document.createElement('script');
    script.src = 'https://link.logic-solar.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    track('savings_calculator_contact_step', { monthly_bill: bill });
    return () => {
      document.body.removeChild(script);
    };
  }, [step]);

  // Bring the new question into view; on a phone the previous step's button
  // sits below it, so without this the change happens off screen.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const card = cardRef.current;
    if (!card) return;
    const top = card.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [step]);

  // iOS Safari only moves a range input when the thumb itself is dragged, so
  // set the value from wherever the finger lands and follow it while held.
  const setBillFromPointer = (e: React.PointerEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const thumb = 36; // matches the thumb width in the styles below
    const ratio = Math.min(Math.max((e.clientX - rect.left - thumb / 2) / (rect.width - thumb), 0), 1);
    const raw = BILL_MIN + ratio * (BILL_MAX - BILL_MIN);
    setBill(Math.round(raw / BILL_STEP) * BILL_STEP);
  };

  const next = () => setStep(s => Math.min(s + 1, 4));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const choose = (setter: (v: string) => void, value: string) => {
    setter(value);
    setTimeout(next, 300);
  };

  const submitZip = () => {
    if (!/^\d{5}$/.test(zip)) {
      setZipError(true);
      return;
    }
    next();
  };

  const Pill = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void; key?: string }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-6 py-5 rounded-full border-2 text-left font-semibold text-[15px] transition-all duration-200 cursor-pointer ${
        selected
          ? 'border-brand-gold bg-brand-gold/15 text-brand-dark shadow-lg shadow-brand-gold/10'
          : 'border-gray-100 bg-white hover:border-brand-gold/40 hover:bg-brand-gold/5 text-brand-dark/70'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="quote-form" className="section-padding bg-gray-50 relative overflow-hidden scroll-mt-24">
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-brand-gold/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] bg-brand-teal/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-dark text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">
            <Zap className="w-3 h-3 text-brand-gold" />
            Free Savings Estimate
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-dark mb-6 tracking-tight leading-[1.1]">
            What Is Your Power Bill <span className="text-brand-gold">Really Costing You?</span>
          </h2>
          <p className="text-xl text-brand-dark/60 leading-relaxed font-medium">
            Slide to your average monthly electric bill, answer three quick questions, and we'll build your custom solar quote.
          </p>
        </div>

        <div ref={cardRef} className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
          {/* Progress */}
          <div className="px-8 md:px-14 pt-10">
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-brand-gold"
                animate={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <div className="hidden sm:flex justify-between mt-3 px-1">
              {STEP_LABELS.map((label, i) => (
                <span
                  key={label}
                  className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    i <= step ? 'text-brand-dark' : 'text-brand-dark/25'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="sm:hidden mt-3 text-xs font-bold text-brand-dark/50">
              Step {step + 1} of {STEP_LABELS.length} · {STEP_LABELS[step]}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ── STEP 1: Bill slider ── */}
              {step === 0 && (
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-3 p-8 md:p-14">
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2 tracking-tight">
                      What is your average monthly electric bill?
                    </h3>
                    <p className="text-brand-dark/50 font-medium mb-12">Drag the slider. A rough number is fine.</p>

                    <div className="text-center mb-8">
                      <span className="text-6xl md:text-7xl font-black text-brand-dark tracking-tight tabular-nums">
                        {billLabel}
                      </span>
                      <span className="text-lg font-bold text-brand-dark/40 ml-2">/ month</span>
                    </div>

                    <input
                      type="range"
                      min={BILL_MIN}
                      max={BILL_MAX}
                      step={BILL_STEP}
                      value={bill}
                      onChange={e => setBill(Number(e.target.value))}
                      onPointerDown={e => {
                        if (e.pointerType !== 'touch') return;
                        e.currentTarget.setPointerCapture(e.pointerId);
                        setBillFromPointer(e);
                      }}
                      onPointerMove={e => {
                        if (e.pointerType === 'touch' && e.currentTarget.hasPointerCapture(e.pointerId)) setBillFromPointer(e);
                      }}
                      aria-label="Average monthly electric bill"
                      aria-valuetext={`${billLabel} per month`}
                      className="bill-slider w-full"
                      style={{ '--fill': `${fill}%` } as React.CSSProperties}
                    />
                    <div className="flex justify-between mt-3 text-xs font-bold text-brand-dark/40">
                      <span>{usd(BILL_MIN)}</span>
                      <span>{usd(BILL_MAX)}+</span>
                    </div>

                    <div className="lg:hidden mt-8 rounded-3xl bg-brand-dark text-white p-6 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-white/40 mb-1">Per year</p>
                        <p className="text-2xl font-black tabular-nums">{usd(yearly)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-white/40 mb-1">Over 25 years</p>
                        <p className="text-2xl font-black text-brand-gold tabular-nums">{usd(total)}</p>
                      </div>
                      <p className="col-span-2 text-xs text-white/50">
                        Paid to the utility · est. system ≈ {systemKw.toFixed(1)} kW
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => { track('savings_calculator_start', { monthly_bill: bill }); next(); }}
                      className="mt-12 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-full font-bold text-[15px] bg-brand-dark text-white hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-brand-dark/20 transition-all duration-300 cursor-pointer"
                    >
                      See My Solar Options <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="hidden lg:flex lg:col-span-2 bg-brand-dark text-white p-8 md:p-14 flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="relative space-y-8">
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40 mb-2">You pay the utility each year</p>
                        <p className="text-4xl font-black tabular-nums">{usd(yearly)}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40 mb-2">Over the next 25 years</p>
                        <p className="text-5xl font-black text-brand-gold tabular-nums">{usd(total)}</p>
                        <p className="text-sm text-white/50 mt-2">That's money you rent power with and never get back.</p>
                      </div>
                      <div className="pt-8 border-t border-white/10">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/40 mb-2">Estimated system size</p>
                        <p className="text-3xl font-black tabular-nums">≈ {systemKw.toFixed(1)} kW</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 2: ZIP ── */}
              {step === 1 && (
                <div className="p-8 md:p-14 max-w-xl mx-auto text-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2 tracking-tight">What is your ZIP code?</h3>
                  <p className="text-brand-dark/50 font-medium mb-8">Incentives and utility rules depend on where you live.</p>
                  <form onSubmit={e => { e.preventDefault(); submitZip(); }}>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      placeholder="ZIP code"
                      value={zip}
                      onChange={e => { setZip(e.target.value.replace(/\D/g, '')); setZipError(false); }}
                      className={`w-full px-6 py-5 rounded-full border-2 bg-white text-center text-xl font-bold tracking-[0.3em] text-brand-dark placeholder:tracking-normal placeholder:font-medium placeholder:text-brand-dark/25 focus:border-brand-gold focus:outline-none transition-colors ${
                        zipError ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                      }`}
                    />
                    {zipError && <p className="text-sm text-red-400 mt-2 font-medium">Enter a 5-digit ZIP code.</p>}
                    <button
                      type="submit"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-full font-bold text-[15px] bg-brand-dark text-white hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-brand-dark/20 transition-all duration-300 cursor-pointer"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* ── STEP 3: Homeowner ── */}
              {step === 2 && (
                <div className="p-8 md:p-14 max-w-xl mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
                    <HomeIcon className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 tracking-tight text-center">Do you own your home?</h3>
                  <div className="space-y-3">
                    {['Yes, I own my home', 'No, I rent'].map(opt => (
                      <Pill key={opt} label={opt} selected={homeowner === opt} onClick={() => choose(setHomeowner, opt)} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 4: Shade ── */}
              {step === 3 && (
                <div className="p-8 md:p-14 max-w-xl mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
                    <Sun className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 tracking-tight text-center">How much shade does your roof get?</h3>
                  <div className="space-y-3">
                    {SHADE_OPTIONS.map(opt => (
                      <Pill key={opt} label={opt} selected={shade === opt} onClick={() => choose(setShade, opt)} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 5: Contact (GoHighLevel form) ── */}
              {step === 4 && (
                <div className="grid lg:grid-cols-5">
                  <div className="order-2 lg:order-1 lg:col-span-2 bg-brand-gold p-8 md:p-12 flex flex-col justify-between gap-10">
                    <div>
                      <h3 className="text-3xl font-extrabold text-brand-dark mb-4 leading-tight tracking-tight">
                        Last step: where should we send your quote?
                      </h3>
                      <p className="text-brand-dark/70 font-medium leading-relaxed">
                        A Logic Solar specialist will design a system around your actual usage and walk you through your real numbers.
                      </p>
                    </div>
                    <dl className="space-y-4 text-brand-dark">
                      {[
                        ['Monthly bill', billLabel],
                        ['ZIP code', zip],
                        ['Homeowner', homeowner],
                        ['Roof shade', shade],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4 border-b border-brand-dark/10 pb-3">
                          <dt className="font-semibold text-brand-dark/60">{k}</dt>
                          <dd className="font-bold text-right">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-3 p-4 lg:p-8 min-h-[911px]">
                    <iframe
                      src={formSrc}
                      style={{ width: '100%', height: '911px', border: 'none', borderRadius: '3px' }}
                      id={`inline-${GHL_FORM_ID}`}
                      data-layout="{'id':'INLINE'}"
                      data-trigger-type="alwaysShow"
                      data-trigger-value=""
                      data-activation-type="alwaysActivated"
                      data-activation-value=""
                      data-deactivation-type="neverDeactivate"
                      data-deactivation-value=""
                      data-form-name="Google ads 1 Form"
                      data-height="911"
                      data-layout-iframe-id={`inline-${GHL_FORM_ID}`}
                      data-form-id={GHL_FORM_ID}
                      title="Get your free solar quote"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Back + trust line */}
          <div className="px-8 md:px-14 pb-10 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-50">
            {step > 0 ? (
              <button
                type="button"
                onClick={back}
                className="flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm text-brand-dark/50 hover:text-brand-dark hover:bg-gray-50 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <span />}
            <p className="text-xs text-brand-dark/40 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% free · No obligation · Your information is never sold
            </p>
          </div>
        </div>

        <p className="max-w-5xl mx-auto mt-6 text-[11px] leading-relaxed text-brand-dark/40 text-center">
          Estimates only. The projection assumes your bill stays the same apart from 3% yearly utility rate increases; system size assumes
          14¢ per kWh and 1,400 kWh produced per installed kW each year. Your actual system design and savings are based on your last
          12 months of usage, your roof and your utility's rates and buyback rules.
        </p>
      </div>

      <style>{`
        .bill-slider {
          -webkit-appearance: none;
          appearance: none;
          box-sizing: content-box;
          height: 12px;
          padding: 14px 0; /* a 40px touch target around the 12px track */
          background-clip: content-box;
          border-radius: 9999px;
          background: linear-gradient(to right, #f9cd0d 0%, #f9cd0d var(--fill), #eef0f2 var(--fill), #eef0f2 100%) content-box;
          cursor: pointer;
          outline: none;
          touch-action: none;
          -webkit-tap-highlight-color: transparent;
        }
        .bill-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          background: #1b2a33;
          border: 6px solid #f9cd0d;
          box-shadow: 0 8px 20px rgba(27, 42, 51, 0.25);
          transition: transform 0.15s ease;
        }
        .bill-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 9999px;
          background: #1b2a33;
          border: 6px solid #f9cd0d;
          box-shadow: 0 8px 20px rgba(27, 42, 51, 0.25);
        }
        .bill-slider:active::-webkit-slider-thumb { transform: scale(1.12); }
        .bill-slider:focus-visible::-webkit-slider-thumb { outline: 3px solid rgba(249, 205, 13, 0.5); outline-offset: 3px; }
      `}</style>
    </section>
  );
};
