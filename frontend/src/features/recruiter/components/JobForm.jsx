import React, { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { jobSchema } from '../validation/jobSchema'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select'
import { ArrowLeft, PlusCircle, Save } from 'lucide-react'
import { Link } from 'react-router-dom'

const JobForm = ({ defaultValues = {}, companies = [], filters = {}, onSubmit, isSubmitting = false, mode = 'create' }) => {
    // Memoize defaultValues to avoid infinite reset loops
    const memoizedDefaults = useMemo(
        () => ({
            title: defaultValues.title || '',
            position: defaultValues.position || '',
            company: defaultValues.company || '',
            companyName: defaultValues.companyName || '', // for edit mode
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

    // Inside JobForm.jsx, replace your current reset useEffect
    useEffect(() => {
        // Only reset if memoizedDefaults has meaningful values (edit mode)
        const hasData = Object.values(memoizedDefaults).some((val) => val !== '' && val !== undefined)
        if (hasData) {
            reset(memoizedDefaults)
        }
    }, [memoizedDefaults, reset])

    return (
        <div className="min-h-screen bg-muted/30 py-10">
            <div className="max-w-5xl mx-auto px-4 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">{mode === 'edit' ? 'Edit Job' : 'Create Job'}</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            {mode === 'edit' ? 'Update the job details below' : 'Fill in the details below to publish a new job listing'}
                        </p>
                    </div>

                    <Link to="/recruiter/jobs">
                        <Button
                            variant="outline"
                            className="gap-2">
                            <ArrowLeft size={16} /> Back
                        </Button>
                    </Link>
                </div>

                {/* Card */}
                <Card className="border shadow-sm rounded-2xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-6 space-y-6">
                            {/* Job Title */}
                            <div className="space-y-2">
                                <Label>Job Title</Label>
                                <Input
                                    className="w-full"
                                    placeholder="e.g. Senior React Developer"
                                    {...register('title')}
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                            </div>

                            {/* Company + Openings */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Company</Label>

                                    {mode === 'edit' ? (
                                        <Input
                                            value={memoizedDefaults.companyName}
                                            disabled
                                            className="w-full"
                                        />
                                    ) : (
                                        <Controller
                                            name="company"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
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
                                </div>

                                <div className="space-y-2">
                                    <Label>Number of Openings</Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        className="w-full"
                                        {...register('position')}
                                    />
                                    {errors.position && <p className="text-sm text-red-500">{errors.position.message}</p>}
                                </div>
                            </div>

                            {/* Job Type */}
                            <div className="space-y-2">
                                <Label>Job Type</Label>

                                <Controller
                                    name="jobType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
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
                            </div>

                            {/* Location + Industry */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Location</Label>

                                    <Controller
                                        name="location"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
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
                                </div>

                                <div className="space-y-2">
                                    <Label>Industry</Label>

                                    <Controller
                                        name="industry"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
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
                                </div>
                            </div>

                            {/* Salary */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Min Salary</Label>
                                    <Input
                                        type="number"
                                        className="w-full"
                                        {...register('salaryMin')}
                                    />
                                    {errors.salaryMin && <p className="text-sm text-red-500">{errors.salaryMin.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Max Salary</Label>
                                    <Input
                                        type="number"
                                        className="w-full"
                                        {...register('salaryMax')}
                                    />
                                    {errors.salaryMax && <p className="text-sm text-red-500">{errors.salaryMax.message}</p>}
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Min Experience (months)</Label>
                                    <Input
                                        type="number"
                                        className="w-full"
                                        {...register('expMinMonths')}
                                    />
                                    {errors.expMinMonths && <p className="text-sm text-red-500">{errors.expMinMonths.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Max Experience (months)</Label>
                                    <Input
                                        type="number"
                                        className="w-full"
                                        {...register('expMaxMonths')}
                                    />
                                    {errors.expMaxMonths && <p className="text-sm text-red-500">{errors.expMaxMonths.message}</p>}
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="space-y-2">
                                <Label>Skills (comma separated)</Label>
                                <Input
                                    className="w-full"
                                    placeholder="React, Node.js, MongoDB"
                                    {...register('skills')}
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    rows={5}
                                    className="w-full"
                                    {...register('description')}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="gap-2">
                                    {mode === 'edit' ? <Save size={18} /> : <PlusCircle size={18} />}

                                    {isSubmitting ? (mode === 'edit' ? 'Updating...' : 'Creating...') : mode === 'edit' ? 'Update Job' : 'Create Job'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default JobForm
