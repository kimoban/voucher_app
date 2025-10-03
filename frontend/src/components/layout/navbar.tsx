'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="bg-primary-600 text-white p-2 rounded-lg mr-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">VoucherApp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/vouchers" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Vouchers
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              How It Works
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              Support
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <div className="relative">
                  <span className="text-sm text-gray-700">Hello, {user?.first_name}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary px-4 py-2 text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
              title={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link href="/" className="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link href="/vouchers" className="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium">
                Vouchers
              </Link>
              <Link href="/how-it-works" className="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium">
                How It Works
              </Link>
              <Link href="/support" className="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium">
                Support
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium">
                    Login
                  </Link>
                  <Link href="/auth/register" className="block bg-primary-600 text-white px-3 py-2 text-base font-medium rounded-md">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
