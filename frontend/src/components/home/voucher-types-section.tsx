import Link from 'next/link'
import { 
  AcademicCapIcon, 
  DocumentCheckIcon, 
  BriefcaseIcon, 
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'

const voucherTypes = [
  {
    id: 1,
    name: 'Result Check',
    description: 'Access and verify your academic results from various institutions.',
    price: 10,
    icon: DocumentCheckIcon,
    features: [
      'Instant result access',
      'Multiple format downloads',
      'Verification certificate',
      'Valid for 30 days'
    ],
    popular: true,
    color: 'primary'
  },
  {
    id: 2,
    name: 'School Application',
    description: 'Apply to schools and universities with our streamlined process.',
    price: 25,
    icon: AcademicCapIcon,
    features: [
      'Application assistance',
      'Document upload',
      'Status tracking',
      'Valid for 60 days'
    ],
    popular: false,
    color: 'success'
  },
  {
    id: 3,
    name: 'Placement Services',
    description: 'Find internships and job placements in your field of study.',
    price: 35,
    icon: BriefcaseIcon,
    features: [
      'Job matching',
      'Interview preparation',
      'CV optimization',
      'Valid for 90 days'
    ],
    popular: false,
    color: 'warning'
  },
  {
    id: 4,
    name: 'Admission Processing',
    description: 'Fast-track your admission process with priority handling.',
    price: 50,
    icon: BuildingOfficeIcon,
    features: [
      'Priority processing',
      'Admission counseling',
      'Document verification',
      'Valid for 120 days'
    ],
    popular: false,
    color: 'info'
  },
  {
    id: 5,
    name: 'Course Registration',
    description: 'Register for courses and manage your academic schedule.',
    price: 15,
    icon: ClipboardDocumentListIcon,
    features: [
      'Course selection',
      'Schedule optimization',
      'Prerequisites check',
      'Valid for 45 days'
    ],
    popular: false,
    color: 'purple'
  },
  {
    id: 6,
    name: 'Student Services',
    description: 'Access various student support services and resources.',
    price: 20,
    icon: UserPlusIcon,
    features: [
      'Academic counseling',
      'Resource access',
      'Support tickets',
      'Valid for 60 days'
    ],
    popular: false,
    color: 'rose'
  }
]

const colorVariants = {
  primary: {
    border: 'border-primary-200',
    bg: 'bg-primary-50',
    text: 'text-primary-600',
    button: 'bg-primary-600 hover:bg-primary-700 text-white',
    icon: 'text-primary-600'
  },
  success: {
    border: 'border-success-200',
    bg: 'bg-success-50',
    text: 'text-success-600',
    button: 'bg-success-600 hover:bg-success-700 text-white',
    icon: 'text-success-600'
  },
  warning: {
    border: 'border-warning-200',
    bg: 'bg-warning-50',
    text: 'text-warning-600',
    button: 'bg-warning-600 hover:bg-warning-700 text-white',
    icon: 'text-warning-600'
  },
  info: {
    border: 'border-info-200',
    bg: 'bg-info-50',
    text: 'text-info-600',
    button: 'bg-info-600 hover:bg-info-700 text-white',
    icon: 'text-info-600'
  },
  purple: {
    border: 'border-purple-200',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700 text-white',
    icon: 'text-purple-600'
  },
  rose: {
    border: 'border-rose-200',
    bg: 'bg-rose-50',
    text: 'text-rose-600',
    button: 'bg-rose-600 hover:bg-rose-700 text-white',
    icon: 'text-rose-600'
  }
}

export function VoucherTypesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our comprehensive range of academic services. 
            Each voucher comes with specific features and validity periods.
          </p>
        </div>

        {/* Voucher Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {voucherTypes.map((voucher) => {
            const colors = colorVariants[voucher.color as keyof typeof colorVariants]
            
            return (
              <div 
                key={voucher.id}
                className={`relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 ${colors.border} group overflow-hidden`}
              >
                {/* Popular Badge */}
                {voucher.popular && (
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="p-6">
                  {/* Icon and Title */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colors.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <voucher.icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {voucher.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {voucher.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">${voucher.price}</span>
                      <span className="text-gray-500 ml-2">per voucher</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {voucher.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-success-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={`/vouchers/${voucher.id}`}
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${colors.button}`}
                  >
                    Purchase Now
                  </Link>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            )
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you need a specialized service or bulk vouchers for your institution, 
              our team can create a custom package tailored to your requirements.
            </p>
            <Link
              href="/contact"
              className="btn-outline px-8 py-3 font-semibold rounded-lg border-2 hover:shadow-md transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
