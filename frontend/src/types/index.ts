export interface User {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  phone_number?: string
  date_of_birth?: string
  profile_picture?: string
  is_verified: boolean
  student_id?: string
  institution?: string
  graduation_year?: number
  created_at: string
  updated_at: string
}

export interface VoucherType {
  id: number
  name: string
  type_code: string
  description: string
  price: number
  is_active: boolean
  validity_days: number
  usage_limit: number
  created_at: string
  updated_at: string
}

export interface Voucher {
  id: string
  voucher_type: VoucherType
  code: string
  status: 'active' | 'used' | 'expired' | 'cancelled'
  usage_count: number
  last_used_at?: string
  issued_at: string
  expires_at: string
  is_valid: boolean
  days_until_expiry: number
  metadata: Record<string, any>
}

export interface Payment {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded'
  payment_method: string
  voucher_type: VoucherType
  quantity: number
  discount_amount: number
  discount_code?: string
  total_amount: number
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface VoucherUsage {
  id: string
  voucher_code: string
  voucher_type_name: string
  service_type: string
  service_data: Record<string, any>
  used_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  password_confirm: string
  first_name: string
  last_name: string
  phone_number?: string
}

export interface AuthResponse {
  user: User
  access: string
  refresh: string
  message: string
}

export interface VoucherPurchaseRequest {
  voucher_type_id: number
  quantity: number
  discount_code?: string
}

export interface PaymentIntentRequest {
  voucher_type_id: number
  quantity: number
  discount_code?: string
  payment_method?: string
  currency?: string
}

export interface PaymentIntentResponse {
  payment_id: string
  client_secret: string
  amount: number
  currency: string
  payment: Payment
}
