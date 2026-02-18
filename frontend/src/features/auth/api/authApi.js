import { baseApi } from '@/app/api/baseApi.js'

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/user/login', // relative to /api/v1
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['Auth']
        }),

        register: builder.mutation({
            query: (data) => ({
                url: '/user/register', // relative to /api/v1
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth']
        }),

        me: builder.query({
            query: () => '/user/me',
            providesTags: ['Auth']
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi
