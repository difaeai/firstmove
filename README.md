# First Option Worldwide

A modern, animated marketing website for **First Option Worldwide (Pvt) Ltd.** —
_Gateway to Global Opportunities_ — with a secure **admin panel** that receives
visitor enquiries and trade-delegation registrations in real time.

> All website copy is taken verbatim from the existing site and lives in a single
> file: [`src/data/content.ts`](src/data/content.ts). Edit text there — no design
> code needs to change.

---

## ✨ What's included

**Public website** (single page, fully animated)
- Hero with animated headline, live counters and floating service pillars
- Scrolling keyword marquee
- About (mission / vision)
- Core Services — Trade Facilitation · Travel & Tours · Immigration Advisory
- Why Choose Us
- International Reach & Market Focus
- Our Offices (Islamabad HQ + Phuket branch)
- **Trade Delegation Registration** form (with company-profile file upload)
- **Contact / Enquiry** form
- Footer with quick links + admin login

**Admin panel** (`/admin`)
- Email + password login (Firebase Authentication)
- Live dashboard with stat cards and "new" badges
- Two inboxes: **Enquiries** and **Trade Delegations**
- Search, status filter (new / read / responded) and CSV export
- Detail view with one-click reply (email / call), company-profile download,
  status updates and delete

## 🧱 Tech stack

| Area        | Choice                                            |
| ----------- | ------------------------------------------------- |
| Framework   | React 18 + TypeScript + Vite                      |
| Styling     | Tailwind CSS                                      |
| Animation   | Framer Motion                                     |
| Backend     | Firebase — Firestore, Authentication, Storage     |
| Hosting     | Firebase Hosting                                  |

---

## 🚀 Getting started (local)

```bash
npm install
cp .env.example .env   # then fill in your Firebase keys (see below)
npm run dev            # http://localhost:5173
```

The site runs without Firebase configured — the forms simply show a
"not connected yet" notice until you add your keys.

---

## ▶️ Try the FULL app locally — no Firebase account needed

You can run the entire thing (forms → admin inbox, login, file uploads) against
the local **Firebase Emulator Suite**. Nothing is sent to the cloud and no keys
are required. Requires [Java](https://adoptium.net/) and the Firebase CLI
(`npm install -g firebase-tools`).

**One command:**

```bash
npm run demo
```

This boots the emulators, seeds demo enquiries + registrations and a ready admin
user, and starts the site. Then open:

- **Website:** http://localhost:5173
- **Admin panel:** http://localhost:5173/admin
  - email: `info@firstoptionworldwide.com`
  - password: `admin12345`
- **Emulator dashboard:** http://localhost:4000

Submit the contact / trade-delegation forms on the site and watch them appear
live in the admin panel. (Prefer separate terminals? Run `npm run emulators`,
then `npm run seed`, then `npm run dev:demo`.)

---

## 🔥 Firebase setup for production (one time)

This repo is already wired to the Firebase project **`firstmove-ff051`** — the
web config lives in [`src/lib/firebase.ts`](src/lib/firebase.ts) and
[`.firebaserc`](.firebaserc), so there are **no keys to paste**. You only need to
switch on the services, create your admin login, and publish the rules.

### 1. Enable the services
In the [Firebase console](https://console.firebase.google.com) open the
**firstmove-ff051** project → **Build**, and enable:
- **Firestore Database** (Start in *production* mode)
- **Authentication** → **Sign-in method** → enable **Email/Password**
- **Storage**

### 2. Create the admin user
Authentication → **Users** → **Add user**, using **`info@firstoptionworldwide.com`**
and a strong password. This is the only account allowed to read the inbox.

> Want a different admin address? Change it in three places, then redeploy the
> rules: `adminEmail` in `src/lib/firebase.ts`, and `isAdmin()` in both
> `firestore.rules` and `storage.rules`.

### 3. Publish the security rules
Install the CLI once (`npm i -g firebase-tools`), then:

```bash
firebase login
npm run deploy:rules     # publishes firestore.rules + storage.rules
```

The rules let the public **submit** forms but allow only the admin account to
**read / manage** submissions.

### 4. (Recommended) Lock down the API key
In Google Cloud console → **APIs & Services → Credentials**, restrict the web API
key to your site's domain (HTTP referrers). The keys are safe to expose, but this
curbs abuse. For stronger protection, add
[App Check](https://firebase.google.com/docs/app-check).

---

## 🌍 Deploy the website

```bash
npm run deploy           # builds and deploys to Firebase Hosting
```

Your site goes live at `https://your-project.web.app` (connect your custom
domain `firstoptionworldwide.com` in **Hosting → Add custom domain**).

**Optional — auto-deploy on every push:** run `firebase init hosting:github`
once; Firebase adds a GitHub Action and the required secret so the site
redeploys automatically when you push to `main`.

---

## 🛠 Editing content

Open [`src/data/content.ts`](src/data/content.ts) and edit the text — every
section, service, region, form label and footer link is defined there.

## 📁 Project structure

```
src/
├─ data/content.ts        ← all website text (single source of truth)
├─ lib/
│  ├─ firebase.ts         ← Firebase initialisation
│  └─ queries.ts          ← read / write enquiries & delegations
├─ components/            ← public site sections + UI primitives
├─ admin/                 ← auth context, guards, helpers
└─ pages/
   ├─ Home.tsx
   └─ admin/{Login,Dashboard}.tsx
firestore.rules · storage.rules · firebase.json
```

## 📜 Scripts

| Command                | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the dev server                               |
| `npm run demo`         | Emulators + seed data + site (full local demo)     |
| `npm run emulators`    | Start the Firebase Emulator Suite                  |
| `npm run seed`         | Seed demo data + admin user into the emulators     |
| `npm run dev:demo`     | Dev server wired to the emulators                  |
| `npm run build`        | Type-check + production build to `dist/`           |
| `npm run preview`      | Preview the production build locally               |
| `npm run deploy`       | Build + deploy hosting to Firebase                 |
| `npm run deploy:rules` | Deploy Firestore + Storage rules                   |

> **Logo:** your real brand logo lives at [`public/logo.png`](public/logo.png).
> Replace that file to update it everywhere (it renders in white on dark
> sections automatically).

---

© 2025 First Option Worldwide (Pvt) Ltd. All rights reserved.
