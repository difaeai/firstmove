import { headerBanner } from '../data/content'

// Banner image shown directly below the navbar (above the hero), presented as a
// contained, rounded card so it reads as an intentional design element.
// The image file lives at public/header-banner.png — see headerBanner in content.ts.
export default function HeaderBanner() {
  return (
    <div className="container-page pt-6 sm:pt-8">
      <img
        src={headerBanner.src}
        alt={headerBanner.alt}
        className="block w-full rounded-2xl shadow-card-light ring-1 ring-navy-100"
        loading="eager"
      />
    </div>
  )
}
