import { baseApi } from '@/app/api/baseApi.js'

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/blogcategory',
            providesTags: ['Categories']
        }),

        createCategory: builder.mutation({
            query: (data) => ({
                url: '/blogcategory',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Categories']
        }),

        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/blogcategory/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Categories']
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/blogcategory/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Categories']
        })
    })
})

export const { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi
