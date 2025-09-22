import { useState, useEffect } from 'react'
import { menuImages, placeholderImage } from '../../../utils/images'
import { MENU_GROUPS } from '../../../constants'

export default function MenuAccordion({ onAdd }){
  const [open, setOpen] = useState(-1)
  const [menuData, setMenuData] = useState(MENU_GROUPS)
  
  // تحميل البيانات من localStorage
  useEffect(() => {
    const savedMenu = localStorage.getItem('mahashi-menu-data')
    if (savedMenu) {
      try {
        const parsedMenu = JSON.parse(savedMenu)
        setMenuData(parsedMenu)
        console.log('✅ تم تحميل القائمة المحدثة من الإدارة')
      } catch (error) {
        console.error('❌ خطأ في تحميل القائمة:', error)
        setMenuData(MENU_GROUPS)
      }
    }
  }, [])
  
  const toggleAccordion = (idx) => {
    setOpen(open === idx ? -1 : idx)
  }

  const handleImageError = (e) => {
    e.target.src = placeholderImage
  }
  
  return (
    <div className="grid gap-4" role="tablist" aria-label="قائمة الطعام">
      {menuData.map((g, idx) => (
        <div key={g.title} className="border border-[color:var(--borderc)] rounded-xl overflow-hidden bg-[color:var(--surface)] transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <button
            role="tab"
            aria-expanded={open===idx}
            className="w-full text-start font-bold px-6 py-4 flex items-center justify-between transition-all duration-200 hover:bg-[rgba(31,170,89,0.05)]"
            onClick={() => toggleAccordion(idx)}
          >
            <div className="flex items-center gap-4">
              <img 
                src={menuImages[g.title] || placeholderImage}
                alt={g.title}
                className="w-16 h-16 rounded-lg object-cover border border-[color:var(--borderc)]"
                onError={handleImageError}
              />
              <div>
                <span className="transition-colors duration-200 text-lg">{g.title}</span>
                <p className="text-sm text-textdim mt-1">{g.description}</p>
              </div>
            </div>
            <span className={`transition-all duration-300 ease-in-out transform ${open===idx ? 'rotate-90 text-primary' : 'rotate-0 text-textdim'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </span>
          </button>
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              open === idx 
                ? 'max-h-96 opacity-100 pb-4' 
                : 'max-h-0 opacity-0 pb-0'
            }`}
          >
            <div className="px-6 animate-fadeInUp">
              <ul className="mt-2 grid gap-3">
                {g.items.map((it, itemIdx) => (
                  <li 
                    key={it.name} 
                    className={`transition-all duration-300 ${
                      open === idx ? `delay-[${itemIdx * 100}ms]` : ''
                    }`}
                    style={{
                      animationDelay: open === idx ? `${itemIdx * 100}ms` : '0ms'
                    }}
                  >
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-[rgba(15,20,18,0.5)] hover:bg-[rgba(31,170,89,0.1)] transition-all duration-200">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-lg">{it.name}</span>
                          <strong className="text-accent font-bold text-xl">{it.price}</strong>
                        </div>
                        <p className="text-sm text-textdim">{it.description}</p>
                      </div>
                      <button 
                        type="button" 
                        className="btn btn-outline text-sm transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-[#0b100d] hover:border-primary active:scale-95 flex items-center gap-2 group px-4 py-2" 
                        onClick={() => onAdd && onAdd({ group: g.title, name: it.name, price: it.price })}
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          className="transition-transform duration-200 group-hover:scale-110"
                        >
                          <path d="M3 6h2l3 10h10l3-7H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        اطلب
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


