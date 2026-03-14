import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import { Avatar, AvatarImage } from '@/shared/ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover'
import { User, LogOut, Menu, X, Bookmark, Briefcase } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { logout as logoutAction } from '@/features/auth/authSlice'
import Logo from '@/assets/images/logo.png'

import { useLogoutMutation } from '@/features/auth/api/authApi'
import { useGetUserQuery } from '@/features/profile/api/profileApi'

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data: currentUser } = useGetUserQuery(undefined, {
        refetchOnMountOrArgChange: true
    })
    const [logout] = useLogoutMutation()

    const NAV_LINKS = [
        { to: '/', label: 'Home' },
        { to: '/jobs', label: 'Jobs' },
        { to: '/blogs', label: 'Blogs' }
    ]

    const logoutHandler = async () => {
        try {
            await logout().unwrap()
            dispatch(logoutAction())
            navigate('/login')
            toast.success('Logged out successfully')
        } catch {
            toast.error('Logout failed')
        }
    }

    return (
        <header className="w-full border-b bg-background sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 font-semibold tracking-tight shrink-0">
                    <img
                        src={Logo}
                        alt="JobAspirations"
                        className="w-40 sm:w-48 lg:w-60 h-auto object-contain"
                    />
                </Link>

                {/* Desktop Links */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-6 lg:gap-8 text-sm font-medium">
                        {NAV_LINKS.map((l) => (
                            <li key={l.to}>
                                <Link
                                    to={l.to}
                                    className="text-foreground hover:text-primary transition-colors">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        {!currentUser ? (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>

                                <Link to="/register">
                                    <Button className="bg-primary text-white">Register</Button>
                                </Link>
                            </>
                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className="cursor-pointer ring-1 ring-primary/20">
                                        <AvatarImage src={currentUser?.profile?.profilePhoto || 'https://avatar.iran.liara.run/public/25'} />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-64 bg-card border shadow-md p-4 rounded-md">
                                    {/* User Info */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar>
                                            <AvatarImage src={currentUser?.profile?.profilePhoto || 'https://avatar.iran.liara.run/public/25'} />
                                        </Avatar>

                                        <div>
                                            <div className="font-semibold">{currentUser?.fullname}</div>

                                            <div className="text-sm text-muted-foreground line-clamp-2">
                                                {currentUser?.profile?.bio || 'No bio added'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Actions */}
                                    <div className="flex flex-col gap-2 text-sm">
                                        <Link
                                            to="/profile"
                                            className="flex items-center gap-2 hover:text-primary">
                                            <User className="w-4 h-4" />
                                            Profile
                                        </Link>

                                        {currentUser?.role === 'student' && (
                                            <>
                                                <Link
                                                    to="/profile/saved-jobs"
                                                    className="flex items-center gap-2 hover:text-primary">
                                                    <Bookmark className="w-4 h-4" />
                                                    Saved Jobs
                                                </Link>

                                                <Link
                                                    to="/applied_jobs"
                                                    className="flex items-center gap-2 hover:text-primary">
                                                    <Briefcase className="w-4 h-4" />
                                                    Applied Jobs
                                                </Link>
                                            </>
                                        )}

                                        <Button
                                            variant="ghost"
                                            className="justify-start gap-2 text-destructive px-0"
                                            onClick={logoutHandler}>
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden inline-flex items-center p-2 rounded-md"
                        onClick={() => setMobileOpen((v) => !v)}>
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-card border-t">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <ul className="flex flex-col gap-1">
                            {NAV_LINKS.map((l) => (
                                <li key={l.to}>
                                    <Link
                                        to={l.to}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-2 px-3 rounded hover:bg-primary/5">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4">
                            {!currentUser ? (
                                <div className="flex flex-col gap-2">
                                    <Link to="/login">
                                        <Button
                                            variant="outline"
                                            className="w-full">
                                            Login
                                        </Button>
                                    </Link>

                                    <Link to="/register">
                                        <Button className="w-full bg-primary text-white">Register</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 text-sm">
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Profile
                                    </Link>

                                    <Link
                                        to="/profile/saved-jobs"
                                        className="flex items-center gap-2">
                                        <Bookmark className="w-4 h-4" />
                                        Saved Jobs
                                    </Link>

                                    <Link
                                        to="/applied_jobs"
                                        className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        Applied Jobs
                                    </Link>

                                    <button
                                        onClick={logoutHandler}
                                        className="flex items-center gap-2 text-destructive">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
