import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { globalReach } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import { staggerContainer, staggerItem } from './ui/Reveal'

export default function GlobalReach() {
  return (
    <section
      id="global-reach"
      className="relative overflow-hidden bg-navy-950 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-navy bg-[size:46px_46px] opacity-40" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow={globalReach.eyebrow}
          title={globalReach.titleLines}
          intro={globalReach.intro}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {globalReach.regions.map((region) => (
            <motion.div
              key={region.name}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-navy-900 p-8"
            >
              <div className="pointer-events-none absolute -right-8 -top-10 text-9xl opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-20">
                {region.icon}
              </div>
              <div className="relative">
                <span className="text-4xl">{region.icon}</span>
                <h3 className="mt-4 font-serif text-2xl font-700 text-white">{region.name}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {region.countries.map((c) => (
                    <li
                      key={c}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-500 text-navy-100 transition-colors group-hover:border-gold-400/30"
                    >
                      <MapPin className="h-3 w-3 text-gold-400" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
