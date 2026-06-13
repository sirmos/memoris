'use client'

import { PageHeader } from '@/components/page-header'
import { AddAssetDialog } from '@/components/add-asset-dialog'
import { DisposalBadge } from '@/components/disposal-badge'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useVault } from '@/components/vault-provider'
import { assetTypeMeta } from '@/lib/vault-data'
import { UserRound } from 'lucide-react'

export default function VaultPage() {
  const { assets, beneficiaryById } = useVault()

  return (
    <>
      <PageHeader
        title="My Vault"
        description={`${assets.length} digital assets, organized with care.`}
        action={<AddAssetDialog />}
      />

      <div className="px-4 py-6 md:px-8">
        <div className="flex flex-col gap-3">
          {assets.map((asset) => {
            const meta = assetTypeMeta[asset.type]
            const Icon = meta.icon
            const beneficiary = beneficiaryById(asset.assignedTo)
            return (
              <Card key={asset.id} className="overflow-hidden py-0">
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{asset.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {meta.label}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      <UserRound className="size-4 text-muted-foreground" />
                      {beneficiary ? (
                        <span className="text-foreground">
                          {beneficiary.name}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          Unassigned
                        </span>
                      )}
                    </div>
                    <Separator
                      orientation="vertical"
                      className="hidden h-6 sm:block"
                    />
                    <DisposalBadge disposal={asset.disposal} />
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
