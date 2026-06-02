import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#061826',
  '--slot4-page-text': '#f5fbff',
  '--slot4-panel-bg': '#0a2434',
  '--slot4-surface-bg': '#0d3146',
  '--slot4-muted-text': '#9cc1d3',
  '--slot4-soft-muted-text': '#7ba1b8',
  '--slot4-accent': '#6fd1d7',
  '--slot4-accent-fill': '#5df8d8',
  '--slot4-accent-soft': 'rgba(111, 209, 215, 0.16)',
  '--slot4-dark-bg': '#04111a',
  '--slot4-dark-text': '#f5fbff',
  '--slot4-media-bg': '#173a53',
  '--slot4-cream': '#edf8fb',
  '--slot4-warm': '#0b2738',
  '--slot4-lavender': '#12344c',
  '--slot4-gray': '#08202f',
  '--slot4-body-gradient': 'radial-gradient(circle at top left, rgba(111, 209, 215, 0.14), transparent 30%), radial-gradient(circle at 80% 15%, rgba(93, 248, 216, 0.12), transparent 26%), linear-gradient(180deg, #061826 0%, #071e2d 54%, #05131f 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-white/12',
  darkBorder: 'border-white/12',
  shadow: 'shadow-[0_18px_48px_rgba(0,0,0,0.18)]',
  shadowStrong: 'shadow-[0_28px_90px_rgba(0,0,0,0.28)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(4,17,26,0.08),rgba(4,17,26,0.74))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen overflow-x-clip ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center',
    rail: 'flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[220px] shrink-0 snap-start sm:w-[250px]',
    magazineGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-12',
    splitRail: 'grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.26em]',
    heroTitle: 'text-4xl font-semibold leading-[0.96] tracking-[-0.07em] sm:text-5xl lg:text-[4.5rem]',
    sectionTitle: 'text-3xl font-semibold leading-tight tracking-[-0.06em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#6fd1d7_0%,#5df8d8_100%)] px-6 py-3.5 text-sm font-black text-[#082033] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(93,248,216,0.28)]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-black text-white/90 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/12`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#093c5d_0%,#3b7597_100%)] px-6 py-3.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(9,60,93,0.3)]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.5rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.26)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all shared screens consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so the homepage can be redesigned in one place.',
  'Use wide readable grids and avoid skinny text columns.',
  'Use horizontal rails and varied card treatments for dense browsing.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
