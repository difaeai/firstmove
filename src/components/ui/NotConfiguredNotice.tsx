import { AlertTriangle } from 'lucide-react'

/** Shown in place of a working form when Firebase env vars are not yet set. */
export default function NotConfiguredNotice({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 ${className}`}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        This form is not connected yet. Add your Firebase keys to a{' '}
        <code className="rounded bg-amber-100 px-1">.env</code> file (see{' '}
        <code className="rounded bg-amber-100 px-1">.env.example</code>) to start receiving
        submissions in the admin panel.
      </p>
    </div>
  )
}
