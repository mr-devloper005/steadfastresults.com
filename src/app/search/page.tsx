import Link from 'next/link'
import { ArrowRight, Calendar, Search as SearchIcon, Sparkles } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchSiteFeed, type SitePost } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3

const FALLBACK_IMAGE = 'https://picsum.photos/seed/search-cover/1400/900'

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

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

function getCategory(post: SitePost) {
  const content = post.content && typeof post.content === 'object' ? (post.content as any) : {}
  if (typeof content.category === 'string' && content.category) return content.category
  if (Array.isArray(post.tags) && typeof post.tags[0] === 'string') return post.tags[0]
  return 'Article'
}

function formatDate(value?: string) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

const SUGGESTIONS = ['strategy', 'analysis', 'editorial', 'newsroom', 'feature', 'opinion']

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined,
  )
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as any).type)
    if (typeText === 'comment') return false
    const description = compactText((content as any).description)
    const body = compactText((content as any).body)
    const excerpt = compactText((content as any).excerpt)
    const categoryText = compactText((content as any).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)
  const hasQuery = normalized.length > 0

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:py-28 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Search
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {hasQuery ? (
              <>
                Results for <span className="text-[#d6c5f0]">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              <>Find a story.</>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            {hasQuery
              ? `${results.length} ${results.length === 1 ? 'result' : 'results'} across articles, briefings, and reports.`
              : 'Search articles, topics, authors, and tags from across the newsroom.'}
          </p>

          <form
            action="/search"
            method="get"
            className="mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-slate-200 backdrop-blur focus-within:border-white/40"
          >
            <SearchIcon className="h-4 w-4 shrink-0" />
            <input type="hidden" name="master" value="1" />
            {category ? <input type="hidden" name="category" value={category} /> : null}
            {task ? <input type="hidden" name="task" value={task} /> : null}
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search articles, topics, and authors"
              className="h-10 flex-1 bg-transparent text-sm text-white placeholder:text-slate-300 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="rounded-full bg-[#d6c5f0] px-5 py-2 text-xs font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
            >
              Search
            </button>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-slate-300">
            <span>Try:</span>
            {SUGGESTIONS.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 hover:border-white/30 hover:text-white"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {results.length ? (
          <>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {hasQuery ? 'Matching stories' : 'Browse latest'}
              </h2>
              <span className="text-sm text-slate-400">
                {results.length} {results.length === 1 ? 'story' : 'stories'}
              </span>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
                const taskKey = getPostTaskKey(post)
                const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`
                return (
                  <Link
                    key={post.id}
                    href={href}
                    className="group overflow-hidden rounded-2xl bg-[#15151c] transition-transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ContentImage
                        src={getImage(post)}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-[#d6c5f0] px-3 py-1 text-xs font-semibold text-[#1c1530]">
                        {getCategory(post)}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.publishedAt) || 'Recently published'}
                      </div>
                      <h3 className="mt-3 line-clamp-2 text-lg font-semibold group-hover:text-[#d6c5f0]">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                        {post.summary ||
                          'A short summary of this story with key takeaways and context for readers.'}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d6c5f0]">
                        Read more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl bg-[#15151c] p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d6c5f0]/10 text-[#d6c5f0]">
              <SearchIcon className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">No results found</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              {hasQuery ? (
                <>
                  We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try a different keyword, or browse our
                  latest articles below.
                </>
              ) : (
                <>Start typing above to search across the newsroom.</>
              )}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-full bg-[#d6c5f0] px-5 py-2.5 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
              >
                Browse all articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                Back to home
              </Link>
            </div>
          </div>
        )}
      </section>

      {hasQuery && results.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center sm:p-12">
            <Sparkles className="mx-auto h-9 w-9 text-[#d6c5f0]" />
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Didn&apos;t find what you needed?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-200">
              Browse our editorial categories or reach out — we&apos;re always happy to point you to the right story.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
              >
                All articles
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact editorial
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
