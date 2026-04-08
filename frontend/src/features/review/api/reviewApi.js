// src/features/review/api/reviewApi.js
import { baseApi } from '@/app/api/baseApi'

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ── Public ──────────────────────────────────────────
        getApprovedReviews: builder.query({
            query: ({ language, rating, page, limit } = {}) => ({
                url: '/reviews',
                method: 'GET',
                params: { language, rating, page, limit }
            }),
            providesTags: ['Reviews']
        }),

        getReviewStats: builder.query({
            query: () => ({
                url: '/reviews/stats',
                method: 'GET'
            }),
            providesTags: ['ReviewStats']
        }),

        // ── Student ──────────────────────────────────────────
        submitReview: builder.mutation({
            query: (formData) => ({
                url: '/reviews',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Reviews', 'ReviewStats', 'MyReview']
        }),

        getMyReview: builder.query({
            query: () => ({
                url: '/reviews/my-review',
                method: 'GET'
            }),
            providesTags: ['MyReview']
        }),

        // ── Admin ──────────────────────────────────────────
        getAllReviewsAdmin: builder.query({
            query: (status) => ({
                url: '/reviews/admin',
                method: 'GET',
                params: { status }
            }),
            providesTags: ['AdminReviews']
        }),

        approveReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/admin/${id}/approve`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Reviews', 'AdminReviews', 'ReviewStats']
        }),

        rejectReview: builder.mutation({
            query: ({ id, reason }) => ({
                url: `/reviews/admin/${id}/reject`,
                method: 'PATCH',
                body: { reason }
            }),
            invalidatesTags: ['Reviews', 'AdminReviews', 'ReviewStats']
        }),

        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/admin/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Reviews', 'AdminReviews', 'ReviewStats']
        }),

        markStudentAsPlaced: builder.mutation({
            query: (userId) => ({
                url: `/reviews/admin/place/${userId}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['AdminReviews']
        })
    })
})

export const {
    useGetApprovedReviewsQuery,
    useGetReviewStatsQuery,
    useSubmitReviewMutation,
    useGetMyReviewQuery,
    useGetAllReviewsAdminQuery,
    useApproveReviewMutation,
    useRejectReviewMutation,
    useDeleteReviewMutation,
    useMarkStudentAsPlacedMutation
} = reviewApi
