export const siteMock = {
  name: 'DropOfHope',
  tagline: 'Every drop makes a difference',
  logo: null, // /logo.png
    nav: [
    { label: 'Home', to: '/' },
    { label: 'Donor Registration', to: '/donor-registration' },
    { label: 'Camp Registration', to: '/camp-registration' },
    { label: 'About Us', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Gallery', to: '/gallery' },
  ],
  cta: { label: 'Donate', to: '/donate' },
    notices: [
    { id: 1, text: 'Urgent: O- blood needed at City Hospital. Please contact immediately.' },
    { id: 2, text: 'Next blood donation camp: 15th December, Community Hall.' },
    { id: 3, text: 'Register as a donor today and save a life.' },
  ],
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
    eyebrow: 'Join our life-saving community',
    title: 'Your one drop of blood can give',
    highlight: 'someone a second life',
    subtitle:
      'Become a voluntary blood donor or join our upcoming camps. Together we connect donors with those who need blood the most, quickly and safely.',
    primaryCta: { label: 'Become a Donor', to: '/donor-registration' },
    secondaryCta: { label: 'Join a Camp', to: '/camp-registration' },
    image: '/hero.jpg', 
    imageAlt: 'Blood donation',
    badge: { value: '12K+', label: 'Lives touched' },
    points: ['Free registration', 'Safe & verified camps', 'Available 24/7'],
  },
    quickLinks: [
    { id: 1, label: 'Register as a Donor', icon: 'UserPlus', to: '/donor-registration' },
    { id: 2, label: 'Organize a Blood Camp', icon: 'Tent', to: '/organize-camp' },
    { id: 3, label: 'Find a Doctor', icon: 'Stethoscope', to: '/find-doctor' },
    { id: 4, label: 'Request Blood for Patient', icon: 'Droplet', to: '/request-blood' },
    { id: 5, label: 'Download Certificate', icon: 'FileDown', to: '/download-certificate' },
    { id: 6, label: 'Join as a Member', icon: 'Users', to: '/join-member' },
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