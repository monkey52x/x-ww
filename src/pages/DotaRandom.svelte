<script>
  import { onMount } from 'svelte'
  import { navigate } from 'svelte-routing'
  import { t } from '../i18n.js'
  import { HEROES, heroImg, pickRandomHeroes } from '../data/heroes.js'
  import { banned, banCount } from '../data/bans.js'
  import BannedHeroes from '../components/BannedHeroes.svelte'

  let hero = null
  let imgOk = true
  let showBans = false

  $: isBanned = hero ? $banned.has(hero.key) : false
  $: available = HEROES.length - $banCount

  function roll() {
    hero = pickRandomHeroes(1, $banned)[0] ?? null
    imgOk = true
  }

  function toggleBan() {
    if (hero) banned.toggle(hero.key)
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
  <h1 class="page-title">{$t('randomHero.title')}</h1>
  <p class="page-desc">{$t('randomHero.description')} ({available})</p>

  <div class="glass hero-box">
    {#if hero}
      {#key hero.key}
        <div class="hero-card" class:is-banned={isBanned}>
          <div class="img-wrap">
            {#if imgOk}
              <img
                class="hero-img"
                src={heroImg(hero.key)}
                alt={hero.name}
                loading="lazy"
                on:error={() => (imgOk = false)}
              />
            {:else}
              <div class="hero-img-fallback">{hero.name}</div>
            {/if}
            <button
              class="ban-btn"
              class:active={isBanned}
              on:click={toggleBan}
              title={isBanned ? 'unban' : 'ban'}
              aria-label="toggle ban"
            >
              {isBanned ? '↩' : '✕'}
            </button>
          </div>
          <div class="hero-name">{hero.name}</div>
          <div class="hero-attr attr-{hero.attr}">{$t(`attr.${hero.attr}`)}</div>
          {#if isBanned}
            <div class="banned-tag">🚫 {$t('bans.banned')}</div>
          {/if}
        </div>
      {/key}
    {:else}
      <p class="ban-empty">{$t('bans.allBanned')}</p>
      <button class="btn-glass btn-sm" on:click={() => (showBans = true)}>
        🚫 {$t('bans.button')}
      </button>
    {/if}
    <div class="btn-row">
      <button class="btn-glass" on:click={roll}>{$t('randomHero.generate')}</button>
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

  .hero-box {
    padding: 28px 24px;
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 560px;
    margin: 0 auto;
  }

  .hero-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    animation: fadeIn 0.4s ease;
  }

  .img-wrap {
    position: relative;
    width: min(100%, 380px);
  }

  .hero-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid var(--border-glass);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    background: rgba(255, 255, 255, 0.04);
    display: block;
  }

  .hero-img-fallback {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    border: 1px solid var(--border-glass);
    background: rgba(255, 255, 255, 0.04);
    font-size: 1.4rem;
    font-weight: 800;
    text-align: center;
    padding: 16px;
  }

  .hero-card.is-banned .hero-img,
  .hero-card.is-banned .hero-img-fallback {
    filter: grayscale(1);
    opacity: 0.55;
  }

  .ban-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    border: 1px solid var(--border-glass);
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--white-dim);
    font-size: 1rem;
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
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 0.5px;
    text-align: center;
  }

  .hero-attr {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 4px 14px;
    border-radius: 999px;
    border: 1px solid var(--border-glass);
  }

  .attr-str { color: #f87171; border-color: rgba(248, 113, 113, 0.4); }
  .attr-agi { color: #4ade80; border-color: rgba(74, 222, 128, 0.4); }
  .attr-int { color: #60a5fa; border-color: rgba(96, 165, 250, 0.4); }
  .attr-all { color: #e879f9; border-color: rgba(232, 121, 249, 0.4); }

  .banned-tag {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--white-dim);
  }

  .ban-empty {
    color: var(--white-dim);
    font-size: 0.95rem;
    text-align: center;
  }

  .btn-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
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
</style>
