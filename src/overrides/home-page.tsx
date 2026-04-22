import Link from 'next/link'
import { ArrowRight, Calendar, Download } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const FALLBACK_IMAGE = 'https://picsum.photos/seed/press-hero/1400/900'

const FALLBACK_CATEGORIES = ['Funding', 'Partnership', 'Expansion', 'Product', 'Award', 'Launch']

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

export async function HomePageOverride() {
  const articles = await fetchTaskPosts('article', 12, { allowMockFallback: true, fresh: true })
  const featured = articles[0]
  const latest = articles.slice(1, 7)

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      <NavbarShell />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <ContentImage
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
            alt="Press"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#5b3b8e]/85 via-[#3d2566]/80 to-[#0b0b10]/95" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:py-32 lg:px-8">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur">
            Press &amp; Media
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Latest News &amp; Updates
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200">
            Stay informed with our latest announcements, product launches, and company milestones. Find press
            releases, media kits, and contact information for media inquiries.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white">Featured Release</h2>
        {featured ? (
          <div className="mt-8 grid gap-0 overflow-hidden rounded-2xl bg-[#15151c] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative h-72 lg:h-auto">
              <ContentImage src={getImage(featured)} alt={featured.title} fill className="object-cover" />
            </div>
            <div className="p-8 lg:p-10">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="h-4 w-4" />
                {formatDate(featured.publishedAt) || 'Recently published'}
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white lg:text-3xl">{featured.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {featured.summary ||
                  'A featured update from our editorial desk covering the latest milestones, product news, and announcements.'}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/articles/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#d6c5f0] px-5 py-2.5 text-sm font-semibold text-[#1c1530] hover:bg-[#c4b1e8]"
                >
                  Read Full Release
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
                >
                  <Download className="h-4 w-4" />
                  Browse all
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-slate-400">No featured release available right now.</p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white">Latest Press Release</h2>
        <p className="mt-2 text-sm text-slate-400">Browse our recent announcements and company updates.</p>
        {latest.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post, index) => {
              const category = getCategory(post, FALLBACK_CATEGORIES[index % FALLBACK_CATEGORIES.length])
              return (
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
                      {category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(post.publishedAt) || 'Recently published'}
                    </div>
                    <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-white group-hover:text-[#d6c5f0]">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                      {post.summary ||
                        'A short summary of this press release with key takeaways and announcement context.'}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d6c5f0]">
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="mt-6 text-slate-400">No press releases available yet.</p>
        )}

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#3d2566] to-[#5b3b8e] p-10 text-center">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">Media Inquiries</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-200">
            For press requests, interviews, or media partnerships, our team is here to help. Reach out and we&apos;ll
            get back to you shortly.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1530] hover:bg-slate-100"
          >
            Contact Press Team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Suppress unused-name warnings if any
void SITE_CONFIG
