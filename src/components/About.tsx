import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'
import { aboutFeatures, specialFeatures, speakers, stats, testimonials } from '../data/content'

export default function About() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeader
          eyebrow="About"
          title="What is Hack the Heights?"
          lead={
            <>
              Boston College's annual hackathon where innovation meets community. This 24-hour
              coding marathon brings together creative minds to build tech solutions, learn new
              skills, and collaborate on impactful projects. Placeholder copy — adapt for the 2026
              construction theme (e.g. "building the future, one block at a time").
            </>
          }
        />

        <Card highlight className="mb-12">
          <h3 className="mb-3 text-xl font-bold">Our Mission</h3>
          <p className="text-text-muted">
            Hack the Heights exists to democratize innovation at Boston College. We believe great
            ideas can come from anyone, regardless of background or experience level. Our
            hackathon is a judgment-free zone where students can experiment, learn, fail, and
            succeed together. <em>(Placeholder — reuse or rewrite for 2026.)</em>
          </p>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aboutFeatures.map((f) => (
            <Card key={f.title}>
              <div className="mb-4 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-text-muted">{f.description}</p>
            </Card>
          ))}
        </div>

        <h3 className="my-12 text-center text-2xl font-bold">By the Numbers</h3>
        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-md bg-bg-alt p-6">
              <div className="mb-2 text-2xl">{s.icon}</div>
              <div className="font-heading text-2xl font-bold text-accent">{s.number}</div>
              <div className="text-sm text-text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        <h3 className="my-12 text-center text-2xl font-bold">What Makes Us Special</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialFeatures.map((f) => (
            <Card key={f.title}>
              <div className="mb-4 text-3xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-text-muted">{f.description}</p>
            </Card>
          ))}
        </div>

        <h3 className="my-12 text-center text-2xl font-bold">
          Student Stories{' '}
          <span className="ml-2 inline-block rounded-full border border-dashed border-accent bg-accent-soft px-3 py-1 align-middle text-xs font-semibold text-accent-dark">
            placeholder quotes — reuse w/ permission or replace
          </span>
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="text-left">
              <div className="mb-2 text-2xl">💬</div>
              <p className="mb-4 italic">"{t.quote}"</p>
              <p className="text-sm font-bold">
                {t.name} <span className="font-normal text-text-muted">· {t.meta}</span>
              </p>
            </Card>
          ))}
        </div>

        <h3 className="my-12 text-center text-2xl font-bold">
          Our Speakers{' '}
          <span className="ml-2 inline-block rounded-full border border-dashed border-accent bg-accent-soft px-3 py-1 align-middle text-xs font-semibold text-accent-dark">
            TBA for 2026
          </span>
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {speakers.map((s, i) => (
            <Card key={i} className="flex items-center gap-4 text-left">
              <img
                src="https://placehold.co/160x160?text=Speaker"
                alt="Speaker headshot placeholder"
                className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold">{s.name}</h4>
                <p className="text-sm text-text-muted">{s.job}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
