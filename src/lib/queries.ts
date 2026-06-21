// ----------------------------------------------------------------------------
// Data layer for the two kinds of "queries" the admin receives:
//   * enquiries   — from the Contact / "Send an Enquiry" form
//   * delegations — from the Trade Delegation Registration form
// ----------------------------------------------------------------------------
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from './firebase'
import { company } from '../data/content'

export type SubmissionStatus = 'new' | 'read' | 'responded'

export interface Enquiry {
  id: string
  fullName: string
  email: string
  phone: string
  service: string
  message: string
  status: SubmissionStatus
  createdAt: Timestamp | null
}

export interface Delegation {
  id: string
  fullName: string
  companyName: string
  designation: string
  yearEstablished: string
  industry: string
  affiliation: string
  package: string
  contactNumber: string
  officeAddress: string
  profileFileName: string
  profileUrl: string
  status: SubmissionStatus
  createdAt: Timestamp | null
}

export type NewEnquiry = Omit<Enquiry, 'id' | 'status' | 'createdAt'>
export type NewDelegation = Omit<
  Delegation,
  'id' | 'status' | 'createdAt' | 'profileUrl' | 'profileFileName'
>

const ENQUIRIES = 'enquiries'
const DELEGATIONS = 'delegations'

function assertDb() {
  if (!db) throw new Error('Firebase is not configured.')
  return db
}

/**
 * Turns a raw Firebase error into a clear, actionable message for the visitor
 * (and points the site owner at the real cause). The original error is still
 * logged to the console by the caller for debugging.
 */
export function submissionErrorMessage(err: unknown): string {
  const code = String((err as { code?: string })?.code ?? '')
  const email = company.email
  if (code === 'permission-denied')
    return `We couldn’t save your details — the request was blocked. Please email us at ${email} and we’ll respond right away.`
  if (code === 'unavailable' || code === 'failed-precondition' || code === 'not-found')
    return `Our submission service is briefly unavailable. Please try again shortly, or email us at ${email}.`
  if (code === 'storage/unauthorized')
    return `Your company profile couldn’t be uploaded — it was blocked. You can submit without the attachment, or email it to ${email}.`
  if (
    code === 'storage/retry-limit-exceeded' ||
    code === 'storage/unknown' ||
    code === 'storage/quota-exceeded'
  )
    return `We couldn’t reach the file-upload service. Please submit without the attachment for now, or email it to ${email}.`
  if (code.startsWith('storage/'))
    return `Your company profile couldn’t be uploaded. Please try again, or email it to ${email}.`
  return `Something went wrong. Please try again, or email us directly at ${email}.`
}

// ---- Public writes ---------------------------------------------------------

export async function submitEnquiry(data: NewEnquiry): Promise<void> {
  await addDoc(collection(assertDb(), ENQUIRIES), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
  })
}

export async function uploadDelegationProfile(file: File): Promise<{
  url: string
  name: string
}> {
  if (!storage) throw new Error('Firebase Storage is not configured.')
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path = `delegation-profiles/${Date.now()}-${safeName}`
  const snap = await uploadBytes(ref(storage, path), file)
  const url = await getDownloadURL(snap.ref)
  return { url, name: file.name }
}

export async function submitDelegation(
  data: NewDelegation,
  profile?: { url: string; name: string },
): Promise<void> {
  await addDoc(collection(assertDb(), DELEGATIONS), {
    ...data,
    profileUrl: profile?.url ?? '',
    profileFileName: profile?.name ?? '',
    status: 'new',
    createdAt: serverTimestamp(),
  })
}

// ---- Admin reads (real-time) ----------------------------------------------

export function watchEnquiries(cb: (rows: Enquiry[]) => void): () => void {
  const q = query(collection(assertDb(), ENQUIRIES), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Enquiry, 'id'>) })))
  })
}

export function watchDelegations(cb: (rows: Delegation[]) => void): () => void {
  const q = query(collection(assertDb(), DELEGATIONS), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Delegation, 'id'>) })))
  })
}

// ---- Admin mutations -------------------------------------------------------

export async function setEnquiryStatus(id: string, status: SubmissionStatus) {
  await updateDoc(doc(assertDb(), ENQUIRIES, id), { status })
}

export async function setDelegationStatus(id: string, status: SubmissionStatus) {
  await updateDoc(doc(assertDb(), DELEGATIONS, id), { status })
}

export async function deleteEnquiry(id: string) {
  await deleteDoc(doc(assertDb(), ENQUIRIES, id))
}

export async function deleteDelegation(id: string) {
  await deleteDoc(doc(assertDb(), DELEGATIONS, id))
}
