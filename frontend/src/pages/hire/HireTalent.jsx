import React, { useRef, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { ArrowRight, ArrowRightIcon, BadgeCheckIcon, BriefcaseIcon, ClockIcon, LogInIcon, SparklesIcon, UsersIcon, XIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetMyApplicationQuery } from '@/features/recruiter/api/recruiterAapplicationsApi.js'

const steps = [
    { step: '01', title: 'Requirement Deep-Dive', desc: 'We understand your role, tech stack, budget, and culture before sourcing.' },
    { step: '02', title: 'Curated Candidate Pool', desc: 'Only pre-screened and relevant candidates reach your inbox.' },
    { step: '03', title: 'Interview & Closure Support', desc: 'We assist through interviews, feedback loops, and final hiring.' }
]

const processSteps = [
    { title: '1. Role Understanding', desc: 'We align on responsibilities, experience levels, and culture fit requirements.' },
    { title: '2. Candidate Sourcing', desc: 'We pull talent from our network, job portals, and internal pipelines.' },
    { title: '3. Pre-Screening', desc: 'Every candidate is evaluated on skills, communication, and relevance.' },
    { title: '4. Shortlist Delivery', desc: 'You receive only top-tier candidates — no flooding, no irrelevant profiles.' },
    { title: '5. Interview Coordination', desc: 'We handle scheduling, follow-ups, expectations, and candidate experience.' },
    { title: '6. Offer & Joining Support', desc: 'Smooth closing, negotiation support, and joining follow-ups.' }
]

// ── Auth prompt modal ──
const AuthPromptModal = ({ onClose, onLogin, onRegister }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
        />
        <div className="relative z-10 w-full max-w-sm border border-border rounded-2xl bg-background shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/40 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Get started</p>
                    <h3 className="text-sm font-semibold text-foreground mt-0.5">Join as a Recruiter</h3>
                </div>
                <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <XIcon className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
            </div>
            <div className="px-6 py-5 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    To request hiring support, you need a <span className="font-semibold text-foreground">Job Aspirations recruiter account</span>. It
                    only takes a minute to set up.
                </p>
                <div className="space-y-2">
                    {['Post jobs and manage applications', 'Access pre-screened candidates', 'Get dedicated hiring support'].map((item) => (
                        <div
                            key={item}
                            className="flex items-center gap-2.5 text-xs text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {item}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2 pt-2">
                    <Button
                        size="lg"
                        className="w-full gap-2"
                        onClick={onRegister}>
                        <SparklesIcon className="w-4 h-4" />
                        Create recruiter account
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="w-full gap-2"
                        onClick={onLogin}>
                        <LogInIcon className="w-4 h-4" />
                        Log in to existing account
                    </Button>
                </div>
            </div>
        </div>
    </div>
)

// ── Pending notice modal ──
const PendingNotice = ({ onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
        />
        <div className="relative z-10 w-full max-w-sm border border-border rounded-2xl bg-background shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/40 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Application status</p>
                    <h3 className="text-sm font-semibold text-foreground mt-0.5">Under Review</h3>
                </div>
                <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <XIcon className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
            </div>
            <div className="px-6 py-5 space-y-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto">
                    <ClockIcon className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-center space-y-1">
                    <p className="text-sm font-semibold text-foreground">Application Submitted</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Your recruiter application is <span className="font-semibold text-foreground">under review</span>. We'll notify you once admin
                        approves it.
                    </p>
                </div>
                <Button
                    size="lg"
                    className="w-full"
                    onClick={onClose}>
                    Got it
                </Button>
            </div>
        </div>
    </div>
)

export default function HireTalent() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const processRef = useRef(null)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [showPendingNotice, setShowPendingNotice] = useState(false)

    const { data } = useGetMyApplicationQuery(undefined, {
        skip: !user // don't call API if not logged in
    })
    const applicationStatus = data?.application?.status // 'pending' | 'approved' | 'rejected' | undefined

    const handlePrimaryCTA = () => {
        if (!user) {
            setShowAuthModal(true)
            return
        }
        if (user.role === 'recruiter') {
            navigate('/recruiter/dashboard')
            return
        }
        if (applicationStatus === 'pending') {
            setShowPendingNotice(true)
            return
        }
        // rejected or never applied — let them apply
        navigate('/become-recruiter')
    }

    const scrollToProcess = () => {
        processRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const getPrimaryLabel = () => {
        if (!user) return 'Request hiring support'
        if (user.role === 'recruiter') return 'Go to Dashboard'
        if (applicationStatus === 'pending') return 'Application Under Review'
        return 'Request hiring support'
    }

    return (
        <main className="bg-background">
            {/* Modals */}
            {showAuthModal && (
                <AuthPromptModal
                    onClose={() => setShowAuthModal(false)}
                    onLogin={() => {
                        setShowAuthModal(false)
                        navigate('/login', { state: { redirect: '/become-recruiter' } })
                    }}
                    onRegister={() => {
                        setShowAuthModal(false)
                        navigate('/register', { state: { redirect: '/become-recruiter' } })
                    }}
                />
            )}
            {showPendingNotice && <PendingNotice onClose={() => setShowPendingNotice(false)} />}

            {/* ── HERO ── */}
            <section className="relative overflow-hidden border-b border-border bg-muted/40">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-0 h-full w-px bg-border opacity-50" />
                    <div className="absolute left-0 top-[40%] w-full h-px bg-border opacity-30" />
                    <div className="absolute -right-14 -top-14 w-64 h-64 rounded-full border border-border opacity-40" />
                    <div className="absolute -right-4 -top-4 w-40 h-40 rounded-full border border-border opacity-30" />
                    <div
                        className="absolute left-6 bottom-5 w-16 h-12 opacity-[.08]"
                        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)', backgroundSize: '10px 10px' }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-7">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full border border-primary/20">
                            <BriefcaseIcon className="w-3 h-3" />
                            Hiring Consultancy + Job Platform
                        </div>

                        <div>
                            <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground">
                                Hiring is about
                                <br />
                                building teams.
                            </h1>
                            <p className="text-lg font-semibold text-primary mt-2">Not just filling roles.</p>
                        </div>

                        <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
                            We help startups and growing companies hire the right talent through curated candidates, expert screening, and hands-on
                            hiring guidance.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-1">
                            <Button
                                size="lg"
                                onClick={handlePrimaryCTA}
                                disabled={applicationStatus === 'pending'}
                                className="gap-2 cursor-pointer">
                                {getPrimaryLabel()}
                                {applicationStatus !== 'pending' && <ArrowRightIcon className="w-4 h-4" />}
                                {applicationStatus === 'pending' && <ClockIcon className="w-4 h-4" />}
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="gap-2 cursor-pointer"
                                onClick={scrollToProcess}>
                                Our process
                                <ArrowRight size={16} />
                            </Button>
                        </div>

                        {/* Status badges */}
                        {user?.role === 'recruiter' && (
                            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-500/20">
                                <BadgeCheckIcon className="w-3.5 h-3.5" />
                                You're an active recruiter on this platform
                            </div>
                        )}
                        {applicationStatus === 'pending' && (
                            <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-yellow-500/20">
                                <ClockIcon className="w-3.5 h-3.5" />
                                Application submitted — pending admin approval
                            </div>
                        )}
                        {applicationStatus === 'rejected' && (
                            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-red-500/20">
                                <XIcon className="w-3.5 h-3.5" />
                                Application rejected — you can reapply
                            </div>
                        )}
                    </div>

                    {/* RIGHT — vertical steps card */}
                    <div className="bg-background border border-border rounded-2xl p-7 space-y-0">
                        <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase mb-5">How we work</p>
                        {steps.map((item, i) => (
                            <div
                                key={item.step}
                                className="flex gap-4 items-start relative">
                                {i < steps.length - 1 && <div className="absolute left-[13px] top-7 w-px h-[calc(100%-4px)] bg-border" />}
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 z-10 border
                                    ${i === 0 ? 'bg-foreground text-background border-foreground' : 'bg-muted text-muted-foreground border-border'}`}>
                                    {item.step}
                                </div>
                                <div className={`pb-5 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── OUR PROCESS ── */}
            <section
                ref={processRef}
                className="border-b border-border bg-background">
                <div className="max-w-7xl mx-auto px-6 py-20 space-y-12">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                            <UsersIcon className="w-3 h-3" />
                            End-to-end hiring
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Our Hiring Process</h2>
                        <p className="text-sm text-muted-foreground max-w-lg">
                            A transparent, structured, and human-first workflow that ensures speed and quality.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        {processSteps.map((item, idx) => (
                            <div
                                key={idx}
                                className="border border-border rounded-2xl bg-background p-5 space-y-3 hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm">
                                <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-primary">{String(idx + 1).padStart(2, '0')}</span>
                                </div>
                                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="relative overflow-hidden border-t border-border bg-muted/40 py-20">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/2 top-0 h-full w-px bg-border opacity-50" />
                    <div className="absolute -left-14 -bottom-14 w-64 h-64 rounded-full border border-border opacity-40" />
                    <div className="absolute -left-4 -bottom-4 w-40 h-40 rounded-full border border-border opacity-30" />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                        <SparklesIcon className="w-3 h-3" />
                        Start hiring smarter
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">Ready to hire with clarity?</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">Tell us what you're building — we'll help you find the people.</p>
                    <Button
                        size="lg"
                        onClick={handlePrimaryCTA}
                        disabled={applicationStatus === 'pending'}
                        className="gap-2 cursor-pointer">
                        {getPrimaryLabel()}
                        {applicationStatus === 'pending' ? <ClockIcon className="w-4 h-4" /> : <ArrowRightIcon className="w-4 h-4" />}
                    </Button>
                </div>
            </section>
        </main>
    )
}
