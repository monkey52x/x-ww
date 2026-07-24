import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Rust.css'

export default function Rust() {
  const { t } = useTranslation()

  return (
    <div className="page">
      <Link to="/fun" className="back-link">← {t('back')}</Link>
      <h1 className="page-title">{t('rust.title')}</h1>
      <p className="page-desc">{t('rust.description')}</p>
    </div>
  )
}
