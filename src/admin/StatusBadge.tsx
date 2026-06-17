import type { SubmissionStatus } from '../lib/queries'

const styles: Record<SubmissionStatus, string> = {
  new: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  read: 'bg-amber-100 text-amber-700 ring-amber-200',
  responded: 'bg-slate-200 text-slate-600 ring-slate-300',
}

const labels: Record<SubmissionStatus, string> = {
  new: 'New',
  read: 'Read',
  responded: 'Responded',
}

export default function StatusBadge({ status }: { status: SubmissionStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-600 ring-1 ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  )
}
