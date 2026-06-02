import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-white">
        <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <article className="rounded-[2.6rem] border border-white/12 bg-white/6 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.94] tracking-[-0.08em] sm:text-6xl">{pagesContent.about.title} {SITE_CONFIG.name}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">{pagesContent.about.description}</p>
            <div className="mt-8 grid gap-4 text-sm leading-7 text-white/70">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="grid gap-4">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className="rounded-[2rem] border border-white/12 bg-white/6 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">0{index + 1}</p>
                  <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,#6fd1d7,#5df8d8)]" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/68">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
