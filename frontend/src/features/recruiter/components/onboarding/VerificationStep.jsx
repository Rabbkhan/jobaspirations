import { useApplyRecruiterMutation } from '@/features/recruiter/api/recruiterAapplicationsApi'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'
import { ArrowLeftIcon, CheckCircleIcon, UploadCloudIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function VerificationStep({ formData, setFormData, prev }) {
    const [applyRecruiter, { isLoading, isSuccess }] = useApplyRecruiterMutation()
    const navigate = useNavigate()

    const handleFile = (e) => {
        const file = e.target.files[0]
        setFormData({ ...formData, logo: file })
    }

    const submit = async () => {
        // validation INSIDE submit, not outside
        if (!formData.logo) {
            toast.error('Please upload your company logo')
            return
        }

        const data = new FormData()
        Object.keys(formData).forEach((key) => {
            if (formData[key]) data.append(key, formData[key])
        })

        try {
            await applyRecruiter(data).unwrap()
            toast.success('Application submitted successfully')
            navigate('/recruiter-pending') // redirect to pending page
        } catch (err) {
            toast.error(err?.data?.message || 'Submission failed')
        }
    }

    if (isSuccess) {
        return (
            <div className="text-center space-y-4 py-6">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-foreground">Application Submitted</h2>
                    <p className="text-xs text-muted-foreground mt-1">Our team will review and get back to you shortly.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Step 4</p>
                <h2 className="text-lg font-bold text-foreground">Verification</h2>
                <p className="text-xs text-muted-foreground">Upload your company logo for verification.</p>
            </div>

            <label className="flex items-center gap-3 cursor-pointer border border-dashed border-border rounded-xl px-4 py-4 bg-muted/40 hover:bg-muted/70 hover:border-primary/40 transition-colors w-full">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <UploadCloudIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground">{formData.logo ? formData.logo.name : 'Upload company logo'}</p>
                    <p className="text-[11px] text-muted-foreground">PNG, JPG or SVG. Max 2MB.</p>
                </div>
                {formData.logo && <CheckCircleIcon className="w-4 h-4 text-green-500 shrink-0" />}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                />
            </label>

            <div className="flex justify-between pt-2">
                <Button
                    variant="outline"
                    onClick={prev}
                    className="gap-2 cursor-pointer">
                    <ArrowLeftIcon className="w-4 h-4" /> Back
                </Button>
                <Button
                    onClick={submit}
                    disabled={isLoading || !formData.logo}
                    className="gap-2 cursor-pointer min-w-[150px]">
                    {isLoading ? (
                        <>
                            <span className="w-3.5 h-3.5 border-2 border-background/40 border-t-background rounded-full animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <CheckCircleIcon className="w-4 h-4" />
                            Submit Application
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
