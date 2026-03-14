import { baseApi } from '@/app/api/baseApi'

export const adminAuthApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (credentials) => ({
                url: 'user/admin/login',
                method: 'POST',
                body: credentials
            })
        }),

        adminMe: builder.query({
            query: () => '/admin/me'
        }),

        adminLogout: builder.mutation({
            query: () => ({
                url: '/admin/logout',
                method: 'POST'
            })
        })
    })
})

export const { useAdminLoginMutation, useAdminMeQuery, useAdminLogoutMutation } = adminAuthApi
