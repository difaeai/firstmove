import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Counts up to the numeric part of a value string when scrolled into view,
 * preserving any prefix/suffix (e.g. "15+" -> counts to 15 and keeps the "+").
 */
export default function Counter({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(value)

  // Memoized so its identity is stable across renders — otherwise the effect
  // below would re-run every render and restart the count-up animation forever.
  const match = useMemo(() => value.match(/^(\D*)(\d+)(\D*)$/), [value])

  useEffect(() => {
    if (!inView || !match) return
    const [, prefix, numStr, suffix] = match
    const target = parseInt(numStr, 10)
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, duration, match])

  return <span ref={ref}>{match ? display : value}</span>
}
