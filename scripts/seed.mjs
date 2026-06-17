// ----------------------------------------------------------------------------
// Seeds the local Firebase Emulator Suite with a demo admin user and a handful
// of realistic enquiries + trade-delegation registrations, so you can log into
// the admin panel and see it working immediately.
//
//   1. Start the emulators:  npm run emulators
//   2. In another terminal:  npm run seed
//
// Requires the emulators to be running. Does nothing against real Firebase.
// ----------------------------------------------------------------------------
import admin from 'firebase-admin'

const PROJECT_ID = 'demo-first-option'
process.env.FIRESTORE_EMULATOR_HOST ||= '127.0.0.1:8080'
process.env.FIREBASE_AUTH_EMULATOR_HOST ||= '127.0.0.1:9099'

// Must match the admin address in firestore.rules / storage.rules.
const ADMIN_EMAIL = 'firstoptionworldwide@gmail.com'
const ADMIN_PASSWORD = 'admin12345'

admin.initializeApp({ projectId: PROJECT_ID })
const db = admin.firestore()
const auth = admin.auth()
const { Timestamp } = admin.firestore

const daysAgo = (d) => Timestamp.fromDate(new Date(Date.now() - d * 86400000))

const enquiries = [
  {
    fullName: 'Ahmed Raza',
    email: 'ahmed.raza@example.com',
    phone: '+92 300 1234567',
    service: 'International Trade Facilitation',
    message:
      'We export surgical instruments from Sialkot and want to join a trade mission to Central Asia. Please share details on upcoming delegations and B2B matchmaking.',
    status: 'new',
    createdAt: daysAgo(0),
  },
  {
    fullName: 'Sara Khan',
    email: 'sara.khan@example.com',
    phone: '+92 321 9876543',
    service: 'Immigration Advisory',
    message:
      'I recently graduated in Australia and need guidance on graduate immigration and permanent residency pathways. What is the eligibility assessment process?',
    status: 'new',
    createdAt: daysAgo(1),
  },
  {
    fullName: 'Bilal Aslam',
    email: 'bilal@textilehouse.pk',
    phone: '+92 333 4567890',
    service: 'Travel & Tours',
    message:
      'Looking for corporate travel and air ticketing for a 6-person team visiting Dubai next month, plus hotel reservations near the expo center.',
    status: 'read',
    createdAt: daysAgo(3),
  },
  {
    fullName: 'Maria Yousaf',
    email: 'maria.y@agrofoods.com',
    phone: '+92 345 1122334',
    service: 'Business Delegation',
    message:
      'Our agriculture & food products company would like representation at international trade exhibitions and help with MOU facilitation in Uzbekistan.',
    status: 'responded',
    createdAt: daysAgo(6),
  },
]

const delegations = [
  {
    fullName: 'Imran Sheikh',
    companyName: 'Sheikh Surgical Industries',
    designation: 'Chief Executive Officer',
    yearEstablished: '2009',
    industry: 'Surgical & Medical Instruments',
    affiliation: 'Sialkot Chamber of Commerce & Industry',
    package: 'Uzbekistan + Tajikistan',
    contactNumber: '+92 300 7654321',
    officeAddress: 'Wazirabad Road, Sialkot, Pakistan',
    profileFileName: '',
    profileUrl: '',
    status: 'new',
    createdAt: daysAgo(0),
  },
  {
    fullName: 'Nadia Farooq',
    companyName: 'GreenHarvest Agro Exports',
    designation: 'Director Exports',
    yearEstablished: '2015',
    industry: 'Agriculture & Food Products',
    affiliation: 'FPCCI',
    package: 'Uzbekistan + Turkmenistan',
    contactNumber: '+92 321 5556677',
    officeAddress: 'Gulberg III, Lahore, Pakistan',
    profileFileName: '',
    profileUrl: '',
    status: 'new',
    createdAt: daysAgo(2),
  },
  {
    fullName: 'Usman Tariq',
    companyName: 'Tariq Pharma (Pvt) Ltd',
    designation: 'General Manager',
    yearEstablished: '2011',
    industry: 'Pharmaceuticals',
    affiliation: 'Pakistan Pharmaceutical Manufacturers Association',
    package: 'Uzbekistan + Tajikistan',
    contactNumber: '+92 333 9988776',
    officeAddress: 'I-9 Industrial Area, Islamabad, Pakistan',
    profileFileName: '',
    profileUrl: '',
    status: 'read',
    createdAt: daysAgo(5),
  },
]

async function clearCollection(name) {
  const snap = await db.collection(name).get()
  await Promise.all(snap.docs.map((d) => d.ref.delete()))
}

async function ensureAdmin() {
  try {
    await auth.getUserByEmail(ADMIN_EMAIL)
    console.log(`✓ Admin user already exists: ${ADMIN_EMAIL}`)
  } catch {
    await auth.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      displayName: 'First Option Admin',
      emailVerified: true,
    })
    console.log(`✓ Created admin user: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  }
}

async function main() {
  console.log('Seeding Firebase emulators…\n')
  await ensureAdmin()

  await clearCollection('enquiries')
  await clearCollection('delegations')

  for (const e of enquiries) await db.collection('enquiries').add(e)
  for (const d of delegations) await db.collection('delegations').add(d)

  console.log(`✓ Added ${enquiries.length} enquiries`)
  console.log(`✓ Added ${delegations.length} delegation registrations`)
  console.log('\nDone. Start the app with:  npm run dev:demo')
  console.log(`Then open http://localhost:5173/admin and sign in as ${ADMIN_EMAIL}\n`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\nSeeding failed. Are the emulators running? (npm run emulators)\n', err)
    process.exit(1)
  })
