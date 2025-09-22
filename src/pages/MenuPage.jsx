import { useState } from 'react'
import CollapsibleMenuSection from '../components/features/Menu/CollapsibleMenuSection'
import BeverageSection from '../components/features/Menu/BeverageSection'
import OffersSection from '../components/features/Menu/OffersSection'
import CartSummary from '../components/features/Cart/CartSummary'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import { Link } from 'react-router-dom'

export default function MenuPage() {
  const [cart, setCart] = useState([])

  const handleAdd = (item) => {
    setCart((prev)=>{
      const idx = prev.findIndex(p=> p.group===item.group && p.name===item.name && p.price===item.price)
      if (idx>-1){
        const copy = [...prev]; copy[idx] = { ...copy[idx], qty: copy[idx].qty+1 }; return copy
      }
      return [...prev, { ...item, qty:1 }]
    })
  }

  const inc = (i)=> setCart(prev=> prev.map((it,idx)=> idx===i? { ...it, qty: it.qty+1}: it))
  const dec = (i)=> setCart(prev=> prev.flatMap((it,idx)=> idx===i? (it.qty>1? [{...it, qty: it.qty-1}] : []): [it]))
  const clear = ()=> setCart([])

  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      <Navigation />
      
      {/* Hero Section for Menu */}
      <section className="py-12 bg-gradient-to-b from-surface to-bg pt-20">
        <div className="max-w-container mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">قائمة الطعام</h1>
          <p className="text-textdim text-lg mb-6">اكتشف أشهى الأصناف المصرية الأصيلة</p>
          
          {/* Order Instructions */}
          <div className="bg-gradient-to-r from-yellow-50/10 to-orange-50/10 rounded-xl p-6 mb-6 border border-yellow-400/20 max-w-2xl mx-auto">
            <h3 className="font-bold mb-4 text-accent flex items-center justify-center gap-2">
              <span>⏰</span>
              <span>شروط الطلب المهمة</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-3 border border-green-400/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-500">📅</span>
                  <span className="font-semibold">الطلبات الكبيرة</span>
                </div>
                <p className="text-textdim">يُفضل الطلب قبل بيوم من التسليم</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-blue-400/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-500">⚡</span>
                  <span className="font-semibold">الطلبات الصغيرة</span>
                </div>
                <p className="text-textdim">نفس اليوم - يُرجى الطلب مبكراً</p>
              </div>
            </div>
          </div>
          
          {/* زر الاتصال المباشر */}
          <a 
            href="tel:01105642820"
            className="btn btn-primary text-lg px-8 py-4 mb-6 inline-block transition-all duration-200 hover:scale-105 active:scale-95"
          >
            📞 اتصل الآن للحجز والاستفسار - 01105642820
          </a>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>
      </section>

      {/* 1. قائمة الطعام - Menu Content */}
      <CollapsibleMenuSection onAdd={handleAdd} />
      
      {/* 2. العروض - Offers Section */}
      <OffersSection onAdd={handleAdd} />
      
      {/* 3. المشروبات - Beverages Section */}
      <BeverageSection onAdd={handleAdd} />
      
      {/* 4. السلة - Cart and Checkout */}
      <section className="py-8">
        <div className="max-w-container mx-auto px-5">
          <CartSummary items={cart} onInc={inc} onDec={dec} onClear={clear} />
          
          {cart.length > 0 && (
            <div className="text-center mt-6">
              <Link 
                to={`/checkout?cart=${encodeURIComponent(JSON.stringify(cart))}`}
                className="btn btn-primary text-lg px-8 py-4 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                متابعة إلى الطلب ({cart.length} صنف) ◀
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 6. طريقة الدفع - Payment Methods Section */}
      <section className="py-16 bg-bg">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-3xl font-bold text-center mb-8">طرق الدفع المتاحة</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cash Payment */}
            <div className="bg-card border border-[color:var(--borderc)] rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💵</span>
              </div>
              <h3 className="font-bold mb-2">الدفع عند الاستلام</h3>
              <p className="text-textdim text-sm">ادفع نقداً عند وصول طلبك</p>
            </div>

            {/* Vodafone Cash */}
            <div className="bg-card border border-[color:var(--borderc)] rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="font-bold mb-2">فودافون كاش</h3>
              <p className="text-textdim text-sm">سهل وسريع عبر المحفظة</p>
            </div>

            {/* Instapay */}
            <div className="bg-card border border-[color:var(--borderc)] rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="font-bold mb-2">Instapay</h3>
              <p className="text-textdim text-sm">تحويل فوري بين البنوك</p>
            </div>

            {/* Bank Cards */}
            <div className="bg-card border border-[color:var(--borderc)] rounded-xl p-6 text-center hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💳</span>
              </div>
              <h3 className="font-bold mb-2">البطاقات البنكية</h3>
              <p className="text-textdim text-sm">Visa, Mastercard, Meeza</p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 text-center">
        <Link 
          to="/" 
          className="btn btn-outline hover:bg-primary hover:border-primary hover:text-[#0b100d] transition-all"
        >
          ← العودة للرئيسية
        </Link>
      </section>

      <Footer />
    </div>
  )
}
