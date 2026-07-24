import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ═══════════════════════════════════════════════════════════
   Types & Constants
   ═══════════════════════════════════════════════════════════ */

interface FormData {
  powerBill: string;
  roofShade: string;
  homeowner: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

const INITIAL_DATA: FormData = {
  powerBill: '', roofShade: '', homeowner: '',
  firstName: '', lastName: '', phone: '', address: '',
};

type View = 'intro' | 'funnel' | 'success';

/* ── Reusable glass card style ── */
const GLASS: React.CSSProperties = {
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.42)',
  boxShadow: '0 30px 80px rgba(15,23,42,0.08)',
};

/* ── Solar BG style ── */
const SOLAR_BG: React.CSSProperties = {
  background: `
    radial-gradient(circle at top left, rgba(250,204,21,0.22), transparent 34%),
    radial-gradient(circle at top right, rgba(251,191,36,0.16), transparent 32%),
    radial-gradient(circle at bottom left, rgba(255,247,237,0.95), transparent 36%),
    linear-gradient(135deg, #fffdf7 0%, #f8fafc 45%, #fff7ed 100%)
  `,
};

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */

export const SolarLanding: React.FC = () => {
  const [view, setView] = useState<View>('intro');
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Scroll card into view on step/view change */
  useEffect(() => {
    if (view === 'funnel' || view === 'success') {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [step, view]);

  /* ── Helpers ── */
  const progress = (step / 4) * 100;

  const selectOption = (field: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    setError('');
    // Auto-advance after showing selection highlight
    setTimeout(() => setStep(s => Math.min(s + 1, 4)), 320);
  };

  const goNext = () => {
    if (step === 1 && !data.powerBill) { setError('Please select an option to continue.'); return; }
    if (step === 2 && !data.roofShade) { setError('Please select an option to continue.'); return; }
    if (step === 3 && !data.homeowner) { setError('Please select an option to continue.'); return; }
    setError('');
    if (step < 4) setStep(s => s + 1);
  };

  const goBack = () => {
    setError('');
    if (step > 1) setStep(s => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }
    // ─────────────────────────────────────────────────────────
    // 🔌 WEBHOOK / DATABASE CONNECTION POINT
    //
    // Option A — GoHighLevel Webhook:
    // fetch('https://services.leadconnectorhq.com/hooks/YOUR_HOOK_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    //
    // Option B — Zapier Webhook:
    // fetch('https://hooks.zapier.com/hooks/catch/YOUR_ZAP_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    //
    // Option C — Supabase Insert:
    // const supabase = createClient(URL, KEY);
    // await supabase.from('solar_leads').insert([data]);
    // ─────────────────────────────────────────────────────────
    console.log('Logic Solar Funnel Submission:', data);
    setView('success');
  };

  /* ── Transition config ── */
  const fadeSlide = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -18 },
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  };

  /* ── Option pill ── */
  const OptionBtn = ({ label, selected, onClick, className = '' }: { label: string; selected: boolean; onClick: () => void; className?: string; key?: string }) => (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full border-2 px-6 py-[18px] text-center font-bold text-[15px] transition-all duration-250 ${
        selected
          ? 'bg-yellow-400 border-yellow-400 text-gray-900 shadow-[0_14px_40px_rgba(234,179,8,0.22)] -translate-y-0.5 scale-[1.02]'
          : 'bg-white border-gray-200 text-gray-700 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300'
      } ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen text-gray-900 overflow-x-hidden font-sans" style={SOLAR_BG}>

      <main className="min-h-screen flex items-center justify-center px-5 py-12 md:py-16">
        <section className="w-full max-w-5xl mx-auto">

          {/* ═══ TOP HEADER — only visible during intro ═══ */}
          <AnimatePresence>
            {view === 'intro' && (
              <motion.div
                key="header"
                className="text-center mb-8 md:mb-12"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, height: 0, marginBottom: 0, overflow: 'hidden' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/50 px-5 py-2 shadow-lg shadow-black/5 mb-6">
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700 tracking-wide">Logic Solar Savings Assessment</span>
                </div>

                <h1 className="text-[2rem] sm:text-4xl md:text-[3.5rem] font-black tracking-tight text-gray-950 leading-[1.12]">
                  See If Solar Makes Sense<br className="hidden md:block" />
                  {' '}For Your Home
                </h1>

                <p className="mt-4 md:mt-5 text-base md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                  Answer a few quick questions and get a custom solar design built around your home, roof, and monthly power bill.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══ CARDS ═══ */}
          <div ref={cardRef}>
            <AnimatePresence mode="wait">

              {/* ── INTRO CARD ── */}
              {view === 'intro' && (
                <motion.div
                  key="intro"
                  {...fadeSlide}
                  className="rounded-[2rem] p-10 md:p-14 max-w-2xl mx-auto text-center"
                  style={GLASS}
                >
                  {/* Sun icon */}
                  <div className="h-16 w-16 rounded-full bg-yellow-400 mx-auto flex items-center justify-center mb-7 shadow-xl shadow-yellow-400/25">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0-1.414-1.414M7.05 7.05 5.636 5.636M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
                    </svg>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
                    Get Your Free Solar Quote
                  </h2>

                  <p className="mt-4 text-gray-500 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                    This takes less than 60 seconds. No pressure, just a personalized look at your potential solar savings.
                  </p>

                  <button
                    onClick={() => setView('funnel')}
                    className="mt-9 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gray-950 px-10 py-4.5 text-white font-bold text-base shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300/40 cursor-pointer"
                  >
                    Start My Assessment
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0-5 5m5-5H6" />
                    </svg>
                  </button>

                  {/* Trust micro-signals */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                    {['🔒 Secure & Private', '⏱ Under 60 Seconds', '✓ No Obligation'].map((t, i) => (
                      <span key={i} className="text-xs font-semibold text-gray-400 tracking-wide">{t}</span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── FUNNEL CARD ── */}
              {view === 'funnel' && (
                <motion.div
                  key="funnel"
                  {...fadeSlide}
                  className="rounded-[2rem] p-6 sm:p-8 md:p-12 max-w-3xl mx-auto"
                  style={GLASS}
                >
                  {/* ── Progress ── */}
                  <div className="mb-8 md:mb-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-gray-700">Step {step} of 4</span>
                      <span className="text-sm font-semibold text-gray-400">Free Solar Design</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/70 rounded-full overflow-hidden border border-white/60">
                      <motion.div
                        className="h-full bg-yellow-400 rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">

                      {/* ── STEP 1: Power Bill ── */}
                      {step === 1 && (
                        <motion.div key="s1" {...fadeSlide}>
                          <div className="text-center mb-8 md:mb-10">
                            <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-2xl">⚡</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-950">
                              What is your average monthly power bill?
                            </h2>
                            <p className="mt-3 text-gray-500 text-sm md:text-base">
                              This helps us estimate your potential savings and system size.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-xl mx-auto">
                            {['Under $100', '$100 - $150', '$150 - $250', '$250+'].map(opt => (
                              <OptionBtn key={opt} label={opt} selected={data.powerBill === opt} onClick={() => selectOption('powerBill', opt)} />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 2: Roof Shade ── */}
                      {step === 2 && (
                        <motion.div key="s2" {...fadeSlide}>
                          <div className="text-center mb-8 md:mb-10">
                            <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-2xl">☀️</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-950">
                              How much shade does your roof get?
                            </h2>
                            <p className="mt-3 text-gray-500 text-sm md:text-base">
                              Sun exposure is one of the biggest factors in solar performance.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-xl mx-auto">
                            {['No Shade', 'Partial Shade', 'Heavy Shade'].map(opt => (
                              <OptionBtn key={opt} label={opt} selected={data.roofShade === opt} onClick={() => selectOption('roofShade', opt)} />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 3: Homeowner ── */}
                      {step === 3 && (
                        <motion.div key="s3" {...fadeSlide}>
                          <div className="text-center mb-8 md:mb-10">
                            <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-2xl">🏡</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-950">
                              Are you the current homeowner?
                            </h2>
                            <p className="mt-3 text-gray-500 text-sm md:text-base">
                              Homeownership helps us determine available solar options.
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 md:gap-5 max-w-md mx-auto">
                            {['Yes', 'No'].map(opt => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectOption('homeowner', opt)}
                                className={`cursor-pointer rounded-[1.5rem] border-2 px-8 py-7 font-black text-2xl text-center transition-all duration-250 ${
                                  data.homeowner === opt
                                    ? 'bg-yellow-400 border-yellow-400 text-gray-900 shadow-[0_14px_40px_rgba(234,179,8,0.22)] -translate-y-0.5 scale-[1.02]'
                                    : 'bg-white border-gray-200 text-gray-900 hover:-translate-y-1 hover:shadow-lg hover:border-gray-300'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 4: Contact Form ── */}
                      {step === 4 && (
                        <motion.div key="s4" {...fadeSlide}>
                          <div className="text-center mb-8">
                            <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center">
                              <span className="text-2xl">📍</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-950">
                              Where should we send your custom solar design?
                            </h2>
                            <p className="mt-3 text-gray-500 text-sm md:text-base">
                              Enter your details and the Logic Solar team will prepare your free quote.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-xl mx-auto">
                            <input
                              type="text" placeholder="First Name" required
                              value={data.firstName}
                              onChange={e => setData(p => ({ ...p, firstName: e.target.value }))}
                              className="rounded-full bg-white/90 border border-gray-200 px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-yellow-500/85 focus:shadow-[0_0_0_4px_rgba(250,204,21,0.18)] transition-all"
                            />
                            <input
                              type="text" placeholder="Last Name" required
                              value={data.lastName}
                              onChange={e => setData(p => ({ ...p, lastName: e.target.value }))}
                              className="rounded-full bg-white/90 border border-gray-200 px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-yellow-500/85 focus:shadow-[0_0_0_4px_rgba(250,204,21,0.18)] transition-all"
                            />
                            <input
                              type="tel" placeholder="Phone Number" required
                              value={data.phone}
                              onChange={e => setData(p => ({ ...p, phone: e.target.value }))}
                              className="rounded-full bg-white/90 border border-gray-200 px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-yellow-500/85 focus:shadow-[0_0_0_4px_rgba(250,204,21,0.18)] transition-all sm:col-span-2"
                            />
                            <input
                              type="text" placeholder="Home Address" required
                              value={data.address}
                              onChange={e => setData(p => ({ ...p, address: e.target.value }))}
                              className="rounded-full bg-white/90 border border-gray-200 px-5 py-4 text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-yellow-500/85 focus:shadow-[0_0_0_4px_rgba(250,204,21,0.18)] transition-all sm:col-span-2"
                            />
                          </div>

                          <div className="max-w-xl mx-auto">
                            <button
                              type="submit"
                              className="mt-5 w-full rounded-full bg-yellow-400 px-8 py-4.5 font-black text-gray-950 shadow-xl shadow-yellow-400/25 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-500 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-300/50 cursor-pointer text-[15px]"
                            >
                              Get My Free Quote →
                            </button>

                            <p className="mt-3 text-center text-xs text-gray-400">
                              🔒 Your info is secure · By submitting you agree to be contacted by Logic Solar.
                            </p>
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>

                    {/* ── Back / Next ── */}
                    <div className="mt-8 flex items-center justify-between gap-4">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={goBack}
                          className="rounded-full bg-white/80 border border-gray-200 px-6 py-3 font-bold text-sm text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:text-gray-900 cursor-pointer"
                        >
                          ← Back
                        </button>
                      ) : <div />}

                      {step < 4 && (
                        <button
                          type="button"
                          onClick={goNext}
                          className="ml-auto rounded-full bg-gray-950 px-8 py-3 font-bold text-sm text-white shadow-xl shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl cursor-pointer"
                        >
                          Next →
                        </button>
                      )}
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="mt-5 text-center text-sm font-semibold text-red-500"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </form>
                </motion.div>
              )}

              {/* ── SUCCESS CARD ── */}
              {view === 'success' && (
                <motion.div
                  key="success"
                  {...fadeSlide}
                  className="rounded-[2rem] p-10 md:p-16 max-w-2xl mx-auto text-center"
                  style={GLASS}
                >
                  <div className="h-16 w-16 rounded-full bg-yellow-400 mx-auto flex items-center justify-center mb-7 shadow-xl shadow-yellow-400/25">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                    </svg>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black text-gray-950 tracking-tight">
                    You're All Set
                  </h2>

                  <p className="mt-4 text-gray-500 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                    Thanks. Your information has been received and your custom solar quote request is ready for follow-up.
                  </p>

                  {/* Trust reinforcement */}
                  <div className="mt-8 pt-7 border-t border-gray-100">
                    <p className="text-sm text-gray-400 font-semibold">
                      A Logic Solar advisor will contact you within 24 hours.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                      {['🔒 100% Secure', '⭐ 4.9/5 Rating', '📋 Custom Design'].map((t, i) => (
                        <span key={i} className="text-xs font-semibold text-gray-400 tracking-wide">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </section>
      </main>
    </div>
  );
};
