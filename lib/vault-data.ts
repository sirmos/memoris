import {
  Mail,
  Share2,
  Landmark,
  Bitcoin,
  Clapperboard,
  Boxes,
  type LucideIcon,
} from 'lucide-react'

export type AssetType =
  | 'email'
  | 'social'
  | 'bank'
  | 'crypto'
  | 'streaming'
  | 'other'

export type Disposal = 'transfer' | 'delete' | 'memorialize'

export type Asset = {
  id: string
  type: AssetType
  label: string
  notes: string
  assignedTo: string | null
  disposal: Disposal
}

export type Beneficiary = {
  id: string
  name: string
  email: string
  relationship: string
}

export const assetTypeMeta: Record<
  AssetType,
  { label: string; icon: LucideIcon }
> = {
  email: { label: 'Email', icon: Mail },
  social: { label: 'Social', icon: Share2 },
  bank: { label: 'Bank', icon: Landmark },
  crypto: { label: 'Crypto', icon: Bitcoin },
  streaming: { label: 'Streaming', icon: Clapperboard },
  other: { label: 'Other', icon: Boxes },
}

export const disposalMeta: Record<
  Disposal,
  { label: string; description: string }
> = {
  transfer: {
    label: 'Transfer',
    description: 'Hand this account over to a loved one.',
  },
  delete: {
    label: 'Delete',
    description: 'Permanently close and remove this account.',
  },
  memorialize: {
    label: 'Memorialize',
    description: 'Preserve this account as a remembrance.',
  },
}

export const initialBeneficiaries: Beneficiary[] = [
  {
    id: 'b1',
    name: 'Eleanor Hayes',
    email: 'eleanor.hayes@example.com',
    relationship: 'Spouse',
  },
  {
    id: 'b2',
    name: 'Marcus Hayes',
    email: 'marcus.h@example.com',
    relationship: 'Son',
  },
  {
    id: 'b3',
    name: 'Priya Anand',
    email: 'priya.anand@example.com',
    relationship: 'Sister',
  },
  {
    id: 'b4',
    name: 'Daniel Cole',
    email: 'daniel.cole@example.com',
    relationship: 'Close friend',
  },
]

export const initialAssets: Asset[] = [
  {
    id: 'a1',
    type: 'email',
    label: 'Personal Gmail',
    notes: 'Primary inbox with family photos and correspondence.',
    assignedTo: 'b1',
    disposal: 'transfer',
  },
  {
    id: 'a2',
    type: 'bank',
    label: 'Sterling Savings Account',
    notes: 'Joint savings — see the estate folder for documents.',
    assignedTo: 'b1',
    disposal: 'transfer',
  },
  {
    id: 'a3',
    type: 'social',
    label: 'Instagram',
    notes: 'Years of memories. Keep it visible to friends and family.',
    assignedTo: 'b2',
    disposal: 'memorialize',
  },
  {
    id: 'a4',
    type: 'crypto',
    label: 'Hardware Wallet',
    notes: 'Recovery phrase stored with the family attorney.',
    assignedTo: 'b2',
    disposal: 'transfer',
  },
  {
    id: 'a5',
    type: 'streaming',
    label: 'Netflix',
    notes: 'Subscription can be closed once no longer needed.',
    assignedTo: null,
    disposal: 'delete',
  },
  {
    id: 'a6',
    type: 'social',
    label: 'Old Twitter / X',
    notes: 'No longer used — please close it gently.',
    assignedTo: null,
    disposal: 'delete',
  },
  {
    id: 'a7',
    type: 'other',
    label: 'Photography Portfolio Site',
    notes: 'Domain renews each spring. Priya knows the host login.',
    assignedTo: 'b3',
    disposal: 'transfer',
  },
]
