import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { ArrowLeftIcon, BuildingIcon, CheckCircleIcon, Loader2, UploadCloudIcon, XIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const CompanyForm = ({ title, submitLabel, initialData, isLoading, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            companyname: initialData?.companyname || '',
            location: initialData?.location || '',
            website: initialData?.website || '',
            employees: initialData?.employees || '',
            description: initialData?.description || ''
        }
    })

    const [logoFile, setLogoFile] = useState(null)
    const [logoPreview, setLogoPreview] = useState(initialData?.logo || null)

    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            setLogoFile(file)
            setLogoPreview(URL.createObjectURL(file))
        }
    }

    const submitHandler = (data) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => formData.append(key, value))
        if (logoFile) formData.append('logo', logoFile)
        onSubmit(formData)
    }

    const inputClass =
        'w-full bg-muted/40 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

    return (
        <div className="max-w-3xl mx-auto my-10 px-4 space-y-8">
            {/* ── Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Company
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">{title}</h1>
                        <p className="text-xs text-muted-foreground">Fill in the details below</p>
                    </div>
                    <Link
                        to="/recruiter/companies"
                        className="inline-flex items-center gap-2 border border-border text-xs font-semibold px-4 py-2 rounded-xl hover:bg-muted transition-colors text-foreground">
                        <ArrowLeftIcon className="w-3.5 h-3.5" />
                        Back
                    </Link>
                </div>
            </div>

            {/* ── Logo upload ── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Company logo</p>
                    <div className="flex-1 h-px bg-border" />
                </div>

                {logoPreview ? (
                    <div className="flex items-center gap-4 p-4 border border-border rounded-2xl bg-background">
                        <img
                            src={logoPreview}
                            className="h-16 w-16 rounded-xl object-cover border border-border"
                            alt="logo preview"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">Logo uploaded</p>
                            <p className="text-xs text-muted-foreground">Click remove to change it</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setLogoPreview(null)
                                setLogoFile(null)
                            }}
                            className="w-8 h-8 rounded-xl border border-red-500/20 flex items-center justify-center hover:bg-red-500/5 hover:border-red-500/40 transition-colors">
                            <XIcon className="w-3.5 h-3.5 text-red-500" />
                        </button>
                    </div>
                ) : (
                    <label className="flex items-center gap-3 cursor-pointer border border-dashed border-border rounded-2xl px-4 py-4 bg-muted/40 hover:bg-muted/70 hover:border-primary/40 transition-colors w-full">
                        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <UploadCloudIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-foreground">Upload company logo</p>
                            <p className="text-[11px] text-muted-foreground">PNG, JPG or SVG. Max 2MB.</p>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                        />
                    </label>
                )}
            </div>

            {/* ── Fields ── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Details</p>
                    <div className="flex-1 h-px bg-border" />
                </div>

                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                    {/* Company name */}
                    <div className="px-5 py-4 space-y-1.5">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Company name</p>
                        <Input
                            placeholder="e.g. Acme Corp"
                            className={inputClass}
                            {...register('companyname', { required: 'Company name is required' })}
                        />
                        {errors.companyname && (
                            <p className="text-xs text-red-500 flex items-center gap-1">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                                {errors.companyname.message}
                            </p>
                        )}
                    </div>

                    {/* Location */}
                    <div className="px-5 py-4 space-y-1.5">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Location</p>
                        <Input
                            placeholder="e.g. Bangalore, India"
                            className={inputClass}
                            {...register('location')}
                        />
                    </div>

                    {/* Website */}
                    <div className="px-5 py-4 space-y-1.5">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Website</p>
                        <Input
                            placeholder="e.g. https://acme.com"
                            className={inputClass}
                            {...register('website')}
                        />
                    </div>

                    {/* Employees */}
                    <div className="px-5 py-4 space-y-1.5">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Employees</p>
                        <Input
                            type="number"
                            placeholder="e.g. 50"
                            className={inputClass}
                            {...register('employees')}
                        />
                    </div>

                    {/* Description */}
                    <div className="px-5 py-4 space-y-1.5">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Description</p>
                        <Textarea
                            rows={4}
                            placeholder="What does your company do?"
                            className={inputClass}
                            {...register('description')}
                        />
                    </div>
                </div>
            </div>

            {/* ── Submit ── */}
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit(submitHandler)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 min-w-[160px] justify-center">
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <CheckCircleIcon className="w-4 h-4" />
                            {submitLabel}
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default CompanyForm
