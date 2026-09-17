import Button from './ui/Button'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'
import { sponsorTiers, whySponsor } from '../data/content'

export default function Sponsors() {
  return (
    <section id="sponsors" className="px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeader
          eyebrow="Sponsors"
          title="Become a Sponsor"
          lead="Sponsoring Hack the Heights is a strategic and values-driven choice — connect with purpose-driven Boston College students passionate about social impact and innovation."
        />

        <h3 className="mb-8 text-center text-2xl font-bold">
          Our Sponsors{' '}
          <span className="ml-2 inline-block rounded-full border border-dashed border-accent bg-accent-soft px-3 py-1 align-middle text-xs font-semibold text-accent-dark">
            logo placeholders
          </span>
        </h3>
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-[2/1] items-center justify-center rounded-sm border-2 border-dashed border-border p-2 text-center text-xs text-text-muted"
            >
              Sponsor Logo
            </div>
          ))}
        </div>

        <h3 className="mb-8 text-center text-2xl font-bold">Sponsorship Tiers</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sponsorTiers.map((tier) => (
            <Card key={tier.name} className={`flex flex-col text-left ${tier.featured ? 'border-2 border-accent' : ''} relative`}>
              {tier.featured && (
                <span className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                  ⭐ Popular
                </span>
              )}
              <h3 className="text-lg font-bold">{tier.name}</h3>
              <div className="mb-2 font-heading text-3xl font-bold">{tier.price}</div>
              <p className="text-text-muted">{tier.description}</p>
              <ul className="my-4 flex-grow space-y-2">
                {tier.benefits.map((b) => (
                  <li key={b} className="relative pl-6 text-sm text-text-muted">
                    <span className="absolute left-0 text-xs">✅</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Button
                href={`mailto:hackheights@bc.edu?subject=HTH 2026 Sponsorship - ${tier.name}`}
                variant={tier.featured ? 'primary' : 'outline'}
                size="sm"
              >
                Choose {tier.name}
              </Button>
            </Card>
          ))}
        </div>

        <h3 className="my-12 text-center text-2xl font-bold">Why Sponsor HTH?</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whySponsor.map((f) => (
            <Card key={f.title}>
              <div className="mb-4 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-text-muted">{f.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-md bg-bg-alt p-8 text-center sm:p-12">
          <h3 className="mb-2 text-2xl font-bold">Ready to Make a Difference?</h3>
          <p className="mb-6 text-text-muted">For sponsorship info, reach out today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="mailto:hackheights@bc.edu?subject=HTH 2026 Sponsorship Inquiry">
              📧 hackheights@bc.edu (placeholder)
            </Button>
            <Button href="#" variant="outline">
              📱 @hackthehightsbc (placeholder)
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
