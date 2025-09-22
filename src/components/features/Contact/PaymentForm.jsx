import { useState } from 'react'

/**
 * Payment Form Component - مكون نموذج الدفع
 */
export default function PaymentForm({ 
  totalAmount, 
  onPaymentSubmit, 
  isProcessing,
  selectedPaymentMethod,
  onPaymentMethodChange 
}) {
  const [paymentData, setPaymentData] = useState({
    // بيانات فودافون كاش
    vodafone_phone: '',
    
    // بيانات InstaPay
    instapay_account: '',
    
    // بيانات البطاقة البنكية
    card_number: '',
    card_holder: '',
    expiry_date: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPaymentData(prev => ({ ...prev, [name]: value }))
    
    // إزالة الخطأ عند التعديل
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validatePaymentData = () => {
    const newErrors = {}

    if (selectedPaymentMethod === 'vodafone') {
      if (!paymentData.vodafone_phone) {
        newErrors.vodafone_phone = 'رقم فودافون مطلوب'
      } else if (!/^01[0125]\d{8}$/.test(paymentData.vodafone_phone)) {
        newErrors.vodafone_phone = 'رقم فودافون غير صحيح'
      }
    }

    if (selectedPaymentMethod === 'instapay') {
      if (!paymentData.instapay_account) {
        newErrors.instapay_account = 'حساب InstaPay مطلوب'
      }
    }

    if (selectedPaymentMethod === 'bank') {
      if (!paymentData.card_number) {
        newErrors.card_number = 'رقم البطاقة مطلوب'
      } else if (!/^\d{16}$/.test(paymentData.card_number.replace(/\s/g, ''))) {
        newErrors.card_number = 'رقم البطاقة يجب أن يكون 16 رقم'
      }

      if (!paymentData.card_holder) {
        newErrors.card_holder = 'اسم حامل البطاقة مطلوب'
      }

      if (!paymentData.expiry_date) {
        newErrors.expiry_date = 'تاريخ انتهاء البطاقة مطلوب'
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiry_date)) {
        newErrors.expiry_date = 'صيغة التاريخ يجب أن تكون MM/YY'
      }

      if (!paymentData.cvv) {
        newErrors.cvv = 'CVV مطلوب'
      } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
        newErrors.cvv = 'CVV يجب أن يكون 3 أو 4 أرقام'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (selectedPaymentMethod === 'cash') {
      onPaymentSubmit({ payment_method: 'cash' })
      return
    }

    if (!validatePaymentData()) {
      return
    }

    const paymentInfo = {
      payment_method: selectedPaymentMethod,
      payment_data: paymentData
    }

    onPaymentSubmit(paymentInfo)
  }

  const formatCardNumber = (value) => {
    // إزالة كل شيء عدا الأرقام
    const numbers = value.replace(/\D/g, '')
    // إضافة مسافات كل 4 أرقام
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiryDate = (value) => {
    // إزالة كل شيء عدا الأرقام
    const numbers = value.replace(/\D/g, '')
    // إضافة / بعد الشهر
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4)
    }
    return numbers
  }

  const getPaymentMethodIcon = (method) => {
    const icons = {
      cash: '💵',
      vodafone: '📱',
      instapay: '💳',
      bank: '🏦'
    }
    return icons[method] || '💰'
  }

  const getPaymentInstructions = () => {
    switch (selectedPaymentMethod) {
      case 'cash':
        return {
          title: 'الدفع عند الاستلام',
          instructions: [
            'ستقوم بدفع المبلغ عند وصول الطلب',
            'تأكد من وجود المبلغ كاملاً',
            'المبلغ المطلوب: ' + totalAmount + ' جنيه'
          ]
        }
      
      case 'vodafone':
        return {
          title: 'الدفع عبر فودافون كاش',
          instructions: [
            'اتصل *9# من هاتفك فودافون',
            'اختر "تحويل فلوس" ← "لرقم فودافون كاش"',
            'ادخل رقم المحفظة التجارية الذي سيظهر لك',
            'ادخل المبلغ: ' + totalAmount + ' جنيه',
            'ادخل الرمز المرجعي الذي سيتم إرساله لك'
          ]
        }
      
      case 'instapay':
        return {
          title: 'الدفع عبر InstaPay',
          instructions: [
            'افتح تطبيق InstaPay',
            'اختر "تحويل فلوس"',
            'ادخل حساب المطعم الذي سيظهر لك',
            'ادخل المبلغ: ' + totalAmount + ' جنيه',
            'ادخل الرمز المرجعي'
          ]
        }
      
      case 'bank':
        return {
          title: 'الدفع بالبطاقة البنكية',
          instructions: [
            'ادخل بيانات البطاقة بدقة',
            'تأكد من صحة تاريخ انتهاء البطاقة',
            'ادخل رمز CVV من خلف البطاقة',
            'سيتم خصم المبلغ: ' + totalAmount + ' جنيه'
          ]
        }
      
      default:
        return { title: '', instructions: [] }
    }
  }

  const instructions = getPaymentInstructions()

  return (
    <div style={{
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#f8fafc',
      marginTop: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#1e293b'
      }}>
        💰 تفاصيل الدفع
      </div>

      {/* Payment Method Selection */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>طريقة الدفع</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {[
            { value: 'cash', label: 'الدفع عند الاستلام 💵' },
            { value: 'vodafone', label: 'فودافون كاش 📱' },
            { value: 'instapay', label: 'InstaPay 💳' },
            { value: 'bank', label: 'بطاقة بنكية 🏦' }
          ].map(method => (
            <label 
              key={method.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 15px',
                border: selectedPaymentMethod === method.value ? '2px solid #059669' : '2px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: selectedPaymentMethod === method.value ? '#dcfce7' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <input 
                type="radio" 
                name="paymentMethod" 
                value={method.value}
                checked={selectedPaymentMethod === method.value}
                onChange={onPaymentMethodChange}
                style={{ marginRight: '5px' }}
              />
              {method.label}
            </label>
          ))}
        </div>
      </div>

      {/* Payment Instructions */}
      {instructions.title && (
        <div style={{
          backgroundColor: '#dbeafe',
          border: '1px solid #93c5fd',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ fontWeight: 'bold', color: '#1d4ed8', marginBottom: '8px' }}>
            {getPaymentMethodIcon(selectedPaymentMethod)} {instructions.title}
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#1e40af' }}>
            {instructions.instructions.map((instruction, index) => (
              <li key={index} style={{ marginBottom: '4px' }}>{instruction}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Payment Form Fields */}
      <form onSubmit={handleSubmit}>
        {selectedPaymentMethod === 'vodafone' && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              رقم فودافون كاش
            </label>
            <input
              type="tel"
              name="vodafone_phone"
              value={paymentData.vodafone_phone}
              onChange={handleInputChange}
              placeholder="01xxxxxxxxx"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.vodafone_phone ? '2px solid #ef4444' : '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            {errors.vodafone_phone && (
              <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
                {errors.vodafone_phone}
              </div>
            )}
          </div>
        )}

        {selectedPaymentMethod === 'instapay' && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              حساب InstaPay
            </label>
            <input
              type="text"
              name="instapay_account"
              value={paymentData.instapay_account}
              onChange={handleInputChange}
              placeholder="@username أو رقم الموبايل"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.instapay_account ? '2px solid #ef4444' : '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            {errors.instapay_account && (
              <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
                {errors.instapay_account}
              </div>
            )}
          </div>
        )}

        {selectedPaymentMethod === 'bank' && (
          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                رقم البطاقة
              </label>
              <input
                type="text"
                name="card_number"
                value={formatCardNumber(paymentData.card_number)}
                onChange={(e) => handleInputChange({
                  target: { 
                    name: 'card_number', 
                    value: e.target.value.replace(/\s/g, '') 
                  }
                })}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.card_number ? '2px solid #ef4444' : '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              {errors.card_number && (
                <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
                  {errors.card_number}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                اسم حامل البطاقة
              </label>
              <input
                type="text"
                name="card_holder"
                value={paymentData.card_holder}
                onChange={handleInputChange}
                placeholder="الاسم كما هو مكتوب على البطاقة"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: errors.card_holder ? '2px solid #ef4444' : '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              {errors.card_holder && (
                <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
                  {errors.card_holder}
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  تاريخ انتهاء البطاقة
                </label>
                <input
                  type="text"
                  name="expiry_date"
                  value={formatExpiryDate(paymentData.expiry_date)}
                  onChange={(e) => handleInputChange({
                    target: { 
                      name: 'expiry_date', 
                      value: e.target.value.replace(/\D/g, '') 
                    }
                  })}
                  placeholder="MM/YY"
                  maxLength="5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.expiry_date ? '2px solid #ef4444' : '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
                {errors.expiry_date && (
                  <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
                    {errors.expiry_date}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: errors.cvv ? '2px solid #ef4444' : '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
                {errors.cvv && (
                  <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '5px' }}>
                    {errors.cvv}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Total Amount Display */}
        <div style={{
          backgroundColor: '#dcfce7',
          border: '2px solid #16a34a',
          borderRadius: '8px',
          padding: '15px',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#15803d' }}>
            المبلغ الإجمالي: {totalAmount} جنيه
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: isProcessing ? '#9ca3af' : '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            marginTop: '20px',
            transition: 'background-color 0.2s'
          }}
        >
          {isProcessing ? (
            <>⏳ جاري المعالجة...</>
          ) : (
            <>💰 تأكيد الدفع</>
          )}
        </button>
      </form>
    </div>
  )
}