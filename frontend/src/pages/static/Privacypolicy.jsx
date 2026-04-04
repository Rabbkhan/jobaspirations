import React from 'react'
import { ShieldCheckIcon } from 'lucide-react'

const sections = [
    {
        title: '1. Information We Collect',
        list: ['Personal details such as name and email address', 'Resume, skills, and job preferences', 'Account activity and usage data']
    },
    {
        title: '2. How We Use Your Information',
        list: [
            'To connect job seekers with recruiters',
            'To improve platform functionality and experience',
            'To send important updates and notifications'
        ]
    },
    {
        title: '3. Data Protection',
        text: 'We use industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.'
    },
    {
        title: '4. Sharing of Information',
        text: 'We do not sell your personal data. Your information is shared only with recruiters when you apply for jobs or where required by law.'
    },
    {
        title: '5. Cookies',
        text: 'We use cookies to enhance your experience, analyze usage, and improve our services.'
    },
    {
        title: '6. Your Rights',
        text: 'You may access, update, or delete your personal information at any time by contacting us.'
    }
]

const Privacypolicy = () => {
    return (
        <div className="min-h-screen bg-muted/40 py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Page Header */}
                <div className="text-center space-y-2 mb-10">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                        <ShieldCheckIcon className="w-3 h-3" />
                        Legal
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Privacy Policy</h1>
                    <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                {/* Intro card */}
                <div className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted/40">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Overview</p>
                        <h2 className="text-sm font-semibold text-foreground mt-0.5">Your Privacy Matters</h2>
                    </div>
                    <div className="px-6 py-5 text-sm text-muted-foreground leading-relaxed">
                        At <span className="font-semibold text-foreground">Job Aspirations</span>, we respect your privacy and are committed to
                        protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use
                        our platform.
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
                        <h2 className="text-sm font-semibold text-foreground">7. Contact Us</h2>
                    </div>
                    <div className="px-6 py-5 text-sm text-muted-foreground leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at:
                        <p className="mt-2 font-semibold text-primary">info@jobaspirations.in</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Privacypolicy
