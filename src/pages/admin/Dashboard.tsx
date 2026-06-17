import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase,
  Download,
  ExternalLink,
  Inbox,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { useAuth } from '../../admin/AuthContext'
import Logo from '../../components/Logo'
import StatusBadge from '../../admin/StatusBadge'
import { formatDate, formatShort } from '../../admin/format'
import {
  deleteDelegation,
  deleteEnquiry,
  setDelegationStatus,
  setEnquiryStatus,
  watchDelegations,
  watchEnquiries,
  type Delegation,
  type Enquiry,
  type SubmissionStatus,
} from '../../lib/queries'

type Tab = 'enquiries' | 'delegations'
type Selected =
  | { type: 'enquiry'; data: Enquiry }
  | { type: 'delegation'; data: Delegation }
  | null

const statusFilters: Array<'all' | SubmissionStatus> = ['all', 'new', 'read', 'responded']

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [delegations, setDelegations] = useState<Delegation[]>([])
  const [tab, setTab] = useState<Tab>('enquiries')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | SubmissionStatus>('all')
  const [selected, setSelected] = useState<Selected>(null)

  useEffect(() => {
    const unsubE = watchEnquiries(setEnquiries)
    const unsubD = watchDelegations(setDelegations)
    return () => {
      unsubE()
      unsubD()
    }
  }, [])

  const stats = useMemo(
    () => ({
      enquiriesTotal: enquiries.length,
      enquiriesNew: enquiries.filter((e) => e.status === 'new').length,
      delegationsTotal: delegations.length,
      delegationsNew: delegations.filter((d) => d.status === 'new').length,
    }),
    [enquiries, delegations],
  )

  const filteredEnquiries = useMemo(() => {
    const q = search.toLowerCase()
    return enquiries.filter((e) => {
      if (statusFilter !== 'all' && e.status !== statusFilter) return false
      return [e.fullName, e.email, e.phone, e.service, e.message]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [enquiries, search, statusFilter])

  const filteredDelegations = useMemo(() => {
    const q = search.toLowerCase()
    return delegations.filter((d) => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false
      return [d.fullName, d.companyName, d.designation, d.industry, d.contactNumber, d.package]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [delegations, search, statusFilter])

  function openRecord(sel: Selected) {
    setSelected(sel)
    // Auto-mark a brand-new record as read when first opened.
    if (sel?.type === 'enquiry' && sel.data.status === 'new') {
      setEnquiryStatus(sel.data.id, 'read').catch(console.error)
    } else if (sel?.type === 'delegation' && sel.data.status === 'new') {
      setDelegationStatus(sel.data.id, 'read').catch(console.error)
    }
  }

  function exportCsv() {
    const rows =
      tab === 'enquiries'
        ? filteredEnquiries.map((e) => ({
            Date: formatDate(e.createdAt),
            Name: e.fullName,
            Email: e.email,
            Phone: e.phone,
            Service: e.service,
            Message: e.message,
            Status: e.status,
          }))
        : filteredDelegations.map((d) => ({
            Date: formatDate(d.createdAt),
            Name: d.fullName,
            Company: d.companyName,
            Designation: d.designation,
            'Year Established': d.yearEstablished,
            Industry: d.industry,
            Affiliation: d.affiliation,
            Package: d.package,
            Contact: d.contactNumber,
            'Office Address': d.officeAddress,
            'Profile File': d.profileFileName,
            Status: d.status,
          }))
    downloadCsv(`${tab}-${new Date().toISOString().slice(0, 10)}.csv`, rows)
  }

  return (
    <div className="min-h-screen bg-slate-100 text-navy-800">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <Logo className="h-10" variant="dark" />
            <div className="hidden sm:block">
              <div className="font-serif text-lg font-700 leading-none text-navy-800">
                Admin Panel
              </div>
              <div className="text-xs text-slate-400">First Option Worldwide</div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm text-slate-500 hover:text-navy-800 sm:flex"
            >
              <ExternalLink className="h-4 w-4" /> View site
            </Link>
            <span className="hidden text-sm text-slate-400 md:inline">{user?.email}</span>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-600 text-navy-800 transition hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={MessageSquare} label="Total Enquiries" value={stats.enquiriesTotal} />
          <StatCard icon={Inbox} label="New Enquiries" value={stats.enquiriesNew} accent />
          <StatCard icon={Briefcase} label="Delegation Registrations" value={stats.delegationsTotal} />
          <StatCard icon={Inbox} label="New Registrations" value={stats.delegationsNew} accent />
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex rounded-xl bg-slate-100 p-1">
            <TabButton active={tab === 'enquiries'} onClick={() => setTab('enquiries')}>
              Enquiries
              {stats.enquiriesNew > 0 && <Pill>{stats.enquiriesNew}</Pill>}
            </TabButton>
            <TabButton active={tab === 'delegations'} onClick={() => setTab('delegations')}>
              Trade Delegations
              {stats.delegationsNew > 0 && <Pill>{stats.delegationsNew}</Pill>}
            </TabButton>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm capitalize outline-none focus:border-gold-400"
            >
              {statusFilters.map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? 'All statuses' : s}
                </option>
              ))}
            </select>
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-600 text-navy-800 transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" /> CSV
            </button>
          </div>
        </div>

        {/* List */}
        <div className="mt-6 space-y-3">
          {tab === 'enquiries' ? (
            filteredEnquiries.length === 0 ? (
              <EmptyState label="No enquiries found" />
            ) : (
              filteredEnquiries.map((e) => (
                <RecordRow
                  key={e.id}
                  title={e.fullName}
                  subtitle={e.email}
                  tag={e.service}
                  preview={e.message}
                  date={formatShort(e.createdAt)}
                  status={e.status}
                  onClick={() => openRecord({ type: 'enquiry', data: e })}
                />
              ))
            )
          ) : filteredDelegations.length === 0 ? (
            <EmptyState label="No delegation registrations found" />
          ) : (
            filteredDelegations.map((d) => (
              <RecordRow
                key={d.id}
                title={d.companyName}
                subtitle={`${d.fullName} · ${d.designation}`}
                tag={d.package}
                preview={`${d.industry} · ${d.contactNumber}`}
                date={formatShort(d.createdAt)}
                status={d.status}
                onClick={() => openRecord({ type: 'delegation', data: d })}
              />
            ))
          )}
        </div>
      </main>

      {/* Detail slide-over */}
      <AnimatePresence>
        {selected && (
          <DetailDrawer
            selected={selected}
            onClose={() => setSelected(null)}
            onStatus={async (status) => {
              if (selected.type === 'enquiry') await setEnquiryStatus(selected.data.id, status)
              else await setDelegationStatus(selected.data.id, status)
              setSelected((cur) =>
                cur ? ({ ...cur, data: { ...cur.data, status } } as Selected) : cur,
              )
            }}
            onDelete={async () => {
              if (selected.type === 'enquiry') await deleteEnquiry(selected.data.id)
              else await deleteDelegation(selected.data.id)
              setSelected(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Inbox
  label: string
  value: number
  accent?: boolean
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">{label}</span>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            accent ? 'bg-gold-400/15 text-gold-600' : 'bg-navy-900/5 text-navy-700'
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 font-serif text-3xl font-700 text-navy-800">{value}</div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-600 transition ${
        active ? 'bg-white text-navy-800 shadow-sm' : 'text-slate-500 hover:text-navy-800'
      }`}
    >
      {children}
    </button>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-400 px-1.5 text-[0.7rem] font-700 text-navy-900">
      {children}
    </span>
  )
}

function RecordRow({
  title,
  subtitle,
  tag,
  preview,
  date,
  status,
  onClick,
}: {
  title: string
  subtitle: string
  tag: string
  preview: string
  date: string
  status: SubmissionStatus
  onClick: () => void
}) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left transition hover:border-gold-400/60 hover:shadow-sm ${
        status === 'new' ? 'border-gold-400/40' : 'border-slate-200'
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 font-serif text-lg font-700 text-gold-400">
        {title.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-600 text-navy-800">{title}</span>
          {status === 'new' && <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />}
        </div>
        <div className="truncate text-sm text-slate-500">{subtitle}</div>
        <div className="mt-0.5 truncate text-xs text-slate-400">{preview}</div>
      </div>
      <div className="hidden shrink-0 sm:block">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-600 text-slate-600">
          {tag || '—'}
        </span>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <StatusBadge status={status} />
        <span className="text-xs text-slate-400">{date}</span>
      </div>
    </motion.button>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
      <Inbox className="h-10 w-10 text-slate-300" />
      <p className="mt-3 text-sm text-slate-400">{label}</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function DetailDrawer({
  selected,
  onClose,
  onStatus,
  onDelete,
}: {
  selected: NonNullable<Selected>
  onClose: () => void
  onStatus: (s: SubmissionStatus) => Promise<void>
  onDelete: () => Promise<void>
}) {
  const [confirming, setConfirming] = useState(false)
  const isEnquiry = selected.type === 'enquiry'
  const data = selected.data

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50"
    >
      <div className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" onClick={onClose} />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
        className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-slate-50 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 bg-white p-6">
          <div>
            <span className="text-xs font-600 uppercase tracking-widest text-gold-600">
              {isEnquiry ? 'Enquiry' : 'Trade Delegation Registration'}
            </span>
            <h3 className="mt-1 font-serif text-2xl font-700 text-navy-800">
              {isEnquiry ? data.fullName : (data as Delegation).companyName}
            </h3>
            <div className="mt-2">
              <StatusBadge status={data.status} />
              <span className="ml-3 text-xs text-slate-400">{formatDate(data.createdAt)}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-navy-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {isEnquiry ? (
            <EnquiryBody e={data as Enquiry} />
          ) : (
            <DelegationBody d={data as Delegation} />
          )}
        </div>

        {/* Actions */}
        <div className="border-t border-slate-200 bg-white p-4">
          {confirming ? (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-600">Delete this record permanently?</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirming(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-600"
                >
                  Cancel
                </button>
                <button
                  onClick={onDelete}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onStatus('read')}
                disabled={data.status === 'read'}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-600 text-navy-800 transition hover:bg-slate-50 disabled:opacity-40"
              >
                Mark Read
              </button>
              <button
                onClick={() => onStatus('responded')}
                disabled={data.status === 'responded'}
                className="rounded-lg bg-navy-800 px-3 py-2 text-sm font-600 text-white transition hover:bg-navy-700 disabled:opacity-40"
              >
                Mark Responded
              </button>
              <button
                onClick={() => setConfirming(true)}
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-600 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </motion.div>
  )
}

function EnquiryBody({ e }: { e: Enquiry }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <a
          href={`mailto:${e.email}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-3 py-2 text-sm font-600 text-white hover:bg-navy-700"
        >
          <Mail className="h-4 w-4" /> Reply by email
        </a>
        {e.phone && (
          <a
            href={`tel:${e.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-600 text-navy-800 hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
        )}
      </div>
      <Detail label="Email" value={e.email} />
      <Detail label="Phone" value={e.phone || '—'} />
      <Detail label="Service" value={e.service || '—'} />
      <div>
        <div className="text-xs font-600 uppercase tracking-wide text-slate-400">Message</div>
        <p className="mt-2 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-navy-800">
          {e.message}
        </p>
      </div>
    </div>
  )
}

function DelegationBody({ d }: { d: Delegation }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        <a
          href={`tel:${d.contactNumber.replace(/\s/g, '')}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-navy-900 px-3 py-2 text-sm font-600 text-white hover:bg-navy-700"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        {d.profileUrl && (
          <a
            href={d.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gold-400/50 bg-gold-400/10 px-3 py-2 text-sm font-600 text-gold-700 hover:bg-gold-400/20"
          >
            <Download className="h-4 w-4" /> Company Profile
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Detail label="Contact Person" value={d.fullName} />
        <Detail label="Designation" value={d.designation} />
        <Detail label="Year Established" value={d.yearEstablished} />
        <Detail label="Industry / Sector" value={d.industry} />
      </div>
      <Detail label="Package" value={d.package} />
      <Detail label="Affiliation (Govt / Trade Bodies)" value={d.affiliation || '—'} />
      <Detail label="Contact Number" value={d.contactNumber} />
      <Detail label="Office Address" value={d.officeAddress} />
      <Detail
        label="Company Profile"
        value={d.profileFileName || 'No file attached'}
      />
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-600 uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-sm text-navy-800">{value}</div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function downloadCsv(filename: string, rows: Array<Record<string, string>>) {
  if (rows.length === 0) return
  const headers = Object.keys(rows[0])
  const escape = (v: string) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [
    headers.join(','),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(',')),
  ].join('\n')
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
