export const siteMock = {
  name: 'DropOfHope',
  tagline: 'Every drop makes a difference',
  logo: null,
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#featured' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Get Started', href: '#contact' },
  footer: {
    tagline: 'A short description of your brand goes here.',
    columns: [
      { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }] },
      { title: 'Resources', links: [{ label: 'Blog', href: '#' }, { label: 'Help Center', href: '#' }] },
      { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
    ],
  },
}

export const homeMock = {
  hero: {
    eyebrow: 'New · Version 1.0',
    title: 'A clear headline that explains your value',
    subtitle:
      'Supporting text that describes what you offer in one or two sentences. Replace this with your own message.',
    primaryCta: { label: 'Get Started', href: '#featured' },
    secondaryCta: { label: 'Learn More', href: '#testimonials' },
  },
  stats: [
    { id: 1, label: 'Active Users', value: '12K+' },
    { id: 2, label: 'Items Published', value: '350+' },
    { id: 3, label: 'Countries', value: '24' },
    { id: 4, label: 'Satisfaction', value: '98%' },
  ],
  featured: {
    title: 'Featured Items',
    subtitle: 'A short line introducing this section.',
    items: Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      title: `Featured Item ${i + 1}`,
      description: 'A brief description of this item, kept to two or three lines.',
      category: ['General', 'Popular', 'New'][i % 3],
      image: null, // later: a real URL from the API
      href: `/items/${i + 1}`,
    })),
  },
  testimonials: [
    { id: 1, quote: 'This is a placeholder testimonial that shows how real feedback will look.', author: 'Jane Doe', role: 'Customer' },
    { id: 2, quote: 'Another placeholder quote. Short, specific and believable works best.', author: 'John Smith', role: 'Partner' },
    { id: 3, quote: 'A third example so the grid has a balanced three-column layout.', author: 'Alex Kumar', role: 'Member' },
  ],
}