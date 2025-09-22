import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(15,20,18,0.95)] backdrop-blur-md border-b border-[color:var(--borderc)]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-[#0b100d]">م</span>
            </div>
            <span className="text-xl font-bold text-primary">محاشي زاد</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`transition-all duration-300 hover:text-primary ${
                isActive('/') ? 'text-primary font-medium' : 'text-textdim'
              }`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/menu" 
              className={`transition-all duration-300 hover:text-primary ${
                isActive('/menu') ? 'text-primary font-medium' : 'text-textdim'
              }`}
            >
              القائمة
            </Link>
            <Link 
              to="/checkout" 
              className={`transition-all duration-300 hover:text-primary ${
                isActive('/checkout') ? 'text-primary font-medium' : 'text-textdim'
              }`}
            >
              الطلب
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-[rgba(31,170,89,0.1)] transition-colors duration-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
