import { useState } from 'react'
import { Plus, Minus } from '@phosphor-icons/react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { faqs } from '../data/content'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeader title="FAQ" />

        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map((faq, i) => {
            const open = openIndex === i
            return (
              <Reveal key={faq.question} index={i % 4} y={10} className="self-start">
                <div className="rounded-md border border-border bg-surface">
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left font-heading font-bold"
                  >
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-accent">
                      {open ? <Minus weight="bold" className="h-5 w-5" /> : <Plus weight="bold" className="h-5 w-5" />}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden px-6 transition-[max-height,padding] duration-300"
                    style={{ maxHeight: open ? 240 : 0 }}
                  >
                    <p className="pb-5 text-sm text-text-muted">{faq.answer}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
