import { useState, useEffect } from 'react'
import { OFFERS } from '../../../constants'
import { Card, Button } from '../../ui'

export default function OffersSection({ onAdd }) {
  const [offersData, setOffersData] = useState(OFFERS)
  
  // تحميل العروض من localStorage
  useEffect(() => {
    const savedOffers = localStorage.getItem('mahashi-offers-data')
    if (savedOffers) {
      try {
        const parsedOffers = JSON.parse(savedOffers)
        setOffersData(parsedOffers)
        console.log('✅ تم تحميل العروض المحدثة من الإدارة')
      } catch (error) {
        console.error('❌ خطأ في تحميل العروض:', error)
        setOffersData(OFFERS)
      }
    }
  }, [])
  
  return (
    <section className="py-12 bg-gradient-to-r from-yellow-50/10 to-orange-50/10 border-y border-accent/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-2xl animate-bounce">🎉</span>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              العروض الخاصة
            </h2>
            <span className="text-2xl animate-bounce">🎉</span>
          </div>
          <p className="text-textdim text-lg">عروض حصرية لفترة محدودة - لا تفوت الفرصة!</p>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Offers Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {offersData.map((offer, index) => (
            <Card 
              key={offer.title} 
              className={`relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                index === 0 ? 'lg:scale-110 border-2 border-yellow-400' : ''
              }`}
              variant="elevated"
            >
              {/* Discount Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold z-10 transform rotate-12 shadow-lg">
                خصم {offer.discount}
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
              </div>

              <Card.Header className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl">
                      {index === 0 ? '👑' : index === 1 ? '⚡' : '🎁'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent">{offer.title}</h3>
                    {index === 0 && (
                      <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        الأكثر شعبية
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-textdim leading-relaxed">{offer.description}</p>
              </Card.Header>

              <Card.Content className="relative z-10">
                {/* Price Section */}
                <div className="bg-gradient-to-r from-gray-50/10 to-gray-100/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-textdim line-through">{offer.originalPrice}</span>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
                      وفر {((parseInt(offer.originalPrice) - parseInt(offer.discountPrice)) / parseInt(offer.originalPrice) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-green-500">{offer.discountPrice}</div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {offer.items.map((item) => (
                    <div key={item.name} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      <p className="text-xs text-textdim">{item.description}</p>
                    </div>
                  ))}
                </div>
              </Card.Content>

              <Card.Footer className="relative z-10">
                <Button 
                  variant="primary"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={() => onAdd && onAdd({ 
                    group: 'العروض الخاصة', 
                    name: offer.title, 
                    price: offer.discountPrice 
                  })}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>اطلب العرض الآن</span>
                    <span className="text-sm">🛒</span>
                  </span>
                </Button>

                {/* Urgency Message */}
                <div className="text-center mt-3">
                  <span className="text-xs text-red-500 font-medium animate-pulse">
                    ⏰ العرض لفترة محدودة
                  </span>
                </div>
              </Card.Footer>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 opacity-20 animate-pulse"></div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a 
            href="tel:0227304080"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full px-8 py-4 border border-yellow-400/30 hover:from-yellow-400/30 hover:to-orange-500/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <span className="text-xl group-hover:animate-bounce">📞</span>
            <span className="text-lg font-bold text-accent">اتصل الآن للحجز والاستفسار - 0227304080</span>
            <span className="text-xl group-hover:animate-bounce">📞</span>
          </a>
          
          <div className="mt-3 text-center">
            <span className="text-sm text-textdim bg-green-100/10 px-3 py-1 rounded-full">
              ⚡ استجابة فورية - خدمة 24/7
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
