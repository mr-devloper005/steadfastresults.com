import Link from 'next/link'
import { ArrowRight, Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const principles = [
  { icon: Shield, title: 'Privacy by default', body: 'We collect only what we need and protect what we collect.' },
  { icon: Eye, title: 'Transparency', body: 'We explain what we do with your data in plain language.' },
  { icon: UserCheck, title: 'Your control', body: 'You can review, export, or delete your data at any time.' },
]

const sections = [
  {
    icon: Database,
    title: 'Information we collect',
    body: 'We collect information you provide directly — like your name, email, and any content you submit — along with usage data such as pages viewed, articles saved, and basic device or browser information needed to deliver the reading experience.',
    bullets: [
      'Account information you provide during sign-up',
      'Content you submit, save, or interact with',
      'Usage analytics to improve the platform',
      'Technical data such as device, browser, and IP',
    ],
  },
  {
    icon: Eye,
    title: 'How we use your information',
    body: 'Your data powers your personal experience and helps us run the service responsibly. We never sell personal information to third parties.',
    bullets: [
      'Personalize article recommendations and saved lists',
      'Send service updates and (if opted in) newsletters',
      'Detect abuse, secure accounts, and prevent fraud',
      'Improve product performance and editorial reach',
    ],
  },
  {
    icon: Lock,
    title: 'How we protect your data',
    body: 'Industry-standard security practices protect data in transit and at rest. Access is limited to staff who need it to operate the service, and we audit our systems regularly.',
    bullets: [
      'TLS encryption for all data in transit',
      'Encrypted storage for sensitive information',
      'Role-based internal access with audit logs',
      'Regular security reviews and dependency updates',
    ],
  },
  {
    icon: UserCheck,
    title: 'Your rights and choices',
    body: 'You are in control. Manage your communication preferences, request a copy of your data, or delete your account from your profile settings — no questions asked.',
    bullets: [
      'Access or download a copy of your data',
      'Correct or update your account details',
      'Opt out of non-essential email communication',
      'Delete your account and associated data',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Privacy Policy
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your privacy, in plain language.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            We believe a privacy policy should be honest, short, and clear. Here is exactly what we collect, why, and
            how you stay in control.
          </p>
          <p className="mt-6 text-xs text-slate-400">Last updated: April 1, 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="rounded-2xl bg-[#15151c] p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {sections.map((s) => (
            <article key={s.title} className="rounded-2xl bg-[#15151c] p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                  <s.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">{s.title}</h2>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-300">{s.body}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-400">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6c5f0]" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-12">
          <Mail className="mx-auto h-10 w-10 text-[#d6c5f0]" />
          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Questions about your data?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-200">
            Our privacy team is happy to help. Reach out and we will respond within 5 business days.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
            >
              Contact privacy team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:privacy@${SITE_CONFIG.domain}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              privacy@{SITE_CONFIG.domain}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
