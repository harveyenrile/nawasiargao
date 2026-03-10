import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useScrollReveal } from '../hooks/useScrollReveal'

// ─── Hero images ─────────────────────────────────────────────────────────────
const SLIDES = [
  {
    desktop: '/hero/hero-slide-1.jpg',
    mobile: '/hero/hero-slide-1.jpg',
    alt: 'Bangka boats resting on golden water at sunset in Siargao',
  },
  {
    desktop: '/hero/hero-slide-2.jpg',
    mobile: '/hero/hero-slide-2.jpg',
    alt: 'Fresh coconuts piled on the ground in warm afternoon light',
  },
  {
    desktop: '/hero/hero-slide-3.jpg',
    mobile: '/hero/hero-slide-3.jpg',
    alt: 'Two surfers walking across a wooden bridge toward a palm-lined beach',
  },
  {
    desktop: '/hero/hero-slide-4.jpg',
    mobile: '/hero/hero-slide-4.jpg',
    alt: 'Surfer riding a large turquoise wave at Cloud 9, Siargao',
  },
  {
    desktop: '/hero/hero-slide-5.jpg',
    mobile: '/hero/hero-slide-5.jpg',
    alt: 'A couple walking along a sandy beach under a leaning palm tree in Siargao',
  },
  {
    desktop: '/hero/hero-slide-6.jpg',
    mobile: '/hero/hero-slide-6.jpg',
    alt: 'The Cloud 9 boardwalk hut framed between two palm trunks at dusk',
  },
  {
    desktop: '/hero/hero-slide-7.jpg',
    mobile: '/hero/hero-slide-7.jpg',
    alt: 'Surfers paddling out at Cloud 9 seen through palm fronds, turquoise water',
  },
  {
    desktop: '/hero/hero-slide-8.jpg',
    mobile: '/hero/hero-slide-8.jpg',
    alt: 'Colorful bangka boats moored along a quiet palm-lined beach in Siargao',
  },
  {
    desktop: '/hero/hero-slide-9.jpg',
    mobile: '/hero/hero-slide-9.jpg',
    alt: 'A motorbike and tricycle on a sun-drenched road through lush tropical greenery',
  },
]

const INTERVAL = 5000

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/stay', label: 'Stay' },
  { to: '/contact', label: 'Contact' },
]

// ─── Hero Carousel ────────────────────────────────────────────────────────────
function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  // Auto-advance — always running
  useEffect(() => {
    const id = setTimeout(next, INTERVAL)
    return () => clearTimeout(id)
  }, [current, next])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div
      className="relative w-full h-[50vh] md:h-screen overflow-hidden bg-fg"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Slides ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.desktop}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={slide.mobile} type="image/webp" />
            <source srcSet={slide.desktop} type="image/webp" />
            <img
              src={slide.desktop}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding={i === 0 ? 'sync' : 'async'}
            />
          </picture>
        </div>
      ))}

      {/* ── Hero nav (home only, fades out on scroll) ── */}
      <nav
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center gap-10 h-[64px] transition-all duration-500"
        style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? 'none' : 'auto' }}
      >
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="font-ui text-[11px] tracking-widest2 uppercase text-cream/80 hover:text-cream transition-colors duration-300"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* ── Gradient overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(26,21,18,0.72) 0%, rgba(26,21,18,0.28) 45%, rgba(26,21,18,0.15) 100%)',
        }}
      />

      {/* ── Centered content ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        {/* Logo */}
        <img
          src="/logo-white.png"
          alt="Nawá House"
          className="mb-8 w-auto transition-opacity duration-500"
          style={{
            height: 'clamp(3rem, 6vw, 5rem)',
            opacity: scrolled ? 0 : undefined,
            animation: scrolled ? 'none' : 'fadeInUp 0.9s ease 0.3s forwards',
          }}
        />

        {/* Headline */}
        <h1
          className="font-display font-light text-cream leading-[0.92] text-[2.5rem] md:text-[74px]"
          style={{
            letterSpacing: '-0.015em',
            textShadow: '0 2px 20px rgba(0,0,0,0.25)',
            opacity: 0,
            animation: 'fadeInUp 1s ease 0.55s forwards',
          }}
        >
          Modern Comfort.<br />
          <span className="text-cream/75 font-light">Local Island Living.</span>
        </h1>

        {/* Tagline */}
        <p
          className="font-ui text-cream/70 mt-6 tracking-widest2 text-[10px] uppercase"
          style={{
            opacity: 0,
            animation: 'fadeInUp 0.9s ease 0.85s forwards',
          }}
        >
          General Luna · Siargao Island
        </p>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 hidden md:flex items-center justify-center
                   text-cream/50 hover:text-cream transition-colors duration-300 focus:outline-none"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 hidden md:flex items-center justify-center
                   text-cream/50 hover:text-cream transition-colors duration-300 focus:outline-none"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-500 focus:outline-none"
            style={{
              width: i === current ? '2rem' : '0.375rem',
              height: '0.375rem',
              borderRadius: '9999px',
              backgroundColor: i === current ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>

    </div>
  )
}

