import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

const galleryImages = [
  { src: '/interior/DSCF8061.JPG', caption: 'The bedroom — polished concrete floors, macramé wall art, and room to breathe.' },
  { src: '/interior/DSCF8075.JPG', caption: 'Full room view with work desk, AC, and glass-partitioned bathroom.' },
  { src: '/interior/DSCF8128.JPG', caption: 'Bed and ensuite — everything in reach without feeling crowded.' },
  { src: '/interior/DSCF8139.JPG', caption: 'Work corner with arched mirror, art prints, and natural light.' },
  { src: '/interior/DSCF8087.JPG', caption: 'Sitting and dining area with exposed beam ceiling.' },
  { src: '/interior/DSCF8056.JPG', caption: 'Lounge nook — a quiet spot with a view through the palms.' },
  { src: '/interior/DSCF8094.JPG', caption: 'Private entry with rattan chair and glass sliding door.' },
  { src: '/interior/DSCF8125.JPG', caption: 'Open-plan living with kitchenette shelf, fridge, and sitting area.' },
  { src: '/interior/DSCF8102.JPG', caption: 'Coffee and tea ready when you wake up.' },
]

export default function Stay() {
  const [showMore, setShowMore] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
  const galleryScrollRef = useRef<HTMLDivElement>(null)

  const onGalleryScroll = () => {
    const el = galleryScrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / galleryImages.length
    const index = Math.round(el.scrollLeft / cardWidth)
    setActiveGalleryIndex(Math.min(index, galleryImages.length - 1))
  }

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => (i! + galleryImages.length - 1) % galleryImages.length)
  const next = () => setLightboxIndex((i) => (i! + 1) % galleryImages.length)

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex])
  return (
    <>
      <Helmet>
        <title>Rooms &amp; Amenities — Nawa House Siargao</title>
        <meta name="description" content="Two private rooms with ensuite bath, AC, Starlink wifi (60–200 Mbps), and a veranda in General Luna, Siargao. Book the Sunset or Sunrise Room on Airbnb." />
        <link rel="canonical" href="https://nawahouse.ph/stay" />
        <meta property="og:url" content="https://nawahouse.ph/stay" />
        <meta property="og:title" content="Rooms &amp; Amenities — Nawa House Siargao" />
        <meta property="og:description" content="Two private rooms with ensuite bath, AC, Starlink wifi, and a veranda in General Luna, Siargao. Book on Airbnb." />
      </Helmet>
    <div>
      {/* Full-width hero */}
      <div className="w-full h-[50vh] md:h-screen overflow-hidden">
        <img
          src="/stay-hero.jpg"
          alt="Nawá House"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* Headline */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <p className="section-label text-muted mb-6">The Rooms</p>
          <h1
            className="font-display font-light text-fg leading-[1.05]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
          >
            Sleep well.<br />
            <span className="text-muted font-light">The rest takes care of itself.</span>
          </h1>
          <p className="mt-8 text-muted text-base md:text-lg leading-relaxed max-w-xl">
            Each room is designed for comfort without clutter, it features an ensuite bath, AC, fast wifi, and a veranda to watch the sun over the palms.
          </p>
        </div>
      </section>

      {/* Room Detail */}
      <section className="bg-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src="/room-interior.jpg"
                alt="Sunset Room interior"
                className="w-full object-cover"
                style={{ maxHeight: '600px' }}
              />
            </div>

            {/* Details */}
            <div>
              <h2
                className="font-display font-light text-fg leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
              >
                A private room<br />that earns the name.
              </h2>
              <p className="text-muted text-base leading-relaxed mb-10">
                Spacious and calm, with everything you need and nothing in the way. A quiet place to come back to after a full day on the island.
              </p>

              {/* Amenities */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {[
                  {
                    label: 'Ensuite bath — hot & cold shower',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v5"/>
                        <path d="M7 7h10a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2Z"/>
                        <path d="M8 13v2M11 12v3M14 13v2M17 12v3"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Air conditioning',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M2 12h20"/>
                        <path d="M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
                        <path d="M12 5l-2-2M12 5l2-2M12 19l-2 2M12 19l2 2M5 12l-2-2M5 12l-2 2M19 12l2-2M19 12l2 2"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Starlink wifi — 60–200 Mbps',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Work desk',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="13" rx="2"/>
                        <path d="M8 21h8M12 17v4"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Mini refrigerator',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2"/>
                        <path d="M5 10h14"/><path d="M9 6v2M9 14v3"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Safety deposit box',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Private veranda',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12l9-9 9 9"/><path d="M9 21V12h6v9"/><path d="M3 21h18"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Towels & toiletries included',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 5h18"/>
                        <path d="M7 5v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5"/>
                        <path d="M7 9h10"/>
                      </svg>
                    ),
                  },
                ].map(({ label, icon }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-fg">
                    <span className="text-accent flex-shrink-0">{icon}</span>
                    {label}
                  </li>
                ))}
              </ul>

              {/* Show more */}
              {showMore && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mt-5">
                  {[
                    {
                      label: 'First aid kit',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="5" width="18" height="16" rx="4"/>
                          <path d="M12 9v8M8 13h8"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Books',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Hangers',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 4a2 2 0 0 1 2 2c0 1-1 2-2 3L3 16a2 2 0 0 0 1.5 3.5h15A2 2 0 0 0 21 16l-9-7"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Drying rack',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 4a2 2 0 0 1 2 2c0 1-1 2-2 3L3 16a2 2 0 0 0 1.5 3.5h15A2 2 0 0 0 21 16l-9-7"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Hair dryer',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 8a5 5 0 1 1 10 0c0 3-2 5-5 7v4"/>
                          <path d="M10 19h4"/>
                          <path d="M17 6c1 0 4 1 4 4s-3 4-4 4"/>
                          <path d="M17 9h.01M17 11h.01"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Exterior security cameras',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 7l-7 5 7 5V7Z"/><rect x="1" y="5" width="15" height="14" rx="2"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Smoke alarm',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9"/>
                          <path d="M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3c0 2-3 5-3 5s-3-3-3-5Z"/>
                          <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Fire extinguisher',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="8" height="12" rx="3"/>
                          <path d="M13 9V6"/>
                          <path d="M11 6h4"/>
                          <path d="M11 6V4"/>
                          <path d="M11 7H7v3"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Electric kettle',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="4" width="6" height="2" rx="1"/>
                          <rect x="5" y="6" width="14" height="12" rx="2"/>
                          <path d="M5 10H3"/>
                          <path d="M19 9c2 0 3 1.3 3 2.5S21 14 19 14"/>
                          <path d="M3 20h18"/>
                          <path d="M10 9l-1 5M13 9l-1 5"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Coffee and tea',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 8h1a4 4 0 0 1 0 8h-1"/>
                          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8Z"/>
                          <path d="M6 2v2M10 2v2M14 2v2"/>
                        </svg>
                      ),
                    },
                  ].map(({ label, icon }) => (
                    <li key={label} className="flex items-center gap-3 text-sm text-fg">
                      <span className="text-accent flex-shrink-0">{icon}</span>
                      {label}
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={() => setShowMore((v) => !v)}
                className="mt-6 flex items-center gap-1.5 text-sm text-fg underline underline-offset-4 hover:text-accent transition-colors"
              >
                {showMore ? 'Show less' : 'Show all amenities'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${showMore ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.airbnb.com/h/nawasunriseroom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm font-bold"
                >
                  Sunrise Room on Airbnb
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1.5 -mt-0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
                <a
                  href="https://www.airbnb.com/h/nawasunsetroom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm font-bold"
                >
                  Sunset Room on Airbnb
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1.5 -mt-0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <p className="section-label text-muted mb-6">Inside the Room</p>
          <h2
            className="font-display font-light text-fg leading-tight mb-10"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
          >
            See the space.
          </h2>
        </div>

        {/* Mobile: swipeable carousel */}
        <div
          ref={galleryScrollRef}
          onScroll={onGalleryScroll}
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-2 px-[11vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => openLightbox(i)}
              className="snap-center flex-shrink-0 w-[78vw] aspect-square overflow-hidden focus:outline-none"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Pips */}
        <div className="md:hidden flex justify-center gap-1.5 mt-5">
          {galleryImages.map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                i === activeGalleryIndex
                  ? 'w-4 h-1.5 bg-fg'
                  : 'w-1.5 h-1.5 bg-fg/25'
              }`}
            />
          ))}
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-3 gap-3 max-w-screen-xl mx-auto px-12">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => openLightbox(i)}
              className="aspect-square overflow-hidden group focus:outline-none"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Previous"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          {/* Image + caption */}
          <div
            className="flex flex-col items-center max-w-4xl w-full px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].caption}
              className="max-h-[75vh] w-full object-contain"
            />
            <p className="mt-4 text-white/60 text-sm text-center">
              {galleryImages[lightboxIndex].caption}
            </p>
            <p className="mt-2 text-white/30 text-xs">
              {lightboxIndex + 1} / {galleryImages.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Next"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      )}
    </div>
    </>
  )
}
