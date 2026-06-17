import { motion } from 'framer-motion'
import { whyUs } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import { staggerContainer, staggerItem } from './ui/Reveal'

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-navy-900 py-24 sm:py-28">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-[130px]" />
      <div className="container-page">
        <SectionHeading
          eyebrow={whyUs.eyebrow}
          title={whyUs.titleLines}
          intro={whyUs.intro}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyUs.items.map((item) => (
            <motion.div
              key={item.number}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-gold-400/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/5 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="font-serif text-3xl font-700 text-white/10 transition-colors group-hover:text-gold-400/30">
                  {item.number}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-xl font-700 text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-200">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
