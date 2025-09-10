import { useState } from 'react'
import { sanitizeString } from '../utils/security'

export default function PaymentSection(){
  const [method, setMethod] = useState('card')
  const [card, setCard] = useState({ number:'', name:'', exp:'', cvc:'' })
  const [error, setError] = useState('')

  const onChange = (e)=>{
    const { id, value } = e.target
    let v = sanitizeString(value)
    if (id==='number') v = v.replace(/[^\d]/g,'').slice(0,19)
    if (id==='cvc') v = v.replace(/[^\d]/g,'').slice(0,4)
    setCard(prev=>({ ...prev, [id]: v }))
    setError('')
  }

  const onPay = (e)=>{
    e.preventDefault()
    if (method==='card'){
      if (!card.number || !card.name || !card.exp || !card.cvc){
        setError('من فضلك أكمل بيانات البطاقة')
        return
      }
    }
    alert('تم حفظ طلب الدفع (نموذج توضيحي)')
  }

  return (
    <section id="payment" className="py-16">
      <div className="max-w-container mx-auto px-5">
        <h2 className="text-2xl font-bold mb-2">الدفع</h2>
        <p className="text-textdim mb-4">نقدًأ عند الاستلام أو بالبطاقة أونلاين (نموذج توضيحي)</p>
        <form className="grid gap-4 bg-[color:var(--surface)] border border-[color:var(--borderc)] rounded-xl p-4" onSubmit={onPay} noValidate>
          <div className="flex gap-3">
            <label className="flex items-center gap-2"><input type="radio" name="method" value="card" checked={method==='card'} onChange={()=>setMethod('card')} /> بطاقة بنكية</label>
            <label className="flex items-center gap-2"><input type="radio" name="method" value="cod" checked={method==='cod'} onChange={()=>setMethod('cod')} /> نقدًا عند الاستلام</label>
          </div>
          {method==='card' && (
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex flex-col"><label htmlFor="number">رقم البطاقة</label><input id="number" value={card.number} onChange={onChange} className="rounded-lg border border-[color:var(--borderc)] bg-[#0e1411] px-3 py-2" placeholder="1234 5678 9012 3456" inputMode="numeric" /></div>
              <div className="flex flex-col"><label htmlFor="name">اسم حامل البطاقة</label><input id="name" value={card.name} onChange={onChange} className="rounded-lg border border-[color:var(--borderc)] bg-[#0e1411] px-3 py-2" placeholder="الاسم على البطاقة" /></div>
              <div className="flex flex-col"><label htmlFor="exp">تاريخ الانتهاء</label><input id="exp" value={card.exp} onChange={onChange} className="rounded-lg border border-[color:var(--borderc)] bg-[#0e1411] px-3 py-2" placeholder="MM/YY" /></div>
              <div className="flex flex-col"><label htmlFor="cvc">CVC</label><input id="cvc" value={card.cvc} onChange={onChange} className="rounded-lg border border-[color:var(--borderc)] bg-[#0e1411] px-3 py-2" placeholder="***" inputMode="numeric" /></div>
            </div>
          )}
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <div className="text-center"><button type="submit" className="btn btn-primary">تأكيد الدفع</button></div>
        </form>
      </div>
    </section>
  )
}


