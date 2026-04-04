import { Facebook, Linkedin, Instagram, Github, MapPinIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="border-t border-border bg-muted/40">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-base font-extrabold tracking-tight text-foreground">Job Aspirations</h2>
                            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mt-0.5">
                                Career consulting & hiring platform
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Connecting students and recruiters. Build careers, hire faster, and grow sustainably.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-2">
                            <a
                                href="https://www.facebook.com/people/Job-Aspirations/61585803661844/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-colors">
                                <Facebook className="w-3.5 h-3.5 text-muted-foreground" />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/job-aspirations-1b28993a3/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-colors">
                                <Linkedin className="w-3.5 h-3.5 text-muted-foreground" />
                            </a>

                            <a
                                href="https://www.instagram.com/jobaspirations/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-colors">
                                <Instagram className="w-3.5 h-3.5 text-muted-foreground" />
                            </a>

                            <a
                                href="https://github.com/jobaspirations"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Github"
                                className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-colors">
                                <Github className="w-3.5 h-3.5 text-muted-foreground" />
                            </a>
                        </div>
                    </div>

                    {/* Platform */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Platform</p>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    to="/jobs"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Find Jobs
                                </Link>
                            </li>
                            {/* {user?.role !== 'student' && ( */}
                            <li>
                                <Link
                                    to="/hire"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Hire Talent
                                </Link>
                            </li>
                            {/* )} */}
                            <li>
                                <Link
                                    to="/privacy-policy"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Resources</p>
                        <ul className="space-y-2.5">
                            <li>
                                <Link
                                    to="/blogs"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/career-tips"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    Career Tips
                                </Link>
                            </li>
                            <li className="text-sm text-muted-foreground/50 cursor-default">Support</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Contact</p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <MailIcon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/60" />
                                info@jobaspirations.in
                            </li>
                            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <PhoneIcon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/60" />
                                +91 6296419679 | +91 8159932923
                            </li>
                            <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                <MapPinIcon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/60" />
                                East Medinipur, Haldia, West Bengal, India - 721632
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Job Aspirations - All Rights Reserved.</p>
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Actively placing candidates
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
