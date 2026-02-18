import { Button } from '@/shared/ui/button'
import { Clock, Rocket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ConsultancyCommingSoon = () => {
    const navigate = useNavigate()

    return (
        <section className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="w-10 h-10 text-primary" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold">
                    Career Guidance is
                    <span className="text-primary"> Coming Soon</span>
                </h1>

                {/* Description */}
                <p className="text-muted-foreground text-lg leading-relaxed">
                    We are building something powerful to help students with professional mentoring, expert counseling, resume guidance and
                    personalized career roadmaps.
                    <br />
                    Our team is working hard behind the scenes.
                </p>

                {/* Highlight Block */}
                <div className="bg-muted border rounded-2xl p-6 md:p-8 shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">What you can expect:</h3>

                    <ul className="text-muted-foreground text-sm space-y-2">
                        <li>• One-to-one expert guidance</li>
                        <li>• Resume & skill development support</li>
                        <li>• Direct recruiter connect & hiring assistance</li>
                    </ul>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                        size="lg"
                        onClick={() => navigate('/jobs')}>
                        Explore Jobs
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/')}>
                        Back to Home
                    </Button>
                </div>

                {/* Footer Note */}
                <div className="flex justify-center gap-2 text-muted-foreground text-sm">
                    <Rocket className="w-4" />
                    Launching Soon…
                </div>
            </div>
        </section>
    )
}

export default ConsultancyCommingSoon
