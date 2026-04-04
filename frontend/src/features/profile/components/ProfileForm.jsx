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
import { UserIcon, FileTextIcon, StarIcon, PaperclipIcon, CameraIcon, SaveIcon } from 'lucide-react'

const SectionCard = ({ icon: Icon, label, eyebrow, children }) => (
    <div className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/40">
            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
                {eyebrow && (
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase leading-none mb-0.5">{eyebrow}</p>
                )}
                <h2 className="text-sm font-semibold text-foreground leading-none">{label}</h2>
            </div>
        </div>
        {/* Card Body */}
        <div className="px-6 py-6">{children}</div>
    </div>
)

const Field = ({ label, error, children }) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
        {children}
        {error && (
            <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                {error}
            </p>
        )}
    </div>
)

const inputClass =
    'w-full bg-muted/40 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

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

        try {
            await updateProfile(formData).unwrap()
            toast.success('Profile updated successfully')
            reset({ ...data, resumeFile: null, profilePhotoFile: null })
        } catch (err) {
            toast.error(err?.data?.message || 'Update failed')
        }
    }

    if (userLoading) {
        return (
            <div className="max-w-3xl mx-auto space-y-4 py-8 px-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="border border-border rounded-2xl overflow-hidden animate-pulse">
                        <div className="h-14 bg-muted/60 border-b border-border" />
                        <div className="px-6 py-6 space-y-3">
                            <div className="h-4 bg-muted rounded w-1/3" />
                            <div className="h-9 bg-muted rounded w-full" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto space-y-5 py-8 px-4">
                {/* Personal Information */}
                <SectionCard
                    icon={UserIcon}
                    eyebrow="Step 1"
                    label="Personal Information">
                    <div className="grid md:grid-cols-2 gap-5">
                        <Field
                            label="Full Name"
                            error={errors.fullname?.message}>
                            <input
                                {...register('fullname')}
                                placeholder="John Doe"
                                className={inputClass}
                            />
                        </Field>
                        <Field
                            label="Email"
                            error={errors.email?.message}>
                            <input
                                {...register('email')}
                                placeholder="you@example.com"
                                className={inputClass}
                            />
                        </Field>
                        <Field
                            label="Phone"
                            error={errors.phoneNumber?.message}>
                            <input
                                {...register('phoneNumber')}
                                placeholder="+91 98765 43210"
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </SectionCard>

                {/* Bio */}
                <SectionCard
                    icon={FileTextIcon}
                    eyebrow="Step 2"
                    label="About You">
                    <Field label="Bio">
                        <textarea
                            {...register('bio')}
                            rows={4}
                            placeholder="Tell recruiters a bit about yourself..."
                            className={inputClass}
                        />
                    </Field>
                </SectionCard>

                {/* Skills */}
                <SectionCard
                    icon={StarIcon}
                    eyebrow="Step 3"
                    label="Skills">
                    <SkillsInput />
                </SectionCard>

                {/* Resume */}
                <SectionCard
                    icon={PaperclipIcon}
                    eyebrow="Step 4"
                    label="Resume">
                    <ResumeUpload user={user} />
                </SectionCard>

                {/* Profile Photo */}
                <SectionCard
                    icon={CameraIcon}
                    eyebrow="Step 5"
                    label="Profile Photo">
                    <ProfilePhotoUpload user={user} />
                </SectionCard>

                {/* Submit */}
                <div className="flex justify-end pt-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="min-w-[150px] gap-2 cursor-pointer">
                        {isLoading ? (
                            <>
                                <span className="w-3.5 h-3.5 border-2 border-background/40 border-t-background rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="w-3.5 h-3.5" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default ProfileForm
