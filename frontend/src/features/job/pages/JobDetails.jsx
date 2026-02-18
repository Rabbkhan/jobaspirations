import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Separator } from '@/shared/ui/separator'
import { CalendarIcon, MapPinIcon, BriefcaseIcon, GlobeIcon, UsersIcon, LayersIcon, ClockIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { APPLICATIONS_API_END_POINT, JOB_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { toast } from 'sonner'
import { setLoading, setSingleJob } from '@/features/job/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import JobDetailsSkeleton from '@/features/job/components/JobDetailsSkeleton.jsx'

const JobDetails = () => {
    const params = useParams()
    const jobId = params.id
    const { singleJob, loading } = useSelector((store) => store.job)
    const disptach = useDispatch()
    const { user } = useSelector((store) => store.auth)
    const isIntiallyApplied = singleJob?.applications?.some((application) => application.applicant === user?._id) || false

    const [isApplied, setIsApplied] = useState(isIntiallyApplied)

    useEffect(() => {
        const fetchSingleJob = async () => {
            disptach(setLoading(true))
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {
                    withCredentials: true
                })

                if (res.data.success) {
                    disptach(setSingleJob(res.data.job))

                    setIsApplied(res.data.job.applications.some((app) => app?.applicant?._id === user?._id))
                }
            } catch (error) {
                console.log(error)
            } finally {
                disptach(setLoading(false)) // 👈 add this
            }
        }
        fetchSingleJob()
    }, [jobId, disptach, user?._id])

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`${APPLICATIONS_API_END_POINT}/apply/${jobId}`, {}, { withCredentials: true })

            console.log(res.data)

            if (res.data.success) {
                setIsApplied(true)
                const updateSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                }
                disptach(setSingleJob(updateSingleJob)) // help to get realtime applicant count
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const formatSalary = (salary) => {
        if (!salary) return 'Not disclosed'

        const format = (n) => `${(n / 100000).toFixed(1)} LPA`

        if (salary.min === salary.max) {
            return format(salary.min)
        }

        return `${format(salary.min)} – ${format(salary.max)}`
    }
    const formatExperience = (exp) => {
        if (!exp) return 'Not specified'

        const { min, max } = exp // <-- FIX HERE

        const toYearsMonths = (months) => {
            const y = Math.floor(months / 12)
            const m = months % 12
            if (y && m) return `${y}y ${m}m`
            if (y) return `${y}y`
            return `${m}m`
        }

        if (min === 0 && max === 0) return 'Fresher'

        if (min === max) return toYearsMonths(min)

        return `${toYearsMonths(min)} – ${toYearsMonths(max)}`
    }

    if (loading) {
        return <JobDetailsSkeleton />
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="max-w-4xl mx-auto">
                <Card className="shadow-xl rounded-2xl border border-border bg-background">
                    {/* Header */}
                    <CardHeader className="space-y-4">
                        {/* Job Title */}
                        <CardTitle className="text-3xl font-extrabold text-primary">{singleJob?.title}</CardTitle>

                        {/* Meta Info as Pills */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: <BriefcaseIcon className="w-4 h-4" />, label: singleJob?.jobType },
                                { icon: <MapPinIcon className="w-4 h-4" />, label: singleJob?.location },
                                {
                                    icon: <CalendarIcon className="w-4 h-4" />,
                                    label: `Posted: ${new Date(singleJob?.createdAt).toLocaleDateString()}`
                                },
                                { icon: <UsersIcon className="w-4 h-4" />, label: `${singleJob?.applications?.length || 0} Applicants` },
                                { icon: <LayersIcon className="w-4 h-4" />, label: `${singleJob?.position} Opening(s)` },
                                { icon: <ClockIcon className="w-4 h-4" />, label: formatExperience(singleJob?.experience) }
                            ].map((item, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/20 rounded-full px-3 py-1">
                                    {item.icon} {item.label}
                                </span>
                            ))}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <Separator className="border-gray-600" />

                        {/* Job Description */}
                        <div>
                            <h3 className="text-xl font-semibold text-primary border-b border-primary/30 pb-1 mb-3">Job Description</h3>
                            <p className="text-muted-foreground">{singleJob?.description}</p>
                        </div>

                        {/* Requirements */}
                        <div>
                            <h3 className="text-xl font-semibold text-primary border-b border-primary/30 pb-1 mb-3">Requirements</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {singleJob?.requirements?.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <Separator className="border-gray-600" />

                        {/* Salary & Apply */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                            <span className="text-lg font-semibold text-foreground">Salary: ₹ {formatSalary(singleJob?.salary)}</span>

                            <Button
                                size="lg"
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`w-full md:w-auto rounded-lg text-white font-semibold transition-all ${
                                    isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-blue-700 hover:scale-105'
                                }`}>
                                {isApplied ? 'Already Applied' : 'Apply Now'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default JobDetails
