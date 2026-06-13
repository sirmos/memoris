'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ShieldCheck,
  Vault,
  Users,
  ScrollText,
  BadgeCheck,
  Settings,
  LogOut,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'

const items = [
  { title: 'My Vault', href: '/dashboard', icon: Vault },
  { title: 'Beneficiaries', href: '/dashboard/beneficiaries', icon: Users },
  { title: 'Last Wishes', href: '/dashboard/last-wishes', icon: ScrollText },
  { title: 'Verifiers', href: '/dashboard/verifiers', icon: BadgeCheck },
  { title: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-2 py-1.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShieldCheck className="size-4" />
          </span>
          <span className="font-heading text-lg font-medium tracking-tight">
            AfterVault
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Planning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  item.href === '/dashboard'
                    ? pathname === item.href
                    : pathname.startsWith(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      render={
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-3">
              <Avatar className="size-8">
                <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                  EH
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col text-left leading-tight">
                <span className="truncate text-sm font-medium">
                  Eleanor Hayes
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  eleanor.hayes@example.com
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <Link href="/">
                  <LogOut />
                  <span>Sign out</span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
