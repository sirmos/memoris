import { PageHeader } from '@/components/page-header'
import { ScrollText } from 'lucide-react'

export default function LastWishesPage() {
  return (
    <>
      <PageHeader
        title="Last Wishes"
        description="A gentle place to record the messages and instructions you'd like to leave behind."
      />
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="flex max-w-md flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <ScrollText className="size-6" />
          </span>
          <h2 className="mt-5 font-heading text-xl font-medium">
            Your wishes, in your own words
          </h2>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            Soon you&apos;ll be able to write letters, leave instructions, and
            share the things that matter most with the people you love.
          </p>
        </div>
      </div>
    </>
  )
}
