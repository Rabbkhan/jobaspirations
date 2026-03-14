import { z } from 'zod'

export const jobSchema = z
    .object({
        title: z.string().min(3, 'Title is required'),

        company: z.string().min(1, 'Company is required'),
        location: z.string().min(1, 'Location is required'),
        industry: z.string().min(1, 'Industry is required'),
        jobType: z.string().min(1, 'Job type is required'),
        position: z.coerce.number().min(1, 'At least one opening is required'),
        salaryMin: z.coerce.number().min(0),
        salaryMax: z.coerce.number().min(0),

        expMinMonths: z.coerce.number().min(0),
        expMaxMonths: z.coerce.number().min(0),

        description: z.string().min(20, 'Description must be at least 20 characters long'),
        skills: z.string().min(1, 'At least one skill required')
    })
    .superRefine((data, ctx) => {
        if (data.salaryMin > data.salaryMax) {
            ctx.addIssue({
                code: 'custom',
                message: 'Minimum salary cannot be greater than maximum salary',
                path: ['salaryMin']
            })
        }

        if (data.expMinMonths > data.expMaxMonths) {
            ctx.addIssue({
                code: 'custom',
                message: 'Minimum experience cannot be greater than maximum experience',
                path: ['expMinMonths']
            })
        }
    })
