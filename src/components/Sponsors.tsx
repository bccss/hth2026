import { InstagramLogo, Star } from '@phosphor-icons/react'
import Button from './ui/Button'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { ContentIcon } from './ui/icons'
import { sponsorTiers } from '../data/content'

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative overflow-hidden px-6 py-20">
      {/* Blueprint grid backdrop, same faint treatment as Tracks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1140px]">
        <SectionHeader
          title="Become a Sponsor"
          lead="Sponsoring Hack the Heights connects your team with purpose-driven Boston College students passionate about social impact and innovation."
        />

        <h3 className="mb-8 text-center text-2xl font-bold">Sponsorship Tiers</h3>
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sponsorTiers.map((tier, i) => (
            <Reveal key={tier.name} index={i}>
              <Card
                interactive
                className={`relative flex h-full flex-col text-left ${tier.featured ? 'border-2 border-accent' : ''}`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-caution-ink">
                    <Star weight="fill" className="h-3 w-3" />
                    Popular
                  </span>
                )}
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <div className="mb-2 font-heading text-3xl font-bold">{tier.price}</div>
                <p className="text-text-muted">{tier.description}</p>
                <ul className="my-4 flex-grow space-y-2">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-text-muted">
                      <ContentIcon icon="check-circle" weight="fill" className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="rounded-md bg-ink p-8 text-center text-white sm:p-12">
          <h3 className="mb-2 text-2xl font-bold">Ready to Make a Difference?</h3>
          <p className="mb-6 text-ink-text-muted">For sponsorship info, reach out today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="mailto:hackheights@bc.edu?subject=HTH 2026 Sponsorship Inquiry">Email Us</Button>
            <a
              href="https://www.instagram.com/bccssociety/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-heading font-bold text-white transition-colors hover:bg-white/10"
            >
              <InstagramLogo weight="fill" className="h-4 w-4" />
              @bccssociety
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
