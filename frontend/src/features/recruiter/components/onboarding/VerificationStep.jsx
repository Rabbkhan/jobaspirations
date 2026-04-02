import { useApplyRecruiterMutation } from '@/features/recruiter/api/recruiterAapplicationsApi'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'

export default function VerificationStep({ formData, setFormData, prev }) {
    const [applyRecruiter, { isLoading }] = useApplyRecruiterMutation()

    const handleFile = (e) => {
        const file = e.target.files[0]
        setFormData({ ...formData, logo: file })
    }

    const submit = async () => {
        const data = new FormData()

        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                data.append(key, formData[key])
            }
        })

        try {
            await applyRecruiter(data).unwrap()
            toast.success('Application submitted')
        } catch (err) {
            toast.error(err?.data?.message || 'Submission failed')
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Verification</h2>

            <input
                type="file"
                onChange={handleFile}
            />

            <div className="flex justify-between">
                <Button
                    variant="ghost"
                    onClick={prev}>
                    Back
                </Button>

                <Button
                    onClick={submit}
                    disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Application'}
                </Button>
            </div>
        </div>
    )
}
