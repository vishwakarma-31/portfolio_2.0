 
import React from 'react'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`magnetic-btn ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}
