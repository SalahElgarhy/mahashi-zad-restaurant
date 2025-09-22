// Payment Methods
export const PAYMENT_METHODS = [
  {
    id: 'cash',
    name: 'الدفع عند الاستلام',
    description: 'ادفع نقداً عند وصول الطلب',
    icon: '💵',
    available: true
  },
  {
    id: 'vodafone',
    name: 'فودافون كاش',
    description: 'الدفع عبر فودافون كاش',
    icon: '📱',
    available: true
  },
  {
    id: 'bank_card',
    name: 'البطاقات البنكية',
    description: 'Visa, Mastercard, Meeza',
    icon: '💳',
    available: true
  }
]

// Contact Information
export const CONTACT_INFO = {
  phone: '+20-xxx-xxx-xxxx',
  email: 'info@mahashi-zad.com',
  address: 'القاهرة، مصر',
  workingHours: '24/7',
  deliveryAreas: ['القاهرة', 'الجيزة', 'القليوبية']
}

// App Configuration
export const APP_CONFIG = {
  name: 'محاشي زاد',
  description: 'أصالة الطعم المصري بلمسة عصرية مميزة',
  version: '1.0.0',
  author: 'فريق محاشي زاد',
  repository: 'https://github.com/SalahElgarhy/mahashi-zad-restaurant'
}
