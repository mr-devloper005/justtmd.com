import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, Building2, Camera, FileText, Filter, LayoutGrid, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, BookmarkCard, CompactIndexCard, EditorialFeatureCard, FigureCard, ImageFirstCard, postHref } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskAccent: Record<TaskKey, { icon: typeof FileText; label: string; note: string; color: string }> = {
  article: { icon: FileText, label: 'Editorial', note: 'Readable posts and guides', color: 'from-[#6fd1d7] to-[#5df8d8]' },
  listing: { icon: Building2, label: 'Directory', note: 'Business and service listings', color: 'from-[#3b7597] to-[#6fd1d7]' },
  classified: { icon: Megaphone, label: 'Notice', note: 'Fast updates and offers', color: 'from-[#093c5d] to-[#3b7597]' },
  image: { icon: Camera, label: 'Gallery', note: 'Visual-first discovery', color: 'from-[#5df8d8] to-[#6fd1d7]' },
  sbm: { icon: Bookmark, label: 'Bookmark', note: 'Saved resources and links', color: 'from-[#093c5d] to-[#6fd1d7]' },
  pdf: { icon: FileText, label: 'Document', note: 'Files and reference material', color: 'from-[#3b7597] to-[#5df8d8]' },
  profile: { icon: UserRound, label: 'Profile', note: 'People and identities', color: 'from-[#6fd1d7] to-[#5df8d8]' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const meta = taskAccent[task]
  const Icon = meta.icon
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const featured = posts.slice(0, 1)[0]
  const leadPosts = posts.slice(1, 4)
  const gridPosts = posts.slice(4)
  const archiveVars = {
    '--archive-border': 'rgba(255,255,255,0.12)',
  } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--slot4-page-bg)] text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(111,209,215,0.16),transparent_34%),linear-gradient(180deg,rgba(4,17,26,0.68),rgba(4,17,26,0.94))]" />
          <div className="relative mx-auto grid max-w-[1440px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/70">
                <Icon className="h-4 w-4" />
                {taskConfig?.label || task}
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.08em] sm:text-6xl lg:text-[4.8rem]">
                {voice.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
                {voice.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={basePath} className={dc.button.primary}>
                  Browse all
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/search" className={dc.button.secondary}>
                  Search the archive
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {voice.chips.map((chip) => (
                  <span key={chip} className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/72">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2.4rem] border border-white/12 bg-white/7 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Refine results</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">Find the right subset quickly.</h2>
                </div>
                <div className={`rounded-2xl bg-[linear-gradient(135deg,#6fd1d7,#5df8d8)] p-3 text-[#082033]`}>
                  <LayoutGrid className="h-5 w-5" />
                </div>
              </div>
              <form action={basePath} className="mt-6 grid gap-4">
                <label className="flex items-center gap-3 rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-3">
                  <Search className="h-4 w-4 text-white/50" />
                  <input name="q" placeholder="Search is available on the main search page" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-white/35" disabled />
                </label>
                <label className="flex items-center gap-3 rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-3">
                  <Filter className="h-4 w-4 text-white/50" />
                  <select name="category" defaultValue={category} className="min-w-0 flex-1 rounded-[1.25rem] border border-white/12 bg-white px-4 py-3 text-sm font-bold text-[#082033] outline-none" style={{ color: '#082033', backgroundColor: '#ffffff' }}>
                    <option value="all" style={{ color: '#082033', backgroundColor: '#ffffff' }}>All categories</option>
                    {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug} style={{ color: '#082033', backgroundColor: '#ffffff' }}>{item.name}</option>)}
                  </select>
                </label>
                <button className={dc.button.accent} type="submit">
                  Apply filter
                </button>
              </form>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">Showing</p>
                  <p className="mt-2 text-sm font-bold">{categoryLabel}</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">Page</p>
                  <p className="mt-2 text-sm font-bold">{pagination.page} of {pagination.totalPages || 1}</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/12 bg-white/8 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">Posts</p>
                  <p className="mt-2 text-sm font-bold">{posts.length}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {featured ? (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <EditorialFeatureCard post={featured} href={postHref(task, featured, basePath)} label={`Featured ${meta.label.toLowerCase()}`} />
              <div className="grid gap-4">
                <div className="rounded-[2.2rem] border border-white/12 bg-white/7 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{voice.eyebrow}</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.06em]">{voice.secondaryNote}</h2>
                  <p className="mt-4 text-sm leading-7 text-white/68">
                    {SITE_CONFIG.description}
                  </p>
                </div>
                {leadPosts.map((post, index) => (
                  <CompactIndexCard key={post.id} post={post} href={postHref(task, post, basePath)} index={index} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {gridPosts.map((post, index) => {
              const href = postHref(task, post, basePath)
              if (task === 'sbm') return <BookmarkCard key={post.id} post={post} href={href} />
              if (task === 'image') return <ImageFirstCard key={post.id} post={post} href={href} index={index} />
              if (task === 'listing') return <ArticleListCard key={post.id} post={post} href={href} index={index} />
              if (task === 'classified') return <CompactIndexCard key={post.id} post={post} href={href} index={index} />
              if (task === 'pdf') return <FigureCard key={post.id} post={post} href={href} />
              if (task === 'profile') return <FigureCard key={post.id} post={post} href={href} />
              return <ArticleListCard key={post.id} post={post} href={href} index={index} />
            })}
          </div>

          {!posts.length ? (
            <div className="mt-10 rounded-[2rem] border border-dashed border-white/16 bg-white/6 p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-white/40" />
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm leading-7 text-white/64">Try another category or refresh this page after publishing new content.</p>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? (
              <Link href={pageHref(basePath, category, pagination.page - 1)} className="rounded-full border border-white/12 bg-white/7 px-5 py-3 text-sm font-black text-white transition hover:bg-white/12">
                Previous
              </Link>
            ) : null}
            <span className="rounded-full bg-[linear-gradient(135deg,#6fd1d7,#5df8d8)] px-5 py-3 text-sm font-black text-[#082033]">
              Page {pagination.page} of {pagination.totalPages || 1}
            </span>
            {pagination.hasNextPage ? (
              <Link href={pageHref(basePath, category, pagination.page + 1)} className="rounded-full border border-white/12 bg-white/7 px-5 py-3 text-sm font-black text-white transition hover:bg-white/12">
                Next
              </Link>
            ) : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
