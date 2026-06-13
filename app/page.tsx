import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Heart, Users, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ShieldCheck className="size-4" />
          </span>
          <span className="font-heading text-xl font-medium tracking-tight">
            AfterVault
          </span>
        </Link>
        <Button
          variant="ghost"
          className="rounded-full"
          nativeButton={false}
          render={<Link href="/dashboard">Sign in</Link>}
        />
      </header>

      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-16 pb-12 text-center md:pt-24">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
          <Heart className="size-3.5 text-primary" />
          Thoughtful end-of-life planning
        </span>
        <h1 className="text-balance font-heading text-4xl font-medium leading-tight tracking-tight md:text-6xl md:leading-[1.05]">
          Your digital life, passed on with care.
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          AfterVault helps you organize your accounts, assign them to loved
          ones, and ensure your wishes are carried out.
        </p>
        <div className="mt-9">
          <Button
            size="lg"
            className="rounded-full px-8 text-base shadow-sm"
            nativeButton={false}
            render={
              <Link href="/dashboard">
                Create your vault
                <ArrowRight data-icon="inline-end" />
              </Link>
            }
          />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Private, encrypted, and yours to control.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-24 md:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: 'Organize with intention',
            body: 'Gather every account in one calm, secure place — from email to banking to crypto.',
          },
          {
            icon: Users,
            title: 'Assign to loved ones',
            body: 'Choose who receives what, so the people you trust are never left guessing.',
          },
          {
            icon: Heart,
            title: 'Honor your wishes',
            body: 'Note how each account should be handled — transferred, closed, or kept in memory.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <item.icon className="size-5" />
            </span>
            <h3 className="mt-4 font-heading text-lg font-medium">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </div>
        ))}
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <span>AfterVault</span>
          <span>Made with care for life&apos;s hardest moments.</span>
        </div>
      </footer>
    </main>
  )
}
