import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

const galleryImages = [
  { src: '/interior/IMG_1716.webp', mobile: '/interior/IMG_1716-mobile.webp', caption: 'The bedroom — queen bed, macramé wall art, AC, bookshelf, and polished concrete floors.' },
  { src: '/interior/IMG_1496.webp', mobile: '/interior/IMG_1496-mobile.webp', caption: 'The ensuite — black sliding barn door, vessel sink, pendant light, and a glass shower partition.' },
  { src: '/interior/IMG_1465.webp', mobile: '/interior/IMG_1465-mobile.webp', caption: 'The ensuite — round mirror, vessel sink, rain shower, and patterned mosaic tiles.' },
  { src: '/interior/IMG_1509.webp', mobile: '/interior/IMG_1509-mobile.webp', caption: 'Work desk by the glass door — natural light, arched floor mirror, and framed prints.' },
  { src: '/interior/IMG_1467.webp', mobile: '/interior/IMG_1467-mobile.webp', caption: 'The shelf — books, a reed diffuser, an umbrella, and a Nawá guidebook.' },
  { src: '/interior/IMG_1497.webp', mobile: '/interior/IMG_1497-mobile.webp', caption: 'Bedside at dusk — the table lamp on, green pillows, and a quiet corner to wind down.' },
  { src: '/interior/IMG_1688.webp', mobile: '/interior/IMG_1688-mobile.webp', caption: 'From the bed — macramé wall art, clothes rail, glass-partitioned ensuite, and the door to the veranda.' },
  { src: '/interior/IMG_1480.webp', mobile: '/interior/IMG_1480-mobile.webp', caption: 'Full room from the entry — work desk, queen bed, bookshelf, AC, and concrete floors.' },
  { src: '/interior/IMG_1843.webp', mobile: '/interior/IMG_1843-mobile.webp', caption: 'The room from the bed — macramé, floating headboard shelf, glass bathroom partition, and work desk.' },
  { src: '/interior/IMG_1483.webp', mobile: '/interior/IMG_1483-mobile.webp', caption: 'Mancala and a succulent on the veranda table — something slow to do between surf sessions.' },
  { src: '/interior/IMG_1699.webp', mobile: '/interior/IMG_1699-mobile.webp', caption: 'The private veranda — two wooden chairs, a table, and the bedroom just through the glass.' },
  { src: '/interior/IMG_1476.webp', mobile: '/interior/IMG_1476-mobile.webp', caption: 'The veranda — mancala on the table, two chairs, and a view of the palms through the window above.' },
  { src: '/interior/DSCF8680.webp', mobile: '/interior/DSCF8680-mobile.webp', caption: 'The shelf and bedroom corner — books, framed sunset artwork, AC, and the bed lit for the evening.' },
]

