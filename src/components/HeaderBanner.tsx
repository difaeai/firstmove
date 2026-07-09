import { headerBanner } from '../data/content'

// Banner image shown directly below the navbar (above the hero). On phones it runs
// full-bleed edge to edge so the artwork gets every available pixel; from `sm` up it
// sits inside the page gutters as a contained, rounded card.
// The artwork is a wide 2400x872 strip whose three service labels reach both outer
// edges, so it must never be cropped with object-cover — it always scales whole.
// The image file lives at public/header-banner.png — see headerBanner in content.ts.
export default function HeaderBanner() {
  return (
    <div className="pt-4 sm:pt-8">
      <div className="mx-auto w-full max-w-7xl sm:px-8 lg:px-12">
        <img
          src={headerBanner.src}
          alt={headerBanner.alt}
          className="block w-full sm:rounded-2xl sm:shadow-card-light sm:ring-1 sm:ring-navy-100"
          loading="eager"
        />
      </div>
    </div>
  )
}
