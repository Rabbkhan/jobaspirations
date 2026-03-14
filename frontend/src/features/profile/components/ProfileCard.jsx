import ProfileForm from './ProfileForm'
import { Card, CardHeader, CardContent, CardTitle } from '@/shared/ui/card'

const ProfileCard = () => (
    <Card className="shadow-xl border p-6">
        <CardHeader>
            <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
            <ProfileForm />
        </CardContent>
    </Card>
)

export default ProfileCard
