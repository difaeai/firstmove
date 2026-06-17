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
