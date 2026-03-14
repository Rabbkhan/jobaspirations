import { useFormContext } from 'react-hook-form'
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar'

const ProfilePhotoUpload = ({ user }) => {
    const { register, watch } = useFormContext()
    const photoFile = watch('profilePhotoFile')

    const preview = photoFile?.[0] ? URL.createObjectURL(photoFile[0]) : user?.profile?.profilePhoto || 'https://avatar.iran.liara.run/public/25'

    return (
        <div className="space-y-2">
            <p className="text-sm font-medium">Profile Photo</p>

            <Avatar className="h-20 w-20">
                <AvatarImage src={preview} />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <input
                type="file"
                accept="image/*"
                {...register('profilePhotoFile')}
            />
        </div>
    )
}

export default ProfilePhotoUpload
