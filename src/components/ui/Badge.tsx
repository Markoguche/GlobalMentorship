import { cn } from '../../lib/utils'

interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', size = 'md', children, className }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-accent-emerald/10 text-accent-emerald',
    warning: 'bg-amber-500/10 text-amber-500'
  }
  
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1'
  }

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </span>
  )
}