import { CheckCircle } from '@phosphor-icons/react'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import building from '../assets/illustrations/building.svg'

const checklist = [
  'Free to attend, meals, snacks, swag, and prizes included',
  'Open to all Boston College students, any major or year',
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
          lead="Applications for Hack the Heights 2026 open soon. Sign up for the newsletter to be the first to know."
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <img
            src={building}
            alt="Illustration of a building under construction"
            className="mx-auto w-full max-w-xs lg:order-2 lg:max-w-sm"
          />

          <div className="relative mx-auto w-full max-w-[480px] rounded-md border-2 border-dashed border-border bg-white p-10 text-center lg:order-1 lg:mx-0 lg:text-left">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wide text-caution-ink lg:left-8 lg:translate-x-0">
              Applications open Fall 2026
            </span>
            <ul className="mb-8 inline-block space-y-3 text-left">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle weight="fill" className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div>
              <Button size="lg" disabled>
                Apply Now
              </Button>
              <p className="mt-3 text-sm text-text-muted">The application form isn't live yet, check back this fall.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
