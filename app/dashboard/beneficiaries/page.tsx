'use client'

import { PageHeader } from '@/components/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Mail } from 'lucide-react'
import { useVault } from '@/components/vault-provider'

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function BeneficiariesPage() {
  const { beneficiaries, assetCountFor } = useVault()

  return (
    <>
      <PageHeader
        title="Beneficiaries"
        description="The people you've chosen to carry your wishes forward."
      />

      <div className="px-4 py-6 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {beneficiaries.map((person) => {
            const count = assetCountFor(person.id)
            return (
              <Card key={person.id}>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        {initials(person.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{person.name}</p>
                      <Badge variant="secondary" className="mt-1 font-normal">
                        {person.relationship}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4 shrink-0" />
                    <span className="truncate">{person.email}</span>
                  </div>

                  <div className="mt-1 rounded-lg bg-secondary/60 px-3 py-2 text-sm">
                    <span className="font-medium text-foreground">
                      {count}
                    </span>{' '}
                    <span className="text-muted-foreground">
                      {count === 1 ? 'asset assigned' : 'assets assigned'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}
