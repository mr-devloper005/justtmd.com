'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const footerVars = {
  '--editable-footer-bg': 'rgba(4, 17, 26, 0.92)',
  '--editable-footer-text': '#f5fbff',
  '--editable-footer-border': 'rgba(255, 255, 255, 0.12)',
} as CSSProperties

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)

  return (
    <footer style={footerVars} className="border-t border-[var(--editable-footer-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
              <span>
                <span className="block text-xl font-black tracking-[-0.05em]">{SITE_CONFIG.name}</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">{globalContent.footer?.tagline || SITE_CONFIG.tagline}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.26em] text-white/45">Browse</h3>
            <div className="mt-4 grid gap-2">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="inline-flex items-center justify-between gap-3 rounded-2xl border border-[var(--editable-footer-border)] bg-white/5 px-4 py-3 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white">
                  <span>{task.label}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.26em] text-white/45">Site</h3>
            <div className="mt-4 grid gap-2">
              {[
                ['About', '/about'],
                ['Search', '/search'],
                ['Contact', '/contact'],
                ...(session ? [['Create', '/create']] : []),
              ].map(([label, href]) => (
                <Link key={href} href={href} className="rounded-2xl border border-[var(--editable-footer-border)] bg-white/5 px-4 py-3 text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white">
                  {label}
                </Link>
              ))}
              {session ? (
                <button type="button" onClick={logout} className="rounded-2xl border border-[var(--editable-footer-border)] bg-white/5 px-4 py-3 text-left text-sm font-bold text-white/80 transition hover:bg-white/10 hover:text-white">
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--editable-footer-border)] pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>{globalContent.footer?.bottomNote || SITE_CONFIG.description}</p>
        </div>
      </div>
    </footer>
  )
}
