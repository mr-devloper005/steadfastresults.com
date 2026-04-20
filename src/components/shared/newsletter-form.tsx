'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  variant?: 'dark' | 'light'
  placeholder?: string
  buttonLabel?: string
}

export function NewsletterForm({
  variant = 'light',
  placeholder = 'you@example.com',
  buttonLabel = 'Subscribe',
}: Props) {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const isDark = variant === 'dark'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      })
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setEmail('')
      toast({
        title: 'Subscribed!',
        description: 'You will receive our next briefing in your inbox.',
      })
    }, 600)
  }

  if (submitted) {
    return (
      <div
        className={`mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${
          isDark ? 'bg-[#d6c5f0]/15 text-[#d6c5f0]' : 'bg-white/15 text-white'
        }`}
      >
        <Check className="h-4 w-4" />
        Thanks for subscribing!
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className={
          isDark
            ? 'h-12 flex-1 rounded-full border border-white/10 bg-[#0b0b10] px-5 text-sm text-white placeholder:text-slate-500 focus:border-[#d6c5f0]/60 focus:outline-none'
            : 'h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-slate-300 focus:border-white/40 focus:outline-none'
        }
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#1c1530] transition hover:bg-slate-100 disabled:opacity-60"
      >
        {loading ? 'Subscribing…' : buttonLabel}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}
