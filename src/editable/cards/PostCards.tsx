import Link from 'next/link'
import { ArrowRight, Clock3, ExternalLink, FileText, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

const PLACEHOLDER_IMAGE = '/placeholder.svg?height=900&width=1400'

export function getEditablePostImage(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const single = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => content[key]).find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || contentImage || single || PLACEHOLDER_IMAGE
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category.trim()) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[520px] p-6 sm:p-8 lg:min-h-[640px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,17,26,0.05),rgba(4,17,26,0.86))]" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end lg:min-h-[560px]">
          <h3 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.07em] text-white sm:text-5xl lg:text-6xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/76 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#082033] transition group-hover:-translate-y-0.5">
            Open story
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block ${dc.layout.minRailCard} overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className={`${dc.media.frame} aspect-[4/5]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,17,26,0.02),rgba(4,17,26,0.66))]" />
      </div>
      <div className="p-5">
        <h3 className="mt-3 line-clamp-3 text-xl font-semibold leading-tight tracking-[-0.05em] text-white">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/65">{getEditableExcerpt(post, 115)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index, hideMeta = false, tone = 'dark' }: { post: SitePost; href: string; index: number; hideMeta?: boolean; tone?: 'dark' | 'light' }) {
  const textTone = tone === 'light' ? 'text-[#082033]' : 'text-white'
  const mutedTone = tone === 'light' ? 'text-[#335063]' : 'text-white/62'
  const metaTone = tone === 'light' ? 'text-[#3b7597]/70' : 'text-white/55'
  return (
    <Link href={href} className={`group flex gap-4 rounded-[1.6rem] border ${pal.border} bg-white/6 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_20px_70px_rgba(0,0,0,0.22)]`}>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6fd1d7,#5df8d8)] text-sm font-black text-[#082033]">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        {hideMeta ? null : <p className={`${dc.type.eyebrow} ${metaTone}`}>{getEditableCategory(post)}</p>}
        <h3 className={`mt-2 line-clamp-2 text-lg font-semibold leading-tight tracking-[-0.04em] ${textTone}`}>{post.title}</h3>
        <p className={`mt-2 line-clamp-2 text-sm leading-6 ${mutedTone}`}>{getEditableExcerpt(post, 95)}</p>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index, hideMeta = false, tone = 'dark' }: { post: SitePost; href: string; index: number; hideMeta?: boolean; tone?: 'dark' | 'light' }) {
  const textTone = tone === 'light' ? 'text-[#082033]' : 'text-white'
  const mutedTone = tone === 'light' ? 'text-[#335063]' : 'text-white/65'
  const metaTone = tone === 'light' ? 'text-[#3b7597]' : 'text-[var(--slot4-accent)]'
  const storyTone = tone === 'light' ? 'border-[#093c5d]/12 bg-white/80 text-[#082033]' : 'border-white/16 bg-black/25 text-white'
  return (
    <Link href={href} className={`group grid min-w-0 gap-4 overflow-hidden ${dc.surface.card} p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(0,0,0,0.26)] sm:grid-cols-[240px_minmax(0,1fr)]`}>
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[var(--slot4-media-bg)] aspect-[16/11] sm:aspect-auto">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,17,26,0.03),rgba(4,17,26,0.62))]" />
        {hideMeta ? null : (
          <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur ${storyTone}`}>
            Story {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>
      <div className="min-w-0 p-1 sm:p-3">
        {hideMeta ? null : <p className={`${dc.type.eyebrow} ${metaTone}`}>{getEditableCategory(post)}</p>}
        <h2 className={`mt-3 line-clamp-3 text-2xl font-semibold leading-tight tracking-[-0.05em] ${textTone} sm:text-[2rem]`}>{post.title}</h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${mutedTone}`}>{getEditableExcerpt(post, 180)}</p>
        <span className={`mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)] ${hideMeta ? 'opacity-0' : ''}`}>
          Open article
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function ImageFirstCard({ post, href, index, hideMeta = false, tone = 'dark' }: { post: SitePost; href: string; index: number; hideMeta?: boolean; tone?: 'dark' | 'light' }) {
  const textTone = tone === 'light' ? 'text-[#082033]' : 'text-white'
  const mutedTone = tone === 'light' ? 'text-[#335063]' : 'text-white/72'
  const metaTone = tone === 'light' ? 'text-[#3b7597]' : 'text-white/70'
  const labelTone = tone === 'light' ? 'bg-[#082033] text-white' : 'bg-white text-[#082033]'
  return (
    <Link href={href} className={`group block overflow-hidden rounded-[2rem] border ${pal.border} bg-white/6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.26)]`}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,17,26,0.02),rgba(4,17,26,0.78))]" />
        {hideMeta ? null : <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${labelTone}`}>Visual {String(index + 1).padStart(2, '0')}</div>}
        <div className={`absolute bottom-0 left-0 right-0 p-5 ${textTone}`}>
          {hideMeta ? null : <p className={`${dc.type.eyebrow} ${metaTone}`}>{getEditableCategory(post)}</p>}
          <h3 className={`mt-2 line-clamp-3 text-2xl font-semibold leading-tight tracking-[-0.05em] ${textTone}`}>{post.title}</h3>
          <p className={`mt-3 line-clamp-3 text-sm leading-7 ${mutedTone}`}>{getEditableExcerpt(post, 125)}</p>
        </div>
      </div>
    </Link>
  )
}

export function BookmarkCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group flex flex-col rounded-[1.8rem] border ${pal.border} bg-white/6 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_24px_70px_rgba(0,0,0,0.22)]`}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/65">Saved link</span>
        <ExternalLink className="h-4 w-4 text-white/55" />
      </div>
      <h3 className="mt-6 line-clamp-3 text-xl font-semibold leading-tight tracking-[-0.04em] text-white">{post.title}</h3>
      <p className="mt-3 line-clamp-4 text-sm leading-7 text-white/64">{getEditableExcerpt(post, 145)}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
        Open resource
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  )
}

export function DetailMetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
      <div className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">{label}</div>
      <div className="mt-1 text-sm font-bold text-white/84">{value}</div>
    </div>
  )
}

export function InlineReadMore({ href, label = 'Read more' }: { href: string; label?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)] transition hover:gap-3">
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

export function MiniStatusCard({ title, body }: { title: string; body: string }) {
  return (
    <div className={`rounded-[1.5rem] border ${pal.border} bg-white/6 p-5`}>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
        <Clock3 className="h-4 w-4" />
        {title}
      </div>
      <p className="mt-3 text-sm leading-7 text-white/68">{body}</p>
    </div>
  )
}

export function FigureCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden rounded-[2rem] border ${pal.border} bg-white/6 transition duration-300 hover:-translate-y-1`}>
      <div className="relative aspect-[16/12] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-tight tracking-[-0.04em] text-white">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/68">{getEditableExcerpt(post, 120)}</p>
      </div>
    </Link>
  )
}
