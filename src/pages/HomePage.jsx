import { Link } from 'react-router-dom'
import AboutSection from '../components/AboutSection'
import Navigation from '../components/layout/Navigation'
import HeroSection from '../components/HeroSection'
import QuoteSection from '../components/QuoteSection'
import OffersSection from '../components/features/Menu/OffersSection'
import FloatingOfferNotification from '../components/FloatingOfferNotification'
import Footer from '../components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      {/* Offers Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-3 px-4 text-center animate-pulse">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 font-bold">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="text-sm sm:text-base">عروض خاصة جديدة! اطلب الآن واحصل على خصومات تصل إلى 30%</span>
          </div>
          <button 
            onClick={() => document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-yellow-400 px-4 py-1 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors"
          >
            اعرض العروض
          </button>
        </div>
      </div>
      
      <Navigation />
      
      <HeroSection />
      
      <QuoteSection />

      <AboutSection />

      {/* Special Offers Section */}
      <div id="offers">
        <OffersSection onAdd={() => {}} />
      </div>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-container mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold mb-4">جاهز للطلب؟</h2>
          <p className="text-textdim mb-6 max-w-xl mx-auto">اكتشف قائمتنا الشاملة واختر أصنافك المفضلة</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/menu" className="btn btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform">
              تصفح قائمة الطعام
            </Link>
            
            <a 
              href="tel:01105642820"
              className="btn btn-outline text-lg px-8 py-4 hover:scale-105 transition-transform"
            >
              📞 اتصل للحجز السريع - 01105642820
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-container mx-auto px-5">
          <h2 className="text-2xl font-bold mb-4 text-center">تواصل معنا</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface border border-[color:var(--borderc)] rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-accent text-center">معلومات التواصل</h3>
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div>
                  <h4 className="font-bold mb-2">للطلب والاستفسار</h4>
                  <p className="text-textdim">اتصل بنا أو تصفح القائمة واطلب أونلاين</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">التوصيل</h4>
                  <p className="text-textdim">نوصل لك في جميع أنحاء القاهرة</p>
                </div>
              </div>

              {/* Order Instructions */}
              <div className="bg-gradient-to-r from-yellow-50/10 to-orange-50/10 rounded-lg p-4 mt-6 border border-yellow-400/20">
                <h4 className="font-bold mb-3 text-accent flex items-center gap-2">
                  <span>⏰</span>
                  <span>شروط الطلب</span>
                </h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-textdim">
                    <span className="text-green-500">📅</span>
                    <span>الطلبات الكبيرة: قبل بيوم من التسليم</span>
                  </div>
                  <div className="flex items-center gap-2 text-textdim">
                    <span className="text-blue-500">⚡</span>
                    <span>الطلبات الصغيرة: نفس اليوم (طلب مبكر)</span>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="text-center mt-6 mb-4">
                <h4 className="font-bold mb-3 text-accent">تابعنا على وسائل التواصل</h4>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.tiktok.com/@mahashizad?_t=ZS-8zcKSz4lShI&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black hover:bg-primary text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 group"
                  >
                    <span className="text-lg group-hover:animate-bounce">🎵</span>
                    <span className="font-semibold">TikTok</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/2001105642820"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 group"
                  >
                    <span className="text-lg group-hover:animate-bounce">📱</span>
                    <span className="font-semibold">WhatsApp</span>
                  </a>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Link to="/menu" className="btn btn-primary">
                  اطلب الآن من القائمة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* Floating Offer Notification */}
      <FloatingOfferNotification />
    </div>
  )
}
