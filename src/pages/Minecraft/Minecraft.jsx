import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Minecraft.css'

export default function Minecraft() {
  const { t } = useTranslation()

  return (
    <div className="page">
      <Link to="/fun" className="back-link">← {t('back')}</Link>
      <h1 className="page-title">{t('minecraft.title')}</h1>
      <p className="page-desc">{t('minecraft.description')}</p>
    </div>
  )
}
