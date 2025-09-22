import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
    bg-[color:var(--surface)] text-[color:var(--text)]
    border-[color:var(--borderc)] focus:border-primary focus:ring-2 focus:ring-primary/20
    placeholder:text-[color:var(--textdim)]
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
    ${leftIcon ? 'pl-12' : ''}
    ${rightIcon ? 'pr-12' : ''}
    ${className}
  `

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[color:var(--text)]">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[color:var(--textdim)]">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--textdim)]">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-[color:var(--textdim)]">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