// ─── Intro Section ────────────────────────────────────────────────────────────
function Intro() {
  const headlineRef = useScrollReveal()
  const bodyRef = useScrollReveal()

  return (
    <section className="bg-cream py-28 md:py-40">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Two-column: headline left, body right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Headline */}
          <div ref={headlineRef} className="reveal">
            <h2
              className="font-display font-light text-fg leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
            >
              Rest here.<br />
              <span className="text-muted font-light">We got you.</span>
            </h2>
          </div>

          {/* Body */}
          <div ref={bodyRef} className="reveal reveal-delay-2">
            <p
              className="font-display text-accent mb-6 leading-snug font-light"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
            >
              Not a resort. Not a hostel.<br />Something in between — and better for it.
            </p>

            <div className="space-y-4 font-ui text-sm font-light text-muted leading-relaxed">
              <p>
                Nawá House is a small guesthouse in General Luna, a 5-minute ride from Cloud 9 and the heart of Siargao’s surf scene. Two thoughtfully designed rooms on a quiet, gated property — clean, comfortable, and calm.
              </p>
              <p>
                We built this place for people who want to experience the island and return to a restful stay. Wake up to quiet mornings. Eat well. Explore. Come back and do it all again.
              </p>
              <p>
                Simple living, done right.
              </p>
            </div>
          </div>

        </div>

        {/* Masonry grid — CSS columns */}
        <div className="columns-2 gap-3 mt-16 md:mt-24">
          {GALLERY.map((img, i) => (
            <div
              key={img.src}
              className="break-inside-avoid mb-3 overflow-hidden group"
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={img.mobile} type="image/webp" />
                <source srcSet={img.src} type="image/webp" />
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </picture>
            </div>
          ))}
        </div>

        {/* CTA after gallery */}
        <div className="mt-12 flex justify-center">
          <Link to="/stay" className="btn-primary font-ui text-xs tracking-widest2 uppercase">
            View the Rooms
          </Link>
        </div>

      </div>
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: 'Godfrey',
    text: 'This new, clean, modern and minimalist spot was so lovely to stay in!! We felt right at home and enjoyed how close the room was to restaurants, the bridge, and Cloud 9. The room was a great size, the bed was comfortable, and the shower was heavenly!',
  },
  {
    name: 'Emmanuel',
    text: 'Harvey and Kai are great hosts and more importantly, wonderful people. They went above and beyond by scheduling and organizing my airport pickup and drop off. It was also great connecting with you guys on a personal level. Amping!',
  },
  {
    name: 'Stepfanie',
    text: 'This was one of the cleanest and most comfortable airbnbs that I\'ve stayed at. The space is private, peaceful, and relaxing. Most of the time, I just wanted to stay inside because I was so comfy. Overall, wish I could\'ve stayed longer!',
  },
  {
    name: 'Ben',
    text: 'I stayed at Nawa house for a month, and will definitely stay again. It is so peaceful, clean, the room and facilities are awesome. Flawless internet and the best part is everything has been thought of. Best place to go for a long stay.',
  },
  {
    name: 'Kylie',
    text: 'This is without a doubt the best place I stayed in Siargao! The room was clean, spacious, and had plenty of space on the patio to dry my clothes. I was especially sold on the bathroom! I\'ll definitely be staying again.',
  },
  {
    name: 'Sarah',
    text: 'The listing was even better than the photos. The decoration and layout were thought out with great taste. We were hosted very well and the hosts were super accommodating! Really it\'s a 10/10 and I recommend everyone come to this beautiful place.',
  },
  {
    name: 'Sakura',
    text: 'We had an incredible stay in Siargao! The owners were exceptionally kind and attentive — we even got to surf together. The location is perfect, quiet and private yet just a short distance from everything. It truly felt like a hidden gem.',
  },
  {
    name: 'Rusty',
    text: 'Harvey & Kai\'s place was absolutely wonderful — we felt at home right away. Incredibly relaxing, spotless, and perfectly located away from the noise. It\'s an ideal spot for anyone working from home. I highly recommend this place.',
  },
  {
    name: 'Isabella',
    text: 'Absolutely loved the place! Harvey & Kai were such great hosts and would always reply within a few minutes. The place was very private but close to a lot of cafes, restaurants, and Cloud 9. Already planning to stay here again.',
  },
  {
    name: 'Berkan',
    text: 'The accommodation was really great, everything worked and was as described. The daily room service is very pleasant and ensures that everything always remains clean and tidy. The host was friendly and helpful — we would come back any time.',
  },
  {
    name: 'Lucy',
    text: 'Our stay was perfect. Close to everything but not noisy. Locked gates at the front made us feel safe, not to mention the friendliest dogs who lived there. The room was pristine with all necessary amenities. We would love to come back!',
  },
  {
    name: 'Tyler',
    text: 'It\'s the little things they have thought of — umbrellas in the room, racks to dry clothes, rugs to clean sand off your feet, cold water bottles in the refrigerator, never saw a bug, always clean. I couldn\'t recommend this Airbnb more!',
  },
]

