import React from 'react'
import { Users, CheckCircle, Briefcase, Rocket, Laptop } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const metrics = [
    { title: 'Students Placed', desc: 'Over 500 students successfully placed in top companies', value: '500+', icon: Users },
    { title: 'Recruitment Partners', desc: 'Collaborating with 100+ organizations', value: '100+', icon: Briefcase },
    { title: 'Client Satisfaction', desc: 'Trusted for quality and speed', value: '95%', icon: CheckCircle },
    { title: 'Tech & Consulting Roles', desc: 'Opportunities across multiple industries', value: '50+', icon: Laptop },
    { title: 'Fast Hiring', desc: 'Reduce your hiring cycle', value: '30 Days', icon: Rocket }
]

const FeaturedMetricsCarousel = () => (
    <section className="py-20 bg-muted/40 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                        Our impact
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                        Why Students & Companies
                        <br />
                        Choose Us
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md">Highlighting our services and successful placements.</p>
                </div>
                <p className="text-[11px] text-muted-foreground shrink-0 self-end pb-1">{metrics.length} key metrics</p>
            </div>

            {/* Carousel */}
            <Carousel
                opts={{ align: 'start', loop: true }}
                plugins={[Autoplay({ delay: 3000 })]}
                className="w-full">
                <CarouselContent className="-ml-1">
                    {metrics.map((metric, idx) => {
                        const Icon = metric.icon
                        return (
                            <CarouselItem
                                key={idx}
                                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                                <div className="border border-border rounded-2xl bg-background shadow-sm p-5 h-full flex flex-col gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all">
                                    {/* Icon + value row */}
                                    <div className="flex items-center justify-between">
                                        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground/50 tracking-widest">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* Value */}
                                    <p className="text-2xl font-extrabold text-foreground leading-none">{metric.value}</p>

                                    {/* Title + desc */}
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-semibold text-foreground">{metric.title}</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{metric.desc}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>

                <div className="flex justify-end gap-2 mt-6">
                    <CarouselPrevious className="static translate-y-0 w-8 h-8 rounded-full border border-border bg-background hover:bg-primary/10 hover:border-primary/40 transition-colors" />
                    <CarouselNext className="static translate-y-0 w-8 h-8 rounded-full border border-border bg-background hover:bg-primary/10 hover:border-primary/40 transition-colors" />
                </div>
            </Carousel>
        </div>
    </section>
)

export default FeaturedMetricsCarousel
