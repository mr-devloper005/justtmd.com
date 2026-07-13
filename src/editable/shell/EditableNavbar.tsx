'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, Menu, Search, X, UserPlus } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const rootVars: CSSProperties = {
  '--editable-nav-bg': 'rgba(4, 17, 26, 0.72)',
  '--editable-nav-text': '#f5fbff',
  '--editable-nav-border': 'rgba(255, 255, 255, 0.12)',
  '--editable-nav-search': 'rgba(255, 255, 255, 0.06)',
  '--editable-nav-chip': 'rgba(255, 255, 255, 0.08)',
  '--editable-nav-chip-active': '#5df8d8',
  '--editable-nav-chip-active-text': '#082033',
  '--editable-nav-cta': '#5df8d8',
  '--editable-nav-cta-text': '#082033',
} as CSSProperties

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function EditableNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'Bookmark', href: '/sbm' },
    ],
    []
  )
  const mobileItems = useMemo(
    () => [
      ...navItems,
      { label: 'Search', href: '/search' },
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/signup' },
    ],
    [navItems]
  )

  return (
    <header style={rootVars} className="sticky top-0 z-50 border-b border-[var(--editable-nav-border)] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] backdrop-blur-2xl">
      <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-9 w-9 object-contain" />
            <span className="leading-tight">
              <span className="block text-lg font-black tracking-[-0.05em]">{SITE_CONFIG.name}</span>
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    active ? 'bg-[var(--editable-nav-chip-active)] text-[var(--editable-nav-chip-active-text)]' : 'bg-[var(--editable-nav-chip)] text-white/80 hover:bg-white/12 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/search" className="ml-2 inline-flex items-center gap-2 rounded-full border border-[var(--editable-nav-border)] bg-white/5 px-4 py-2 text-sm font-bold text-white/85 transition hover:bg-white/10">
              <Search className="h-4 w-4" />
              Search
            </Link>
          </nav>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-nav-border)] bg-white/5 px-4 py-2.5 text-sm font-black text-white/82 transition hover:bg-white/10">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[var(--editable-nav-cta)] px-4 py-2.5 text-sm font-black text-[var(--editable-nav-cta-text)] transition hover:-translate-y-0.5">
              <UserPlus className="h-4 w-4" />
              Register
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--editable-nav-border)] bg-white/6 text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {open ? (
        <div className="border-t border-[var(--editable-nav-border)] bg-[rgba(4,17,26,0.95)] px-4 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.32)] md:hidden">
          <div className="grid gap-2">
            {mobileItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-[1.2rem] border px-4 py-3 text-sm font-bold transition ${
                  isActive(pathname, item.href) ? 'border-white/18 bg-white text-[#082033]' : 'border-[var(--editable-nav-border)] bg-white/5 text-white/85 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
