// LoaderScreen.jsx
import { Loader2 } from 'lucide-react'

const LoaderScreen = () => {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
            {/* Spinner */}
            <Loader2 className="animate-spin h-12 w-12 text-primary mb-6" />

            {/* App Name */}
            <h1 className="text-3xl font-bold text-foreground">JobAspirations</h1>
        </div>
    )
}

export default LoaderScreen
