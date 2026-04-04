import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { QuoteIcon } from 'lucide-react'

const testimonials = [
    {
        feedback: 'The team helped me understand what roles fit my skills and how to improve my resume. The guidance gave me a lot of clarity.',
        tag: 'Rahul Pattanayak'
    },
    {
        feedback: 'I was confused about my career direction. After speaking with the Job Aspirations team, I had a clear plan and learning roadmap.',
        tag: 'Pritam Sao'
    },
    {
        feedback: 'Their interview preparation tips and resume suggestions were practical and easy to apply.',
        tag: 'Sudip Guchaiate'
    },
    {
        feedback: 'I appreciated the honest feedback on my skills and what I should focus on instead of false promises.',
        tag: 'Bijoy Samanto'
    },
    {
        feedback: 'The session helped me identify my strengths and gaps clearly. I now know exactly what skills I need to work on.',
        tag: 'Amit Kumar'
    },
    {
        feedback: 'The resume review was detailed and actionable. I was able to improve my profile significantly in a short time.',
        tag: 'Sneha Sharma'
    },
    {
        feedback: 'I got realistic career advice instead of generic motivation. The roadmap they shared was very practical.',
        tag: 'Rohit Verma'
    },
    {
        feedback: 'Their guidance on switching roles gave me confidence and a clear learning path aligned with my goals.',
        tag: 'Neha Singh'
    },
    {
        feedback: 'Mock interview feedback helped me understand where I was going wrong and how to communicate better.',
        tag: 'Ankit Mishra'
    }
]

const TestimonialCarousel = () => {
    return (
        <section className="py-20 bg-background border-y border-border">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                            <QuoteIcon className="w-3 h-3" />
                            Student Feedback
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight">What Students Are Saying</h2>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Early feedback from students who interacted with our career guidance team.
                        </p>
                    </div>
                    <p className="text-[11px] text-muted-foreground shrink-0 self-end pb-1">{testimonials.length} reviews</p>
                </div>

                {/* Carousel */}
                <Carousel
                    opts={{ align: 'start', loop: true }}
                    plugins={[Autoplay({ delay: 4500 })]}>
                    <CarouselContent>
                        {testimonials.map((t, idx) => (
                            <CarouselItem
                                key={idx}
                                className="md:basis-1/2 lg:basis-1/3 pl-4">
                                <div className="border border-border rounded-2xl bg-background shadow-sm p-5 h-full flex flex-col gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all">
                                    {/* Quote icon */}
                                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                        <QuoteIcon className="w-3.5 h-3.5 text-primary" />
                                    </div>

                                    {/* Feedback */}
                                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.feedback}</p>

                                    {/* Author */}
                                    <div className="flex items-center gap-2.5 pt-3 border-t border-border">
                                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                            <span className="text-[10px] font-bold text-primary">{t.tag.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-foreground">{t.tag}</p>
                                            <p className="text-[10px] text-muted-foreground">Verified student</p>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="flex justify-end gap-2 mt-6">
                        <CarouselPrevious className="static translate-y-0 w-8 h-8 rounded-full border border-border bg-background hover:bg-primary/10 hover:border-primary/40 transition-colors" />
                        <CarouselNext className="static translate-y-0 w-8 h-8 rounded-full border border-border bg-background hover:bg-primary/10 hover:border-primary/40 transition-colors" />
                    </div>
                </Carousel>
            </div>
        </section>
    )
}

export default TestimonialCarousel
