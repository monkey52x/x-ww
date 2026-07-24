import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Home.css'

const games = [
  { to: '/games/rust', img: '/x-ww/images/Rust2.png', key: 'rust' },
  { to: '/games/minecraft', img: '/x-ww/images/Minecraft.png', key: 'minecraft' },
]

const funs = [
  { to: '/fun', img: '/x-ww/images/Fun.png', key: 'fun' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="page home">
      <div className="home-hero">
        <div className="home-glow" />
        <div className="home-logo">
          <span className="hl-x">X</span>
          <span className="hl-emoji">😘</span>
          <span className="hl-ww">WW</span>
        </div>
        <p className="home-subtitle">{t('home.subtitle')}</p>
        <p className="home-desc">{t('home.description')}</p>
      </div>

      <div className="home-container">
        <div className="side-group">
          {games.map(({ to, img, key }) => (
            <Link key={to} to={to} className="mini-card">
              <span className="mini-card-label">{t(`nav.${key}`)}</span>
              <div className="icon-box">
                <img src={img} alt={key} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mobile-divider" />

        <div className="side-group">
          {funs.map(({ to, img, key }) => (
            <Link key={to} to={to} className="mini-card">
              <span className="mini-card-label">{t(`nav.${key}`)}</span>
              <div className="icon-box">
                <img src={img} alt={key} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
