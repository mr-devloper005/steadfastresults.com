import Link from 'next/link'
import { ArrowRight, Calendar, Download, ExternalLink, FileText, Image as ImageIcon, Mail, Quote } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const releases = [
  {
    date: 'April 12, 2026',
    category: 'Funding',
    title: `${SITE_CONFIG.name} announces Series B to expand independent newsroom`,
    summary:
      'New funding will support investigative reporting, contributor programs, and reader experience improvements over the next 24 months.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
  {
    date: 'March 28, 2026',
    category: 'Partnership',
    title: 'Editorial partnership launched with Global Press Network',
    summary:
      'A multi-year collaboration to syndicate long-form features and co-produce investigative reporting with newsrooms worldwide.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  },
  {
    date: 'February 14, 2026',
    category: 'Product',
    title: 'New reading experience and reader account launch',
    summary:
      'A redesigned reading flow with personalized recommendations, improved typography, and saved reading lists.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
  },
  {
    date: 'January 22, 2026',
    category: 'Award',
    title: `${SITE_CONFIG.name} wins Editorial Excellence Award`,
    summary:
      'Recognized for sustained quality in long-form business reporting and analytical journalism over the past year.',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80',
  },
  {
    date: 'December 6, 2025',
    category: 'Expansion',
    title: 'European newsroom opens with five new contributors',
    summary:
      'A distributed editorial team across Berlin, London, and Amsterdam strengthens our regional reporting depth.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  },
  {
    date: 'November 18, 2025',
    category: 'Launch',
    title: 'Weekly briefing newsletter crosses 250,000 subscribers',
    summary:
      'Our flagship weekly newsletter passes a major audience milestone, two years after launch.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
  },
]

const mediaKit = [
  { icon: FileText, title: 'Press release archive', description: 'Browse all official announcements (PDF).' },
  { icon: ImageIcon, title: 'Brand assets & logos', description: 'Logo files, color palette, and typography.' },
  { icon: FileText, title: 'Company fact sheet', description: 'Key numbers, milestones, and leadership bios.' },
  { icon: ImageIcon, title: 'Editorial team photos', description: 'Approved press photos for media use.' },
]

const coverage = [
  { outlet: 'TechWeekly', headline: 'A return to slow journalism: inside an editorial revival', date: 'Apr 2026' },
  { outlet: 'Press Today', headline: 'Why readers are paying for depth again', date: 'Mar 2026' },
  { outlet: 'Newsroom Review', headline: 'The independent platforms shaping 2026 publishing', date: 'Feb 2026' },
  { outlet: 'Media Pulse', headline: 'How small newsrooms scaled without losing focus', date: 'Jan 2026' },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Press &amp; Media
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Press releases &amp; media resources
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            Latest announcements, official statements, brand assets, and contact information for journalists and media
            partners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">Latest press releases</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {releases.map((release) => (
            <Link
              key={release.title}
              href="/articles"
              className="group block overflow-hidden rounded-2xl bg-[#15151c] transition-transform hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={release.image}
                  alt={release.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#d6c5f0] px-3 py-1 text-xs font-semibold text-[#1c1530]">
                  {release.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {release.date}
                </div>
                <h3 className="mt-3 line-clamp-2 text-lg font-semibold group-hover:text-[#d6c5f0]">
                  {release.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{release.summary}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#d6c5f0]">
                    Read release
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-300 group-hover:bg-white/5"
                    aria-hidden="true"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
            Media Kit
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Resources for journalists</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Everything you need to reference {SITE_CONFIG.name} accurately in your reporting.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mediaKit.map((item) => (
            <div key={item.title} className="rounded-2xl bg-[#15151c] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d6c5f0] hover:text-white"
              >
                Request
                <Download className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl bg-gradient-to-br from-[#3d2566] to-[#5b3b8e] p-10">
            <Quote className="h-8 w-8 text-[#d6c5f0]" />
            <p className="mt-6 text-xl leading-8 text-white">
              &ldquo;{SITE_CONFIG.name} represents a quiet renaissance in long-form journalism — the kind of work that
              respects readers and rewards close attention.&rdquo;
            </p>
            <p className="mt-6 text-sm font-medium text-slate-200">— Press Today, March 2026</p>
          </div>
          <div className="rounded-2xl bg-[#15151c] p-10">
            <h3 className="text-xl font-semibold">In the news</h3>
            <p className="mt-3 text-sm text-slate-400">Recent media coverage of our newsroom and reporting.</p>
            <ul className="mt-6 divide-y divide-white/5">
              {coverage.map((item) => (
                <li key={item.headline}>
                  <Link
                    href="/articles"
                    className="group flex items-start justify-between gap-4 py-4 transition-colors hover:text-[#d6c5f0]"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#d6c5f0]">{item.outlet}</p>
                      <p className="mt-1 text-sm font-medium text-white group-hover:text-[#d6c5f0]">
                        {item.headline}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{item.date}</p>
                    </div>
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-500 group-hover:text-[#d6c5f0]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-14">
          <Mail className="mx-auto h-10 w-10 text-[#d6c5f0]" />
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Media inquiries</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            For interviews, official statements, or partnership questions, reach our press team directly. We respond to
            most requests within 24 hours.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
            >
              Contact press team
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:press@${SITE_CONFIG.domain}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              press@{SITE_CONFIG.domain}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
