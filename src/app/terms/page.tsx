import Link from 'next/link'
import { ArrowRight, FileText, Scale, Shield, AlertTriangle, RefreshCw, Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of terms',
    body: `By accessing or using ${SITE_CONFIG.name}, you agree to these terms. If you do not agree, please do not use the service. We may update these terms from time to time, and continued use means you accept the latest version.`,
  },
  {
    icon: Shield,
    title: 'Account responsibilities',
    body: 'You are responsible for keeping your account secure, for activity under it, and for the accuracy of the information you provide. Notify us immediately if you suspect unauthorized access.',
  },
  {
    icon: Scale,
    title: 'Content & ownership',
    body: 'You retain ownership of any content you publish. By submitting content, you grant us a non-exclusive license to display, distribute, and promote it on the platform. You confirm you have the right to share what you post.',
  },
  {
    icon: AlertTriangle,
    title: 'Acceptable use',
    body: 'No spam, harassment, illegal content, or attempts to disrupt the service. We reserve the right to remove content or suspend accounts that violate community standards or applicable law.',
  },
  {
    icon: RefreshCw,
    title: 'Service availability',
    body: 'We aim to keep the platform reliable, but we cannot guarantee uninterrupted availability. We may modify, suspend, or discontinue features at any time and will give reasonable notice when possible.',
  },
  {
    icon: Scale,
    title: 'Limitation of liability',
    body: `To the fullest extent permitted by law, ${SITE_CONFIG.name} is not liable for indirect, incidental, or consequential damages arising from your use of the service. The service is provided on an "as is" basis.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Terms of Service
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The rules we both follow.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            Clear, fair terms for using {SITE_CONFIG.name}. We have kept the legalese to a minimum without losing the
            substance.
          </p>
          <p className="mt-6 text-xs text-slate-400">Last updated: April 1, 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#15151c] p-8">
          <h2 className="text-lg font-semibold">In short</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Use the service responsibly. Respect other readers and contributors. You own what you publish; we keep the
            platform running. If something goes wrong, contact us first — we&apos;re reasonable people.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {sections.map((s, i) => (
            <article key={s.title} className="rounded-2xl bg-[#15151c] p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#d6c5f0]">
                    Section {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-xl font-semibold">{s.title}</h2>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-300">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-12">
          <Mail className="mx-auto h-10 w-10 text-[#d6c5f0]" />
          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Need clarification?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-200">
            If anything in these terms is unclear, our team can walk you through it. We are happy to help.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
            >
              Contact legal team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:legal@${SITE_CONFIG.domain}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              legal@{SITE_CONFIG.domain}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
