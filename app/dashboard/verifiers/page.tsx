import { PageHeader } from '@/components/page-header'
import { BadgeCheck } from 'lucide-react'

export default function VerifiersPage() {
  return (
    <>
      <PageHeader
        title="Verifiers"
        description="The trusted people who confirm when it's time for your vault to be opened."
      />
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="flex max-w-md flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <BadgeCheck className="size-6" />
          </span>
          <h2 className="mt-5 font-heading text-xl font-medium">
            People you trust to confirm
          </h2>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            Verifiers add a layer of care and protection — your vault is only
            shared once they confirm it&apos;s the right time.
          </p>
        </div>
      </div>
    </>
  )
}
