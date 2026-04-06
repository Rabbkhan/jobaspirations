import React, { useMemo, useState } from 'react'
import { Bookmark, MapPin, ArrowRight, Building2, Clock, ExternalLink, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGetAllJobsQuery, useGetSavedJobsQuery, useSaveJobMutation, useUnsaveJobMutation } from '@/features/job/api/jobApi'
import LatestJobsSkeleton from '@/features/job/components/LatestJobsSkeleton'
import { formatExperience, formatSalary, timeAgo } from '@/features/job/utils/jobHelpers'
import { toast } from 'sonner'

const CompanyLogo = ({ logo, name }) => {
    const [imgError, setImgError] = useState(false)

    if (logo && !imgError) {
        return (
            <img
                src={logo}
                alt={name}
                className="w-10 h-10 rounded-xl object-contain border border-border bg-muted p-1 shrink-0"
                onError={() => setImgError(true)}
            />
        )
    }

    return (
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-primary" />
        </div>
    )
}

const LatestJobs = () => {
    const navigate = useNavigate()

    const { data, isLoading } = useGetAllJobsQuery({ page: 1, filters: {} })
    const { data: savedData } = useGetSavedJobsQuery()
    const [saveJob] = useSaveJobMutation()
    const [unsaveJob] = useUnsaveJobMutation()

    const latestSixJobs = useMemo(() => {
        if (!data?.jobs) return []
        return [...data.jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)
    }, [data])

    const savedJobIds = useMemo(() => {
        return new Set(savedData?.savedJobs?.map((job) => job._id) || [])
    }, [savedData])

    const isSaved = (jobId) => savedJobIds.has(jobId)

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
            {/* Section header */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                        Updated daily
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight">Latest Openings</h2>
                    <p className="text-sm text-muted-foreground">Fresh jobs posted by verified recruiters</p>
                </div>
                <button
                    onClick={() => navigate('/jobs')}
                    className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4 transition-colors">
                    View all jobs <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Grid */}
            {latestSixJobs.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground text-sm">No job openings available right now</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {latestSixJobs.map((job) => {
                        const salary = formatSalary(job?.salary)
                        const salaryDisplay = !salary || salary === '₹ 0 - 0' || salary === '₹0 - ₹0' ? 'Not Disclosed' : salary
                        const isExternal = job?.isExternal

                        return (
                            <div
                                key={job._id}
                                className="group relative bg-background border border-border rounded-2xl p-5 flex flex-col gap-4 hover:border-primary/40 hover:shadow-md transition-all duration-200">
                                {/* Top row — company + save */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <CompanyLogo
                                            logo={job?.company?.companyname?.logo}
                                            name={job?.company?.companyname?.companyname}
                                        />
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-foreground leading-tight truncate">
                                                {job?.company?.companyname || 'Unknown Company'}
                                            </p>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                <Clock className="w-3 h-3 shrink-0" />
                                                {timeAgo(job?.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleSaveToggle(job._id)
                                        }}
                                        className="p-2 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors shrink-0"
                                        aria-label="Save job">
                                        <Bookmark
                                            size={16}
                                            fill={isSaved(job._id) ? 'currentColor' : 'none'}
                                            className={isSaved(job._id) ? 'text-primary' : ''}
                                        />
                                    </button>
                                </div>

                                {/* Title + external badge */}
                                <div className="flex items-start gap-2 flex-wrap">
                                    <h3 className="text-base font-bold text-foreground leading-snug">{job.title}</h3>
                                    {isExternal && (
                                        <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium shrink-0">
                                            <ExternalLink className="w-3 h-3" /> External
                                        </span>
                                    )}
                                </div>

                                {/* Meta chips */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1.5">
                                        <MapPin className="w-3 h-3" />
                                        {job?.company?.location ?? 'Location N/A'}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1.5">
                                        <Briefcase className="w-3 h-3" />
                                        {job?.jobType}
                                    </span>
                                    {job?.experience && (
                                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1.5">
                                            {formatExperience(job.experience)}
                                        </span>
                                    )}
                                </div>

                                {/* Skills — max 3 */}
                                {job?.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {job.skills.slice(0, 3).map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                        {job.skills.length > 3 && (
                                            <span className="text-xs text-muted-foreground px-2 py-1">+{job.skills.length - 3} more</span>
                                        )}
                                    </div>
                                )}

                                {/* Bottom — salary + view */}
                                <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                                    <div>
                                        <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wide font-semibold">Salary</p>
                                        <p className="text-sm font-bold text-foreground">{salaryDisplay}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/jobs/${job._id}`)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors">
                                        View
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Mobile view all */}
            <div className="flex md:hidden justify-center mt-8">
                <button
                    onClick={() => navigate('/jobs')}
                    className="flex items-center gap-2 text-sm font-medium text-primary border border-primary/30 px-6 py-2.5 rounded-xl hover:bg-primary/5 transition-colors">
                    View all jobs <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </section>
    )
}

export default LatestJobs
