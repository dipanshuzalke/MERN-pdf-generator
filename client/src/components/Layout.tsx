import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout ({ children }: LayoutProps) {
  return (
    <main className='container mx-auto px-4 py-8 bg-[#18181b]'>{children}</main>
  )
}
