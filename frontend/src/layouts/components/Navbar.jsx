import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import { Avatar, AvatarImage } from '@/shared/ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover'
import { User, LogOut, Menu, X, Bookmark, Briefcase, ChevronRightIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { logout as logoutAction } from '@/features/auth/authSlice'
import Logo from '@/assets/images/logo.png'
import { useLogoutMutation } from '@/features/auth/api/authApi'
import { profileApi } from '@/features/profile/api/profileApi'
import { recruiterApplicationApi } from '@/features/recruiter/api/recruiterAapplicationsApi.js'

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const { user: currentUser } = useSelector((state) => state.auth)

    const [logout] = useLogoutMutation()

    const NAV_LINKS = [
        { to: '/', label: 'Home' },
        { to: '/jobs', label: 'Jobs' },
        { to: '/reviews', label: 'Reviews' },
        { to: '/blogs', label: 'Blogs' }
    ]

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path)
    }

    const logoutHandler = async () => {
        try {
            await logout().unwrap()
            dispatch(logoutAction())
            // Clear RTK Query caches
            dispatch(profileApi.util.resetApiState())
            dispatch(recruiterApplicationApi.util.resetApiState())
            navigate('/login')
            toast.success('Logged out successfully')
            setMobileOpen(false)
        } catch {
            toast.error('Logout failed')
        }
    }

    const menuItems = [
        { to: '/profile', icon: User, label: 'Profile', show: true },
        { to: '/profile/saved-jobs', icon: Bookmark, label: 'Saved jobs', show: currentUser?.role === 'student' },
        { to: '/applied_jobs', icon: Briefcase, label: 'Applied jobs', show: currentUser?.role === 'student' }
    ].filter((item) => item.show)

    return (
        <header className="w-full border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 shrink-0">
                    <img
                        src={Logo}
                        alt="JobAspirations"
                        className="w-40 sm:w-48 lg:w-56 h-auto object-contain"
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        {NAV_LINKS.map((l) => (
                            <li key={l.to}>
                                <Link
                                    to={l.to}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive(l.to) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                                    }`}>
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Desktop right */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-3">
                        {!currentUser ? (
                            <>
                                <Link to="/login">
                                    <Button
                                        variant="ghost"
                                        size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Register</Button>
                                </Link>
                            </>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="rounded-full ring-2 ring-transparent hover:ring-primary/30 transition-all">
                                        <Avatar className="cursor-pointer w-9 h-9">
                                            <AvatarImage
                                                src={
                                                    currentUser?.profile?.profilePhoto ||
                                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfE8XWOVe86hLGi8m9mgPTsva_KWjTHbT9iQ&s'
                                                }
                                            />
                                        </Avatar>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-0 rounded-xl overflow-hidden shadow-lg">
                                    <div className="px-4 py-3 border-b bg-muted/40">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-9 h-9">
                                                <AvatarImage
                                                    src={
                                                        currentUser?.profile?.profilePhoto ||
                                                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfE8XWOVe86hLGi8m9mgPTsva_KWjTHbT9iQ&s'
                                                    }
                                                />
                                            </Avatar>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-sm text-foreground truncate">{currentUser?.fullname}</p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {currentUser?.profile?.bio || 'No bio added'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-1.5">
                                        {menuItems.map((item) => (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                                                <item.icon className="w-4 h-4 text-muted-foreground" />
                                                {item.label}
                                            </Link>
                                        ))}
                                        <div className="border-t mt-1 pt-1">
                                            <button
                                                onClick={logoutHandler}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors">
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu">
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* ── Mobile menu ── */}
            {mobileOpen && (
                <div className="md:hidden border-t bg-background animate-in slide-in-from-top-2 duration-200">
                    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
                        {/* User info card — logged in only */}
                        {currentUser && (
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                                <Avatar className="w-10 h-10 shrink-0">
                                    <AvatarImage
                                        src={
                                            currentUser?.profile?.profilePhoto ||
                                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfE8XWOVe86hLGi8m9mgPTsva_KWjTHbT9iQ&s'
                                        }
                                    />
                                </Avatar>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-foreground truncate">{currentUser?.fullname}</p>
                                    <p className="text-xs text-muted-foreground truncate">{currentUser?.profile?.bio || currentUser?.email}</p>
                                </div>
                                <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize shrink-0">
                                    {currentUser?.role}
                                </span>
                            </div>
                        )}

                        {/* Nav links */}
                        <nav className="space-y-0.5">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 pb-1.5">Navigate</p>
                            {NAV_LINKS.map((l) => (
                                <Link
                                    key={l.to}
                                    to={l.to}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                        isActive(l.to) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                                    }`}>
                                    {l.label}
                                    {isActive(l.to) && <ChevronRightIcon className="w-3.5 h-3.5 opacity-60" />}
                                </Link>
                            ))}
                        </nav>

                        {/* Account section */}
                        <div className="border-t border-border pt-4 space-y-0.5">
                            {!currentUser ? (
                                <>
                                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 pb-1.5">Account</p>
                                    <div className="flex flex-col gap-2 pt-1">
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileOpen(false)}>
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                size="sm">
                                                Login
                                            </Button>
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setMobileOpen(false)}>
                                            <Button
                                                className="w-full"
                                                size="sm">
                                                Create account
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 pb-1.5">Account</p>
                                    {menuItems.map((item) => (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground hover:bg-muted transition-colors">
                                            <item.icon className="w-4 h-4 text-muted-foreground" />
                                            {item.label}
                                        </Link>
                                    ))}
                                    <button
                                        onClick={logoutHandler}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/5 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
