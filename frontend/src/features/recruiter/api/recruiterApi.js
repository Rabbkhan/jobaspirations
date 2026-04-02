import { baseApi } from '@/app/api/baseApi'

export const recruiterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ===============================
        // Companies
        // ===============================
        getRecruiterCompanies: builder.query({
            query: () => ({
                url: '/company',
                method: 'GET'
            }),
            providesTags: ['RecruiterCompanies']
        }),

        // ===============================
        // Job Filters
        // ===============================
        getRecruiterJobFilters: builder.query({
            query: () => ({
                url: '/job/filters',
                method: 'GET'
            })
        }),

        // ===============================
        // Create Job
        // ===============================
        createRecruiterJob: builder.mutation({
            query: (payload) => ({
                url: '/job/create',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['RecruiterJobs', 'RecruiterDashboard']
        }),

        // ===============================
        // Get Applicants for a Job
        // ===============================
        getRecruiterJobApplicants: builder.query({
            query: (jobId) => ({
                url: `/job/${jobId}/applications`,
                method: 'GET'
            }),
            providesTags: (result, error, jobId) => [{ type: 'RecruiterApplicants', id: jobId }]
        }),
        getRecruiterJobById: builder.query({
            query: (jobId) => ({
                url: `/job/${jobId}`,
                method: 'GET'
            }),
            providesTags: (result, error, jobId) => [{ type: 'RecruiterJobs', id: jobId }]
        }),

        updateRecruiterJob: builder.mutation({
            query: ({ jobId, payload }) => ({
                url: `/job/${jobId}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['RecruiterJobs', 'RecruiterDashboard']
        }),

        getRecruiterJobs: builder.query({
            query: () => ({
                url: '/job/getrecruiterJobs',
                method: 'GET'
            }),
            providesTags: ['RecruiterJobs']
        }),

        deleteRecruiterJob: builder.mutation({
            query: (jobId) => ({
                url: `/job/${jobId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['RecruiterJobs', 'RecruiterDashboard']
        }),
        getRecruiterDashboard: builder.query({
            query: () => ({
                url: '/dashboard/recruiter',
                method: 'GET'
            }),
            providesTags: [{ type: 'RecruiterDashboard', id: 'LIST' }]
        }),
        // ===============================
        // Update Applicant Status
        // ===============================
        updateRecruiterApplicationStatus: builder.mutation({
            query: ({ applicationId, status }) => ({
                url: `/applications/${applicationId}/status`,
                method: 'PUT',
                body: { status }
            }),
            invalidatesTags: (result, error, { jobId }) => [{ type: 'RecruiterApplicants', id: jobId }, 'RecruiterDashboard']
        }),
        // New: recruiter apply request
        submitApplication: builder.mutation({
            query: (formData) => ({
                url: '/recruiterapply/apply',
                method: 'POST',
                body: formData
            })
        })
    })
})

export const {
    useGetRecruiterCompaniesQuery,
    useGetRecruiterJobFiltersQuery,
    useGetRecruiterDashboardQuery,
    useCreateRecruiterJobMutation,
    useGetRecruiterJobApplicantsQuery,
    useGetRecruiterJobsQuery,
    useGetRecruiterJobByIdQuery,
    useUpdateRecruiterJobMutation,
    useDeleteRecruiterJobMutation,
    useUpdateRecruiterApplicationStatusMutation
} = recruiterApi
