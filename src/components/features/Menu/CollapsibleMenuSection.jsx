import { useState } from 'react'
import MenuAccordion from './MenuAccordion'
import { Button } from '../../ui'

export default function CollapsibleMenuSection({ onAdd }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <section className="py-16">
      <div className="max-w-container mx-auto px-5">
        {/* Menu Toggle Header */}
        <div className="text-center mb-8">
          <Button
            variant="outline"
            size="large"
            className="text-xl px-8 py-4 border-2 border-primary bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary hover:to-accent hover:text-white hover:shadow-xl hover:shadow-primary/25 active:scale-95 transition-all duration-300 transform hover:scale-105 group"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="flex items-center gap-3">
              <span className="text-2xl group-hover:animate-bounce">🍽️</span>
              <span className="font-bold">قائمة الطعام الكاملة</span>
              <span className={`transition-transform duration-300 group-hover:text-white ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </span>
            </span>
          </Button>
          
          <p className="text-textdim mt-3 transition-colors duration-300">
            {isExpanded ? 'اضغط لإخفاء القائمة' : 'اضغط لعرض جميع الأصناف'}
          </p>
        </div>

        {/* Collapsible Menu Content */}
        <div 
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded 
              ? 'max-h-[5000px] opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="animate-fadeIn">
            <MenuAccordion onAdd={onAdd} />
          </div>
        </div>

        {/* Quick Order Suggestion when collapsed */}
        {!isExpanded && (
          <div className="text-center mt-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
              <h3 className="text-xl font-bold mb-3 text-primary">طلب سريع؟</h3>
              <p className="text-textdim mb-4">جرب عروضنا الخاصة أو تصفح قائمة المشروبات</p>
              <div className="flex justify-center gap-3">
                <a 
                  href="tel:0227304080"
                  className="btn btn-primary px-6 py-3 inline-block text-center transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  📞 اتصل الآن للحجز والاستفسار
                </a>
                <Button 
                  variant="outline" 
                  onClick={() => setIsExpanded(true)}
                  className="px-6 py-3 border-2 border-accent bg-gradient-to-r from-accent/10 to-primary/10 hover:from-accent hover:to-primary hover:text-white hover:shadow-lg hover:shadow-accent/25 active:scale-95 transition-all duration-300 transform hover:scale-105 group"
                >
                  <span className="flex items-center gap-2">
                    <span className="group-hover:animate-pulse">📋</span>
                    <span className="font-semibold">عرض القائمة الكاملة</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
