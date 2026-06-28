import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { company, nav, joinDelegationCta } from '../data/content'
import Logo from './Logo'

// WhatsApp brand glyph — lucide-react has no WhatsApp icon, so we inline it.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.488-.917zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden border-b border-navy-100 bg-navy-50 text-navy-600 lg:block">
        <div className="container-page flex items-center justify-between py-2 text-xs">
          <span className="truncate">{company.headquartersAddress}</span>
          <div className="flex items-center gap-6">
            <a href={`mailto:${company.email}`} className="hover:text-gold-600">
              {company.email}
            </a>
            <a
              href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-gold-600"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              {company.whatsapp}
            </a>
            <a
              href={`tel:${company.phonePrimary.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-gold-600"
            >
              <Phone className="h-3.5 w-3.5" />
              {company.phonePrimary}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-navy-100 bg-white/85 backdrop-blur-lg shadow-card-light'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-page flex items-center justify-between py-4">
          <a href="#top" aria-label={company.name}>
            <Logo className="h-10 sm:h-12" variant="dark" />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative font-display text-sm font-600 uppercase tracking-wider text-navy-700 transition hover:text-navy-900"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold-sheen transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={joinDelegationCta.href}
              className="btn-outline !px-5 !py-3 font-display text-sm font-600 uppercase tracking-wider"
            >
              {joinDelegationCta.label}
            </a>
            <a href="#contact" className="btn-gold !px-6 !py-3">
              Get In Touch
            </a>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-navy-200 text-navy-700 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white p-7 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Logo className="h-10 sm:h-12" variant="dark" />
                <button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-navy-200 text-navy-700"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-10 flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-navy-100 py-4 font-display text-lg font-600 uppercase tracking-wide text-navy-700 hover:text-gold-600"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                <a
                  href={joinDelegationCta.href}
                  onClick={() => setOpen(false)}
                  className="btn-outline w-full"
                >
                  {joinDelegationCta.label}
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-gold w-full"
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
