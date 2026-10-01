// Centralized placeholder content. Content sourced/adapted from the
// hth2025 repo (github.com/bccss/hth2025) where noted — replace with
// real 2026 copy as it's finalized. Don't inline content in components;
// add it here so it's one place to update.

export interface Stat {
  icon: string
  number: string
  label: string
}

export const stats: Stat[] = [
  { icon: '👥', number: '1000+', label: 'Students Participated' },
  { icon: '💻', number: '200+', label: 'Projects Built' },
  { icon: '⏰', number: '24', label: 'Hours of Innovation' },
  { icon: '🏆', number: '$15K+', label: 'Total Prizes Awarded' },
  { icon: '🧠', number: '15+', label: 'Industry Mentors' },
  { icon: '📅', number: '11', label: 'Years Running' },
]

export interface Feature {
  icon: string
  title: string
  description: string
}

export const aboutFeatures: Feature[] = [
  {
    icon: '🚀',
    title: 'Build & Innovate',
    description: 'Create amazing projects in 24 hours with cutting-edge technology and unlimited creativity.',
  },
  {
    icon: '🤝',
    title: 'Connect & Collaborate',
    description: 'Meet like-minded hackers, form teams, and build lasting friendships in the tech community.',
  },
  {
    icon: '📚',
    title: 'Learn & Grow',
    description: 'Attend workshops, get mentorship, and level up your skills with industry experts.',
  },
]

export const specialFeatures: Feature[] = [
  { icon: '🤝', title: 'Beginner-Friendly', description: 'Over 40% of our participants are first-time hackers. Mentorship, workshops, and a supportive community for everyone.' },
  { icon: '🏫', title: 'BC Community', description: 'Exclusively for Boston College students, creating tight-knit connections within our Eagles community.' },
  { icon: '🎓', title: 'Learn by Doing', description: 'Hands-on workshops led by industry professionals — React, AI/ML, cloud deployment, and more.' },
  { icon: '💡', title: 'Real Impact', description: 'Many HTH projects become real startups, research projects, or open-source contributions.' },
  { icon: '🌟', title: 'Industry Connections', description: 'Network with recruiters, engineers, and executives from top tech companies.' },
  { icon: '🏆', title: 'Amazing Prizes', description: '$15K+ in prizes, plus mentorship programs, accelerator spots, and internship fast-tracks.' },
]

export interface Testimonial {
  quote: string
  name: string
  meta: string
}

export const testimonials: Testimonial[] = [
  { quote: 'Hack the Heights is the best opportunity to learn and build with others.', name: 'Max Zhang', meta: 'Class of 2027 · Computer Science' },
  { quote: "Going to this hackathon with my friends forced us to build together, and we all ended up learning and having a ton of fun!", name: 'Nathan Thai', meta: 'Class of 2027 · Computer Science' },
  { quote: 'If I were you, I would definitely be here next year!', name: 'Parker Wang', meta: 'Class of 2026 · Computer Science' },
]

export interface Speaker {
  name: string
  job: string
}

export const speakers: Speaker[] = [
  { name: 'Speaker Name TBA', job: 'Job Title @ Company' },
  { name: 'Speaker Name TBA', job: 'Job Title @ Company' },
  { name: 'Speaker Name TBA', job: 'Job Title @ Company' },
]

// The two dig-site lanes — SPEC.md section 3: BC Track (Boston College
// students only) and Main Track (open to all hackers), identical weight,
// fed into a single <TrackCard>-style component with no per-track styling.
export interface TrackLane {
  fossil: 'eagle' | 'trex'
  title: string
  sublabel: string
  description: string
  prizes: { place: string; amount: string }[]
}

export const trackLanes: TrackLane[] = [
  {
    fossil: 'eagle',
    title: 'BC Track',
    sublabel: 'Boston College students',
    description: '[Description, 2 lines]',
    prizes: [
      { place: '1st', amount: '[$]' },
      { place: '2nd', amount: '[$]' },
      { place: '3rd', amount: '[$]' },
    ],
  },
  {
    fossil: 'trex',
    title: 'Main Track',
    sublabel: 'Open to all hackers',
    description: '[Description, 2 lines]',
    prizes: [
      { place: '1st', amount: '[$]' },
      { place: '2nd', amount: '[$]' },
      { place: '3rd', amount: '[$]' },
    ],
  },
]