const faqItems = [
  {
    q: 'What are the check-in and check-out times?',
    a: 'Standard check-in is from 2:00 PM to 5:00 PM. Early check-in between 12:00 PM–2:00 PM is subject to availability at no extra charge. For arrivals before 12:00 PM, a ₱500 early check-in fee applies (also subject to availability).',
  },
  {
    q: "What's included in the room?",
    a: 'Each room comes with an ensuite bathroom (hot and cold shower), air conditioning, a safety deposit box, work desk, mini fridge, and Starlink internet (60–200 Mbps). Towels, bathrobes, shampoo, body wash, sleeping masks, and earplugs are also provided.',
  },
  {
    q: 'How many guests can stay in a room?',
    a: 'Maximum occupancy is 2 guests per room. Additional guests are charged ₱1,000 per person per night.',
  },
  {
    q: 'Is smoking allowed?',
    a: 'Smoking and vaping are strictly prohibited inside the room and bathroom. A designated smoking area is available within the property. Violations carry a ₱5,000 fine per incident.',
  },
  {
    q: 'Is housekeeping included? How often is the room cleaned?',
    a: 'Rooms are cleaned whenever available. For long-term stays, housekeeping is done once a week. Additional linen changes have extra charges: bathroom towels (₱500), bedsheets (₱250), and bathrobes (₱250).',
  },
  {
    q: 'How far is the property from Cloud 9 and surfing spots?',
    a: 'The property is located along the quiet part of Tourism Road in General Luna. Cloud 9 and nearby surf spots are about 5 minutes away by motorbike. Several restaurants and cafes are within walking distance. Public trikes are easily available for guests who prefer not to rent a scooter.',
  },
  {
    q: 'Is there parking available?',
    a: 'Yes, designated parking areas are available on the property. Please park properly and avoid blocking the driveway.',
  },
  {
    q: 'What happens during a power outage?',
    a: 'The property runs on solar energy. During outages, essential services remain available — outlets, lights, internet, and water.',
  },
  {
    q: 'Is the property secure?',
    a: 'Yes. The property is gated and secured with outdoor security cameras. Each room has its own safety deposit box for valuables. The two rooms face opposite verandas for added privacy.',
  },
  {
    q: 'Will a host be available during my stay?',
    a: "Hosts are mostly on-site and happy to chat. If they're off the island, they'll assist remotely via Airbnb messages or any online messenger or email you provide.",
  },
  {
    q: 'Are there any noise or neighborhood considerations I should know about?',
    a: 'The property sits in a relatively quiet area at the back of Tourism Road. Nearby establishments may occasionally host events or fiestas. Dogs live on the property and in the surrounding neighborhood. Earplugs are provided for your comfort.',
  },
  {
    q: 'Are mosquitoes a concern?',
    a: 'Mosquitoes are common especially during rainy season. We recommend bringing insect repellent for a more comfortable stay.',
  },
]

export default function Stay() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
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
      <section className="bg-light">
        <div className="flex flex-col md:flex-row items-stretch">
            {/* Image — flush left, exactly 50vw on desktop */}
            <div className="w-full md:w-1/2 flex-shrink-0 overflow-hidden aspect-[4/3] md:aspect-auto">
              <picture>
                <source media="(max-width: 768px)" srcSet="/interior/IMG_1480-mobile.webp" type="image/webp" />
                <source srcSet="/interior/IMG_1480.webp" type="image/webp" />
                <img
                  src="/interior/IMG_1480.webp"
                  alt="The shelf — books, a reed diffuser, and room to make it yours."
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-center py-16 md:py-28 px-8 md:px-16 lg:px-24">
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
              <picture>
                <source srcSet={img.mobile} type="image/webp" />
                <img
                  src={img.mobile}
                  alt={img.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
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
              <picture>
                <source srcSet={img.src} type="image/webp" />
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </picture>
            </button>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-light py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <p className="section-label text-muted mb-6">FAQ</p>
          <h2
            className="font-display font-light text-fg leading-tight mb-12"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
          >
            Good to know before you arrive.
          </h2>

          <div className="flex flex-col md:flex-row gap-x-12">
            {[faqItems.slice(0, 6), faqItems.slice(6)].map((col, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col">
                {col.map((item, j) => {
                  const i = colIdx * 6 + j
                  const isOpen = openFaq === i
                  return (
                    <div key={i} className="border-t border-border last:border-b">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                      >
                        <span className="text-sm md:text-base text-fg font-medium leading-snug">{item.q}</span>
                        <span className="flex-shrink-0 mt-0.5 text-muted group-hover:text-accent transition-colors text-xl leading-none select-none">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                        style={{ maxHeight: isOpen ? '300px' : '0px' }}
                      >
                        <p className="text-sm text-muted leading-relaxed pb-5 pr-8">{item.a}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
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
            <picture>
              <source srcSet={galleryImages[lightboxIndex].src} type="image/webp" />
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].caption}
                className="max-h-[75vh] w-full object-contain"
              />
            </picture>
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
