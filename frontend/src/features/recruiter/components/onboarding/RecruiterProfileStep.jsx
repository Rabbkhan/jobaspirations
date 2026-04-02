import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export default function RecruiterProfileStep({ formData, setFormData, next, prev }) {
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Recruiter Profile</h2>

            <Input
                name="linkedinProfile"
                placeholder="LinkedIn Profile"
                value={formData.linkedinProfile}
                onChange={handleChange}
            />

            <Input
                name="description"
                placeholder="Tell us about your hiring needs"
                value={formData.description}
                onChange={handleChange}
            />

            <div className="flex justify-between">
                <Button
                    variant="ghost"
                    onClick={prev}>
                    Back
                </Button>
                <Button onClick={next}>Continue</Button>
            </div>
        </div>
    )
}
