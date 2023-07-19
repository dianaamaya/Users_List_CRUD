'use client'

import { Providers } from '@/redux/provider'
import ThemeProvider from '@/styles/globals/ThemeProvider'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body>
        <Providers>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
