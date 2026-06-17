// ============================================================================
// First Option Worldwide — site content (single source of truth)
//
// Every word here is taken verbatim from the existing live website
// (firstoptionworldwide.com). Edit text in this one file to update the site —
// no design code needs to change.
// ============================================================================

export const company = {
  name: 'First Option Worldwide',
  legalName: 'First Option Worldwide (Pvt) Ltd.',
  tagline: 'Gateway to Global Opportunities',
  motto: '"Your Success, Our Mission — Connecting Pakistan to the World"',
  locationsLine: 'Islamabad, Pakistan  ·  Phuket, Thailand',
  hours: 'Mon – Sat: 9:00 AM – 6:00 PM',
  email: 'info@firstoptionworldwide.com',
  website: 'www.firstoptionworldwide.com',
  phonePrimary: '+92 51 5710222',
  whatsapp: '+92 333 1114603',
  headquartersAddress:
    'Office No.01, First Floor, Friends Gold Arcade, Plot 36-C, Main Double Road, PWD Society, Islamabad',
}

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Global Reach', href: '#global-reach' },
  { label: 'Trade Delegation', href: '#trade-delegation' },
  { label: 'Contact Us', href: '#contact' },
]

export const hero = {
  eyebrow: 'International Trade Facilitation',
  titleLines: ['Your Gateway', 'to', 'Global', 'Opportunities'],
  description:
    'First Option Worldwide bridges Pakistan with global markets — facilitating trade missions, managing business delegations, enabling seamless travel, and guiding immigration journeys worldwide.',
  primaryCta: { label: 'Our Services', href: '#services' },
  secondaryCta: { label: 'Join Trade Delegation', href: '#trade-delegation' },
  stats: [
    { value: '3+', label: 'Services' },
    { value: '15+', label: 'Countries' },
    { value: '2', label: 'Offices' },
    { value: '100%', label: 'Committed' },
  ],
  badge: 'Gateway to Global Opportunities',
  pillars: [
    { icon: '🌐', label: 'Trade Facilitation' },
    { icon: '✈️', label: 'Travel & Tours' },
    { icon: '🛂', label: 'Immigration' },
  ],
  scrollLabel: 'Discover',
}

// Marquee strip of service keywords shown between sections on the live site.
export const marqueeItems = [
  'International Trade Facilitation',
  'Business Delegations',
  'B2B Matchmaking',
  'Travel & Tours',
  'Immigration Advisory',
  'Visa Facilitation',
  'Trade Missions',
  'Market Entry Advisory',
  'MOU Facilitation',
  'Corporate Travel',
  'Group Tours',
  'Central Asia Trade',
]

export const about = {
  eyebrow: 'Who We Are',
  titleLines: ['First Option', 'Worldwide'],
  yearsNetwork: '10+',
  yearsNetworkLabel: 'Years Network',
  paragraphs: [
    'First Option Worldwide is a Pakistan-based organization specialized in providing comprehensive international trade facilitation, travel and tourism management, and immigration advisory services to individuals, corporations, and government entities.',
    'We operate a branch office in Phuket, Thailand under the name First Option Enterprises Co. Limited, strengthening our regional presence across Asia.',
    'We serve as a bridge between Pakistan and the global marketplace — enabling businesses to explore international trade opportunities, facilitating seamless travel experiences, and guiding families through global immigration pathways worldwide.',
  ],
  mission: {
    title: '🎯 Our Mission',
    text: 'To facilitate sustainable international trade, deliver exceptional travel experiences, and provide reliable immigration solutions through integrity and global connectivity.',
  },
  vision: {
    title: '🔭 Our Vision',
    text: "To become Pakistan's most trusted international trade facilitation, travel, and immigration company — opening global opportunities for all.",
  },
  cta: { label: 'Talk to an Expert', href: '#contact' },
}

