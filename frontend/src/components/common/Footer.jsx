import React from "react";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";
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
              A modern job platform connecting students and recruiters. Build
              careers. Hire fast. Grow limitless.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition" />
              <Github className="w-5 h-5 cursor-pointer hover:text-white transition" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li className="hover:text-white transition cursor-pointer">
            <Link
                  to="/jobs" >    Find Jobs</Link>
              </li>
              {user?.role !== "student" && (

              <li className="hover:text-white transition cursor-pointer">
              <Link
                  to="/hire"
                  className="hover:text-white transition"
                >   Hire Talent </Link>
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
              <li>Phone: +91 89183 53472</li>
              <li>Address: westbengal, India</li>
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
