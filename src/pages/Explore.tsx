import { Helmet } from 'react-helmet-async'

const places = [
  {
    id: '01',
    title: 'Surfing at Jacking Horse Beach',
    category: 'Surf',
    image: { src: '/explore/01.webp', mobile: '/explore/01-mobile.webp' },
    description:
      'A mellow beach break and one of the best spots on the island to learn to surf. The gentle, rolling waves are forgiving for beginners, and the wide stretch of beach gives everyone room to practice without the pressure of a crowded lineup.',
  },
  {
    id: '02',
    title: 'Cloud 9 View Deck',
    category: 'Surf',
    image: { src: '/explore/02.webp', mobile: '/explore/02-mobile.webp' },
    description:
      'The iconic boardwalk stretching out over the reef lets you watch world-class surfers get barreled on one of the most photographed waves in Asia. Even if you never paddle out, standing here when a clean set rolls in is something you\'ll remember.',
  },
  {
    id: '03',
    title: 'Magsaysay Sunset and Skate Spot',
    category: 'Culture',
    description:
      'A wide concrete promenade along the hills in Barangay Magsaysay that doubles as a skate plaza come dusk. Locals gather here to watch the sky turn orange over the horizon — one of the most relaxed and genuinely local sunset spots on the island.',
  },
  {
    id: '04',
    title: 'Cloud 9 Skatepark',
    category: 'Culture',
    image: { src: '/explore/04.webp', mobile: '/explore/04-mobile.webp' },
    description:
      'Tucked near the surf strip, this skatepark is the beating heart of Siargao\'s skating community. A session here gives you a side of the island that\'s far from the tourist trail — raw, energetic, and completely free.',
  },
  {
    id: '05',
    title: 'Malinao Sunset and Skate Spot',
    category: 'Culture',
    description:
      'Come golden hour, the Malinao skatepark transforms into one of the liveliest spots on the island. Skaters fill the concrete, food vendors line the sides, and a mix of tourists and locals gather to watch the sun melt into the water. Relaxed, social, and worth every minute.',
  },
  {
    id: '06',
    title: 'Catangnan Bridge',
    category: 'Nature',
    description:
      'A bridge connecting the barangays of Catangnan and Cabitoonan over calm, mangrove-lined waters. As the sun dips toward the horizon, people gather here to watch the sunset paint the sky — a simple, unhurried moment that\'s become a quiet ritual for those who find it.',
  },
  {
    id: '07',
    title: 'Million Dollar View',
    category: 'Nature',
    description:
      'It earns the name. A hilltop vantage point offering a sweeping panorama of Siargao\'s coastline, coconut groves, and the open Pacific stretching into the horizon. Best at sunrise or late afternoon when the light turns everything gold.',
  },
  {
    id: '08',
    title: 'Maasin River',
    category: 'Nature',
    image: { src: '/explore/08.webp', mobile: '/explore/08-mobile.webp' },
    description:
      'A freshwater river cutting through dense jungle — perfect for a cool dip after a hot morning on the water. Swing from bamboo over the current, float downstream, and let the canopy close in above you. Bring snacks and stay a while.',
  },
  {
    id: '09',
    title: 'Coconut View',
    category: 'Nature',
    description:
      'Siargao is called the land of coconuts for good reason, and this viewpoint delivers the full picture — endless rows of towering palms framing the sea in every direction. Quiet, simple, and unmistakably Siargao.',
  },
  {
    id: '10',
    title: 'Sugba Lagoon',
    category: 'Island',
    image: { src: '/explore/10.webp', mobile: '/explore/10-mobile.webp' },
    description:
      'A sprawling emerald lagoon ringed by jungle in the municipality of Del Carmen. Jump from rope swings into mirror-flat water, paddle a kayak across the lagoon, or simply float and stare at the sky above. One of the most beautiful natural spots in the Philippines.',
  },
  {
    id: '11',
    title: 'Sohoton Cove',
    category: 'Island',
    image: { src: '/explore/11.webp', mobile: '/explore/11-mobile.webp' },
    description:
      'A protected cove with dramatic limestone cliffs, hidden sea caves, and a nearby lake with non-stinging jellyfish. One of the most otherworldly natural experiences in the Philippines — only reachable by bangka, which is half the adventure.',
  },
  {
    id: '12',
    title: 'Tri-Island Tour — Guyam, Daku & Naked Island',
    category: 'Island',
    image: { src: '/explore/12.webp', mobile: '/explore/12-mobile.webp' },
    description:
      'Three small islands, three completely different moods. Guyam is a postcard-perfect dot of palms. Daku is wide and sandy with coconut vendors and hammocks. Naked Island is a bare sandbar rising out of open water. Take a full day and hit all three.',
  },
  {
    id: '13',
    title: 'Magpupungko Rock Pools',
    category: 'Nature',
    image: { src: '/explore/13.webp', mobile: '/explore/13-mobile.webp' },
    description:
      'Natural tidal pools carved into volcanic rock on the island\'s eastern coast, accessible only at low tide. When the ocean recedes, crystal-clear pools reveal themselves — warm, calm, and breathtaking against the rough stone and crashing surf just beyond. Check the tidal schedule before going.',
  },
  {
    id: '14',
    title: 'Bugak Cold Spring',
    category: 'Nature',
    description:
      'A natural freshwater spring tucked into the interior of the island, fed by underground sources that keep the water surprisingly cold year-round. A perfect escape from the midday heat — locals and visitors alike come here to swim, float, and cool down in the shade of the surrounding trees.',
  },
]

