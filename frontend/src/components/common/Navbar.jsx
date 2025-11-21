import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import { setLoading, setUser } from "../../features/authSlice";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  // { to: "/jobs/applied", label: "Browse" },
];

export default function Navbar() {
  // const [user] = useState(false); // replace with auth state
  const { user } = useSelector((store) => store.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
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
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <header className="w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-xl font-semibold text-foreground">Job</span>
            <span className="text-xl font-semibold text-primary">
              Aspirations
            </span>
          </Link>
        </div>

        {/* CENTER: Links (desktop) */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-foreground hover:text-primary transition"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          {/* Desktop auth buttons / avatar */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Button variant="ghost" className="text-foreground">
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer ring-1 ring-primary/20">
                    <AvatarImage
                      src={user?.profile?.profilePhoto ||" https://avatar.iran.liara.run/public/25"}
                      alt="avatar"
                    />
                    {/* <AvatarFallback>RK</AvatarFallback> */}
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-64 bg-card border border-border shadow-md p-4 rounded-md">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto || "https://avatar.iran.liara.run/public/25"}
                        alt="avatar"
                      />
                      {/* <AvatarFallback>RK</AvatarFallback> */}
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">
                        {user?.fullname}
                      </div>
                      <div className="text-sm  text-black">
                        {user?.profile?.bio}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          {" "}
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-destructive hover:text-destructive/90 "
                      onClick={logoutHandler}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 px-3 rounded text-foreground hover:bg-primary/5 hover:text-primary transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" className="w-full text-foreground">
                    Login
                  </Button>
                  <Button className="w-full bg-primary hover:bg-primary-dark text-white">
                    Register
                  </Button>
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
                    className="inline-flex items-center gap-2 text-destructive"
                    onClick={() => {
                      /* logout */
                    }}
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
