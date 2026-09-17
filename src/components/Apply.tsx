import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'

export default function Apply() {
  return (
    <section id="apply" className="bg-bg-alt px-6 py-20 text-center">
      <div className="mx-auto max-w-[1140px]">
        {/* [SVG PLACEHOLDER] badge-scaffold.svg framing this section */}
        <SectionHeader
          eyebrow="Apply"
          title="Ready to Build?"
          lead="Don't miss out on this incredible experience! Applications for Hack the Heights 2026 open soon — sign up for the newsletter to be the first to know."
        />

        <div className="mx-auto max-w-[560px] rounded-md border border-border bg-white p-10">
          <ul className="mb-8 inline-block space-y-2 text-left">
            <li>✅ Free to attend — meals, snacks, swag &amp; prizes included</li>
            <li>✅ Open to all Boston College students, any major or year</li>
            <li>✅ No experience required — beginners welcome</li>
          </ul>
          <div>
            <Button href="https://forms.gle/PLACEHOLDER" target="_blank" rel="noopener noreferrer" size="lg">
              Apply Now
            </Button>
          </div>
          <p className="mt-5 text-sm text-text-muted">Applications open placeholder date — Fall 2026.</p>
        </div>
      </div>
    </section>
  )
}
