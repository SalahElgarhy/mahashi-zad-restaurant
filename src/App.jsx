import './index.css'
import MenuAccordion from './components/MenuAccordion'
import ContactForm from './components/ContactForm'
import ContactInfo from './components/ContactInfo'
import AboutSection from './components/AboutSection'
import CartSummary from './components/CartSummary'
import { useState } from 'react'
// PaymentSection متاح لاحقًا عند تفعيل بوابة الدفع
// import PaymentSection from './components/PaymentSection'

function App() {
  const [cart, setCart] = useState([])
  const [showMenu, setShowMenu] = useState(false)

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
  const handleShowMenu = () => {
    setShowMenu(true)
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }
  const goCheckout = ()=> {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-bg text-text font-cairo">
      <header className="sticky top-0 z-50 bg-[rgba(15,20,18,.7)] border-b border-[color:var(--borderc)] backdrop-blur-md">
        <div className="max-w-container mx-auto px-5 flex items-center justify-between min-h-16">
          <a href="#hero" className="font-extrabold no-underline text-text flex items-center gap-2">
            <img src="/logo.jpg" alt="شعار محشي زاد" className="w-8 h-8 rounded-full object-cover" />
            محشي زاد
          </a>
          <ul className="flex gap-6">
            <li><a href="#hero">الرئيسية</a></li>
            <li><a href="#menu">قائمة الطعام</a></li>
            <li><a href="#about">من نحن</a></li>
            <li><a href="#contact">تواصل</a></li>
          </ul>
        </div>
      </header>

      <main>
        <section id="hero" className="py-16 text-center">
          <div className="max-w-container mx-auto px-5">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">أهلاً بك في محشي زاد</h1>
            <p className="text-textdim text-lg md:text-xl mt-4 mb-6 max-w-2xl mx-auto leading-relaxed">نكهات البيت المصري... ورائحة الطفولة في كل لقمة.</p>
            <div className="mt-8 flex justify-center gap-3">
              <button className="btn btn-primary" onClick={handleShowMenu}>اكتشف القائمة</button>
              <button className="btn btn-outline" onClick={handleShowMenu}>احجز الآن</button>
            </div>
          </div>
        </section>

        {/* قسم المقولة */}
        <section className="py-12 bg-gradient-to-r from-surface to-card">
          <div className="max-w-container mx-auto px-5 text-center">
            <div className="bg-[rgba(31,170,89,0.1)] border border-[color:var(--borderc)] rounded-2xl p-8 max-w-3xl mx-auto relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-[#1a1206] px-4 py-2 rounded-full text-sm font-bold">
                مقولة شعبية
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-text italic mt-2">
                «الأكل الحلو بيجمع القلوب، والمحشي سيد السفرة.»
              </blockquote>
            </div>
          </div>
        </section>

        <AboutSection />

        {/* <PaymentSection /> */}

        <section id="menu" className="py-16">
          <div className="max-w-container mx-auto px-5">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">قائمة الطعام</h2>
              <p className="text-textdim mb-6">اكتشف أشهى الأصناف المصرية الأصيلة</p>
              
              {!showMenu ? (
                <button 
                  className="btn btn-primary text-lg px-8 py-4 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                  onClick={() => setShowMenu(true)}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    اعرض قائمة الطعام
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </span>
                </button>
              ) : (
                <button 
                  className="btn btn-outline text-sm mb-4 transition-all duration-200 hover:scale-105"
                  onClick={() => setShowMenu(false)}
                >
                  <span className="flex items-center gap-2">
                    إخفاء القائمة
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18,15 12,9 6,15"></polyline>
                    </svg>
                  </span>
                </button>
              )}
            </div>
            
            <div className={`transition-all duration-700 ease-in-out ${
              showMenu 
                ? 'max-h-[2000px] opacity-100 transform translate-y-0' 
                : 'max-h-0 opacity-0 transform -translate-y-4 overflow-hidden'
            }`}>
              <div className="animate-fadeInUp">
                <MenuAccordion onAdd={handleAdd} />
                <CartSummary items={cart} onInc={inc} onDec={dec} onClear={clear} />
                {cart.length>0 && (
                  <div className="text-center mt-4">
                    <button className="btn btn-primary transition-transform duration-200 hover:scale-105 active:scale-95" onClick={goCheckout}>إدخال بيانات التوصيل ◀</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="max-w-container mx-auto px-5">
            <h2 className="text-2xl font-bold mb-4">تواصل واحجز</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-surface border border-[color:var(--borderc)] rounded-xl p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">اختر أصنافك أولاً</h3>
                  <p className="text-textdim mb-4">لإتمام الطلب، اختر الأصناف المفضلة لك من قائمة الطعام</p>
                  <a className="btn btn-primary" href="#menu">تصفح القائمة</a>
                </div>
              </div>
            ) : (
              <ContactForm selectedItems={cart} />
            )}
            
            <ContactInfo />
          </div>
        </section>
      </main>

      <footer className="border-t border-[color:var(--borderc)] py-4">
        <div className="max-w-container mx-auto px-5 flex items-center justify-between">
          <div className="font-extrabold flex items-center gap-2">
            <img src="/logo.jpg" alt="شعار محشي زاد" className="w-6 h-6 rounded-full object-cover" />
            محشي زاد
          </div>
          <div>© <span>{new Date().getFullYear()}</span> جميع الحقوق محفوظة</div>
        </div>
      </footer>
    </div>
  )
}

export default App
