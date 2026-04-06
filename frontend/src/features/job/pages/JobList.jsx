import React, { useState, useRef, useEffect } from 'react'
import JobCard from '@/features/job/components/Jobcard'
import HeaderFilterBar from '@/features/job/components/HeaderFilterBar'
import { Loader2 } from 'lucide-react'
import { useGetAllJobsQuery, useGetSavedJobsQuery, useSaveJobMutation, useUnsaveJobMutation } from '@/features/job/api/jobApi'

import { useDebounce } from '@/shared/hooks/useDebounce.js'
import MobileFilterDrawer from '../components/MobileFilterDrawer.jsx'
import { toast } from 'sonner'

const JobList = () => {
    const DEFAULT_FILTERS = {
        location: '',
        industry: '',
        salary: '',
        experience: ''
    }

    const [filters, setFilters] = useState(DEFAULT_FILTERS)

    const [page, setPage] = useState(1)
    const observerRef = useRef()
    const debouncedFilters = useDebounce(filters)

    const { data, isFetching, isLoading } = useGetAllJobsQuery({ page, filters: debouncedFilters })

    const { data: savedData } = useGetSavedJobsQuery()

    const [saveJob] = useSaveJobMutation()
    const [unsaveJob] = useUnsaveJobMutation()

    const jobs = data?.jobs || []
    const hasMore = data?.hasMore
    const resetFilters = () => {
        setFilters(DEFAULT_FILTERS)
        setPage(1)
    }

    const savedJobs = savedData?.savedJobs || []

    const isSaved = (id) => savedJobs.some((j) => j._id === id)

    const toggleSave = async (jobId) => {
        try {
            if (isSaved(jobId)) {
                await unsaveJob(jobId).unwrap()
            } else {
                await saveJob(jobId).unwrap()
            }
        } catch (err) {
            toast.error(err?.data?.message || 'Something went wrong')
        }
    }

    useEffect(() => {
        if (!observerRef.current || !hasMore || isFetching) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setPage((p) => p + 1)
            }
        })

        observer.observe(observerRef.current)
        return () => observer.disconnect()
    }, [hasMore, isFetching])

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <MobileFilterDrawer
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
            />

            <HeaderFilterBar
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
            />

            {/* Job count */}
            {!isLoading && data?.total > 0 && <p className="text-sm text-muted-foreground mt-4">{data.total} jobs found</p>}

            {/* No results */}
            {!isLoading && jobs.length === 0 && <p className="text-center text-muted-foreground mt-10">No jobs found. Try adjusting your filters.</p>}

            <div className="space-y-4 mt-2">
                {jobs.map((job) => (
                    <JobCard
                        key={job._id}
                        job={job}
                        isSaved={isSaved(job._id)}
                        onToggleSave={() => toggleSave(job._id)}
                    />
                ))}
            </div>

            {(isLoading || isFetching) && (
                <div className="flex justify-center py-6">
                    <Loader2 className="animate-spin" />
                </div>
            )}

            <div
                ref={observerRef}
                className="h-10"
            />
        </div>
    )
}

export default JobList
