import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Users, Briefcase, Building2 } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'
import { toast } from 'sonner'
import { useGetRecruiterDashboardQuery } from '../api/recruiterApi.js'

const RecruiterDashboard = () => {
    const { data, isLoading, isError, error, refetch } = useGetRecruiterDashboardQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    })
    if (isLoading) {
        return (
            <div className="min-h-screen p-6 space-y-6 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-28 bg-muted rounded-xl"
                        />
                    ))}
                </div>
                <div className="h-64 bg-muted rounded-xl" />
            </div>
        )
    }

    if (isError) {
        toast.error(error?.data?.message || 'Failed to load dashboard')

        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-muted-foreground">Unable to load dashboard</p>
                <Button onClick={refetch}>Retry</Button>
            </div>
        )
    }

    const stats = data?.stats || {}
    const recentApplicants = data?.recentApplicants || []

    return (
        <div className="min-h-screen bg-background p-6 space-y-6">
            {/* 🔥 Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Jobs"
                    value={stats.totalJobs}
                    icon={<Briefcase className="w-6 h-6 text-primary" />}
                />

                <StatCard
                    title="Total Applicants"
                    value={stats.totalApplicants}
                    icon={<Users className="w-6 h-6 text-primary" />}
                />

                <StatCard
                    title="Active Companies"
                    value={stats.activeCompanies}
                    icon={<Building2 className="w-6 h-6 text-primary" />}
                />
            </div>

            {/* 🔥 Recent Applicants */}
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Recent Applicants</CardTitle>
                    <Button
                        variant="outline"
                        size="sm">
                        View All
                    </Button>
                </CardHeader>

                <CardContent>
                    {recentApplicants.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">No recent applicants yet</div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="text-left py-3 px-3">Name</th>
                                    <th className="text-left py-3 px-3">Job</th>
                                    <th className="text-left py-3 px-3">Applied On</th>
                                    <th className="text-left py-3 px-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentApplicants.map((app) => (
                                    <tr
                                        key={app._id}
                                        className="border-b hover:bg-muted/50 transition">
                                        <td className="py-3 px-3 font-medium">{app.applicant?.fullname}</td>
                                        <td className="py-3 px-3">{app.job?.title}</td>
                                        <td className="py-3 px-3">{new Date(app.createdAt).toLocaleDateString('en-IN')}</td>
                                        <td className="py-3 px-3">
                                            <StatusBadge status={app.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

const StatCard = ({ title, value, icon }) => (
    <Card className="hover:shadow-md transition">
        <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-sm">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent className="text-3xl font-bold">{value}</CardContent>
    </Card>
)

const StatusBadge = ({ status }) => {
    const styles = {
        pending: 'bg-yellow-500/10 text-yellow-600',
        accepted: 'bg-green-500/10 text-green-600',
        rejected: 'bg-red-500/10 text-red-600'
    }

    return <Badge className={styles[status] || ''}>{status}</Badge>
}

export default RecruiterDashboard
