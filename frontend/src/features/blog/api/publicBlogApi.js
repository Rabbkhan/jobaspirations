import { baseApi } from '@/app/api/baseApi.js'

export const publicBlogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: ({ page = 1, limit = 10, category } = {}) => ({
                url: '/blog',
                params: {
                    page,
                    limit,
                    ...(category && { category })
                }
            })
        }),

        getBlogBySlug: builder.query({
            query: (slug) => `/blog/${slug}`
        }),

        getLatestBlogs: builder.query({
            query: () => ({
                url: '/blog/latest',
                params: {
                    page: 1,
                    limit: 4
                }
            })
        }),

        getRelatedBlogs: builder.query({
            query: (slug) => `/blog/related/${slug}`
        })
    })
})

export const { useGetBlogsQuery, useGetBlogBySlugQuery, useGetLatestBlogsQuery, useGetRelatedBlogsQuery } = publicBlogApi
