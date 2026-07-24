import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import './Header.css'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="header glass">
      <div className="header-inner">
        <NavLink to="/" className="header-logo">
          <span className="logo-x">X</span>
          <span className="logo-emoji">😘</span>
          <span className="logo-ww">WW</span>
        </NavLink>
        <nav className="header-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/fun" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {t('nav.fun')}
          </NavLink>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
