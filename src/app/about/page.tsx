import Link from 'next/link'
import { ArrowRight, Target, Users, Sparkles, Globe2, Compass, Heart } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const stats = [
  { value: '10M+', label: 'Monthly readers' },
  { value: '2,400+', label: 'Articles published' },
  { value: '120+', label: 'Industry contributors' },
  { value: '48', label: 'Countries reached' },
]

const values = [
  {
    icon: Target,
    title: 'Editorial integrity',
    body: 'Every story is fact-checked, sourced, and reviewed before it reaches our readers. Truth is non-negotiable.',
  },
  {
    icon: Users,
    title: 'Reader-first',
    body: 'We design our publishing experience around clarity, calm, and the value of your time as a reader.',
  },
  {
    icon: Sparkles,
    title: 'Independent voice',
    body: 'No clickbait, no chasing trends. We publish what matters, even when it is harder to write.',
  },
  {
    icon: Globe2,
    title: 'Globally minded',
    body: 'We follow stories where they lead — across markets, industries, and cultures — without losing nuance.',
  },
  {
    icon: Compass,
    title: 'Long-form focus',
    body: 'We make room for context, depth, and the kind of analysis short feeds cannot afford to host.',
  },
  {
    icon: Heart,
    title: 'Built to last',
    body: 'We invest in writers, editors, and reporting that holds up months and years after publication.',
  },
]

const milestones = [
  { year: '2021', title: 'Founded', body: 'Launched as a small editorial desk focused on long-form business reporting.' },
  { year: '2022', title: 'First million readers', body: 'Crossed our first audience milestone with deeply reported stories.' },
  { year: '2024', title: 'Global newsroom', body: 'Expanded to a distributed team of contributors across four continents.' },
  { year: '2026', title: 'Today', body: 'A trusted source for thoughtful articles on business, technology, and culture.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            About Us
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Publishing thoughtful journalism for a focused reader.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            {SITE_CONFIG.name} is an independent editorial platform built around clarity, depth, and respect for the
            reader. We publish stories worth your full attention.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-[#15151c] p-6 text-center">
              <div className="text-3xl font-bold text-[#d6c5f0] sm:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
              Our story
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A newsroom built for readers, not algorithms.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-300">
            <p>
              {SITE_CONFIG.name} started as a small group of writers tired of fast feeds, shallow takes, and stories
              optimized for clicks instead of clarity. We wanted a place where context still mattered.
            </p>
            <p>
              Today we publish reported essays, analysis, and long-form stories across business, technology, and
              culture. Every piece gets the time it needs — and so does every reader.
            </p>
            <p>
              We are independent, reader-supported, and intentionally calm. The web is loud enough; our job is to make
              it worth slowing down for.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
            What we believe
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Our values</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            The principles that shape every story, every edit, and every product decision we make.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl bg-[#15151c] p-7 transition-transform hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                <value.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
            Our journey
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Milestones</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {milestones.map((m) => (
            <div key={m.year} className="rounded-2xl border border-white/5 bg-[#15151c] p-6">
              <div className="text-sm font-semibold text-[#d6c5f0]">{m.year}</div>
              <h3 className="mt-2 text-lg font-semibold">{m.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-14">
          <h2 className="text-3xl font-bold sm:text-4xl">Want to write with us?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            We are always reading pitches from thoughtful writers, reporters, and analysts. If your work belongs here,
            we want to see it.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
            >
              See open roles
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Pitch a story
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
