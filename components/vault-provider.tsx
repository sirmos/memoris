'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  initialAssets,
  initialBeneficiaries,
  type Asset,
  type Beneficiary,
} from '@/lib/vault-data'

type VaultContextValue = {
  assets: Asset[]
  beneficiaries: Beneficiary[]
  addAsset: (asset: Omit<Asset, 'id'>) => void
  beneficiaryById: (id: string | null) => Beneficiary | undefined
  assetCountFor: (beneficiaryId: string) => number
}

const VaultContext = createContext<VaultContextValue | null>(null)

export function VaultProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<Asset[]>(initialAssets)
  const [beneficiaries] = useState<Beneficiary[]>(initialBeneficiaries)

  const value = useMemo<VaultContextValue>(
    () => ({
      assets,
      beneficiaries,
      addAsset: (asset) =>
        setAssets((prev) => [
          { ...asset, id: `a${Date.now()}` },
          ...prev,
        ]),
      beneficiaryById: (id) =>
        id ? beneficiaries.find((b) => b.id === id) : undefined,
      assetCountFor: (beneficiaryId) =>
        assets.filter((a) => a.assignedTo === beneficiaryId).length,
    }),
    [assets, beneficiaries],
  )

  return <VaultContext.Provider value={value}>{children}</VaultContext.Provider>
}

export function useVault() {
  const ctx = useContext(VaultContext)
  if (!ctx) throw new Error('useVault must be used within a VaultProvider')
  return ctx
}
