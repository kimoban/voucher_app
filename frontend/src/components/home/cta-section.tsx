import Link from 'next/link'
import { 
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Geometric Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gPGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjAzIj4gPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIvPiA8L2c+IDwvZz4gPC9zdmc+')] opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <div className="inline-flex items-center justify-center p-2 bg-white/10 rounded-full mb-6">
            <SparklesIcon className="w-6 h-6 text-white mr-2" />
            <span className="text-white font-medium">Limited Time Offer</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Get Started?
            <span className="block text-primary-200">Join Thousands of Students Today</span>
          </h2>

          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Don't wait any longer. Get instant access to all academic services with our 
            secure voucher system. Sign up now and get your first voucher with a special discount.
          </p>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-10 text-white">
            <div className="flex items-center">
              <ShieldCheckIcon className="w-5 h-5 text-primary-200 mr-2" />
              <span className="text-sm">100% Secure</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-5 h-5 text-primary-200 mr-2" />
              <span className="text-sm">Instant Delivery</span>
            </div>
            <div className="flex items-center">
              <SparklesIcon className="w-5 h-5 text-primary-200 mr-2" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/register"
              className="group bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Get Started Now
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="/vouchers"
              className="group border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Browse Vouchers
            </Link>
          </div>

          {/* Special Offer */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-warning-400 text-warning-900 px-4 py-2 rounded-full font-bold text-sm">
                🎉 SPECIAL OFFER
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              New User Discount
            </h3>
            <p className="text-primary-100 mb-4">
              Get 20% off your first voucher purchase when you sign up today. 
              Use code <span className="font-mono bg-white/20 px-2 py-1 rounded">WELCOME20</span>
            </p>
            <div className="text-sm text-primary-200">
              Offer expires in 7 days. Terms and conditions apply.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  )
}
