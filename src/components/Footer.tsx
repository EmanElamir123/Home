import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#F5F5F5] border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h4 className="mb-4 text-[#4FC3F7]">Home Services</h4>
            <p className="text-sm text-gray-600 mb-4">
              Connecting you with trusted local service providers in Lahore for all your home maintenance needs.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/service/electrician" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Electrician
                </Link>
              </li>
              <li>
                <Link to="/service/plumber" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Plumber
                </Link>
              </li>
              <li>
                <Link to="/service/ac-service" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  AC Service
                </Link>
              </li>
              <li>
                <Link to="/service/cleaning" className="text-gray-600 hover:text-[#4FC3F7] transition-colors">
                  Cleaning Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 text-[#4FC3F7]" />
                <span>ghazalahamayo@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 text-[#4FC3F7]" />
                <span>03221458311</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-[#4FC3F7]" />
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 Home Services. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
