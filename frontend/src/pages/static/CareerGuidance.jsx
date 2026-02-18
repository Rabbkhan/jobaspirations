import { Button } from '@/shared/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { CheckCircle, ArrowRight, Target, Briefcase, ShieldCheck, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CareerGuidance() {
    const navigate = useNavigate()

    return (
        <div className="bg-background text-foreground">
            {/* HERO */}
            <section className="border-b">
                <div className="max-w-7xl mx-auto px-6 py-24 text-center space-y-6">
                    <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">Career Guidance & Consulting</span>

                    <h1 className="text-4xl md:text-6xl font-bold">Get Expert Guidance to Build a Successful Career</h1>

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Personalized mentoring, resume enhancement, interview preparation, and direct hiring support — everything you need to move
                        ahead.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center pt-4">
                        <Button
                            size="lg"
                            onClick={() => navigate('/book-session')}>
                            Book Consultation <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate('/assessment')}>
                            Start Free Career Assessment
                        </Button>
                    </div>
                </div>
            </section>

            {/* WHY SECTION */}
            <section className="py-16 border-b">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold">Why Career Guidance Matters</h2>
                    <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                        Most students struggle not because of lack of talent, but because of lack of direction.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mt-10">
                        {[
                            { icon: Target, title: 'Right Direction', desc: 'Understand your strengths and ideal career path.' },
                            { icon: ShieldCheck, title: 'Skill Gap Support', desc: 'Identify missing skills and improve effectively.' },
                            { icon: Briefcase, title: 'Better Opportunities', desc: 'Stand out and connect with better recruiters.' }
                        ].map((item, i) => {
                            const Icon = item.icon
                            return (
                                <Card
                                    key={i}
                                    className="p-6 text-left">
                                    <Icon className="w-8 h-8 text-primary mb-3" />
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-16 border-b">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center">What We Provide</h2>
                    <p className="text-muted-foreground text-center mt-2">Complete support to shape your professional journey</p>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {[
                            {
                                title: 'Resume Review & Optimization',
                                desc: 'ATS-friendly resume, formatting, and professional enhancement.'
                            },
                            {
                                title: 'Career Mentoring & Counselling',
                                desc: 'One-on-one guidance to define your best career direction.'
                            },
                            {
                                title: 'Interview Preparation',
                                desc: 'Mock interviews, HR questions, and personalized feedback.'
                            },
                            {
                                title: 'Skill Gap Analysis',
                                desc: 'Evaluate strengths and weaknesses with actionable plans.'
                            },
                            {
                                title: 'LinkedIn & Profile Branding',
                                desc: 'Create a professional brand that attracts recruiters.'
                            },
                            {
                                title: 'Direct Hiring Support',
                                desc: 'Connect with verified recruiters & real opportunities.'
                            }
                        ].map((item, i) => (
                            <Card
                                key={i}
                                className="p-6 hover:shadow-md transition">
                                <CardHeader className="p-0 mb-3">
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.desc}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-16 border-b">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center">How It Works</h2>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {['Register / Login', 'Choose Guidance Type', 'Get Personalized Mentoring'].map((step, index) => (
                            <div
                                key={index}
                                className="flex gap-4 items-start">
                                <div className="text-primary font-bold text-2xl">{index + 1}</div>
                                <p className="text-lg">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SUCCESS / TRUST */}
            <section className="py-16 border-b">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold">Trusted by Students & Recruiters</h2>

                    <div className="grid md:grid-cols-3 gap-6 mt-10">
                        {[
                            { value: '500+', label: 'Students Placed' },
                            { value: '100+', label: 'Recruitment Partners' },
                            { value: '95%', label: 'Satisfaction Rate' }
                        ].map((m, i) => (
                            <Card
                                key={i}
                                className="p-6">
                                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                                <h3 className="text-3xl font-bold">{m.value}</h3>
                                <p className="text-muted-foreground">{m.label}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 border-b">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>

                    <Accordion
                        type="single"
                        collapsible
                        className="w-full">
                        <AccordionItem value="1">
                            <AccordionTrigger>Is this guidance free?</AccordionTrigger>
                            <AccordionContent>You can keep a free version + a premium consultation if needed.</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="2">
                            <AccordionTrigger>Do you provide job placement?</AccordionTrigger>
                            <AccordionContent>Yes, through verified recruiters and partnerships.</AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="3">
                            <AccordionTrigger>Who will guide me?</AccordionTrigger>
                            <AccordionContent>Industry professionals, HR experts, and mentors.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-16 text-center">
                <h2 className="text-3xl font-bold">Ready to Build Your Career?</h2>
                <p className="text-muted-foreground mt-2">Get guidance that actually makes an impact.</p>

                <div className="flex gap-4 justify-center mt-6">
                    <Button
                        size="lg"
                        onClick={() => navigate('/book-session')}>
                        Book Consultation
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate('/assessment')}>
                        Start Free Assessment
                    </Button>
                </div>
            </section>
        </div>
    )
}
