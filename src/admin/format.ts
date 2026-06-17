import type { Timestamp } from 'firebase/firestore'

/** Firestore Timestamp -> "17 Jun 2026, 3:42 PM" (falls back gracefully). */
export function formatDate(ts: Timestamp | null): string {
  if (!ts) return 'Just now'
  try {
    const d = ts.toDate()
    return d.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  } catch {
    return '—'
  }
}

/** Relative-ish short date for compact lists. */
export function formatShort(ts: Timestamp | null): string {
  if (!ts) return 'now'
  try {
    return ts.toDate().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    })
  } catch {
    return '—'
  }
}
