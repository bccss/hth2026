import { useState } from 'react'
import SectionHeader from './ui/SectionHeader'
import { eventTypeLabels, scheduleDay1, scheduleDay2 } from '../data/content'
import { scaffolding } from '../assets/about'

const days = [
  { key: 'day1', label: 'Day 1', date: 'Oct 24', events: scheduleDay1 },
  { key: 'day2', label: 'Day 2', date: 'Oct 25', events: scheduleDay2 },
] as const

const PAPER_COLOR = '#fdfbf1'
const TAB_COLOR = '#e9decb'

export default function Schedule() {
  const [active, setActive] = useState<(typeof days)[number]['key']>('day1')
  const activeDay = days.find((d) => d.key === active)!

  return (
    <section id="schedule" className="relative overflow-hidden px-6 py-20">
      {/* Scaffolding, spanning the full width of the section. Anchored to
          the top (not vertically centered) so it doesn't shift when
          switching days changes the clipboard's height. */}
      <img
        src={scaffolding}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute left-0 top-0 w-full opacity-[0.06]"
      />

      <div className="relative mx-auto max-w-[1140px]">
        <SectionHeader title="Event Schedule" />

        {/* The schedule itself, drafted as a clipboard: folder tabs pick
            the day, a steel clip pins loose-leaf paper to a wood board. */}
        <div className="relative mx-auto max-w-[700px] pt-8">
          {/* Folder tabs — top-left of the board */}
          <div className="absolute left-4 top-0 z-20 flex">
            {days.map((d) => {
              const isActive = d.key === active
              return (
                <button
                  key={d.key}
                  onClick={() => setActive(d.key)}
                  className={`-ml-1 rounded-t-md border border-b-0 px-4 pb-2 pt-2 text-xs font-bold uppercase tracking-wide transition-colors first:ml-0 ${
                    isActive
                      ? 'relative z-10 border-wood-dark/40 text-text'
                      : 'border-border text-text-muted hover:text-text'
                  }`}
                  style={{ backgroundColor: isActive ? PAPER_COLOR : TAB_COLOR }}
                >
                  {d.label}
                  <span className="ml-1 font-normal normal-case text-text-muted">{d.date}</span>
                </button>
              )
            })}
          </div>

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 z-10 h-9 w-32 -translate-x-1/2 rounded-md border border-steel-dark/60"
            style={{
              background: 'linear-gradient(155deg, var(--color-steel-dark) 0%, var(--color-steel) 50%, var(--color-steel-dark) 100%)',
            }}
          >
            <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-steel-dark shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]" />
          </div>

          <div
            className="relative rounded-lg p-3 shadow-card sm:p-4"
            style={{
              background: 'linear-gradient(155deg, var(--color-wood) 0%, var(--color-wood-dark) 60%, var(--color-wood-dark) 100%)',
            }}
          >
            {/* Loose-leaf paper — ruled horizontal lines every 32px, a red
                margin line, no per-event cards. Text uses leading-8 (32px)
                throughout and top/left padding in multiples of 32px so
                every line of text sits directly on a ruled line, starting
                just right of the red margin. */}
            <div
              className="relative overflow-hidden rounded-md pb-8 pl-14 pr-6 pt-8 sm:pl-16 sm:pr-8 sm:pt-16"
              style={{
                backgroundColor: PAPER_COLOR,
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent 0px, transparent 31px, rgba(61,106,148,0.28) 31px, rgba(61,106,148,0.28) 32px)',
              }}
            >
              <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-10 top-0 w-px bg-danger/25 sm:left-12" />

              <div className="relative">
                {activeDay.events.map((event) => (
                  <div key={event.title} className="mb-8 last:mb-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 text-xs font-bold uppercase leading-8 tracking-wide">
                      <span className="text-accent-dark">{event.time}</span>
                      <span className="text-text-muted">· {eventTypeLabels[event.type]}</span>
                      {event.required && <span className="text-danger">· Required</span>}
                    </div>
                    <h4 className="font-bold leading-8">{event.title}</h4>
                    <p className="text-sm leading-8 text-text-muted">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
