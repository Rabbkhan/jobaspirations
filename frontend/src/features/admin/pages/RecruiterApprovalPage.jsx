import { Card, CardHeader, CardContent } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'

const recruitersMock = [
    { _id: 1, name: 'John Doe', email: 'john@example.com', approved: false },
    { _id: 2, name: 'Jane Smith', email: 'jane@example.com', approved: true }
]

const RecruiterApprovalPage = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Recruiter Approvals</h2>

            {recruitersMock.map((r) => (
                <Card key={r._id}>
                    <CardHeader className="flex justify-between items-center">
                        <h3 className="font-semibold">{r.name}</h3>
                        <Badge variant={r.approved ? 'secondary' : 'destructive'}>{r.approved ? 'Approved' : 'Pending'}</Badge>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                        <p>{r.email}</p>
                        {!r.approved && <Button>Approve</Button>}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default RecruiterApprovalPage
