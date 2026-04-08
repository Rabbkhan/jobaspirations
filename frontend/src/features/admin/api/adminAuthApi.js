import { baseApi } from '@/app/api/baseApi'

export const adminAuthApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (credentials) => ({
                url: '/user/admin/login',
                method: 'POST',
                body: credentials
            })
        }),

        adminMe: builder.query({
            query: () => '/user/admin/me'
        }),

        adminLogout: builder.mutation({
            query: () => ({
                url: '/user/admin/logout',
                method: 'POST'
            })
        }),

        getAdminStudents: builder.query({
            query: () => '/user/admin/students'
        })
    })
})

export const { useAdminLoginMutation, useAdminMeQuery, useAdminLogoutMutation, useGetAdminStudentsQuery } = adminAuthApi
