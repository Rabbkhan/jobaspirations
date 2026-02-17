import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const Privacypolicy = () => {
    return (
        <div className="min-h-screen bg-muted/10 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Page Title */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
                    <p className="mt-2 text-muted-foreground text-sm md:text-base">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <Card className="rounded-2xl shadow-lg border border-gray-700">
                    <CardHeader className="bg-primary/5 p-6 rounded-t-2xl">
                        <CardTitle className="text-2xl text-primary font-semibold">Your Privacy Matters</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-8 text-base leading-relaxed text-muted-foreground p-6">
                        {/* Intro */}
                        <p>
                            At <span className="font-medium text-foreground">Job Aspirations</span>, we respect your privacy and are committed to
                            protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you
                            use our platform.
                        </p>

                        <Separator className="border-gray-700" />

                        {/* Section 1 */}
                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-foreground mb-2">1. Information We Collect</h2>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li>Personal details such as name and email address</li>
                                <li>Resume, skills, and job preferences</li>
                                <li>Account activity and usage data</li>
                            </ul>
                        </section>

                        <Separator className="border-gray-700" />

                        {/* Section 2 */}
                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li>To connect job seekers with recruiters</li>
                                <li>To improve platform functionality and experience</li>
                                <li>To send important updates and notifications</li>
                            </ul>
                        </section>

                        <Separator className="border-gray-700" />

                        {/* Section 3 */}
                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-foreground mb-2">3. Data Protection</h2>
                            <p>
                                We use industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.
                            </p>
                        </section>

                        <Separator className="border-gray-700" />

                        {/* Section 4 */}
                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-foreground mb-2">4. Sharing of Information</h2>
                            <p>
                                We do not sell your personal data. Your information is shared only with recruiters when you apply for jobs or where
                                required by law.
                            </p>
                        </section>

                        <Separator className="border-gray-700" />

                        {/* Section 5 */}
                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-foreground mb-2">5. Cookies</h2>
                            <p>We use cookies to enhance your experience, analyze usage, and improve our services.</p>
                        </section>

                        <Separator className="border-gray-700" />

                        {/* Section 6 */}
                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-foreground mb-2">6. Your Rights</h2>
                            <p>You may access, update, or delete your personal information at any time by contacting us.</p>
                        </section>

                        <Separator className="border-gray-700" />

                        {/* Contact */}
                        <section className="mt-6">
                            <h2 className="text-xl font-semibold text-foreground mb-2">7. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                            <p className="mt-2 font-medium text-primary">info@jobaspirations.in</p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Privacypolicy
