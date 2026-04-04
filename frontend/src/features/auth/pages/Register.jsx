import React, { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2, ArrowRightIcon, ArrowLeftIcon, BriefcaseIcon, UploadIcon } from 'lucide-react'
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
    const [preview, setPreview] = useState(null)

    const [register, { isLoading }] = useRegisterMutation()
    const navigate = useNavigate()
    const location = useLocation() // ✅ react-router location
    const redirect = location.state?.redirect
    const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        const { valid, message } = validateFile(file)
        if (!valid) return toast.error(message)
        setInput((prev) => ({ ...prev, profilePhotoFile: file }))
        setPreview(URL.createObjectURL(file))
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
            await register(formData).unwrap()
            toast.success('Account created! Please verify your email')
            navigate('/verify-email', { state: { email: input.email, redirect } })
        } catch (err) {
            toast.error(err?.data?.message || 'Registration failed')
        }
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* ── Left panel — brand ── */}
            <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 border-r border-border bg-muted/40 p-10 relative overflow-hidden">
                {/* Decorative rings */}
                <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-border opacity-50" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 w-44 h-44 rounded-full border border-border opacity-40" />
                <div
                    className="pointer-events-none absolute top-8 right-8 w-24 h-20 opacity-[.10]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)',
                        backgroundSize: '12px 12px'
                    }}
                />

                {/* Logo */}
                <div className="inline-flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <BriefcaseIcon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-foreground tracking-tight">JobAspirations</span>
                </div>

                {/* Middle content */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-foreground leading-tight tracking-tight">
                            Start your <br /> journey.
                        </h2>
                        <div className="mt-2 h-[5px] w-14 rounded-full bg-primary/30" />
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                        Join thousands of job seekers and recruiters. Create your account and get started with a premium experience.
                    </p>

                    <div className="space-y-3 pt-2">
                        {['Curated job listings', 'Direct recruiter access', 'Career guidance & support'].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-2.5 text-xs text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-[11px] text-muted-foreground">© {new Date().getFullYear()} JobAspirations. All rights reserved.</p>
            </div>

            {/* ── Right panel — form ── */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm space-y-7">
                    {/* Back + mobile logo row */}
                    <div className="flex items-center justify-between">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group">
                            <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                            Back to home
                        </Link>
                        <div className="flex lg:hidden items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <BriefcaseIcon className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-sm font-bold text-foreground">JobAspirations</span>
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-foreground tracking-tight">Create account</h1>
                        <p className="text-sm text-muted-foreground">Fill in your details to get started</p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={submitHandler}
                        className="space-y-4">
                        {/* Profile photo upload */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl border border-border bg-muted overflow-hidden flex items-center justify-center shrink-0">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UploadIcon className="w-4 h-4 text-muted-foreground" />
                                )}
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs font-medium text-foreground">Profile photo</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="text-xs h-8 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-foreground">Full name</Label>
                            <Input
                                name="fullname"
                                placeholder="Your full name"
                                value={input.fullname}
                                onChange={handleChange}
                                className="bg-background h-10 text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-foreground">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={input.email}
                                onChange={handleChange}
                                className="bg-background h-10 text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-foreground">Phone number</Label>
                            <Input
                                type="tel"
                                name="phoneNumber"
                                placeholder="+91 00000 00000"
                                value={input.phoneNumber}
                                onChange={handleChange}
                                className="bg-background h-10 text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-foreground">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={input.password}
                                onChange={handleChange}
                                className="bg-background h-10 text-sm"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-10 cursor-pointer gap-2 mt-2"
                            disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Please wait…
                                </>
                            ) : (
                                <>
                                    Create account <ArrowRightIcon className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background px-3 text-[11px] text-muted-foreground">Already have an account?</span>
                        </div>
                    </div>

                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 w-full h-10 rounded-md border border-border text-sm text-foreground hover:bg-muted transition-colors font-medium">
                        Sign in instead
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
