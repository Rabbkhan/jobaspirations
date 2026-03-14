import { useFormContext } from 'react-hook-form'
import { Badge } from '@/shared/ui/badge'

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
        <div>
            <label className="text-sm font-medium mb-2 block">Skills</label>

            <div className="border rounded-md p-2 flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge
                        key={skill}
                        variant="secondary">
                        {skill}
                        <button
                            type="button"
                            className="ml-1"
                            onClick={() => removeSkill(skill)}>
                            ×
                        </button>
                    </Badge>
                ))}

                <input
                    className="flex-1 outline-none text-sm"
                    placeholder="Add skill"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault()
                            addSkill(e.currentTarget.value.trim())
                            e.currentTarget.value = ''
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default SkillsInput
