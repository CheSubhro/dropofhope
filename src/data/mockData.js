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

export const campPageMock = {
  hero: {
    title: 'Organize a Blood Camp',
    subtitle: 'Bring your community together to save lives. Tell us about your camp and our team will get in touch.',
  },
  orgTypes: ['Club', 'College / School', 'Company / Office', 'NGO', 'Religious Organization', 'Other'],
  districts: [
    'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling',
    'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda',
    'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur',
    'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur',
  ],
  facilities: ['Electricity', 'Drinking water', 'Toilet', 'Seating area', 'Fan / Air conditioning', 'Parking'],
  steps: [
    { id: 1, title: 'Apply', text: 'Fill in the form with your organization and camp details.' },
    { id: 2, title: 'Review', text: 'Our team checks the details and may call you to confirm.' },
    { id: 3, title: 'Confirm', text: 'We confirm the date and assign a medical team.' },
    { id: 4, title: 'Camp Day', text: 'We set up, collect blood and provide certificates to donors.' },
  ],
  checklist: [
    'A clean, well-ventilated hall or room',
    'Space for registration, screening, donation and rest',
    'Promotion among members at least a week before',
    'A few volunteers to guide donors on the day',
  ],
  faq: [
    { id: 1, q: 'How many donors do we need?', a: 'We suggest at least 30 expected donors so the medical team visit is worthwhile.' },
    { id: 2, q: 'Is there any cost to organize a camp?', a: 'No. You only provide the venue and volunteers. Please confirm details with our team.' },
    { id: 3, q: 'How early should we apply?', a: 'Apply at least 2 to 3 weeks before your preferred date.' },
    { id: 4, q: 'Will donors get certificates?', a: 'Yes, every donor can download a certificate from our website after the camp.' },
  ],
}


