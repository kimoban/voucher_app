import { 
  ShieldCheckIcon, 
  ClockIcon, 
  CurrencyDollarIcon, 
  DevicePhoneMobileIcon,
  ChartBarIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Secure & Reliable',
    description: 'Bank-grade security with encrypted voucher codes and secure payment processing.',
    icon: ShieldCheckIcon,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50'
  },
  {
    name: 'Instant Delivery',
    description: 'Get your voucher codes immediately after payment confirmation.',
    icon: ClockIcon,
    color: 'text-success-600',
    bgColor: 'bg-success-50'
  },
  {
    name: 'Affordable Pricing',
    description: 'Competitive rates with no hidden fees. Pay only for what you use.',
    icon: CurrencyDollarIcon,
    color: 'text-warning-600',
    bgColor: 'bg-warning-50'
  },
  {
    name: 'Mobile Friendly',
    description: 'Access your vouchers anytime, anywhere with our responsive platform.',
    icon: DevicePhoneMobileIcon,
    color: 'text-info-600',
    bgColor: 'bg-info-50'
  },
  {
    name: 'Usage Analytics',
    description: 'Track your voucher usage with detailed analytics and reports.',
    icon: ChartBarIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    name: '24/7 Support',
    description: 'Round-the-clock customer support to help you with any issues.',
    icon: UserGroupIcon,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide a comprehensive solution for all your academic service needs 
            with features designed to make your experience seamless and secure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.name}
              className="group relative p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {feature.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-2 text-primary-600 bg-primary-50 px-6 py-3 rounded-full">
            <ShieldCheckIcon className="w-5 h-5" />
            <span className="font-medium">Trusted by over 10,000 students nationwide</span>
          </div>
        </div>
      </div>
    </section>
  )
}
