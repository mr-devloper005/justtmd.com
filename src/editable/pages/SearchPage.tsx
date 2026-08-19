import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const cleanSummary = (value: string) => value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const summaryOf = (post: SitePost) => cleanSummary(post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || '')

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

const categoryPresets = [
  'Business',
  'Health',
  'Technology',
  'Finance',
  'Lifestyle',
  'Education',
  'Travel',
  'Food',
]

function SearchResultCard({ post }: { post: SitePost }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const summary = summaryOf(post)

  return (
    <Link href={href} className="group flex h-full min-h-[220px] flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white/6 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h2 className="mt-4 line-clamp-3 text-2xl font-semibold leading-[0.96] tracking-[-0.06em] text-white">{post.title}</h2>
        {summary ? <p className="mt-4 line-clamp-4 text-sm leading-7 text-white/72">{summary}</p> : null}
        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/60 transition group-hover:text-[var(--slot4-accent)]">
            Open result
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-white">
        <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 rounded-[2.6rem] border border-white/12 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.94] tracking-[-0.08em] sm:text-6xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/72">{pagesContent.search.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {categoryPresets.map((item) => (
                  <Link
                    key={item}
                    href={`/search?category=${encodeURIComponent(item.toLowerCase())}${query ? `&q=${encodeURIComponent(query)}` : ''}${task ? `&task=${encodeURIComponent(task)}` : ''}`}
                    className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/72 transition hover:bg-white/12 hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <form action="/search" className="self-end rounded-[2.2rem] border border-white/12 bg-white/6 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-[1.5rem] border border-white/12 bg-white/8 px-4 py-3">
                <Search className="h-5 w-5 text-white/50" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-white/35" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-[1.5rem] border border-white/12 bg-white/8 px-4 py-3">
                  <Filter className="h-4 w-4 text-white/50" />
                  <input name="category" defaultValue={category} placeholder="Category, e.g. business" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-white/35" />
                </label>
                <select name="task" defaultValue={task} className="rounded-[1.5rem] border border-white/12 bg-white px-4 py-3 text-sm font-black text-[#082033] outline-none" style={{ color: '#082033', backgroundColor: '#ffffff' }}>
                  <option value="" style={{ color: '#082033', backgroundColor: '#ffffff' }}>All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key} style={{ color: '#082033', backgroundColor: '#ffffff' }}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[1.5rem] bg-[linear-gradient(135deg,#6fd1d7,#5df8d8)] px-6 text-sm font-black uppercase tracking-[0.18em] text-[#082033] transition hover:-translate-y-0.5" type="submit">
                Search
              </button>
            </form>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/45">{results.length} results</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em]">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10">
              Browse latest
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {results.length ? (
            <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post) => <SearchResultCard key={post.id || post.slug} post={post} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-white/16 bg-white/6 p-10 text-center">
              <p className="text-2xl font-semibold tracking-[-0.04em]">No matching posts found.</p>
              <p className="mt-3 text-sm leading-7 text-white/60">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
