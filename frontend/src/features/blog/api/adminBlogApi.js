import { baseApi } from '@/app/api/baseApi.js'

export const adminBlogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminBlogs: builder.query({
            query: () => '/adminblog',
            providesTags: ['AdminBlogs']
        }),

        createBlog: builder.mutation({
            query: (data) => ({
                url: '/adminblog',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['AdminBlogs']
        }),

        updateBlog: builder.mutation({
            query: ({ id, data }) => ({
                url: `/adminblog/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['AdminBlogs']
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/adminblog/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['AdminBlogs']
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: '/admin/logout',
                method: 'POST'
            })
        })
    })
})

export const { useGetAdminBlogsQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = adminBlogApi
