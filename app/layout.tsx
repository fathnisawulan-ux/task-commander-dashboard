import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task Commander - Dashboard Management',
  description: 'Manage 11 businesses with Eisenhower Matrix, Kanban, and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950">{children}</body>
    </html>
  )
}
