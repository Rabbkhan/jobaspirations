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

export default function CompanyInfoStep({ formData, setFormData, next, prev }) {
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Step 2</p>
                <h2 className="text-lg font-bold text-foreground">Company Information</h2>
                <p className="text-xs text-muted-foreground">Tell us about the company you represent.</p>
            </div>

            <div className="space-y-4">
                <Field label="Company Name">
                    <Input
                        name="companyname"
                        placeholder="Acme Corp"
                        value={formData.companyname}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </Field>
                <Field label="Company Email">
                    <Input
                        name="companyEmail"
                        placeholder="hire@acme.com"
                        value={formData.companyEmail}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </Field>
                <Field label="Website">
                    <Input
                        name="website"
                        placeholder="https://acme.com"
                        value={formData.website}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </Field>
                <Field label="Company LinkedIn">
                    <Input
                        name="companyLinkedin"
                        placeholder="https://linkedin.com/company/acme"
                        value={formData.companyLinkedin}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </Field>
                <Field label="Location">
                    <Input
                        name="location"
                        placeholder="Mumbai, India"
                        value={formData.location}
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
