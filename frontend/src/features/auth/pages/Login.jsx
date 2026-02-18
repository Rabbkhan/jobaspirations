import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/auth/authSlice'
import { Loader2 } from 'lucide-react'
import { useLoginMutation } from '@/features/auth/api/authApi.js'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const [login, { isLoading }] = useLoginMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await login(input).unwrap()
            dispatch(setUser(res.safeUser))
            const role = res.safeUser.role
            if (role === 'student') navigate('/profile')
            else if (role === 'recruiter') navigate('/recruiter')
            else toast.error('Unauthorized role')
            toast.success(res.message)
        } catch (error) {
            const msg = error?.data?.message || 'Login failed'
            toast.error(msg)
            if (msg.includes('verify your email')) navigate(`/verify-email?email=${input.email}`)
        }
    }

    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT SECTION */}
            <div className="hidden md:flex flex-col justify-center px-10">
                <h1 className="text-4xl font-bold leading-tight text-foreground">
                    Welcome Back to
                    <span className="text-primary"> JobAspirations</span>
                </h1>

                <p className="mt-4 text-muted-foreground">Login and continue your journey toward opportunities crafted for you.</p>

                <img
                    src="https://illustrations.popsy.co/amber/idea-launch.svg"
                    className="w-80 mt-6 opacity-90"
                    alt=""
                />
            </div>

            {/* RIGHT SECTION */}
            <div className="flex justify-center items-center p-6">
                <Card className="w-full max-w-md p-2 shadow-xl border bg-card">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Login</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5 mt-2">
                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    placeholder="Enter your email"
                                    className="bg-background"
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    className="bg-background"
                                    value={input.password}
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>

                            <p className="text-right text-sm">
                                <Link
                                    to="/forgot-password"
                                    className="text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </p>

                            {/* Button */}

                            <Button
                                type="submit"
                                className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground"
                                disabled={isLoading}>
                                {' '}
                                {isLoading ? 'Please wait...' : 'Login'}
                            </Button>

                            <p className="text-center text-sm text-muted-foreground">
                                Don’t have an account?{' '}
                                <Link
                                    to="/register"
                                    className="text-primary hover:underline">
                                    Register
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login
