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
    tagline: 'Be the reason someone smiles tomorrow. Donate blood, save lives.',
        contact: {
      phone: '+91 98765 43210',
      email: 'info@dropofhope.org',
      address: 'City Center, Durgapur, West Bengal, India',
    },
    socials: [
      { id: 1, name: 'Facebook', href: 'https://facebook.com' },
      { id: 2, name: 'Instagram', href: 'https://instagram.com' },
      { id: 3, name: 'WhatsApp', href: 'https://wa.me/919876543210' },
    ],
    legal: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/terms' },
    ],
    columns: [
      {
        title: 'Quick Links',
        links: [
          { label: 'Home', to: '/' },
          { label: 'About Us', to: '/about' },
          { label: 'Blog', to: '/blog' },
          { label: 'Gallery', to: '/gallery' },
        ],
      },
      {
        title: 'Get Involved',
        links: [
          { label: 'Donor Registration', to: '/donor-registration' },
          { label: 'Camp Registration', to: '/camp-registration' },
          { label: 'Request Blood', to: '/request-blood' },
          { label: 'Join as a Member', to: '/join-member' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Find a Doctor', to: '/find-doctor' },
          { label: 'Download Certificate', to: '/download-certificate' },
          { label: 'Organize a Blood Camp', to: '/organize-camp' },
          { label: 'Donate', to: '/donate' },
        ],
      },
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
    aboutSection: {
    image: {
      src: '/hero.jpg', 
      alt: 'Our team',
      title: "Who's Who",
      subtitle: 'The people behind every connection.',
      link: { label: 'Meet the team', to: '/about' },
    },
    about: {
      title: 'About DropOfHope',
      text: 'DropOfHope is a community-driven voluntary blood donation platform. We bridge the gap between willing donors and patients in urgent need—organizing safe donation drives and ensuring every drop saves a life.At DropOfHope, we believe no life should be lost waiting for blood. As a dedicated voluntary donor network, we connect compassionate everyday heroes with patients during critical moments, host safe community blood camps, and turn every single donation into a second chance at life.',
      link: { label: 'Read more about us', to: '/about' },
    },
    slider: {
      title: 'Our Stories',
      link: { label: 'View gallery', to: '/gallery' },
      slides: [
        { id: 1, title: 'Donation camp success', text: '120 units collected in one day.', image:'/hero.jpg' },
        { id: 2, title: 'Emergency response', text: 'Matched donors in under an hour.', image:'/hero.jpg' },
        { id: 3, title: 'Volunteer drive', text: 'New members joined this month.', image:'/hero.jpg' },
      ],
    },
  },
    features: {
    title: 'Features',
    subtitle: 'Everything happening in our community, in one place.',
    camps: {
      title: 'Upcoming Blood Camps',
      link: { label: 'View all camps', to: '/camp-registration' },
      items: [
        { id: 1, name: 'City Community Hall Camp', day: '05', month: 'Dec', time: '9:00 AM - 3:00 PM', location: 'City Community Hall', to: '/camp-registration' },
        { id: 2, name: 'University Blood Drive', day: '15', month: 'Dec', time: '10:00 AM - 4:00 PM', location: 'Main University Campus', to: '/camp-registration' },
        { id: 3, name: 'Winter Donation Camp', day: '28', month: 'Dec', time: '9:30 AM - 2:30 PM', location: 'Town Library Ground', to: '/camp-registration' },
      ],
    },
    requests: {
      title: 'Urgent Blood Requests',
      link: { label: 'View all requests', to: '/request-blood' },
      items: [
        { id: 1, group: 'O-', patient: 'Patient A', units: 2, hospital: 'City General Hospital', location: 'Durgapur', to: '/request-blood' },
        { id: 2, group: 'B+', patient: 'Patient B', units: 3, hospital: 'Medical College Hospital', location: 'Durgapur', to: '/request-blood' },
        { id: 3, group: 'A+', patient: 'Patient C', units: 1, hospital: 'Care Nursing Home', location: 'Asansol', to: '/request-blood' },
      ],
    },
    feed: {
      title: 'Social Feed',
      link: { label: 'Read our blog', to: '/blog' },
      items: [
        { id: 1, author: 'DropOfHope', time: '2h ago', text: 'Thank you to everyone who donated at last weekend\'s camp. 120 units collected!', likes: 245 },
        { id: 2, author: 'DropOfHope', time: '1d ago', text: 'Reminder: you can donate blood every 3 months. Register as a donor today.', likes: 132 },
        { id: 3, author: 'DropOfHope', time: '3d ago', text: 'Meet our new volunteers who joined this month. Welcome to the family!', likes: 98 },
      ],
    },
  },
    impact: {
    title: 'Our Impact So Far',
    items: [
      { id: 1, value: 12500, label: 'Registered Donors', icon: 'Users' },
      { id: 2, value: 8300, label: 'Units of Blood', icon: 'Droplet' },
      { id: 3, value: 45, label: 'Partner Hospitals', icon: 'Hospital' },
      { id: 4, value: 20, label: 'CSR Partners', icon: 'Handshake' },
      { id: 5, value: 18, label: 'Districts Covered', icon: 'MapPinned' },
    ],
  },
    testimonials: {
    title: 'Voices of Our Community',
    subtitle: 'Hear from donors, recipients and partners.',
    items: [
      {
        id: 1,
        quote: 'Donating blood took less than an hour, and knowing it can save a life made it the best hour of my month.',
        author: 'Rahul S.',
        role: 'Regular Donor',
        bloodGroup: 'O+',
        location: 'Durgapur',
        rating: 5,
        image: null,
      },
      {
        id: 2,
        quote: 'When my father needed blood urgently, DropOfHope found a donor within hours. We are forever grateful.',
        author: 'Priya D.',
        role: 'Patient\'s Family',
        bloodGroup: null,
        location: 'Asansol',
        rating: 5,
        image: null,
      },
      {
        id: 3,
        quote: 'Organizing our college blood camp was easy. The team handled everything from registration to certificates.',
        author: 'Amit K.',
        role: 'Camp Organizer',
        bloodGroup: null,
        location: 'Durgapur',
        rating: 4,
        image: null,
      },
    ],
  },
}

export const donorPageMock = {
  hero: {
    title: 'Become a Blood Donor',
    subtitle: 'Fill in the form below. Your one donation can save up to three lives.',
  },
  bloodGroups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  districts: [
    'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling',
    'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda',
    'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur',
    'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur',
  ],
  eligibility: [
    'Age between 18 and 65 years',
    'Weight 45 kg or more',
    'Hemoglobin 12.5 g/dL or more',
    'At least 3 months since your last donation',
    'No fever, infection or serious illness at present',
  ],
  faq: [
    { id: 1, q: 'Will I feel weak after donating blood?', a: 'Most people feel fine. Rest for a few minutes, drink water and eat something light. Your body replaces the donated blood within days.' },
    { id: 2, q: 'How long does a donation take?', a: 'The donation itself takes about 10 to 15 minutes. With registration and rest, plan for around 45 minutes.' },
    { id: 3, q: 'How often can I donate?', a: 'You can donate whole blood once every 3 months.' },
    { id: 4, q: 'Is my personal information safe?', a: 'Your details are used only to connect you with patients in need and are never sold or shared for any other purpose.' },
  ],
}