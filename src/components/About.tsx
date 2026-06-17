import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { about } from '../data/content'
import Reveal from './ui/Reveal'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-navy-900 py-24 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-azure-500/10 blur-[120px]" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        {/* Visual */}
        <Reveal direction="right" className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <div className="glass-card relative overflow-hidden p-10">
              <div className="absolute inset-0 bg-grid-navy bg-[size:32px_32px] opacity-40" />
              <div className="relative flex flex-col items-center text-center">
                <span className="text-7xl">🌍</span>
                <div className="mt-6 font-serif text-6xl font-700 text-gradient-gold">
                  {about.yearsNetwork}
                </div>
                <div className="mt-1 font-display text-xs font-600 uppercase tracking-[0.3em] text-navy-200">
                  {about.yearsNetworkLabel}
                </div>
              </div>
            </div>
            {/* Mission / Vision cards */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[about.mission, about.vision].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -6 }}
                  className="glass-card p-5"
                >
                  <h3 className="font-display text-sm font-700 uppercase tracking-wide text-gold-400">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-200">{card.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-7 bg-gold-400/70" />
              {about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 section-title">
              {about.titleLines.map((line, i) => (
                <span key={i} className="block">
                  {i === about.titleLines.length - 1 ? (
                    <span className="text-gradient-gold">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.06}>
                <p className="text-base leading-relaxed text-navy-200">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <a href={about.cta.href} className="btn-gold mt-8">
              {about.cta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
