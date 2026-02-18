import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { toast } from 'sonner'
import { useForgotPasswordMutation } from '@/features/auth/api/authApi.js'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!email) {
            toast.error('Please enter your email')
            return
        }
        try {
            const res = await forgotPassword(email).unwrap()
            toast.success(res.message || 'Reset link sent to email')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to send reset link')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={submitHandler}
                        className="space-y-4">
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <Button
                            className="w-full cursor-pointer"
                            disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send reset link'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPassword
