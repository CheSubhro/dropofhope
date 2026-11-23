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


export const blogPageMock = {
  hero: {
    eyebrow: 'Our Blog',
    title: 'Stories That Inspire. Knowledge That Saves Lives.',
    subtitle:
      'Explore blood donation awareness, donor stories, health tips and updates from our community.',
  },

  categories: [
    { id: 'all', name: 'All' },
    { id: 'awareness', name: 'Awareness' },
    { id: 'donor-stories', name: 'Donor Stories' },
    { id: 'camp-updates', name: 'Camp Updates' },
    { id: 'health-tips', name: 'Health Tips' },
    { id: 'news', name: 'News' },
  ],

  posts: [
    {
      id: 1,
      slug: 'why-donating-blood-is-important',
      title: 'Why Donating Blood Is More Important Than Ever',
      excerpt:
        'A single blood donation can help save multiple lives. Discover why regular voluntary blood donation matters.',
      content: [
        'Blood is one of the most important resources in healthcare. Patients undergoing surgeries, accident victims and people living with certain medical conditions may need blood transfusions to survive.',
        'Unlike many medical resources, blood cannot be manufactured. It depends entirely on voluntary donors who are willing to help others.',
        'Regular voluntary blood donation helps hospitals maintain a stable blood supply. It also ensures that patients can receive the support they need during emergencies.',
        'By becoming a regular donor, you become part of a community that gives hope to people during their most difficult moments.',
      ],
      category: 'Awareness',
      image: '/blog/blood-donation-awareness.jpg',
      author: 'DropOfHope Team',
      date: '2026-10-15',
      readTime: '4 min read',
      featured: true,
    },
    {
      id: 2,
      slug: 'one-donation-three-lives',
      title: 'One Donation, The Possibility of Saving Three Lives',
      excerpt:
        'Learn how donated blood components can support different patients with different medical needs.',
      content: [
        'A whole blood donation can be separated into different components, such as red blood cells, plasma and platelets.',
        'These components may be used for different patients depending on their medical needs and the availability of suitable products.',
        'This is one reason why voluntary blood donation plays such an important role in healthcare.',
      ],
      category: 'Awareness',
      image: '/blog/three-lives.jpg',
      author: 'Health Desk',
      date: '2026-10-08',
      readTime: '3 min read',
      featured: false,
    },
    {
      id: 3,
      slug: 'my-first-blood-donation-experience',
      title: 'My First Blood Donation: A Story of Courage',
      excerpt:
        'A first-time donor shares how a simple decision became a meaningful experience.',
      content: [
        'I had always wanted to donate blood, but I kept postponing it because I was nervous.',
        'When I finally visited a donation camp, the volunteers explained the process and answered my questions. Their support helped me feel comfortable.',
        'The experience was simpler than I had imagined. More importantly, I left knowing that I had taken a small step to help someone else.',
      ],
      category: 'Donor Stories',
      image: '/blog/first-donation.jpg',
      author: 'A DropOfHope Donor',
      date: '2026-09-28',
      readTime: '3 min read',
      featured: false,
    },
    {
      id: 4,
      slug: 'community-blood-donation-camp',
      title: 'Bringing Communities Together Through Blood Donation Camps',
      excerpt:
        'Community-led blood donation camps help spread awareness and encourage more people to become donors.',
      content: [
        'A community blood donation camp is more than an event. It is an opportunity to bring people together for a shared purpose.',
        'Well-organized camps help eligible donors learn about the donation process and connect with authorized blood collection teams.',
        'Planning, awareness, coordination and proper medical supervision are essential for a successful camp.',
      ],
      category: 'Camp Updates',
      image: '/blog/community-camp.jpg',
      author: 'Camp Coordination Team',
      date: '2026-09-18',
      readTime: '4 min read',
      featured: false,
    },
    {
      id: 5,
      slug: 'prepare-for-blood-donation',
      title: 'How to Prepare Yourself Before Donating Blood',
      excerpt:
        'A few simple preparation tips can help make your donation experience more comfortable.',
      content: [
        'Before donating blood, make sure you are feeling well and follow the instructions provided by the blood donation team.',
        'Have a balanced meal, drink enough water and get adequate rest. Avoid arriving at a donation session on an empty stomach.',
        'Always answer the screening questions honestly. The medical team will assess your eligibility and guide you through the process.',
        'If you are unsure whether you can donate, consult the authorized medical staff rather than relying on assumptions.',
      ],
      category: 'Health Tips',
      image: '/blog/donation-preparation.jpg',
      author: 'Health Desk',
      date: '2026-09-10',
      readTime: '5 min read',
      featured: false,
    },
    {
      id: 6,
      slug: 'blood-donation-myths',
      title: 'Common Blood Donation Myths You Should Stop Believing',
      excerpt:
        'Let us separate common misconceptions from reliable information about blood donation.',
      content: [
        'Misinformation can prevent eligible people from donating blood. Understanding the facts helps people make informed decisions.',
        'Donation eligibility depends on several factors, including age, health, haemoglobin level and other screening criteria set by the blood collection service.',
        'If you have questions about donation, speak to qualified medical staff at an authorized blood centre.',
      ],
      category: 'Awareness',
      image: '/blog/donation-myths.jpg',
      author: 'DropOfHope Team',
      date: '2026-08-30',
      readTime: '4 min read',
      featured: false,
    },
    {
      id: 7,
      slug: 'dropofhope-community-update',
      title: 'Growing Together: A DropOfHope Community Update',
      excerpt:
        'A look at the people, volunteers and community initiatives behind our mission.',
      content: [
        'Every community initiative begins with people who believe that small actions can make a meaningful difference.',
        'We continue to work towards connecting voluntary donors, spreading awareness and supporting community blood donation initiatives.',
        'Thank you to every donor, volunteer and supporter who contributes to this shared mission.',
      ],
      category: 'News',
      image: '/blog/community-update.jpg',
      author: 'DropOfHope Team',
      date: '2026-08-20',
      readTime: '3 min read',
      featured: false,
    },
    {
      id: 8,
      slug: 'understanding-blood-groups',
      title: 'Understanding Blood Groups and Compatibility',
      excerpt:
        'A beginner-friendly introduction to blood groups and why compatibility matters during transfusion.',
      content: [
        'Blood groups are commonly classified using the ABO and Rh systems. These classifications are important when selecting compatible blood for transfusion.',
        'A person should never assume that a blood unit is suitable based only on a general blood group chart. Compatibility testing and clinical procedures are essential.',
        'The hospital blood bank and qualified medical professionals determine the appropriate blood product for each patient.',
      ],
      category: 'Health Tips',
      image: '/blog/blood-groups.jpg',
      author: 'Health Desk',
      date: '2026-08-12',
      readTime: '5 min read',
      featured: false,
    },
    {
      id: 9,
      slug: 'volunteers-making-a-difference',
      title: 'The Volunteers Making a Difference Behind Every Camp',
      excerpt:
        'Meet the spirit of teamwork that helps community blood donation initiatives happen.',
      content: [
        'Behind every successful community event is a group of people working together.',
        'Volunteers help with awareness, registration support, coordination and guiding participants through the event.',
        'Their contribution helps create a welcoming environment and encourages more people to learn about voluntary donation.',
      ],
      category: 'Donor Stories',
      image: '/blog/volunteers.jpg',
      author: 'Community Team',
      date: '2026-08-05',
      readTime: '3 min read',
      featured: false,
    },
  ],
}



export const galleryPageMock = {
  hero: {
    eyebrow: 'Our Gallery',
    title: 'Moments That Make a Difference',
    subtitle:
      'Explore the memorable moments of our blood donation camps, donors, volunteers and community events.',
  },

  categories: [
    { id: 'all', name: 'All' },
    { id: 'blood-camps', name: 'Blood Camps' },
    { id: 'donors', name: 'Donors' },
    { id: 'volunteers', name: 'Volunteers' },
    { id: 'events', name: 'Events' },
    { id: 'awareness', name: 'Awareness' },
  ],

  photos: [
    {
      id: 1,
      src: '/gallery/camps/camp-01.jpg',
      thumb: '/gallery/camps/camp-01.jpg',
      title: 'Community Blood Donation Camp',
      caption: 'Volunteers and medical staff working together at a community blood donation camp.',
      category: 'blood-camps',
      album: 'Community Blood Camps',
      date: '2026-10-15',
    },
    {
      id: 2,
      src: '/gallery/donors/donor-01.jpg',
      thumb: '/gallery/donors/donor-01.jpg',
      title: 'A Donor, A Hero',
      caption: 'A voluntary donor taking a step towards saving lives.',
      category: 'donors',
      album: 'Our Donors',
      date: '2026-10-12',
    },
    {
      id: 3,
      src: '/gallery/volunteers/volunteer-01.jpg',
      thumb: '/gallery/volunteers/volunteer-01.jpg',
      title: 'Our Dedicated Volunteers',
      caption: 'The people behind every successful community initiative.',
      category: 'volunteers',
      album: 'Our Volunteers',
      date: '2026-10-10',
    },
    {
      id: 4,
      src: '/gallery/events/event-01.jpg',
      thumb: '/gallery/events/event-01.jpg',
      title: 'Community Awareness Event',
      caption: 'Spreading awareness about the importance of voluntary blood donation.',
      category: 'events',
      album: 'Community Events',
      date: '2026-10-08',
    },
    {
      id: 5,
      src: '/gallery/awareness/awareness-01.jpg',
      thumb: '/gallery/awareness/awareness-01.jpg',
      title: 'Every Drop Counts',
      caption: 'Encouraging people to understand the value of blood donation.',
      category: 'awareness',
      album: 'Awareness Campaigns',
      date: '2026-10-05',
    },
    {
      id: 6,
      src: '/gallery/camps/camp-02.jpg',
      thumb: '/gallery/camps/camp-02.jpg',
      title: 'A Successful Donation Drive',
      caption: 'A glimpse of a community-driven blood donation initiative.',
      category: 'blood-camps',
      album: 'Community Blood Camps',
      date: '2026-09-28',
    },
    {
      id: 7,
      src: '/gallery/donors/donor-02.jpg',
      thumb: '/gallery/donors/donor-02.jpg',
      title: 'Proud Voluntary Donor',
      caption: 'Celebrating the kindness of voluntary blood donors.',
      category: 'donors',
      album: 'Our Donors',
      date: '2026-09-25',
    },
    {
      id: 8,
      src: '/gallery/volunteers/volunteer-02.jpg',
      thumb: '/gallery/volunteers/volunteer-02.jpg',
      title: 'Teamwork Makes It Possible',
      caption: 'Our volunteers helping organize a donation initiative.',
      category: 'volunteers',
      album: 'Our Volunteers',
      date: '2026-09-20',
    },
    {
      id: 9,
      src: '/gallery/events/event-02.jpg',
      thumb: '/gallery/events/event-02.jpg',
      title: 'Together for a Cause',
      caption: 'Community members coming together for a meaningful cause.',
      category: 'events',
      album: 'Community Events',
      date: '2026-09-18',
    },
    {
      id: 10,
      src: '/gallery/awareness/awareness-02.jpg',
      thumb: '/gallery/awareness/awareness-02.jpg',
      title: 'Spread the Message',
      caption: 'Awareness initiatives that inspire more people to donate blood.',
      category: 'awareness',
      album: 'Awareness Campaigns',
      date: '2026-09-15',
    },
    {
      id: 11,
      src: '/gallery/camps/camp-03.jpg',
      thumb: '/gallery/camps/camp-03.jpg',
      title: 'Blood Donation in Action',
      caption: 'A supervised blood donation session.',
      category: 'blood-camps',
      album: 'Community Blood Camps',
      date: '2026-09-10',
    },
    {
      id: 12,
      src: '/gallery/donors/donor-03.jpg',
      thumb: '/gallery/donors/donor-03.jpg',
      title: 'The Gift of Giving',
      caption: 'A donor making a meaningful contribution to the community.',
      category: 'donors',
      album: 'Our Donors',
      date: '2026-09-05',
    },
    {
      id: 13,
      src: '/gallery/volunteers/volunteer-03.jpg',
      thumb: '/gallery/volunteers/volunteer-03.jpg',
      title: 'Volunteer Appreciation',
      caption: 'Recognizing the people who give their time to help others.',
      category: 'volunteers',
      album: 'Our Volunteers',
      date: '2026-08-28',
    },
    {
      id: 14,
      src: '/gallery/events/event-03.jpg',
      thumb: '/gallery/events/event-03.jpg',
      title: 'A Day of Community Service',
      caption: 'A memorable day dedicated to community service.',
      category: 'events',
      album: 'Community Events',
      date: '2026-08-25',
    },
    {
      id: 15,
      src: '/gallery/awareness/awareness-03.jpg',
      thumb: '/gallery/awareness/awareness-03.jpg',
      title: 'Know Before You Donate',
      caption: 'Sharing useful information about safe blood donation.',
      category: 'awareness',
      album: 'Awareness Campaigns',
      date: '2026-08-20',
    },
    {
      id: 16,
      src: '/gallery/camps/camp-04.jpg',
      thumb: '/gallery/camps/camp-04.jpg',
      title: 'Another Step Towards Hope',
      caption: 'A community blood donation camp supported by dedicated volunteers.',
      category: 'blood-camps',
      album: 'Community Blood Camps',
      date: '2026-08-15',
    },
    {
      id: 17,
      src: '/gallery/donors/donor-04.jpg',
      thumb: '/gallery/donors/donor-04.jpg',
      title: 'Celebrating Our Donors',
      caption: 'Every eligible donor contributes to a stronger blood donation community.',
      category: 'donors',
      album: 'Our Donors',
      date: '2026-08-10',
    },
    {
      id: 18,
      src: '/gallery/volunteers/volunteer-04.jpg',
      thumb: '/gallery/volunteers/volunteer-04.jpg',
      title: 'The Helping Hands',
      caption: 'Volunteers coordinating activities during a community initiative.',
      category: 'volunteers',
      album: 'Our Volunteers',
      date: '2026-08-05',
    },
    {
      id: 19,
      src: '/gallery/events/event-04.jpg',
      thumb: '/gallery/events/event-04.jpg',
      title: 'Together We Can Save Lives',
      caption: 'People joining hands to support voluntary blood donation.',
      category: 'events',
      album: 'Community Events',
      date: '2026-07-28',
    },
    {
      id: 20,
      src: '/gallery/awareness/awareness-04.jpg',
      thumb: '/gallery/awareness/awareness-04.jpg',
      title: 'Be the Reason Someone Smiles',
      caption: 'A reminder that a voluntary donation can bring hope to someone.',
      category: 'awareness',
      album: 'Awareness Campaigns',
      date: '2026-07-20',
    },
  ],

  cta: {
    eyebrow: 'Be Someone’s Hope',
    title: 'Become a Part of Our Life-Saving Community',
    description:
      'Your contribution can make a difference. Join our mission as a voluntary blood donor or organize a blood donation camp.',
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

export const donatePageMock = {
  hero: {
    eyebrow: 'MAKE A DIFFERENCE',
    title: 'Support Our Mission',
    subtitle:
      'Your contribution helps us organise blood donation camps, support emergencies and spread life-saving awareness.',
  },

  upi: {
    id: 'dropofhope@upi', // DEMO: replace with your verified UPI ID
    name: 'DropOfHope',
    currency: 'INR',
  },

  amounts: [
    {
      value: 100,
      label: '₹100',
      description: 'Help provide basic refreshments.',
    },
    {
      value: 250,
      label: '₹250',
      description: 'Support essential camp supplies.',
    },
    {
      value: 500,
      label: '₹500',
      description: 'Help arrange food and water for a camp.',
    },
    {
      value: 1000,
      label: '₹1,000',
      description: 'Support blood donation camp arrangements.',
    },
    {
      value: 2500,
      label: '₹2,500',
      description: 'Help organise community outreach activities.',
    },
  ],

  bank: {
    accountName: 'DropOfHope Organisation',
    accountNumber: '000000000000', // DEMO: replace before publishing
    ifsc: 'DEMO0000000', // DEMO: replace before publishing
    bankName: 'Your Bank Name',
    branch: 'Your Branch',
  },

  fundUsage: [
    {
      id: 1,
      title: 'Blood Donation Camps',
      percentage: 40,
      description:
        'Organising blood donation camps and providing essential camp facilities.',
      icon: 'heart-pulse',
    },
    {
      id: 2,
      title: 'Emergency Support',
      percentage: 30,
      description:
        'Helping people connect with blood donors during urgent situations.',
      icon: 'hand-heart',
    },
    {
      id: 3,
      title: 'Awareness Campaigns',
      percentage: 20,
      description:
        'Educating communities about voluntary blood donation.',
      icon: 'megaphone',
    },
    {
      id: 4,
      title: 'Operations',
      percentage: 10,
      description:
        'Supporting the essential activities required to run our organisation.',
      icon: 'building-2',
    },
  ],

  trust: {
    registrationNumber: 'To be updated',
    taxExemption: '',
    privacyUrl: '/privacy-policy',
    impact: [
      { value: '1,000+', label: 'Lives Impacted' },
      { value: '500+', label: 'Donors Connected' },
      { value: '50+', label: 'Camps Organised' },
    ],
  },

  faqs: [
    {
      question: 'Is my donation refundable?',
      answer:
        'Donations are generally voluntary contributions and are not refundable. Please contact our team if you believe a payment was made by mistake.',
    },
    {
      question: 'Will I receive a donation receipt?',
      answer:
        'After you submit your donation details, our team will verify the transaction and contact you regarding your receipt.',
    },
    {
      question: 'Can I claim tax benefits on my donation?',
      answer:
        'Tax benefits are not currently advertised. Please contact our team to confirm eligibility before making a donation for tax purposes.',
    },
    {
      question: 'Can I donate using a bank transfer?',
      answer:
        'Yes. You can use the bank transfer details provided on this page. Please submit your transaction details after completing the transfer.',
    },
  ],

  cta: {
    eyebrow: 'BE SOMEONE’S HOPE',
    title: 'Together, We Can Save More Lives',
    description:
      'Your support can help us reach more people and make voluntary blood donation accessible to everyone.',
    primaryCta: {
      label: 'Become a Donor',
      to: '/donor-registration',
    },
    secondaryCta: {
      label: 'Contact Us',
      to: '/contact',
    },
  },
}



const requestDistricts = [
  'Alipurduar',
  'Bankura',
  'Birbhum',
  'Cooch Behar',
  'Dakshin Dinajpur',
  'Darjeeling',
  'Hooghly',
  'Howrah',
  'Jalpaiguri',
  'Jhargram',
  'Kalimpong',
  'Kolkata',
  'Malda',
  'Murshidabad',
  'Nadia',
  'North 24 Parganas',
  'Paschim Bardhaman',
  'Paschim Medinipur',
  'Purba Bardhaman',
  'Purba Medinipur',
  'Purulia',
  'South 24 Parganas',
  'Uttar Dinajpur',
]

export const requestPageMock = {
  hero: {
    eyebrow: 'Emergency Blood Support',
    title: 'Request Blood for a Patient',
    subtitle:
      'Fill in the form below. Our team will help connect you with potential blood donors.',
  },

  helpline: {
    number: '+919876543210',
    display: '+91 98765 43210',
  },

  bloodGroups: [
    'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-',
  ],

  bloodTypes: [
    'Whole Blood',
    'Platelets',
    'Plasma',
    'Packed RBC',
  ],

  urgencyOptions: [
    { value: 'immediate', label: 'Immediately' },
    { value: '24-hours', label: 'Within 24 hours' },
    { value: '3-days', label: 'Within 3 days' },
    { value: 'scheduled', label: 'Scheduled date' },
  ],

  genders: ['Male', 'Female', 'Other'],

  relations: [
    'Self',
    'Family',
    'Friend',
    'Hospital staff',
  ],

  districts: requestDistricts,

  steps: [
    {
      id: 1,
      title: 'Submit Request',
      text: 'Complete the patient and hospital information.',
    },
    {
      id: 2,
      title: 'Verification',
      text: 'Our team reviews the submitted information.',
    },
    {
      id: 3,
      title: 'Notify Donors',
      text: 'Eligible donors may be informed about the request.',
    },
    {
      id: 4,
      title: 'Connect',
      text: 'The requester and interested donors can coordinate.',
    },
  ],

  compatibility: [
    { group: 'O-', canDonate: 'All blood groups', canReceive: 'O-' },
    { group: 'O+', canDonate: 'O+, A+, B+, AB+', canReceive: 'O-, O+' },
    { group: 'A-', canDonate: 'A-, A+, AB-, AB+', canReceive: 'O-, A-' },
    { group: 'A+', canDonate: 'A+, AB+', canReceive: 'O-, O+, A-, A+' },
    { group: 'B-', canDonate: 'B-, B+, AB-, AB+', canReceive: 'O-, B-' },
    { group: 'B+', canDonate: 'B+, AB+', canReceive: 'O-, O+, B-, B+' },
    { group: 'AB-', canDonate: 'AB-, AB+', canReceive: 'O-, A-, B-, AB-' },
    { group: 'AB+', canDonate: 'AB+', canReceive: 'All blood groups' },
  ],

  faq: [
    {
      id: 1,
      q: 'How quickly can I get a blood donor?',
      a: 'The response time depends on donor availability, blood group and location. We cannot guarantee a donor within a specific time.',
    },
    {
      id: 2,
      q: 'Is there any charge for submitting a request?',
      a: 'Submitting a request through our platform is free. Hospital and blood bank charges, if any, are separate.',
    },
    {
      id: 3,
      q: 'Do I need a replacement donor?',
      a: 'Requirements depend on the hospital and blood bank. Please confirm directly with the treating hospital.',
    },
    {
      id: 4,
      q: 'How can I cancel a request?',
      a: 'Contact our helpline and provide your request ID so our team can assist you.',
    },
  ],

  openRequests: [
    {
      id: 'REQ-100241',
      group: 'O-',
      units: 2,
      bloodType: 'Packed RBC',
      hospital: 'City General Hospital',
      district: 'Paschim Bardhaman',
      city: 'Durgapur',
      urgency: 'Immediately',
      createdAt: '2 hours ago',
      status: 'approved',
    },
    {
      id: 'REQ-100242',
      group: 'B+',
      units: 3,
      bloodType: 'Whole Blood',
      hospital: 'Medical College Hospital',
      district: 'Paschim Bardhaman',
      city: 'Asansol',
      urgency: 'Within 24 hours',
      createdAt: '5 hours ago',
      status: 'approved',
    },
    {
      id: 'REQ-100243',
      group: 'A+',
      units: 1,
      bloodType: 'Platelets',
      hospital: 'Care Nursing Home',
      district: 'Bankura',
      city: 'Bankura',
      urgency: 'Within 3 days',
      createdAt: '1 day ago',
      status: 'approved',
    },
  ],
}


export const memberPageMock = {
  hero: {
    eyebrow: 'BECOME A PART OF OUR MISSION',
    title: 'Join as a Member',
    subtitle:
      'Become an active part of the blood donation movement. Share your time, skills, and compassion to help save lives.',
  },

  benefits: [
    {
      id: 1,
      icon: 'HeartHandshake',
      title: 'Serve the Community',
      description:
        'Contribute to meaningful social work and help people in need through blood donation initiatives.',
    },
    {
      id: 2,
      icon: 'GraduationCap',
      title: 'Learn and Grow',
      description:
        'Develop teamwork, communication, leadership, and event coordination skills.',
    },
    {
      id: 3,
      icon: 'Award',
      title: 'Recognition',
      description:
        'Receive appreciation for your contribution, subject to the organisation’s membership policy.',
    },
    {
      id: 4,
      icon: 'Users',
      title: 'Build Connections',
      description:
        'Connect with volunteers and people who share the same passion for helping others.',
    },
  ],

  membershipTypes: [
    {
      id: 'volunteer',
      name: 'Volunteer',
      subtitle: 'Be an active volunteer',
      description:
        'Contribute your time to blood donation camps, donor coordination, awareness activities, and community support.',
      fee: 'Free',
      icon: 'HandHeart',
      features: [
        'Participate in blood donation camps',
        'Support donor coordination',
        'Join community awareness activities',
      ],
    },
    {
      id: 'associate',
      name: 'Associate Member',
      subtitle: 'Support the movement',
      description:
        'Help the organisation through awareness campaigns, outreach, communication, and other support activities.',
      fee: 'Free',
      icon: 'Handshake',
      features: [
        'Support awareness campaigns',
        'Help with outreach activities',
        'Contribute your professional skills',
      ],
    },
    {
      id: 'life',
      name: 'Life Member',
      subtitle: 'Make a long-term commitment',
      description:
        'Stay connected with the organisation and support its long-term mission and community initiatives.',
      fee: 'Free',
      icon: 'ShieldCheck',
      features: [
        'Long-term association',
        'Support organisational initiatives',
        'Participate in community programmes',
      ],
    },
  ],

  interests: [
    { value: 'Blood Camps', label: 'Blood Camps' },
    { value: 'Donor Awareness', label: 'Donor Awareness' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Fundraising', label: 'Fundraising' },
    { value: 'Emergency Response', label: 'Emergency Response' },
    { value: 'Photography/Design', label: 'Photography / Design' },
  ],

  hoursOptions: [
    { value: '1-2', label: '1–2 hours per week' },
    { value: '3-5', label: '3–5 hours per week' },
    { value: '6+', label: '6+ hours per week' },
  ],

  professions: [
    'Student',
    'Teacher',
    'Healthcare Professional',
    'Private Employee',
    'Government Employee',
    'Business Owner',
    'Self Employed',
    'Homemaker',
    'Other',
  ],

  genders: ['Male', 'Female', 'Other', 'Prefer not to say'],

  bloodGroups: requestPageMock.bloodGroups,

  districts: requestPageMock.districts,

  faqs: [
    {
      question: 'Do I have to donate blood to become a member?',
      answer:
        'No. You do not have to donate blood to become a member. You can contribute through volunteering, awareness activities, event support, and other skills.',
    },
    {
      question: 'Is there any membership fee?',
      answer:
        'No. All three membership categories are currently free. There is no membership fee at the time of application.',
    },
    {
      question: 'How much time do I need to contribute?',
      answer:
        'You can select the time you can realistically contribute each week. We understand that availability may vary depending on your schedule.',
    },
    {
      question: 'Will I receive a membership ID card?',
      answer:
        'Membership details and any ID card or certificate will be considered after your application is reviewed and approved, according to the organisation’s policy.',
    },
    {
      question: 'Can I choose more than one area of interest?',
      answer:
        'Yes. You can select multiple areas where you would like to contribute.',
    },
  ],
}


export const doctorPageMock = {
  hero: {
    eyebrow: 'DOCTOR DIRECTORY',
    title: 'Find a Doctor',
    subtitle:
      'Find doctors and medical specialists across West Bengal. Explore available information and contact them directly to confirm details.',
  },

  specialties: [
    'General Physician',
    'Cardiologist',
    'Hematologist',
    'Pediatrician',
    'Gynecologist',
    'Orthopedic',
    'General Surgeon',
    'Dermatologist',
    'Neurologist',
    'ENT Specialist',
    'Ophthalmologist',
    'Dentist',
  ],

  districts: [
    'Alipurduar',
    'Bankura',
    'Birbhum',
    'Cooch Behar',
    'Dakshin Dinajpur',
    'Darjeeling',
    'Hooghly',
    'Howrah',
    'Jalpaiguri',
    'Jhargram',
    'Kalimpong',
    'Kolkata',
    'Malda',
    'Murshidabad',
    'Nadia',
    'North 24 Parganas',
    'Paschim Bardhaman',
    'Paschim Medinipur',
    'Purba Bardhaman',
    'Purba Medinipur',
    'Purulia',
    'South 24 Parganas',
    'Uttar Dinajpur',
  ],

  languages: ['Bengali', 'Hindi', 'English'],

  genders: ['Male', 'Female', 'Other'],

  doctors: [
    {
      id: 1,
      name: 'Dr. Arindam Sen',
      qualification: 'MBBS, MD (Medicine)',
      specialty: 'General Physician',
      experience: '12 years',
      hospital: 'City Care Medical Centre',
      district: 'Kolkata',
      address: 'Central Kolkata, West Bengal',
      schedule: 'Mon–Sat, 5:00 PM–8:00 PM',
      fee: 600,
      languages: ['Bengali', 'English', 'Hindi'],
      gender: 'Male',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for a general physician. Contact and practice details must be verified before publication.',
    },
    {
      id: 2,
      name: 'Dr. Ananya Mukherjee',
      qualification: 'MBBS, MD (Cardiology)',
      specialty: 'Cardiologist',
      experience: '10 years',
      hospital: 'Heart Wellness Clinic',
      district: 'Howrah',
      address: 'Shibpur, Howrah, West Bengal',
      schedule: 'Mon–Fri, 4:00 PM–7:00 PM',
      fee: 800,
      languages: ['Bengali', 'English'],
      gender: 'Female',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for a cardiologist. Contact and practice details must be verified before publication.',
    },
    {
      id: 3,
      name: 'Dr. Sayan Chatterjee',
      qualification: 'MBBS, MD (Hematology)',
      specialty: 'Hematologist',
      experience: '9 years',
      hospital: 'Eastern Medical Institute',
      district: 'Kolkata',
      address: 'Salt Lake, Kolkata, West Bengal',
      schedule: 'Tue–Sat, 3:00 PM–6:00 PM',
      fee: 900,
      languages: ['Bengali', 'English', 'Hindi'],
      gender: 'Male',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for a hematologist. Contact and practice details must be verified before publication.',
    },
    {
      id: 4,
      name: 'Dr. Riya Ghosh',
      qualification: 'MBBS, MD (Pediatrics)',
      specialty: 'Pediatrician',
      experience: '8 years',
      hospital: 'Little Steps Child Clinic',
      district: 'Bankura',
      address: 'Bankura Town, West Bengal',
      schedule: 'Mon–Sat, 10:00 AM–1:00 PM',
      fee: 500,
      languages: ['Bengali', 'Hindi'],
      gender: 'Female',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for a pediatrician. Contact and practice details must be verified before publication.',
    },
    {
      id: 5,
      name: 'Dr. Debasish Roy',
      qualification: 'MBBS, MS (Orthopedics)',
      specialty: 'Orthopedic',
      experience: '15 years',
      hospital: 'Bone and Joint Care',
      district: 'Paschim Bardhaman',
      address: 'Asansol, West Bengal',
      schedule: 'Mon–Sat, 6:00 PM–9:00 PM',
      fee: 700,
      languages: ['Bengali', 'Hindi', 'English'],
      gender: 'Male',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for an orthopedic specialist. Contact and practice details must be verified before publication.',
    },
    {
      id: 6,
      name: 'Dr. Madhumita Das',
      qualification: 'MBBS, MS (Gynecology)',
      specialty: 'Gynecologist',
      experience: '11 years',
      hospital: 'Women Care Centre',
      district: 'Nadia',
      address: 'Krishnanagar, West Bengal',
      schedule: 'Mon–Fri, 11:00 AM–2:00 PM',
      fee: 650,
      languages: ['Bengali', 'English'],
      gender: 'Female',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for a gynecologist. Contact and practice details must be verified before publication.',
    },
    {
      id: 7,
      name: 'Dr. Soumik Banerjee',
      qualification: 'MBBS, MS (General Surgery)',
      specialty: 'General Surgeon',
      experience: '13 years',
      hospital: 'LifeLine Surgical Centre',
      district: 'Hooghly',
      address: 'Chinsurah, West Bengal',
      schedule: 'Mon–Sat, 5:00 PM–8:00 PM',
      fee: 750,
      languages: ['Bengali', 'English', 'Hindi'],
      gender: 'Male',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for a general surgeon. Contact and practice details must be verified before publication.',
    },
    {
      id: 8,
      name: 'Dr. Priyanka Saha',
      qualification: 'MBBS, MD (Dermatology)',
      specialty: 'Dermatologist',
      experience: '7 years',
      hospital: 'Skin Health Clinic',
      district: 'Darjeeling',
      address: 'Siliguri, West Bengal',
      schedule: 'Tue–Sun, 4:00 PM–7:00 PM',
      fee: 550,
      languages: ['Bengali', 'Hindi', 'English'],
      gender: 'Female',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for a dermatologist. Contact and practice details must be verified before publication.',
    },
    {
      id: 9,
      name: 'Dr. Amitava Dutta',
      qualification: 'MBBS, MD (Neurology)',
      specialty: 'Neurologist',
      experience: '14 years',
      hospital: 'Neuro Care Hospital',
      district: 'Murshidabad',
      address: 'Berhampore, West Bengal',
      schedule: 'Mon–Fri, 5:00 PM–8:00 PM',
      fee: 850,
      languages: ['Bengali', 'English'],
      gender: 'Male',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for a neurologist. Contact and practice details must be verified before publication.',
    },
    {
      id: 10,
      name: 'Dr. Ishita Paul',
      qualification: 'MBBS, MS (ENT)',
      specialty: 'ENT Specialist',
      experience: '6 years',
      hospital: 'Hearing and ENT Centre',
      district: 'Purba Medinipur',
      address: 'Tamluk, West Bengal',
      schedule: 'Mon–Sat, 3:00 PM–6:00 PM',
      fee: 500,
      languages: ['Bengali', 'English'],
      gender: 'Female',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for an ENT specialist. Contact and practice details must be verified before publication.',
    },
    {
      id: 11,
      name: 'Dr. Koushik Mitra',
      qualification: 'MBBS, MS (Ophthalmology)',
      specialty: 'Ophthalmologist',
      experience: '10 years',
      hospital: 'Vision Eye Centre',
      district: 'Malda',
      address: 'English Bazar, West Bengal',
      schedule: 'Mon–Sat, 10:00 AM–1:00 PM',
      fee: 450,
      languages: ['Bengali', 'Hindi'],
      gender: 'Male',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for an ophthalmologist. Contact and practice details must be verified before publication.',
    },
    {
      id: 12,
      name: 'Dr. Nandini Bhattacharya',
      qualification: 'BDS, MDS',
      specialty: 'Dentist',
      experience: '8 years',
      hospital: 'Smile Dental Studio',
      district: 'Birbhum',
      address: 'Suri, West Bengal',
      schedule: 'Mon–Sat, 4:00 PM–7:00 PM',
      fee: 400,
      languages: ['Bengali', 'English', 'Hindi'],
      gender: 'Female',
      phone: '',
      whatsapp: '',
      image: '',
      mapLink: '',
      verified: false,
      introduction:
        'Demo profile for a dentist. Contact and practice details must be verified before publication.',
    },
  ],

  joinForm: {
    specialties: [
      'General Physician',
      'Cardiologist',
      'Hematologist',
      'Pediatrician',
      'Gynecologist',
      'Orthopedic',
      'General Surgeon',
      'Dermatologist',
      'Neurologist',
      'ENT Specialist',
      'Ophthalmologist',
      'Dentist',
      'Other',
    ],
  },
}




