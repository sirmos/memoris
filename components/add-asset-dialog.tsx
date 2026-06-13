'use client'

import { useState } from 'react'
import { Plus, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  assetTypeMeta,
  disposalMeta,
  type AssetType,
  type Disposal,
} from '@/lib/vault-data'
import { useVault } from '@/components/vault-provider'

export function AddAssetDialog() {
  const { beneficiaries, addAsset } = useVault()
  const [open, setOpen] = useState(false)

  const [type, setType] = useState<AssetType>('email')
  const [label, setLabel] = useState('')
  const [notes, setNotes] = useState('')
  const [assignedTo, setAssignedTo] = useState<string>('unassigned')
  const [disposal, setDisposal] = useState<Disposal>('transfer')

  function reset() {
    setType('email')
    setLabel('')
    setNotes('')
    setAssignedTo('unassigned')
    setDisposal('transfer')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!label.trim()) return
    addAsset({
      type,
      label: label.trim(),
      notes: notes.trim(),
      assignedTo: assignedTo === 'unassigned' ? null : assignedTo,
      disposal,
    })
    toast.success('Asset added to your vault', {
      description: `${label.trim()} has been saved with care.`,
    })
    reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) reset()
      }}
    >
      <DialogTrigger
        render={
          <Button className="rounded-full">
            <Plus data-icon="inline-start" />
            Add Asset
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-medium">
            Add a digital asset
          </DialogTitle>
          <DialogDescription>
            Record an account and let your loved ones know how to care for it.
          </DialogDescription>
        </DialogHeader>

        <form id="add-asset" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="asset-type">Asset type</FieldLabel>
              <Select
                value={type}
                onValueChange={(v) => setType(v as AssetType)}
              >
                <SelectTrigger id="asset-type">
                  <SelectValue>
                    {(v: AssetType) => assetTypeMeta[v].label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {(
                      Object.keys(assetTypeMeta) as AssetType[]
                    ).map((key) => (
                      <SelectItem key={key} value={key}>
                        {assetTypeMeta[key].label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="asset-label">Label</FieldLabel>
              <Input
                id="asset-label"
                placeholder="e.g. Personal Gmail"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                autoComplete="off"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="asset-notes">Notes</FieldLabel>
              <Textarea
                id="asset-notes"
                placeholder="Anything your loved ones should know — kept private."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
              <FieldDescription className="flex items-center gap-1.5">
                <Lock className="size-3" />
                Notes are encrypted and only revealed to the right person.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="asset-assign">
                Assign to beneficiary
              </FieldLabel>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger id="asset-assign">
                  <SelectValue>
                    {(v: string) =>
                      v === 'unassigned'
                        ? 'No one yet'
                        : beneficiaries.find((b) => b.id === v)?.name ??
                          'No one yet'
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="unassigned">No one yet</SelectItem>
                    {beneficiaries.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name} · {b.relationship}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="asset-disposal">
                Disposal instruction
              </FieldLabel>
              <Select
                value={disposal}
                onValueChange={(v) => setDisposal(v as Disposal)}
              >
                <SelectTrigger id="asset-disposal">
                  <SelectValue>
                    {(v: Disposal) => disposalMeta[v].label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {(Object.keys(disposalMeta) as Disposal[]).map((key) => (
                      <SelectItem key={key} value={key}>
                        {disposalMeta[key].label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                {disposalMeta[disposal].description}
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="add-asset" className="rounded-full">
            Save to vault
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
