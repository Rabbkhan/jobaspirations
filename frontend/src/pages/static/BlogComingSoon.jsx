import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

const BlogComingSoon = () => {
    return (
        <main className="min-h-[70vh] flex items-center justify-center bg-background">
            <section className="max-w-3xl mx-auto px-6 text-center space-y-8">
                {/* Badge */}
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">Coming Soon</span>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Career Insights & Hiring Guides</h1>

                {/* Description */}
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    We’re building a knowledge hub with expert advice on careers, interviews, resumes, hiring trends, and skill development.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="border rounded-lg p-4 bg-card">Interview Preparation</div>
                    <div className="border rounded-lg p-4 bg-card">Resume & Portfolio Tips</div>
                    <div className="border rounded-lg p-4 bg-card">Hiring & Industry Trends</div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button size="lg">
                        Notify Me
                        <Mail className="ml-2 h-4 w-4" />
                    </Button>

                    <Button
                        size="lg"
                        variant="outline">
                        Explore Jobs
                    </Button>
                </div>

                {/* Footer note */}
                <p className="text-xs text-muted-foreground pt-4">Launching soon — stay tuned for weekly career insights.</p>
            </section>
        </main>
    )
}

export default BlogComingSoon
