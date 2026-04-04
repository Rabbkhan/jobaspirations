import React from 'react'
import { SettingsIcon, BellIcon, ShieldIcon, PaletteIcon, GlobeIcon, KeyRoundIcon, SaveIcon } from 'lucide-react'

const sections = [
    {
        group: 'General',
        icon: GlobeIcon,
        fields: [
            { label: 'Platform name', hint: 'Displayed across the platform', type: 'text', placeholder: 'JobAspirations' },
            { label: 'Support email', hint: 'Where users send support requests', type: 'email', placeholder: 'support@example.com' },
            { label: 'Platform URL', hint: 'Your public-facing domain', type: 'url', placeholder: 'https://jobaspirations.com' }
        ]
    },
    {
        group: 'Notifications',
        icon: BellIcon,
        fields: [
            { label: 'Email on new recruiter', hint: 'Get notified when a recruiter applies', type: 'toggle' },
            { label: 'Email on new blog post', hint: 'Get notified when a blog is published', type: 'toggle' },
            { label: 'Email on job approval', hint: 'Get notified when a job is submitted', type: 'toggle' }
        ]
    },
    {
        group: 'Security',
        icon: ShieldIcon,
        fields: [
            { label: 'Current password', hint: 'Enter your existing password', type: 'password', placeholder: '••••••••' },
            { label: 'New password', hint: 'At least 8 characters', type: 'password', placeholder: '••••••••' },
            { label: 'Confirm password', hint: 'Must match new password', type: 'password', placeholder: '••••••••' }
        ]
    }
]

const inputClass =
    'w-full bg-muted/40 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

const Toggle = () => (
    <div className="w-10 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center px-0.5 cursor-pointer hover:bg-primary/30 transition-colors">
        <div className="w-4 h-4 rounded-full bg-primary/60" />
    </div>
)

const Settings = () => {
    return (
        <div className="space-y-8 max-w-3xl mx-auto px-4 py-8">
            {/* ── Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Admin
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">Settings</h1>
                        <p className="text-xs text-muted-foreground">Manage your platform configuration and preferences.</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <SettingsIcon className="w-4 h-4 text-primary" />
                    </div>
                </div>
            </div>

            {/* ── Sections ── */}
            {sections.map(({ group, icon: Icon, fields }) => (
                <div
                    key={group}
                    className="space-y-3">
                    {/* Section divider */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">{group}</p>
                        </div>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Fields card */}
                    <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                        {fields.map(({ label, hint, type, placeholder }) => (
                            <div
                                key={label}
                                className="px-5 py-4 flex items-center justify-between gap-6">
                                <div className="space-y-0.5 min-w-0">
                                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">{label}</p>
                                    <p className="text-xs text-muted-foreground">{hint}</p>
                                </div>

                                {type === 'toggle' ? (
                                    <Toggle />
                                ) : (
                                    <input
                                        type={type}
                                        placeholder={placeholder}
                                        className={`${inputClass} max-w-xs`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* ── Danger zone ── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <KeyRoundIcon className="w-3.5 h-3.5 text-muted-foreground" />
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Danger zone</p>
                    </div>
                    <div className="flex-1 h-px bg-border" />
                </div>

                <div className="border border-red-500/20 rounded-2xl bg-background overflow-hidden divide-y divide-red-500/10">
                    {[
                        { label: 'Clear all job listings', hint: 'Permanently removes all active job posts' },
                        { label: 'Reset all applications', hint: 'Wipes application history across all users' },
                        { label: 'Delete platform data', hint: 'Full data wipe — this cannot be undone' }
                    ].map(({ label, hint }) => (
                        <div
                            key={label}
                            className="px-5 py-4 flex items-center justify-between gap-6 flex-wrap">
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-semibold text-red-500 tracking-widest uppercase">{label}</p>
                                <p className="text-xs text-muted-foreground">{hint}</p>
                            </div>
                            <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl border border-red-500/20 text-xs font-semibold text-red-500 hover:bg-red-500/5 transition-colors shrink-0">
                                Proceed
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Save ── */}
            <div className="flex justify-end pt-2">
                <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity min-w-[140px] justify-center">
                    <SaveIcon className="w-4 h-4" />
                    Save changes
                </button>
            </div>
        </div>
    )
}

export default Settings
