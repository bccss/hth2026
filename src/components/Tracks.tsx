import Card from './ui/Card'
import Pill from './ui/Pill'
import SectionHeader from './ui/SectionHeader'
import { tracks } from '../data/content'

export default function Tracks() {
  return (
    <section id="tracks" className="px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeader
          eyebrow="Tracks"
          title="Build In a Track That Excites You"
          lead="Placeholder tracks — finalize with sponsors & organizing team. Each track will have its own prize category."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <Card key={track.title} className={`text-left ${track.ghost ? 'border-dashed opacity-75' : ''}`}>
              <div className="mb-4 text-3xl">{track.icon}</div>
              <h3 className="mb-2 text-lg font-bold">{track.title}</h3>
              <p className="text-text-muted">{track.description}</p>
              <div className="mt-4">
                <Pill>Best in Track: TBA</Pill>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
