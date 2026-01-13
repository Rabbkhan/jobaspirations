import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { User, LogOut, Menu, X, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../../features/authSlice";
import Logo from "../../assets/images/logo.png";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseLinks = [
    { to: "/", label: "Home" },
    { to: "/jobs", label: "Jobs" },
    { to: "/blogs", label: "Blogs" },
  ];

  const studentLinks = [{ to: "/applied_jobs", label: "Applied Jobs" }];

  const NAV_LINKS =
    user?.role === "student" ? [...baseLinks, ...studentLinks] : baseLinks;

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="w-full border-b bg-background sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT: Logo */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-semibold tracking-tight shrink-0"
        >
          <img
            src={Logo}
            alt="JobAspirations"
            className="w-40 sm:w-48 lg:w-60 h-auto object-contain"
          />
        </Link>

        {/* CENTER: Links (desktop) */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-foreground">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-primary text-white">Register</Button>
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer ring-1 ring-primary/20">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://avatar.iran.liara.run/public/25"
                      }
                      alt="avatar"
                    />
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-64 bg-card border shadow-md p-4 rounded-md">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://avatar.iran.liara.run/public/25"
                        }
                        alt="avatar"
                      />
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        {user?.fullname}
                      </div>
                      <div
                        className="text-sm text-muted-foreground line-clamp-2"
                        title={user?.profile?.bio}
                      >
                        {user?.profile?.bio}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex w-fit items-center gap-2 text-foreground hover:text-primary"
                      >
                        <User2 className="w-4 h-4" /> View Profile
                      </Link>
                    )}

                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-destructive hover:text-destructive/90"
                      onClick={logoutHandler}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden inline-flex items-center p-2 rounded-md text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 px-3 rounded text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-primary text-white">
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-2 text-foreground hover:text-primary"
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="inline-flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
