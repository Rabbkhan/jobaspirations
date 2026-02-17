import React from 'react'
import { Code2, Database, Palette, PenTool, Laptop, Users, Briefcase, Rocket } from 'lucide-react'

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import Autoplay from 'embla-carousel-autoplay'

const categories = [
    { title: 'Frontend Developer', jobs: '1,240 Jobs', icon: Code2 },
    { title: 'Backend Developer', jobs: '980 Jobs', icon: Database },
    { title: 'UI/UX Designer', jobs: '540 Jobs', icon: Palette },
    { title: 'Content Writer', jobs: '320 Jobs', icon: PenTool },
    { title: 'Software Engineer', jobs: '1,870 Jobs', icon: Laptop },
    { title: 'HR & Recruitment', jobs: '210 Jobs', icon: Users },
    { title: 'Business Analyst', jobs: '610 Jobs', icon: Briefcase },
    { title: 'Product Manager', jobs: '420 Jobs', icon: Rocket }
]

const CategoryCarousel = () => {
    return (
        <section className="py-16 bg-background">
            <div className="max-w-6xl mx-auto px-6">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-center">Explore Job Categories</h2>
                <p className="text-muted-foreground text-center mt-2 mb-10">Find opportunities based on your interests and skills.</p>

                {/* SHADCN CAROUSEL */}
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2500
                        })
                    ]}
                    className="w-full">
                    <CarouselContent className="ml-1">
                        {categories.map((cat, idx) => {
                            const Icon = cat.icon

                            return (
                                <CarouselItem
                                    key={idx}
                                    className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <Card
                                        className="
                      p-5 group cursor-pointer border rounded-xl
                      shadow-sm bg-card transition-all
                      hover:shadow-md hover:border-primary/50 
                      hover:-translate-y-1
                    ">
                                        <CardHeader className="p-0 space-y-3">
                                            {/* Icon */}
                                            <div
                                                className="
                          p-3 w-fit rounded-xl
                          bg-primary/10 group-hover:bg-primary/15 transition
                        ">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>

                                            <CardTitle className="text-lg font-semibold">{cat.title}</CardTitle>

                                            <CardDescription className="text-sm">{cat.jobs}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>

                    {/* Carousel Controls */}
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    )
}

export default CategoryCarousel
