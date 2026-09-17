import { useEffect, useState } from 'react'

export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculate(target: Date): TimeLeft {
  const distance = Math.max(target.getTime() - Date.now(), 0)
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  }
}

/** Placeholder target date — update once the real 2026 date is set. */
export function useCountdown(target: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculate(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculate(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}
