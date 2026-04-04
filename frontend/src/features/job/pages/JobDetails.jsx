import React, { useEffect, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Separator } from '@/shared/ui/separator'
import {
    CalendarIcon,
    MapPinIcon,
    BriefcaseIcon,
    UsersIcon,
    LayersIcon,
    ClockIcon,
    BuildingIcon,
    ExternalLinkIcon,
    CheckCircleIcon,
    BookmarkIcon,
    ShareIcon,
    BadgeCheckIcon
} from 'lucide-react'
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
            const tid = setTimeout(() => setIsApplied(applied))
            return () => clearTimeout(tid)
        }
    }, [job, user])

    useEffect(() => {
        if (isError) toast.error(error?.data?.message || 'Failed to load job')
    }, [isError, error])

    const applyJobHandler = async () => {
        try {
            if (job?.isExternal && job?.applyUrl) {
                window.open(job.applyUrl, '_blank', 'noopener noreferrer')
                return
            }
            const res = await applyJob(id).unwrap()
            toast.success(res.message)
            setIsApplied(true)
        } catch (err) {
            toast.error(err?.data?.message || 'Application failed')
        }
    }

    if (isLoading) return <JobDetailsSkeleton />

    const salary = formatSalary(job?.salary)
    const hasRequirements = job?.requirements?.length > 0
    const hasSkills = job?.skills?.length > 0
    const isExternal = job?.isExternal

    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* ── TOP CARD — company + title + actions ── */}
                <div className="bg-background border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                    {/* external badge */}
                    {isExternal && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full mb-4">
                            <ExternalLinkIcon className="w-3 h-3" />
                            External Listing via {job?.externalSource === 'jsearch' ? 'Job Search' : job?.externalSource}
                        </span>
                    )}

                    {/* company row */}
                    <div className="flex items-center gap-3 mb-4">
                        {job?.company?.logo ? (
                            <img
                                src={job.company.logo}
                                alt={job?.company?.companyname}
                                className="w-12 h-12 rounded-xl object-contain border border-border bg-muted p-1"
                                onError={(e) => (e.target.style.display = 'none')}
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <BuildingIcon className="w-6 h-6 text-primary" />
                            </div>
                        )}
                        <div>
                            <p className="font-semibold text-foreground">{job?.company?.companyname ?? 'Company'}</p>
                            {job?.company?.location && <p className="text-xs text-muted-foreground">{job.company.location}</p>}
                        </div>
                        {job?.company?.website && (
                            <>
                                <a
                                    href={job?.company?.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-auto text-xs text-primary hover:underline flex items-center gap-1">
                                    Visit website <ExternalLinkIcon className="w-3 h-3" />
                                </a>
                            </>
                        )}
                    </div>

                    {/* job title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-5">{job?.title}</h1>

                    {/* meta chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {[
                            { icon: <BriefcaseIcon className="w-3.5 h-3.5" />, label: job?.jobType },
                            { icon: <MapPinIcon className="w-3.5 h-3.5" />, label: job?.location },
                            { icon: <ClockIcon className="w-3.5 h-3.5" />, label: formatExperience(job?.experience) },
                            { icon: <LayersIcon className="w-3.5 h-3.5" />, label: `${job?.position ?? 1} Opening${job?.position > 1 ? 's' : ''}` },
                            !isExternal && { icon: <UsersIcon className="w-3.5 h-3.5" />, label: `${job?.applications?.length ?? 0} Applied` },
                            {
                                icon: <CalendarIcon className="w-3.5 h-3.5" />,
                                label: job?.createdAt
                                    ? new Date(job.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                                    : 'Recently'
                            }
                        ]
                            .filter(Boolean)
                            .map((item, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted rounded-full px-3 py-1.5">
                                    {item.icon}
                                    {item.label}
                                </span>
                            ))}
                    </div>

                    {/* salary + apply row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                        <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Salary</p>
                            <p className="text-lg font-bold text-foreground">{salary && salary !== '₹ 0 - 0' ? salary : 'Not Disclosed'}</p>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            {/* share button */}
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href)
                                    toast.success('Link copied!')
                                }}
                                className="shrink-0">
                                <ShareIcon className="w-4 h-4" />
                            </Button>

                            {/* apply button */}
                            <Button
                                size="lg"
                                onClick={isApplied ? undefined : applyJobHandler}
                                disabled={isApplied || applying}
                                className={`flex-1 sm:flex-none sm:min-w-[160px] font-semibold ${
                                    isApplied
                                        ? 'bg-green-600 hover:bg-green-600 cursor-default'
                                        : 'bg-gradient-to-r from-primary to-blue-600 hover:opacity-90'
                                }`}>
                                {isApplied ? (
                                    <span className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-4 h-4" /> Applied
                                    </span>
                                ) : applying ? (
                                    'Applying...'
                                ) : isExternal ? (
                                    <span className="flex items-center gap-2">
                                        Apply on Site <ExternalLinkIcon className="w-4 h-4" />
                                    </span>
                                ) : (
                                    'Apply Now'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* ── BODY — two column layout ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* left — main content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* description */}
                        {job?.description && (
                            <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                                <h2 className="text-base font-semibold text-foreground mb-4">Job Description</h2>
                                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</div>
                            </div>
                        )}

                        {/* requirements */}
                        {hasRequirements && (
                            <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                                <h2 className="text-base font-semibold text-foreground mb-4">Requirements</h2>
                                <ul className="space-y-2">
                                    {job.requirements.map((req, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* right — sidebar */}
                    <div className="space-y-6">
                        {/* skills */}
                        {hasSkills && (
                            <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                                <h2 className="text-base font-semibold text-foreground mb-4">Skills Required</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* job overview */}
                        <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                            <h2 className="text-base font-semibold text-foreground mb-4">Job Overview</h2>
                            <div className="space-y-3">
                                {[
                                    { label: 'Industry', value: job?.industry },
                                    { label: 'Job Type', value: job?.jobType },
                                    { label: 'Experience', value: formatExperience(job?.experience) },
                                    { label: 'Openings', value: job?.position },
                                    { label: 'Location', value: job?.location }
                                ]
                                    .filter((item) => item.value)
                                    .map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">{item.label}</span>
                                            <span className="font-medium text-foreground text-right max-w-[55%]">{item.value}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* apply again CTA for external */}
                        {isExternal && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-5">
                                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                                    This job is hosted on an external site. Clicking apply will open the original listing in a new tab.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails
