import { useState } from 'react'
import { Button, Card, Input } from '../ui'

export default function MenuEditor({ menuItems, onUpdate }) {
  const [editingItem, setEditingItem] = useState(null)
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', image: null })
  const [showAddForm, setShowAddForm] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [editingTitle, setEditingTitle] = useState(null)
  const [saving, setSaving] = useState(false)

  const API_BASE = 'http://localhost:3000/api'

  // حفظ في قاعدة البيانات الحقيقية
  const saveToDatabase = async (itemData, action = 'update', itemId = null) => {
    setSaving(true)
    try {
      let response
      
      if (action === 'update' && itemId) {
        // تحديث عنصر موجود
        response = await fetch(`${API_BASE}/menu/${itemId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData)
        })
      } else if (action === 'create') {
        // إضافة عنصر جديد
        response = await fetch(`${API_BASE}/menu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData)
        })
      } else if (action === 'delete' && itemId) {
        // حذف عنصر
        response = await fetch(`${API_BASE}/menu/${itemId}`, {
          method: 'DELETE'
        })
      }

      if (response && response.ok) {
        const result = await response.json()
        console.log('✅ تم الحفظ في قاعدة البيانات:', result)
        
        // حفظ في localStorage كـ backup
        const menuData = Array.isArray(itemData) ? itemData : [itemData]
        localStorage.setItem('mahashi-menu-data', JSON.stringify(menuData))
        
        return result
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('❌ خطأ في الحفظ:', error)
      
      // Fallback to localStorage if API fails
      const menuData = Array.isArray(itemData) ? itemData : [itemData]
      localStorage.setItem('mahashi-menu-data', JSON.stringify(menuData))
      
      throw error
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateItem = async (groupIndex, itemIndex, field, value) => {
    const newMenuItems = [...menuItems]
    const item = newMenuItems[groupIndex].items[itemIndex]
    const oldValue = item[field]
    
    // Update locally first for immediate UI feedback
    item[field] = value
    onUpdate(newMenuItems)

    try {
      // Prepare data for API
      const itemData = {
        name: item.name,
        price: parseFloat(item.price.replace(/[^\d.]/g, '')) || 0, // Extract number from price
        description: item.description || '',
        category: newMenuItems[groupIndex].title
      }

      // Save to database - assume each item has an id
      if (item.id) {
        await saveToDatabase(itemData, 'update', item.id)
      } else {
        // If no ID, create new item
        const result = await saveToDatabase(itemData, 'create')
        if (result.data && result.data.id) {
          item.id = result.data.id // Store the new ID
        }
      }
      
      console.log(`✅ تم تحديث ${field} من "${oldValue}" إلى "${value}"`)
    } catch (error) {
      console.error('❌ فشل التحديث:', error)
      // Revert on error
      item[field] = oldValue
      onUpdate(newMenuItems)
      alert('فشل في حفظ التحديث. حاول مرة أخرى.')
    }
  }

  const handleImageChange = (e, groupIndex, itemIndex) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      if (itemIndex !== undefined) {
        // Editing existing item's image
        handleUpdateItem(groupIndex, itemIndex, 'image', reader.result)
      } else {
        // Adding new item's image
        setNewItem({ ...newItem, image: reader.result })
        setImagePreview(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleAddItem = async (groupIndex) => {
    if (!newItem.name || !newItem.price) return
    
    const newMenuItems = [...menuItems]
    newMenuItems[groupIndex].items.push(newItem)
    onUpdate(newMenuItems)
    
    // Save to database
    await saveToDatabase(newMenuItems)
    
    setNewItem({ name: '', price: '', description: '', image: null })
    setShowAddForm(false)
    setImagePreview(null)
  }

  const handleDeleteItem = async (groupIndex, itemIndex) => {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      const newMenuItems = [...menuItems]
      newMenuItems[groupIndex].items.splice(itemIndex, 1)
      onUpdate(newMenuItems)
      
      // Save to database
      await saveToDatabase(newMenuItems)
    }
  }

  const handleUpdateTitle = async (groupIndex, field, value) => {
    const newMenuItems = [...menuItems]
    newMenuItems[groupIndex][field] = value
    onUpdate(newMenuItems)
    
    // Save to database
    await saveToDatabase(newMenuItems)
  }

  return (
    <div className="space-y-6">
      {menuItems.map((group, groupIndex) => (
        <Card key={groupIndex}>
          <Card.Header>
            {editingTitle === groupIndex ? (
              <div className="space-y-2">
                <Input
                  value={group.title}
                  onChange={(e) => handleUpdateTitle(groupIndex, 'title', e.target.value)}
                  className="text-xl font-bold"
                />
                <Input
                  value={group.description}
                  onChange={(e) => handleUpdateTitle(groupIndex, 'description', e.target.value)}
                />
                <Button size="small" onClick={() => setEditingTitle(null)}>✅ حفظ العنوان</Button>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{group.title}</h3>
                  <p className="text-textdim">{group.description}</p>
                </div>
                <div className="flex gap-2">
                   <Button
                    variant="outline"
                    size="small"
                    onClick={() => setEditingTitle(groupIndex)}
                  >
                    ✏️ تعديل العنوان
                  </Button>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => setShowAddForm(showAddForm === groupIndex ? false : groupIndex)}
                  >
                    ➕ إضافة عنصر
                  </Button>
                </div>
              </div>
            )}
          </Card.Header>
          <Card.Content>
            {/* Add New Item Form */}
            {showAddForm === groupIndex && (
              <div className="bg-surface/50 rounded-lg p-4 mb-4 border border-primary/20">
                <h4 className="font-semibold mb-3">إضافة عنصر جديد</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Input
                    placeholder="اسم العنصر"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                  <Input
                    placeholder="السعر (مثل: 150 ج)"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  />
                  <Input
                    placeholder="الوصف"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                      className="flex-1"
                    />
                    {imagePreview && <img src={imagePreview} alt="معاينة" className="h-10 w-10 rounded-md object-cover" />}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => handleAddItem(groupIndex)}
                    disabled={saving}
                  >
                    {saving ? '⏳ حفظ...' : 'إضافة'}
                  </Button>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => setShowAddForm(false)}
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            )}

            {/* Existing Items */}
            <div className="grid gap-4">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border/10">
                  {editingItem === `${groupIndex}-${itemIndex}` ? (
                    <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
                      <Input
                        value={item.name}
                        onChange={(e) => {
                          const newMenuItems = [...menuItems]
                          newMenuItems[groupIndex].items[itemIndex].name = e.target.value
                          onUpdate(newMenuItems)
                        }}
                        placeholder="اسم العنصر"
                      />
                      <Input
                        value={item.price}
                        onChange={(e) => {
                          const newMenuItems = [...menuItems]
                          newMenuItems[groupIndex].items[itemIndex].price = e.target.value
                          onUpdate(newMenuItems)
                        }}
                        placeholder="السعر"
                      />
                      <Input
                        value={item.description}
                        onChange={(e) => {
                          const newMenuItems = [...menuItems]
                          newMenuItems[groupIndex].items[itemIndex].description = e.target.value
                          onUpdate(newMenuItems)
                        }}
                        placeholder="الوصف"
                      />
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, groupIndex, itemIndex)}
                          className="flex-1"
                        />
                        {item.image && <img src={item.image} alt={item.name} className="h-10 w-10 rounded-md object-cover" />}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center gap-4">
                      {item.image && <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover" />}
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{item.name}</span>
                          <span className="font-bold text-accent">{item.price}</span>
                        </div>
                        <p className="text-sm text-textdim mt-1">{item.description}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 ml-4">
                    {editingItem === `${groupIndex}-${itemIndex}` ? (
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          size="small"
                          onClick={async () => {
                            try {
                              const item = menuItems[groupIndex].items[itemIndex]
                              
                              // تحديث جميع الحقول
                              const itemData = {
                                name: item.name,
                                price: parseFloat(item.price.replace(/[^\d.]/g, '')) || 0,
                                description: item.description || '',
                                category: menuItems[groupIndex].title
                              }

                              // حفظ في قاعدة البيانات
                              if (item.id) {
                                await saveToDatabase(itemData, 'update', item.id)
                              } else {
                                const result = await saveToDatabase(itemData, 'create')
                                if (result.data && result.data.id) {
                                  item.id = result.data.id
                                }
                              }
                              
                              console.log('✅ تم الحفظ بنجاح')
                              alert('✅ تم حفظ التعديلات بنجاح!')
                              setEditingItem(null)
                            } catch (error) {
                              console.error('❌ فشل الحفظ:', error)
                              alert('❌ فشل في الحفظ. تأكد من تشغيل السيرفر وحاول مرة أخرى.')
                            }
                          }}
                          disabled={saving}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          {saving ? '⏳ جاري الحفظ...' : '✅ تأكيد الحفظ'}
                        </Button>
                        <Button
                          variant="outline"
                          size="small"
                          onClick={() => setEditingItem(null)}
                          className="border-gray-400 text-gray-600"
                        >
                          ❌ إلغاء
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="small"
                          onClick={() => setEditingItem(`${groupIndex}-${itemIndex}`)}
                        >
                          ✏️ تعديل
                        </Button>
                        <Button
                          variant="outline"
                          size="small"
                          onClick={() => handleDeleteItem(groupIndex, itemIndex)}
                          className="text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          🗑️ حذف
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      ))}
    </div>
  )
}
