import { useState, useEffect } from 'react'
import { MENU_GROUPS, OFFERS, BEVERAGES } from '../constants/menuData'
import { verifyPassword, isValidLoginTime, saveAdminSession, isValidSession, clearAdminSession } from '../utils/auth'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'
import MenuEditor from '../components/admin/MenuEditor'
import OrdersManager from '../components/admin/OrdersManager'
import SaveNotification from '../components/admin/SaveNotification'
import { Button, Card, Input } from '../components/ui'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('menu')
  const [menuItems, setMenuItems] = useState(MENU_GROUPS)
  const [offers, setOffers] = useState(OFFERS)
  const [beverages, setBeverages] = useState(BEVERAGES)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showAddOfferForm, setShowAddOfferForm] = useState(false)
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    originalPrice: '',
    discountPrice: '',
    discount: '',
    image: null
  })

  // Load saved data on component mount
  useEffect(() => {
    // التحقق من صلاحية الجلسة عند تحميل الصفحة
    if (isValidSession()) {
      setIsAuthenticated(true)
    } else {
      clearAdminSession()
    }
    
    const savedData = localStorage.getItem('mahashi-admin-data')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setMenuItems(data.menuItems || MENU_GROUPS)
        setOffers(data.offers || OFFERS)
        setBeverages(data.beverages || BEVERAGES)
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  // Mark changes as unsaved when data changes
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [menuItems, offers, beverages])

  // مراقبة إغلاق الصفحة أو الخروج منها
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // حذف الجلسة فقط عند إغلاق الصفحة نهائيًا (ليس عند تغيير التبويب)
      clearAdminSession()
      
      // تحذير المستخدم إذا كانت هناك تغييرات غير محفوظة
      if (hasUnsavedChanges) {
        const message = 'لديك تغييرات غير محفوظة. هل أنت متأكد من الخروج؟'
        event.returnValue = message
        return message
      }
    }

    // إضافة مراقب إغلاق الصفحة فقط (إزالة مراقب تغيير التبويب)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // تنظيف المراقب عند unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      // حذف الجلسة فقط عند إغلاق المكون نهائيًا
      clearAdminSession()
    }
  }, [hasUnsavedChanges])

  // مراقبة انتهاء صلاحية الجلسة
  useEffect(() => {
    if (!isAuthenticated) return

    const sessionCheckInterval = setInterval(() => {
      if (!isValidSession()) {
        setIsAuthenticated(false)
        clearAdminSession()
        showSaveNotification('انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى')
      }
    }, 60000) // كل دقيقة

    return () => clearInterval(sessionCheckInterval)
  }, [isAuthenticated])

  const showSaveNotification = (message) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  // Manual save function
  const handleManualSave = () => {
    const data = { menuItems, offers, beverages, lastUpdated: new Date().toISOString() }
    localStorage.setItem('mahashi-admin-data', JSON.stringify(data))
    setHasUnsavedChanges(false)
    showSaveNotification('تم حفظ جميع التغييرات بنجاح!')
  }

  const handleLogin = async () => {
    // التحقق من وقت الدخول
    if (!isValidLoginTime()) {
      alert('غير مسموح بالدخول في هذا الوقت! يمكن الدخول من 6 صباحاً إلى 11 مساءً')
      return
    }

    // التحقق من كلمة المرور المشفرة
    const isValid = await verifyPassword(password)
    if (isValid) {
      setIsAuthenticated(true)
      saveAdminSession()
      showSaveNotification('تم تسجيل الدخول بنجاح')
    } else {
      alert('كلمة مرور خاطئة!')
      setPassword('')
    }
  }

  // Save offers to localStorage
  const saveOffersToDatabase = async (offersData) => {
    try {
      // حفظ في localStorage
      localStorage.setItem('mahashi-offers-data', JSON.stringify(offersData))
      console.log('✅ تم حفظ العروض في localStorage:', offersData)
      showSaveNotification('✅ تم حفظ العروض بنجاح!')
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error('❌ خطأ في حفظ العروض:', error)
      alert('حدث خطأ في حفظ العروض: ' + error.message)
    }
  }

  const updateOfferPrice = async (offerIndex, field, value) => {
    const newOffers = [...offers]
    newOffers[offerIndex][field] = value
    setOffers(newOffers)
    
    // Save to database
    await saveOffersToDatabase(newOffers)
  }

  const handleOfferImageChange = async (e, offerIndex) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = async () => {
      const newOffers = [...offers]
      newOffers[offerIndex].image = reader.result
      setOffers(newOffers)
      
      // Save to database
      await saveOffersToDatabase(newOffers)
    }
    reader.readAsDataURL(file)
  }

  const handleNewOfferImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setNewOffer({ ...newOffer, image: reader.result })
    }
    reader.readAsDataURL(file)
  }

  const addNewOffer = async () => {
    if (!newOffer.title || !newOffer.originalPrice || !newOffer.discountPrice) {
      alert('يرجى ملء العنوان والسعر الأصلي وسعر الخصم على الأقل')
      return
    }

    const newOffers = [...offers, { ...newOffer }]
    setOffers(newOffers)
    
    // Save to database
    await saveOffersToDatabase(newOffers)
    
    setNewOffer({
      title: '',
      description: '',
      originalPrice: '',
      discountPrice: '',
      discount: '',
      image: null
    })
    setShowAddOfferForm(false)
    showSaveNotification('تم إضافة العرض الجديد بنجاح!')
  }

  const deleteOffer = async (offerIndex) => {
    if (confirm('هل أنت متأكد من حذف هذا العرض؟')) {
      const newOffers = [...offers]
      newOffers.splice(offerIndex, 1)
      setOffers(newOffers)
      
      // Save to database
      await saveOffersToDatabase(newOffers)
      
      showSaveNotification('تم حذف العرض بنجاح!')
    }
  }

  const updateBeveragePrice = (categoryIndex, itemIndex, newPrice) => {
    const newBeverages = [...beverages]
    newBeverages[categoryIndex].items[itemIndex].price = newPrice
    setBeverages(newBeverages)
    setHasUnsavedChanges(true)
  }

  const saveBeveragesToDatabase = async () => {
    try {
      // حفظ في localStorage كـ backup
      localStorage.setItem('mahashi-beverages-data', JSON.stringify(beverages))
      
      // إرسال للـ API
      for (const category of beverages) {
        for (const item of category.items) {
          const itemData = {
            name: item.name,
            price: parseFloat(item.price.replace(/[^\d.]/g, '')) || 0,
            description: item.description || '',
            category: category.title
          }
          
          try {
            const response = await fetch('http://localhost:3000/api/menu', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(itemData)
            })
            
            if (!response.ok) {
              console.warn(`Failed to save ${item.name}:`, response.statusText)
            }
          } catch (error) {
            console.warn(`Error saving ${item.name}:`, error)
          }
        }
      }
      
      setHasUnsavedChanges(false)
      showSaveNotification('✅ تم حفظ أسعار المشروبات بنجاح!')
      console.log('✅ Beverages saved successfully')
      
    } catch (error) {
      console.error('❌ Error saving beverages:', error)
      showSaveNotification('❌ فشل في حفظ المشروبات')
    }
  }

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      const confirmLogout = confirm('لديك تغييرات غير محفوظة. هل تريد حفظها قبل تسجيل الخروج؟')
      if (confirmLogout) {
        handleManualSave()
      }
    }
    
    setIsAuthenticated(false)
    clearAdminSession()
    setPassword('')
    showSaveNotification('تم تسجيل الخروج بنجاح')
  }

  const resetToDefault = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات للقيم الافتراضية؟')) {
      setMenuItems(MENU_GROUPS)
      setOffers(OFFERS)
      setBeverages(BEVERAGES)
      localStorage.removeItem('mahashi-admin-data')
      showSaveNotification('تم إعادة تعيين البيانات بنجاح')
    }
  }

  const exportData = () => {
    const data = {
      menuItems,
      offers,
      beverages,
      lastUpdated: new Date().toISOString()
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'menu-data.json'
    link.click()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[color:var(--bg)] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <Card.Header>
            <h1 className="text-2xl font-bold text-center">لوحة التحكم</h1>
            <p className="text-textdim text-center">أدخل كلمة المرور للوصول</p>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button
                variant="primary"
                className="w-full"
                onClick={handleLogin}
              >
                دخول
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg)]">
      <Navigation />
      
      {/* Save Notification */}
      <SaveNotification 
        show={showNotification} 
        message={notificationMessage} 
        type="success" 
      />
      
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-surface to-bg pt-20">
        <div className="max-w-container mx-auto px-5">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">لوحة التحكم</h1>
            <p className="text-textdim">إدارة القائمة والعروض والأسعار</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <Button
              variant="primary"
              onClick={exportData}
            >
              📥 تصدير البيانات
            </Button>
            <Button
              variant="outline"
              onClick={resetToDefault}
              className="text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              🔄 إعادة تعيين
            </Button>
            <Button
              variant="outline"
              onClick={handleManualSave}
              className={`text-green-500 hover:bg-green-500 hover:text-white ${hasUnsavedChanges ? 'animate-pulse border-green-500' : ''}`}
            >
              💾 {hasUnsavedChanges ? 'حفظ التغييرات' : 'حفظ يدوي'}
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-500 hover:bg-red-500 hover:text-white"
            >
              🚪 تسجيل خروج
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={activeTab === 'menu' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('menu')}
            >
              🍽️ القائمة الرئيسية
            </Button>
            <Button
              variant={activeTab === 'offers' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('offers')}
            >
              🎉 العروض الخاصة
            </Button>
            <Button
              variant={activeTab === 'beverages' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('beverages')}
            >
              🥤 المشروبات
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('orders')}
            >
              📋 الطلبات
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="max-w-container mx-auto px-5">
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إدارة القائمة الرئيسية</h2>
              <MenuEditor menuItems={menuItems} onUpdate={setMenuItems} />
            </div>
          )}

          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">إدارة العروض الخاصة</h2>
                <Button
                  variant="primary"
                  onClick={() => setShowAddOfferForm(!showAddOfferForm)}
                >
                  ➕ إضافة عرض جديد
                </Button>
              </div>

              {/* Add New Offer Form */}
              {showAddOfferForm && (
                <Card>
                  <Card.Header>
                    <h3 className="text-xl font-bold">إضافة عرض جديد</h3>
                  </Card.Header>
                  <Card.Content>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">عنوان العرض</label>
                        <Input
                          value={newOffer.title}
                          onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                          placeholder="مثل: عرض الشتاء المميز"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">الوصف</label>
                        <Input
                          value={newOffer.description}
                          onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                          placeholder="وصف العرض"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">السعر الأصلي</label>
                        <Input
                          value={newOffer.originalPrice}
                          onChange={(e) => setNewOffer({ ...newOffer, originalPrice: e.target.value })}
                          placeholder="مثل: 200 ج"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">سعر الخصم</label>
                        <Input
                          value={newOffer.discountPrice}
                          onChange={(e) => setNewOffer({ ...newOffer, discountPrice: e.target.value })}
                          placeholder="مثل: 150 ج"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">نسبة الخصم</label>
                        <Input
                          value={newOffer.discount}
                          onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                          placeholder="مثل: 25% خصم"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">صورة العرض</label>
                        <div className="flex items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleNewOfferImageChange}
                            className="flex-1"
                          />
                          {newOffer.image && (
                            <img 
                              src={newOffer.image} 
                              alt="معاينة العرض الجديد" 
                              className="h-16 w-16 rounded-md object-cover border border-border/20" 
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="primary" onClick={addNewOffer}>
                        ✅ إضافة العرض
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddOfferForm(false)}>
                        ❌ إلغاء
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              )}

              {/* Existing Offers */}
              {offers.map((offer, offerIndex) => (
                <Card key={offerIndex}>
                  <Card.Header>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">{offer.title}</h3>
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => deleteOffer(offerIndex)}
                        className="text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        🗑️ حذف العرض
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Content>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">عنوان العرض</label>
                        <Input
                          value={offer.title}
                          onChange={(e) => updateOfferPrice(offerIndex, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">الوصف</label>
                        <Input
                          value={offer.description}
                          onChange={(e) => updateOfferPrice(offerIndex, 'description', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">السعر الأصلي</label>
                        <Input
                          value={offer.originalPrice}
                          onChange={(e) => updateOfferPrice(offerIndex, 'originalPrice', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">سعر الخصم</label>
                        <Input
                          value={offer.discountPrice}
                          onChange={(e) => updateOfferPrice(offerIndex, 'discountPrice', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">نسبة الخصم</label>
                        <Input
                          value={offer.discount}
                          onChange={(e) => updateOfferPrice(offerIndex, 'discount', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">صورة العرض</label>
                        <div className="flex items-center gap-3">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleOfferImageChange(e, offerIndex)}
                            className="flex-1"
                          />
                          {offer.image && (
                            <img 
                              src={offer.image} 
                              alt={offer.title} 
                              className="h-16 w-16 rounded-md object-cover border border-border/20" 
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'beverages' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">إدارة المشروبات</h2>
                <Button
                  variant="primary"
                  onClick={saveBeveragesToDatabase}
                  disabled={!hasUnsavedChanges}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  <span>💾</span>
                  <span>{hasUnsavedChanges ? 'حفظ التغييرات' : 'محفوظ ✅'}</span>
                </Button>
              </div>
              
              {beverages.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <Card.Header>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </Card.Header>
                  <Card.Content>
                    <div className="grid gap-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                          <div>
                            <span className="font-semibold">{item.name}</span>
                            <p className="text-sm text-textdim">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-textdim">السعر:</span>
                            <Input
                              type="text"
                              value={item.price}
                              onChange={(e) => updateBeveragePrice(categoryIndex, itemIndex, e.target.value)}
                              className="w-28 text-center"
                              placeholder="0 ج"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Content>
                </Card>
              ))}
              
              {hasUnsavedChanges && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                    <span>⚠️</span>
                    <span>لديك تغييرات غير محفوظة. اضغط "حفظ التغييرات" لحفظها في قاعدة البيانات.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <OrdersManager />
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
