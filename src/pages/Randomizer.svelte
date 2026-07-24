<script>
  import { t } from '../i18n.js'
  import { onMount } from 'svelte'

  let min = ''
  let max = ''
  let numResult = null
  let numShown = false

  let listInput = ''
  let attempts = ''
  let listResults = null
  let listShown = false

  let fromId, toId, attId

  function randomizeNumber() {
    const mn = parseInt(min)
    const mx = parseInt(max)
    if (isNaN(mn) || isNaN(mx) || mn > mx) return
    numResult = Math.floor(Math.random() * (mx - mn + 1)) + mn
    numShown = true
  }

  function randomizeList() {
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

    listResults = results
    listShown = true
  }

  import { navigate } from 'svelte-routing'

  function goTo(path, e) {
    e.preventDefault()
    navigate(path)
  }
</script>

<div class="page">
  <a href="/fun" class="back-link" on:click={(e) => goTo('/fun', e)}>
    ← {$t('back')}
  </a>
  <h1 class="page-title">{$t('randomizer.title')}</h1>
  <p class="page-desc">{$t('randomizer.description')}</p>

  <div class="rand-grid">
    <div class="glass rand-card">
      <h2 class="rand-card-title">🔢 {$t('randomizer.number')}</h2>
      <div class="rand-input-row">
        <label class="rand-label" for={fromId}>{$t('randomizer.from')}</label>
        <input
          class="rand-input"
          type="number"
          bind:value={min}
          id={fromId}
        />
        <label class="rand-label" for={toId}>{$t('randomizer.to')}</label>
        <input
          class="rand-input"
          type="number"
          bind:value={max}
          id={toId}
        />
      </div>
      <button class="btn-glass rand-btn" on:click={randomizeNumber}>
        {$t('randomizer.generate')}
      </button>
      {#if numShown}
        <div class="rand-result-box">
          <span class="rand-number">{numResult}</span>
          <button class="btn-glass rand-btn-sm" on:click={randomizeNumber}>
            {$t('randomizer.retry')}
          </button>
        </div>
      {/if}
    </div>

    <div class="glass rand-card">
      <h2 class="rand-card-title">📋 {$t('randomizer.list')}</h2>
      <textarea
        class="rand-textarea"
        rows={5}
        bind:value={listInput}
        placeholder={$t('randomizer.listPlaceholder')}
      />
      <div class="rand-input-row">
        <label class="rand-label" for={attId}>{$t('randomizer.attempts')}</label>
        <input
          class="rand-input rand-input-sm"
          type="number"
          bind:value={attempts}
          id={attId}
        />
      </div>
      <button class="btn-glass rand-btn" on:click={randomizeList}>
        {$t('randomizer.generate')}
      </button>
      {#if listShown && listResults}
        <div class="rand-result-box">
          <div class="rand-list-results">
            {#each listResults as r}
              <div class="rand-list-row">
                <span class="rand-list-label">{r.label}</span>
                <span class="rand-list-bar-wrap">
                  <span
                    class="rand-list-bar"
                    style="width: {Math.min(parseFloat(r.percent), 100)}%"
                  />
                </span>
                <span class="rand-list-count">
                  {r.count} ({r.percent}%)
                </span>
              </div>
            {/each}
          </div>
          <button class="btn-glass rand-btn-sm" on:click={randomizeList}>
            {$t('randomizer.retry')}
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .rand-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  .rand-card {
    padding: 28px 24px;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .rand-card-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 4px;
  }

  .rand-input-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .rand-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--white-dim);
  }

  .rand-input {
    padding: 8px 12px;
    border: 1px solid var(--border-glass);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    color: var(--white);
    font-size: 0.95rem;
    font-family: inherit;
    outline: none;
    width: 100px;
    transition: border-color var(--transition);
  }

  .rand-input:focus {
    border-color: var(--purple-500);
  }

  .rand-input-sm {
    width: 80px;
  }

  .rand-textarea {
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

  .rand-textarea:focus {
    border-color: var(--purple-500);
  }

  .rand-textarea::placeholder {
    color: var(--white-muted);
  }

  .rand-btn {
    align-self: flex-start;
  }

  .rand-btn-sm {
    padding: 8px 20px;
    font-size: 0.85rem;
  }

  .rand-result-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-top: 8px;
    border-top: 1px solid var(--border-glass);
  }

  .rand-number {
    font-size: 3rem;
    font-weight: 900;
    background: linear-gradient(135deg, var(--purple-400), var(--pink-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rand-list-results {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .rand-list-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rand-list-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--white);
    min-width: 80px;
    flex-shrink: 0;
  }

  .rand-list-bar-wrap {
    flex: 1;
    height: 10px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 5px;
    overflow: hidden;
  }

  .rand-list-bar {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, var(--purple-500), var(--pink-500));
    border-radius: 5px;
    transition: width 0.4s ease;
  }

  .rand-list-count {
    font-size: 0.8rem;
    color: var(--white-dim);
    min-width: 100px;
    text-align: right;
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    .rand-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .rand-input { width: 80px; }
    .rand-number { font-size: 2.2rem; }
    .rand-list-label { min-width: 60px; font-size: 0.8rem; }
    .rand-list-count { min-width: 80px; font-size: 0.75rem; }
  }
</style>