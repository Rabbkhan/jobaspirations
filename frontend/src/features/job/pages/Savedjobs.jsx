import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { useGetSavedJobsQuery, useUnsaveJobMutation } from '../api/jobApi.js'
import { useNavigate } from 'react-router-dom'
import { MapPinIcon, BriefcaseIcon, Building2Icon, BookmarkXIcon, ArrowRightIcon, BookmarkIcon } from 'lucide-react'

const SavedJob = () => {
    const { data, isLoading } = useGetSavedJobsQuery()
    const [unsaveJob] = useUnsaveJobMutation()
    const navigate = useNavigate()

    const savedJobs = data?.savedJobs || []

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10 space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-28 rounded-2xl border border-border bg-muted/40 animate-pulse"
                    />
                ))}
            </div>
        )
    }

    if (savedJobs.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-28 flex flex-col items-center gap-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                    <BookmarkIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <h2 className="text-base font-semibold text-foreground">No saved jobs yet</h2>
                <p className="text-sm text-muted-foreground max-w-xs">
                    Jobs you bookmark will appear here. Start exploring to find your next opportunity.
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/jobs')}
                    className="gap-2 mt-1">
                    Browse jobs
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold text-foreground tracking-tight">Saved jobs</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} bookmarked
                    </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <BookmarkIcon className="w-4 h-4 text-primary" />
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Job list */}
            <div className="space-y-3">
                {savedJobs.map((job) => (
                    <div
                        key={job._id}
                        className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-border bg-background hover:border-primary/30 hover:bg-muted/30 transition-all duration-150">
                        {/* Company logo */}
                        <div className="w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                            <Building2Icon className="w-5 h-5 text-muted-foreground" />
                        </div>

                        {/* Job info */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                            <h3 className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">
                                {job.title}
                            </h3>

                            <p className="text-xs text-muted-foreground font-medium">{job.company?.companyname || 'Unknown Company'}</p>

                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                    <MapPinIcon className="w-3 h-3" />
                                    {job.company?.location || 'Remote'}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                    <BriefcaseIcon className="w-3 h-3" />
                                    {job.jobType || 'Full Time'}
                                </span>
                                <Badge className="bg-primary/10 text-primary border-0 text-[11px] font-medium rounded-full px-2.5 py-0.5">
                                    {job.category || 'General'}
                                </Badge>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/jobs/${job._id}`)}
                                className="text-xs gap-1.5 h-8">
                                View
                                <ArrowRightIcon className="w-3 h-3" />
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => unsaveJob(job._id)}
                                className="text-xs gap-1.5 h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                                <BookmarkXIcon className="w-3.5 h-3.5" />
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SavedJob
