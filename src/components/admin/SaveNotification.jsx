import { useState, useEffect } from 'react'

export default function SaveNotification({ show, message, type = 'success' }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!isVisible) return null

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500'

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideInRight`}>
      <div className="flex items-center gap-2">
        <span>{type === 'success' ? '✅' : '❌'}</span>
        <span>{message}</span>
      </div>
    </div>
  )
}
