import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Send, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface FunnelData {
  monthlyBill: string;
  homeowner: string;
  reason: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

const STEP_LABELS = ['Power Bill', 'Homeowner', 'Motivation', 'Contact'];

const BILL_OPTIONS = ['Under $100', '$100 – $150', '$150 – $250', '$250+'];

const REASON_OPTIONS = [
  'Lower my monthly power bill',
  'Protect against rising energy costs',
  'Add backup power / battery storage',
  "Increase my home's long-term value",
];

export const SolarFunnel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [data, setData] = useState<FunnelData>({
    monthlyBill: '', homeowner: '', reason: '',
    firstName: '', lastName: '', phone: '', address: '',
  });

  const progress = ((step + 1) / 4) * 100;

  const selectAndAdvance = useCallback((field: keyof FunnelData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    // Auto-advance after a brief moment so user sees their selection
    setTimeout(() => setStep(s => Math.min(s + 1, 3)), 350);
  }, []);

  const validateStep4 = (): boolean => {
    const newErrors: Record<string, boolean> = {};
    if (!data.firstName.trim()) newErrors.firstName = true;
    if (!data.lastName.trim()) newErrors.lastName = true;
    if (!data.phone.trim()) newErrors.phone = true;
    if (!data.address.trim()) newErrors.address = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep4()) return;

    // ─────────────────────────────────────────────────────────
    // 🔌 WEBHOOK / DATABASE CONNECTION POINT
    //
    // Option A: GoHighLevel Webhook
    // await fetch('https://services.leadconnectorhq.com/hooks/YOUR_HOOK_ID', {
    //   method: 'POST', headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    //
    // Option B: Zapier Webhook
    // await fetch('https://hooks.zapier.com/hooks/catch/YOUR_ZAP_ID', {
    //   method: 'POST', headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    //
    // Option C: Supabase Insert
    // import { createClient } from '@supabase/supabase-js';
    // const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // await supabase.from('solar_leads').insert([data]);
    // ─────────────────────────────────────────────────────────
    console.log('📋 Solar Lead Submission:', data);
    setSubmitted(true);
  };

  /* ═══ SUCCESS STATE ═══ */
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-16 px-6"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4 tracking-tight">
          You're All Set
        </h2>
        <p className="text-lg text-brand-dark/55 mb-10 max-w-md mx-auto leading-relaxed">
          Thanks. Your information has been received and your custom solar quote request is ready for follow-up.
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-brand-dark/35 font-semibold">
          <ShieldCheck className="w-4 h-4" /> Your information is 100% secure and never shared.
        </div>
      </motion.div>
    );
  }

  /* ═══ PILL BUTTON HELPER ═══ */
  const PillOption = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-full px-6 py-5 rounded-full border-2 text-left font-semibold text-[15px] transition-all duration-250 cursor-pointer ${
        selected
          ? 'border-brand-gold bg-brand-gold/15 text-brand-dark shadow-lg shadow-brand-gold/10 scale-[1.02]'
          : 'border-gray-100 bg-white/80 hover:border-brand-gold/40 hover:bg-brand-gold/5 text-brand-dark/70'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* ── Header ── */}
      <div className="text-center mb-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-brand-dark/40 hover:text-brand-dark font-semibold mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to homepage
        </button>
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-brand-dark flex items-center justify-center">
            <Zap className="w-4 h-4 text-brand-gold" />
          </div>
          <span className="text-sm font-extrabold text-brand-dark tracking-tight">Logic Solar</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark tracking-tight mb-1">
          Your Free Solar Assessment
        </h2>
        <p className="text-brand-dark/40 text-sm font-medium">
          Step {step + 1} of 4
        </p>
      </div>

      {/* ── Progress Bar ── */}
      <div className="mb-12">
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-brand-gold"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-3 px-1">
          {STEP_LABELS.map((label, i) => (
            <span
              key={i}
              className={`text-[11px] font-bold transition-colors duration-300 ${
                i <= step ? 'text-brand-dark' : 'text-brand-dark/20'
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Step Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── STEP 1: Monthly Bill ── */}
          {step === 0 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-8 text-center">
                What is your average monthly power bill?
              </h3>
              <div className="space-y-3">
                {BILL_OPTIONS.map(opt => (
                  <PillOption
                    key={opt}
                    label={opt}
                    selected={data.monthlyBill === opt}
                    onClick={() => selectAndAdvance('monthlyBill', opt)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Homeowner ── */}
          {step === 1 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-8 text-center">
                Are you the current homeowner?
              </h3>
              <div className="space-y-3">
                {['Yes', 'No'].map(opt => (
                  <PillOption
                    key={opt}
                    label={opt}
                    selected={data.homeowner === opt}
                    onClick={() => selectAndAdvance('homeowner', opt)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 3: Reason ── */}
          {step === 2 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-8 text-center">
                What is your main reason for looking into solar?
              </h3>
              <div className="space-y-3">
                {REASON_OPTIONS.map(opt => (
                  <PillOption
                    key={opt}
                    label={opt}
                    selected={data.reason === opt}
                    onClick={() => selectAndAdvance('reason', opt)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 4: Contact Info ── */}
          {step === 3 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-2 text-center">
                Where should we send your custom solar design?
              </h3>
              <p className="text-sm text-brand-dark/40 mb-8 text-center font-medium">
                We'll never spam you or share your information.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={data.firstName}
                      onChange={e => { setData(p => ({ ...p, firstName: e.target.value })); setErrors(p => ({ ...p, firstName: false })); }}
                      className={`w-full px-5 py-4 rounded-2xl border-2 bg-white/80 focus:border-brand-gold focus:outline-none font-medium text-brand-dark placeholder:text-brand-dark/25 transition-colors ${
                        errors.firstName ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                      }`}
                    />
                    {errors.firstName && <p className="text-xs text-red-400 mt-1.5 ml-2 font-medium">Required</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={data.lastName}
                      onChange={e => { setData(p => ({ ...p, lastName: e.target.value })); setErrors(p => ({ ...p, lastName: false })); }}
                      className={`w-full px-5 py-4 rounded-2xl border-2 bg-white/80 focus:border-brand-gold focus:outline-none font-medium text-brand-dark placeholder:text-brand-dark/25 transition-colors ${
                        errors.lastName ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                      }`}
                    />
                    {errors.lastName && <p className="text-xs text-red-400 mt-1.5 ml-2 font-medium">Required</p>}
                  </div>
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={data.phone}
                    onChange={e => { setData(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: false })); }}
                    className={`w-full px-5 py-4 rounded-2xl border-2 bg-white/80 focus:border-brand-gold focus:outline-none font-medium text-brand-dark placeholder:text-brand-dark/25 transition-colors ${
                      errors.phone ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1.5 ml-2 font-medium">Required</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Home Address"
                    value={data.address}
                    onChange={e => { setData(p => ({ ...p, address: e.target.value })); setErrors(p => ({ ...p, address: false })); }}
                    className={`w-full px-5 py-4 rounded-2xl border-2 bg-white/80 focus:border-brand-gold focus:outline-none font-medium text-brand-dark placeholder:text-brand-dark/25 transition-colors ${
                      errors.address ? 'border-red-300 bg-red-50/50' : 'border-gray-100'
                    }`}
                  />
                  {errors.address && <p className="text-xs text-red-400 mt-1.5 ml-2 font-medium">Required</p>}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between mt-12">
        {step > 0 ? (
          <button
            onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-brand-dark/50 hover:text-brand-dark hover:bg-gray-50 transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <div />
        )}

        {step === 3 && (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-[15px] bg-brand-dark text-white hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-brand-dark/20 transition-all duration-300 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Get My Free Quote
          </button>
        )}
      </div>

      {/* ── Trust footer ── */}
      <p className="text-center text-xs text-brand-dark/30 font-medium mt-10 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5" /> 100% Free · No Obligation · Your data is secure
      </p>
    </div>
  );
};
