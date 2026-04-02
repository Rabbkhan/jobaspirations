import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useRegisterMutation } from '@/features/auth/api/authApi.js'
import { validateFile } from '@/shared/lib/fileValidator.js'

const Register = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        profilePhotoFile: null
    })

    const navigate = useNavigate()
    const [register, { isLoading }] = useRegisterMutation()
    const redirect = location.state?.redirect
    const hanldeChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const hanldeFileChange = (e) => {
        const file = e.target.files?.[0]
        const { valid, message } = validateFile(file)

        if (!valid) return toast.error(message)
        setInput((prev) => ({ ...prev, profilePhotoFile: file }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('password', input.password)
        if (input.profilePhotoFile) formData.append('profilePhoto', input.profilePhotoFile)

        try {
            // dispatch(setLoading(true))

            await register(formData).unwrap()

            toast.success('Account created! Please verify your email')

            navigate('/verify-email', {
                state: {
                    email: input.email,
                    redirect // ✅ PASS REDIRECT
                }
            })
        } catch (err) {
            const msg = err?.data?.message || 'Registration failed'
            toast.error(msg)
        }
    }

    return (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="hidden md:flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-foreground leading-tight">
                    Create your <span className="text-primary">JobAspirations</span> account
                </h1>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                    Join thousands of job seekers and recruiters. Create an account & start your journey with a premium experience.
                </p>

                <img
                    src="https://illustrations.popsy.co/amber/app-launch.svg"
                    alt="Register Illustration"
                    className="w-80 mt-6 opacity-90"
                />
            </div>

            <Card className="w-full max-w-lg shadow-xl border border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-foreground">Create Your Account</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={submitHandler}
                        className="space-y-5">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                placeholder="Enter your full name"
                                name="fullname"
                                value={input.fullname}
                                onChange={hanldeChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={input.email}
                                onChange={hanldeChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input
                                type="tel"
                                placeholder="Enter your phone number"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={hanldeChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={input.password}
                                onChange={hanldeChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Profile Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={hanldeFileChange}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                </>
                            ) : (
                                'Register'
                            )}
                        </Button>
                        <p className="text-center text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-primary hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register
