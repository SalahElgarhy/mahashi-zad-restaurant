/**
 * أداة لإنشاء hash جديد لكلمة المرور
 * Password Hash Generator Tool
 */

import { createPasswordHash } from './src/utils/auth.js'

// دالة لإنشاء hash لكلمة مرور جديدة
const generateNewPasswordHash = async (newPassword) => {
  console.log(`إنشاء hash لكلمة المرور: ${newPassword}`)
  
  const hash = await createPasswordHash(newPassword)
  
  if (hash) {
    console.log('✅ تم إنشاء الـ hash بنجاح:')
    console.log(`PASSWORD_HASH: '${hash}'`)
    console.log('\n📝 للاستخدام:')
    console.log(`1. انسخ الـ hash أعلاه`)
    console.log(`2. ضعه في ملف src/config/security.js`)
    console.log(`3. غير قيمة PASSWORD_HASH`)
  } else {
    console.log('❌ فشل في إنشاء الـ hash')
  }
}

// مثال على الاستخدام:
// غير كلمة المرور هنا ↓
const newPassword = 'Mo2020#'
generateNewPasswordHash(newPassword)

// أمثلة أخرى:
// generateNewPasswordHash('admin123')
// generateNewPasswordHash('mahashi2025')
// generateNewPasswordHash('MySecurePassword!')

export { generateNewPasswordHash }
