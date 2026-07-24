import './Vlogf.css'

const links = [
  { href: 'https://www.youtube.com/@vlogf', icon: '▶️', label: 'YouTube' },
  { href: 'https://t.me/vlogf', icon: '✈️', label: 'Telegram' },
  { href: 'https://www.twitch.tv/vlogf', icon: '📺', label: 'Twitch' },
  { href: 'https://x.com/vlogf', icon: '🐦', label: 'X (Twitter)' },
  { href: 'https://www.donationalerts.com/r/vlogf', icon: '💜', label: 'DonationAlerts' },
]

export default function Vlogf() {
  return (
    <div className="bio-page">
      <div className="bio-card glass">
        <div className="bio-avatar">V</div>
        <h1 className="bio-name">vlogf</h1>
        <p className="bio-desc">Streamer, video maker, just a good person</p>
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
