'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, Send, Loader2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useToast } from '@/components/ui/use-toast'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const contactChannels = [
  {
    icon: Mail,
    title: 'Email us',
    body: 'Reach the editorial desk for general questions and pitches.',
    detail: `hello@${SITE_CONFIG.domain}`,
  },
  {
    icon: MessageCircle,
    title: 'Press inquiries',
    body: 'Media requests, interviews, and partnership questions.',
    detail: `press@${SITE_CONFIG.domain}`,
  },
  {
    icon: Phone,
    title: 'Call the desk',
    body: 'Available Monday to Friday, 9am to 6pm IST.',
    detail: '+1 (555) 010-2026',
  },
  {
    icon: MapPin,
    title: 'Office',
    body: 'Drop by during open studio hours, by appointment.',
    detail: '12 Editorial Lane, Suite 400, NY',
  },
]

const topics = [
  'General inquiry',
  'Pitch a story',
  'Press & media',
  'Partnership',
  'Careers',
  'Feedback',
]

export function ContactPageOverride() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: topics[0],
    message: '',
  })

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast({
      title: 'Message sent',
      description: 'Thanks for reaching out — we will get back to you shortly.',
    })
    setForm({ name: '', email: '', topic: topics[0], message: '' })
    setSubmitting(false)
  }

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Get in touch
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s start a conversation.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            Pitches, press, partnerships, or feedback — choose the right lane and we&apos;ll route your message to the
            right person.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactChannels.map((c) => (
            <div key={c.title} className="rounded-2xl bg-[#15151c] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{c.body}</p>
              <p className="mt-3 break-all text-sm font-medium text-[#d6c5f0]">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <div className="rounded-2xl bg-gradient-to-br from-[#3d2566] to-[#5b3b8e] p-10">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider">
              Send a message
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">We read every message.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-200">
              Tell us what you are working on, what you need, or what you would like to see published. We typically
              respond within two business days.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-slate-200">
              {[
                'Editorial pitches reviewed weekly',
                'Press requests answered within 24 hours',
                'Partnership inquiries routed directly',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6c5f0]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl bg-[#15151c] p-10">
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="text-slate-300">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Jane Doe"
                    className="h-12 rounded-xl border border-white/10 bg-[#0b0b10] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#d6c5f0]/50 focus:outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="text-slate-300">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 rounded-xl border border-white/10 bg-[#0b0b10] px-4 text-sm text-white placeholder:text-slate-500 focus:border-[#d6c5f0]/50 focus:outline-none"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm">
                <span className="text-slate-300">Topic</span>
                <select
                  value={form.topic}
                  onChange={(e) => update('topic', e.target.value)}
                  className="h-12 rounded-xl border border-white/10 bg-[#0b0b10] px-4 text-sm text-white focus:border-[#d6c5f0]/50 focus:outline-none"
                >
                  {topics.map((t) => (
                    <option key={t} value={t} className="bg-[#0b0b10]">
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-slate-300">Message</span>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Share the full context so we can respond with the right next step."
                  rows={6}
                  className="rounded-xl border border-white/10 bg-[#0b0b10] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6c5f0]/50 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#d6c5f0] px-6 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8] disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#15151c] p-10 sm:p-14">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Looking for something else?</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Find answers in our help center, browse press releases, or read about open positions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/help"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                Help center
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-full bg-[#d6c5f0] px-5 py-2.5 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
              >
                Careers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
