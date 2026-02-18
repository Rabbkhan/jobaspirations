import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Separator } from '@/shared/ui/separator'

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Page Title */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Terms & Conditions</h1>
                    <p className="mt-2 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <Card className="rounded-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Agreement to Use Our Platform</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-8 text-sm leading-relaxed text-muted-foreground">
                        {/* Intro */}
                        <p>
                            By accessing or using <span className="font-medium text-foreground">Job Aspirations</span>, you agree to be bound by these
                            Terms & Conditions. If you do not agree, please do not use our platform.
                        </p>

                        <Separator />

                        {/* Section 1 */}
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">1. User Responsibilities</h2>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Provide accurate and up-to-date information</li>
                                <li>Maintain confidentiality of account credentials</li>
                                <li>Use the platform for lawful purposes only</li>
                            </ul>
                        </section>

                        <Separator />

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">2. Recruiter Responsibilities</h2>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Ensure job postings are genuine and accurate</li>
                                <li>Comply with applicable employment laws</li>
                                <li>Handle candidate data responsibly</li>
                            </ul>
                        </section>

                        <Separator />

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">3. Job Applications</h2>
                            <p>
                                We are not responsible for hiring decisions, interview outcomes, or employment agreements made between users and
                                recruiters.
                            </p>
                        </section>

                        <Separator />

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">4. Account Suspension</h2>
                            <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful activities.</p>
                        </section>

                        <Separator />

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">5. Intellectual Property</h2>
                            <p>
                                All content, branding, and intellectual property on this platform are owned by Job Aspirations and may not be used
                                without permission.
                            </p>
                        </section>

                        <Separator />

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">6. Limitation of Liability</h2>
                            <p>Job Aspirations shall not be liable for any direct, indirect, or consequential damages arising from platform usage.</p>
                        </section>

                        <Separator />

                        {/* Section 7 */}
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">7. Changes to Terms</h2>
                            <p>We may update these terms at any time. Continued use of the platform indicates acceptance of the updated terms.</p>
                        </section>

                        <Separator />

                        {/* Contact */}
                        <section>
                            <h2 className="text-lg font-semibold text-foreground mb-2">8. Contact Information</h2>
                            <p>If you have any questions regarding these Terms & Conditions, contact us at:</p>
                            <p className="mt-1 font-medium text-foreground">info@jobaspirations.in</p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default TermsAndConditions
