import { useState, useEffect, memo } from 'react'
import { founders } from '../data/founders'
import { site } from '../data/site'
import './FoundersPage.css'

const Typewriter = memo(function Typewriter({ text }) {
  const [display, setDisplay] = useState('')
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!text) return
    const fullText = text
    const typeSpeed = isDeleting ? 50 : 100
    const pauseAtEnd = 2000
    const pauseAtStart = 500

    let delay = typeSpeed
    if (!isDeleting && index === fullText.length) delay = pauseAtEnd
    else if (isDeleting && index === 0) delay = pauseAtStart

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (index < fullText.length) {
          setDisplay(fullText.slice(0, index + 1))
          setIndex(index + 1)
        } else {
          setIsDeleting(true)
          setIndex(fullText.length - 1)
          setDisplay(fullText.slice(0, fullText.length - 1))
        }
      } else {
        if (index > 0) {
          setIndex(index - 1)
          setDisplay(fullText.slice(0, index - 1))
        } else {
          setIsDeleting(false)
        }
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, index, isDeleting])

  return (
    <span className="founders-typewriter">
      <span className="founders-typewriter-text">{display}</span>
      <span className="founders-typewriter-cursor" aria-hidden>|</span>
    </span>
  )
})

const SocialIcon = ({ type, href }) => {
  if (!href) return null
  const icons = {
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    website: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  }
  const label = type.charAt(0).toUpperCase() + type.slice(1)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="founder-social-link"
      aria-label={label}
      title={label}
    >
      {icons[type] || null}
    </a>
  )
}

const FounderCard = memo(function FounderCard({ founder, index }) {
  const { name, role, bio, quote, email, phone, social, image } = founder
  const [imageError, setImageError] = useState(false)
  const showImage = image && !imageError

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const socialLinks = [
    { type: 'linkedin', href: social.linkedin },
    { type: 'instagram', href: social.instagram },
    { type: 'twitter', href: social.twitter },
    { type: 'github', href: social.github },
    { type: 'website', href: social.website },
  ].filter((s) => s.href)

  return (
    <article
      className="founder-card"
      style={{ '--delay': `${index * 0.1}s` }}
    >
      <div className="founder-card-glow" aria-hidden />
      <div className="founder-card-inner">
        <div className="founder-card-bg" aria-hidden>
          {showImage ? (
            <img
              src={image}
              alt=""
              className="founder-card-bg-img"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="founder-card-bg-initials">{initials}</span>
          )}
        </div>
        <div className="founder-card-overlay" aria-hidden />
        <p className="founder-role founder-role-badge">
          <Typewriter text={role} />
        </p>
        <div className="founder-card-content">
          <h3 className="founder-name">{name}</h3>
          <p className="founder-bio">{bio}</p>
          {quote && <p className="founder-quote">"{quote}"</p>}
          <div className="founder-contact">
            <a href={`mailto:${email}`} className="founder-email founder-email-cta">
              Email {name.split(' ')[0]}
            </a>
            {phone && (
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="founder-phone">
                {phone}
              </a>
            )}
          </div>
          <div className="founder-social" role="list">
            {socialLinks.map(({ type, href }) => (
              <span key={type} role="listitem">
                <SocialIcon type={type} href={href} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
})

export default function FoundersPage() {
  const scrollToTeam = () => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main className="founders-page">
      <div className="founders-bg" aria-hidden>
        <div className="founders-bg-grid" />
        <div className="founders-bg-glow founders-bg-glow-1" />
        <div className="founders-bg-glow founders-bg-glow-2" />
        <div className="founders-bg-boxes" aria-hidden>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="founders-bg-box" style={{ '--i': i }} />
          ))}
        </div>
        <div className="founders-bg-noise" />
      </div>

      <nav className="founders-nav" aria-label="Main">
        <span className="founders-nav-logo">{site.companyName}</span>
        <div className="founders-nav-links">
          <button type="button" onClick={scrollToTeam} className="founders-nav-link">
            Team
          </button>
          <button type="button" onClick={scrollToContact} className="founders-nav-cta">
            Contact
          </button>
        </div>
      </nav>

      <header className="founders-header">
        <p className="founders-company">
          <Typewriter text={site.companyName} />
        </p>
        <span className="founders-label">Meet the team</span>
        <h1 className="founders-title">
          <span className="founders-title-line">The minds</span>
          <span className="founders-title-line founders-title-gradient">building the future</span>
        </h1>
        <p className="founders-tagline">{site.tagline}</p>
        <p className="founders-subtitle">{site.stats}</p>
        {site.trustLogos.length > 0 && (
          <div className="founders-trust">
            <span className="founders-trust-label">As seen in</span>
            <div className="founders-trust-logos">
              {site.trustLogos.map((src, i) => (
                <img key={i} src={src} alt="" className="founders-trust-logo" />
              ))}
            </div>
          </div>
        )}
      </header>

      <p className="founders-mission">{site.mission}</p>

      <section id="team" className="founders-bento" aria-label="Founder profiles">
        {founders.map((founder, i) => (
          <FounderCard key={founder.id} founder={founder} index={i} />
        ))}
      </section>

      <footer id="contact" className="founders-footer">
        {site.card && (
          <div className="founders-footer-card-wrap">
            {site.card.title && (
              <h2 className="founders-footer-card-title">{site.card.title}</h2>
            )}
            <div className="founders-footer-card" aria-label="Company card">
              <div className="founders-footer-card-chip" aria-hidden />
              <p className="founders-footer-card-brand">{site.card.brand}</p>
              <p className="founders-footer-card-tagline">{site.card.tagline}</p>
              <p className="founders-footer-card-headline">{site.card.headline}</p>
              <p className="founders-footer-card-metrics">{site.card.metrics}</p>
              <div className="founders-footer-card-bottom">
                <div className="founders-footer-card-contact">
                  <a href={`tel:${site.card.phone.replace(/\D/g, '')}`} className="founders-footer-card-phone">
                    {site.card.phone}
                  </a>
                  <a href={`https://${site.card.website}`} target="_blank" rel="noopener noreferrer" className="founders-footer-card-website">
                    {site.card.website}
                  </a>
                </div>
                {site.card.qrCode && (
                  <div className="founders-footer-card-qr">
                    <img src={site.card.qrCode} alt="QR code" className="founders-footer-card-qr-img" width={80} height={80} />
                    {site.card.qrLabel && (
                      <span className="founders-footer-card-qr-label">{site.card.qrLabel}</span>
                    )}
                  </div>
                )}
              </div>
              <p className="founders-footer-card-motto">{site.card.motto}</p>
            </div>
          </div>
        )}
        <div className="founders-footer-top">
          <div className="founders-footer-brand-block">
            <p className="founders-footer-brand">{site.companyName}</p>
            <p className="founders-footer-tagline">{site.tagline}</p>
          </div>
          <div className="founders-footer-cta-block">
            <p className="founders-footer-cta-label">Get in touch</p>
            <a href={`mailto:${site.contactEmail}`} className="founders-cta">
              {site.contactEmail}
            </a>
          </div>
        </div>
        <div className="founders-footer-bottom">
          <p className="founders-footer-copy">{site.copyright}</p>
          <div className="founders-footer-legal">
            <a href="/privacy" className="founders-footer-legal-link">Privacy</a>
            <span className="founders-footer-legal-sep">·</span>
            <a href="/terms" className="founders-footer-legal-link">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
