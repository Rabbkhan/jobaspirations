import { Link } from 'react-router-dom'
import { useGetUserQuery } from '../api/profileApi'
import ProfileForm from '../components/ProfileForm'
import { Bookmark, Briefcase, User } from 'lucide-react'

const ProfilePage = () => {
    const { data: user, isLoading } = useGetUserQuery()

    if (isLoading) {
        return <div className="flex justify-center py-20 text-muted-foreground">Loading profile...</div>
    }

    if (!user) {
        return <div className="text-center py-20">Profile not found</div>
    }

    return (
        <div className="max-w-5xl mx-auto my-10 px-4 space-y-8">
            {/* Profile Header */}
            <div className="flex items-center gap-4 border rounded-xl p-6 bg-background shadow-sm">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-6 h-6 text-muted-foreground" />
                </div>

                <div>
                    <h1 className="text-xl font-semibold">{user.fullname}</h1>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </div>

            {/* Profile Form */}
            <div className="border rounded-xl p-6 shadow-sm bg-background">
                <h2 className="text-lg font-semibold mb-6">Edit Profile</h2>
                <ProfileForm user={user} />
            </div>

            {/* Activity Section */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Activity</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        to="/profile/saved-jobs"
                        className="flex items-center gap-3 p-5 border rounded-xl hover:shadow-md transition">
                        <Bookmark className="w-5 h-5 text-primary" />

                        <div>
                            <p className="font-medium">Saved Jobs</p>
                            <p className="text-sm text-muted-foreground">View jobs you bookmarked</p>
                        </div>
                    </Link>

                    <Link
                        to="/applied_jobs"
                        className="flex items-center gap-3 p-5 border rounded-xl hover:shadow-md transition">
                        <Briefcase className="w-5 h-5 text-primary" />

                        <div>
                            <p className="font-medium">Applied Jobs</p>
                            <p className="text-sm text-muted-foreground">Track your applications</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
