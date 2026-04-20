import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Search, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { NewsletterForm } from '@/components/shared/newsletter-form'
import { fetchTaskPosts } from '@/lib/task-data'
import { buildTaskMetadata } from '@/lib/seo'
import type { SitePost } from '@/lib/site-connector'

export const revalidate = 3
export const generateMetadata = () => buildTaskMetadata('article')

const FALLBACK_IMAGE = 'https://picsum.photos/seed/blog-cover/1400/900'
const FALLBACK_TAGS = ['Editorial', 'Behind the Scenes', 'Notes', 'Reading List', 'Process', 'Updates']

function getImage(post?: SitePost | null) {
  if (!post) return FALLBACK_IMAGE
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((m) => typeof m?.url === 'string' && m.url)?.url
  const content = post.content && typeof post.content === 'object' ? (post.content as any) : {}
  const contentImage = Array.isArray(content.images)
    ? content.images.find((u: unknown) => typeof u === 'string' && u)
    : null
  return mediaUrl || contentImage || FALLBACK_IMAGE
}

function getTag(post: SitePost, fallback: string) {
  if (Array.isArray(post.tags) && typeof post.tags[0] === 'string') return post.tags[0]
  const content = post.content && typeof post.content === 'object' ? (post.content as any) : {}
  if (typeof content.category === 'string' && content.category) return content.category
  return fallback
}

function formatDate(value?: string) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function readingTime(post: SitePost) {
  const text = `${post.title || ''} ${post.summary || ''}`
  const words = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(3, Math.round(words / 50) + 4)
  return `${minutes} min read`
}

export default async function BlogPage() {
  const posts = await fetchTaskPosts('article', 18, { allowMockFallback: true, fresh: true })
  const lead = posts[0]
  const sidebar = posts.slice(1, 4)
  const grid = posts.slice(4)

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            The Blog
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Notes, ideas, and editorial perspective.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            Behind-the-scenes notes, process posts, and shorter writing from across the newsroom.
          </p>
          <form
            action="/search"
            method="get"
            className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-slate-200 backdrop-blur focus-within:border-white/40"
          >
            <Search className="h-4 w-4 shrink-0" />
            <input
              type="search"
              name="q"
              placeholder="Search blog posts and tags"
              className="h-9 flex-1 bg-transparent text-sm text-white placeholder:text-slate-300 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-[#d6c5f0] px-4 py-1.5 text-xs font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {(lead || sidebar.length > 0) && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {lead && (
              <Link
                href={`/articles/${lead.slug}`}
                className="group overflow-hidden rounded-2xl bg-[#15151c]"
              >
                <div className="relative h-72 overflow-hidden lg:h-96">
                  <ContentImage
                    src={getImage(lead)}
                    alt={lead.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-[#d6c5f0] px-3 py-1 text-xs font-semibold text-[#1c1530]">
                    Editor&apos;s pick
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      {getTag(lead, FALLBACK_TAGS[0])}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(lead.publishedAt) || 'Recently'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {readingTime(lead)}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold leading-tight group-hover:text-[#d6c5f0] sm:text-3xl">
                    {lead.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 text-base leading-7 text-slate-300">
                    {lead.summary ||
                      'A featured note from the editorial desk on process, craft, or the work behind a recent story.'}
                  </p>
                </div>
              </Link>
            )}

            <div className="grid gap-4">
              {sidebar.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/articles/${post.slug}`}
                  className="group flex gap-4 rounded-2xl bg-[#15151c] p-4 transition-colors hover:bg-[#1a1a23]"
                >
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                    <ContentImage src={getImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#d6c5f0]">
                      {getTag(post, FALLBACK_TAGS[(i + 1) % FALLBACK_TAGS.length])}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white group-hover:text-[#d6c5f0]">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(post.publishedAt) || 'Recently'} · {readingTime(post)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">More from the blog</h2>
          <span className="text-sm text-slate-400">{grid.length} posts</span>
        </div>
        {grid.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grid.map((post, index) => (
              <Link
                key={post.id}
                href={`/articles/${post.slug}`}
                className="group overflow-hidden rounded-2xl bg-[#15151c] transition-transform hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <ContentImage
                    src={getImage(post)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-[#d6c5f0]/10 px-3 py-0.5 font-medium text-[#d6c5f0]">
                      {getTag(post, FALLBACK_TAGS[index % FALLBACK_TAGS.length])}
                    </span>
                    <span>{formatDate(post.publishedAt) || 'Recently'}</span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-lg font-semibold group-hover:text-[#d6c5f0]">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                    {post.summary || 'A short note from the editorial desk.'}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d6c5f0]">
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-slate-400">No blog posts yet.</p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-14">
          <h2 className="text-3xl font-bold sm:text-4xl">Get the weekly briefing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200">
            One short email each week with our best writing, behind-the-scenes notes, and what we&apos;re reading.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <Footer />
    </div>
  )
}
