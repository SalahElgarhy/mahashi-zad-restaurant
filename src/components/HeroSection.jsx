import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1412] via-[#1a2e23] to-[#0f1412] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,170,89,0.1)_0%,transparent_50%)] bg-[length:60px_60px] bg-repeat"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Logo/Brand */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            محاشي زاد
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 animate-scaleX"></div>
        </div>

        {/* Tagline */}
        <div className="mb-12 animate-fadeInUp delay-300">
          <p className="text-2xl md:text-3xl text-textdim font-light leading-relaxed max-w-3xl mx-auto">
            أصالة الطعم المصري
            <br />
            <span className="text-accent font-medium">بلمسة عصرية مميزة</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp delay-600">
          <Link 
            to="/menu" 
            className="btn btn-primary text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 active:scale-95 group"
          >
            استعرض القائمة
          </Link>
          
          <button 
            onClick={() => document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-outline text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-[#0b100d] hover:border-accent active:scale-95 flex items-center gap-2"
          >
            <span>🎉</span>
            العروض الخاصة
          </button>
          
          <button className="btn btn-outline text-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-[#0b100d] hover:border-primary active:scale-95">
            تواصل معنا
          </button>
        </div>
      </div>
    </section>
  )
}
