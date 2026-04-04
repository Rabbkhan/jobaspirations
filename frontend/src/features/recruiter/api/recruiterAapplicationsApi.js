import { baseApi } from '@/app/api/baseApi'

export const recruiterApplicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        applyRecruiter: builder.mutation({
            query: (formData) => ({
                url: '/recruiter-applications/apply',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['MyApplication'] // ADD THIS
        }),

        // ADD THIS
        getMyApplication: builder.query({
            query: () => ({
                url: '/recruiter-applications/my-application',
                method: 'GET'
            }),
            providesTags: ['MyApplication']
        }),

        getRecruiterApplications: builder.query({
            query: () => ({
                url: '/recruiter-applications',
                method: 'GET'
            }),
            providesTags: ['RecruiterApplications']
        }),

        approveRecruiter: builder.mutation({
            query: (id) => ({
                url: `/recruiter-applications/approve/${id}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['RecruiterApplications']
        }),

        rejectRecruiter: builder.mutation({
            query: ({ id }) => ({
                url: `/recruiter-applications/reject/${id}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['RecruiterApplications']
        })
    })
})

export const {
    useApplyRecruiterMutation,
    useGetMyApplicationQuery, // ADD THIS EXPORT
    useGetRecruiterApplicationsQuery,
    useApproveRecruiterMutation,
    useRejectRecruiterMutation
} = recruiterApplicationApi