const categoryColors: Record<string, string> = {
  Surf: 'bg-[#D0D9D7]',
  Nature: 'bg-[#CACFC6]',
  Island: 'bg-[#CAD0D5]',
  Culture: 'bg-[#D4CECC]',
}

const CategoryIcon = ({ category }: { category: string }) => {
  if (category === 'Surf') {
    return (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 14c2-5 4-5 6 0s4 5 6 0 4-5 6 0" />
        <path d="M2 19c2-5 4-5 6 0s4 5 6 0 4-5 6 0" />
        <path d="M6 9c1-3 3-4 6-4s5 1 6 4" />
      </svg>
    )
  }
  if (category === 'Island') {
    return (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="18" rx="9" ry="2" />
        <path d="M12 18V9" />
        <path d="M12 9c0-4 4-7 4-7s-1 4-4 4" />
        <path d="M12 9c0-4-4-7-4-7s1 4 4 4" />
      </svg>
    )
  }
  if (category === 'Culture') {
    return (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    )
  }
  // Nature (default)
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20 L8 8 L12 15 L16 10 L21 20 Z" />
      <circle cx="19" cy="6" r="2.5" />
    </svg>
  )
}

type Place = (typeof places)[number]

function PlaceCard({ place, featured }: { place: Place; featured?: boolean }) {
  const bg = categoryColors[place.category] ?? 'bg-light'

  return (
    <article
      className={`group flex flex-col${featured ? ' md:col-span-2 lg:col-span-2' : ''}`}
    >
      {/* Image or placeholder */}
      <div
        className={`relative overflow-hidden mb-0 ${
          featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
        } ${place.image ? '' : bg}`}
      >
        {place.image ? (
          <picture>
            <source media="(max-width: 768px)" srcSet={place.image.mobile} type="image/webp" />
            <source srcSet={place.image.src} type="image/webp" />
            <img
              src={place.image.src}
              alt={place.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </picture>
        ) : (
          <>
            {/* Faint number watermark */}
            <span
              className="absolute bottom-2 right-4 font-display leading-none text-fg/[0.07] select-none pointer-events-none font-light"
              style={{ fontSize: 'clamp(5rem, 14vw, 9rem)' }}
              aria-hidden="true"
            >
              {place.id}
            </span>
            {/* Category icon */}
            <div className="absolute inset-0 flex items-center justify-center text-fg/20">
              <CategoryIcon category={place.category} />
            </div>
          </>
        )}
      </div>

      {/* Text block */}
      <div className="pt-5 border-t border-border mt-0 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-3xl leading-none text-[var(--border)] font-light select-none">
            {place.id}
          </span>
          <span className="section-label">{place.category}</span>
        </div>

        <h2
          className="font-display font-light text-fg leading-snug mb-3"
          style={{ fontSize: featured ? 'clamp(1.5rem, 2.5vw, 2rem)' : 'clamp(1.2rem, 2vw, 1.5rem)' }}
        >
          {place.title}
        </h2>

        <p className="text-muted text-sm leading-relaxed flex-1">{place.description}</p>
      </div>
    </article>
  )
}

export default function Explore() {
  return (
    <>
      <Helmet>
        <title>Explore Siargao — Nawa House</title>
        <meta
          name="description"
          content="A curated guide to must-see places in Siargao — surf breaks, hidden lagoons, skate spots, island tours, and natural wonders worth finding."
        />
        <link rel="canonical" href="https://nawahouse.ph/explore" />
        <meta property="og:url" content="https://nawahouse.ph/explore" />
        <meta property="og:title" content="Explore Siargao — Nawa House" />
        <meta
          property="og:description"
          content="13 must-see places in Siargao — from Cloud 9 and Sugba Lagoon to hidden skate spots and tidal pools."
        />
      </Helmet>

      <div className="page-enter">
        {/* Page header */}
        <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-cream">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <p className="section-label mb-6">Siargao, Philippines</p>
            <h1
              className="font-display font-light text-fg leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
            >
              Places worth
              <br />
              <span className="text-muted font-light">checking.</span>
            </h1>
            <p className="mt-8 text-muted text-base md:text-lg leading-relaxed max-w-xl">
              Places that make Siargao worth the journey. Explore the island at your own pace, watch sunsets and enjoy the island life.
            </p>
          </div>
        </section>

        {/* Places grid */}
        <section className="bg-cream pb-24 md:pb-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="border-t border-border mb-14 md:mb-20" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-y-20">
              {places.map((place, i) => (
                <PlaceCard key={place.id} place={place} featured={i === 0} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
