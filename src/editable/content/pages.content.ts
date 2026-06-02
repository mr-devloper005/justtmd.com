import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Premium bookmarking and curated discovery',
      description: 'Explore bookmarks, articles, visuals, profiles, and resources through a refined browsing experience.',
      openGraphTitle: 'Premium bookmarking and curated discovery',
      openGraphDescription: 'Discover useful pages, bookmarked resources, and mixed content in a polished premium layout.',
      keywords: ['bookmarking', 'curated discovery', 'useful pages', 'content library'],
    },
    hero: {
      badge: '',
      title: ['A polished home for', 'bookmarks, posts, and discovery.'],
      description: 'Browse standout posts, useful resources, and mixed content through a layered layout designed for quick scanning and premium presentation.',
      primaryCta: { label: 'Browse latest', href: '/search' },
      secondaryCta: { label: 'View topics', href: '/articles' },
      searchPlaceholder: 'Search bookmarks, topics, and resources',
      focusLabel: 'Browse',
      featureCardBadge: 'featured shelf',
      featureCardTitle: 'Fresh picks sit above the fold in a richer visual system.',
      featureCardDescription: 'The homepage mixes large featured moments with smaller discovery cards so browsing feels quick and premium.',
    },
    intro: {
      badge: 'About the site',
      title: 'Built for browsing, saving, and moving between different kinds of content.',
      paragraphs: [
        'The layout keeps posts, resources, and featured pages connected so visitors can move naturally from one discovery to the next.',
        'Large visuals, clear labels, and strong spacing make the site feel premium without making it harder to scan.',
        'Each section is tuned to support fast browsing, deeper reading, and more confident navigation across the archive.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Luxury-inspired palette with navy, teal, and aqua accents.',
        'Multiple card styles for featured, compact, list, and image-led browsing.',
        'Clear navigation that keeps the supported routes easy to reach.',
        'Responsive layouts that stay polished on mobile and desktop.',
      ],
      primaryLink: { label: 'Browse archive', href: '/sbm' },
      secondaryLink: { label: 'Explore about', href: '/about' },
    },
    cta: {
      badge: 'Start browsing',
      title: 'Explore useful pages through one connected premium layout.',
      description: 'Move between bookmarks, articles, profiles, listings, and resources through a cleaner visual system.',
      primaryCta: { label: 'Open search', href: '/search' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest entries in this section.',
    },
  },
  about: {
    badge: 'Our story',
    title: 'A calmer, more premium way to browse useful content.',
    description: `${slot4BrandConfig.siteName} is built to make bookmarks, posts, and supporting resources feel connected and easy to explore.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the site keeps related content easy to move through and easy to understand.',
      'Whether someone starts with a bookmark, article, listing, image post, or resource page, they can keep exploring without losing context.',
    ],
    values: [
      {
        title: 'Premium pacing',
        description: 'We prioritize clarity, spacing, and structure so people can browse without noise.',
      },
      {
        title: 'Connected surfaces',
        description: 'Articles, visuals, listings, resources, profiles, and bookmarks stay connected across the site.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We keep navigation clean and page structure clear so visitors can find useful content faster.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A support page that feels like part of the site.',
    description: 'Tell us what you are trying to publish, update, or improve. We will route it through the right lane instead of forcing every request into one bucket.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find bookmarks, posts, visuals, and resources faster.',
      description: 'Use keywords, categories, and content types to discover posts from every active section of the site.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Member access',
      title: 'Login to create new content.',
      description: 'Use your account to open the publishing workspace and create posts for the active sections of this site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose the content type, add details, and prepare a clean post with images, links, summary, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your browsing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start browsing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
