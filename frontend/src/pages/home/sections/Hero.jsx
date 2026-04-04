import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRightIcon, MapPinIcon } from 'lucide-react'

const steps = [
    {
        step: '01',
        title: 'Career Assessment',
        desc: 'Role clarity, skill evaluation, and career roadmap'
    },
    {
        step: '02',
        title: 'Expert Consulting',
        desc: 'Resume, interview prep & gap analysis'
    },
    {
        step: '03',
        title: 'Hiring Access',
        desc: 'Direct opportunities with verified recruiters'
    }
]

const stats = [
    { value: '87%', label: 'Placement rate' },
    { value: '2.4k', label: 'Candidates placed' },
    { value: '60d', label: 'Avg. time to hire' }
]

const trustPoints = [
    'One-time registration & structured onboarding',
    'Dedicated career guidance and hiring support',
    'Success-based fees — charged only after placement'
]

const Hero = () => {
    const navigate = useNavigate()

    return (
        <section className="relative overflow-hidden border-b border-border bg-muted/40">
            {/* ── Decorative layer ── */}
            <div className="pointer-events-none absolute inset-0">
                {/* Grid lines */}
                <div className="absolute left-1/2 top-0 h-full w-px bg-border opacity-50" />
                <div className="absolute left-0 top-[40%] w-full h-px bg-border opacity-40" />
                {/* Rings */}
                <div className="absolute -right-14 -top-14 w-64 h-64 rounded-full border border-border opacity-50" />
                <div className="absolute -right-4 -top-4 w-40 h-40 rounded-full border border-border opacity-40" />
                {/* Dot cluster */}
                <div
                    className="absolute left-6 bottom-5 w-16 h-12 opacity-[.12]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)',
                        backgroundSize: '10px 10px'
                    }}
                />
            </div>

            {/* ── Main grid ── */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* LEFT — Message */}
                <div className="space-y-7">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full border border-primary/20">
                        <MapPinIcon className="w-3 h-3" />
                        Career consulting & hiring platform
                    </div>

                    {/* Headline */}
                    <div>
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground m-0">Build your career.</h1>
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground m-0 flex items-center gap-4 flex-wrap">
                            Invest once.
                            <span className="inline-block h-[6px] w-20 rounded-full bg-primary/30 mb-1" />
                        </h1>
                        <p className="text-lg font-semibold text-primary mt-2">Pay the rest after you're hired.</p>
                    </div>

                    {/* Body */}
                    <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
                        Structured career consulting, curated opportunities, and direct recruiter access — designed to maximise your placement
                        success.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 pt-1">
                        <Button
                            size="lg"
                            onClick={() => navigate('/jobs')}
                            className="cursor-pointer gap-2">
                            Start career assessment
                            <ArrowRightIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate('/hire')}
                            className="cursor-pointer">
                            For recruiters
                        </Button>
                    </div>

                    {/* Trust points */}
                    <div className="pt-5 border-t border-border space-y-2.5">
                        {trustPoints.map((item) => (
                            <div
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — Process card */}
                <div className="bg-background border border-border rounded-2xl p-7 space-y-6">
                    {/* Card header label */}
                    <p className="text-[11px] font-semibold text-muted-foreground tracking-widest uppercase m-0">How we get you hired</p>

                    {/* Steps with connector line */}
                    <div className="space-y-0">
                        {steps.map((item, i) => (
                            <div
                                key={item.step}
                                className="flex gap-4 items-start relative">
                                {/* Vertical connector */}
                                {i < steps.length - 1 && <div className="absolute left-[13px] top-7 w-px h-[calc(100%-4px)] bg-border" />}
                                {/* Step number bubble */}
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 z-10 border
                                    ${i === 0 ? 'bg-foreground text-background border-foreground' : 'bg-muted text-muted-foreground border-border'}`}>
                                    {item.step}
                                </div>
                                {/* Text */}
                                <div className={`pb-5 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                                    <p className="text-sm font-semibold text-foreground m-0">{item.title}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 m-0">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-0 pt-5 border-t border-border text-center">
                        {stats.map((s, i) => (
                            <div
                                key={s.label}
                                className={`${i > 0 ? 'border-l border-border' : ''}`}>
                                <p className="text-xl font-bold text-foreground m-0">{s.value}</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5 m-0">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Disclosure bar ── */}
            <div className="relative z-10 border-t border-border bg-background px-6 py-3">
                <p className="text-xs text-muted-foreground max-w-7xl mx-auto m-0">
                    A one-time registration fee applies. Post-placement charges are collected only after successful hiring and are aligned with your
                    first month's salary. Full details are shared during onboarding.
                </p>
            </div>
        </section>
    )
}

export default Hero
