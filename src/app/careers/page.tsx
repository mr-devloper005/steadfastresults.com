import Link from 'next/link'
import { ArrowRight, MapPin, Briefcase, Clock, Heart, Coffee, Globe2, GraduationCap, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  {
    title: 'Senior Editor, Features',
    department: 'Editorial',
    location: 'Remote · Global',
    type: 'Full-time',
    summary: 'Lead long-form features from pitch through publication, working closely with reporters worldwide.',
  },
  {
    title: 'Investigative Reporter',
    department: 'Newsroom',
    location: 'New York, NY',
    type: 'Full-time',
    summary: 'Develop original reporting on business, technology, and accountability journalism.',
  },
  {
    title: 'Frontend Engineer',
    department: 'Product',
    location: 'Remote · EU',
    type: 'Full-time',
    summary: 'Build the reading experience used by millions, with a focus on performance and accessibility.',
  },
  {
    title: 'Newsletter Editor',
    department: 'Audience',
    location: 'London, UK',
    type: 'Full-time',
    summary: 'Curate and write our daily and weekly newsletter products, growing reader engagement.',
  },
  {
    title: 'Visual Journalist',
    department: 'Editorial',
    location: 'Remote · Global',
    type: 'Contract',
    summary: 'Produce photography, illustrations, and visual stories for major editorial features.',
  },
  {
    title: 'Audience Growth Lead',
    department: 'Marketing',
    location: 'Remote · Americas',
    type: 'Full-time',
    summary: 'Own audience strategy across channels and grow our reader base sustainably.',
  },
]

const benefits = [
  { icon: Globe2, title: 'Remote-first', body: 'Work from anywhere. Quarterly meetups bring the team together.' },
  { icon: Heart, title: 'Health & wellness', body: 'Comprehensive medical, dental, and mental health support.' },
  { icon: GraduationCap, title: 'Learning budget', body: '$2,500/year for books, courses, and conferences.' },
  { icon: Coffee, title: 'Time off', body: '25+ days of paid leave plus newsroom-wide reset weeks.' },
  { icon: Briefcase, title: 'Equipment', body: 'Top-tier laptop, monitor, and home-office stipend.' },
  { icon: Sparkles, title: 'Sabbatical', body: 'Paid sabbatical after every four years on the team.' },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Careers
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Build the future of independent publishing.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            Join {SITE_CONFIG.name} and help us create journalism that respects readers, depth, and the craft of writing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
            Why join us
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Benefits &amp; perks</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            We invest in the people who make {SITE_CONFIG.name} possible. Here is what we offer.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl bg-[#15151c] p-7 transition-transform hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
            Open positions
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Available roles</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            We are hiring across editorial, product, and audience teams. Find a role that fits your work.
          </p>
        </div>
        <div className="mt-12 grid gap-4">
          {roles.map((role) => (
            <div
              key={role.title}
              className="group rounded-2xl bg-[#15151c] p-7 transition-colors hover:bg-[#1a1a23]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium text-[#d6c5f0]">
                      {role.department}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      {role.type}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">{role.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{role.summary}</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#d6c5f0] px-5 py-2.5 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
                >
                  Apply
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-14">
          <h2 className="text-3xl font-bold sm:text-4xl">Don&apos;t see your role?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            We are always interested in hearing from talented people. Send us a note and tell us how you would like to
            contribute.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
