import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import { CalendarIcon, MapPinIcon, BriefcaseIcon, UsersIcon, LayersIcon, ClockIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import JobDetailsSkeleton from '@/features/job/components/JobDetailsSkeleton'
import { formatExperience, formatSalary } from '../utils/jobHelpers'

import { useGetJobByIdQuery, useApplyJobMutation } from '@/features/job/api/jobApi.js'

const JobDetails = () => {
    const { id } = useParams()
    const { user } = useSelector((store) => store.auth)

    const { data, isLoading, isError, error } = useGetJobByIdQuery(id)

    const [applyJob, { isLoading: applying }] = useApplyJobMutation()

    const job = data?.job

    const [isApplied, setIsApplied] = useState(false)

    useEffect(() => {
        if (job && user) {
            const applied = job?.applications?.some((app) => app?.applicant?._id === user?._id)
            const id = setTimeout(() => setIsApplied(applied)) // defer update
            return () => clearTimeout(id)
        }
    }, [job, user])

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || 'Failed to load job')
        }
    }, [isError, error])

    const applyJobHandler = async () => {
        try {
            const res = await applyJob(id).unwrap()

            toast.success(res.message)
            setIsApplied(true)
        } catch (err) {
            toast.error(err?.data?.message || 'Application failed')
        }
    }

    if (isLoading) {
        return <JobDetailsSkeleton />
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="max-w-4xl mx-auto">
                <Card className="shadow-xl rounded-2xl border border-border bg-background">
                    {/* Header */}
                    <CardHeader className="space-y-4">
                        <CardTitle className="text-3xl font-extrabold text-primary">{job?.title}</CardTitle>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                {
                                    icon: <BriefcaseIcon className="w-4 h-4" />,
                                    label: job?.jobType
                                },
                                {
                                    icon: <MapPinIcon className="w-4 h-4" />,
                                    label: job?.location
                                },
                                {
                                    icon: <CalendarIcon className="w-4 h-4" />,
                                    label: `Posted: ${new Date(job?.createdAt).toLocaleDateString()}`
                                },
                                {
                                    icon: <UsersIcon className="w-4 h-4" />,
                                    label: `${job?.applications?.length || 0} Applicants`
                                },
                                {
                                    icon: <LayersIcon className="w-4 h-4" />,
                                    label: `${job?.position} Opening${job?.position > 1 ? 's' : ''}`
                                },
                                {
                                    icon: <ClockIcon className="w-4 h-4" />,
                                    label: formatExperience(job?.experience)
                                }
                            ].map((item, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/20 rounded-full px-3 py-1">
                                    {item.icon}
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <Separator />

                        {/* Description */}
                        <div>
                            <h3 className="text-xl font-semibold text-primary mb-3">Job Description</h3>

                            <p className="text-muted-foreground">{job?.description}</p>
                        </div>

                        {/* Requirements */}
                        <div>
                            <h3 className="text-xl font-semibold text-primary mb-3">Requirements</h3>

                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {job?.requirements?.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <Separator />

                        {/* Salary + Apply */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <span className="text-lg font-semibold">Salary: ₹ {formatSalary(job?.salary)}</span>

                            <Button
                                size="lg"
                                onClick={isApplied ? undefined : applyJobHandler}
                                disabled={isApplied || applying}
                                className={`w-full md:w-auto ${
                                    isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-blue-700'
                                }`}>
                                {isApplied ? 'Already Applied' : applying ? 'Applying...' : 'Apply Now'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default JobDetails
