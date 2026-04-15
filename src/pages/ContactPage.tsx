import React, { useRef, useEffect, useState } from 'react';
import { useMutation } from '@animaapp/playground-react-sdk';
import {
  ArrowRight,
  CheckCircle,
  Calendar,
  ShieldCheck,
  CurrencyDollar,
  GitBranch,
  ClipboardText,
  Clock,
  Sparkle,
  SealCheck,
  Users,
  Lightning,
  Lock,
  Buildings,
  ChartLineUp,
  GameController,
} from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Types ─── */
type FormStep = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1 – Identity
  fullName: string;
  email: string;
  company: string;
  role: string;
  // Step 2 – Project Scope
  productScope: string[];
  chainPreference: string[];
  budgetRange: string;
  // Step 3 – Engagement
  engagementType: string[];
  timeline: string;
  ndaRequired: boolean;
  // Step 4 – Details
  message: string;
}

/* ─── Static Data ─── */
const PRODUCT_SCOPES = [
  { id: 'defi', label: 'DeFi Protocol', icon: <ChartLineUp size={18} /> },
  { id: 'gaming', label: 'GameFi / Web3 Gaming', icon: <GameController size={18} /> },
  { id: 'rwa', label: 'Real World Assets', icon: <Buildings size={18} /> },
  { id: 'dao', label: 'DAO / Governance', icon: <Users size={18} /> },
  { id: 'tokenomics', label: 'Token Economics', icon: <CurrencyDollar size={18} /> },
  { id: 'infra', label: 'Chain Infrastructure', icon: <Lightning size={18} /> },
  { id: 'nft', label: 'NFT / Digital Assets', icon: <Sparkle size={18} /> },
  { id: 'other', label: 'Other / Not Sure', icon: <ClipboardText size={18} /> },
];

const CHAINS = [
  'Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Base',
  'Solana', 'Cosmos', 'Avalanche', 'BNB Chain', 'Custom L2',
];

const BUDGET_RANGES = [
  { id: 'under50k', label: 'Under $50K', sub: 'MVP / Proof of Concept' },
  { id: '50k-200k', label: '$50K – $200K', sub: 'Production-ready build' },
  { id: '200k-500k', label: '$200K – $500K', sub: 'Full-scale protocol' },
  { id: '500k-1m', label: '$500K – $1M', sub: 'Enterprise deployment' },
  { id: 'over1m', label: '$1M+', sub: 'Multi-chain ecosystem' },
  { id: 'tbd', label: 'TBD / Raise pending', sub: 'Needs scoping first' },
];

const ENGAGEMENT_TYPES = [
  { id: 'arch', label: 'Architecture Consultation', icon: <GitBranch size={18} /> },
  { id: 'workshop', label: 'Roadmap Workshop', icon: <Calendar size={18} /> },
  { id: 'audit', label: 'Smart Contract Audit', icon: <ShieldCheck size={18} /> },
  { id: 'build', label: 'Full Build Partnership', icon: <Lightning size={18} /> },
  { id: 'tokenomics', label: 'Tokenomics Design', icon: <CurrencyDollar size={18} /> },
  { id: 'advisory', label: 'Ongoing Advisory', icon: <Users size={18} /> },
];

const TIMELINES = [
  { id: 'asap', label: 'ASAP', sub: 'Ready to start immediately' },
  { id: '1m', label: '< 1 Month', sub: 'Early-stage planning' },
  { id: '1-3m', label: '1–3 Months', sub: 'Structured engagement' },
  { id: '3-6m', label: '3–6 Months', sub: 'Long-term build' },
  { id: '6m+', label: '6+ Months', sub: 'Multi-phase roadmap' },
  { id: 'flexible', label: 'Flexible', sub: 'Depends on scope' },
];

const STEPS: { number: FormStep; label: string; icon: React.ReactNode }[] = [
  { number: 1, label: 'Identity', icon: <Users size={16} /> },
  { number: 2, label: 'Project', icon: <ClipboardText size={16} /> },
  { number: 3, label: 'Engagement', icon: <Calendar size={16} /> },
  { number: 4, label: 'Details', icon: <SealCheck size={16} /> },
];

