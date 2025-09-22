import { useEffect, useState } from 'react'
import { sanitizeInputLoose, validatePhoneEgypt, normalizePhoneEgypt, hardenExternalLinks } from '../../../utils/security'
import { Button, Input, Card } from '../../ui'

export default function ContactForm({ selectedItems }){
  const [values, setValues] = useState({
    name:'', phone:'', address:'', note:'',
    paymentMethod:'cash', paymentInfo:'',
    cardName:'', cardNumber:'', cardExp:'', cardCvc:''
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(()=>{ hardenExternalLinks() }, [])

  const onChange = (e) => {
    const { id, value } = e.target
    // Preserve spaces while typing, strip only tags/protocols
    let v = sanitizeInputLoose(value)
    if (id==='phone') v = v.replace(/[^\d]/g,'').slice(0,10)
    if (id==='paymentInfo' && values.paymentMethod==='vodafone') v = v.replace(/[^\d]/g,'').slice(0,11)
    if (id==='cardNumber') {
      // Format card number with spaces every 4 digits
      const digits = v.replace(/[^\d]/g,'')
      const groups = digits.match(/.{1,4}/g) || []
      v = groups.join(' ').slice(0,19) // Max 16 digits + 3 spaces = 19 chars
    }
    if (id==='cardCvc') v = v.replace(/[^\d]/g,'').slice(0,4)
    if (id==='cardExp') {
      // Format expiry date as MM/YY automatically
      const digits = v.replace(/[^\d]/g,'')
      if (digits.length <= 2) {
        v = digits
      } else if (digits.length <= 4) {
        v = `${digits.slice(0,2)}/${digits.slice(2,4)}`
      } else {
        v = `${digits.slice(0,2)}/${digits.slice(2,4)}`
      }
    }
    setValues(prev => ({ ...prev, [id]: v }))
    setErrors(prev => ({ ...prev, [id]: '' }))
  }

  const onPaymentChange = (e) => {
    const method = e.target.value
    setValues(prev => ({ ...prev, paymentMethod: method, paymentInfo: '' }))
    setErrors(prev => ({ ...prev, paymentMethod:'', paymentInfo:'' }))
  }

  const validate = () => {
    const e = {}
    if (!values.name) e.name = 'الاسم مطلوب'
    if (!validatePhoneEgypt(values.phone)) e.phone = 'رقم الهاتف مطلوب (أدخل 10 أرقام بعد 1)'
    if (!values.address) e.address = 'العنوان للتسليم مطلوب'
    if (!values.paymentMethod) e.paymentMethod = 'اختر طريقة الدفع'
    // لا نحتاج التحقق من أرقام المحافظ الآن
    // if (values.paymentMethod==='vodafone' && !values.paymentInfo) e.paymentInfo = 'رقم محفظة فودافون كاش مطلوب'
    // if (values.paymentMethod==='instapay' && !values.paymentInfo) e.paymentInfo = 'حساب Instapay مطلوب'
    if (values.paymentMethod==='bank'){
      if (!values.cardName) e.cardName = 'اسم حامل البطاقة مطلوب'
      const cardDigits = values.cardNumber.replace(/\s/g, '') // Remove spaces for validation
      if (!cardDigits || cardDigits.length < 12) e.cardNumber = 'رقم البطاقة غير صحيح'
      if (!/^\d{2}\/\d{2}$/.test(values.cardExp)) e.cardExp = 'صيغة الانتهاء MM/YY مطلوبة'
      if (!/^\d{3,4}$/.test(values.cardCvc)) e.cardCvc = 'رمز الأمان غير صحيح'
    }
    setErrors(e)
    return Object.keys(e).length===0
  }

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'cash':
        return 'الدفع عند الاستلام'
      case 'vodafone':
        return 'فودافون كاش'
      case 'instapay':
        return 'Instapay'
      case 'bank':
        return 'بطاقة بنكية'
      default:
        return method
    }
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    
    const payload = {
      ...values,
      phone: normalizePhoneEgypt(values.phone)
    }

    // تحويل selectedItems إلى صيغة مناسبة للـ API
    const items = selectedItems ? selectedItems.map((item, index) => {
      // تحديد اسم الطبق بناءً على البنية المتاحة
      let itemName = item.name || item.title || `طبق ${index + 1}`
      
      // إذا كان عرض، اجعل الاسم أكثر وصفية
      if (item.group && item.group.includes('عرض')) {
        itemName = `عرض: ${itemName}`
        if (item.items && Array.isArray(item.items)) {
          const itemsList = item.items.map(subItem => subItem.name || subItem.title).join(', ')
          itemName = `${itemName} (${itemsList})`
        }
      }
      
      // تحديد السعر
      let itemPrice = 0
      if (item.price) {
        itemPrice = parseFloat(item.price.toString().replace(/[^\d.]/g, '')) || 0
      } else if (item.discountPrice) {
        itemPrice = parseFloat(item.discountPrice.toString().replace(/[^\d.]/g, '')) || 0
      }
      
      return {
        menu_item_id: index + 1,
        name: itemName,
        unit_price: itemPrice,
        quantity: item.qty || item.quantity || 1,
        group: item.group || 'منيو عام'
      }
    }) : []

    // بيانات الطلب للـ API
    const orderData = {
      customer_name: payload.name,
      customer_phone: payload.phone,
      customer_address: payload.address,
      notes: payload.note || '',
      payment_method: payload.paymentMethod, // إضافة طريقة الدفع
      items: items
    }

    console.log('🚀 Sending order data:', orderData)

    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(orderData)
      })

      console.log('📡 Response status:', response.status)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('📥 Response received:', result)

      if (result.success) {
        // Show success message without blocking alert
        setSuccessMessage(`✅ تم إرسال الطلب بنجاح!\nرقم الطلب: ${result.data.order_number || result.data.id}\nإجمالي المبلغ: ${result.data.total_amount} جنيه\nطريقة الدفع: ${getPaymentMethodText(payload.paymentMethod)}`)
        setTimeout(() => setSuccessMessage(''), 5000) // Clear after 5 seconds
        // مسح الفورم بعد النجاح
        setValues({
          name:'', phone:'', address:'', note:'',
          paymentMethod:'cash', paymentInfo:'',
          cardName:'', cardNumber:'', cardExp:'', cardCvc:''
        })
      } else {
        alert(`❌ خطأ في إرسال الطلب: ${result.message || 'حدث خطأ غير متوقع'}`)
      }
    } catch (error) {
      console.error('❌ Fetch Error:', error)
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('❌ لا يمكن الاتصال بالخادم\nتأكد من تشغيل الباك إند على http://localhost:3000')
      } else if (error.message.includes('CORS')) {
        alert('❌ مشكلة في إعدادات CORS\nتأكد من إعدادات الخادم')
      } else {
        alert(`❌ خطأ في الاتصال: ${error.message}`)
      }
    }
  }

  return (
    <form className="grid md:grid-cols-2 gap-4 bg-[color:var(--surface)] border border-[color:var(--borderc)] rounded-xl p-4" onSubmit={onSubmit} noValidate>
      {/* Success Message */}
      {successMessage && (
        <div className="md:col-span-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <div className="whitespace-pre-line">{successMessage}</div>
        </div>
      )}
      
      {selectedItems && selectedItems.length>0 && (
        <div className="md:col-span-2 text-textdim text-sm">عدد الأصناف في الطلب: {selectedItems.length}</div>
      )}
      <div className="flex flex-col">
        <label htmlFor="name">الاسم</label>
        <input id="name" value={values.name} onChange={onChange} className={`rounded-lg border bg-[#0e1411] px-3 py-2 ${errors.name?'border-red-500':'border-[color:var(--borderc)]'}`} placeholder="اسمك الكامل" />
        <span className="text-red-400 text-xs mt-1 min-h-4">{errors.name}</span>
      </div>
      <div className="flex flex-col relative">
        <label htmlFor="phone">رقم الهاتف</label>
        <span className="absolute start-3 top-1/2 -translate-y-1/2 text-textdim">+20</span>
        <input id="phone" value={values.phone} onChange={onChange} className={`rounded-lg border bg-[#0e1411] ps-10 px-3 py-2 ${errors.phone?'border-red-500':'border-[color:var(--borderc)]'}`} placeholder="1xxxxxxxxx" inputMode="tel" />
        <span className="text-red-400 text-xs mt-1 min-h-4">{errors.phone}</span>
      </div>
      <div className="flex flex-col md:col-span-2">
        <label htmlFor="address">العنوان للتسليم</label>
        <input id="address" value={values.address} onChange={onChange} className={`rounded-lg border bg-[#0e1411] px-3 py-2 ${errors.address?'border-red-500':'border-[color:var(--borderc)]'}`} placeholder="العنوان بالتفصيل (مدينة/شارع/علامة مشهورة)" />
        <span className="text-red-400 text-xs mt-1 min-h-4">{errors.address}</span>
      </div>
      <div className="flex flex-col md:col-span-2">
        <label htmlFor="note">ملاحظات</label>
        <textarea id="note" rows={3} value={values.note} onChange={onChange} className="rounded-lg border border-[color:var(--borderc)] bg-[#0e1411] px-3 py-2" placeholder="أي طلبات خاصة؟" />
      </div>

      <div className="md:col-span-2">
        <div className="font-bold mb-2">طريقة الدفع</div>
        <div className="flex flex-wrap gap-4 items-center mb-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="pay" value="cash" checked={values.paymentMethod==='cash'} onChange={onPaymentChange} /> 
            الدفع عند الاستلام 💵
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="pay" value="vodafone" checked={values.paymentMethod==='vodafone'} onChange={onPaymentChange} /> 
            فودافون كاش 📱
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="pay" value="instapay" checked={values.paymentMethod==='instapay'} onChange={onPaymentChange} /> 
            Instapay 💳
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="pay" value="bank" checked={values.paymentMethod==='bank'} onChange={onPaymentChange} /> 
            حساب بنكي
            <span className="inline-flex items-center gap-1 ms-2 opacity-80">
              <svg width="18" height="12" viewBox="0 0 36 24" aria-hidden="true"><rect width="36" height="24" rx="4" fill="#EB001B"/><circle cx="22" cy="12" r="8" fill="#F79E1B" opacity=".85"/></svg>
              <svg width="18" height="12" viewBox="0 0 36 24" aria-hidden="true"><rect width="36" height="24" rx="4" fill="#1d1f20"/><text x="7" y="16" fontSize="10" fill="#e5c24b">Meeza</text></svg>
            </span>
          </label>
        </div>
        {values.paymentMethod === 'cash' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            <div className="flex items-center gap-2 font-bold mb-1">
              <span className="text-lg">💵</span>
              الدفع عند الاستلام
            </div>
            <p className="text-sm">ستدفع المبلغ نقداً عند وصول الطلب إليك</p>
          </div>
        )}
        
        {values.paymentMethod === 'vodafone' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            <div className="flex items-center gap-2 font-bold mb-2">
              <span className="text-lg">📱</span>
              فودافون كاش
            </div>
            <p className="text-sm mb-2">سيتم إنشاء رابط دفع خاص بك وإرساله عند تأكيد الطلب</p>
            <div className="flex flex-col">
              <label htmlFor="paymentInfo" className="text-sm font-medium mb-1">رقم محفظة فودافون كاش (اختياري)</label>
              <input 
                id="paymentInfo" 
                value={values.paymentInfo} 
                onChange={onChange} 
                className="rounded border border-red-300 bg-white px-2 py-1 text-sm" 
                placeholder="01xxxxxxxxx" 
                maxLength="11"
              />
              <span className="text-xs mt-1 opacity-75">إذا لم تدخل رقم، سنستخدم رقم هاتفك المسجل</span>
            </div>
          </div>
        )}
        
        {values.paymentMethod === 'instapay' && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
            <div className="flex items-center gap-2 font-bold mb-2">
              <span className="text-lg">💳</span>
              Instapay
            </div>
            <p className="text-sm mb-2">سيتم إنشاء رابط دفع Instapay وإرساله عند تأكيد الطلب</p>
            <div className="flex flex-col">
              <label htmlFor="paymentInfo" className="text-sm font-medium mb-1">حساب Instapay (اختياري)</label>
              <input 
                id="paymentInfo" 
                value={values.paymentInfo} 
                onChange={onChange} 
                className="rounded border border-blue-300 bg-white px-2 py-1 text-sm" 
                placeholder="@username أو رقم الهاتف" 
              />
              <span className="text-xs mt-1 opacity-75">إذا لم تدخل حساب، سنستخدم رقم هاتفك المسجل</span>
            </div>
          </div>
        )}

