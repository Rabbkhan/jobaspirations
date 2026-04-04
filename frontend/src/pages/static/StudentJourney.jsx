import React from 'react'
import { User, FileText, Search, Briefcase, IndianRupee, ArrowRightIcon } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'

const steps = [
    { icon: User, step: '01', title: 'Create an Account', desc: 'Sign up for free and get access to job opportunities.' },
    { icon: FileText, step: '02', title: 'Complete Your Profile', desc: 'Add your education, skills, and resume to apply for roles.' },
    { icon: Search, step: '03', title: 'Apply to Jobs', desc: 'Browse and apply to relevant openings on the platform.' },
    { icon: Briefcase, step: '04', title: 'Get Hired', desc: 'If selected, recruiters will contact you directly.' },
    {
        icon: IndianRupee,
        step: '05',
        title: 'Pay After Joining',
        desc: 'A success fee is charged only after you secure a job through Job Aspirations.'
    }
]

const StudentJourney = () => {
    const navigate = useNavigate()

    return (
        <section className="py-20 bg-muted/40 border-y border-border">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                            For students
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                            How Job Aspirations
                            <br />
                            Works for Students
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-md">Use the platform for free. Pay only when you get hired.</p>
                    </div>
                    <Button
                        size="lg"
                        onClick={() => navigate('/jobs')}
                        className="gap-2 shrink-0 cursor-pointer">
                        Browse Jobs
                        <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </div>

                {/* Steps grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {steps.map((step, idx) => {
                        const Icon = step.icon
                        return (
                            <div
                                key={idx}
                                className="relative border border-border rounded-2xl bg-background shadow-sm p-5 space-y-3 hover:border-primary/40 hover:bg-primary/5 transition-all">
                                {/* Step number */}
                                <div className="flex items-center justify-between">
                                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-[10px] font-bold text-muted-foreground/50 tracking-widest">{step.step}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{step.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.desc}</p>
                                </div>
                                {/* Accent dot for first step */}
                                {idx === 0 && <span className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                            </div>
                        )
                    })}
                </div>

                {/* Disclaimer */}
                <p className="mt-10 text-[11px] text-muted-foreground/70 max-w-3xl border-t border-border pt-5">
                    Job Aspirations does not guarantee placement. Success fee applies only if the candidate is hired through the platform and joins
                    the company. Terms and conditions apply.
                </p>
            </div>
        </section>
    )
}

export default StudentJourney
