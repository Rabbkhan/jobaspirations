import React, { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Label } from '@/shared/ui/label'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setUser } from '@/features/auth/authSlice'
import { Loader2, ArrowRightIcon, BriefcaseIcon, ArrowLeftIcon } from 'lucide-react'
import { useLoginMutation } from '@/features/auth/api/authApi.js'

const Login = () => {
    const [input, setInput] = useState({ email: '', password: '' })
    const [login, { isLoading }] = useLoginMutation()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login(input).unwrap()
            dispatch(setUser(res.safeUser))
            toast.success(res.message)
            const redirect = location.state?.redirect
            if (redirect) {
                navigate(redirect)
                return
            }
            const role = res.safeUser.role
            if (role === 'student') navigate('/profile')
            else if (role === 'recruiter') navigate('/recruiter')
            else toast.error('Unauthorized role')
        } catch (error) {
            const msg = error?.data?.message || 'Login failed'
            toast.error(msg)
            if (msg.includes('verify your email')) navigate(`/verify-email?email=${input.email}`)
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
                            Welcome <br /> back.
                        </h2>
                        <div className="mt-2 h-[5px] w-14 rounded-full bg-primary/30" />
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                        Continue your journey toward opportunities crafted for you.
                    </p>

                    {/* Trust points */}
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

                {/* Footer */}
                <p className="text-[11px] text-muted-foreground">© {new Date().getFullYear()} JobAspirations. All rights reserved.</p>
            </div>

            {/* ── Right panel — form ── */}
            <div className="flex-1 flex flex-col px-6 py-10">
                <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group self-start mb-auto">
                    <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Back to home
                </Link>

                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-sm space-y-8">
                        {' '}
                        {/* Mobile logo */}
                        <div className="flex lg:hidden items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <BriefcaseIcon className="w-3.5 h-3.5 text-primary" />
                            </div>

                            <span className="text-sm font-bold text-foreground">JobAspirations</span>
                        </div>
                        {/* Heading */}
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold text-foreground tracking-tight">Sign in</h1>
                            <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
                        </div>
                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5">
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
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs font-medium text-foreground">Password</Label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-[11px] text-primary hover:underline underline-offset-4">
                                        Forgot password?
                                    </Link>
                                </div>
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
                                className="w-full h-10 cursor-pointer gap-2"
                                disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Please wait…
                                    </>
                                ) : (
                                    <>
                                        {' '}
                                        Sign in <ArrowRightIcon className="w-4 h-4" />
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
                                <span className="bg-background px-3 text-[11px] text-muted-foreground">New to JobAspirations?</span>
                            </div>
                        </div>
                        <Link
                            to="/register"
                            state={{ redirect: location.state?.redirect }}
                            className="flex items-center justify-center gap-2 w-full h-10 rounded-md border border-border text-sm text-foreground hover:bg-muted transition-colors font-medium">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
