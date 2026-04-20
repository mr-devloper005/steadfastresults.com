'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  CreditCard,
  FileText,
  HelpCircle,
  Lightbulb,
  LifeBuoy,
  Mail,
  MessageCircle,
  Search,
  Settings,
  Shield,
  Sparkles,
  UserPlus,
  Video,
  Zap,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const topics = [
  {
    icon: UserPlus,
    title: 'Getting started',
    description: 'Create your account, set up your profile, and publish your first article.',
    articles: 8,
  },
  {
    icon: FileText,
    title: 'Writing & publishing',
    description: 'Tips for drafting, editing, formatting, and publishing long-form articles.',
    articles: 14,
  },
  {
    icon: Settings,
    title: 'Account & settings',
    description: 'Manage your profile, notifications, preferences, and connected services.',
    articles: 11,
  },
  {
    icon: Shield,
    title: 'Privacy & security',
    description: 'Two-factor auth, data exports, and how we protect reader information.',
    articles: 7,
  },
  {
    icon: CreditCard,
    title: 'Subscriptions & billing',
    description: 'Plans, invoices, payment methods, and managing your subscription.',
    articles: 9,
  },
  {
    icon: Zap,
    title: 'Reading experience',
    description: 'Personalize feeds, save articles, and use the reading list features.',
    articles: 6,
  },
]

const popularArticles = [
  { title: 'How to publish your first article', minutes: 4 },
  { title: 'Setting up your reader account', minutes: 3 },
  { title: 'Customizing your reading feed', minutes: 5 },
  { title: 'Managing notifications and email preferences', minutes: 4 },
  { title: 'Saving and organizing articles for later', minutes: 3 },
  { title: 'Updating your billing details', minutes: 2 },
]

const faqs = [
  {
    q: `How do I create an account on ${SITE_CONFIG.name}?`,
    a: 'Click "Sign In" in the top navigation, then choose "Create account". Provide your name, email, and a password — your reader account is ready in seconds.',
  },
  {
    q: 'Is the platform free to use?',
    a: 'Yes. Reading articles, creating an account, and saving stories is completely free. We may introduce optional premium features in the future, with clear opt-in.',
  },
  {
    q: 'How do I publish an article?',
    a: 'Once signed in, head to your dashboard and choose "Create article". Add a title, summary, content, category, and a cover image, then publish. Your article will appear in the feed.',
  },
  {
    q: 'Can I save articles to read later?',
    a: 'Yes. Use the bookmark icon on any article to save it to your reading list. Saved articles are accessible from your dashboard at any time.',
  },
  {
    q: 'How do I update my profile or password?',
    a: 'Visit your dashboard settings to update your name, email, password, or notification preferences. Changes take effect immediately.',
  },
  {
    q: 'Can I delete my account?',
    a: 'Absolutely. Go to dashboard settings and choose "Delete account". This permanently removes your account and associated data, no questions asked.',
  },
  {
    q: 'How do you handle my data?',
    a: 'We collect only what we need and never sell your data to third parties. Read our privacy policy for full details on data collection, storage, and your rights.',
  },
  {
    q: 'How do I contact support?',
    a: 'You can reach us through our contact page or email support directly. Our team typically responds within 24 hours on business days.',
  },
]

const channels = [
  {
    icon: Mail,
    title: 'Email support',
    body: 'Send us a detailed message and we\'ll get back within 24 hours.',
    cta: 'Send email',
    href: `mailto:support@${SITE_CONFIG.domain}`,
  },
  {
    icon: MessageCircle,
    title: 'Live chat',
    body: 'Chat with our support team Monday to Friday, 9am to 6pm IST.',
    cta: 'Start chat',
    href: '/contact',
  },
  {
    icon: Video,
    title: 'Video tutorials',
    body: 'Watch short walkthroughs covering the most common workflows.',
    cta: 'Browse library',
    href: '/help',
  },
]

export default function HelpPage() {
  const [query, setQuery] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return faqs
    const q = query.toLowerCase()
    return faqs.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Help Center
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            Search guides, browse popular articles, or reach out to our team. We&apos;re here whenever you need us.
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, guides, and FAQs..."
                className="h-14 w-full rounded-full border border-white/20 bg-white/10 pl-14 pr-5 text-base text-white placeholder:text-slate-300 backdrop-blur focus:border-white/40 focus:bg-white/15 focus:outline-none"
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-300">
              <span>Popular:</span>
              {['publish article', 'reset password', 'billing', 'notifications'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:border-white/30 hover:text-white"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
            Browse topics
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Help by category</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Find guides organized around what you&apos;re trying to do.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href="/help"
              className="group rounded-2xl bg-[#15151c] p-7 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                  <topic.icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-slate-500">{topic.articles} articles</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold group-hover:text-[#d6c5f0]">{topic.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{topic.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d6c5f0]">
                Browse guides
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="rounded-2xl bg-[#15151c] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold">Popular articles</h2>
            </div>
            <p className="mt-3 text-sm text-slate-400">The most-read help articles this month.</p>
            <ul className="mt-6 divide-y divide-white/5">
              {popularArticles.map((article, i) => (
                <li key={article.title}>
                  <Link
                    href="/help"
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-[#d6c5f0]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-xs font-semibold text-slate-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-[#d6c5f0]">
                          {article.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">{article.minutes} min read</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-[#d6c5f0]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#3d2566] to-[#5b3b8e] p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-[#d6c5f0]">
              <Lightbulb className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-2xl font-bold">Quick tips</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
              {[
                'Use the bookmark icon to build your personal reading list.',
                'Add categories and tags to your articles so readers find them.',
                'Enable notifications to know when new releases drop.',
                'Cover images work best at 1400×900 or larger.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#d6c5f0]" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            Quick answers to common questions. Can&apos;t find yours? Reach out to our team.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {filteredFaqs.length ? (
            filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl bg-[#15151c] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#d6c5f0]" />
                      <span className="text-base font-semibold text-white">{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/5 px-6 py-5 pl-[3.75rem] text-sm leading-7 text-slate-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="rounded-2xl bg-[#15151c] p-10 text-center">
              <p className="text-slate-400">No results for &ldquo;{query}&rdquo;.</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a different keyword, or{' '}
                <Link href="/contact" className="font-semibold text-[#d6c5f0] hover:text-white">
                  contact our team
                </Link>{' '}
                directly.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#d6c5f0]">
            Still need help?
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Reach our support team</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <div key={c.title} className="rounded-2xl bg-[#15151c] p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{c.body}</p>
              <Link
                href={c.href}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#d6c5f0] px-4 py-2 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
              >
                {c.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-14">
          <LifeBuoy className="mx-auto h-10 w-10 text-[#d6c5f0]" />
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Can&apos;t find what you need?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            Our team reads every message. Tell us what you&apos;re trying to do and we&apos;ll point you to the right
            answer — or write a new one.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
            >
              Contact support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
