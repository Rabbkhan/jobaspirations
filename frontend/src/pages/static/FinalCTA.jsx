import { Button } from '@/shared/ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowRightIcon, BriefcaseIcon, SparklesIcon } from 'lucide-react'

const FinalCTA = () => {
    const { user } = useSelector((store) => store.auth)
    const getPrimaryLink = () => {
        if (!user) return '/register'
        if (user.role === 'recruiter') return '/recruiter/dashboard' // fix wrong path
        if (user.role === 'student') return '/profile'
        return '/profile' // fallback for logged in user, never /register
    }

    const getPrimaryLabel = () => {
        if (!user) return 'Create Profile'
        if (user.role === 'recruiter') return 'Go to Dashboard'
        return 'Go to Profile'
    }

    return (
        <section className="relative overflow-hidden border-t border-border bg-muted/40 py-20">
            {/* Decorative — matching Hero */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-full w-px bg-border opacity-50" />
                <div className="absolute left-0 top-1/2 w-full h-px bg-border opacity-30" />
                <div className="absolute -left-14 -bottom-14 w-64 h-64 rounded-full border border-border opacity-40" />
                <div className="absolute -left-4 -bottom-4 w-40 h-40 rounded-full border border-border opacity-30" />
                <div
                    className="absolute right-6 top-5 w-16 h-12 opacity-[.08]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)',
                        backgroundSize: '10px 10px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-6">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                    <SparklesIcon className="w-3 h-3" />
                    Start your journey today
                </div>

                {/* Headline */}
                <div className="space-y-1">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">Ready to Build Your Career?</h2>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Get expert guidance, verified opportunities, and personalized career support.
                    </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <Link to={getPrimaryLink()}>
                        <Button
                            size="lg"
                            className="gap-2 cursor-pointer">
                            {getPrimaryLabel()}
                            <ArrowRightIcon className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link to="/jobs">
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 cursor-pointer">
                            <BriefcaseIcon className="w-4 h-4" />
                            Browse Jobs
                        </Button>
                    </Link>
                </div>

                {/* Trust note */}
                <p className="text-[11px] text-muted-foreground pt-2">One-time registration fee applies. Success fee only after placement.</p>
            </div>
        </section>
    )
}

export default FinalCTA
