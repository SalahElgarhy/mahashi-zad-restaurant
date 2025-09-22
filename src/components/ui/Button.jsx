import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className = '', 
  disabled = false,
  isLoading = false,
  icon,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary text-[#0b100d] hover:bg-primary/90 active:scale-95 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-text hover:bg-secondary/90 active:scale-95',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-[#0b100d] active:scale-95',
    ghost: 'text-primary hover:bg-primary/10 active:scale-95',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95'
  }
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button 
      ref={ref}
      className={classes} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
          <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
        </svg>
      ) : icon && (
        <span className="w-4 h-4">{icon}</span>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
