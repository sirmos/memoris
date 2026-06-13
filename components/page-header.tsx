import type { ReactNode } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <header className="sticky top-0 z-10 flex flex-col gap-4 border-b border-border bg-background/80 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-1 h-5" />
        <div className="flex flex-1 flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-medium tracking-tight">
              {title}
            </h1>
            {description ? (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {action}
        </div>
      </div>
    </header>
  )
}
