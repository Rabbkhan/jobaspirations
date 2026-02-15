import { Facebook, Linkedin, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-10">
          
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Job Aspirations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              Modern job & recruitment platform connecting students and recruiters. Build careers, hire faster, and grow sustainably.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/people/Job-Aspirations/61585803661844/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-gray-300 hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/job-aspirations-1b28993a3/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-300 hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/jobaspirations/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-gray-300 hover:text-primary transition-colors" />
              </a>
              <a
                href="https://github.com/jobaspirations"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="p-2 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-300 hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="hover:text-primary transition-colors">
                  Find Jobs
                </Link>
              </li>
              {user?.role !== "student" && (
                <li>
                  <Link to="/hire" className="hover:text-primary transition-colors">
                    Hire Talent
                  </Link>
                </li>
              )}
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blogs" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/career-tips" className="hover:text-primary transition-colors">
                  Career Tips
                </Link>
              </li>
              <li className="text-gray-400">Support</li>
              {/* <li className="text-gray-400">FAQ</li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: info@jobaspirations.in</li>
              <li>Phone: +91 6296419679 | +91 8159932923</li>
              <li>Address: East Medinipur, Haldia, West Bengal, India - 721632</li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Job Aspirations — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
