import { cn } from '@/lib/utils'
import React from 'react'

const H3 = ({ text, className, ...rest }) => {
  return (
    <h3 className={cn("text-2xl font-normal text-text-1", className)} {...rest}>{text}</h3>
  )
}

const H4 = ({ text, className, ...rest }) => {
  return (
    <h4 className={cn("text-lg font-normal text-text-4", className)} {...rest}>{text}</h4>
  )
}

const P = ({ text, className, ...rest }) => {
  return (
    <p className={cn("text-base font-normal text-text-4", className)} {...rest}>{text}</p>
  )
}

export { H3, H4, P }