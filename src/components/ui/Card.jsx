import { forwardRef } from 'react'

const Card = forwardRef(({ 
  children, 
  className = '',
  variant = 'default',
  hover = false,
  ...props 
}, ref) => {
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-200'
  
  const variants = {
    default: 'bg-[color:var(--surface)] border border-[color:var(--borderc)]',
    elevated: 'bg-[color:var(--surface)] shadow-lg border border-[color:var(--borderc)]',
    outlined: 'border-2 border-[color:var(--borderc)] bg-transparent',
    filled: 'bg-[color:var(--card)] border border-[color:var(--borderc)]'
  }
  
  const hoverEffect = hover ? 'hover:shadow-lg hover:border-primary/50 hover:scale-[1.02]' : ''
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverEffect} ${className}`
  
  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  )
})

Card.displayName = 'Card'

// Sub-components
const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-[color:var(--borderc)] ${className}`}>
    {children}
  </div>
)

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
)

const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 border-t border-[color:var(--borderc)] ${className}`}>
    {children}
  </div>
)

Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
