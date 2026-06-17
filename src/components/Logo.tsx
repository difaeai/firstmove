interface LogoProps {
  /** Height utility class(es), e.g. "h-12". Width scales automatically. */
  className?: string
  /**
   * 'light' renders the logo in white (for dark backgrounds — nav, footer).
   * 'dark' keeps the original navy/blue artwork (for light backgrounds — admin).
   */
  variant?: 'light' | 'dark'
}

/** The real First Option Worldwide brand lockup (globe + handshake + wordmark). */
export default function Logo({ className = 'h-12', variant = 'light' }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="First Option Worldwide — Gateway to Global Opportunities"
      draggable={false}
      className={`${className} w-auto select-none ${variant === 'light' ? 'logo-white' : ''}`}
    />
  )
}
