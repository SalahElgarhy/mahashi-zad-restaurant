import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ContactForm from '../components/features/Contact/ContactForm'
import ContactInfo from '../components/features/Contact/ContactInfo'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'

export default function CheckoutPage() {
  const [searchParams] = useSearchParams()
  const [cart, setCart] = useState([])

  useEffect(() => {
    const cartData = searchParams.get('cart')
    if (cartData) {
      try {
        setCart(JSON.parse(decodeURIComponent(cartData)))
      } catch (error) {
        console.error('Error parsing cart data:', error)
        setCart([])
      }
    }
  }, [searchParams])

  const parsePrice = (p) => Number((p || '').replace(/[^\d.]/g, '')) || 0
  const total = cart.reduce((s, i) => s + parsePrice(i.price) * i.qty, 0)

  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-surface to-bg pt-20">
        <div className="max-w-container mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">إتمام الطلب</h1>
          <p className="text-textdim text-lg mb-6">أدخل بياناتك لإتمام عملية الطلب</p>
          
          {/* Order Instructions */}
          <div className="bg-gradient-to-r from-red-50/10 to-orange-50/10 rounded-xl p-6 border border-red-400/20 max-w-2xl mx-auto">
            <h3 className="font-bold mb-4 text-red-400 flex items-center justify-center gap-2">
              <span>⚠️</span>
              <span>تنبيه مهم - شروط الطلب</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3 border border-green-400/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-500">📅</span>
                  <span className="font-semibold">الطلبات الكبيرة</span>
                </div>
                <p className="text-textdim">يُرجى الطلب قبل بيوم من التسليم</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-blue-400/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-500">⚡</span>
                  <span className="font-semibold">الطلبات الصغيرة</span>
                </div>
                <p className="text-textdim">نفس اليوم - طلب مبكر مطلوب</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a 
                href="tel:01105642820"
                className="btn btn-outline text-sm px-6 py-2 hover:bg-red-400 hover:border-red-400"
              >
                📞 اتصل للتأكيد - 01105642820
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Order Summary */}
      {cart.length > 0 && (
        <section className="py-8 bg-surface/50">
          <div className="max-w-container mx-auto px-5">
            <div className="bg-card border border-[color:var(--borderc)] rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                ملخص الطلب
              </h2>
              
              <div className="grid gap-3">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div>
                      <div className="font-bold text-sm">{item.group}</div>
                      <div className="text-xs text-textdim">{item.name}</div>
                    </div>
                    <div className="text-end">
                      <div className="text-accent font-bold">{item.price}</div>
                      <div className="text-xs text-textdim">الكمية: {item.qty}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-[color:var(--borderc)] flex justify-between items-center">
                <span className="text-lg font-bold">الإجمالي:</span>
                <span className="text-2xl font-extrabold text-accent">{total} ج</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-5">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-surface border border-[color:var(--borderc)] rounded-xl p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="text-xl font-bold mb-2">لا توجد أصناف في الطلب</h3>
                <p className="text-textdim mb-4">اختر أصنافك المفضلة من قائمة الطعام أولاً</p>
                <Link to="/menu" className="btn btn-primary">تصفح القائمة</Link>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center">بيانات التوصيل</h2>
              <ContactForm selectedItems={cart} />
            </>
          )}
          
          <ContactInfo />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 text-center border-t border-[color:var(--borderc)]">
        <div className="flex justify-center gap-4">
          <Link to="/menu" className="btn btn-outline">
            ← العودة للقائمة
          </Link>
          <Link to="/" className="btn btn-outline">
            العودة للرئيسية
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
