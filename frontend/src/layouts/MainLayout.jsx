import { Outlet } from 'react-router-dom'
import Footer from '@/layouts/components/Footer'
import Navbar from '@/layouts/components/Navbar'
import { useGetUserQuery } from '@/features/profile/api/profileApi.js'
import { useGetSavedJobsQuery } from '@/features/job/api/jobApi.js'
import { useSelector } from 'react-redux'

const MainLayout = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const { data: user } = useGetUserQuery(undefined, { skip: !isAuthenticated })
    useGetSavedJobsQuery(undefined, { skip: !isAuthenticated })

    return (
        <div className="min-h-screen bg-background">
            <Navbar user={user} />

            <div className="min-h-screen w-full overflow-x-hidden">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

export default MainLayout
