import { motion } from 'framer-motion'
import { Building2, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { offices } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import { staggerContainer, staggerItem } from './ui/Reveal'

export default function Offices() {
  return (
    <section className="relative bg-white py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={offices.eyebrow} title={offices.title} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2"
        >
          {offices.items.map((office) => (
            <motion.div
              key={office.tag}
              variants={staggerItem}
              className="relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-card-light"
            >
              <div className="absolute right-0 top-0 h-24 w-24 bg-gold-400/10 blur-2xl" />
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-3 py-1 font-display text-xs font-600 uppercase tracking-widest text-gold-700">
                <Building2 className="h-3.5 w-3.5" />
                {office.tag}
              </span>
              <h3 className="mt-5 font-serif text-2xl font-700 text-navy-900">{office.name}</h3>

              <ul className="mt-5 space-y-3 text-sm text-navy-700">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  <span>{office.address}</span>
                </li>
                {office.phones.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                    <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-gold-600">
                      {p}
                    </a>
                  </li>
                ))}
                {office.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                    <a href={`mailto:${office.email}`} className="hover:text-gold-600">
                      {office.email}
                    </a>
                  </li>
                )}
                {office.website && (
                  <li className="flex items-center gap-3">
                    <Globe className="h-4 w-4 shrink-0 text-gold-500" />
                    <span>{office.website}</span>
                  </li>
                )}
              </ul>

              {office.note && (
                <p className="mt-5 border-t border-navy-100 pt-4 font-display text-xs font-600 uppercase tracking-[0.2em] text-azure-600">
                  {office.note}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
