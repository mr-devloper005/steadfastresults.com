import Link from 'next/link'
import { ArrowRight, Calendar, Search } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { CreateArticleButton } from '@/components/shared/create-article-button'
import { fetchTaskPosts } from '@/lib/task-data'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('article', {
    path: '/articles',
    title: taskPageMetadata.article.title,
    description: taskPageMetadata.article.description,
  })

const FALLBACK_IMAGE = 'https://picsum.photos/seed/article-cover/1400/900'

const FALLBACK_CATEGORIES = ['Strategy', 'Insight', 'Analysis', 'Opinion', 'Report', 'Feature']

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

function getCategory(post: SitePost, fallback: string) {
  const content = post.content && typeof post.content === 'object' ? (post.content as any) : {}
  if (typeof content.category === 'string' && content.category) return content.category
  if (Array.isArray(post.tags) && typeof post.tags[0] === 'string') return post.tags[0]
  return fallback
}

function formatDate(value?: string) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

export default async function ArticlesPage() {
  const articles = await fetchTaskPosts('article', 24, { allowMockFallback: true, fresh: true })
  const featured = articles[0]
  const rest = articles.slice(1)

  const categories = Array.from(
    new Set(articles.map((p, i) => getCategory(p, FALLBACK_CATEGORIES[i % FALLBACK_CATEGORIES.length]))),
  ).slice(0, 6)

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Articles
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Stories worth your full attention.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            Long-form essays, analysis, and reporting from across business, technology, and culture.
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
              placeholder="Search articles, topics, and authors"
              className="h-9 flex-1 bg-transparent text-sm text-white placeholder:text-slate-300 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-[#d6c5f0] px-4 py-1.5 text-xs font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
            >
              Search
            </button>
          </form>
          <div className="mt-6 flex justify-center">
            <CreateArticleButton />
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Topics:</span>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/search?q=${encodeURIComponent(c)}`}
                className="rounded-full border border-white/10 bg-[#15151c] px-4 py-1.5 text-xs font-medium text-slate-300 hover:border-[#d6c5f0]/50 hover:text-white"
              >
                {c}
              </Link>
            ))}
          </div>
        </section>
      )}

      {featured && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href={`/articles/${featured.slug}`}
            className="group grid overflow-hidden rounded-2xl bg-[#15151c] lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative h-72 overflow-hidden lg:h-auto">
              <ContentImage
                src={getImage(featured)}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[#d6c5f0] px-3 py-1 text-xs font-semibold text-[#1c1530]">
                Featured
              </span>
            </div>
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="rounded-full bg-[#d6c5f0]/10 px-3 py-1 text-xs font-medium text-[#d6c5f0]">
                  {getCategory(featured, FALLBACK_CATEGORIES[0])}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(featured.publishedAt) || 'Recently published'}
                </span>
              </div>
              <h2 className="mt-5 text-3xl font-bold leading-tight group-hover:text-[#d6c5f0] lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-300">
                {featured.summary ||
                  'A featured long-form story from the editorial desk covering the latest reporting and analysis.'}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#d6c5f0]">
                Read full article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Latest articles</h2>
          <span className="text-sm text-slate-400">{rest.length} stories</span>
        </div>
        {rest.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, index) => (
              <Link
                key={post.id}
                href={`/articles/${post.slug}`}
                className="group overflow-hidden rounded-2xl bg-[#15151c] transition-transform hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <ContentImage
                    src={getImage(post)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#d6c5f0] px-3 py-1 text-xs font-semibold text-[#1c1530]">
                    {getCategory(post, FALLBACK_CATEGORIES[index % FALLBACK_CATEGORIES.length])}
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
                      'A short summary of this article with key takeaways and context for readers.'}
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
          <p className="mt-8 text-slate-400">No articles available yet.</p>
        )}
      </section>

      <Footer />
    </div>
  )
}
