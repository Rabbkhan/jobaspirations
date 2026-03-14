import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useGetSavedJobsQuery, useUnsaveJobMutation } from '../api/jobApi.js'
import { useNavigate } from 'react-router-dom'
import { MapPin, Briefcase, Building2 } from 'lucide-react'

const Savedjob = () => {
    const { data, isLoading } = useGetSavedJobsQuery()
    const [unsaveJob] = useUnsaveJobMutation()
    const navigate = useNavigate()

    if (isLoading) {
        return <div className="flex justify-center py-20 text-muted-foreground">Loading saved jobs...</div>
    }

    const savedJobs = data?.savedJobs || []

    if (savedJobs.length === 0) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-semibold mb-2">No Saved Jobs</h2>
                <p className="text-muted-foreground">Jobs you bookmark will appear here.</p>
            </div>
        )
    }

    const handleRemove = async (jobId) => {
        await unsaveJob(jobId)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-5 mt-4 mb-4">
            {savedJobs.map((job) => (
                <Card
                    key={job._id}
                    className="border hover:shadow-md transition duration-200">
                    <CardContent className="p-6">
                        <div className="flex gap-4 justify-between flex-col md:flex-row">
                            {/* Left Section */}
                            <div className="flex gap-4">
                                {/* Company Logo */}
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-muted-foreground" />
                                </div>

                                {/* Job Details */}
                                <div>
                                    <h3 className="text-lg font-semibold leading-none">{job.title}</h3>

                                    <p className="text-sm text-muted-foreground mt-1">{job.company?.companyname || 'Unknown Company'}</p>

                                    {/* Metadata */}
                                    <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            {job.company?.location || 'Remote'}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Briefcase size={14} />
                                            {job.jobType || 'Full Time'}
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex gap-2 mt-3">
                                        <Badge variant="secondary">{job.category || 'General'}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Right Actions */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => navigate(`/jobs/${job._id}`)}>
                                    View Job
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={() => handleRemove(job._id)}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Savedjob
