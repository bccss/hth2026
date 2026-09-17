import { useState } from 'react'
import SectionHeader from './ui/SectionHeader'
import { type FaqCategory, faqCategories, faqs } from '../data/content'

export default function Faq() {
  const [category, setCategory] = useState<'all' | FaqCategory>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered = category === 'all' ? faqs : faqs.filter((f) => f.category === category)

  return (
    <section id="faq" className="px-6 py-20">
      <div className="mx-auto max-w-[1140px]">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          lead="Everything you need to know about participating in HTH 2026."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {faqCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setCategory(cat.key)
                setOpenIndex(null)
              }}
              className={`rounded-full px-5 py-3 font-heading text-sm font-semibold ${
                category === cat.key ? 'bg-accent text-white' : 'bg-bg-alt text-text-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((faq, i) => {
            const open = openIndex === i
            return (
              <div key={faq.question} className="self-start rounded-md border border-border bg-surface">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left font-heading font-bold"
                >
                  <span>{faq.question}</span>
                  <span className="flex-shrink-0 text-xl leading-none text-accent">{open ? '−' : '+'}</span>
                </button>
                <div
                  className="overflow-hidden px-6 transition-[max-height,padding] duration-300"
                  style={{ maxHeight: open ? 240 : 0 }}
                >
                  <p className="pb-5 text-sm text-text-muted">{faq.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
