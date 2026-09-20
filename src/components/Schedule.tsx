import { useState } from 'react'
import SectionHeader from './ui/SectionHeader'
import Pill from './ui/Pill'
import Reveal from './ui/Reveal'
import ToggleGroup from './ui/ToggleGroup'
import { ContentIcon } from './ui/icons'
import { eventTypeLabels, scheduleDay1, scheduleDay2 } from '../data/content'

const days = [
  { key: 'day1', label: 'Day 1', date: 'Oct 24 (TBC)', events: scheduleDay1 },
  { key: 'day2', label: 'Day 2', date: 'Oct 25 (TBC)', events: scheduleDay2 },
] as const

export default function Schedule() {
  const [active, setActive] = useState<(typeof days)[number]['key']>('day1')
  const activeDay = days.find((d) => d.key === active)!

  return (
    <section id="schedule" className="px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeader title="Event Schedule" />

        <ToggleGroup
          options={days.map((d) => ({ key: d.key, label: d.label, caption: d.date }))}
          active={active}
          onChange={setActive}
        />

        <div className="relative mx-auto max-w-[780px] border-l-2 border-border pl-8">
          {activeDay.events.map((event, i) => (
            <Reveal key={event.title} index={i} y={12} className="relative mb-3 last:mb-0">
              <div className="absolute -left-[2.35rem] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg bg-accent text-caution-ink">
                <ContentIcon icon={event.icon} className="h-4 w-4" weight="fill" />
              </div>
              <div className="rounded-md border border-border bg-surface p-3">
                <div className="mb-1 flex flex-wrap gap-2">
                  <Pill>{event.time}</Pill>
                  <Pill variant="neutral">{eventTypeLabels[event.type]}</Pill>
                  {event.required && <Pill variant="danger">Required</Pill>}
                </div>
                <h4 className="font-bold">{event.title}</h4>
                <p className="text-sm text-text-muted">{event.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
