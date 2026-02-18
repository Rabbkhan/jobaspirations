import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useLocation, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constants'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card'
import { useResendVerificationCodeMutation, useVerifyEmailMutation } from '@features/auth/api/authApi.js'

const VerifyEmail = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const params = new URLSearchParams(location.search)
    const emailParam = params.get('email')
    const stateEmail = location.state?.email
    const storedEmail = localStorage.getItem('pendingEmail')
    const email = emailParam || stateEmail || storedEmail || ''

    const [code, setCode] = useState('')

    const [verifyEmail, { isLoading: verifying }] = useVerifyEmailMutation()
    const [resendCode, { isLoading: resending }] = useResendVerificationCodeMutation()

    useEffect(() => {
        if (email) localStorage.setItem('pendingEmail', email)
    }, [email])

    if (!email) {
        return <p className="text-center mt-10">No email found. Please login or register again.</p>
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        if (code.length !== 6) return toast.error('Enter a valid 6-digit code')

        try {
            const res = await verifyEmail({ email, code }).unwrap()
            toast.success(res.message || 'Email verified successfully')
            localStorage.removeItem('pendingEmail')
            navigate('/login')
        } catch (err) {
            toast.error(err.data?.message || 'Verification failed')
        }
    }

    const handleResend = async () => {
        try {
            await resendCode(email).unwrap()
            toast.success('Verification code sent again')
        } catch (err) {
            toast.error(err.data?.message || 'Failed to resend code')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-100 shadow-md border">
                <CardHeader>
                    <CardTitle>Email Verification</CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-sm mb-3">
                        Enter the 6-digit verification code sent to:
                        <span className="font-semibold"> {email}</span>
                    </p>

                    <form
                        onSubmit={handleVerify}
                        className="space-y-4">
                        <Input
                            placeholder="Enter verification code"
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            maxLength={6}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={verifying}>
                            {verifying ? 'Verifying...' : 'Verify Email'}
                        </Button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Didn’t receive the email?
                            <Button
                                variant="link"
                                onClick={handleResend}
                                disabled={resending}>
                                {resending ? 'Sending...' : 'Resend Code'}
                            </Button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default VerifyEmail
