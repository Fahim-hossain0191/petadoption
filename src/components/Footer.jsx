import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaw,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#649EC4] text-[#FFF0DD] mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-[#FFB1A0] p-3 rounded-full">
                <FaPaw className="text-white text-xl" />
              </div>

              <h2 className="text-3xl font-bold">
                Pet<span className="text-[#FFB1A0]">Adopt</span>
              </h2>
            </div>

            <p className="mt-5 leading-7 text-[#F7F7F7]">
              Helping loving families connect with pets in need of a forever
              home. Every adoption creates a new beginning filled with love and
              happiness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#FFB1A0] transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/pets"
                  className="hover:text-[#FFB1A0] transition"
                >
                  Browse Pets
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-[#FFB1A0] transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#FFB1A0] transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="hover:text-[#FFB1A0] transition"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#FFB1A0] mt-1" />
                <p>Dhaka, Bangladesh</p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#FFB1A0]" />
                <p>support@petadopt.com</p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#FFB1A0]" />
                <p>+880 1700-000000</p>
              </div>

            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Follow Us
            </h3>

            <p className="mb-6 text-[#F7F7F7]">
              Join our community and stay updated with the latest pets waiting
              for adoption.
            </p>

            <div className="flex gap-4">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#99CBB8] flex items-center justify-center hover:bg-[#FFB1A0] transition duration-300"
              >
                <FaFacebookF className="text-white" />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#99CBB8] flex items-center justify-center hover:bg-[#FFB1A0] transition duration-300"
              >
                <FaInstagram className="text-white" />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#99CBB8] flex items-center justify-center hover:bg-[#FFB1A0] transition duration-300"
              >
                <FaTwitter className="text-white" />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-[#99CBB8] flex items-center justify-center hover:bg-[#FFB1A0] transition duration-300"
              >
                <FaLinkedinIn className="text-white" />
              </a>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#99CBB8] mt-12 pt-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-sm text-[#F7F7F7]">
              © {new Date().getFullYear()} PetAdopt. All rights reserved.
            </p>

            <p className="text-sm text-[#F7F7F7]">
              Made with ❤️ for pets and their forever families.
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;