{values.paymentMethod==='bank' && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold mb-3 text-gray-800">
              <span className="text-lg">💳</span>
              الدفع بالبطاقة البنكية
            </div>
            <p className="text-sm text-gray-600 mb-3">سيتم إنشاء رابط دفع آمن لإتمام العملية عبر بوابة الدفع</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label htmlFor="cardName" className="text-sm font-bold mb-2 text-gray-800">اسم صاحب البطاقة</label>
                <input id="cardName" value={values.cardName} onChange={onChange} className={`rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 ${errors.cardName?'border-red-500':'border-gray-300'}`} placeholder="الاسم كما هو مكتوب على البطاقة" />
                <span className="text-red-400 text-xs mt-1 min-h-4">{errors.cardName}</span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="cardNumber" className="text-sm font-bold mb-2 text-gray-800">رقم البطاقة</label>
                <input id="cardNumber" value={values.cardNumber} onChange={onChange} className={`rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 ${errors.cardNumber?'border-red-500':'border-gray-300'}`} placeholder="1234 5678 9012 3456" inputMode="numeric" maxLength="19" />
                <span className="text-red-400 text-xs mt-1 min-h-4">{errors.cardNumber}</span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="cardExp" className="text-sm font-bold mb-2 text-gray-800">تاريخ انتهاء الصلاحية</label>
                <input id="cardExp" value={values.cardExp} onChange={onChange} className={`rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 ${errors.cardExp?'border-red-500':'border-gray-300'}`} placeholder="MM/YY (الشهر/السنة)" maxLength="5" />
                <span className="text-red-400 text-xs mt-1 min-h-4">{errors.cardExp}</span>
              </div>
              <div className="flex flex-col">
                <label htmlFor="cardCvc" className="text-sm font-bold mb-2 text-gray-800">رمز الأمان (CVC/CVV)</label>
                <input id="cardCvc" value={values.cardCvc} onChange={onChange} className={`rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 ${errors.cardCvc?'border-red-500':'border-gray-300'}`} placeholder="123 (3 أو 4 أرقام)" inputMode="numeric" maxLength="4" />
                <span className="text-red-400 text-xs mt-1 min-h-4">{errors.cardCvc}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              🔒 بياناتك محمية بتشفير SSL. لن يتم حفظ بيانات البطاقة على خوادمنا.
            </div>
          </div>
        )}
      </div>
      <div className="md:col-span-2 text-center mt-2">
        <button type="submit" className="btn btn-primary shadow">إرسال</button>
      </div>
    </form>
  )
}