function Reviews() {
  const sectionRef = useScrollReveal()
  // Duplicate for seamless loop
  const doubled = [...REVIEWS, ...REVIEWS]
  const trackRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const startTranslateX = useRef<number>(0)
  const isDragging = useRef(false)
  const isHorizontalSwipe = useRef<boolean | null>(null)

  const getCurrentTranslateX = () => {
    if (!trackRef.current) return 0
    const matrix = new DOMMatrix(window.getComputedStyle(trackRef.current).transform)
    return matrix.m41
  }

  // Attach non-passive touchmove to allow preventDefault during horizontal swipe
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current) e.preventDefault()
    }
    track.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => track.removeEventListener('touchmove', onTouchMove)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    startTranslateX.current = getCurrentTranslateX()
    isDragging.current = false
    isHorizontalSwipe.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || !trackRef.current) return
    const deltaX = e.touches[0].clientX - touchStartX.current
    const deltaY = e.touches[0].clientY - touchStartY.current

    // Determine swipe axis on first significant movement
    if (isHorizontalSwipe.current === null && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
      isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY)
      if (isHorizontalSwipe.current) {
        trackRef.current.style.animationPlayState = 'paused'
        trackRef.current.style.transform = `translateX(${startTranslateX.current}px)`
        isDragging.current = true
      }
    }

    if (!isDragging.current) return
    trackRef.current.style.transform = `translateX(${startTranslateX.current + deltaX}px)`
  }

  const handleTouchEnd = () => {
    if (!isDragging.current || !trackRef.current) return
    isDragging.current = false

    const currentX = getCurrentTranslateX()
    const totalScrollPx = trackRef.current.scrollWidth / 2

    // Wrap position into valid range [0, -totalScrollPx]
    let normalizedX = currentX % -totalScrollPx
    if (normalizedX > 0) normalizedX -= totalScrollPx

    const progress = Math.abs(normalizedX) / totalScrollPx
    const duration = 150
    const delay = -progress * duration

    trackRef.current.style.transform = ''
    trackRef.current.style.animation = `marquee ${duration}s linear ${delay}s infinite`
    trackRef.current.style.animationPlayState = 'running'

    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <section className="bg-light py-24 md:py-32 overflow-hidden group">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 mb-14">
        <div ref={sectionRef} className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2
              className="font-display font-light text-fg leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
            >
              What guests<br />
              <span className="text-muted font-light">are saying.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Marquee track */}
      <div
        className="relative"
      >
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F0EAE0, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F0EAE0, transparent)' }} />

        <div
          ref={trackRef}
          className="flex gap-5 group-hover:[animation-play-state:paused]"
          style={{
            width: 'max-content',
            animation: 'marquee 150s linear infinite',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {doubled.map((review, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] md:w-[380px] bg-cream border border-border rounded-2xl px-7 py-6 flex flex-col gap-4"
            >
              {/* Five stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} width="13" height="13" viewBox="0 0 20 20" fill="#C47A5A" aria-hidden="true">
                    <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
                  </svg>
                ))}
              </div>
              <p className="font-ui text-sm font-light text-fg/80 leading-relaxed italic">
                "{review.text}"
              </p>
              <p className="section-label text-fg mt-auto">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
const GALLERY = [
  { src: '/gallery/home/gallery-1.webp', mobile: '/gallery/home/gallery-1-mobile.webp', alt: 'Nawá House facade with tropical plants and gravel garden under bright sky' },
  { src: '/gallery/home/gallery-2.webp', mobile: '/gallery/home/gallery-2-mobile.webp', alt: 'Nawá House entrance with stepping stone path, lush greenery, and geometric screen wall' },
  { src: '/gallery/home/gallery-3.webp', mobile: '/gallery/home/gallery-3-mobile.webp', alt: 'Close-up of Nawá House geometric breeze-block wall with trailing plants and potted shrubs' },
  { src: '/gallery/home/gallery-4.webp', mobile: '/gallery/home/gallery-4-mobile.webp', alt: 'Veranda corner with rattan petal chair, potted plant, and open tropical garden view' },
  { src: '/gallery/home/gallery-5.webp', mobile: '/gallery/home/gallery-5-mobile.webp', alt: 'Nawá House exterior at dusk with string lights, breeze-block wall, and lush planting' },
  { src: '/gallery/home/gallery-6.webp', mobile: '/gallery/home/gallery-6-mobile.webp', alt: 'Nawá House facade and geometric screen wall with palms under a blue sky' },
  { src: '/gallery/home/gallery-7.webp', mobile: '/gallery/home/gallery-7-mobile.webp', alt: 'Golden-hour view through a window of tropical foliage against a soft sky' },
  { src: '/gallery/home/gallery-8.webp', mobile: '/gallery/home/gallery-8-mobile.webp', alt: 'Vibrant red hibiscus flower in full bloom against a clear blue tropical sky' },
  { src: '/gallery/home/gallery-9.webp', mobile: '/gallery/home/gallery-9-mobile.webp', alt: 'Orange heliconia flower emerging from lush green tropical leaves in sunlight' },
]

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Nawa House — Guesthouse in Siargao, Philippines</title>
        <meta name="description" content="A quiet guesthouse in General Luna, Siargao — 5 minutes from Cloud 9. Private ensuite rooms with Starlink wifi, AC, and a veranda. Ideal for surfers and slow travelers." />
        <link rel="canonical" href="https://nawahouse.ph/" />
        <meta property="og:url" content="https://nawahouse.ph/" />
        <meta property="og:title" content="Nawa House — Guesthouse in Siargao, Philippines" />
        <meta property="og:description" content="A quiet guesthouse in General Luna, Siargao — 5 minutes from Cloud 9. Private ensuite rooms with Starlink wifi, AC, and a veranda." />
      </Helmet>
      <HeroCarousel />
      <Intro />
      <Reviews />
    </>
  )
}
