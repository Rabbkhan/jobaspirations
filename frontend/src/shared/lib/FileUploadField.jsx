import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { validateFile } from '@/shared/lib/fileValidator'
import { toast } from 'sonner'

const FileUploadField = ({ name, label, accept, maxSize, allowedTypes, preview = false, existingUrl }) => {
    const { register, watch, setValue } = useFormContext()

    const fileList = watch(name)

    const [previewUrl, setPreviewUrl] = useState(existingUrl || null)

    useEffect(() => {
        if (!fileList?.[0] || !preview) return
        const url = URL.createObjectURL(fileList[0])
        const id = setTimeout(() => setPreviewUrl(url)) // defer update
        return () => {
            clearTimeout(id)
            URL.revokeObjectURL(url)
        }
    }, [fileList, preview])

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]

        const result = validateFile(file, {
            maxSize,
            allowedTypes
        })

        if (!result.valid) {
            toast.error(result.message)
            e.target.value = ''
            return
        }

        setValue(name, e.target.files)
    }

    return (
        <div className="space-y-2">
            {label && <p className="text-sm font-medium">{label}</p>}

            {/* Image preview */}
            {preview && previewUrl && (
                <img
                    src={previewUrl}
                    alt="preview"
                    className="w-20 h-20 rounded-full object-cover"
                />
            )}

            {/* Filename */}
            {!preview && fileList?.[0] && <p className="text-sm text-green-600">Selected: {fileList[0].name}</p>}

            {/* Existing file */}
            {!fileList?.[0] && existingUrl && !preview && (
                <a
                    href={existingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm">
                    View existing file
                </a>
            )}

            <input
                type="file"
                accept={accept}
                {...register(name)}
                onChange={handleFileChange}
            />
        </div>
    )
}

export default FileUploadField
