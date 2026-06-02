import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { TaskPostCard } from '@/components/shared/task-post-card'
import {
  ArticleListCard,
  CompactIndexCard,
  EditorialFeatureCard,
  ImageFirstCard,
  MiniStatusCard,
  RailPostCard,
  getEditableExcerpt,
  getEditablePostImage,
  postHref,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
  quickReadPosts?: SitePost[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function pickHeadline(primaryTask: TaskKey) {
  return pagesContent.home.hero.title.join(' ') || `Browse ${taskLabel(primaryTask)} with a premium rhythm.`
}

function HeroCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-[2rem] border border-white/12 bg-white/7 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:grid-cols-[0.88fr_1.12fr]">
      <div className="relative min-h-[240px] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <h3 className="mt-3 line-clamp-3 text-2xl font-semibold leading-tight tracking-[-0.05em] text-white">{post.title}</h3>
        <p className="mt-4 line-clamp-4 text-sm leading-7 text-white/65">{getEditableExcerpt(post, 140)}</p>
      </div>
    </Link>
  )
}

function FeatureStack({ posts, hrefs }: { posts: SitePost[]; hrefs: string[] }) {
  return (
    <div className="grid items-start gap-4">
      {posts.slice(0, 3).map((post, index) => (
        <Link key={post.id} href={hrefs[index]} className="group rounded-[1.7rem] border border-white/12 bg-white/6 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/10">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1.2rem] bg-[var(--slot4-media-bg)]">
              <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="min-w-0">
              <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-tight tracking-[-0.04em] text-white">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65">{getEditableExcerpt(post, 95)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

function MetricCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/12 bg-white/7 p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-white/62">{note}</p>
    </div>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroPost = posts[0]
  const supportPosts = posts.slice(1, 4)
  const heroHref = heroPost ? postHref(primaryTask, heroPost, primaryRoute) : primaryRoute
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <img
          src={heroPost ? getEditablePostImage(heroPost) : '/placeholder.svg?height=1400&width=2400'}
          alt=""
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,17,26,0.72)_0%,rgba(4,17,26,0.54)_38%,rgba(4,17,26,0.92)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 pb-28 pt-14 sm:px-6 lg:px-8 lg:pb-36 lg:pt-20">
        <div className="max-w-4xl">
          <p className={`${dc.type.eyebrow} text-[var(--slot4-accent)]`}>{pagesContent.home.hero.badge}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.08em] text-white sm:text-6xl lg:text-[5.6rem]">
            {pickHeadline(primaryTask)}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            {pagesContent.home.hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryRoute} className={dc.button.primary}>
              {pagesContent.home.hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/search" className={dc.button.secondary}>
              Search the archive
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.75fr)]">
          {heroPost ? <EditorialFeatureCard post={heroPost} href={heroHref} label={pagesContent.home.hero.featureCardBadge} /> : null}
          <div className="grid gap-4">
            <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <MetricCard title="Curated shelf" value={`${posts.length}`} note="Mixed content is surfaced from the live feed and arranged into premium cards." />
              <MetricCard title="Fast browse" value="One flow" note="Search, categories, and task routes stay connected for easier scanning." />
            </div>
            {supportPosts.length ? <FeatureStack posts={supportPosts} hrefs={supportPosts.map((post) => postHref(primaryTask, post, primaryRoute))} /> : null}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-14 left-1/2 z-10 w-[min(92vw,1200px)] -translate-x-1/2 lg:-bottom-16">
        <div className="grid gap-4 rounded-[2rem] border border-white/12 bg-[rgba(7,30,45,0.92)] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:grid-cols-3">
          <MiniStatusCard title="Quick access" body="Open the archive, jump to a task, or search by keyword from the top of the site." />
          <MiniStatusCard title="Luxury feel" body="Deep navy backgrounds, aqua highlights, and measured spacing keep the interface elevated." />
          <MiniStatusCard title="Responsive rhythm" body="The layout keeps its proportions on smaller screens without collapsing into a basic template." />
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 8)
  if (!railPosts.length) return null
  return (
    <section className="bg-[var(--slot4-page-bg)] pt-20">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`${dc.type.eyebrow} text-[var(--slot4-accent)]`}>Featured shelf</p>
            <h2 className={`${dc.type.sectionTitle} mt-3 text-white`}>A row of posts built for quick scanning.</h2>
          </div>
          <Link href={primaryRoute} className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
            View all {taskLabel(primaryTask).toLowerCase()}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className={`${dc.layout.rail} mt-8`}>
          {railPosts.map((post, index) => (
            <RailPostCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, quickReadPosts = [] }: HomeSectionProps) {
  if (!posts.length) return null
  const quickReads = quickReadPosts.slice(0, 4)
  const sbmRoute = SITE_CONFIG.taskViews.sbm || '/sbm'
  return (
    <section className="bg-[linear-gradient(180deg,#f5fbff_0%,#e5fbfa_100%)] text-[#082033]">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-start">
          <div className="rounded-[2.4rem] border border-[#093c5d]/12 bg-white p-6 shadow-[0_24px_70px_rgba(4,17,26,0.08)] sm:p-8">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#3b7597]">{pagesContent.home.intro.badge}</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.07em] sm:text-5xl">
              {pagesContent.home.intro.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#335063]">
              {pagesContent.home.intro.paragraphs[0]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryRoute} className={dc.button.accent}>
                {pagesContent.home.intro.primaryLink.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-[#093c5d]/15 px-6 py-3.5 text-sm font-black text-[#093c5d] transition hover:-translate-y-0.5">
                {pagesContent.home.intro.secondaryLink.label}
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <MetricCard title="Focus" value="Bookmarks" note="Useful references and saved pages stay at the center of the interface." />
              <MetricCard title="Style" value="Premium" note="Luxury color and card variety keep the layout visually distinct." />
            </div>
          </div>
          <div className="rounded-[2.4rem] border border-[#093c5d]/12 bg-[linear-gradient(180deg,#fffaf3_0%,#ffffff_100%)] p-6 shadow-[0_24px_70px_rgba(4,17,26,0.06)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#3b7597]">Quick reads</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.06em] text-[#082033]">
                  Fresh SBM links worth opening next.
                </h3>
              </div>
              <Link href={sbmRoute} className="inline-flex items-center gap-2 rounded-full border border-[#093c5d]/12 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#093c5d] transition hover:-translate-y-0.5">
                Open SBM
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#335063]">
              A live shelf of social bookmarking posts in a compact browse style, similar to the search results feel.
            </p>
            <div className="mt-6 grid gap-3">
              {quickReads.length ? (
                quickReads.map((post) => (
                  <TaskPostCard
                    key={post.id}
                    post={post}
                    href={postHref('sbm', post, sbmRoute)}
                    taskKey="sbm"
                    compact
                  />
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-[#093c5d]/15 bg-white/70 p-5 text-sm text-[#335063]">
                  No SBM posts are available yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const groupedPosts = timeSections.flatMap((section) => section.posts)
  const leftPosts = (groupedPosts.length ? groupedPosts : posts.slice(8)).slice(0, 4)
  const feature = leftPosts[0] || posts[0]
  const supporting = leftPosts.slice(1, 4)
  const lowerPosts = posts.slice(10, 16)
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
          <div className="overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/6 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
          <img
            src={feature ? getEditablePostImage(feature) : '/placeholder.svg?height=1200&width=1400'}
            alt={feature?.title || 'Featured preview'}
            className="h-full min-h-[380px] w-full object-cover"
          />
        </div>

        <div>
          <p className={`${dc.type.eyebrow} text-[var(--slot4-accent)]`}>{pagesContent.home.cta.badge}</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[0.98] tracking-[-0.07em] text-white sm:text-5xl">
            {pagesContent.home.cta.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
            {pagesContent.home.cta.description}
          </p>

          <div className="mt-8 grid items-start gap-4 sm:grid-cols-2">
            {supporting.map((post, index) => (
              <CompactIndexCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} hideMeta />
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-white/12 bg-white/7 p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <MetricCard title="Members" value="Live" note="Routes and cards keep the browsing flow active across the site." />
              <MetricCard title="Format" value="Mixed" note="Editorial, list, and image-first cards appear where they fit best." />
              <MetricCard title="Access" value="Fast" note="The navigation keeps supported routes visible and easy to reach." />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.4rem] border border-white/12 bg-[linear-gradient(135deg,rgba(9,60,93,0.95),rgba(59,117,151,0.86))] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-10">
            <p className={`${dc.type.eyebrow} text-white/55`}>Member testimonials</p>
            <h3 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.06em] text-white sm:text-4xl">
              A polished interface that makes useful pages feel worth returning to.
            </h3>
            <div className="mt-8 grid gap-4">
              {[
                {
                  name: 'Sarah T.',
                  quote: 'The layout feels premium and direct. I can jump between sections without getting lost.',
                },
                {
                  name: 'Eric S.',
                  quote: 'The card variety keeps the archive interesting without making the page feel busy.',
                },
                {
                  name: 'Bret D.',
                  quote: 'It reads like a real destination rather than a generic site shell.',
                },
              ].map((item) => (
                <div key={item.name} className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5">
                  <p className="text-sm leading-7 text-white/76">{item.quote}</p>
                  <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid items-start gap-4 sm:grid-cols-2">
            {lowerPosts.slice(0, 4).map((post, index) => (
              <ImageFirstCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} hideMeta />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="border-t border-white/12 bg-[linear-gradient(135deg,#093c5d_0%,#0b4b71_40%,#3b7597_100%)]">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 rounded-[2.4rem] border border-white/12 bg-white/8 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-10">
          <div>
            <p className={`${dc.type.eyebrow} text-[var(--slot4-accent)]`}>Join the flow</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.07em] text-white sm:text-5xl">
              Browse the archive, save the best links, and move through the site with ease.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              {pagesContent.home.cta.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/search" className={dc.button.primary}>
              Browse now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className={dc.button.secondary}>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
