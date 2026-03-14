import { useFormContext } from 'react-hook-form'

const ResumeUpload = ({ user }) => {
    const { register, watch } = useFormContext()

    const resumeFile = watch('resumeFile')

    const resumeUrl = user?.profile?.resume

    return (
        <div>
            <label className="text-sm font-medium block mb-1">Resume</label>

            {resumeFile?.[0] && <p className="text-green-600 text-sm">New file: {resumeFile[0].name}</p>}

            {!resumeFile?.[0] && resumeUrl && (
                <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block mb-2">
                    View Resume
                </a>
            )}

            <input
                type="file"
                accept="application/pdf"
                {...register('resumeFile')}
            />
        </div>
    )
}

export default ResumeUpload
