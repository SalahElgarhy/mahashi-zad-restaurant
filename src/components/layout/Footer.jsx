import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--borderc)] py-8 bg-[color:var(--surface)]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-[#0b100d]">م</span>
              </div>
              <span className="text-xl font-bold text-primary">محاشي زاد</span>
            </div>
            <p className="text-textdim leading-relaxed">
              أصالة الطعم المصري بلمسة عصرية مميزة. نقدم أشهى أنواع المحاشي المصرية الأصيلة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-textdim hover:text-primary transition-colors duration-200">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-textdim hover:text-primary transition-colors duration-200">
                  قائمة الطعام
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-textdim hover:text-primary transition-colors duration-200">
                  الطلب
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">معلومات التواصل</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {/* Main Phone */}
              <a 
                href="tel:01105642820"
                className="flex items-center gap-2 text-textdim hover:text-primary transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="text-xs">📞</span>
                </div>
                <div>
                  <div className="font-semibold text-xs">الحجز والاستفسار</div>
                  <div className="text-xs text-textdim">01105642820</div>
                </div>
              </a>
              
              {/* WhatsApp */}
              <a 
                href="https://wa.me/2001105642820"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-textdim hover:text-primary transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="text-xs">📱</span>
                </div>
                <div>
                  <div className="font-semibold text-xs">واتساب</div>
                  <div className="text-xs text-textdim">01105642820</div>
                </div>
              </a>

              {/* Complaints Phone */}
              <a 
                href="tel:01021407307"
                className="flex items-center gap-2 text-textdim hover:text-primary transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="text-xs">📋</span>
                </div>
                <div>
                  <div className="font-semibold text-xs">الشكاوى والاقتراحات</div>
                  <div className="text-xs text-textdim">01021407307</div>
                </div>
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@mahashizad?_t=ZS-8zcKSz4lShI&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-textdim hover:text-primary transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="text-xs">🎵</span>
                </div>
                <div>
                  <div className="font-semibold text-xs">تيك توك</div>
                  <div className="text-xs text-textdim">@mahashizad</div>
                </div>
              </a>

              {/* Address */}
              <a 
                href="https://maps.google.com/?q=شارع الرئيسي، المحلة الكبرى"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-textdim hover:text-primary transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="text-xs">�</span>
                </div>
                <div>
                  <div className="font-semibold text-xs">العنوان</div>
                  <div className="text-xs text-textdim">شارع الرئيسي، المحلة الكبرى</div>
                </div>
              </a>

              {/* Working Hours */}
              <div className="flex items-center gap-2 text-textdim">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs">🕐</span>
                </div>
                <div>
                  <div className="font-semibold text-xs">مواعيد العمل</div>
                  <div className="text-xs text-textdim">24/7 - نوصل دائماً</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[color:var(--borderc)] mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-textdim text-sm">
            © {new Date().getFullYear()} محاشي زاد. جميع الحقوق محفوظة.
          </div>
          
          <div className="flex items-center gap-4 text-textdim text-sm">
            <span>صنع بـ ❤️ في مصر</span>
            <Link 
              to="/admin" 
              className="opacity-30 hover:opacity-100 transition-opacity text-xs"
              title="لوحة التحكم"
            >
              ⚙️
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


