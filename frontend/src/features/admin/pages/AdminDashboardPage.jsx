import { Card, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAdmin } from '@/features/admin/adminAuthSlice'
import { useAdminLogoutMutation } from '@/features/admin/api/adminAuthApi'
import { baseApi } from '@/app/api/baseApi'
import { toast } from 'sonner'

const AdminDashboardPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [adminLogout] = useAdminLogoutMutation()

    const handleLogout = async () => {
        try {
            await adminLogout().unwrap()
        } catch {
            toast.error('Logout failed')
        } finally {
            // clear admin auth state
            dispatch(clearAdmin())

            // clear RTK Query cache
            dispatch(baseApi.util.resetApiState())

            navigate('/admin/login', { replace: true })
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">AdminDashboard</h2>

                <Button
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent>
                        <h4 className="font-semibold">Total Recruiters</h4>
                        <p className="text-2xl mt-2">120</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h4 className="font-semibold">Pending Approvals</h4>
                        <p className="text-2xl mt-2">12</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <h4 className="font-semibold">Total Blogs</h4>
                        <p className="text-2xl mt-2">35</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="h-64 flex items-center justify-center text-muted-foreground">Charts / Activity Feed Placeholder</CardContent>
            </Card>
        </div>
    )
}

export default AdminDashboardPage
