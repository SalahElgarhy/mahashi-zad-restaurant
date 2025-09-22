import React, { useState, useEffect } from 'react'
import { BEVERAGES } from '../../../constants'
import { Card } from '../../ui'
import { io } from 'socket.io-client'

export default function BeverageSection({ onAdd }) {
  const [beverages, setBeverages] = useState(BEVERAGES) // بدء بالبيانات الثابتة
  const [loading, setLoading] = useState(false)

  // جلب المشروبات من الـ API كتحديث
  const fetchBeverages = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/menu')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      if (result.success && result.data) {
        // فلترة المشروبات فقط
        const beverageCategories = result.data.filter(category => 
          category.title.includes('مشروب') || 
          category.title.includes('غاز') ||
          category.title.toLowerCase().includes('beverage') ||
          category.title.toLowerCase().includes('drink')
        )
        
        // إذا لقينا مشروبات من الـ API، استخدمها
        if (beverageCategories.length > 0) {
          setBeverages(beverageCategories)
          console.log('✅ تم تحديث المشروبات من الـ API')
        }
        // وإلا استخدم البيانات الثابتة (BEVERAGES موجودة بالفعل)
      }
    } catch (err) {
      console.error('Error fetching beverages:', err)
      // في حالة الخطأ، المشروبات الثابتة موجودة بالفعل
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // جلب البيانات في البداية
    fetchBeverages()

    // إعداد Socket.IO للتحديثات المباشرة
    let socket
    
    try {
      socket = io('http://localhost:3000', {
        transports: ['websocket', 'polling']
      })
      
      socket.on('connect', () => {
        console.log('🔌 Socket.IO متصل لتحديثات المشروبات')
      })
      
      // الاستماع لتحديثات المنيو
      socket.on('menuUpdated', (updatedMenu) => {
        console.log('🔄 تم استقبال تحديث المنيو من Socket.IO')
        
        // فلترة المشروبات من التحديث الجديد
        const beverageCategories = updatedMenu.filter(category => 
          category.title.includes('مشروب') || 
          category.title.includes('غاز') ||
          category.title.toLowerCase().includes('beverage') ||
          category.title.toLowerCase().includes('drink')
        )
        
        if (beverageCategories.length > 0) {
          setBeverages(beverageCategories)
          console.log('✅ تم تحديث المشروبات من Socket.IO')
        }
      })

      // للتحديثات من localStorage أيضاً (backup)
      const checkLocalStorage = () => {
        try {
          const savedBeverages = localStorage.getItem('mahashi-beverages-data')
          if (savedBeverages) {
            const parsedBeverages = JSON.parse(savedBeverages)
            setBeverages(parsedBeverages)
            console.log('🔄 تم تحديث المشروبات من localStorage')
          }
        } catch (error) {
          console.error('خطأ في قراءة localStorage:', error)
        }
      }

      // فحص localStorage كل 2 ثانية
      const storageInterval = setInterval(checkLocalStorage, 2000)

      socket.on('disconnect', () => {
        console.log('❌ Socket.IO منقطع')
      })

      // تنظيف الاتصال عند إلغاء المكون
      return () => {
        clearInterval(storageInterval)
        if (socket) {
          socket.disconnect()
        }
      }
    } catch (error) {
      console.error('خطأ في Socket.IO:', error)
      
      // Fallback: فحص localStorage فقط
      const storageInterval = setInterval(() => {
        try {
          const savedBeverages = localStorage.getItem('mahashi-beverages-data')
          if (savedBeverages) {
            const parsedBeverages = JSON.parse(savedBeverages)
            setBeverages(parsedBeverages)
            console.log('🔄 تم تحديث المشروبات من localStorage (fallback)')
          }
        } catch (error) {
          console.error('خطأ في localStorage:', error)
        }
      }, 2000)

      return () => {
        clearInterval(storageInterval)
      }
    }
  }, [])

  // ربط أسماء المشروبات بالصور
  const getImagePath = (itemName) => {
    const imageMap = {
      'Pepsi': '/images/pepsi.jpg',
      '7UP': '/images/7UP.jpg',
      'V COLA': '/images/V cola.jpeg'
    }
    return imageMap[itemName] || '/images/default-drink.jpg'
  }

  // إذا البيانات لسه بتتحمل وملاش بيانات
  if (loading && beverages.length === 0) {
    return (
      <section className="py-8 mt-8 border-t border-[color:var(--borderc)]">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-textdim">جاري تحميل المشروبات...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 mt-8 border-t border-[color:var(--borderc)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-primary">المشروبات</h2>
            <button
              onClick={fetchBeverages}
              className="bg-primary hover:bg-primary/80 text-black px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-1"
              title="تحديث أسعار المشروبات"
            >
              🔄 تحديث
            </button>
          </div>
          <p className="text-textdim">مشروبات منعشة لتكمل وجبتك</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {beverages.map((category) => (
            <Card key={category.title} className="mb-6" variant="elevated">
              <Card.Header>
                <div className="flex items-center gap-4">
                  {/* أيقونة القسم بصورة بيبسي */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center overflow-hidden border-2 border-blue-400/30">
                    <img 
                      src="/images/pepsi.jpg"
                      alt="المشروبات الغازية"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                      <span className="text-3xl">🥤</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-accent">{category.title}</h3>
                    <p className="text-sm text-textdim">{category.description}</p>
                  </div>
                </div>
              </Card.Header>
              
              <Card.Content>
                <div className="grid md:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <div 
                      key={item.name}
                      className="flex items-center justify-between p-4 rounded-lg bg-[rgba(15,20,18,0.5)] hover:bg-[rgba(31,170,89,0.1)] transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          {/* صورة المشروب مكبرة */}
                          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg">
                            <img 
                              src={getImagePath(item.name)}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center" style={{display: 'none'}}>
                              <span className="text-2xl">🥤</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-xl">{item.name}</span>
                            <p className="text-sm text-textdim">{item.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <strong className="text-accent font-bold text-xl">{item.price}</strong>
                        <button 
                          type="button" 
                          className="btn btn-outline transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-[#0b100d] hover:border-primary active:scale-95 flex items-center gap-2 group px-4 py-3" 
                          onClick={() => onAdd && onAdd({ group: category.title, name: item.name, price: item.price })}
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
                          <span className="font-semibold">اطلب</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
