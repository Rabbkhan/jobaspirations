import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Briefcase, Sparkles, Bell, Clock } from 'lucide-react'

export default function StudentHero() {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    return (
        <section className="w-full border-b bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* LEFT */}
                <div className="space-y-8">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                        Welcome back,
                        <span className="text-primary"> {user?.fullname?.split(' ')[0] || 'Student'}</span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-xl">
                        Continue your journey. Explore new opportunities, track your applications, and discover roles tailored to your skills.
                    </p>

                    <div className="flex flex-wrap gap-4 ">
                        <Button
                            size="lg"
                            className="cursor-pointer"
                            onClick={() => navigate('/jobs')}>
                            Browse Jobs
                        </Button>
                        <Button
                            size="lg"
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => navigate('/applied_jobs')}>
                            My Applications
                        </Button>
                    </div>

                    {/* Quick Benefit Bar */}
                    <div className="grid sm:grid-cols-3 gap-4 pt-6 text-sm">
                        <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg p-3">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Smart Recommendations
                        </div>
                        <div className="flex items-center gap-2 bg-accent/10 border rounded-lg p-3">
                            <Briefcase className="w-4 h-4" /> Verified Companies
                        </div>
                        <div className="flex items-center gap-2 bg-muted border rounded-lg p-3">
                            <Clock className="w-4 h-4" /> Real‑time Updates
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="relative">
                    <div className="absolute -inset-6 bg-primary/20 blur-3xl rounded-full" />

                    <div className="relative bg-card border rounded-2xl shadow-xl p-8 space-y-6">
                        <h3 className="text-lg font-semibold">Your Dashboard Quick View</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
                                <span>Applied Jobs</span>
                                <Button
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => navigate('/applied_jobs')}>
                                    View
                                </Button>
                            </div>

                            <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
                                <span>Saved Jobs</span>
                                <Button
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => navigate('/profile/saved-jobs')}>
                                    View
                                </Button>
                            </div>

                            <div className="flex justify-between items-center p-4 rounded-lg bg-muted">
                                <span>Profile Status</span>
                                <Button
                                    variant="secondary"
                                    className="cursor-pointer"
                                    onClick={() => navigate('/profile')}>
                                    Complete Profile
                                </Button>
                            </div>
                        </div>

                        <Button
                            className="w-full cursor-pointer"
                            onClick={() => navigate('/jobs')}>
                            Start Exploring Now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
