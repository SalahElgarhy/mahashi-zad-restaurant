export default function CartSummary({ items, onInc, onDec, onClear }){
  const parsePrice = (p)=> Number((p||'').replace(/[^\d.]/g,'')) || 0
  const total = items.reduce((s,i)=> s + parsePrice(i.price)*i.qty, 0)
  return (
    <div className="mt-4 border border-[color:var(--borderc)] rounded-xl p-4 bg-[color:var(--surface)] transition-all duration-300 hover:border-primary/30">
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
        <span className="text-2xl">🛒</span>
        سلة الطلب
      </h3>
      {items.length===0 ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-2">🍽️</div>
          <div className="text-textdim mb-2">السلة فارغة</div>
          <div className="text-sm text-textdim">اختر أصنافك المفضلة من القائمة أعلاه</div>
        </div>
      ) : (
        <>
          <ul className="grid gap-3">
            {items.map((it,idx)=> (
              <li key={idx} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[rgba(15,20,18,0.3)] hover:bg-[rgba(31,170,89,0.05)] transition-all duration-200">
                <div className="flex-1">
                  <div className="font-bold text-sm">{it.group}</div>
                  <div className="text-xs text-textdim">{it.name}</div>
                </div>
                <div className="text-[color:var(--accent)] whitespace-nowrap font-bold">{it.price}</div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    className="btn btn-outline text-sm w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-red-500 hover:border-red-500 hover:text-white" 
                    onClick={()=> onDec(idx)}
                  >
                    −
                  </button>
                  <div className="w-8 text-center font-bold">{it.qty}</div>
                  <button 
                    type="button" 
                    className="btn btn-outline text-sm w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-primary hover:border-primary hover:text-[#0b100d]" 
                    onClick={()=> onInc(idx)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-[color:var(--borderc)] flex items-center justify-between">
            <div className="font-extrabold text-lg">
              الإجمالي: <span className="text-[color:var(--accent)]">{total} ج</span>
            </div>
            <button 
              type="button" 
              className="btn btn-outline transition-all duration-200 hover:scale-105 hover:bg-red-500 hover:border-red-500 hover:text-white active:scale-95" 
              onClick={onClear}
            >
              🗑️ حذف السلة
            </button>
          </div>
        </>
      )}
    </div>
  )
}


