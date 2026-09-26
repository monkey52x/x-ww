<script>
  import { onMount } from 'svelte'
  import { navigate } from 'svelte-routing'
  import { t } from '../i18n.js'
  import { HEROES, heroImg, pickRandomHeroes } from '../data/heroes.js'
  import { banned, banCount } from '../data/bans.js'
  import BannedHeroes from '../components/BannedHeroes.svelte'

  let draft = []
  let broken = new Set()
  let showBans = false

  $: available = HEROES.length - $banCount

  function roll() {
    draft = pickRandomHeroes(4, $banned)
    broken = new Set()
  }

  function imgError(key) {
    broken = new Set([...broken, key])
  }

  function goTo(path, e) {
    e.preventDefault()
    navigate(path)
  }

  onMount(roll)
</script>

<div class="page">
  <div class="top-row">
    <a href="/games/dota2" class="back-link" on:click={(e) => goTo('/games/dota2', e)}>
      ← {$t('back')}
    </a>
    <button class="back-link" on:click={() => (showBans = true)}>
      🚫 {$t('bans.button')} ({$banCount})
    </button>
  </div>
  <h1 class="page-title">{$t('singleDraft.title')}</h1>
  <p class="page-desc">{$t('singleDraft.description')} ({available})</p>

  <div class="glass draft-box">
    {#if draft.length}
      {#key draft.map((h) => h.key).join('-')}
        <div class="draft-grid">
          {#each draft as hero (hero.key)}
            {@const isBanned = $banned.has(hero.key)}
            <div class="hero-card" class:is-banned={isBanned}>
              <div class="img-wrap">
                {#if !broken.has(hero.key)}
                  <img
                    class="hero-img"
                    src={heroImg(hero.key)}
                    alt={hero.name}
                    loading="lazy"
                    on:error={() => imgError(hero.key)}
                  />
                {:else}
                  <div class="hero-img-fallback">{hero.name}</div>
                {/if}
                <button
                  class="ban-btn"
                  class:active={isBanned}
                  on:click={() => banned.toggle(hero.key)}
                  title={isBanned ? 'unban' : 'ban'}
                  aria-label="toggle ban"
                >
                  {isBanned ? '↩' : '✕'}
                </button>
              </div>
              <div class="hero-name">{hero.name}</div>
              <div class="hero-attr attr-{hero.attr}">{$t(`attr.${hero.attr}`)}</div>
            </div>
          {/each}
        </div>
      {/key}
    {:else}
      <p class="ban-empty">{$t('bans.allBanned')}</p>
      <div class="btn-row">
        <button class="btn-glass btn-sm" on:click={() => (showBans = true)}>
          🚫 {$t('bans.button')}
        </button>
      </div>
    {/if}
    <div class="btn-row">
      <button class="btn-glass" on:click={roll}>{$t('singleDraft.generate')}</button>
    </div>
  </div>
</div>

<BannedHeroes open={showBans} onClose={() => (showBans = false)} />

<style>
  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  button.back-link {
    cursor: pointer;
    font-family: inherit;
  }

  .draft-box {
    padding: 28px 24px;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .draft-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    animation: fadeIn 0.4s ease;
  }

  .hero-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border: 1px solid var(--border-glass);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    transition: transform var(--transition);
  }

  .hero-card:hover {
    transform: translateY(-4px);
  }

  .img-wrap {
    position: relative;
    width: 100%;
  }

  .hero-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
    display: block;
  }

  .hero-img-fallback {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
    font-weight: 800;
    font-size: 0.9rem;
    text-align: center;
    padding: 8px;
  }

  .hero-card.is-banned .hero-img,
  .hero-card.is-banned .hero-img-fallback {
    filter: grayscale(1);
    opacity: 0.55;
  }

  .ban-btn {
    position: absolute;
    right: 8px;
    bottom: 8px;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid var(--border-glass);
    background: rgba(0, 0, 0, 0.6);
    color: var(--white-dim);
    font-size: 0.9rem;
    font-weight: 800;
    opacity: 0;
    transition: all var(--transition);
  }

  .hero-card:hover .ban-btn,
  .ban-btn.active {
    opacity: 1;
  }

  .ban-btn:hover {
    color: #fff;
    border-color: #f87171;
    box-shadow: 0 0 15px rgba(248, 113, 113, 0.4);
  }

  .ban-btn.active {
    color: #4ade80;
    border-color: rgba(74, 222, 128, 0.5);
  }

  @media (hover: none) {
    .ban-btn {
      opacity: 1;
    }
  }

  .hero-name {
    font-size: 0.95rem;
    font-weight: 800;
    text-align: center;
    line-height: 1.3;
  }

  .hero-attr {
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 2px 10px;
    border-radius: 999px;
    border: 1px solid var(--border-glass);
  }

  .attr-str { color: #f87171; border-color: rgba(248, 113, 113, 0.4); }
  .attr-agi { color: #4ade80; border-color: rgba(74, 222, 128, 0.4); }
  .attr-int { color: #60a5fa; border-color: rgba(96, 165, 250, 0.4); }
  .attr-all { color: #e879f9; border-color: rgba(232, 121, 249, 0.4); }

  .ban-empty {
    color: var(--white-dim);
    font-size: 0.95rem;
    text-align: center;
  }

  .btn-row {
    display: flex;
    justify-content: center;
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
    .draft-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .draft-grid {
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .hero-name { font-size: 0.8rem; }
  }
</style>
