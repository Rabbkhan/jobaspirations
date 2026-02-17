import React from 'react'
import { Users, CheckCircle, Briefcase, Rocket, Laptop } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const metrics = [
    { title: 'Students Placed', desc: 'Over 500 students successfully placed in top companies', value: '500+', icon: Users, color: 'bg-primary/10' },
    { title: 'Recruitment Partners', desc: 'Collaborating with 100+ organizations', value: '100+', icon: Briefcase, color: 'bg-secondary/10' },
    { title: 'Client Satisfaction', desc: 'Trusted for quality and speed', value: '95%', icon: CheckCircle, color: 'bg-green-200/20' },
    { title: 'Tech & Consulting Roles', desc: 'Opportunities across multiple industries', value: '50+', icon: Laptop, color: 'bg-yellow-200/20' },
    { title: 'Fast Hiring', desc: 'Reduce your hiring cycle', value: '30 Days', icon: Rocket, color: 'bg-pink-200/20' }
]

const FeaturedMetricsCarousel = () => (
    <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Students & Companies Choose Us</h2>
            <p className="text-muted-foreground mt-2 mb-10">Highlighting our services and successful placements</p>

            <Carousel
                opts={{ align: 'start', loop: true }}
                plugins={[Autoplay({ delay: 3000 })]}
                className="w-full overflow-hidden">
                <CarouselContent className="-ml-1">
                    {metrics.map((metric, idx) => {
                        const Icon = metric.icon
                        return (
                            <CarouselItem
                                key={idx}
                                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <Card className="p-6 group cursor-pointer border rounded-xl shadow-sm bg-card transition-all hover:shadow-md hover:border-primary/50 hover:-translate-y-1">
                                    <CardHeader className="p-0 space-y-3">
                                        <div className={`p-3 w-fit rounded-xl ${metric.color}`}>
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-lg font-semibold text-foreground">
                                            {metric.value} — {metric.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm text-muted-foreground leading-relaxed">{metric.desc}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    </section>
)

export default FeaturedMetricsCarousel
