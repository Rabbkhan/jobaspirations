import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Briefcase, Sparkles, Clock, ArrowRight, BookmarkCheck, UserCircle2, Search } from 'lucide-react'

export default function StudentHero() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const firstName = user?.fullname?.split(' ')[0] || 'Student'

    const quickLinks = [
        {
            icon: Briefcase,
            label: 'Applied Jobs',
            desc: 'Track your applications',
            to: '/applied_jobs',
            color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800',
            iconColor: 'text-blue-600 dark:text-blue-400'
        },
        {
            icon: BookmarkCheck,
            label: 'Saved Jobs',
            desc: 'Jobs you bookmarked',
            to: '/profile/saved-jobs',
            color: 'bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800',
            iconColor: 'text-violet-600 dark:text-violet-400'
        },
        {
            icon: UserCircle2,
            label: 'My Profile',
            desc: 'Complete your profile',
            to: '/profile',
            color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800',
            iconColor: 'text-emerald-600 dark:text-emerald-400'
        }
    ]

    return (
        <section className="w-full border-b bg-background relative overflow-hidden">
            {/* subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                {/* LEFT */}
                <div className="space-y-7">
                    {/* greeting badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        Welcome back, {firstName}
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
                            Find your next
                            <span className="text-primary"> opportunity</span>
                        </h1>
                        <p className="text-base text-muted-foreground max-w-md leading-relaxed">
                            Explore new roles, track your applications, and get AI-powered resume analysis — all in one place.
                        </p>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Button
                            size="lg"
                            className="gap-2"
                            onClick={() => navigate('/jobs')}>
                            <Search className="w-4 h-4" />
                            Browse Jobs
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2"
                            onClick={() => navigate('/applied_jobs')}>
                            My Applications
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* benefit chips */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {[
                            { icon: Sparkles, label: 'AI Resume Analysis' },
                            { icon: Briefcase, label: 'Verified Companies' },
                            { icon: Clock, label: 'Daily Job Updates' }
                        ].map((item) => (
                            <span
                                key={item.label}
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted border border-border rounded-full px-3 py-1.5">
                                <item.icon className="w-3.5 h-3.5" />
                                {item.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative">
                    {/* glow */}
                    <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

                    <div className="relative bg-background border border-border rounded-2xl shadow-sm p-6 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-foreground">Quick Access</h3>
                            <span className="text-xs text-muted-foreground">Your workspace</span>
                        </div>

                        {/* quick link cards */}
                        <div className="space-y-3">
                            {quickLinks.map((item) => (
                                <button
                                    key={item.to}
                                    onClick={() => navigate(item.to)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-sm hover:-translate-y-0.5 text-left ${item.color}`}>
                                    <div className={`w-9 h-9 rounded-lg bg-background flex items-center justify-center shrink-0 shadow-sm`}>
                                        <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
                                </button>
                            ))}
                        </div>

                        {/* divider */}
                        <div className="border-t border-border pt-4">
                            <Button
                                className="w-full gap-2"
                                onClick={() => navigate('/jobs')}>
                                <Search className="w-4 h-4" />
                                Start Exploring Jobs
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
