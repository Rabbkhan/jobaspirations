import React, { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Card } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Edit, Trash2, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
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
        return <div className="p-6">Loading jobs...</div>
    }

    if (isError) {
        return <div className="p-6 text-red-500">{error?.data?.message || 'Error loading jobs'}</div>
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Jobs</h1>

                <Link to="/recruiter/jobs/create">
                    <Button className="flex gap-2">
                        <Plus size={18} /> Create Job
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <Card className="p-4">
                <Input
                    placeholder="Search job titles..."
                    className="w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Card>

            {/* Table */}
            <Card className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Applicants</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell className="font-medium">{job.title}</TableCell>
                                <TableCell>{job.company?.companyname}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{job.jobType}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/recruiter/jobs/${job._id}/applications`}>
                                        <Button
                                            size="sm"
                                            variant="outline">
                                            View ({job.applications?.length || 0})
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-3">
                                        <Link to={`/recruiter/jobs/edit/${job._id}`}>
                                            <Button
                                                size="sm"
                                                variant="outline">
                                                <Edit size={16} />
                                            </Button>
                                        </Link>

                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            disabled={isDeleting}
                                            onClick={() => handleDelete(job._id)}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                        {filteredJobs.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-6">
                                    No jobs found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

export default RecruiterJobs
