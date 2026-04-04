import { useFormContext } from 'react-hook-form'
import { FileTextIcon, UploadCloudIcon, ExternalLinkIcon, CheckCircleIcon } from 'lucide-react'

const ResumeUpload = ({ user }) => {
    const { register, watch } = useFormContext()
    const resumeFile = watch('resumeFile')
    const resumeUrl = user?.profile?.resume

    return (
        <div className="space-y-3">
            {/* Upload trigger */}
            <label className="flex items-center gap-3 cursor-pointer border border-dashed border-border rounded-xl px-4 py-4 bg-muted/40 hover:bg-muted/70 hover:border-primary/40 transition-colors w-full">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <UploadCloudIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground">{resumeFile?.[0] ? resumeFile[0].name : 'Upload your resume'}</p>
                    <p className="text-[11px] text-muted-foreground truncate">PDF only · Max 5MB</p>
                </div>
                {resumeFile?.[0] && <CheckCircleIcon className="w-4 h-4 text-green-500 shrink-0" />}
                <input
                    type="file"
                    accept="application/pdf"
                    {...register('resumeFile')}
                    className="hidden"
                />
            </label>

            {/* Existing resume link */}
            {!resumeFile?.[0] && resumeUrl && (
                <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-primary font-medium hover:underline underline-offset-4 transition-colors">
                    <FileTextIcon className="w-3.5 h-3.5" />
                    View current resume
                    <ExternalLinkIcon className="w-3 h-3" />
                </a>
            )}
        </div>
    )
}

export default ResumeUpload
