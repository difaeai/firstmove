import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { services } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import { staggerContainer, staggerItem } from './ui/Reveal'

export default function Services() {
  return (
    <section id="services" className="relative bg-navy-950 py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="container-page">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} intro={services.intro} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {services.items.map((service) => (
            <motion.article
              key={service.number}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-900 p-8 transition-colors hover:border-gold-400/40"
            >
              <div className="pointer-events-none absolute -right-6 -top-8 font-serif text-[8rem] font-700 leading-none text-white/5 transition-colors group-hover:text-gold-400/10">
                {service.number}
              </div>

              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-sheen text-3xl shadow-glow">
                  {service.icon}
                </div>
                <h3 className="mt-6 font-serif text-2xl font-700 text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">{service.subtitle}</p>

                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-navy-100">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-400">
                        <Check className="h-3 w-3" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
