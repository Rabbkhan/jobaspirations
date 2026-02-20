import { baseApi } from '@/app/api/baseApi'

export const companyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCompany: builder.mutation({
            query: (formData) => ({
                url: '/company/create',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: [{ type: 'Company', id: 'LIST' }]
        }),

        getAllCompanies: builder.query({
            query: () => '/company',
            transformResponse: (res) => res.companies,
            providesTags: (result = []) => [...result.map((c) => ({ type: 'Company', id: c._id })), { type: 'Company', id: 'LIST' }]
        }),

        getCompanyById: builder.query({
            query: (id) => `/company/${id}`,
            transformResponse: (res) => res.company,
            providesTags: (result, error, id) => [{ type: 'Company', id }]
        }),

        updateCompany: builder.mutation({
            query: ({ id, data }) => ({
                url: `/company/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (r, e, { id }) => [
                { type: 'Company', id },
                { type: 'Company', id: 'LIST' }
            ]
        })
    })
})

export const { useCreateCompanyMutation, useGetAllCompaniesQuery, useGetCompanyByIdQuery, useUpdateCompanyMutation } = companyApi
