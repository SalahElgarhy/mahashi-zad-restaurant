// ملف ربط موحد بين الفرونت والباك اند
const API_BASE = 'http://localhost:3000/api';

// --- MENU ---
export async function getMenu() {
  const res = await fetch(`${API_BASE}/menu`);
  if (!res.ok) throw new Error('فشل في جلب القائمة');
  return res.json();
}

export async function addMenuItem(item) {
  const res = await fetch(`${API_BASE}/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('فشل في إضافة عنصر');
  return res.json();
}

export async function updateMenuItem(id, item) {
  const res = await fetch(`${API_BASE}/menu/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('فشل في تعديل العنصر');
  return res.json();
}

export async function deleteMenuItem(id) {
  const res = await fetch(`${API_BASE}/menu/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('فشل في حذف العنصر');
  return res.json();
}

// --- OFFERS ---
export async function getOffers() {
  const res = await fetch(`${API_BASE}/offers`);
  if (!res.ok) throw new Error('فشل في جلب العروض');
  return res.json();
}

export async function addOffer(offer) {
  const res = await fetch(`${API_BASE}/offers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offer)
  });
  if (!res.ok) throw new Error('فشل في إضافة عرض');
  return res.json();
}

export async function updateOffer(id, offer) {
  const res = await fetch(`${API_BASE}/offers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offer)
  });
  if (!res.ok) throw new Error('فشل في تعديل العرض');
  return res.json();
}

export async function deleteOffer(id) {
  const res = await fetch(`${API_BASE}/offers/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('فشل في حذف العرض');
  return res.json();
}

// --- ORDERS ---
export async function getOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error('فشل في جلب الطلبات');
  return res.json();
}

export async function addOrder(order) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  if (!res.ok) throw new Error('فشل في إضافة طلب');
  return res.json();
}

export async function updateOrder(id, order) {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  if (!res.ok) throw new Error('فشل في تعديل الطلب');
  return res.json();
}

export async function deleteOrder(id) {
  const res = await fetch(`${API_BASE}/orders/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('فشل في حذف الطلب');
  return res.json();
}
