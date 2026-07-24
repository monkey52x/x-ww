import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Fun.css'

const funs = [
  { to: '/fun/randomizer', icon: '🎲', key: 'randomizer' },
]

const games = [
  { to: '/games/rust', icon: '🦀', key: 'rust' },
  { to: '/games/minecraft', icon: '⛏️', key: 'minecraft' },
]

export default function Fun() {
  const { t } = useTranslation()

  return (
    <div className="page">
      <Link to="/" className="back-link">← {t('back')}</Link>
      <h1 className="page-title">{t('fun.title')}</h1>
      <p className="page-desc">{t('fun.description')}</p>

      <h2 className="section-title">🎉 {t('fun.title')}</h2>
      <div className="fun-grid">
        {funs.map(({ to, icon, key }) => (
          <Link key={to} to={to} className="glass fun-card">
            <span className="fun-card-icon">{icon}</span>
            <h3 className="fun-card-title">{t(`nav.${key}`)}</h3>
            <p className="fun-card-desc">{t(`fun.${key}Desc`)}</p>
          </Link>
        ))}
      </div>

      <h2 className="section-title">🎮 {t('fun.games')}</h2>
      <div className="fun-grid">
        {games.map(({ to, icon, key }) => (
          <Link key={to} to={to} className="glass fun-card">
            <span className="fun-card-icon">{icon}</span>
            <h3 className="fun-card-title">{t(`nav.${key}`)}</h3>
            <p className="fun-card-desc">{t(`fun.${key}Desc`)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