export type FaqCategory = 'general' | 'registration' | 'event' | 'technical'

export interface Faq {
  question: string
  answer: string
  category: FaqCategory
}

export const faqCategories: { key: 'all' | FaqCategory; label: string }[] = [
  { key: 'all', label: 'All Questions' },
  { key: 'general', label: 'General' },
  { key: 'registration', label: 'Registration' },
  { key: 'event', label: 'Event Day' },
  { key: 'technical', label: 'Technical' },
]

export const faqs: Faq[] = [
  { category: 'general', question: 'Who can participate in Hack the Heights?', answer: 'HTH is open to all Boston College students regardless of major, year, or coding experience! We especially encourage beginners — many of our past winners were first-time hackers.' },
  { category: 'general', question: 'Do I need to know how to code to participate?', answer: 'Not at all! We have workshops for beginners, mentors to help you learn, and many projects need designers, business minds, and creative thinkers.' },
  { category: 'registration', question: 'How do I register for the event?', answer: 'Registration opens ~6 weeks before the event. Sign up for our newsletter to get notified when applications go live. We typically fill up quickly, so register early!' },
  { category: 'registration', question: 'Do I need a team before the event?', answer: 'No! Many participants come solo and form teams during our team formation session on Day 1. Teams can be 1–4 people.' },
  { category: 'registration', question: 'Is there a registration fee?', answer: 'Hack the Heights is completely FREE! We provide all meals, snacks, swag, and prizes. Just bring your laptop, creativity, and enthusiasm!' },
  { category: 'event', question: 'What should I bring?', answer: 'Your laptop, chargers, any hardware you want to use, comfortable clothes, toiletries, and a sleeping bag if you plan to stay overnight.' },
  { category: 'event', question: 'Where do I sleep during the 24 hours?', answer: 'We have designated quiet spaces for rest with couches and floor space. Many hackers power through, but we encourage taking breaks!' },
  { category: 'event', question: 'What kind of food is provided?', answer: 'We provide all meals and snacks throughout the 24 hours. We accommodate dietary restrictions — just let us know when you register!' },
  { category: 'technical', question: 'Can I start coding before the event?', answer: 'No, all code must be written during the 24-hour period. You can brainstorm ideas and research APIs beforehand. Come with ideas, not code!' },
  { category: 'technical', question: 'What languages/tools can I use?', answer: "Any programming language, framework, or tool is allowed! We'll have workshops on popular technologies too." },
  { category: 'technical', question: 'How are projects judged?', answer: 'Projects are judged on creativity, technical implementation, potential impact, and presentation quality across multiple prize categories.' },
  { category: 'technical', question: 'What if I have a question during the event?', answer: 'We have mentors available 24/7 during the hackathon, plus our organizing team is always around to help!' },
]

// Tentative run-of-show (RTS) — times/titles still subject to change.
export interface ScheduleEvent {
  time: string
  title: string
  note?: string
}

export const scheduleDays: { key: string; label: string; day: string; events: ScheduleEvent[] }[] = [
  {
    key: 'day1',
    label: 'Day 1',
    day: 'Saturday',
    events: [
      { time: '11:30 AM', title: 'Board arrives' },
      { time: '12:00 PM', title: 'Kickoff & intro' },
      { time: '1:00 PM', title: 'Lunch' },
      { time: '2:30 PM', title: 'Technical workshop', note: 'Tech team' },
      { time: '4:00 PM', title: 'Panel event', note: 'Events team' },
      { time: '6:00 PM', title: 'Dinner' },
      { time: '8:00 PM', title: 'Social event', note: 'Marketing team' },
      { time: '11:00 PM', title: 'Doors close', note: 'TBD' },
    ],
  },
  {
    key: 'day2',
    label: 'Day 2',
    day: 'Sunday',
    events: [
      { time: '9:00 AM', title: 'Breakfast' },
      { time: '10:30 AM', title: 'Board arrives', note: 'Latest' },
      { time: '11:00 AM', title: 'Submit projects' },
      { time: '11:15 AM', title: 'Judging', note: 'Until 12:00 PM' },
      { time: '~12:30 PM', title: 'Awards' },
    ],
  },
]
