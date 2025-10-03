import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gPGcgZmlsbD0iIzAwN2NmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ij4gPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iNCIvPiA8Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0Ii8+IDwvZz4gPC9nPiA8L3N2Zz4=')] opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Academic Services
              <span className="block text-primary-600">Made Simple</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Purchase secure voucher codes for result checking, school applications, 
              placements, and more. Fast, reliable, and trusted by thousands of students.
            </p>
            
            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-primary-600">10K+</div>
                <div className="text-sm text-gray-500">Students Served</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">50K+</div>
                <div className="text-sm text-gray-500">Vouchers Issued</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">99.9%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/vouchers"
                className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Browse Vouchers
              </Link>
              <Link
                href="/how-it-works"
                className="btn-outline px-8 py-4 text-lg font-semibold rounded-lg border-2 hover:shadow-md transition-all"
              >
                How It Works
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12">
              <p className="text-sm text-gray-500 mb-4">Trusted by leading institutions</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-60">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  <span className="text-sm font-medium text-gray-600">University A</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  <span className="text-sm font-medium text-gray-600">College B</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  <span className="text-sm font-medium text-gray-600">Institute C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Mock Voucher Card */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">Result Check Voucher</h3>
                    <p className="text-primary-100 text-sm">Valid for 30 days</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$10</div>
                    <div className="text-primary-100 text-xs">Per voucher</div>
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-3 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-primary-100 mb-1">Voucher Code</div>
                    <div className="font-mono text-lg font-bold tracking-wider">VCH-2025-ABC123</div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary-100">Uses: 3 remaining</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-xs">Active</span>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-success-500 text-white p-3 rounded-full shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-warning-500 text-white p-3 rounded-full shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
