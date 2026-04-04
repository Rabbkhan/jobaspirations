import { BuildingIcon, UsersIcon, UserIcon, ArrowRightIcon } from 'lucide-react'

const options = [
    {
        type: 'company',
        icon: BuildingIcon,
        title: 'Hiring for my company',
        desc: "I'm hiring for roles inside my organization"
    },
    {
        type: 'agency',
        icon: UsersIcon,
        title: 'Recruitment agency',
        desc: 'I hire candidates for multiple companies'
    },
    {
        type: 'freelancer',
        icon: UserIcon,
        title: 'Freelance recruiter',
        desc: 'Independent recruiter helping companies hire'
    }
]

export default function RecruiterIntentStep({ formData, setFormData, next }) {
    const select = (type) => {
        setFormData({ ...formData, recruiterType: type })
        next()
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Step 1</p>
                <h2 className="text-lg font-bold text-foreground">What best describes you?</h2>
                <p className="text-xs text-muted-foreground">This helps us tailor your experience.</p>
            </div>

            <div className="space-y-3">
                {options.map(({ type, icon: Icon, title, desc }) => (
                    <button
                        key={type}
                        onClick={() => select(type)}
                        className="w-full group flex items-center gap-4 border border-border rounded-2xl p-4 bg-background hover:border-primary/40 hover:bg-primary/5 transition-all text-left">
                        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground">{title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        </div>
                        <ArrowRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                ))}
            </div>
        </div>
    )
}
