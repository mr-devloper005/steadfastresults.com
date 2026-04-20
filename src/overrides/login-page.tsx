'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2, Lock, Mail } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { SITE_CONFIG } from '@/lib/site-config'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    try {
      await login(email, password)
      toast({ title: 'Welcome back', description: 'You are now signed in.' })
      router.push('/')
    } catch (err) {
      setError('Could not sign you in. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="rounded-2xl bg-gradient-to-br from-[#3d2566] to-[#5b3b8e] p-10">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider">
              Welcome back
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight">
              Sign in to {SITE_CONFIG.name}
            </h1>
            <p className="mt-5 text-sm leading-7 text-slate-200">
              Access your reading list, saved articles, and personalized news updates from one place.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-slate-200">
              {[
                'Personalized article recommendations',
                'Save articles for later reading',
                'Get notified about new releases',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6c5f0]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#15151c] p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Sign in</p>
            <h2 className="mt-3 text-2xl font-bold">Enter your details</h2>

            <form onSubmit={onSubmit} className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm">
                <span className="text-slate-300">Email address</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#0b0b10] pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-[#d6c5f0]/50 focus:outline-none"
                  />
                </div>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="text-slate-300">Password</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#0b0b10] pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-[#d6c5f0]/50 focus:outline-none"
                  />
                </div>
              </label>

              {error && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#d6c5f0] px-6 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8] disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
              <Link href="/forgot-password" className="hover:text-white">Forgot password?</Link>
              <Link href="/register" className="font-semibold text-[#d6c5f0] hover:text-white">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
