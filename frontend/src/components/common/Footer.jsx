import { Facebook, Linkedin, Instagram, Github } from "lucide-react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <footer className="bg-[#0F0F0F] text-gray-300 py-10 mt-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Job Aspirations
            </h2>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            modern job and recruitment platform with integrated consultancy, connecting students and recruiters to build careers, hire faster, and grow sustainably.
            </p>

            {/* Social Icons */}
            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/people/Job-Aspirations/61585803661844/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition" />
              </a>

              <a
                href="https://www.linkedin.com/in/job-aspirations-1b28993a3/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition" />
              </a>
 <a
                href="https://www.instagram.com/jobaspirations/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li className="hover:text-white transition cursor-pointer">
                <Link to="/jobs"> Find Jobs</Link>
              </li>
              {user?.role !== "student" && (
                <li className="hover:text-white transition cursor-pointer">
                  <Link to="/hire" className="hover:text-white transition">
                    {" "}
                    Hire Talent{" "}
                  </Link>
                </li>
              )}
              <li className="hover:text-white transition cursor-pointer"></li>{" "}
              <li>
                {" "}
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="hover:text-white transition cursor-pointer">
                <Link to="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li className="hover:text-white transition cursor-pointer">
                Blog
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Career Tips
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Support
              </li>
              <li className="hover:text-white transition cursor-pointer">
                FAQ
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@jobaspirations.in</li>
              <li>Phone: +91 7098037341 | +91 8159932923</li>
              <li>Address: East Medinipur, Haldia, West Bengal ,India - 721632</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} JobAspirations — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
