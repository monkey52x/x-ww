import '../Vlogf/Vlogf.css'

const links = [
  { href: 'https://www.youtube.com/@seido', icon: '▶️', label: 'YouTube' },
  { href: 'https://t.me/seido', icon: '✈️', label: 'Telegram' },
  { href: 'https://x.com/seido', icon: '🐦', label: 'X (Twitter)' },
]

export default function Seido() {
  return (
    <div className="bio-page">
      <div className="bio-card glass">
        <div className="bio-avatar bio-avatar--seido">S</div>
        <h1 className="bio-name">seido</h1>
        <p className="bio-desc">Just having fun</p>
        <div className="bio-links">
          {links.map(({ href, icon, label }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="bio-link glass">
              <span className="bio-link-icon">{icon}</span>
              <span className="bio-link-label">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
