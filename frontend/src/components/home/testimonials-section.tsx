import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'University Student',
    institution: 'Lagos State University',
    content: 'The result checking process was so smooth and fast. I got my voucher instantly and accessed my results within minutes. Highly recommended!',
    rating: 5,
    avatar: '/avatars/sarah.jpg'
  },
  {
    id: 2,
    name: 'Michael Adebayo',
    role: 'High School Graduate',
    institution: 'Federal University of Technology',
    content: 'Used the school application voucher for my university admission. The process was streamlined and the support team was incredibly helpful.',
    rating: 5,
    avatar: '/avatars/michael.jpg'
  },
  {
    id: 3,
    name: 'Aisha Ibrahim',
    role: 'Graduate Student',
    institution: 'University of Ibadan',
    content: 'The placement service helped me secure an internship at a top company. The career guidance and CV optimization were excellent.',
    rating: 5,
    avatar: '/avatars/aisha.jpg'
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'International Student',
    institution: 'Covenant University',
    content: 'As an international student, the admission processing service made everything so much easier. Worth every penny!',
    rating: 5,
    avatar: '/avatars/david.jpg'
  },
  {
    id: 5,
    name: 'Folake Ogundimu',
    role: 'Postgraduate Student',
    institution: 'University of Lagos',
    content: 'Course registration was a nightmare until I found this platform. Now I can register for courses without any hassle.',
    rating: 5,
    avatar: '/avatars/folake.jpg'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Undergraduate',
    institution: 'Obafemi Awolowo University',
    content: 'The student services voucher gave me access to academic counseling that really helped improve my grades. Amazing platform!',
    rating: 5,
    avatar: '/avatars/james.jpg'
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Students Say About Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied students who have used our platform 
            to access academic services quickly and securely.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <StarIcon key={index} className="w-5 h-5 text-warning-400" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-primary-600">
                    {testimonial.institution}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-600 mb-2">50,000+</div>
              <div className="text-gray-600">Vouchers Issued</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-info-600 mb-2">99.9%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-6">Trusted by students from leading institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">University of Lagos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">Covenant University</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">University of Ibadan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">FUNAAB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
