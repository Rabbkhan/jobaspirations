import { baseApi } from '@/app/api/baseApi'

export const jobApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* ---------------- GET ALL JOBS ---------------- */
        getAllJobs: builder.query({
            query: ({ page = 1, filters = {} }) => ({
                url: '/job',
                params: {
                    page,
                    limit: 9,
                    ...filters
                }
            }),

            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return `${endpointName}-${JSON.stringify(queryArgs.filters || {})}`
            },

            merge: (currentCache, newData, { arg }) => {
                if (arg.page === 1) {
                    currentCache.jobs = newData.jobs
                } else {
                    currentCache.jobs.push(...newData.jobs)
                }
                currentCache.hasMore = newData.hasMore
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.page !== previousArg?.page || JSON.stringify(currentArg?.filters) !== JSON.stringify(previousArg?.filters)
            },

            providesTags: ['Jobs', 'SavedJobs']
        }),

        /* ---------------- JOB DETAILS ---------------- */
        getJobById: builder.query({
            query: (id) => `/job/${id}`,
            providesTags: (r, e, id) => [{ type: 'Job', id }]
        }),

        /* ---------------- JOB FILTERS ---------------- */
        getJobFilters: builder.query({
            query: () => '/job/filters'
        }),

        /* ---------------- APPLY JOB ---------------- */
        applyJob: builder.mutation({
            query: (jobId) => ({
                url: `/applications/apply/${jobId}`,
                method: 'POST'
            }),
            invalidatesTags: (r, e, id) => [{ type: 'Job', id }]
        }),
        getAppliedJobs: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: '/applications/mine',
                params: { page, limit }
            }),
            providesTags: ['Applications']
        }),
        /* ================= SAVED JOBS ================= */

        getSavedJobs: builder.query({
            query: () => '/job/saved',
            providesTags: ['SavedJobs']
        }),

        saveJob: builder.mutation({
            query: (jobId) => ({
                url: `/job/save/${jobId}`,
                method: 'POST'
            }),

            async onQueryStarted(jobId, { dispatch, queryFulfilled }) {
                // Optimistically update saved jobs cache
                const patchResult = dispatch(
                    jobApi.util.updateQueryData('getSavedJobs', undefined, (draft) => {
                        draft.savedJobs.push({ _id: jobId })
                    })
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },

            invalidatesTags: ['SavedJobs', 'Jobs']
        }),

        unsaveJob: builder.mutation({
            query: (jobId) => ({
                url: `/job/unsave/${jobId}`,
                method: 'DELETE'
            }),

            async onQueryStarted(jobId, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    jobApi.util.updateQueryData('getSavedJobs', undefined, (draft) => {
                        draft.savedJobs = draft.savedJobs.filter((job) => job._id !== jobId)
                    })
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },

            invalidatesTags: ['SavedJobs', 'Jobs']
        })
    })
})

export const {
    useGetAllJobsQuery,
    useGetJobByIdQuery,
    useGetJobFiltersQuery,
    useApplyJobMutation,
    useGetAppliedJobsQuery,
    useGetSavedJobsQuery,
    useSaveJobMutation,
    useUnsaveJobMutation
} = jobApi
