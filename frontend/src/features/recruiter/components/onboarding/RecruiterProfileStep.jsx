import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

const inputClass =
    'w-full bg-muted/40 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

const Field = ({ label, children }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
        {children}
    </div>
)

export default function RecruiterProfileStep({ formData, setFormData, next, prev }) {
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Step 3</p>
                <h2 className="text-lg font-bold text-foreground">Recruiter Profile</h2>
                <p className="text-xs text-muted-foreground">Share a bit about yourself and your hiring needs.</p>
            </div>

            <div className="space-y-4">
                <Field label="LinkedIn Profile">
                    <Input
                        name="linkedinProfile"
                        placeholder="https://linkedin.com/in/yourname"
                        value={formData.linkedinProfile}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </Field>
                <Field label="About Your Hiring Needs">
                    <Input
                        name="description"
                        placeholder="e.g. Looking for engineers for a fintech startup"
                        value={formData.description}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </Field>
            </div>

            <div className="flex justify-between pt-2">
                <Button
                    variant="outline"
                    onClick={prev}
                    className="gap-2 cursor-pointer">
                    <ArrowLeftIcon className="w-4 h-4" /> Back
                </Button>
                <Button
                    onClick={next}
                    className="gap-2 cursor-pointer">
                    Continue <ArrowRightIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
