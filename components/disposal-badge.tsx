import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { disposalMeta, type Disposal } from '@/lib/vault-data'

const styles: Record<Disposal, string> = {
  transfer: 'bg-accent text-accent-foreground border-transparent',
  delete: 'bg-destructive/10 text-destructive border-transparent',
  memorialize: 'bg-secondary text-secondary-foreground border-transparent',
}

export function DisposalBadge({ disposal }: { disposal: Disposal }) {
  return (
    <Badge variant="outline" className={cn('font-medium', styles[disposal])}>
      {disposalMeta[disposal].label}
    </Badge>
  )
}
