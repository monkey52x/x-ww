import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const LANGUAGES = [
  { code: 'ru', label: 'RU' },
  { code: 'uk', label: 'UA' },
  { code: 'en', label: 'EN' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]

  return (
    <div className="lang-dropdown" ref={ref}>
      <button className="lang-trigger" onClick={() => setOpen((v) => !v)}>
        {current.label}
        <svg className={`lang-arrow ${open ? 'open' : ''}`} width="10" height="6" viewBox="0 0 10 6">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="lang-menu">
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              className={`lang-option ${code === i18n.language ? 'active' : ''}`}
              onClick={() => {
                i18n.changeLanguage(code)
                setOpen(false)
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
