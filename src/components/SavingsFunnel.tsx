import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, Loader2, MapPin, Phone, ShieldCheck, Sun, Zap, Home as HomeIcon } from 'lucide-react';
import {
  CONSENT_TEXT, CONTACT_OPTIONS, CREDIT_OPTIONS, HOMEOWNER_OPTIONS, SHADE_OPTIONS, US_STATES, formatPhone, validateLead,
} from '../lib/lead-core.js';
import { siteData } from '../data/siteData';

/*
 * Homepage lead funnel: an electric-bill slider with a live utility-cost
 * projection, then ZIP, homeowner, roof shade, credit, address and contact
 * steps. The lead is posted to /api/lead, which forwards it to GoHighLevel's
 * inbound webhook (api/lead.js; field list in docs/ghl-lead-webhook.md).
 */

const BILL_MIN = 50;
const BILL_MAX = 600;
const BILL_STEP = 10;
const BILL_DEFAULT = 200;

// Projection assumptions, stated in the fine print under the calculator.
const RATE_INCREASE = 0.03; // yearly utility rate increase
const PRICE_PER_KWH = 0.14; // $ per kWh
const KWH_PER_KW_YEAR = 1400; // yearly production per installed kW
const YEARS = 25;

const STEP_LABELS = ['Your Bill', 'ZIP', 'Home', 'Roof', 'Credit', 'Address', 'Contact'];
const LAST_STEP = STEP_LABELS.length - 1;

type Lead = {
  zip: string; homeowner: string; shade: string; credit: string; street: string; city: string; state: string;
  firstName: string; lastName: string; phone: string; email: string; contactPreference: string; consent: boolean;
};

const EMPTY_LEAD: Lead = {
  zip: '', homeowner: '', shade: '', credit: '', street: '', city: '', state: '',
  firstName: '', lastName: '', phone: '', email: '', contactPreference: '', consent: false,
};

const inputClass = (error?: string) =>
  `w-full px-5 py-4 rounded-2xl border-2 bg-white font-medium text-brand-dark placeholder:text-brand-dark/30 focus:border-brand-gold focus:outline-none transition-colors ${
    error ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
  }`;

