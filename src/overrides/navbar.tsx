'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

const NavbarAuthControls = dynamic(
  () => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls),
  { ssr: false, loading: () => null },
)

export const NAVBAR_OVERRIDE_ENABLED = true

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Articles', href: '/articles' },
  { label: 'Press & Media', href: '/press' },
  { label: 'Blog', href: '/blog' },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0b0b10]/95 text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-black">
            <img
              src="/favicon.png?v=20260401"
              alt={`${SITE_CONFIG.name} logo`}
              className="h-full w-full scale-110 object-contain"
            />
          </div>
          <span className="hidden text-lg font-semibold tracking-tight text-white sm:block">
            {SITE_CONFIG.name}
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  active ? 'text-white' : 'text-slate-300 hover:text-white',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#d6c5f0] px-5 py-2.5 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
              >
                Contact
              </Link>
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 bg-[#0b0b10]/98 lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="mt-3 grid gap-2 pt-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-full border border-white/10 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-[#d6c5f0] px-4 py-3 text-center text-sm font-semibold text-[#1c1530]"
                >
                  Contact
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
