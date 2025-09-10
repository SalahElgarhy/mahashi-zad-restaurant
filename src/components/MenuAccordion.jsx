import { useState } from 'react'

const groups = [
  {
    title: 'محشي ورق عنب بدبس الرمان',
    items: [
      { name: 'صغير 15 قطعة', price: '190 ج' },
      { name: 'متوسط 30 قطعة', price: '270 ج' },
      { name: 'كبير 55 قطعة', price: '500 ج' },
    ],
  },
  {
    title: 'فتة ورق عنب',
    items: [
      { name: 'صغير', price: '170 ج' },
      { name: 'كبير', price: '240 ج' },
    ],
  },
  {
    title: 'محشي ورق عنب بنكهة الليمون',
    items: [
      { name: 'صغير 15 قطعة', price: '190 ج' },
      { name: 'متوسط 30 قطعة', price: '270 ج' },
      { name: 'كبير 55 قطعة', price: '500 ج' },
    ],
  },
  {
    title: 'محشي بطاطس',
    items: [
      { name: 'صغير', price: '130 ج' },
      { name: 'كبير', price: '220 ج' },
    ],
  },
  {
    title: 'محشي بصل',
    items: [
      { name: 'صغير', price: '160 ج' },
      { name: 'كبير', price: '250 ج' },
    ],
  },
  {
    title: 'محشي الكوسا اللبنية',
    items: [
      { name: 'صغير', price: '190 ج' },
      { name: 'كبير', price: '270 ج' },
    ],
  },
  {
    title: 'طبق الضيافة',
    items: [
      { name: 'سعر الطبق', price: '700 ج' },
    ],
  },
]

export default function MenuAccordion({ onAdd }){
  const [open, setOpen] = useState(-1)
  
  const toggleAccordion = (idx) => {
    setOpen(open === idx ? -1 : idx)
  }
  
  return (
    <div className="grid gap-3" role="tablist" aria-label="قائمة الطعام">
      {groups.map((g, idx) => (
        <div key={g.title} className="border border-[color:var(--borderc)] rounded-xl overflow-hidden bg-[color:var(--surface)] transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
          <button
            role="tab"
            aria-expanded={open===idx}
            className="w-full text-start font-bold px-4 py-3 flex items-center justify-between transition-all duration-200 hover:bg-[rgba(31,170,89,0.05)]"
            onClick={() => toggleAccordion(idx)}
          >
            <span className="transition-colors duration-200">{g.title}</span>
            <span className={`transition-all duration-300 ease-in-out transform ${open===idx ? 'rotate-90 text-primary' : 'rotate-0 text-textdim'}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </span>
          </button>
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              open === idx 
                ? 'max-h-96 opacity-100 pb-3' 
                : 'max-h-0 opacity-0 pb-0'
            }`}
          >
            <div className="px-4 animate-fadeInUp">
              <ul className="mt-2 grid gap-2">
                {g.items.map((it, itemIdx) => (
                  <li 
                    key={it.name} 
                    className={`flex items-center gap-3 justify-between transition-all duration-300 ${
                      open === idx ? `delay-[${itemIdx * 100}ms]` : ''
                    }`}
                    style={{
                      animationDelay: open === idx ? `${itemIdx * 100}ms` : '0ms'
                    }}
                  >
                    <div className="flex-1 flex items-center justify-between gap-3 p-3 rounded-lg bg-[rgba(15,20,18,0.5)] hover:bg-[rgba(31,170,89,0.1)] transition-all duration-200">
                      <span className="font-medium">{it.name}</span>
                      <strong className="text-[color:var(--accent)] font-bold">{it.price}</strong>
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-outline text-sm transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-[#0b100d] hover:border-primary active:scale-95 flex items-center gap-1 group" 
                      onClick={() => onAdd && onAdd({ group: g.title, name: it.name, price: it.price })}
                    >
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="transition-transform duration-200 group-hover:scale-110"
                      >
                        <path d="M3 6h2l3 10h10l3-7H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      اطلب
                    </button>
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


