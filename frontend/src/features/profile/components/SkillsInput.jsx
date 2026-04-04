import { useFormContext } from 'react-hook-form'
import { XIcon, PlusIcon } from 'lucide-react'

const SkillsInput = () => {
    const { watch, setValue } = useFormContext()
    const skills = watch('skills')

    const addSkill = (value) => {
        if (!value) return
        const exists = skills.some((s) => s.toLowerCase() === value.toLowerCase())
        if (exists) return
        setValue('skills', [...skills, value])
    }

    const removeSkill = (skill) => {
        setValue(
            'skills',
            skills.filter((s) => s !== skill)
        )
    }

    return (
        <div className="space-y-3">
            {/* Tag cloud */}
            <div className="min-h-[48px] flex flex-wrap gap-2">
                {skills.length === 0 && (
                    <p className="text-xs text-muted-foreground italic self-center">No skills added yet — type below and press Enter</p>
                )}
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 text-xs font-semibold px-3 py-1 rounded-full">
                        {skill}
                        <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                            <XIcon className="w-2.5 h-2.5" />
                        </button>
                    </span>
                ))}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 border border-border rounded-lg bg-muted/40 px-3 py-2 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-colors">
                <PlusIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <input
                    className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    placeholder="Type a skill and press Enter or comma…"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault()
                            addSkill(e.currentTarget.value.trim())
                            e.currentTarget.value = ''
                        }
                    }}
                />
                <span className="text-[10px] text-muted-foreground font-medium shrink-0">Enter / ,</span>
            </div>
        </div>
    )
}

export default SkillsInput
