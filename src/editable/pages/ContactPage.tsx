'use client'

import { Bookmark, Link2, Users } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const laneIcons = [Bookmark, Link2, Users]
  const lanes = pagesContent.contact.lanes.map((lane, index) => ({ ...lane, icon: laneIcons[index] }))

  return (
    <EditableSiteShell className="bg-[linear-gradient(180deg,#061826_0%,#0a2434_100%)]">
      <main className="bg-[var(--slot4-page-bg)] text-white">
        <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.94] tracking-[-0.08em] sm:text-6xl">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.8rem] border border-white/12 bg-white/6 p-5">
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <h2 className="mt-3 text-xl font-semibold tracking-[-0.04em]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/68">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-white/12 bg-white/6 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">{pagesContent.contact.formTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">{pagesContent.contact.formDescription}</p>
            <div className="mt-6">
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
