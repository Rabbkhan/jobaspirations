import { useSelector } from 'react-redux'
import AppRoutes from './routes/AppRoutes.jsx'
import ScrollToTop from '@/shared/components/ScrollToTop'
import LoaderScreen from '@/shared/components/LoaderScreen'
import { useGetSavedJobsQuery } from './features/job/api/jobApi.js'

function App() {
    const { user } = useSelector((state) => state.auth)

    const isAuthenticated = Boolean(user)

    const { isLoading } = useGetSavedJobsQuery(undefined, {
        skip: !isAuthenticated
    })

    if (isLoading) return <LoaderScreen />

    return (
        <div className="bg-background min-h-screen">
            <ScrollToTop />
            <AppRoutes />
        </div>
    )
}

export default App
