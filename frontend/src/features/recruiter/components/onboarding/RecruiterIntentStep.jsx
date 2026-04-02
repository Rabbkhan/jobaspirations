import { Button } from '@/shared/ui/button'

export default function RecruiterIntentStep({ formData, setFormData, next }) {
    const select = (type) => {
        setFormData({ ...formData, recruiterType: type })
        next()
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">What best describes you?</h2>

            <div className="grid gap-4">
                <button
                    className="border rounded-lg p-4 text-left hover:border-primary"
                    onClick={() => select('company')}>
                    <h3 className="font-semibold">Hiring for my company</h3>
                    <p className="text-sm text-muted-foreground">I'm hiring for roles inside my organization</p>
                </button>

                <button
                    className="border rounded-lg p-4 text-left hover:border-primary"
                    onClick={() => select('agency')}>
                    <h3 className="font-semibold">Recruitment agency</h3>
                    <p className="text-sm text-muted-foreground">I hire candidates for multiple companies</p>
                </button>

                <button
                    className="border rounded-lg p-4 text-left hover:border-primary"
                    onClick={() => select('freelancer')}>
                    <h3 className="font-semibold">Freelance recruiter</h3>
                    <p className="text-sm text-muted-foreground">Independent recruiter helping companies hire</p>
                </button>
            </div>
        </div>
    )
}
