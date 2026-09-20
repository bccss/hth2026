import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import {
  BookOpen,
  Brain,
  Briefcase,
  Buildings,
  Calendar,
  ChalkboardTeacher,
  CheckCircle,
  Clock,
  Code,
  Coffee,
  Envelope,
  Flag,
  Globe,
  GraduationCap,
  HandHeart,
  Handshake,
  Heartbeat,
  InstagramLogo,
  Laptop,
  Leaf,
  Lightbulb,
  Lightning,
  Medal,
  Microphone,
  MoonStars,
  Pizza,
  Rocket,
  Scales,
  Star,
  Target,
  Toolbox,
  Trophy,
  UploadSimple,
  Users,
  UsersThree,
  Wallet,
} from '@phosphor-icons/react'

// Semantic icon keys used across data/content.ts — the single place that maps
// a content key to a real glyph, so components never hand-roll or emoji.
export const iconMap = {
  rocket: Rocket,
  handshake: Handshake,
  book: BookOpen,
  users: Users,
  laptop: Laptop,
  clock: Clock,
  trophy: Trophy,
  brain: Brain,
  calendar: Calendar,
  'hand-heart': HandHeart,
  buildings: Buildings,
  'graduation-cap': GraduationCap,
  lightbulb: Lightbulb,
  star: Star,
  medal: Medal,
  leaf: Leaf,
  heartbeat: Heartbeat,
  wallet: Wallet,
  toolbox: Toolbox,
  target: Target,
  flag: Flag,
  code: Code,
  'users-three': UsersThree,
  pizza: Pizza,
  'chalkboard-teacher': ChalkboardTeacher,
  microphone: Microphone,
  'moon-stars': MoonStars,
  coffee: Coffee,
  lightning: Lightning,
  upload: UploadSimple,
  scales: Scales,
  globe: Globe,
  briefcase: Briefcase,
  'check-circle': CheckCircle,
  envelope: Envelope,
  instagram: InstagramLogo,
} satisfies Record<string, PhosphorIcon>

export type IconKey = keyof typeof iconMap

export function ContentIcon({
  icon,
  className = '',
  weight = 'duotone',
}: {
  icon: IconKey
  className?: string
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
}) {
  const Cmp = iconMap[icon]
  return <Cmp className={className} weight={weight} />
}
