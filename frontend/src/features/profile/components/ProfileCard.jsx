import ProfileForm from './ProfileForm'

const ProfileCard = () => (
    <div className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted/40">
            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Profile</p>
            <h2 className="text-sm font-semibold text-foreground mt-0.5">Your Profile</h2>
        </div>
        <div className="px-6 py-6">
            <ProfileForm />
        </div>
    </div>
)

export default ProfileCard
