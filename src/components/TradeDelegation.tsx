import { useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, FileUp, Loader2, X } from 'lucide-react'
import { tradeDelegation as td } from '../data/content'
import { isFirebaseConfigured } from '../lib/firebase'
import { submitDelegation, uploadDelegationProfile } from '../lib/queries'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import NotConfiguredNotice from './ui/NotConfiguredNotice'

const empty = {
  fullName: '',
  companyName: '',
  designation: '',
  yearEstablished: '',
  industry: '',
  affiliation: '',
  package: '',
  contactNumber: '',
  officeAddress: '',
}

const MAX_BYTES = 10 * 1024 * 1024

export default function TradeDelegation() {
  const [form, setForm] = useState(empty)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const update = (k: keyof typeof empty) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  function pickFile(f: File | null) {
    if (!f) return setFile(null)
    if (f.size > MAX_BYTES) {
      setError('File is larger than 10MB.')
      return
    }
    setError('')
    setFile(f)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isFirebaseConfigured) return
    if (!form.package) {
      setError('Please select a delegation package.')
      return
    }
    setStatus('sending')
    setError('')
    try {
      const profile = file ? await uploadDelegationProfile(file) : undefined
      await submitDelegation(form, profile)
      setStatus('done')
      setForm(empty)
      setFile(null)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again or email us directly.')
      setStatus('error')
    }
  }

  return (
    <section id="trade-delegation" className="relative overflow-hidden bg-navy-900 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-navy bg-[size:46px_46px] opacity-30" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-azure-500/15 blur-[130px]" />
      <div className="container-page relative">
        <SectionHeading eyebrow={td.eyebrow} title={td.title} intro={td.intro} />

        <Reveal className="mx-auto mt-14 max-w-3xl">
          <div className="glass-card overflow-hidden">
            {/* Header band */}
            <div className="border-b border-white/10 bg-navy-950/50 p-7">
              <h3 className="font-serif text-2xl font-700 text-white">{td.formHeading}</h3>
              <p className="mt-1 text-sm text-navy-200">{td.formSubheading}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-4 py-1.5 text-xs text-gold-300">
                <span className="font-600 uppercase tracking-widest">{td.destinationsLabel}:</span>
                {td.destinationsValue}
              </div>
            </div>

            <div className="p-7 sm:p-9">
              {!isFirebaseConfigured && <NotConfiguredNotice className="mb-6" />}

              {status === 'done' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center rounded-2xl border border-gold-400/30 bg-gold-400/5 p-10 text-center"
                >
                  <CheckCircle2 className="h-14 w-14 text-gold-400" />
                  <h4 className="mt-4 font-serif text-2xl font-700 text-white">{td.successTitle}</h4>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-navy-200">
                    {td.successText}
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-outline mt-7">
                    Register another company
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <p className="text-xs leading-relaxed text-navy-300">{td.requiredNote}</p>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" required value={form.fullName} onChange={update('fullName')} />
                    <Field
                      label="Company Name"
                      required
                      value={form.companyName}
                      onChange={update('companyName')}
                    />
                    <Field
                      label="Designation / Title"
                      required
                      value={form.designation}
                      onChange={update('designation')}
                    />
                    <Field
                      label="Year of Establishment"
                      required
                      value={form.yearEstablished}
                      onChange={update('yearEstablished')}
                      placeholder="e.g. 2015"
                    />
                  </div>

                  <div>
                    <label className="field-label">
                      Industry / Sector <span className="text-gold-400">*</span>
                    </label>
                    <select required value={form.industry} onChange={update('industry')} className="field-input">
                      <option value="" disabled>
                        Select your industry...
                      </option>
                      {td.industries.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    label="Affiliation with Government / Trade Bodies"
                    value={form.affiliation}
                    onChange={update('affiliation')}
                    placeholder="Optional"
                  />

                  {/* Package picker */}
                  <div>
                    <label className="field-label">
                      Select Delegation Package <span className="text-gold-400">*</span>
                    </label>
                    <div className="mt-2 grid gap-4 sm:grid-cols-2">
                      {td.packages.map((p) => {
                        const selected = form.package === p.title
                        return (
                          <button
                            type="button"
                            key={p.title}
                            onClick={() => setForm((f) => ({ ...f, package: p.title }))}
                            className={`rounded-2xl border p-5 text-left transition-all ${
                              selected
                                ? 'border-gold-400 bg-gold-400/10 shadow-glow'
                                : 'border-white/10 bg-navy-950/50 hover:border-gold-400/40'
                            }`}
                          >
                            <div className="text-2xl">{p.flags}</div>
                            <div className="mt-2 font-serif text-lg font-700 text-white">{p.title}</div>
                            <div className="mt-0.5 text-xs text-navy-200">{p.subtitle}</div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Contact Number"
                      required
                      value={form.contactNumber}
                      onChange={update('contactNumber')}
                      placeholder="+92 …"
                    />
                    <Field
                      label="Office Address"
                      required
                      value={form.officeAddress}
                      onChange={update('officeAddress')}
                    />
                  </div>

                  {/* File upload */}
                  <div>
                    <label className="field-label">{td.uploadHint}</label>
                    {file ? (
                      <div className="flex items-center justify-between rounded-xl border border-gold-400/30 bg-gold-400/5 px-4 py-3">
                        <span className="truncate text-sm text-white">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => pickFile(null)}
                          className="text-navy-200 hover:text-red-400"
                          aria-label="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault()
                          setDragOver(true)
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault()
                          setDragOver(false)
                          pickFile(e.dataTransfer.files?.[0] ?? null)
                        }}
                        className={`flex cursor-pointer flex-col items-center rounded-xl border border-dashed px-4 py-8 text-center transition-colors ${
                          dragOver ? 'border-gold-400 bg-gold-400/10' : 'border-white/15 hover:border-gold-400/40'
                        }`}
                      >
                        <FileUp className="h-6 w-6 text-gold-400" />
                        <p className="mt-2 text-sm font-600 text-white">{td.uploadCta}</p>
                        <p className="mt-1 text-xs text-navy-300">{td.uploadSub}</p>
                      </div>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
                      className="hidden"
                      onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  {(status === 'error' || error) && <p className="text-sm text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={status === 'sending' || !isFirebaseConfigured}
                    className="btn-gold w-full"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                      </>
                    ) : (
                      td.submitLabel
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (e: { target: { value: string } }) => void
  required?: boolean
  placeholder?: string
}

function Field({ label, value, onChange, required, placeholder }: FieldProps) {
  return (
    <div>
      <label className="field-label">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      <input
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="field-input"
      />
    </div>
  )
}