/* ─── Helper: multi-select pill ─── */
function Pill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer ${
        selected
          ? 'border-accent bg-accent/15 text-accent'
          : 'border-border bg-card/40 text-muted-foreground hover:border-accent/50 hover:text-accent'
      }`}
    >
      {children}
    </button>
  );
}

/* ─── Main Page ─── */
export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    role: '',
    productScope: [],
    chainPreference: [],
    budgetRange: '',
    engagementType: [],
    timeline: '',
    ndaRequired: false,
    message: '',
  });

  const { create } = useMutation('ContactSubmission');

  /* ─── Canvas particle network ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes: { x: number; y: number; vx: number; vy: number }[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99,102,241,0.5)';
        ctx.fill();
      });
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99,102,241,${0.18 * (1 - d / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* ─── GSAP scroll animations ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-contact-headline', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.hero-contact-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 });
      gsap.fromTo('.hero-contact-badges', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 });

      gsap.fromTo(
        '.trust-stat',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: trustRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3, scrollTrigger: { trigger: formRef.current, start: 'top 85%' } }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ─── Helpers ─── */
  const toggle = (field: 'productScope' | 'chainPreference' | 'engagementType', value: string) => {
    setFormData(prev => {
      const arr = prev[field] as string[];
      return { ...prev, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const validateStep = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim()) e.fullName = 'Name is required';
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Valid email required';
      if (!formData.company.trim()) e.company = 'Company is required';
    }
    if (currentStep === 2) {
      if (formData.productScope.length === 0) e.productScope = 'Select at least one scope';
      if (!formData.budgetRange) e.budgetRange = 'Select a budget range';
    }
    if (currentStep === 3) {
      if (formData.engagementType.length === 0) e.engagementType = 'Select at least one engagement type';
      if (!formData.timeline) e.timeline = 'Select a timeline';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) setCurrentStep(s => Math.min(s + 1, 4) as FormStep);
  };
  const back = () => setCurrentStep(s => Math.max(s - 1, 1) as FormStep);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      const subject = `Strategy Call — ${formData.engagementType.join(', ')} | Budget: ${formData.budgetRange}`;
      const message = [
        `Company: ${formData.company}`,
        `Role: ${formData.role}`,
        `Product Scope: ${formData.productScope.join(', ')}`,
        `Chains: ${formData.chainPreference.join(', ') || 'TBD'}`,
        `Budget: ${formData.budgetRange}`,
        `Engagement: ${formData.engagementType.join(', ')}`,
        `Timeline: ${formData.timeline}`,
        `NDA Required: ${formData.ndaRequired ? 'Yes' : 'No'}`,
        `\nAdditional Notes:\n${formData.message}`,
      ].join('\n');

      await create({
        fullName: formData.fullName,
        email: formData.email,
        subject,
        message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Input style ─── */
  const inputCls = (err?: string) =>
    `w-full px-4 py-3 rounded-lg bg-card/50 border ${err ? 'border-red-500/70' : 'border-border'} text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent transition-colors duration-200`;

  return (
    <div ref={heroRef} className="min-h-screen bg-background text-foreground">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background photo — strategy / architecture meeting */}
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80&auto=format&fit=crop"
          alt="Strategy session"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-background/82 pointer-events-none" />

        {/* Subtle gradient fade to page background at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

        {/* Particle network on top of the image */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />

        {/* Glowing orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 rounded-full bg-secondary/12 blur-[80px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <div className="hero-contact-badges inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/8 text-accent text-xs font-mono mb-8">
            <Sparkle size={12} weight="fill" />
            Strategy Consultation · Architecture Review · Roadmap Workshop
          </div>

          <h1 className="hero-contact-headline text-5xl lg:text-7xl font-bold font-sans text-foreground leading-[1.05] mb-6">
            Let&#39;s Build Your
            <br />
            <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
              Web3 Vision
            </span>
          </h1>

          <p className="hero-contact-sub text-lg lg:text-xl text-muted-foreground font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us about your project. Our senior architects will review your submission and schedule a tailored strategy session — no sales pitch, just expert guidance.
          </p>

          <div className="hero-contact-badges flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
            {[
              { icon: <Lock size={14} />, text: 'NDA Available' },
              { icon: <Clock size={14} />, text: '48h Response' },
              { icon: <SealCheck size={14} />, text: 'Senior Architects Only' },
              { icon: <ShieldCheck size={14} />, text: 'Confidential Review' },
            ].map(b => (
              <span key={b.text} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-card/50 border border-border text-muted-foreground">
                <span className="text-accent">{b.icon}</span>
                {b.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section ref={trustRef} className="border-y border-border/50 bg-card/20 py-10">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '120+', label: 'Protocols Launched', icon: <Lightning size={20} /> },
            { n: '$2.4B', label: 'TVL Secured', icon: <ChartLineUp size={20} /> },
            { n: '48h', label: 'Avg. First Response', icon: <Clock size={20} /> },
            { n: '94%', label: 'Client Satisfaction', icon: <SealCheck size={20} /> },
          ].map(s => (
            <div key={s.label} className="trust-stat flex flex-col items-center gap-2">
              <span className="text-accent">{s.icon}</span>
              <span className="text-3xl font-bold font-mono text-foreground">{s.n}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Multi-step Form ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-8">

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-0 mb-14">
            {STEPS.map((step, idx) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      currentStep === step.number
                        ? 'border-accent bg-accent text-white'
                        : currentStep > step.number
                        ? 'border-accent/50 bg-accent/20 text-accent'
                        : 'border-border bg-card/40 text-muted'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle size={18} weight="fill" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className={`text-xs font-medium ${currentStep >= step.number ? 'text-accent' : 'text-muted'}`}>
                    {step.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`h-0.5 w-16 mx-1 mb-5 transition-all duration-500 ${currentStep > step.number ? 'bg-accent/50' : 'bg-border'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Form Card */}
          <div ref={formRef} className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-8 lg:p-12">
            {submitted ? (
              /* Success State */
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} weight="fill" className="text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Submission Received</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  Our senior architects will review your project brief and reach out within 48 hours to schedule your strategy session.
                </p>
                {formData.ndaRequired && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm mb-8">
                    <Lock size={16} />
                    NDA request noted — our legal team will send the agreement separately.
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-8">
                  {[
                    { icon: <Clock size={20} />, title: 'Step 1', text: 'Review within 48h by senior architect' },
                    { icon: <Calendar size={20} />, title: 'Step 2', text: 'Strategy call scheduled via Calendly' },
                    { icon: <ArrowRight size={20} />, title: 'Step 3', text: 'Custom roadmap & proposal delivered' },
                  ].map(s => (
                    <div key={s.title} className="p-4 rounded-xl bg-card/40 border border-border/50">
                      <span className="text-accent mb-2 block">{s.icon}</span>
                      <div className="font-semibold text-foreground text-sm mb-1">{s.title}</div>
                      <div className="text-muted-foreground text-xs">{s.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>

                {/* ── Step 1: Identity ── */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about yourself</h2>
                    <p className="text-muted-foreground text-sm mb-8">Your basic details so we can personalize the strategy session.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Full Name *</label>
                        <input
                          className={inputCls(errors.fullName)}
                          placeholder="Satoshi Nakamoto"
                          value={formData.fullName}
                          onChange={e => setFormData(p => ({ ...p, fullName: e.target.value }))}
                        />
                        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Work Email *</label>
                        <input
                          type="email"
                          className={inputCls(errors.email)}
                          placeholder="you@protocol.xyz"
                          value={formData.email}
                          onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Company / Protocol *</label>
                        <input
                          className={inputCls(errors.company)}
                          placeholder="e.g. Aave Labs"
                          value={formData.company}
                          onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                        />
                        {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Your Role</label>
                        <select
                          className={inputCls()}
                          value={formData.role}
                          onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}
                        >
                          <option value="">Select role…</option>
                          {['Founder / CEO', 'CTO / Lead Engineer', 'Product Manager', 'Investor / VC', 'BD / Partnerships', 'Developer', 'Other'].map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 2: Project Scope ── */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Your project scope</h2>
                    <p className="text-muted-foreground text-sm mb-8">Help us understand what you&#39;re building so we can assign the right experts.</p>

                    <div className="mb-8">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Product Scope * <span className="normal-case font-normal text-muted-foreground/70">(select all that apply)</span></label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {PRODUCT_SCOPES.map(s => (
                          <Pill key={s.id} selected={formData.productScope.includes(s.id)} onClick={() => toggle('productScope', s.id)}>
                            <span className="text-accent">{s.icon}</span>
                            {s.label}
                          </Pill>
                        ))}
                      </div>
                      {errors.productScope && <p className="text-red-400 text-xs mt-2">{errors.productScope}</p>}
                    </div>

                    <div className="mb-8">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Chain Preference <span className="normal-case font-normal text-muted-foreground/70">(optional)</span></label>
                      <div className="flex flex-wrap gap-2">
                        {CHAINS.map(c => (
                          <Pill key={c} selected={formData.chainPreference.includes(c)} onClick={() => toggle('chainPreference', c)}>
                            {c}
                          </Pill>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Project Budget Range *</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {BUDGET_RANGES.map(b => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, budgetRange: b.id }))}
                            className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                              formData.budgetRange === b.id
                                ? 'border-accent bg-accent/15'
                                : 'border-border bg-card/40 hover:border-accent/50'
                            }`}
                          >
                            <div className={`font-bold text-sm ${formData.budgetRange === b.id ? 'text-accent' : 'text-foreground'}`}>{b.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{b.sub}</div>
                          </button>
                        ))}
                      </div>
                      {errors.budgetRange && <p className="text-red-400 text-xs mt-2">{errors.budgetRange}</p>}
                    </div>
                  </div>
                )}

                {/* ── Step 3: Engagement ── */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Engagement type &amp; timeline</h2>
                    <p className="text-muted-foreground text-sm mb-8">How do you want to work together, and when do you need to move?</p>

                    <div className="mb-8">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Engagement Type * <span className="normal-case font-normal text-muted-foreground/70">(select all that apply)</span></label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {ENGAGEMENT_TYPES.map(t => (
                          <Pill key={t.id} selected={formData.engagementType.includes(t.id)} onClick={() => toggle('engagementType', t.id)}>
                            <span className="text-accent">{t.icon}</span>
                            {t.label}
                          </Pill>
                        ))}
                      </div>
                      {errors.engagementType && <p className="text-red-400 text-xs mt-2">{errors.engagementType}</p>}
                    </div>

                    <div className="mb-8">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Project Timeline *</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {TIMELINES.map(t => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, timeline: t.id }))}
                            className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                              formData.timeline === t.id
                                ? 'border-accent bg-accent/15'
                                : 'border-border bg-card/40 hover:border-accent/50'
                            }`}
                          >
                            <div className={`font-bold text-sm ${formData.timeline === t.id ? 'text-accent' : 'text-foreground'}`}>{t.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{t.sub}</div>
                          </button>
                        ))}
                      </div>
                      {errors.timeline && <p className="text-red-400 text-xs mt-2">{errors.timeline}</p>}
                    </div>

                    {/* NDA Toggle */}
                    <div className="p-5 rounded-xl border border-border bg-card/40 flex items-start gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, ndaRequired: !p.ndaRequired }))}
                        className={`mt-0.5 w-12 h-6 rounded-full border-2 transition-all duration-300 flex-shrink-0 relative cursor-pointer ${
                          formData.ndaRequired ? 'bg-accent border-accent' : 'bg-card/60 border-border'
                        }`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${formData.ndaRequired ? 'left-6' : 'left-0.5'}`} />
                      </button>
                      <div>
                        <div className="flex items-center gap-2 font-semibold text-sm text-foreground mb-1">
                          <Lock size={16} className="text-accent" />
                          Request NDA Before Sharing Details
                        </div>
                        <p className="text-xs text-muted-foreground">
                          We&#39;ll send a mutual non-disclosure agreement before any sensitive project information is exchanged. Review takes 1–2 business days.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 4: Final Details ── */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Anything else to share?</h2>
                    <p className="text-muted-foreground text-sm mb-8">Optional context that helps us prepare a more tailored strategy for your session.</p>

                    {/* Summary */}
                    <div className="p-5 rounded-xl bg-card/50 border border-border mb-8 space-y-3 text-sm">
                      <h3 className="font-semibold text-foreground text-base mb-4">Your Submission Summary</h3>
                      {[
                        { label: 'Name', value: formData.fullName },
                        { label: 'Company', value: formData.company },
                        { label: 'Scope', value: PRODUCT_SCOPES.filter(s => formData.productScope.includes(s.id)).map(s => s.label).join(', ') || '—' },
                        { label: 'Chains', value: formData.chainPreference.join(', ') || 'TBD' },
                        { label: 'Budget', value: BUDGET_RANGES.find(b => b.id === formData.budgetRange)?.label || '—' },
                        { label: 'Engagement', value: ENGAGEMENT_TYPES.filter(t => formData.engagementType.includes(t.id)).map(t => t.label).join(', ') || '—' },
                        { label: 'Timeline', value: TIMELINES.find(t => t.id === formData.timeline)?.label || '—' },
                        { label: 'NDA', value: formData.ndaRequired ? 'Requested' : 'Not required' },
                      ].map(row => (
                        <div key={row.label} className="flex gap-3">
                          <span className="text-muted-foreground w-24 flex-shrink-0">{row.label}</span>
                          <span className="text-foreground font-medium">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Additional Notes <span className="normal-case font-normal text-muted-foreground/70">(optional)</span></label>
                      <textarea
                        rows={5}
                        className={inputCls() + ' resize-none'}
                        placeholder="Describe your vision, any technical constraints, existing infrastructure, or questions you&#39;d like us to prepare for…"
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-border/50">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={back}
                      className="px-6 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-200 text-sm font-medium cursor-pointer"
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="flex items-center gap-2 px-8 py-3 rounded-lg bg-cta-primary text-cta-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity duration-200 cursor-pointer"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-accent to-secondary text-white font-semibold text-sm hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 cursor-pointer"
                    >
                      {submitting ? 'Sending…' : (
                        <>
                          <SealCheck size={18} />
                          Submit Strategy Request
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── What Happens Next ── */}
      <section className="py-20 bg-card/20 border-t border-border/50">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">What Happens After You Submit</h2>
          <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">No sales funnel. No junior reps. Every submission goes directly to a senior blockchain architect.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: <SealCheck size={24} />, title: 'Expert Review', text: 'A senior architect reads your brief within 48 hours and identifies architecture patterns.' },
              { step: '02', icon: <Lock size={24} />, title: 'NDA (if needed)', text: 'If you requested an NDA, our legal team sends the mutual agreement for e-signature.' },
              { step: '03', icon: <Calendar size={24} />, title: 'Strategy Call', text: 'A focused 60-minute session tailored to your scope — no generic deck, real solutions.' },
              { step: '04', icon: <ArrowRight size={24} />, title: 'Custom Proposal', text: 'We deliver a written architecture plan and project proposal within 5 business days.' },
            ].map(s => (
              <div key={s.step} className="relative p-6 rounded-2xl border border-border bg-card/30 hover:border-accent/40 transition-colors duration-300">
                <div className="absolute -top-3 left-5 text-xs font-mono text-accent/60 bg-background px-2">{s.step}</div>
                <span className="text-accent mb-4 block">{s.icon}</span>
                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
