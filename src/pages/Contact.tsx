import { Helmet } from 'react-helmet-async'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact — Nawa House Siargao Guesthouse</title>
        <meta name="description" content="Reach Nawa House on Instagram @nawasiargao or email hello@nawahouse.ph. We're located in General Luna, Siargao Island, Philippines." />
        <link rel="canonical" href="https://nawahouse.ph/contact" />
      </Helmet>
    <div className="min-h-screen flex items-center justify-center px-6">
      <h2
              className="font-display font-light text-fg leading-[1.05] text-center"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
            >
              Please reach us on our Instagram account{' '}
            <a
              href="https://instagram.com/nawasiargao"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg text-muted font-light hover:text-accent transition-colors duration-200"
            >
              @nawasiargao
            </a>
        </h2>
        
        
    </div>
    </>
  )
}
