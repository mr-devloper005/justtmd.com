import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-white">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1440px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
            <h1 className="mt-5 max-w-2xl text-5xl font-semibold leading-[0.94] tracking-[-0.08em] sm:text-6xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/72">{pagesContent.auth.login.description}</p>
          </div>
          <div className="rounded-[2.5rem] border border-white/12 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.05em]">{pagesContent.auth.login.formTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-white/60">Use your email and password to continue.</p>
            <div className="mt-6">
              <EditableLocalLoginForm />
            </div>
            <p className="mt-5 text-sm text-white/65">New here? <Link href="/signup" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
