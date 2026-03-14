import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '../validation/profileSchema'
import { toast } from 'sonner'
import { useGetUserQuery, useUpdateUserMutation } from '../api/profileApi'
import SkillsInput from './SkillsInput'
import ResumeUpload from './ResumeUpload'
import ProfilePhotoUpload from './ProfilePhotoUpload'
import { Button } from '@/shared/ui/button'

const ProfileForm = () => {
    const { data: user, isLoading: userLoading } = useGetUserQuery()
    const [updateProfile, { isLoading }] = useUpdateUserMutation()

    const methods = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullname: '',
            email: '',
            phoneNumber: '',
            bio: '',
            skills: []
        }
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = methods

    // Reset form whenever user changes
    useEffect(() => {
        if (user) {
            reset({
                fullname: user.fullname || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                bio: user.profile?.bio || '',
                skills: user.profile?.skills || []
            })
        }
    }, [user, reset])

    const onSubmit = async (data) => {
        const formData = new FormData()

        formData.append('fullname', data.fullname)
        formData.append('email', data.email)
        formData.append('phoneNumber', data.phoneNumber)
        formData.append('bio', data.bio)
        formData.append('skills', JSON.stringify(data.skills))

        if (data.resumeFile?.[0]) formData.append('resume', data.resumeFile[0])

        if (data.profilePhotoFile?.[0]) formData.append('profilePhoto', data.profilePhotoFile[0])

        // console.log(data.resumeFile)
        // console.log(data.profilePhotoFile)

        try {
            await updateProfile(formData).unwrap()

            toast.success('Profile updated successfully')

            reset({
                ...data,
                resumeFile: null,
                profilePhotoFile: null
            })
        } catch (err) {
            toast.error(err?.data?.message || 'Update failed')
        }
    }

    if (userLoading) return <div>Loading profile...</div>

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto space-y-8">
                {/* Personal Information */}
                <div className="border rounded-xl p-6 space-y-6 bg-background shadow-sm">
                    <h2 className="text-lg font-semibold">Personal Information</h2>

                    <div className="grid md:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                                {...register('fullname')}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                {...register('email')}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone</label>
                            <input
                                {...register('phoneNumber')}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="border rounded-xl p-6 space-y-4 bg-background shadow-sm">
                    <h2 className="text-lg font-semibold">About You</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Bio</label>
                        <textarea
                            {...register('bio')}
                            rows={4}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                {/* Skills */}
                <div className="border rounded-xl p-6 space-y-4 bg-background shadow-sm">
                    <h2 className="text-lg font-semibold">Skills</h2>
                    <SkillsInput />
                </div>

                {/* Resume */}
                <div className="border rounded-xl p-6 space-y-4 bg-background shadow-sm">
                    <h2 className="text-lg font-semibold">Resume</h2>
                    <ResumeUpload user={user} />
                </div>

                {/* Profile Photo */}
                <div className="border rounded-xl p-6 space-y-4 bg-background shadow-sm">
                    <h2 className="text-lg font-semibold">Profile Photo</h2>
                    <ProfilePhotoUpload user={user} />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="min-w-[140px]">
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default ProfileForm
