import Reveal from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string | string[]
  intro?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const titleLines = Array.isArray(title) ? title : [title]
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <div className={`flex flex-col ${alignment} ${align === 'center' ? 'mx-auto' : ''} max-w-3xl`}>
      <Reveal>
        <span className="eyebrow">
          <span className="h-px w-7 bg-gold-400/70" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className={`mt-4 section-title ${light ? 'text-navy-800' : 'text-white'}`}>
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {i === titleLines.length - 1 ? (
                <span className="text-gradient-gold">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
              light ? 'text-navy-600' : 'text-navy-200'
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}
