import type React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Layout: React.FC = () => (
  <TooltipProvider>
    <div className="flex min-h-screen" style={{ background: '#ECEEF1' }}>
      <Sidebar />
      <main className="flex-1 lg:ml-0 bg-white rounded-t-2xl min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-8 lg:px-10 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  </TooltipProvider>
)
