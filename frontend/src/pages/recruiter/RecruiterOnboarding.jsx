import CompanyInfoStep from '@/features/recruiter/components/onboarding/CompanyInfoStep.jsx'
import RecruiterIntentStep from '@/features/recruiter/components/onboarding/RecruiterIntentStep.jsx'
import RecruiterProfileStep from '@/features/recruiter/components/onboarding/RecruiterProfileStep.jsx'
import VerificationStep from '@/features/recruiter/components/onboarding/VerificationStep.jsx'
import { useState } from 'react'

export default function RecruiterOnboarding() {
    const [step, setStep] = useState(1)

    const [formData, setFormData] = useState({
        recruiterType: '',
        companyname: '',
        companyEmail: '',
        website: '',
        companyLinkedin: '',
        employees: '',
        location: '',
        description: '',
        linkedinProfile: '',
        logo: null
    })

    const next = () => setStep((s) => s + 1)
    const prev = () => setStep((s) => s - 1)

    return (
        <div className="min-h-screen bg-muted flex justify-center items-center px-4">
            <div className="w-full max-w-3xl bg-background rounded-xl shadow p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold">Recruiter Onboarding</h1>
                    <p className="text-muted-foreground text-sm">Step {step} of 4</p>
                </div>

                {step === 1 && (
                    <RecruiterIntentStep
                        formData={formData}
                        setFormData={setFormData}
                        next={next}
                    />
                )}

                {step === 2 && (
                    <CompanyInfoStep
                        formData={formData}
                        setFormData={setFormData}
                        next={next}
                        prev={prev}
                    />
                )}

                {step === 3 && (
                    <RecruiterProfileStep
                        formData={formData}
                        setFormData={setFormData}
                        next={next}
                        prev={prev}
                    />
                )}

                {step === 4 && (
                    <VerificationStep
                        formData={formData}
                        setFormData={setFormData}
                        prev={prev}
                    />
                )}
            </div>
        </div>
    )
}
