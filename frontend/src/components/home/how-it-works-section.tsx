import { 
  UserPlusIcon,
  CreditCardIcon,
  TicketIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const steps = [
  {
    id: 1,
    title: 'Create Account',
    description: 'Sign up for free with just your email address. No hidden fees or commitments.',
    icon: UserPlusIcon,
    color: 'primary'
  },
  {
    id: 2,
    title: 'Choose Service',
    description: 'Browse our voucher types and select the service that meets your needs.',
    icon: TicketIcon,
    color: 'success'
  },
  {
    id: 3,
    title: 'Make Payment',
    description: 'Secure payment processing with multiple payment options available.',
    icon: CreditCardIcon,
    color: 'warning'
  },
  {
    id: 4,
    title: 'Use Voucher',
    description: 'Receive your voucher code instantly and access your chosen service.',
    icon: CheckCircleIcon,
    color: 'info'
  }
]

const colorVariants = {
  primary: {
    bg: 'bg-primary-100',
    icon: 'text-primary-600',
    border: 'border-primary-200'
  },
  success: {
    bg: 'bg-success-100',
    icon: 'text-success-600',
    border: 'border-success-200'
  },
  warning: {
    bg: 'bg-warning-100',
    icon: 'text-warning-600',
    border: 'border-warning-200'
  },
  info: {
    bg: 'bg-info-100',
    icon: 'text-info-600',
    border: 'border-info-200'
  }
}

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started is simple. Follow these four easy steps to access 
            any of our academic services within minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 to-info-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const colors = colorVariants[step.color as keyof typeof colorVariants]
              
              return (
                <div key={step.id} className="relative text-center group">
                  {/* Mobile Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  {/* Step Circle */}
                  <div className="relative z-10 mx-auto">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colors.bg} border-4 ${colors.border} bg-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {step.id}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Need Help Getting Started?
              </h3>
              <p className="text-gray-600 mb-6">
                Our support team is available 24/7 to guide you through the process. 
                We also have comprehensive documentation and video tutorials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/support"
                  className="btn-primary px-6 py-3 rounded-lg font-semibold text-center"
                >
                  Get Support
                </a>
                <a
                  href="/docs"
                  className="btn-outline px-6 py-3 rounded-lg font-semibold text-center border-2"
                >
                  View Documentation
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-primary-600 mb-1">2 min</div>
                <div className="text-sm text-gray-600">Average setup time</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-success-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support availability</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-warning-600 mb-1">Instant</div>
                <div className="text-sm text-gray-600">Voucher delivery</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="text-2xl font-bold text-info-600 mb-1">99.9%</div>
                <div className="text-sm text-gray-600">Uptime guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
