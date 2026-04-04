import React, { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { jobSchema } from '../validation/jobSchema'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select'
import {
    ArrowLeftIcon,
    PlusCircleIcon,
    SaveIcon,
    BriefcaseIcon,
    MapPinIcon,
    BuildingIcon,
    IndianRupeeIcon,
    ClockIcon,
    WrenchIcon,
    AlignLeftIcon
} from 'lucide-react'
import { Link } from 'react-router-dom'

const SectionCard = ({ icon: IconComponent, eyebrow, label, children }) => (
    <div className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/40">
            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <IconComponent className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
                {eyebrow && (
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase leading-none mb-0.5">{eyebrow}</p>
                )}
                <h2 className="text-sm font-semibold text-foreground leading-none">{label}</h2>
            </div>
        </div>
        <div className="px-6 py-6 space-y-5">{children}</div>
    </div>
)

const Field = ({ label, error, children }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
        {children}
        {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                {error}
            </p>
        )}
    </div>
)

const inputClass =
    'w-full bg-muted/40 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

const JobForm = ({ defaultValues = {}, companies = [], filters = {}, onSubmit, isSubmitting = false, mode = 'create' }) => {
    const memoizedDefaults = useMemo(
        () => ({
            title: defaultValues.title || '',
            position: defaultValues.position || '',
            company: defaultValues.company || '',
            companyName: defaultValues.companyName || '',
            location: defaultValues.location || '',
            industry: defaultValues.industry || '',
            jobType: defaultValues.jobType || '',
            salaryMin: defaultValues.salaryMin ?? '',
            salaryMax: defaultValues.salaryMax ?? '',
            expMinMonths: defaultValues.expMinMonths ?? '',
            expMaxMonths: defaultValues.expMaxMonths ?? '',
            description: defaultValues.description || '',
            skills: defaultValues.skills || ''
        }),
        [defaultValues]
    )

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(jobSchema),
        defaultValues: memoizedDefaults
    })

    useEffect(() => {
        const hasData = Object.values(memoizedDefaults).some((val) => val !== '' && val !== undefined)
        if (hasData) reset(memoizedDefaults)
    }, [memoizedDefaults, reset])

    return (
        <div className="min-h-screen bg-muted/40 py-10 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                            <BriefcaseIcon className="w-3 h-3" />
                            {mode === 'edit' ? 'Edit listing' : 'New listing'}
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">{mode === 'edit' ? 'Edit Job' : 'Create Job'}</h1>
                        <p className="text-xs text-muted-foreground">
                            {mode === 'edit' ? 'Update the job details below' : 'Fill in the details to publish a new job listing'}
                        </p>
                    </div>
                    <Link to="/recruiter/jobs">
                        <Button
                            variant="outline"
                            className="gap-2 cursor-pointer">
                            <ArrowLeftIcon size={14} /> Back
                        </Button>
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5">
                    {/* Basic Info */}
                    <SectionCard
                        icon={BriefcaseIcon}
                        eyebrow="Step 1"
                        label="Basic Information">
                        <Field
                            label="Job Title"
                            error={errors.title?.message}>
                            <Input
                                className={inputClass}
                                placeholder="e.g. Senior React Developer"
                                {...register('title')}
                            />
                        </Field>

                        <div className="grid md:grid-cols-2 gap-5">
                            <Field
                                label="Company"
                                error={errors.company?.message}>
                                {mode === 'edit' ? (
                                    <Input
                                        value={memoizedDefaults.companyName}
                                        disabled
                                        className={inputClass}
                                    />
                                ) : (
                                    <Controller
                                        name="company"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}>
                                                <SelectTrigger className={inputClass}>
                                                    <SelectValue placeholder="Select company" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {companies.map((c) => (
                                                        <SelectItem
                                                            key={c._id}
                                                            value={c._id}>
                                                            {c.companyname}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                )}
                            </Field>

                            <Field
                                label="Number of Openings"
                                error={errors.position?.message}>
                                <Input
                                    type="number"
                                    min="1"
                                    className={inputClass}
                                    {...register('position')}
                                />
                            </Field>
                        </div>
                    </SectionCard>

                    {/* Job Details */}
                    <SectionCard
                        icon={MapPinIcon}
                        eyebrow="Step 2"
                        label="Job Details">
                        <Field label="Job Type">
                            <Controller
                                name="jobType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}>
                                        <SelectTrigger className={inputClass}>
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filters?.jobTypes?.map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </Field>

                        <div className="grid md:grid-cols-2 gap-5">
                            <Field label="Location">
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}>
                                            <SelectTrigger className={inputClass}>
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filters?.locations?.map((loc) => (
                                                    <SelectItem
                                                        key={loc}
                                                        value={loc}>
                                                        {loc}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </Field>

                            <Field label="Industry">
                                <Controller
                                    name="industry"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}>
                                            <SelectTrigger className={inputClass}>
                                                <SelectValue placeholder="Select industry" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filters?.industries?.map((ind) => (
                                                    <SelectItem
                                                        key={ind}
                                                        value={ind}>
                                                        {ind}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </Field>
                        </div>
                    </SectionCard>

                    {/* Compensation */}
                    <SectionCard
                        icon={IndianRupeeIcon}
                        eyebrow="Step 3"
                        label="Compensation & Experience">
                        <div className="grid md:grid-cols-2 gap-5">
                            <Field
                                label="Min Salary"
                                error={errors.salaryMin?.message}>
                                <Input
                                    type="number"
                                    className={inputClass}
                                    {...register('salaryMin')}
                                />
                            </Field>
                            <Field
                                label="Max Salary"
                                error={errors.salaryMax?.message}>
                                <Input
                                    type="number"
                                    className={inputClass}
                                    {...register('salaryMax')}
                                />
                            </Field>
                            <Field
                                label="Min Experience (months)"
                                error={errors.expMinMonths?.message}>
                                <Input
                                    type="number"
                                    className={inputClass}
                                    {...register('expMinMonths')}
                                />
                            </Field>
                            <Field
                                label="Max Experience (months)"
                                error={errors.expMaxMonths?.message}>
                                <Input
                                    type="number"
                                    className={inputClass}
                                    {...register('expMaxMonths')}
                                />
                            </Field>
                        </div>
                    </SectionCard>

                    {/* Skills */}
                    <SectionCard
                        icon={WrenchIcon}
                        eyebrow="Step 4"
                        label="Skills">
                        <Field label="Skills (comma separated)">
                            <Input
                                className={inputClass}
                                placeholder="React, Node.js, MongoDB"
                                {...register('skills')}
                            />
                        </Field>
                    </SectionCard>

                    {/* Description */}
                    <SectionCard
                        icon={AlignLeftIcon}
                        eyebrow="Step 5"
                        label="Description">
                        <Field
                            label="Job Description"
                            error={errors.description?.message}>
                            <Textarea
                                rows={5}
                                placeholder="Describe the role, responsibilities, and expectations..."
                                className={inputClass}
                                {...register('description')}
                            />
                        </Field>
                    </SectionCard>

                    {/* Submit */}
                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="gap-2 cursor-pointer min-w-[150px]">
                            {isSubmitting ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-background/40 border-t-background rounded-full animate-spin" />
                                    {mode === 'edit' ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                <>
                                    {mode === 'edit' ? <SaveIcon size={16} /> : <PlusCircleIcon size={16} />}
                                    {mode === 'edit' ? 'Update Job' : 'Create Job'}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default JobForm