export const services = {
  eyebrow: 'What We Do',
  title: 'Our Core Services',
  intro:
    'Three powerful service pillars connecting Pakistan to the world — driving commerce, enabling movement, and opening new horizons for businesses and individuals.',
  items: [
    {
      number: '01',
      icon: '🌐',
      title: 'International Trade Facilitation',
      subtitle: 'Building commercial bridges between Pakistan and global markets',
      points: [
        'Business delegation & trade mission management',
        'B2B matchmaking — local & international companies',
        'Market entry advisory & trade intelligence',
        'Export promotion & import sourcing support',
        'Liaison with embassies, trade bodies & chambers',
        'MOU & trade agreement facilitation',
        'Representation at international trade exhibitions',
      ],
    },
    {
      number: '02',
      icon: '✈️',
      title: 'Travel & Tourism Management',
      subtitle: 'Complete travel solutions for corporate and leisure clients',
      points: [
        'Corporate travel planning & air ticketing',
        'Hotel reservations & travel arrangements',
        'Group tours — business, cultural & religious travel',
        'Visa facilitation & documentation support',
        'Airport transfers & ground transportation',
        'Customized itineraries for business delegations',
        'Travel insurance & emergency support',
      ],
    },
    {
      number: '03',
      icon: '🛂',
      title: 'Immigration Advisory Services',
      subtitle: 'Professional guidance through global immigration pathways',
      points: [
        'Australia Graduate Immigration Advisory',
        'Eligibility Assessment & Academic Profile Evaluation',
        'Qualification-Based Immigration Guidance',
        'Visa Documentation Preparation & Application',
        'Family reunification & dependent visa processing',
        'Permanent residency & citizenship advisory',
        'End-to-end immigration case management',
      ],
    },
  ],
}

export const whyUs = {
  eyebrow: 'Why Choose Us',
  titleLines: ['Why First Option', 'Worldwide'],
  intro:
    'Trusted by businesses, government bodies, and individuals for expertise, integrity, and real global connections that deliver results.',
  items: [
    {
      number: '01',
      icon: '🏆',
      title: 'Multi-Service Expertise',
      text: 'One trusted partner for international trade, travel, and immigration — saving you time, cost, and coordination across multiple providers.',
    },
    {
      number: '02',
      icon: '🌐',
      title: 'Strong International Networks',
      text: 'Established global business, diplomatic, and trade connections across Central Asia, Middle East, Europe, and beyond.',
    },
    {
      number: '03',
      icon: '🇵🇰',
      title: 'Pakistan-Focused Insight',
      text: 'Deep understanding of local market dynamics, regulatory landscape, and business culture that gives you an unmatched competitive edge.',
    },
    {
      number: '04',
      icon: '⚙️',
      title: 'End-to-End Management',
      text: 'Complete handling from initial planning through to execution, reporting, and post-engagement follow-up — nothing falls through the cracks.',
    },
    {
      number: '05',
      icon: '🤝',
      title: 'Transparent & Ethical',
      text: 'Operating with full integrity, complete confidentiality, and absolute transparency at every single step of the engagement process.',
    },
    {
      number: '06',
      icon: '🎯',
      title: 'Customized Solutions',
      text: 'Tailored strategies and services designed around your specific industry, budget, timeline, and unique business objectives.',
    },
  ],
}

export const globalReach = {
  eyebrow: 'Our Reach',
  titleLines: ['International Reach &', 'Market Focus'],
  intro:
    'Actively facilitating trade, travel, and immigration across three major global regions with established networks and growing engagement.',
  regions: [
    {
      icon: '🌏',
      name: 'Central Asia',
      countries: ['Turkmenistan', 'Kazakhstan', 'Uzbekistan', 'Tajikistan', 'Kyrgyzstan'],
    },
    {
      icon: '🌍',
      name: 'Middle East & GCC',
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain'],
    },
    {
      icon: '🌐',
      name: 'Europe & Asia Pacific',
      countries: ['Turkey', 'China', 'United Kingdom', 'Germany', 'Malaysia & Thailand'],
    },
  ],
}

export const offices = {
  eyebrow: 'Our Presence',
  title: 'Our Offices',
  items: [
    {
      tag: 'Headquarters',
      name: 'First Option Worldwide (Pvt) Ltd.',
      address:
        'Office No.01, First Floor, Friends Gold Arcade, Plot No.36-C, Main Double Road, PWD Society, Islamabad, Pakistan',
      phones: ['+92 51 5710222', '+92 333 1114603'],
      email: 'info@firstoptionworldwide.com',
      website: '',
      note: '',
    },
    {
      tag: 'Branch Office',
      name: 'First Option Enterprises Co. Ltd',
      address: '241/32, 200 Rat-u-Thit Road, Pa Tong, Phuket 83150, Thailand',
      phones: [],
      email: '',
      website: 'www.firstoptionworldwide.com',
      note: 'REGIONAL ASIA-PACIFIC OPERATIONS',
    },
  ],
}

