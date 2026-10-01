import { speakers, stats } from '../data/content'
import { HangingTool } from './ui/toolArt'

// Plank surface — pine fill, walnut border + "nail dot" corners, 0 radius
// (STYLE_GUIDE.md section 3/4, wood skin). Shared by every block in this
// section so About reads as a bench of planked panels.
const plank = 'relative rounded-none border-[3px] border-walnut bg-pine p-5 text-plank-text tall:p-7'
const plankDark = 'relative rounded-none border-[3px] border-walnut bg-walnut p-5 text-cream tall:p-7'
const nailDots = (
  <>
    <span aria-hidden="true" className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-walnut" />
    <span aria-hidden="true" className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-walnut" />
  </>
)

// Three headline stats for the pegboard — the full placeholder set lives in
// content.ts for reuse elsewhere; this section only has room for a trio.
const headlineStats = [stats[0], stats[2], stats[3]]

export default function About() {
  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] md:min-h-0 flex-col overflow-hidden bg-soil px-6 py-6 sm:py-10"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% -10%, rgba(255,220,140,.35), transparent 55%), radial-gradient(circle, rgba(0,0,0,.35) 0 3px, transparent 4px)',
        backgroundSize: 'auto, 38px 38px',
      }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center gap-4 sm:gap-6 md:overflow-hidden tall:gap-8">
        <div className="relative">
          {/* tools hanging either side of the intro sign (only where there's wall to spare) */}
          <div className="absolute inset-y-0 left-0 hidden items-start gap-3 xl:flex">
            <HangingTool tool="Hammer" className="h-36 w-16 tall:h-44 tall:w-20" />
            <HangingTool tool="Wrench" delay={-1.3} className="mt-6 h-32 w-12 tall:h-40 tall:w-14" />
          </div>
          <div className="absolute inset-y-0 right-0 hidden items-start gap-3 xl:flex">
            <HangingTool tool="Level" delay={-2.1} className="mt-4 h-40 w-10 tall:h-48 tall:w-12" />
            <HangingTool tool="Saw" delay={-0.7} className="h-36 w-16 tall:h-44 tall:w-20" />
          </div>
          <div data-reveal className={`${plank} mx-auto w-full max-w-5xl text-center`} style={{ transform: 'rotate(-0.8deg)' }}>
            {nailDots}
            <p className="mb-2 font-heading text-sm font-bold uppercase tracking-widest text-rust tall:text-base">About</p>
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl tall:text-5xl">What is Hack the Heights?</h2>
            <p className="mx-auto max-w-3xl text-plank-text-muted tall:text-xl">
              Boston College's annual hackathon where innovation meets community. This 24-hour coding marathon brings together creative minds to build tech
              solutions, learn new skills, and collaborate on impactful projects — building the future, one block at a time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-6">
          {headlineStats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className={`${plankDark} text-lg leading-tight max-sm:p-3 max-sm:text-xs tall:text-xl`}
              style={{ transform: `rotate(${i % 2 === 0 ? -0.8 : 0.7}deg)`, ['--d' as string]: `${120 + i * 100}ms` }}
            >
              <b className="font-heading text-2xl sm:text-3xl tall:text-5xl">{s.number}</b>
              <br />
              {s.label}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 md:gap-12">
          <div className="-my-10 hidden items-start gap-3 md:flex">
            <HangingTool tool="TapeMeasure" delay={-1.8} className="h-20 w-16 tall:h-24 tall:w-20" />
            <HangingTool tool="Screwdriver" delay={-0.4} className="h-24 w-6 tall:h-32 tall:w-8" />
          </div>
          <div
            data-reveal
            className={`${plank} max-w-xs text-center font-heading text-xl font-bold uppercase tracking-wide tall:text-2xl`}
            style={{ transform: 'rotate(0.7deg)' }}
          >
            {nailDots}
            Speakers
          </div>
          <div className="-my-10 hidden items-start gap-3 md:flex">
            <HangingTool tool="Pliers" delay={-2.6} className="h-24 w-12 tall:h-32 tall:w-14" />
            <HangingTool tool="Drill" delay={-1.1} className="h-20 w-16 tall:h-24 tall:w-20" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6">
          {speakers.map((s, i) => (
            <div
              key={i}
              data-reveal
              className={`${plank} flex items-center gap-4 text-left`}
              style={{ transform: `rotate(${i % 2 === 0 ? -0.8 : 0.7}deg)`, ['--d' as string]: `${i * 100}ms` }}
            >
              {nailDots}
              <img
                src="https://placehold.co/160x160?text=Speaker"
                alt="Speaker headshot placeholder"
                className="h-14 w-14 shrink-0 rounded-full border-[3px] border-walnut object-cover tall:h-20 tall:w-20"
              />
              <div>
                <h4 className="text-lg font-bold tall:text-xl">{s.name}</h4>
                <p className="text-plank-text-muted">{s.job}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
