import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-cream">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-5" aria-label="Nawa House">
              <img src="/logo-dark.png" alt="Nawá House" className="h-10 w-auto" />
            </Link>
            <p className="font-ui text-xs font-light text-muted leading-relaxed max-w-[220px]">
              General Luna, Siargao Island
            </p>
          </div>

          

          {/* Contact */}
          <div>
            <p className="section-label mb-5">Get in Touch</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://instagram.com/nawasiargao" target='_blank'
                className="font-ui text-xs text-muted hover:text-fg transition-colors duration-300"
              >
                Instagram &nbsp;&middot;&nbsp; @nawasiargao
              </a>
              
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-ui text-[10px] tracking-widest2 uppercase text-muted">
            &copy; {year} Nawa House. All rights reserved.
          </p>
          <p className="font-ui text-xs font-light text-muted tracking-widest2 uppercase">
            Nawá — may it be so.
          </p>
        </div>
      </div>
    </footer>
  )
}
