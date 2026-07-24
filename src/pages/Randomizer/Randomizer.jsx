import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './Randomizer.css'

export default function Randomizer() {
  const { t } = useTranslation()

  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [numResult, setNumResult] = useState(null)
  const [numShown, setNumShown] = useState(false)

  const [listInput, setListInput] = useState('')
  const [attempts, setAttempts] = useState('')
  const [listResults, setListResults] = useState(null)
  const [listShown, setListShown] = useState(false)

  const randomizeNumber = () => {
    const mn = parseInt(min)
    const mx = parseInt(max)
    if (isNaN(mn) || isNaN(mx) || mn > mx) return
    setNumResult(Math.floor(Math.random() * (mx - mn + 1)) + mn)
    setNumShown(true)
  }

  const randomizeList = () => {
    const items = listInput.trim().split('\n').map((s) => s.trim()).filter(Boolean)
    const att = parseInt(attempts)
    if (!items.length || isNaN(att) || att < 1) return

    const count = {}
    items.forEach((item) => { count[item] = 0 })

    for (let i = 0; i < att; i++) {
      const idx = Math.floor(Math.random() * items.length)
      count[items[idx]]++
    }

    const results = items.map((item) => ({
      label: item,
      count: count[item],
      percent: ((count[item] / att) * 100).toFixed(2),
    }))

    setListResults(results)
    setListShown(true)
  }

  return (
    <div className="page">
      <Link to="/fun" className="back-link">← {t('back')}</Link>
      <h1 className="page-title">{t('randomizer.title')}</h1>
      <p className="page-desc">{t('randomizer.description')}</p>

      <div className="rand-grid">
        <div className="glass rand-card">
          <h2 className="rand-card-title">🔢 {t('randomizer.number')}</h2>
          <div className="rand-input-row">
            <label className="rand-label">{t('randomizer.from')}</label>
            <input
              className="rand-input"
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
            <label className="rand-label">{t('randomizer.to')}</label>
            <input
              className="rand-input"
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <button className="btn-glass rand-btn" onClick={randomizeNumber}>
            {t('randomizer.generate')}
          </button>
          {numShown && (
            <div className="rand-result-box">
              <span className="rand-number">{numResult}</span>
              <button className="btn-glass rand-btn-sm" onClick={randomizeNumber}>
                {t('randomizer.retry')}
              </button>
            </div>
          )}
        </div>

        <div className="glass rand-card">
          <h2 className="rand-card-title">📋 {t('randomizer.list')}</h2>
          <textarea
            className="rand-textarea"
            rows={5}
            value={listInput}
            onChange={(e) => setListInput(e.target.value)}
            placeholder={t('randomizer.listPlaceholder')}
          />
          <div className="rand-input-row">
            <label className="rand-label">{t('randomizer.attempts')}</label>
            <input
              className="rand-input rand-input-sm"
              type="number"
              value={attempts}
              onChange={(e) => setAttempts(e.target.value)}
            />
          </div>
          <button className="btn-glass rand-btn" onClick={randomizeList}>
            {t('randomizer.generate')}
          </button>
          {listShown && listResults && (
            <div className="rand-result-box">
              <div className="rand-list-results">
                {listResults.map((r) => (
                  <div key={r.label} className="rand-list-row">
                    <span className="rand-list-label">{r.label}</span>
                    <span className="rand-list-bar-wrap">
                      <span
                        className="rand-list-bar"
                        style={{ width: `${Math.min(r.percent, 100)}%` }}
                      />
                    </span>
                    <span className="rand-list-count">
                      {r.count} ({r.percent}%)
                    </span>
                  </div>
                ))}
              </div>
              <button className="btn-glass rand-btn-sm" onClick={randomizeList}>
                {t('randomizer.retry')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
