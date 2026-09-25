<script>
  import { onMount, onDestroy } from 'svelte'
  import { navigate } from 'svelte-routing'
  import { t } from '../i18n.js'

  const SIZE = 320
  const COLORS = ['#7c3aed', '#ec4899', '#6d28d9', '#db2777', '#8b5cf6', '#f472b6']
  const DIM = 'rgba(255, 255, 255, 0.08)'
  const STORE_KEY = 'xww-roulette-options'
  const CROSSED_KEY = 'xww-roulette-crossed'
  const REPEAT = 8

  function loadOptions() {
    try {
      return localStorage.getItem(STORE_KEY) ?? ''
    } catch {
      return ''
    }
  }

  function persistOptions(text) {
    try {
      localStorage.setItem(STORE_KEY, text)
    } catch {
      // private mode — options just won't persist
    }
  }

  function loadCrossed() {
    try {
      const raw = localStorage.getItem(CROSSED_KEY)
      if (!raw) return new Set()
      const arr = JSON.parse(raw)
      return new Set(Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [])
    } catch {
      return new Set()
    }
  }

  let optionsText = loadOptions()
  let crossed = loadCrossed()
  let spinning = false
  let winner = null
  let muted = false
  let canvas = null
  let rotation = 0
  let raf = 0
  let audioCtx = null
  let lastTick = 0
  let repeat = 1

  $: options = optionsText
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
  $: pool = options.filter((o) => !crossed.has(o))
  $: sectors = Array.from({ length: repeat }, () => pool).flat()
  $: canSpin = !spinning && sectors.length >= 2
  $: if (canvas && options && crossed && repeat && !spinning) drawWheel()
  $: persistOptions(optionsText)
  $: persistCrossed(crossed)

  function persistCrossed(set) {
    try {
      localStorage.setItem(CROSSED_KEY, JSON.stringify([...set]))
    } catch {
      // private mode — crossed just won't persist
    }
  }

  function sectorAt(angle) {
    const TAU = Math.PI * 2
    const arc = TAU / sectors.length
    const rel = ((((3 * Math.PI) / 2 - angle) % TAU) + TAU) % TAU
    return Math.floor(rel / arc) % sectors.length
  }

  function tick() {
    if (muted) return
    const nowMs = performance.now()
    if (nowMs - lastTick < 30) return
    lastTick = nowMs
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      if (audioCtx.state === 'suspended') audioCtx.resume()
      const now = audioCtx.currentTime
      const o = audioCtx.createOscillator()
      const g = audioCtx.createGain()
      o.type = 'square'
      o.frequency.value = 700 + Math.random() * 200
      g.gain.setValueAtTime(0.06, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
      o.connect(g)
      g.connect(audioCtx.destination)
      o.start(now)
      o.stop(now + 0.05)
    } catch (e) {
      // no audio available — spin silently
    }
  }

  function spin() {
    if (!canSpin) return
    spinning = true
    winner = null
    const TAU = Math.PI * 2
    const arc = TAU / sectors.length
    const targetIndex = Math.floor(Math.random() * sectors.length)
    // land at a random spot inside the sector (not dead center), with edge margin
    const EDGE = 0.18
    const spot = EDGE + Math.random() * (1 - 2 * EDGE)
    const targetAngle = -Math.PI / 2 - (targetIndex + spot) * arc
    const start = rotation
    const norm = (((targetAngle - start) % TAU) + TAU) % TAU
    const fullTurns = 5 + Math.floor(Math.random() * 4)
    const total = fullTurns * TAU + norm
    const duration = 4500 + Math.random() * 1500
    const t0 = performance.now()
    let lastSector = sectorAt(start)
    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4)

    const frame = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      rotation = start + total * easeOutQuart(p)
      const s = sectorAt(rotation)
      if (s !== lastSector) {
        lastSector = s
        tick()
      }
      drawWheel()
      if (p < 1) {
        raf = requestAnimationFrame(frame)
      } else {
        spinning = false
        // winner is whatever the pointer actually points at — by construction
        winner = sectors[sectorAt(rotation)] ?? sectors[targetIndex]
      }
    }
    raf = requestAnimationFrame(frame)
  }

  function toggleCross(value) {
    const next = new Set(crossed)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    crossed = next
  }

  function strikeWinner() {
    if (!winner) return
    crossed = new Set(crossed).add(winner)
    winner = null
  }

  function clearOptions() {
    if (!optionsText.trim()) return
    const ok = confirm(`${$t('roulette.clearConfirm')} (${options.length})`)
    if (!ok) return
    optionsText = ''
    crossed = new Set()
    winner = null
  }

  function drawWheel() {
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 3)
    if (canvas.width !== SIZE * dpr) {
      canvas.width = SIZE * dpr
      canvas.height = SIZE * dpr
    }
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const R = SIZE / 2
    const TAU = Math.PI * 2
    ctx.clearRect(0, 0, SIZE, SIZE)

    const dim = sectors.length < 2
    const items = dim ? Array(8).fill('?') : sectors
    const arc = TAU / items.length
    const showLabels = !dim && arc > 0.12

    items.forEach((label, i) => {
      const a0 = rotation + i * arc
      ctx.beginPath()
      ctx.moveTo(R, R)
      ctx.arc(R, R, R - 4, a0, a0 + arc)
      ctx.closePath()
      ctx.fillStyle = dim ? DIM : COLORS[i % COLORS.length]
      ctx.fill()
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)'
      ctx.lineWidth = 1
      ctx.stroke()

      if (showLabels) {
        ctx.save()
        ctx.translate(R, R)
        ctx.rotate(a0 + arc / 2)
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
        ctx.font = '700 13px system-ui, sans-serif'
        const text = label.length > 16 ? label.slice(0, 15) + '…' : label
        ctx.fillText(text, R - 18, 0)
        ctx.restore()
      }
    })

    // hub
    ctx.beginPath()
    ctx.arc(R, R, 26, 0, TAU)
    ctx.fillStyle = 'rgba(10, 0, 21, 0.9)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ctx.font = '20px serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🎡', R, R + 1)

    // pointer
    ctx.beginPath()
    ctx.moveTo(R - 12, 2)
    ctx.lineTo(R + 12, 2)
    ctx.lineTo(R, 22)
    ctx.closePath()
    ctx.fillStyle = '#fff'
    ctx.fill()
  }

  function goTo(path, e) {
    e.preventDefault()
    navigate(path)
  }

  onMount(drawWheel)
  onDestroy(() => {
    cancelAnimationFrame(raf)
    if (audioCtx) audioCtx.close().catch(() => {})
  })
