import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function HireTalent() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const processRef = useRef(null)

    const handlePrimaryCTA = () => {
        if (!user) return navigate('/login')
        if (user.role !== 'recruiter') return navigate('/become-recruiter')
        navigate('/admin/jobs/create')
    }

    const scrollToProcess = () => {
        processRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <main className="bg-background">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">
                    {/* LEFT */}
                    <div className="space-y-10">
                        <span className="inline-block text-xs uppercase tracking-widest text-muted-foreground">
                            Hiring Consultancy + Job Platform
                        </span>

                        <h1 className="text-5xl xl:text-6xl font-semibold tracking-tight leading-tight">
                            Hiring isn’t about <br />
                            filling roles. <br />
                            <span className="text-primary">It’s about building teams.</span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-xl">
                            We help startups and growing companies hire the right talent through curated candidates, expert screening, and hands-on
                            hiring guidance.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                size="lg"
                                onClick={handlePrimaryCTA}>
                                Request hiring support
                            </Button>

                            <Button
                                size="lg"
                                variant="ghost"
                                className="gap-2"
                                onClick={scrollToProcess}>
                                Our process <ArrowRight size={18} />
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT – VERTICAL STEPS */}
                    <div className="relative space-y-8 border-l pl-10">
                        {[
                            {
                                step: '01',
                                title: 'Requirement Deep-Dive',
                                desc: 'We understand your role, tech stack, budget, and culture before sourcing.'
                            },
                            {
                                step: '02',
                                title: 'Curated Candidate Pool',
                                desc: 'Only pre-screened and relevant candidates reach your inbox.'
                            },
                            {
                                step: '03',
                                title: 'Interview & Closure Support',
                                desc: 'We assist through interviews, feedback loops, and final hiring.'
                            }
                        ].map((item) => (
                            <div
                                key={item.step}
                                className="relative space-y-2">
                                <span className="absolute -left-14 top-1 text-sm text-muted-foreground">{item.step}</span>
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="text-sm text-muted-foreground max-w-md">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR PROCESS (new section) */}
            <section
                ref={processRef}
                className="border-t bg-muted/30">
                <div className="max-w-7xl mx-auto px-6 py-28 space-y-14">
                    <div className="text-center max-w-2xl mx-auto space-y-4">
                        <h2 className="text-4xl font-semibold">Our Hiring Process</h2>
                        <p className="text-muted-foreground text-lg">
                            A transparent, structured, and human-first workflow that ensures speed and quality.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: '1. Role Understanding',
                                desc: 'We align on responsibilities, experience levels, and culture fit requirements.'
                            },
                            {
                                title: '2. Candidate Sourcing',
                                desc: 'We pull talent from our network, job portals, and internal pipelines.'
                            },
                            {
                                title: '3. Pre-Screening',
                                desc: 'Every candidate is evaluated on skills, communication, and relevance.'
                            },
                            {
                                title: '4. Shortlist Delivery',
                                desc: 'You receive only top-tier candidates — no flooding, no irrelevant profiles.'
                            },
                            {
                                title: '5. Interview Coordination',
                                desc: 'We handle scheduling, follow-ups, expectations, and candidate experience.'
                            },
                            {
                                title: '6. Offer & Joining Support',
                                desc: 'Smooth closing, negotiation support, and joining follow-ups.'
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-background border shadow-sm space-y-3">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-muted">
                <div className="max-w-4xl mx-auto px-6 py-28 text-center space-y-6">
                    <h2 className="text-4xl font-semibold tracking-tight">Ready to hire with clarity?</h2>
                    <p className="text-lg text-muted-foreground">Tell us what you’re building — we’ll help you find the people.</p>

                    <Button
                        size="lg"
                        onClick={handlePrimaryCTA}>
                        Get started
                    </Button>
                </div>
            </section>
        </main>
    )
}
