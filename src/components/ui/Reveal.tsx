import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger index — multiplied into the delay so grids/lists reveal in sequence. */
  index?: number
  y?: number
}

/** Fade-and-rise on scroll entry. Used for hierarchy/storytelling reveals, not decoration. */
export default function Reveal({ children, className = '', index = 0, y = 20 }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: reduce ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
