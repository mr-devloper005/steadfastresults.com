import Link from 'next/link'
import { ArrowRight, Cookie, Lock, BarChart3, Settings, Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const cookieTypes = [
  {
    icon: Lock,
    title: 'Essential cookies',
    required: true,
    body: 'Required for the site to function. They keep you signed in, remember your session, and protect against fraud.',
    examples: ['Authentication session', 'Security and CSRF protection', 'Load-balancing routing'],
  },
  {
    icon: BarChart3,
    title: 'Analytics cookies',
    required: false,
    body: 'Help us understand how readers use the platform so we can improve performance, navigation, and content discovery.',
    examples: ['Page view counts', 'Reading session duration', 'Aggregated usage trends'],
  },
  {
    icon: Settings,
    title: 'Preference cookies',
    required: false,
    body: 'Remember your choices — like theme, language, and saved filters — so you do not need to set them again next time.',
    examples: ['Theme preference', 'Language choice', 'Saved filters and views'],
  },
]

const choices = [
  {
    title: 'Browser settings',
    body: 'Most browsers let you block, delete, or get notified about cookies. Check your browser&rsquo;s privacy settings to control them site by site.',
  },
  {
    title: 'In-app preferences',
    body: 'You can manage non-essential cookie categories from your account settings any time after signing in.',
  },
  {
    title: 'Third-party tools',
    body: 'Tools like browser extensions and Do Not Track signals can give you finer-grained control over tracking technologies.',
  },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Cookie Policy
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            How we use cookies.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            A short, clear explanation of the small files we use to keep {SITE_CONFIG.name} running smoothly — and how
            you stay in control of them.
          </p>
          <p className="mt-6 text-xs text-slate-400">Last updated: April 1, 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#15151c] p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
              <Cookie className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">What is a cookie?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                A cookie is a small text file that a website stores on your device. They help sites remember things —
                like that you are signed in, your theme preference, or which articles you have already read. We use
                only what we need.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {cookieTypes.map((c) => (
            <div key={c.title} className="rounded-2xl bg-[#15151c] p-7">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                  <c.icon className="h-5 w-5" />
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    c.required
                      ? 'bg-[#d6c5f0] text-[#1c1530]'
                      : 'border border-white/15 text-slate-300'
                  }`}
                >
                  {c.required ? 'Required' : 'Optional'}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{c.body}</p>
              <ul className="mt-5 space-y-2 text-xs text-slate-500">
                {c.examples.map((e) => (
                  <li key={e} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#d6c5f0]" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Your choices</h2>
        <p className="mt-3 text-sm text-slate-400">Control how cookies are used in your browser and on your account.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {choices.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/5 bg-[#15151c] p-6">
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p
                className="mt-3 text-sm leading-6 text-slate-400"
                dangerouslySetInnerHTML={{ __html: c.body }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-12">
          <Mail className="mx-auto h-10 w-10 text-[#d6c5f0]" />
          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Questions about cookies?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-200">
            We&apos;re happy to clarify what we collect and why. Drop us a note and we&apos;ll get back to you.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Read privacy policy
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
