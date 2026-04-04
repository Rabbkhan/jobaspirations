import React, { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Link } from 'react-router-dom'
import { Briefcase, Edit, Trash2, Plus, SearchIcon, Users } from 'lucide-react'
import { toast } from 'sonner'
import { useDeleteRecruiterJobMutation, useGetRecruiterJobsQuery } from '../api/recruiterApi.js'

const RecruiterJobs = () => {
    const [search, setSearch] = useState('')
    const { data, isLoading, isError, error } = useGetRecruiterJobsQuery()
    const [deleteJob, { isLoading: isDeleting }] = useDeleteRecruiterJobMutation()

    const jobs = data?.jobs || []
    const filteredJobs = jobs.filter((job) => job.title.toLowerCase().includes(search.toLowerCase()))

    const handleDelete = async (jobId) => {
        try {
            const res = await deleteJob(jobId).unwrap()
            toast.success(res?.message || 'Job deleted')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to delete job')
        }
    }

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto my-10 px-4 space-y-6 animate-pulse">
                <div className="h-24 rounded-2xl bg-muted border border-border" />
                <div className="h-12 rounded-xl bg-muted border border-border" />
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="h-16 rounded-2xl bg-muted border border-border"
                    />
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3 text-center px-4">
                <span className="text-5xl">📋</span>
                <h2 className="text-xl font-bold text-foreground">Failed to load jobs</h2>
                <p className="text-sm text-muted-foreground">{error?.data?.message || 'Something went wrong'}</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto my-10 px-4 space-y-8">
            {/* ── Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Job listings
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">Manage Jobs</h1>
                        <p className="text-xs text-muted-foreground">
                            {jobs.length} job{jobs.length !== 1 ? 's' : ''} posted
                        </p>
                    </div>
                    <Link
                        to="/recruiter/jobs/create"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
                        <Plus className="w-3.5 h-3.5" />
                        Post a job
                    </Link>
                </div>
            </div>

            {/* ── Search ── */}
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search job titles..."
                    className="pl-9 bg-background border-border rounded-xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* ── Section divider ── */}
            <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">
                    {filteredJobs.length} result{filteredJobs.length !== 1 ? 's' : ''}
                </p>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* ── Jobs list ── */}
            {filteredJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 border border-border rounded-2xl bg-background">
                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No jobs found</p>
                    <p className="text-xs text-muted-foreground">{search ? 'Try a different search term' : 'Post your first job to get started'}</p>
                </div>
            ) : (
                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm">
                    {filteredJobs.map((job, idx) => (
                        <div
                            key={job._id}
                            className={`flex items-center gap-4 px-5 py-4 hover:bg-primary/5 transition-colors ${
                                idx !== filteredJobs.length - 1 ? 'border-b border-border' : ''
                            }`}>
                            {/* Icon */}
                            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <Briefcase className="w-4 h-4 text-primary" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">{job.title}</p>
                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                    <span className="text-xs text-muted-foreground">{job.company?.companyname}</span>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span className="text-xs text-muted-foreground">{job.location}</span>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                        {job.jobType}
                                    </span>
                                </div>
                            </div>

                            {/* Applicants */}
                            <Link
                                to={`/recruiter/jobs/${job._id}/applications`}
                                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary border border-border hover:border-primary/40 px-3 py-1.5 rounded-xl transition-colors">
                                <Users className="w-3.5 h-3.5" />
                                {job.applications?.length || 0} applicant{job.applications?.length !== 1 ? 's' : ''}
                            </Link>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <Link
                                    to={`/recruiter/jobs/edit/${job._id}`}
                                    className="w-8 h-8 rounded-xl border border-border flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-colors">
                                    <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                                </Link>
                                <button
                                    disabled={isDeleting}
                                    onClick={() => handleDelete(job._id)}
                                    className="w-8 h-8 rounded-xl border border-red-500/20 flex items-center justify-center hover:bg-red-500/5 hover:border-red-500/40 transition-colors disabled:opacity-50">
                                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecruiterJobs
