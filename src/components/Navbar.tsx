import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { company, nav, joinDelegationCta } from '../data/content'
import Logo from './Logo'

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
            <span>{company.hours}</span>
            <a href={`mailto:${company.email}`} className="hover:text-gold-600">
              {company.email}
            </a>
            <a href={`tel:${company.whatsapp.replace(/\s/g, '')}`} className="hover:text-gold-600">
              {company.whatsapp}
            </a>
            <a href={`tel:${company.phonePrimary.replace(/\s/g, '')}`} className="hover:text-gold-600">
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
