import React, { useState } from 'react'
import { Briefcase, MapPin, ArrowRight, Bookmark, Building2, ExternalLink, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatExperience, formatSalary, timeAgo } from '../utils/jobHelpers.js'

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

const JobCard = ({ job, isSaved = false, onToggleSave = () => {} }) => {
    const navigate = useNavigate()

    const salary = formatSalary(job?.salary)
    const salaryDisplay = !salary || salary === '₹ 0 - 0' || salary === '₹0 - ₹0' ? 'Not Disclosed' : salary
    const isExternal = job?.isExternal

    return (
        <div className="group relative w-full border border-border bg-background rounded-2xl p-5 flex flex-col gap-4 hover:border-primary/40 hover:shadow-md transition-all duration-200">
            {/* Top row — company + save */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <CompanyLogo
                        logo={job?.company?.logo}
                        name={job?.company?.companyname}
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
                        onToggleSave()
                    }}
                    className="p-2 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors shrink-0"
                    aria-label="Save job">
                    <Bookmark
                        size={16}
                        fill={isSaved ? 'currentColor' : 'none'}
                        className={isSaved ? 'text-primary' : ''}
                    />
                </button>
            </div>

            {/* Title + external badge */}
            <div className="flex items-start gap-2 flex-wrap">
                <h2 className="text-base font-bold text-foreground leading-snug">{job?.title}</h2>
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
                    {job?.location ?? 'Location not specified'}
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

            {/* Skills — max 4 */}
            {job?.skills?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 4).map((skill, idx) => (
                        <span
                            key={idx}
                            className="text-xs font-medium bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full">
                            {skill}
                        </span>
                    ))}
                    {job.skills.length > 4 && <span className="text-xs text-muted-foreground px-2.5 py-1">+{job.skills.length - 4} more</span>}
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
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    )
}

export default JobCard
