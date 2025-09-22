import { useState, useCallback } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])

  const addItem = useCallback((item) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        p => p.group === item.group && p.name === item.name && p.price === item.price
      )
      
      if (existingIndex > -1) {
        const newCart = [...prev]
        newCart[existingIndex] = { 
          ...newCart[existingIndex], 
          qty: newCart[existingIndex].qty + 1 
        }
        return newCart
      }
      
      return [...prev, { ...item, qty: 1 }]
    })
  }, [])

  const incrementItem = useCallback((index) => {
    setCart(prev => 
      prev.map((item, idx) => 
        idx === index ? { ...item, qty: item.qty + 1 } : item
      )
    )
  }, [])

  const decrementItem = useCallback((index) => {
    setCart(prev => 
      prev.flatMap((item, idx) => 
        idx === index 
          ? item.qty > 1 
            ? [{ ...item, qty: item.qty - 1 }] 
            : []
          : [item]
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const removeItem = useCallback((index) => {
    setCart(prev => prev.filter((_, idx) => idx !== index))
  }, [])

  const getTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0
      return total + (price * item.qty)
    }, 0)
  }, [cart])

  const getItemsCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.qty, 0)
  }, [cart])

  return {
    cart,
    addItem,
    incrementItem,
    decrementItem,
    clearCart,
    removeItem,
    getTotal,
    getItemsCount
  }
}
