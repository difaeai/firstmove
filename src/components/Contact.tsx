import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, MapPin, Phone, Globe, Send } from 'lucide-react'
import { contact } from '../data/content'
import { isFirebaseConfigured } from '../lib/firebase'
import { submitEnquiry } from '../lib/queries'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import NotConfiguredNotice from './ui/NotConfiguredNotice'

const iconFor: Record<string, typeof Mail> = {
  Headquarters: MapPin,
  Phone: Phone,
  WhatsApp: Phone,
  Email: Mail,
  Website: Globe,
}

const empty = { fullName: '', email: '', phone: '', service: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  const update = (k: keyof typeof empty) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isFirebaseConfigured) return
    setStatus('sending')
    setError('')
    try {
      await submitEnquiry(form)
      setStatus('done')
      setForm(empty)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again or email us directly.')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-navy-950 py-24 sm:py-28">
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-gold-500/10 blur-[130px]" />
      <div className="container-page">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro} />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <Reveal direction="right">
            <div className="glass-card p-7 sm:p-9">
              <h3 className="font-serif text-2xl font-700 text-white">{contact.formHeading}</h3>
              <p className="mt-1 text-sm text-navy-200">{contact.formSubheading}</p>

              {!isFirebaseConfigured && <NotConfiguredNotice className="mt-6" />}

              {status === 'done' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex flex-col items-center rounded-2xl border border-gold-400/30 bg-gold-400/5 p-8 text-center"
                >
                  <CheckCircle2 className="h-12 w-12 text-gold-400" />
                  <h4 className="mt-4 font-serif text-xl font-700 text-white">Message Sent!</h4>
                  <p className="mt-2 text-sm text-navy-200">{contact.intro}</p>
                  <button onClick={() => setStatus('idle')} className="btn-outline mt-6">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="mt-7 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="field-label">Full Name</label>
                      <input
                        required
                        value={form.fullName}
                        onChange={update('fullName')}
                        className="field-input"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="field-label">Email Address</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        className="field-input"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="field-label">Phone Number</label>
                      <input
                        value={form.phone}
                        onChange={update('phone')}
                        className="field-input"
                        placeholder="+92 …"
                      />
                    </div>
                    <div>
                      <label className="field-label">Service</label>
                      <select required value={form.service} onChange={update('service')} className="field-input">
                        <option value="" disabled>
                          Select...
                        </option>
                        {contact.services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      className="field-input resize-none"
                      placeholder="Tell us about your requirements…"
                    />
                  </div>

                  {status === 'error' && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === 'sending' || !isFirebaseConfigured}
                    className="btn-gold w-full"
                  >
                    {status === 'sending' ? (
                      'Sending…'
                    ) : (
                      <>
                        {contact.submitLabel} <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact cards */}
          <Reveal direction="left">
            <div className="grid gap-4">
              {contact.cards.map((card) => {
                const Icon = iconFor[card.label] ?? Mail
                return (
                  <div
                    key={card.label}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-gold-400/30"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-sheen text-navy-900">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-display text-xs font-600 uppercase tracking-widest text-gold-400">
                        {card.label}
                      </div>
                      <div className="mt-1 text-sm leading-relaxed text-navy-100">{card.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
