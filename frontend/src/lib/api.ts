import {
  User,
  VoucherType,
  Voucher,
  Payment,
  VoucherUsage,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  VoucherPurchaseRequest,
  PaymentIntentRequest,
  PaymentIntentResponse,
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('access_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// Helper function to handle token refresh
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Token refresh failed')
    }

    const data = await response.json()
    const newAccessToken = data.access
    localStorage.setItem('access_token', newAccessToken)
    return newAccessToken
  } catch (error) {
    // Refresh failed, clear tokens and redirect to login
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
    return null
  }
}

// Base API function with automatic token refresh
async function apiCall<T>(
  endpoint: string, 
  options: RequestInit = {},
  isRetry = false
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers as object),
    },
  }

  let response = await fetch(url, config)
  
  // Handle 401 unauthorized - attempt token refresh
  if (response.status === 401 && !isRetry) {
    const newToken = await refreshAccessToken()
    
    if (newToken) {
      // Retry the request with new token
      const retryConfig: RequestInit = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newToken}`,
        },
      }
      response = await fetch(url, retryConfig)
    }
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }
  
  return response.json()
}

// Auth API
export const authApi = {
  login: (credentials: LoginRequest): Promise<AuthResponse> =>
    apiCall<AuthResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (data: RegisterRequest): Promise<AuthResponse> =>
    apiCall<AuthResponse>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: (refreshToken: string): Promise<void> =>
    apiCall<void>('/auth/logout/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    }),

  refreshToken: (refreshToken: string): Promise<{ access: string }> =>
    apiCall<{ access: string }>('/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    }),

  getProfile: (): Promise<User> =>
    apiCall<User>('/users/profile/'),

  updateProfile: (data: Partial<User>): Promise<User> =>
    apiCall<User>('/users/profile/update/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  changePassword: (data: {
    old_password: string
    new_password: string
    confirm_password: string
  }): Promise<void> =>
    apiCall<void>('/users/change-password/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

// Vouchers API
export const vouchersApi = {
  getVoucherTypes: (): Promise<VoucherType[]> =>
    apiCall<VoucherType[]>('/vouchers/types/'),

  getUserVouchers: (status?: string): Promise<Voucher[]> => {
    const params = status ? `?status=${status}` : ''
    return apiCall<Voucher[]>(`/vouchers/my-vouchers/${params}`)
  },

  getVoucherDetail: (code: string): Promise<Voucher> =>
    apiCall<Voucher>(`/vouchers/detail/${code}/`),

  purchaseVoucher: (data: VoucherPurchaseRequest): Promise<{
    message: string
    vouchers: Voucher[]
    total_paid: number
    discount_applied: number
  }> =>
    apiCall('/vouchers/purchase/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  redeemVoucher: (data: {
    code: string
    service_type: string
    service_data: Record<string, any>
  }): Promise<{
    message: string
    voucher: Voucher
    usage: VoucherUsage
  }> =>
    apiCall('/vouchers/redeem/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getUserStats: (): Promise<{
    total_vouchers: number
    active_vouchers: number
    used_vouchers: number
    expired_vouchers: number
    total_value: number
  }> =>
    apiCall('/vouchers/stats/'),

  getUsageHistory: (): Promise<VoucherUsage[]> =>
    apiCall<VoucherUsage[]>('/vouchers/usage-history/'),
}

// Payments API
export const paymentsApi = {
  createPaymentIntent: (data: PaymentIntentRequest): Promise<PaymentIntentResponse> =>
    apiCall<PaymentIntentResponse>('/payments/create-intent/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  confirmPayment: (data: {
    payment_intent_id: string
  }): Promise<{
    message: string
    payment: Payment
    voucher_codes: string[]
  }> =>
    apiCall('/payments/confirm/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getPaymentHistory: (): Promise<Payment[]> =>
    apiCall<Payment[]>('/payments/history/'),

  requestRefund: (data: {
    payment_id: string
    reason: string
    amount?: number
    notes?: string
  }): Promise<void> =>
    apiCall<void>('/payments/refund/request/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getUserRefunds: (): Promise<any> =>
    apiCall('/payments/refunds/'),
}

// Analytics API
export const analyticsApi = {
  getUserAnalytics: (): Promise<any> =>
    apiCall('/analytics/user/'),

  getAdminDashboard: (): Promise<any> =>
    apiCall('/analytics/dashboard/'),

  getRevenueAnalytics: (days?: number): Promise<any> => {
    const params = days ? `?days=${days}` : ''
    return apiCall(`/analytics/revenue/${params}`)
  },
}

// Export a default API object for backwards compatibility
const api = {
  get: <T>(url: string) => apiCall<T>(url),
  post: <T>(url: string, data?: any) => apiCall<T>(url, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  }),
  patch: <T>(url: string, data?: any) => apiCall<T>(url, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  }),
  delete: <T>(url: string) => apiCall<T>(url, { method: 'DELETE' }),
}

export default api
