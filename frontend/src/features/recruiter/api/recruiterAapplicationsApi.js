import { baseApi } from '@/app/api/baseApi'

export const recruiterApplicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        applyRecruiter: builder.mutation({
            query: (formData) => ({
                url: '/recruiter-applications/apply',
                method: 'POST',
                body: formData
            })
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
            query: ({ id, reason }) => ({
                url: `/recruiter-applications/reject/${id}`,
                method: 'PATCH',
                body: { reason }
            }),
            invalidatesTags: ['RecruiterApplications']
        })
    })
})

export const { useApplyRecruiterMutation, useGetRecruiterApplicationsQuery, useApproveRecruiterMutation, useRejectRecruiterMutation } =
    recruiterApplicationApi
