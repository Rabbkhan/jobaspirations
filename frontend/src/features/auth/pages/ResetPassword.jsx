import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardContent, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { toast } from 'sonner'
import { useResetPasswordMutation } from '@features/auth/api/authApi.js'

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    const [tokenExpired, setTokenExpired] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!password || password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        try {
            await resetPassword({ token, password }).unwrap()
            toast.success('Password reset successfully')
            navigate('/login')
        } catch (err) {
            const message = err?.data?.message || 'Invalid or expired token'

            if (message?.toLowerCase().includes('expired')) {
                setTokenExpired(true)
            } else {
                toast.error(message || 'Reset failed')
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>

                <CardContent>
                    {tokenExpired ? (
                        <div className="text-center space-y-3">
                            <p className="text-red-500">This reset link has expired.</p>

                            <Button onClick={() => navigate('/forgot-password')}>Request new reset link</Button>
                        </div>
                    ) : (
                        <form
                            onSubmit={submitHandler}
                            className="space-y-4">
                            <div>
                                <Label>New Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <Button
                                className="w-full"
                                disabled={isLoading || !password}>
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPassword
