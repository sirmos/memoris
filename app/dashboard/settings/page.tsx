import { PageHeader } from '@/components/page-header'
import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your account, privacy, and how AfterVault keeps your vault secure."
      />
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="flex max-w-md flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Settings className="size-6" />
          </span>
          <h2 className="mt-5 font-heading text-xl font-medium">
            Your account, your control
          </h2>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
            Settings for encryption, notifications, and privacy preferences will
            live here.
          </p>
        </div>
      </div>
    </>
  )
}
