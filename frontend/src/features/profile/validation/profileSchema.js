import { z } from 'zod'

export const profileSchema = z.object({
    fullname: z.string().min(2),
    email: z.string().email(),
    phoneNumber: z.string().min(10),
    bio: z.string().optional(),

    skills: z.array(z.string()).optional(),

    resumeFile: z.any().optional(),

    profilePhotoFile: z.any().optional()
})
