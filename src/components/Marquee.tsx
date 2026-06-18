import { marqueeItems } from '../data/content'

/** Infinite scrolling strip of service keywords. */
export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="border-y border-navy-100 bg-navy-50 py-5">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-sm font-600 uppercase tracking-[0.2em] text-navy-500">
                {item}
              </span>
              <span className="text-gold-500">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
