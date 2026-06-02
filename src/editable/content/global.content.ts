import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Curated bookmarks and useful pages',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'Browse', href: '/sbm' },
      { label: 'Articles', href: '/articles' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start browsing', href: '/' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: '',
    description: 'A premium discovery surface for bookmarks, posts, profiles, listings, images, and reference material.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/articles' },
          { label: 'Listings', href: '/listings' },
          { label: 'Images', href: '/image-sharing' },
          { label: 'PDF Library', href: '/pdf' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery, fast browsing, and flexible layouts.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
