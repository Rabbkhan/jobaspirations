import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'
import {
    useApproveRecruiterMutation,
    useGetRecruiterApplicationsQuery,
    useRejectRecruiterMutation
} from '@/features/recruiter/api/recruiterAapplicationsApi.js'

const RecruiterApprovalPage = () => {
    const [approvingId, setApprovingId] = useState(null)
    const [rejectingId, setRejectingId] = useState(null)

    const { data, isLoading, isError } = useGetRecruiterApplicationsQuery()

    const [approveRecruiter] = useApproveRecruiterMutation()
    const [rejectRecruiter] = useRejectRecruiterMutation()

    const recruiters = data?.applications || []

    const handleApprove = async (id) => {
        try {
            setApprovingId(id)
            await approveRecruiter(id).unwrap()
            toast.success('Recruiter approved successfully')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to approve recruiter')
        } finally {
            setApprovingId(null)
        }
    }

    const handleReject = async (id) => {
        try {
            setRejectingId(id)
            await rejectRecruiter({ id }).unwrap()
            toast.success('Recruiter rejected')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to reject recruiter')
        } finally {
            setRejectingId(null)
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recruiter Approvals</h2>

            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Failed to load applications</p>
            ) : recruiters.length === 0 ? (
                <p>No applications found</p>
            ) : (
                recruiters.map((r) => (
                    <Card key={r._id}>
                        <CardHeader className="flex justify-between items-center">
                            <h3 className="font-semibold">{r.userId?.fullname}</h3>

                            <Badge variant={r.status === 'approved' ? 'secondary' : 'destructive'}>
                                {r.status === 'approved' ? 'Approved' : 'Pending'}
                            </Badge>
                        </CardHeader>

                        <CardContent className="flex justify-between items-center">
                            <p>{r.userId?.email}</p>

                            {r.status !== 'approved' && (
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleApprove(r._id)}
                                        disabled={approvingId === r._id}>
                                        {approvingId === r._id ? 'Approving...' : 'Approve'}
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        onClick={() => handleReject(r._id)}
                                        disabled={rejectingId === r._id}>
                                        {rejectingId === r._id ? 'Rejecting...' : 'Reject'}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    )
}

export default RecruiterApprovalPage
