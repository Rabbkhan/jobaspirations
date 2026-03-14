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
        verifyEmail: builder.mutation({
            query: ({ email, code }) => ({
                url: '/user/verifyemail',
                method: 'POST',
                body: { email, code }
            })
        }),
        resendVerificationCode: builder.mutation({
            query: (email) => ({
                url: '/user/verifyemail/request',
                method: 'POST',
                body: { email }
            })
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/user/forgot-password',
                method: 'POST',
                body: { email }
            })
        }),
        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `/user/reset-password/${token}`,
                method: 'POST',
                body: { password }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'GET'
            })
        }),

        me: builder.query({
            query: () => '/user/me',
            providesTags: ['Auth']
        })
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useVerifyEmailMutation,
    useResendVerificationCodeMutation,
    useForgotPasswordMutation,
    useLogoutMutation,
    useResetPasswordMutation,
    useMeQuery
} = authApi
