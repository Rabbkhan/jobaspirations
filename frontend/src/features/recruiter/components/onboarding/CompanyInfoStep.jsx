import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export default function CompanyInfoStep({ formData, setFormData, next, prev }) {
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Company Information</h2>

            <Input
                name="companyname"
                placeholder="Company Name"
                value={formData.companyname}
                onChange={handleChange}
            />

            <Input
                name="companyEmail"
                placeholder="Company Email"
                value={formData.companyEmail}
                onChange={handleChange}
            />

            <Input
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
            />

            <Input
                name="companyLinkedin"
                placeholder="Company LinkedIn"
                value={formData.companyLinkedin}
                onChange={handleChange}
            />

            <Input
                name="location"
                placeholder="Company Location"
                value={formData.location}
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
