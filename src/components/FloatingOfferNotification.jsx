import { useState, useEffect } from 'react'

export default function FloatingOfferNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const scrollToOffers = () => {
    document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' })
    setIsMinimized(true)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-slideInRight">
      <div className={`bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-lg shadow-2xl transition-all duration-300 ${
        isMinimized ? 'scale-75 opacity-80' : 'scale-100'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-black/20">
          <div className="flex items-center gap-2">
            <span className="text-lg animate-bounce">🔥</span>
            <span className="font-bold text-sm">عروض حصرية!</span>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={handleMinimize}
              className="w-6 h-6 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
            >
              {isMinimized ? '+' : '-'}
            </button>
            <button 
              onClick={handleClose}
              className="w-6 h-6 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="p-4">
            <div className="mb-3">
              <div className="text-lg font-bold mb-1">خصم يصل إلى 30%</div>
              <div className="text-sm opacity-90">على جميع الطلبات الكبيرة</div>
            </div>
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={scrollToOffers}
                className="w-full bg-black text-yellow-400 py-2 px-4 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
              >
                اعرض العروض
              </button>
              
              <a 
                href="tel:0227304080"
                className="w-full bg-white/20 py-2 px-4 rounded-lg font-bold text-sm hover:bg-white/30 transition-colors text-center"
              >
                📞 اطلب الآن
              </a>
            </div>

            {/* Timer */}
            <div className="text-center mt-3">
              <span className="text-xs opacity-75 animate-pulse">
                ⏰ العرض لفترة محدودة
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
