import React from 'react'
import { ScrollTextIcon } from 'lucide-react'

const sections = [
    {
        title: '1. User Responsibilities',
        list: [
            'Provide accurate and up-to-date information',
            'Maintain confidentiality of account credentials',
            'Use the platform for lawful purposes only'
        ]
    },
    {
        title: '2. Recruiter Responsibilities',
        list: ['Ensure job postings are genuine and accurate', 'Comply with applicable employment laws', 'Handle candidate data responsibly']
    },
    {
        title: '3. Job Applications',
        text: 'We are not responsible for hiring decisions, interview outcomes, or employment agreements made between users and recruiters.'
    },
    {
        title: '4. Account Suspension',
        text: 'We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful activities.'
    },
    {
        title: '5. Intellectual Property',
        text: 'All content, branding, and intellectual property on this platform are owned by Job Aspirations and may not be used without permission.'
    },
    {
        title: '6. Limitation of Liability',
        text: 'Job Aspirations shall not be liable for any direct, indirect, or consequential damages arising from platform usage.'
    },
    {
        title: '7. Changes to Terms',
        text: 'We may update these terms at any time. Continued use of the platform indicates acceptance of the updated terms.'
    }
]

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-muted/40 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="text-center space-y-2 mb-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                        <ScrollTextIcon className="w-3 h-3" />
                        Legal
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Terms & Conditions</h1>
                    <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                {/* Intro card */}
                <div className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted/40">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Overview</p>
                        <h2 className="text-sm font-semibold text-foreground mt-0.5">Agreement to Use Our Platform</h2>
                    </div>
                    <div className="px-6 py-5 text-sm text-muted-foreground leading-relaxed">
                        By accessing or using <span className="font-semibold text-foreground">Job Aspirations</span>, you agree to be bound by these
                        Terms & Conditions. If you do not agree, please do not use our platform.
                    </div>
                </div>

                {/* Sections */}
                {sections.map((section, i) => (
                    <div
                        key={i}
                        className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-border bg-muted/40">
                            <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
                        </div>
                        <div className="px-6 py-5 text-sm text-muted-foreground leading-relaxed">
                            {section.list ? (
                                <ul className="space-y-2">
                                    {section.list.map((item, j) => (
                                        <li
                                            key={j}
                                            className="flex items-start gap-2.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{section.text}</p>
                            )}
                        </div>
                    </div>
                ))}

                {/* Contact */}
                <div className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted/40">
                        <h2 className="text-sm font-semibold text-foreground">8. Contact Information</h2>
                    </div>
                    <div className="px-6 py-5 text-sm text-muted-foreground leading-relaxed">
                        If you have any questions regarding these Terms & Conditions, contact us at:
                        <p className="mt-2 font-semibold text-primary">info@jobaspirations.in</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions
