import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { hero } from '../data/content'
import Counter from './ui/Counter'

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy-radial pb-20 pt-16 sm:pt-20">
      {/* Background grid + orbs */}
      <div className="pointer-events-none absolute inset-0 bg-grid-navy bg-[size:46px_46px] opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-azure-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gold-500/15 blur-[140px]" />

      <div className="container-page relative grid items-center gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        {/* Left: copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            <span className="h-px w-7 bg-gold-400/70" />
            {hero.eyebrow}
          </motion.span>

          <h1 className="mt-6 font-serif text-5xl font-700 leading-[1.05] text-white sm:text-6xl lg:text-7xl [perspective:800px]">
            {hero.titleLines.map((word, i) => {
              const highlight = word === 'Global' || word === 'Opportunities'
              return (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="show"
                  className="mr-3 inline-block"
                >
                  <span className={highlight ? 'text-gradient-gold' : ''}>{word}</span>
                </motion.span>
              )
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-navy-200 sm:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href={hero.primaryCta.href} className="btn-gold">
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={hero.secondaryCta.href} className="btn-outline">
              {hero.secondaryCta.label}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {hero.stats.map((s) => (
              <div key={s.label} className="glass-card px-4 py-4 text-center">
                <div className="font-serif text-3xl font-700 text-gradient-gold">
                  <Counter value={s.value} />
                </div>
                <div className="mt-1 font-display text-[0.65rem] font-600 uppercase tracking-widest text-navy-200">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: rotating globe + pillars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          {/* Orbit rings */}
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-white/10" />
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-navy-600/60 to-navy-800/60 shadow-glow backdrop-blur">
              <span className="absolute h-full w-full animate-pulse-ring rounded-full border border-gold-400/40" />
              <span className="font-serif text-6xl">🌐</span>
            </div>
          </div>
          {/* Floating pillar chips */}
          {hero.pillars.map((p, i) => {
            const positions = [
              'left-0 top-6',
              'right-0 top-1/2 -translate-y-1/2',
              'bottom-4 left-1/2 -translate-x-1/2',
            ]
            return (
              <motion.div
                key={p.label}
                className={`absolute ${positions[i]} glass-card flex items-center gap-2 px-4 py-2.5`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              >
                <span className="text-xl">{p.icon}</span>
                <span className="font-display text-xs font-600 uppercase tracking-wide text-white">
                  {p.label}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Badge + scroll cue */}
      <div className="container-page relative flex flex-col items-center gap-3">
        <span className="rounded-full border border-gold-400/30 bg-gold-400/5 px-5 py-1.5 font-display text-xs font-600 uppercase tracking-[0.3em] text-gold-400">
          {hero.badge}
        </span>
        <motion.a
          href="#about"
          aria-label={hero.scrollLabel}
          className="mt-2 flex flex-col items-center gap-1 text-navy-300 hover:text-gold-400"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span className="font-display text-[0.6rem] uppercase tracking-[0.3em]">
            {hero.scrollLabel}
          </span>
          <ChevronDown className="h-5 w-5" />
        </motion.a>
      </div>
    </section>
  )
}
