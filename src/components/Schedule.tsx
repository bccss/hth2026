import { useState } from 'react'
import SectionHeader from './ui/SectionHeader'
import Pill from './ui/Pill'
import { eventTypeLabels, scheduleDay1, scheduleDay2 } from '../data/content'

const days = [
  { key: 'day1', label: 'Day 1', date: 'Oct 24 (placeholder)', events: scheduleDay1 },
  { key: 'day2', label: 'Day 2', date: 'Oct 25 (placeholder)', events: scheduleDay2 },
] as const

export default function Schedule() {
  const [active, setActive] = useState<(typeof days)[number]['key']>('day1')
  const activeDay = days.find((d) => d.key === active)!

  return (
    <section id="schedule" className="px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeader eyebrow="Schedule" title="Event Schedule" />

        <div className="mx-auto mb-10 max-w-2xl rounded-lg border-l-4 border-accent bg-bg-alt p-6 text-sm text-text-muted">
          <p>
            The complete schedule with specific times, locations, and details will be shared with
            registered participants closer to the event. Times below are placeholders from last
            year's format.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {days.map((day) => (
            <button
              key={day.key}
              onClick={() => setActive(day.key)}
              className={`flex flex-col items-center rounded-full px-5 py-3 font-heading font-semibold ${
                active === day.key ? 'bg-accent text-white' : 'bg-bg-alt text-text-muted'
              }`}
            >
              <span>{day.label}</span>
              <span className="text-xs opacity-70">{day.date}</span>
            </button>
          ))}
        </div>

        <div className="relative mx-auto max-w-[780px] border-l-2 border-border pl-10">
          {activeDay.events.map((event, i) => (
            <div key={i} className="relative mb-8">
              <div className="absolute -left-[2.95rem] top-0 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg text-white">
                {event.icon}
              </div>
              <div className="rounded-md border border-border bg-surface p-5">
                <div className="mb-2 flex flex-wrap gap-2">
                  <Pill>{event.time}</Pill>
                  <Pill variant="neutral">{eventTypeLabels[event.type]}</Pill>
                  {event.required && <Pill variant="danger">Required</Pill>}
                </div>
                <h4 className="mb-1 text-lg font-bold">{event.title}</h4>
                <p className="text-sm text-text-muted">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
