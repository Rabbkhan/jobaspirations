import { baseApi } from '@/app/api/baseApi'

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => '/user/profile',
            providesTags: ['User']
        }),

        updateUser: builder.mutation({
            query: (formData) => ({
                url: '/user/profile/update',
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUserQuery, useUpdateUserMutation } = profileApi
