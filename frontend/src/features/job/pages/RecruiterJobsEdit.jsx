import React, { useEffect, useState } from 'react'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants'
import { useDispatch } from 'react-redux'
import { setAllCompany, setLoading } from '@/features/company/companySlice'
import { toast } from 'sonner'

const AdminJobEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [filters, setFilters] = useState({
        industries: [],
        locations: []
    })

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        industry: '',
        jobType: '',
        salaryMin: '',
        salaryMax: '',
        expMinMonths: '',
        expMaxMonths: '',
        description: '',
        skills: ''
    })

    /* ---------------- FETCH COMPANIES ---------------- */
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                dispatch(setLoading(true))
                const res = await axios.get(COMPANY_API_END_POINT, {
                    withCredentials: true
                })
                dispatch(setAllCompany(res?.data?.companies || []))
            } catch {
                toast.error('Failed to load companies')
            } finally {
                dispatch(setLoading(false))
            }
        }

        fetchCompanies()
    }, [dispatch])

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/filters`, {
                    withCredentials: true
                })
                setFilters(res.data.filters)
            } catch {
                toast.error('Failed to load filters')
            }
        }

        fetchFilters()
    }, [])

    /* ---------------- FETCH JOB ---------------- */
    useEffect(() => {
        if (!id) return

        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/${id}`, {
                    withCredentials: true
                })

                const job = res.data.job

                setFormData({
                    title: job.title || '',
                    company: job.company?._id || '',
                    companyName: job.company?.companyname || '',
                    location: job.location || '',
                    jobType: job.jobType || '',
                    industry: job.industry || '',
                    salaryMin: job.salary?.min ?? '',
                    salaryMax: job.salary?.max ?? '',
                    expMinMonths: job.experience?.minMonths ?? '',
                    expMaxMonths: job.experience?.maxMonths ?? '',
                    description: job.description || '',
                    skills: job.requirements?.join(', ') || ''
                })
            } catch {
                toast.error('Failed to load job data')
            }
        }

        fetchJob()
    }, [id])

    /* ---------------- HANDLERS ---------------- */
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelect = (value) => {
        setFormData((prev) => ({ ...prev, jobType: value }))
    }

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault()
        const expMin = Number(formData.expMinMonths)
        const expMax = Number(formData.expMaxMonths)
        const salaryMin = Number(formData.salaryMin)
        const salaryMax = Number(formData.salaryMax)

        if (isNaN(expMin) || isNaN(expMax)) {
            return toast.error('Experience min and max are required')
        }

        if (isNaN(salaryMin) || isNaN(salaryMax)) {
            return toast.error('Salary min and max are required')
        }

        if (expMin < 0 || expMax < 0) {
            return toast.error('Experience cannot be negative')
        }

        if (salaryMin < 0 || salaryMax < 0) {
            return toast.error('Salary cannot be negative')
        }

        if (expMin > expMax) {
            return toast.error('Minimum experience cannot be greater than maximum experience')
        }

        if (salaryMin > salaryMax) {
            return toast.error('Minimum salary cannot be greater than maximum salary')
        }

        const payload = {
            title: formData.title,
            description: formData.description,
            requirements: formData.skills.split(',').map((s) => s.trim()),
            salary: {
                min: Number(formData.salaryMin),
                max: Number(formData.salaryMax)
            },
            experience: {
                min: Number(formData.expMinMonths),
                max: Number(formData.expMaxMonths)
            },
            location: formData.location,
            jobType: formData.jobType,
            industry: formData.industry || '',
            company: formData.company
        }

        try {
            await axios.put(`${JOB_API_END_POINT}/${id}`, payload, {
                withCredentials: true
            })

            toast.success('Job updated successfully')
            navigate('/recruiter/jobs')
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update job')
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Edit Job</h1>

                <Link to="/recruiter/jobs">
                    <Button
                        variant="outline"
                        className="flex gap-2">
                        <ArrowLeft size={18} />
                        Back
                    </Button>
                </Link>
            </div>

            {/* Form Card */}
            <Card className="p-6 space-y-6 shadow-sm border rounded-xl">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit}>
                    {/* Job Title */}
                    <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Company */}
                        <div className="space-y-2">
                            <Label>Company</Label>
                            <Input
                                value={formData.companyName}
                                disabled
                                className="bg-muted cursor-not-allowed"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={formData.location || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Label>Industry</Label>
                            <Select
                                value={formData.industry}
                                onValueChange={(v) => handleSelect('industry', v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select industry" />
                                </SelectTrigger>

                                <SelectContent>
                                    {filters.industries.map((ind) => (
                                        <SelectItem
                                            key={ind}
                                            value={ind}>
                                            {ind}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Salary */}
                        <div className="space-y-2">
                            <Label>Salary Range (Annual)</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    placeholder="Min (₹)"
                                    name="salaryMin"
                                    value={formData.salaryMin}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    placeholder="Max (₹)"
                                    name="salaryMax"
                                    value={formData.salaryMax}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Job Type */}
                        <div className="space-y-2">
                            <Label>Job Type</Label>
                            <Select
                                value={formData.jobType}
                                onValueChange={handleSelect}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Experience */}
                        <div className="space-y-2 md:col-span-2">
                            <Label>Experience Required</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    type="number"
                                    placeholder="0"
                                    name="expMinMonths"
                                    value={formData.expMinMonths}
                                    onChange={handleChange}
                                    required
                                />

                                <Input
                                    type="number"
                                    placeholder="24"
                                    name="expMaxMonths"
                                    value={formData.expMaxMonths}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Example: 6 = 6 months, 18 = 1 year 6 months</p>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                        <Label>Required Skills</Label>
                        <Input
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Job Description</Label>
                        <Textarea
                            rows={5}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full md:w-auto flex gap-2">
                        <Save size={18} />
                        Update Job
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default AdminJobEdit
