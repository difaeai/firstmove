interface LogoProps {
  className?: string
  compact?: boolean
}

/** Globe mark + "First Option Worldwide" wordmark. */
export default function Logo({ className = '', compact = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <defs>
          <linearGradient id="logoGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e8c766" />
            <stop offset="1" stopColor="#a3801f" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="19" stroke="url(#logoGold)" strokeWidth="2.4" />
        <ellipse cx="32" cy="32" rx="8.5" ry="19" stroke="url(#logoGold)" strokeWidth="1.5" />
        <line x1="13" y1="32" x2="51" y2="32" stroke="url(#logoGold)" strokeWidth="1.5" />
        <path
          d="M17 22 H47 M17 42 H47"
          stroke="url(#logoGold)"
          strokeWidth="1.1"
          opacity="0.7"
        />
        <circle cx="32" cy="32" r="2.6" fill="url(#logoGold)" />
      </svg>
      {!compact && (
        <div className="leading-none">
          <div className="font-serif text-lg font-700 tracking-wide text-white">
            First Option
          </div>
          <div className="font-display text-[0.62rem] font-600 uppercase tracking-[0.42em] text-gold-400">
            Worldwide
          </div>
        </div>
      )}
    </div>
  )
}
