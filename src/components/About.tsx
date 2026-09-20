import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { ContentIcon } from './ui/icons'
import { stats } from '../data/content'
import { cloud1, cloud2, cloud3, cloud4 } from '../assets/about'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-20">
      {/*
        The construction site — sky fills the whole section and resolves
        into the skyline pinned at the very bottom. Clouds drift slowly
        throughout (see @keyframes cloud-drift in index.css); the global
        prefers-reduced-motion rule there freezes them.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--color-sky), var(--color-bg) 85%)' }}
      />

      {/* Clouds — sized in percent (not px) so they scale fluidly with the viewport */}
      <img
        src={cloud2}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute left-[6%] top-[4%] w-[7%] opacity-50 animate-[cloud-drift_32s_ease-in-out_infinite_alternate]"
      />
      <img
        src={cloud1}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute right-[10%] top-[16%] hidden w-[6%] opacity-40 animate-[cloud-drift_26s_ease-in-out_infinite_alternate] sm:block"
      />
      <img
        src={cloud3}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute left-[16%] top-[32%] w-[6%] opacity-40 animate-[cloud-drift_38s_ease-in-out_infinite_alternate]"
      />
      <img
        src={cloud4}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute right-[14%] top-[48%] hidden w-[7%] opacity-35 animate-[cloud-drift_34s_ease-in-out_infinite_alternate] lg:block"
      />
      <img
        src={cloud1}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute left-[10%] top-[65%] hidden w-[6%] opacity-35 animate-[cloud-drift_30s_ease-in-out_infinite_alternate] md:block"
      />
      <img
        src={cloud2}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute right-[8%] top-[82%] hidden w-[7%] opacity-30 animate-[cloud-drift_36s_ease-in-out_infinite_alternate] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1140px]">
        <SectionHeader
          title="What is Hack the Heights?"
          lead="Boston College's annual 24-hour hackathon, exclusively for BC students. Bring an idea, a laptop, and curiosity: over 40% of our hackers are first-timers, and mentors plus hands-on workshops from industry pros make sure nobody's stuck. Leave with a shipped project, a new team, and a shot at $15K+ in prizes, recruiter connections, and accelerator spots."
        />

        <h3 className="mb-6 text-center text-2xl font-bold">By the Numbers</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} index={i}>
              <div
                className="relative h-full overflow-hidden rounded-md border border-steel-dark/50 p-6 text-center text-white shadow-card"
                style={{
                  background:
                    'linear-gradient(155deg, var(--color-steel-dark) 0%, var(--color-steel) 45%, var(--color-steel-dark) 100%)',
                }}
              >
                <span aria-hidden="true" className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-steel-light/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                <span aria-hidden="true" className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-steel-light/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                <span aria-hidden="true" className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-steel-light/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                <span aria-hidden="true" className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-steel-light/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                <ContentIcon icon={s.icon} className="relative mx-auto mb-2 h-6 w-6 text-caution" />
                <div className="relative font-heading text-2xl font-bold">{s.number}</div>
                <div className="relative text-sm text-white/70">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
