import './globals.css'
import { Source_Code_Pro } from 'next/font/google'

const sourceCodePro = Source_Code_Pro({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin']
})

export const metadata = {
  title: 'Password Generator',
  description: 'A password generator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sourceCodePro.className}>{children}</body>
    </html>
  )
}