</script>

<div class="page">
  <a href="/fun" class="back-link" on:click={(e) => goTo('/fun', e)}>
    ← {$t('back')}
  </a>
  <h1 class="page-title">{$t('roulette.title')}</h1>
  <p class="page-desc">{$t('roulette.description')}</p>

  {#if winner && !spinning}
    <div class="glass winner-box">
      <span class="winner-trophy">🏆</span>
      <span class="winner-name">{winner}</span>
      <button class="btn-glass btn-sm" on:click={strikeWinner}>
        {$t('roulette.strikeWinner')}
      </button>
    </div>
  {/if}

  <div class="roul-grid">
    <div class="glass roul-card">
      <h2 class="roul-card-title">📋 {$t('roulette.options')}</h2>
      <textarea
        class="roul-textarea"
        rows={6}
        bind:value={optionsText}
        disabled={spinning}
        placeholder={$t('roulette.placeholder')}
      />
      {#if pool.length < 2}
        <p class="roul-hint">
          {options.length >= 2 ? $t('roulette.uncrossHint') : $t('roulette.needMore')}
        </p>
      {:else if repeat > 1}
        <p class="roul-hint">{$t('roulette.sectors')}: {sectors.length}</p>
      {/if}
      {#if options.length}
        <p class="roul-hint">{$t('roulette.tapToCross')}</p>
        <div class="chip-list">
          {#each options as opt, idx (idx)}
            <button
              class="chip"
              class:crossed={crossed.has(opt)}
              on:click={() => toggleCross(opt)}
              disabled={spinning}
            >
              {opt}
            </button>
          {/each}
        </div>
      {/if}
      <div class="btn-row">
        <button class="btn-glass" on:click={spin} disabled={!canSpin}>
          {spinning ? $t('roulette.spinning') : `🎡 ${$t('roulette.spin')}`}
        </button>
        <button
          class="btn-glass btn-ghost"
          class:repeat-active={repeat > 1}
          on:click={() => (repeat = repeat > 1 ? 1 : REPEAT)}
          disabled={spinning}
          title={$t('roulette.repeatHint')}
          aria-label={$t('roulette.repeat')}
        >
          ×{repeat > 1 ? REPEAT : 1}
        </button>
        <button
          class="btn-glass btn-ghost"
          on:click={() => (muted = !muted)}
          title={$t('roulette.sound')}
          aria-label={$t('roulette.sound')}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <button
          class="btn-glass btn-ghost"
          on:click={clearOptions}
          disabled={spinning || !optionsText.trim()}
          title={$t('roulette.clear')}
          aria-label={$t('roulette.clear')}
        >
          🗑
        </button>
      </div>
    </div>

    <div class="glass roul-card roul-wheel-card">
      <canvas class="wheel" bind:this={canvas} width="640" height="640" />
    </div>
  </div>
</div>

<style>
  .roul-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  .roul-card {
    padding: 28px 24px;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .roul-card-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--white);
  }

  .roul-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border-glass);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    color: var(--white);
    font-size: 0.9rem;
    font-family: inherit;
    outline: none;
    resize: vertical;
    transition: border-color var(--transition);
  }

  .roul-textarea:focus {
    border-color: var(--purple-500);
  }

  .roul-textarea::placeholder {
    color: var(--white-muted);
  }

  .roul-textarea:disabled {
    opacity: 0.6;
  }

  .roul-hint {
    font-size: 0.8rem;
    color: var(--white-muted);
  }

  .chip-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-height: 132px;
    overflow-y: auto;
  }

  .chip {
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid var(--border-glass);
    background: rgba(255, 255, 255, 0.05);
    color: var(--white);
    font-size: 0.8rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all var(--transition);
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chip:hover:not(:disabled) {
    border-color: var(--purple-500);
  }

  .chip:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .chip.crossed {
    text-decoration: line-through;
    opacity: 0.45;
    border-color: rgba(248, 113, 113, 0.5);
    color: var(--white-dim);
  }

  .btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .btn-ghost {
    padding: 12px 16px;
  }

  .repeat-active {
    border-color: #4ade80;
    box-shadow: 0 0 15px rgba(74, 222, 128, 0.3);
    color: #4ade80;
  }

  .btn-glass:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .roul-wheel-card {
    align-items: center;
  }

  .wheel {
    width: 100%;
    max-width: 340px;
    height: auto;
    filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.5));
  }

  .winner-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    padding: 20px 24px;
    margin-bottom: 24px;
    animation: fadeIn 0.4s ease;
  }

  .winner-trophy {
    font-size: 1.8rem;
  }

  .winner-name {
    font-size: 1.6rem;
    font-weight: 900;
    background: linear-gradient(135deg, var(--purple-400), var(--pink-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .btn-sm {
    padding: 8px 20px;
    font-size: 0.85rem;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 8px;
  }

  .page-desc {
    font-size: 0.95rem;
    color: var(--white-dim);
    margin-bottom: 24px;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    margin-bottom: 16px;
    border: 1px solid var(--border-glass);
    border-radius: 10px;
    color: var(--white-dim);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: all var(--transition);
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .back-link:hover {
    color: var(--white);
    border-color: var(--purple-500);
    box-shadow: 0 0 15px rgba(124, 58, 237, 0.3);
  }

  @media (max-width: 900px) {
    .roul-grid {
      grid-template-columns: 1fr;
    }
    .winner-name {
      font-size: 1.3rem;
    }
  }
</style>