const primaryButton =
  'w-full inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-full font-bold text-[15px] bg-brand-dark text-white hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-brand-dark/20 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:hover:translate-y-0';

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
  const [lead, setLead] = useState<Lead>(EMPTY_LEAD);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [company, setCompany] = useState(''); // honeypot, never shown
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const { yearly, total, systemKw } = useMemo(() => projectUtilityCost(bill), [bill]);
  const billLabel = bill >= BILL_MAX ? `${usd(BILL_MAX)}+` : usd(bill);
  const fill = ((bill - BILL_MIN) / (BILL_MAX - BILL_MIN)) * 100;

  useEffect(() => {
    if (step === LAST_STEP) track('savings_calculator_contact_step', { monthly_bill: bill });
  }, [step]);

  // Bring the new question into view; on a phone the previous step's button
  // sits below it, so without this the change happens off screen.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const card = cardRef.current;
    if (!card) return;
    const top = card.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [step, status]);

  // iOS Safari only moves a range input when the thumb itself is dragged, so
  // set the value from wherever the finger lands and follow it while held.
  const setBillFromPointer = (e: React.PointerEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const thumb = 36; // matches the thumb width in the styles below
    const ratio = Math.min(Math.max((e.clientX - rect.left - thumb / 2) / (rect.width - thumb), 0), 1);
    const raw = BILL_MIN + ratio * (BILL_MAX - BILL_MIN);
    setBill(Math.round(raw / BILL_STEP) * BILL_STEP);
  };

  const next = () => setStep(s => Math.min(s + 1, LAST_STEP));
  const back = () => { setErrors({}); setStatus('idle'); setStep(s => Math.max(s - 1, 0)); };

  const set = <K extends keyof Lead>(key: K, value: Lead[K]) => {
    setLead(prev => ({ ...prev, [key]: value }));
    setErrors(prev => {
      if (!prev[key]) return prev;
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const choose = (key: 'homeowner' | 'shade' | 'credit', value: string) => {
    set(key, value);
    setTimeout(next, 300);
  };

  // Validate this step's fields; advance when they pass.
  const advance = (fields: (keyof Lead)[]) => {
    const found = validateLead(lead, fields);
    setErrors(found);
    if (Object.keys(found).length === 0) next();
  };

  const submit = async () => {
    const found = validateLead({ ...lead, monthlyBill: bill });
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, monthlyBill: bill, company, pageUrl: window.location.href }),
      });
      if (!res.ok) throw new Error(String(res.status));
      track('generate_lead', { monthly_bill: bill, contact_preference: lead.contactPreference });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  // A plain function (not a component) so inputs keep focus while typing.
  const textField = (
    key: 'street' | 'city' | 'zip' | 'firstName' | 'lastName' | 'phone' | 'email',
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <label className="block text-left">
      <span className="block text-sm font-bold text-brand-dark/70 mb-1.5 ml-1">{label}</span>
      <input
        value={lead[key]}
        onChange={e => set(key, key === 'phone' ? formatPhone(e.target.value) : key === 'zip' ? e.target.value.replace(/\D/g, '').slice(0, 5) : e.target.value)}
        aria-invalid={Boolean(errors[key])}
        className={inputClass(errors[key])}
        {...props}
      />
      {errors[key] && <span className="block text-sm text-red-500 mt-1.5 ml-1 font-medium">{errors[key]}</span>}
    </label>
  );

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
            Slide to your average monthly electric bill, answer a few quick questions, and we'll build your custom solar quote.
          </p>
        </div>

        <div ref={cardRef} className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
          {/* Progress */}
          <div className="px-8 md:px-14 pt-10">
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-brand-gold"
                animate={{ width: status === 'done' ? '100%' : `${((step + 1) / STEP_LABELS.length) * 100}%` }}
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
              {status === 'done' ? 'Request sent' : `Step ${step + 1} of ${STEP_LABELS.length} · ${STEP_LABELS[step]}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={status === 'done' ? 'done' : step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ── STEP 1: Bill slider ── */}
              {status === 'done' && (
                <div className="p-8 md:p-14 max-w-xl mx-auto text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-brand-dark" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4 tracking-tight">You're all set, {lead.firstName.trim()}!</h3>
                  <p className="text-lg text-brand-dark/60 leading-relaxed font-medium">
                    A Logic Solar specialist will {lead.contactPreference === 'Text' ? 'text' : 'call'} you at {lead.phone} to go over
                    your custom solar quote.
                  </p>
                </div>
              )}

              {status !== 'done' && step === 0 && (
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
              {status !== 'done' && step === 1 && (
                <div className="p-8 md:p-14 max-w-xl mx-auto text-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2 tracking-tight">What is your ZIP code?</h3>
                  <p className="text-brand-dark/50 font-medium mb-8">Incentives and utility rules depend on where you live.</p>
                  <form noValidate onSubmit={e => { e.preventDefault(); advance(['zip']); }}>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      placeholder="ZIP code"
                      aria-label="ZIP code"
                      value={lead.zip}
                      onChange={e => set('zip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                      className={`w-full px-6 py-5 rounded-full border-2 bg-white text-center text-xl font-bold tracking-[0.3em] text-brand-dark placeholder:tracking-normal placeholder:font-medium placeholder:text-brand-dark/25 focus:border-brand-gold focus:outline-none transition-colors ${
                        errors.zip ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                      }`}
                    />
                    {errors.zip && <p className="text-sm text-red-500 mt-2 font-medium">{errors.zip}</p>}
                    <button type="submit" className={`mt-6 ${primaryButton}`}>
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* ── STEP 3: Homeowner ── */}
              {status !== 'done' && step === 2 && (
                <div className="p-8 md:p-14 max-w-xl mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
                    <HomeIcon className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 tracking-tight text-center">Do you own your home?</h3>
                  <div className="space-y-3">
                    {HOMEOWNER_OPTIONS.map(opt => (
                      <Pill key={opt} label={opt} selected={lead.homeowner === opt} onClick={() => choose('homeowner', opt)} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 4: Shade ── */}
              {status !== 'done' && step === 3 && (
                <div className="p-8 md:p-14 max-w-xl mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
                    <Sun className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8 tracking-tight text-center">How much shade does your roof get?</h3>
                  <div className="space-y-3">
                    {SHADE_OPTIONS.map(opt => (
                      <Pill key={opt} label={opt} selected={lead.shade === opt} onClick={() => choose('shade', opt)} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 5: Credit ── */}
              {status !== 'done' && step === 4 && (
                <div className="p-8 md:p-14 max-w-xl mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2 tracking-tight text-center">Is your credit score above 640?</h3>
                  <p className="text-brand-dark/50 font-medium mb-8 text-center">It helps us show you the right financing options. This doesn't affect your score.</p>
                  <div className="space-y-3">
                    {CREDIT_OPTIONS.map(opt => (
                      <Pill key={opt} label={opt} selected={lead.credit === opt} onClick={() => choose('credit', opt)} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 6: Address ── */}
              {status !== 'done' && step === 5 && (
                <div className="p-8 md:p-14 max-w-xl mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2 tracking-tight text-center">What is your address?</h3>
                  <p className="text-brand-dark/50 font-medium mb-8 text-center">We use it to look at your roof and design your system.</p>
                  <form noValidate className="space-y-4" onSubmit={e => { e.preventDefault(); advance(['street', 'city', 'state', 'zip']); }}>
                    {textField('street', 'Street address', { autoComplete: 'address-line1', placeholder: '123 Main St' })}
                    {textField('city', 'City', { autoComplete: 'address-level2' })}
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block text-left">
                        <span className="block text-sm font-bold text-brand-dark/70 mb-1.5 ml-1">State</span>
                        <select
                          value={lead.state}
                          onChange={e => set('state', e.target.value)}
                          autoComplete="address-level1"
                          aria-invalid={Boolean(errors.state)}
                          className={inputClass(errors.state)}
                        >
                          <option value="">Select</option>
                          {US_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                        </select>
                        {errors.state && <span className="block text-sm text-red-500 mt-1.5 ml-1 font-medium">{errors.state}</span>}
                      </label>
                      {textField('zip', 'ZIP code', { autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 5 })}
                    </div>
                    <button type="submit" className={`mt-2 ${primaryButton}`}>
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* ── STEP 7: Contact ── */}
              {status !== 'done' && step === 6 && (
                <div className="p-8 md:p-14 max-w-xl mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/15 flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-7 h-7 text-brand-dark" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2 tracking-tight text-center">Where should we send your quote?</h3>
                  <p className="text-brand-dark/50 font-medium mb-8 text-center">Last step. A Logic Solar specialist will reach out with your real numbers.</p>
                  <form noValidate className="space-y-4" onSubmit={e => { e.preventDefault(); submit(); }}>
                    <div className="grid grid-cols-2 gap-4">
                      {textField('firstName', 'First name', { autoComplete: 'given-name' })}
                      {textField('lastName', 'Last name', { autoComplete: 'family-name' })}
                    </div>
                    {textField('phone', 'Phone number', { type: 'tel', autoComplete: 'tel-national', inputMode: 'tel', placeholder: '(555) 555-5555' })}
                    {textField('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}

                    <fieldset className="pt-2">
                      <legend className="block text-sm font-bold text-brand-dark/70 mb-2 ml-1">Do you prefer a text or a phone call?</legend>
                      <div className="grid grid-cols-2 gap-3">
                        {CONTACT_OPTIONS.map(opt => (
                          <button
                            key={opt}
                            type="button"
                            aria-pressed={lead.contactPreference === opt}
                            onClick={() => set('contactPreference', opt)}
                            className={`px-4 py-4 rounded-full border-2 font-semibold text-[15px] transition-all cursor-pointer ${
                              lead.contactPreference === opt
                                ? 'border-brand-gold bg-brand-gold/15 text-brand-dark'
                                : errors.contactPreference
                                  ? 'border-red-300 bg-red-50/50 text-brand-dark/70'
                                  : 'border-gray-100 bg-white hover:border-brand-gold/40 text-brand-dark/70'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {errors.contactPreference && <span className="block text-sm text-red-500 mt-1.5 ml-1 font-medium">{errors.contactPreference}</span>}
                    </fieldset>

                    {/* Honeypot: hidden from people, filled in by bots. */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="absolute -left-[9999px] w-px h-px opacity-0"
                    />

                    <label className="flex gap-3 items-start text-left pt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={lead.consent}
                        onChange={e => set('consent', e.target.checked)}
                        className="mt-1 w-5 h-5 shrink-0 accent-[#1b2a33]"
                      />
                      <span className="text-[11px] leading-relaxed text-brand-dark/55">{CONSENT_TEXT}</span>
                    </label>
                    {errors.consent && <p className="text-sm text-red-500 font-medium">{errors.consent}</p>}

                    {status === 'error' && (
                      <p role="alert" className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 font-medium">
                        We couldn't send your request. Please try again, or call us at{' '}
                        <a className="underline font-bold" href={`tel:${siteData.contact.phone.replace(/\D/g, '')}`}>{siteData.contact.phone}</a>.
                      </p>
                    )}

                    <button type="submit" disabled={status === 'sending'} className={`mt-2 ${primaryButton}`}>
                      {status === 'sending'
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                        : <>Get My Free Quote <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Back + trust line */}
          <div className="px-8 md:px-14 pb-10 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-50">
            {step > 0 && status !== 'done' ? (
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
