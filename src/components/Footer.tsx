import { Link } from 'react-router-dom'
import { footer, nav } from '../data/content'
import Logo from './Logo'

// Maps footer link labels to the on-page anchors where they exist.
const anchorFor: Record<string, string> = {
  'About Us': '#about',
  'Why Choose Us': '#why-us',
  'Global Reach': '#global-reach',
  'Our Offices': '#global-reach',
  Contact: '#contact',
  'Trade Facilitation': '#services',
  'Business Delegations': '#services',
  'B2B Matchmaking': '#services',
  'Travel & Tours': '#services',
  'Immigration Advisory': '#services',
  'Trade Delegation Form': '#trade-delegation',
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-950 pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 font-serif text-lg italic text-gold-300">{footer.motto}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">{footer.blurb}</p>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-700 uppercase tracking-widest text-white">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((label) => (
                  <li key={label}>
                    <a
                      href={anchorFor[label] ?? '#top'}
                      className="text-sm text-navy-200 transition-colors hover:text-gold-400"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="font-display text-sm font-700 uppercase tracking-widest text-white">
              {footer.contact.title}
            </h4>
            <ul className="mt-5 space-y-3">
              {footer.contact.lines.map((line) => (
                <li key={line} className="text-sm text-navy-200">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-navy-300 md:flex-row md:items-center md:justify-between">
          <p>{footer.copyright}</p>
          <p className="md:text-right">{footer.addressLine}</p>
        </div>

        {/* Quick-jump + staff login */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 py-5">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-display text-[0.65rem] font-600 uppercase tracking-widest text-navy-300 hover:text-gold-400"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            to="/admin"
            className="font-display text-[0.65rem] font-600 uppercase tracking-widest text-navy-400 transition-colors hover:text-gold-400"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
