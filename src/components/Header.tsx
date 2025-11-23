import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#4FC3F7] text-white rounded-lg p-2">
              <Home className="w-6 h-6" />
            </div>
            <span className="text-[#4FC3F7]">Home Services</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`transition-colors ${
                isActive('/') ? 'text-[#4FC3F7]' : 'text-gray-600 hover:text-[#4FC3F7]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`transition-colors ${
                isActive('/services') ? 'text-[#4FC3F7]' : 'text-gray-600 hover:text-[#4FC3F7]'
              }`}
            >
              Services
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActive('/about') ? 'text-[#4FC3F7]' : 'text-gray-600 hover:text-[#4FC3F7]'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${
                isActive('/contact') ? 'text-[#4FC3F7]' : 'text-gray-600 hover:text-[#4FC3F7]'
              }`}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`transition-colors ${
                    isActive('/dashboard') ? 'text-[#4FC3F7]' : 'text-gray-600 hover:text-[#4FC3F7]'
                  }`}
                >
                  Dashboard
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="border-[#4FC3F7] text-[#4FC3F7] hover:bg-[#4FC3F7] hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" className="bg-[#4FC3F7] hover:bg-[#3DAED8] text-white">
                  Login
                </Button>
              </Link>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden flex flex-col gap-3 mt-4 pt-4 border-t">
            <Link
              to="/"
              className="text-gray-600 hover:text-[#4FC3F7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-600 hover:text-[#4FC3F7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-[#4FC3F7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-[#4FC3F7]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-[#4FC3F7]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="border-[#4FC3F7] text-[#4FC3F7]"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="bg-[#4FC3F7] hover:bg-[#3DAED8] text-white w-full">
                  Login
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