export const tradeDelegation = {
  eyebrow: 'Register Now',
  title: 'Join the Trade Delegation',
  intro:
    'First Option Worldwide is organizing a multi-nation Business Delegation to Central Asia. Register your company now to secure your participation and explore trade opportunities across Uzbekistan, Tajikistan and Turkmenistan.',
  formHeading: '🤝 Trade Delegation Registration',
  formSubheading: 'Pakistan — Central Asia Business Mission',
  destinationsLabel: 'Destinations',
  destinationsValue: 'Uzbekistan + Tajikistan / Turkmenistan',
  requiredNote:
    'Fields marked * are required. Attaching your company profile helps our team match you with the right business counterparts in the destination country.',
  industries: [
    'Agriculture & Food Products',
    'Textiles & Garments',
    'Surgical & Medical Instruments',
    'Pharmaceuticals',
    'Information Technology',
    'Construction & Building Materials',
    'Engineering & Machinery',
    'Chemicals & Fertilizers',
    'Energy & Power Solutions',
    'Leather Goods',
    'Sports Goods',
    'Trading & Import / Export',
    'Services & Consulting',
    'Other',
  ],
  packages: [
    {
      flags: '🇺🇿 + 🇹🇯',
      title: 'Uzbekistan + Tajikistan',
      subtitle: 'Tashkent & Dushanbe · Central Asia',
    },
    {
      flags: '🇺🇿 + 🇹🇲',
      title: 'Uzbekistan + Turkmenistan',
      subtitle: 'Tashkent & Ashgabat · Central Asia',
    },
  ],
  uploadHint: 'Company Profile (Optional — PDF, Word, PPT · Max 10MB)',
  uploadCta: 'Click to upload or drag & drop your company profile',
  uploadSub:
    'PDF, Word, PPT, Image — Max 10MB · File will be securely shared via download link',
  submitLabel: 'Submit Delegation Registration',
  successTitle: 'Registration Submitted Successfully!',
  successText:
    'Thank you for registering for the Trade Delegation to Central Asia. Our team will review your application and contact you within 2–3 business days with full details and next steps.',
}

export const contact = {
  eyebrow: 'Contact Our Team',
  smallHeading: 'Get In Touch',
  title: 'Contact Us',
  intro:
    'Send us your requirements and our team will respond within 24 hours with full details and expert guidance.',
  formHeading: 'Send an Enquiry',
  formSubheading: "Fill in your details and we'll get right back to you.",
  services: [
    'International Trade Facilitation',
    'Business Delegation',
    'Travel & Tours',
    'Immigration Advisory',
    'General Enquiry',
  ],
  submitLabel: 'Send Message →',
  cards: [
    { label: 'Headquarters', value: company.headquartersAddress },
    { label: 'Phone', value: '+92 51 5710222' },
    { label: 'WhatsApp', value: '+92 333 1114603' },
    { label: 'Email', value: 'info@firstoptionworldwide.com' },
    { label: 'Website', value: 'www.firstoptionworldwide.com' },
  ],
}

export const footer = {
  motto: '"Your Success, Our Mission — Connecting Pakistan to the World"',
  blurb:
    "Pakistan's premier international trade facilitation, travel & tourism, and immigration advisory company — your gateway to global opportunities.",
  columns: [
    {
      title: 'Services',
      links: [
        'Trade Facilitation',
        'Business Delegations',
        'B2B Matchmaking',
        'Travel & Tours',
        'Immigration Advisory',
        'Trade Delegation Form',
      ],
    },
    {
      title: 'Company',
      links: ['About Us', 'Why Choose Us', 'Global Reach', 'Our Offices', 'Contact'],
    },
  ],
  contact: {
    title: 'Contact',
    lines: [
      'PWD Society, Islamabad',
      'Phuket, Thailand',
      '+92 51 5710222',
      '+92 333 1114603',
      'info@firstoptionworldwide.com',
    ],
  },
  copyright: '© 2025 First Option Worldwide (Pvt) Ltd. All rights reserved.',
  addressLine:
    'Office No.01, Friends Gold Arcade, Plot 36-C, PWD Society, Islamabad |  www.firstoptionworldwide.com',
}
