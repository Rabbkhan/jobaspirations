import { Button } from '@/shared/ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const FinalCTA = () => {
    const { user } = useSelector((state) => state.auth)

    const getPrimaryLink = () => {
        if (!user) return '/register'
        if (user.role === 'student') return '/profile'
        if (user.role === 'recruiter') return '/admin'
        return '/register'
    }

    const getPrimaryLabel = () => {
        if (!user) return 'Create Profile'
        if (user.role === 'student') return 'Go to Profile'
        return 'Go to Dashboard'
    }

    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-foreground">Ready to Build Your Career?</h2>
                <p className="text-muted-foreground mt-4 mb-8">Get expert guidance, verified opportunities, and personalized career support.</p>

                <div className="flex justify-center gap-4">
                    <Link to={getPrimaryLink()}>
                        <Button size="lg">{getPrimaryLabel()}</Button>
                    </Link>
                    <Link to="/jobs">
                        <Button
                            size="lg"
                            variant="outline">
                            Browse Jobs
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FinalCTA
