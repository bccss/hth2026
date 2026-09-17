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

export interface Track {
  icon: string
  title: string
  description: string
  ghost?: boolean
}

export const tracks: Track[] = [
  { icon: '🌱', title: 'Social Good & Sustainability', description: 'Build tech that tackles environmental sustainability, community impact, or civic good.' },
  { icon: '🏥', title: 'Health & Wellness', description: 'Design solutions that improve mental health, accessibility, or physical wellbeing.' },
  { icon: '💰', title: 'FinTech & Future of Work', description: 'Reimagine how people manage money, find jobs, or collaborate in the modern workplace.' },
  { icon: '🎓', title: 'Rookie Track', description: 'For first-time hackers. Extra mentorship and a dedicated prize category — no experience needed.' },
  { icon: '🛠️', title: 'Open Innovation', description: "Have an idea that doesn't fit elsewhere? Build anything you want — the sky's the limit." },
  { icon: '🚧', title: 'Sponsor Track', description: 'Reserved slot for a headline sponsor challenge — details announced as sponsors confirm.', ghost: true },
]

export type EventType = 'ceremony' | 'coding' | 'networking' | 'meal' | 'workshop' | 'speaker' | 'presentation' | 'judging'

export interface ScheduleEvent {
  icon: string
  time: string
  type: EventType
  title: string
  description: string
  required?: boolean
}

export const scheduleDay1: ScheduleEvent[] = [
  { icon: '🎯', time: '11:30 AM – 12:00 PM', type: 'ceremony', title: 'Registration & Check-in', description: "Check in and get ready for what's to come!", required: true },
  { icon: '🚀', time: '12:00 – 12:30 PM', type: 'ceremony', title: 'Opening Ceremony', description: 'Get acquainted with the event and the team.', required: true },
  { icon: '💻', time: '12:30 PM', type: 'coding', title: 'Hacking Begins!', description: 'Start working on your projects!', required: true },
  { icon: '🤝', time: '12:30 – 1:00 PM', type: 'networking', title: 'Team Formation', description: 'Perfect opportunity to find your dream team.' },
  { icon: '🍕', time: '1:00 – 2:00 PM', type: 'meal', title: 'Lunch', description: 'Take a break and recharge.' },
  { icon: '📚', time: '2:00 – 3:00 PM', type: 'workshop', title: 'Beginner Coding Workshop', description: 'Learn how to code with a beginner-friendly workshop.' },
  { icon: '🧠', time: '4:00 – 5:00 PM', type: 'speaker', title: 'Speaker Event', description: 'Gain insight from industry leaders.' },
  { icon: '🍽️', time: '7:00 – 8:00 PM', type: 'meal', title: 'Dinner', description: 'Grab some food and recharge.' },
  { icon: '🌙', time: '8:00 – 9:00 PM', type: 'networking', title: 'Game Night', description: 'CS students have fun too — join for some games!' },
]

export const scheduleDay2: ScheduleEvent[] = [
  { icon: '☕', time: '10:00 – 11:00 AM', type: 'meal', title: 'Morning Kickoff & Breakfast', description: 'Start your final day strong!' },
  { icon: '⚡', time: '12:30 PM', type: 'coding', title: 'Hacking Ends!', description: 'Last-minute push — submit your work.' },
  { icon: '📤', time: '12:45 – 1:30 PM', type: 'presentation', title: 'Project Demos', description: 'See what everyone has been working on.', required: true },
  { icon: '⚖️', time: '1:30 – 2:15 PM', type: 'judging', title: 'Judging & Deliberation', description: 'While judges deliberate, relax and network!' },
  { icon: '🏆', time: '2:30 PM', type: 'ceremony', title: 'Awards Ceremony', description: 'Celebrate winners and wrap up an amazing hackathon!', required: true },
]

export const eventTypeLabels: Record<EventType, string> = {
  ceremony: 'Ceremony',
  coding: 'Coding',
  networking: 'Networking',
  meal: 'Meal',
  workshop: 'Workshop',
  speaker: 'Speaker',
  presentation: 'Presentation',
  judging: 'Judging',
}

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

export interface SponsorTier {
  name: string
  price: string
  description: string
  benefits: string[]
  featured?: boolean
}

export const sponsorTiers: SponsorTier[] = [
  {
    name: 'Bronze',
    price: '$250',
    description: 'Perfect for startups and smaller companies looking to support student innovation.',
    benefits: ['Small logo placement', 'Pre-event email', 'Send-a-Rep'],
  },
  {
    name: 'Silver',
    price: '$500',
    description: 'Ideal for growing companies wanting meaningful student engagement.',
    benefits: ['Everything in Bronze', 'Host an affiliate workshop', 'Post-hackathon recruiting email', 'Table during lunch/dinner'],
  },
  {
    name: 'Gold',
    price: '$1,000',
    description: 'Great for companies seeking premium visibility and speaking opportunities.',
    benefits: ['Everything in Silver', 'Speak at Opening Ceremony'],
  },
  {
    name: 'Diamond',
    price: '$3,000',
    description: 'Premium sponsorship for maximum impact and comprehensive student access.',
    benefits: ['Everything in Gold', 'Host your own competition', 'Pre-hackathon coffee chats', 'Sponsor lounge'],
    featured: true,
  },
]

export const whySponsor: Feature[] = [
  { icon: '🌍', title: 'Social Impact Focus', description: 'Our hackathon targets social good — environmental sustainability, mental health, and community impact.' },
  { icon: '🎓', title: 'Holistic Development', description: 'Boston College\'s "cura personalis" ethos means diverse, multifaceted, creative thinkers.' },
  { icon: '🤝', title: 'Diversity Hub', description: 'We foster an inclusive environment — partnering with us showcases your commitment to diversity.' },
  { icon: '⚖️', title: 'Values-Driven Innovation', description: 'Support students passionate about making a meaningful difference.' },
  { icon: '🧠', title: 'Liberal Arts Advantage', description: "Interdisciplinary perspectives from across BC's diverse academic programs." },
  { icon: '💼', title: 'Strategic Partnership', description: 'Connect with the next generation of purpose-driven innovators.' },
]
