import { useFormContext } from 'react-hook-form'
import { CameraIcon, UploadCloudIcon } from 'lucide-react'

const ProfilePhotoUpload = ({ user }) => {
    const { register, watch } = useFormContext()
    const photoFile = watch('profilePhotoFile')

    const preview = photoFile?.[0] ? URL.createObjectURL(photoFile[0]) : user?.profile?.profilePhoto || 'https://avatar.iran.liara.run/public/25'

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar preview */}
            <div className="relative shrink-0">
                <img
                    src={preview}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                    <CameraIcon className="w-3 h-3 text-primary-foreground" />
                </div>
            </div>

            {/* Upload area */}
            <div className="flex-1 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer w-fit border border-dashed border-border rounded-xl px-4 py-3 bg-muted/40 hover:bg-muted/70 hover:border-primary/40 transition-colors">
                    <UploadCloudIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">{photoFile?.[0] ? photoFile[0].name : 'Choose a photo'}</span>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('profilePhotoFile')}
                        className="hidden"
                    />
                </label>
                <p className="text-[11px] text-muted-foreground">JPG, PNG or WEBP. Max 2MB recommended.</p>
            </div>
        </div>
    )
}

export default ProfilePhotoUpload
