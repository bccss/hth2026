import { CheckCircle } from '@phosphor-icons/react'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import { excavator } from '../assets/about'
import { APPLY_FORM_URL } from '../data/content'

const checklist = [
  'Free to attend, food, snacks, swag, and prizes included',
  'Open to all students, any major or year',
  'No experience required, beginners welcome',
]

export default function Apply() {
  return (
    <section id="apply" className="bg-bg-alt px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeader
          align="left"
          className="mx-auto text-center lg:mx-0 lg:text-left"
          title="Ready to Build?"
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <img
            src={excavator}
            alt="Illustration of an excavator"
            className="mx-auto w-full max-w-xs lg:order-2 lg:max-w-sm"
          />

          {/* Same blueprint treatment as the Tracks cards — dark ink panel,
              cyan grid fill, dashed border, drafting crop marks — instead of
              a plain white card. Wider than before so each checklist line
              fits on one row instead of wrapping. */}
          <div className="relative mx-auto w-full max-w-[600px] rounded-lg border-2 border-dashed border-ink-border bg-ink p-10 text-center text-ink-text lg:order-1 lg:mx-0 lg:text-left">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(var(--color-blueprint-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint-line) 1px, transparent 1px)',
                backgroundSize: '8% 8%',
              }}
            />
            <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-blueprint-line/70" />
            <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-blueprint-line/70" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-blueprint-line/70" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-blueprint-line/70" />

            <ul className="relative mb-8 inline-block space-y-3 text-left">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle weight="fill" className="mt-0.5 h-5 w-5 flex-shrink-0 text-caution" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="relative">
              <Button href={APPLY_FORM_URL} target="_blank" rel="noopener noreferrer" size="lg">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
