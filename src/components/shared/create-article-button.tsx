'use client'

import Link from 'next/link'
import { PenSquare } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export function CreateArticleButton() {
  const { isAuthenticated } = useAuth()

  return (
    <Link
      href={isAuthenticated ? '/create/article' : '/login?next=/create/article'}
      className="inline-flex items-center gap-2 rounded-full bg-[#d6c5f0] px-6 py-3 text-sm font-semibold text-[#1c1530] shadow-[0_16px_30px_rgba(214,197,240,0.18)] transition hover:bg-[#c4b1e8]"
    >
      <PenSquare className="h-4 w-4" />
      Create article
    </Link>
  )
}
