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
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-textdim">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>القاهرة، مصر</span>
              </div>
              
              <div className="flex items-center gap-3 text-textdim">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>اتصل للطلب</span>
              </div>

              <div className="flex items-center gap-3 text-textdim">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                <span>نوصل 24/7</span>
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
          </div>
        </div>
      </div>
    </footer>
  )
}