export const aboutPageMock = {
  hero: {
    eyebrow: 'Get to know us',
    title: 'About DropOfHope',
    subtitle:
      'A community-driven voluntary blood donation network connecting compassionate donors with people who need blood.',
    breadcrumb: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: null },
    ],
  },

  story: {
    eyebrow: 'Who We Are',
    title: 'Every Drop Has a Story. Every Donor Makes a Difference.',
    paragraphs: [
      'DropOfHope is a community-driven voluntary blood donation platform built on the belief that no life should be lost because of a shortage of blood.',
      'We connect willing blood donors with patients in need, organize community blood donation camps and encourage people to become regular voluntary donors.',
      'Our mission is to build a compassionate network where technology, community participation and humanity come together to save lives.',
    ],
    image: '/about/story.jpg',
    imageAlt: 'DropOfHope volunteers working together',
    badge: 'Together We Save Lives',
  },

  mission: {
    eyebrow: 'Our Mission',
    title: 'Making Blood Available When It Matters Most',
    description:
      'To build a reliable and accessible voluntary blood donation network that connects donors with patients, supports hospitals and promotes safe blood donation.',
    icon: 'Target',
  },

  vision: {
    eyebrow: 'Our Vision',
    title: 'A World Where No One Waits for Blood',
    description:
      'To create a society where every eligible individual understands the importance of blood donation and every patient can access blood when needed.',
    icon: 'Eye',
  },

  values: [
    {
      id: 1,
      title: 'Humanity',
      description: 'Putting human lives and dignity first.',
      icon: 'HeartHandshake',
    },
    {
      id: 2,
      title: 'Transparency',
      description: 'Building trust through honest actions.',
      icon: 'ShieldCheck',
    },
    {
      id: 3,
      title: 'Compassion',
      description: 'Standing beside people in difficult times.',
      icon: 'HandHeart',
    },
    {
      id: 4,
      title: 'Quick Response',
      description: 'Connecting donors and patients without delay.',
      icon: 'Zap',
    },
  ],

  services: [
    {
      id: 1,
      title: 'Donor Registration',
      description:
        'Register yourself as a voluntary blood donor and become part of our life-saving community.',
      icon: 'UserPlus',
      link: { label: 'Register Now', to: '/donor-registration' },
    },
    {
      id: 2,
      title: 'Blood Camps',
      description:
        'Bring your community together by organizing safe and meaningful blood donation camps.',
      icon: 'Tent',
      link: { label: 'Organize a Camp', to: '/organize-camp' },
    },
    {
      id: 3,
      title: 'Emergency Blood Request',
      description:
        'Help patients connect with suitable blood donors during emergency situations.',
      icon: 'Droplet',
      link: { label: 'Request Blood', to: '/request-blood' },
    },
    {
      id: 4,
      title: 'Donor Certificates',
      description:
        'Recognize and appreciate the contribution of voluntary blood donors.',
      icon: 'Award',
      link: { label: 'Get Certificate', to: '/download-certificate' },
    },
  ],

  timeline: [
    {
      id: 1,
      year: '2022',
      title: 'The Beginning',
      description:
        'The idea of building a community-driven blood donation network was born.',
      icon: 'Lightbulb',
    },
    {
      id: 2,
      year: '2023',
      title: 'First Blood Camp',
      description:
        'Our first community blood donation initiative brought volunteers together.',
      icon: 'Users',
    },
    {
      id: 3,
      year: '2024',
      title: 'Growing Community',
      description:
        'More donors and volunteers joined our mission to support patients in need.',
      icon: 'TrendingUp',
    },
    {
      id: 4,
      year: '2025',
      title: 'Expanding Our Reach',
      description:
        'We continued expanding our donor network and community partnerships.',
      icon: 'Globe',
    },
  ],

  team: [
    {
      id: 1,
      group: 'Founders',
      name: 'Founder Name',
      role: 'Founder & President',
      bio: 'Leading the vision of building a community that saves lives.',
      image: '/about/team/member1.jpg',
    },
    {
      id: 2,
      group: 'Founders',
      name: 'Co-Founder Name',
      role: 'Co-Founder',
      bio: 'Building meaningful connections between donors and patients.',
      image: '/about/team/member2.jpg',
    },
    {
      id: 3,
      group: 'Core Committee',
      name: 'Member Name',
      role: 'Operations Coordinator',
      bio: 'Managing daily operations and community activities.',
      image: '/about/team/member3.jpg',
    },
    {
      id: 4,
      group: 'Core Committee',
      name: 'Member Name',
      role: 'Volunteer Coordinator',
      bio: 'Supporting and coordinating our volunteer community.',
      image: '/about/team/member4.jpg',
    },
    {
      id: 5,
      group: 'Volunteers',
      name: 'Volunteer Name',
      role: 'Community Volunteer',
      bio: 'Helping spread awareness about voluntary blood donation.',
      image: '/about/team/member5.jpg',
    },
    {
      id: 6,
      group: 'Volunteers',
      name: 'Volunteer Name',
      role: 'Camp Volunteer',
      bio: 'Supporting blood donation camps and community initiatives.',
      image: '/about/team/member6.jpg',
    },
  ],

  partners: [
    {
      id: 1,
      name: 'City General Hospital',
      logo: '/about/partners/partner1.png',
    },
    {
      id: 2,
      name: 'Community Health Center',
      logo: '/about/partners/partner2.png',
    },
    {
      id: 3,
      name: 'Life Care Hospital',
      logo: '/about/partners/partner3.png',
    },
    {
      id: 4,
      name: 'Social Welfare Foundation',
      logo: '/about/partners/partner4.png',
    },
  ],

  cta: {
    eyebrow: 'Be Someone’s Hope',
    title: 'Your One Small Step Can Save a Life.',
    description:
      'Join our mission. Become a voluntary blood donor or bring your community together by organizing a blood donation camp.',
    primaryCta: {
      label: 'Become a Donor',
      to: '/donor-registration',
    },
    secondaryCta: {
      label: 'Organize a Camp',
      to: '/organize-camp',
    },
  },
}
