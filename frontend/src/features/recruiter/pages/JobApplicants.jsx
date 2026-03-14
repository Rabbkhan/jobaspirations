import React from 'react'
import { useParams } from 'react-router-dom'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/shared/ui/table'
import { Card, CardHeader, CardContent } from '@/shared/ui/card'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select'
import { useGetRecruiterJobApplicantsQuery, useUpdateRecruiterApplicationStatusMutation } from '../api/recruiterApi.js'

const JobApplicants = () => {
    const { jobId } = useParams()

    const { data, isLoading, isError } = useGetRecruiterJobApplicantsQuery(jobId)

    const [updateStatus, { isLoading: isUpdating, error: updateError }] = useUpdateRecruiterApplicationStatusMutation()

    if (isLoading) return <div>Loading applicants...</div>
    if (isError) return <div>Failed to load applicants</div>

    const applicants = data?.applicants || []
    const jobTitle = data?.jobTitle || ''

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <h2 className="text-xl font-bold">Applicants for: {jobTitle}</h2>
            </CardHeader>

            <CardContent>
                {updateError && <p className="text-red-500 text-sm mb-3">Failed to update application status.</p>}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Skills</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {applicants.map((app) => (
                            <TableRow key={app._id}>
                                <TableCell>{app.applicant?.fullname}</TableCell>
                                <TableCell>{app.applicant?.email}</TableCell>
                                <TableCell>{app.applicant?.phoneNumber}</TableCell>

                                <TableCell>{app.applicant?.profile?.skills?.join(', ') || 'N/A'}</TableCell>

                                <TableCell>
                                    {app.applicant?.profile?.resume ? (
                                        <a
                                            href={app.applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline">
                                            View Resume
                                        </a>
                                    ) : (
                                        'No Resume'
                                    )}
                                </TableCell>

                                <TableCell>
                                    <Select
                                        value={app.status}
                                        onValueChange={(value) =>
                                            updateStatus({
                                                applicationId: app._id,
                                                status: value,
                                                jobId
                                            })
                                        }
                                        disabled={isUpdating}>
                                        <SelectTrigger className="w-32">
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="accepted">Accepted</SelectItem>
                                            <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default JobApplicants
