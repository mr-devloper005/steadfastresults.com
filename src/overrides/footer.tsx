import Link from 'next/link'
import { Twitter, Linkedin, Github, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const FOOTER_LINKS = {
  Explore: [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: 'Press & Media', href: '/press' },
    { label: 'Blog', href: '/blog' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

const SOCIALS = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Mail, href: '/contact', label: 'Email' },
]

export function FooterOverride() {
  return (
    <footer className="border-t border-white/5 bg-[#0b0b10] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-black">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full scale-110 object-contain" />
              </div>
              <span className="text-lg font-semibold">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-[#d6c5f0]/40 hover:bg-[#d6c5f0]/10 hover:text-[#d6c5f0]"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{heading}</h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center">
          <span>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</span>
          <span>Built for thoughtful publishing.</span>
        </div>
      </div>
    </footer>
  )
}
