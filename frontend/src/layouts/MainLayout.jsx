import { Outlet } from 'react-router-dom'
import Footer from '@/layouts/components/Footer'
import Navbar from '@/layouts/components/Navbar'
import { useEffect } from 'react'
import { loadSavedJobs } from '@/thunk/SavedJobThunk'
import { useDispatch } from 'react-redux'

const MainLayout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadSavedJobs())
    }, [dispatch])

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="min-h-screen w-full overflow-x-hidden">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

export default MainLayout
