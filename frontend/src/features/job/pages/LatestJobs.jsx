import React, { useMemo } from 'react'
import { Bookmark, MapPin, ArrowRight, IndianRupee } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Separator } from '@/shared/ui/separator'
import { useNavigate } from 'react-router-dom'

import { useGetAllJobsQuery, useGetSavedJobsQuery, useSaveJobMutation, useUnsaveJobMutation } from '@/features/job/api/jobApi'

import LatestJobsSkeleton from '@/features/job/components/LatestJobsSkeleton'
import { formatExperience, formatSalary, timeAgo } from '@/features/job/utils/jobHelpers'
import { toast } from 'sonner'

const LatestJobs = () => {
    const navigate = useNavigate()

    /* ---------------- GET JOBS ---------------- */
    const { data, isLoading } = useGetAllJobsQuery({
        page: 1,
        filters: {}
    })

    /* ---------------- SAVED JOBS ---------------- */
    const { data: savedData } = useGetSavedJobsQuery()

    const [saveJob] = useSaveJobMutation()
    const [unsaveJob] = useUnsaveJobMutation()

    /* ---------------- LATEST 6 JOBS ---------------- */
    const latestSixJobs = useMemo(() => {
        if (!data?.jobs) return []

        return [...data.jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)
    }, [data])

    /* ---------------- SAVED JOB IDS ---------------- */
    const savedJobIds = useMemo(() => {
        return new Set(savedData?.savedJobs?.map((job) => job._id) || [])
    }, [savedData])

    const isSaved = (jobId) => savedJobIds.has(jobId)

    /* ---------------- SAVE / UNSAVE ---------------- */
    const handleSaveToggle = async (jobId) => {
        try {
            if (isSaved(jobId)) {
                await unsaveJob(jobId).unwrap()

                toast.success('Removed from saved jobs')
            } else {
                await saveJob(jobId).unwrap()

                toast.success('Job saved successfully')
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong')
        }
    }

    if (isLoading) return <LatestJobsSkeleton />

    return (
        <section className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold mb-3 text-foreground">🔥 Latest Job Openings</h2>

            <p className="text-muted-foreground mb-8">Fresh jobs curated specially for you</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestSixJobs.length === 0 ? (
                    <p className="text-muted-foreground col-span-full text-center">No job openings available right now</p>
                ) : (
                    latestSixJobs.map((job) => (
                        <Card
                            key={job._id}
                            className="relative p-5 border shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
                            {/* Save Button */}
                            <button
                                onClick={() => handleSaveToggle(job._id)}
                                className="absolute right-4 top-4 text-muted-foreground hover:text-primary">
                                <Bookmark
                                    size={22}
                                    className="cursor-pointer"
                                    fill={isSaved(job._id) ? 'currentColor' : 'none'}
                                />
                            </button>

                            <CardHeader className="p-0 mb-2">
                                <CardTitle className="text-xl font-semibold leading-snug">{job.title}</CardTitle>

                                <CardDescription className="text-sm text-muted-foreground">{job?.company?.name}</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-3 p-0">
                                {/* Location */}
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <Badge
                                        variant="secondary"
                                        className="rounded-full">
                                        {job.jobType}
                                    </Badge>

                                    <Badge className="rounded-full flex items-center gap-1">
                                        <IndianRupee size={14} />
                                        {formatSalary(job.salary)}
                                    </Badge>

                                    <Badge
                                        variant="outline"
                                        className="rounded-full">
                                        {formatExperience(job.experience)}
                                    </Badge>
                                </div>

                                <Separator className="my-4" />

                                {/* Footer */}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{timeAgo(job.createdAt)}</span>

                                    <button
                                        onClick={() => navigate(`/jobs/${job._id}`)}
                                        className="flex items-center gap-1 cursor-pointer font-medium text-primary hover:underline">
                                        View Details <ArrowRight size={16} />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </section>
    )
}

export default LatestJobs
