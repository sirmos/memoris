import type { ReactNode } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { VaultProvider } from '@/components/vault-provider'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <VaultProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className="bg-background">{children}</SidebarInset>
      </SidebarProvider>
    </VaultProvider>
  )
}
