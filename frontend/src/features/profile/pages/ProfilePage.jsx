import { Link } from 'react-router-dom'
import { useGetUserQuery } from '../api/profileApi'
import ProfileForm from '../components/ProfileForm'
import { Bookmark, Briefcase, User, Mail, Phone, Star } from 'lucide-react'

const ProfilePage = () => {
    const { data: user, isLoading } = useGetUserQuery()

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto my-10 px-4 space-y-4 animate-pulse">
                <div className="h-28 rounded-2xl bg-muted border border-border" />
                <div className="h-10 rounded-lg bg-muted border border-border w-1/4" />
                <div className="h-64 rounded-2xl bg-muted border border-border" />
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-center px-4">
                <span className="text-5xl">👤</span>
                <h2 className="text-xl font-bold text-foreground">Profile not found</h2>
                <p className="text-sm text-muted-foreground">We couldn't load your profile. Try refreshing.</p>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto my-10 px-4 space-y-8">
            {/* ── Profile Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 px-6 py-5">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 overflow-hidden">
                        {user?.profile?.profilePhoto ? (
                            <img
                                src={user.profile.profilePhoto}
                                alt={user.fullname}
                                className="w-16 h-16 object-cover"
                            />
                        ) : (
                            <User className="w-7 h-7 text-primary" />
                        )}
                    </div>
                    <div className="flex-1 space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {user?.isPlaced ? 'Placement Verified' : 'Active candidate'}
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">{user.fullname}</h1>
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Mail className="w-3.5 h-3.5" />
                                {user.email}
                            </span>
                            {user.phoneNumber && (
                                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Phone className="w-3.5 h-3.5" />
                                    {user.phoneNumber}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Section divider ── */}
            <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Edit Profile</p>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* ── Profile Form — no extra wrapper ── */}
            <ProfileForm />

            {/* ── Section divider ── */}
            <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Activity</p>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* ── Activity Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                    to="/profile/saved-jobs"
                    className="group flex items-center gap-4 p-5 border border-border rounded-2xl bg-background hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Bookmark className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Saved Jobs</p>
                        <p className="text-xs text-muted-foreground">View jobs you bookmarked</p>
                    </div>
                </Link>

                <Link
                    to="/applied_jobs"
                    className="group flex items-center gap-4 p-5 border border-border rounded-2xl bg-background hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Briefcase className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Applied Jobs</p>
                        <p className="text-xs text-muted-foreground">Track your applications</p>
                    </div>
                </Link>

                <Link
                    to="/review/write"
                    className="group flex items-center gap-4 p-5 border border-border rounded-2xl bg-background hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm sm:col-span-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Star className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Write a Review</p>
                        <p className="text-xs text-muted-foreground">Share your placement journey with other students</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProfilePage
